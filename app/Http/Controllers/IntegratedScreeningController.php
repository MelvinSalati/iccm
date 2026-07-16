<?php

namespace App\Http\Controllers;

use App\Helpers\IdentifiersHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IntegratedScreening;
use App\Models\Patients\Patient;
use App\Models\Patients\PatientVisit;
use App\Models\User;
use App\Models\Consultation;
use App\Models\Referral;
use App\Jobs\ProcessEventData;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class IntegratedScreeningController extends Controller
{
    public function store(Request $request, $patientuuid, $visitId)
    {
        Log::info('Integrated screening request', [
            'patient_uuid' => $patientuuid,
            'visit_id' => $visitId
        ]);

        $patientId = IdentifiersHelper::getPatientIdByUuid($patientuuid);

        if (!$patientId) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        try {
            $validated = $request->validate([
                'data' => 'required|json',
                'form_id' => 'required|string',
                'form_version' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'created_by' => 'required|exists:users,id',
                'provider_id' => 'nullable|exists:providers,id',
                'facility_id' => 'nullable|exists:facilities,id',
                'district' => 'nullable|string',
                'province' => 'nullable|string',
            ]);

            $screeningData = json_decode($request->input('data'), true);

            if (!$screeningData || !is_array($screeningData)) {
                return response()->json([
                    'message' => 'Invalid data format',
                    'errors' => ['data' => ['Data must be a valid JSON object']]
                ], 422);
            }

            return DB::transaction(function () use ($request, $patientuuid, $visitId, $screeningData, $patientId) {
                $patient = Patient::where('id', $patientId)->first();

                if (!$patient) {
                    return response()->json(['message' => 'Patient not found'], 404);
                }

                $visit = PatientVisit::where('uuid', $visitId)
                    ->where('patient_id', $patient->id)
                    ->first();

                if (!$visit && is_numeric($visitId)) {
                    $visit = PatientVisit::where('id', (int) $visitId)
                        ->where('patient_id', $patient->id)
                        ->first();
                }

                if (!$visit) {
                    return response()->json([
                        'message' => 'Visit not found or does not belong to this patient'
                    ], 404);
                }

                // Handle image upload
                $imageUrl = null;
                if ($request->hasFile('image')) {
                    try {
                        $image = $request->file('image');
                        $imageName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs(
                            "cervical-images/{$patientuuid}",
                            $imageName,
                            'public'
                        );
                        $imageUrl = Storage::url($path);
                        $screeningData['cervical_image_url'] = $imageUrl;
                    } catch (\Exception $e) {
                        Log::warning('Image upload failed', ['error' => $e->getMessage()]);
                    }
                }

                // Extract metrics
                $distress = (int)($screeningData['distress_thermometer'] ?? 0);
                $anxiety = (int)($screeningData['anxiety_gad7_score'] ?? 0);
                $depression = (int)($screeningData['depression_phq9_score'] ?? 0);
                $screeningResult = $screeningData['screening_result'] ?? '';
                $treatmentDecision = $screeningData['treatment_decision'] ?? null;

                // Determine conditions
                $isPositive = $this->determinePositiveScreening($screeningData);
                $needsMentalHealth = $this->determineMentalHealthNeed($distress, $anxiety, $depression);
                $hasNCDRisk = $this->determineNCDRisk($screeningData);

                $consultantId = $screeningData['consultant_id'] ?? null;
                $facilityId = $request->facility_id ?? $screeningData['facility_id'] ?? null;
                $district = $request->district ?? $screeningData['district'] ?? null;
                $province = $request->province ?? $screeningData['province'] ?? null;

                // Build metrics array
                $metricsArray = [
                    'distress_thermometer' => $distress,
                    'anxiety_gad7_score' => $anxiety,
                    'depression_phq9_score' => $depression,
                    'is_positive' => $isPositive,
                    'needs_mental_health' => $needsMentalHealth,
                    'has_ncd_risk' => $hasNCDRisk,
                    'treatment_decision' => $treatmentDecision,
                    'mental_health_services' => $screeningData['mental_health_services'] ?? [],
                    'sms_reminder_sent' => $screeningData['sms_reminder_sent'] ?? false,
                    'cervical_image_url' => $imageUrl,
                    'consultant_id' => $consultantId,
                    'provider_id' => $request->provider_id,
                    'facility_id' => $facilityId,
                    'district' => $district,
                    'province' => $province,
                    // NCD metrics
                    'weight_kg' => $screeningData['weight_kg'] ?? null,
                    'height_cm' => $screeningData['height_cm'] ?? null,
                    'bmi' => $screeningData['bmi'] ?? null,
                    'bmi_category' => $screeningData['bmi_category'] ?? null,
                    'systolic_bp' => $screeningData['systolic_bp'] ?? null,
                    'diastolic_bp' => $screeningData['diastolic_bp'] ?? null,
                    'bp_category' => $screeningData['bp_category'] ?? null,
                    'ncd_risk_level' => $screeningData['ncd_risk_level'] ?? null,
                    // Mental health metrics
                    'phq9_score' => $screeningData['phq9_score'] ?? null,
                    'phq9_category' => $screeningData['phq9_category'] ?? null,
                    'gad7_score' => $screeningData['gad7_score'] ?? null,
                    'gad7_category' => $screeningData['gad7_category'] ?? null,
                    'mental_health_risk_level' => $screeningData['mental_health_risk_level'] ?? null,
                ];

                // Build record
                $record = [
                    'id' => (string) Str::uuid(),
                    'patient_uuid' => (string) $patientuuid,
                    'visit_uuid' => (string) $visitId,
                    'patient_id' => (int) $patient->id,
                    'visit_id' => (int) $visit->id,
                    'created_by' => (int) $request->created_by,
                    'screening_date' => $screeningData['screening_date'] ?? now()->toDateString(),
                    'screening_method' => $screeningData['screening_method'] ?? null,
                    'screening_result' => $screeningResult,
                    'treatment_decision' => $treatmentDecision,
                    'is_positive' => (int) $isPositive,
                    'is_mental_health_flagged' => (int) $needsMentalHealth,
                    'follow_up_date' => $this->calculateFollowUpDate($screeningData, $isPositive),
                    'status' => 'submitted',
                    'metrics' => $metricsArray,
                    'full_data' => $screeningData,
                    'submitted_at' => now(),
                ];

                Log::info('Creating integrated screening record', [
                    'patient_id' => $patient->id,
                    'visit_id' => $visit->id,
                    'user_id' => $request->created_by,
                    'facility_id' => $facilityId,
                    'district' => $district,
                    'province' => $province,
                    'is_positive' => $isPositive,
                    'needs_mental_health' => $needsMentalHealth,
                    'has_ncd_risk' => $hasNCDRisk,
                ]);

                // Create screening record
                $screening = IntegratedScreening::create($record);

                // ============================================================
                // DISPATCH EVENTS TO ProcessEventData (using string event types)
                // ============================================================

                // 1. ALWAYS dispatch the main screening event
                $this->dispatchScreeningEvent($screening, $screeningData, $patient, $visit, $facilityId, $district, $province);

                // 2. If VIA/HPV POSITIVE - dispatch positive screening event
                if ($isPositive) {
                    $this->dispatchPositiveScreeningEvent($screening, $screeningData, $patient, $visit, $facilityId, $district, $province);
                }

                // 3. If NEGATIVE - dispatch negative screening event
                if (!$isPositive && $screeningResult === 'negative') {
                    $this->dispatchNegativeScreeningEvent($screening, $screeningData, $patient, $visit, $facilityId, $district, $province);
                }

                // 4. If MENTAL HEALTH RISK - dispatch mental health event
                if ($needsMentalHealth) {
                    $this->dispatchMentalHealthEvent($screening, $screeningData, $patient, $visit, $facilityId, $district, $province);
                }

                // 5. If NCD RISK - dispatch NCD event
                if ($hasNCDRisk) {
                    $this->dispatchNCDEvent($screening, $screeningData, $patient, $visit, $facilityId, $district, $province);
                }

                // Create consultation if needed
                $consultationId = null;
                if ($isPositive || $needsMentalHealth) {
                    try {
                        if (class_exists('App\Models\Consultation')) {
                            $consultation = Consultation::create([
                                'visit_id' => $visit->id,
                                'consultation_uuid' => (string) Str::uuid(),
                                'cervical_cancer_image_url' => $imageUrl ?? null,
                                'sms_to_dr' => $screeningData['sms_reminder_sent'] ?? false,
                                'assigned_to_user_id' => $consultantId ?? null,
                                'patient_appointment' => $screeningData['follow_up_date'] ?? now()->addWeeks(2),
                                'assigning_user_id' => $request->created_by,
                                'facility_id' => $facilityId,
                                'consultation_status' => 'pending',
                                'comment' => $isPositive
                                    ? 'Positive cervical cancer screening - needs immediate follow up'
                                    : 'Mental health support needed based on screening results',
                            ]);
                            $consultationId = $consultation->id;
                            Log::info('Consultation created', ['consultation_id' => $consultationId]);
                        }
                    } catch (\Exception $e) {
                        Log::warning('Failed to create consultation', [
                            'error' => $e->getMessage(),
                            'visit_id' => $visit->id
                        ]);
                    }
                }

                // Update visit
                $visit->update([
                    'last_screening_date' => $record['screening_date'],
                ]);

                return response()->json([
                    'message' => 'Screening submitted successfully',
                    'data' => $screening,
                    'image_url' => $imageUrl,
                    'events_dispatched' => [
                        'main_screening' => true,
                        'positive' => $isPositive,
                        'negative' => (!$isPositive && $screeningResult === 'negative'),
                        'mental_health' => $needsMentalHealth,
                        'ncd' => $hasNCDRisk,
                    ]
                ], 201);

            });

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating integrated screening', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Failed to create screening',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Dispatch main screening event - using string event_type
     */
    private function dispatchScreeningEvent($screening, array $data, $patient, $visit, $facilityId, $district, $province): void
    {
        try {
            $eventData = [
                'source_type' => 'screening',
                'event_type' => 'integrated_screening', // String value
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $patient->id,
                'entity_type' => 'patient',
                'entity_name' => $patient->full_name ?? null,
                'age' => $patient->age ?? null,
                'gender' => $patient->gender ?? null,
                'phone' => $patient->phone ?? null,
                'event_date' => $data['screening_date'] ?? now()->toDateString(),
                'screening_type' => 'integrated_cervical',
                'result' => $data['screening_result'] ?? 'pending',
                'result_date' => now(),
                'provider_name' => $data['provider_name'] ?? null,
                'performed_by' => $data['created_by'] ?? null,
                'status' => 'completed',
                'payload' => [
                    'screening_id' => $screening->id,
                    'visit_id' => $visit->id,
                    'screening_method' => $data['screening_method'] ?? null,
                    'treatment_decision' => $data['treatment_decision'] ?? null,
                    'follow_up_date' => $data['follow_up_date'] ?? null,
                    'is_positive' => $data['is_positive'] ?? false,
                ],
                'metadata' => [
                    'form_id' => 'integrated_screening',
                    'form_version' => '3.0.0',
                    'source' => 'web',
                    'event_sub_type' => 'main_screening',
                ],
            ];

            ProcessEventData::dispatch($eventData, 'screening');

            Log::info('Main screening event dispatched', [
                'screening_id' => $screening->id,
                'event_type' => 'integrated_screening',
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch main screening event', [
                'screening_id' => $screening->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Dispatch positive screening event - using string event_type
     */
    private function dispatchPositiveScreeningEvent($screening, array $data, $patient, $visit, $facilityId, $district, $province): void
    {
        try {
            $eventData = [
                'source_type' => 'screening',
                'event_type' => 'positive_cervical_screening', // String value
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $patient->id,
                'entity_type' => 'patient',
                'entity_name' => $patient->full_name ?? null,
                'age' => $patient->age ?? null,
                'gender' => $patient->gender ?? null,
                'phone' => $patient->phone ?? null,
                'event_date' => $data['screening_date'] ?? now()->toDateString(),
                'screening_type' => 'cervical_cancer',
                'result' => $data['screening_result'] ?? 'positive',
                'result_date' => now(),
                'risk_level' => 'high',
                'provider_name' => $data['provider_name'] ?? null,
                'performed_by' => $data['created_by'] ?? null,
                'status' => 'requires_followup',
                'follow_up_date' => $data['follow_up_date'] ?? now()->addWeeks(2)->toDateString(),
                'payload' => [
                    'screening_id' => $screening->id,
                    'visit_id' => $visit->id,
                    'screening_method' => $data['screening_method'] ?? null,
                    'treatment_decision' => $data['treatment_decision'] ?? null,
                    'consultant_id' => $data['consultant_id'] ?? null,
                    'cervical_image_url' => $data['cervical_image_url'] ?? null,
                ],
                'metadata' => [
                    'event_sub_type' => 'positive_screening',
                    'priority' => 'high',
                    'requires_consultation' => true,
                    'result_type' => 'positive',
                ],
            ];

            ProcessEventData::dispatch($eventData, 'screening');

            Log::info('Positive screening event dispatched', [
                'screening_id' => $screening->id,
                'event_type' => 'positive_cervical_screening',
                'facility_id' => $facilityId,
                'district' => $district,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch positive screening event', [
                'screening_id' => $screening->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Dispatch negative screening event - using string event_type
     */
    private function dispatchNegativeScreeningEvent($screening, array $data, $patient, $visit, $facilityId, $district, $province): void
    {
        try {
            $eventData = [
                'source_type' => 'screening',
                'event_type' => 'negative_cervical_screening', // String value
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $patient->id,
                'entity_type' => 'patient',
                'entity_name' => $patient->full_name ?? null,
                'age' => $patient->age ?? null,
                'gender' => $patient->gender ?? null,
                'phone' => $patient->phone ?? null,
                'event_date' => $data['screening_date'] ?? now()->toDateString(),
                'screening_type' => 'cervical_cancer',
                'result' => 'negative',
                'result_date' => now(),
                'risk_level' => 'low',
                'provider_name' => $data['provider_name'] ?? null,
                'performed_by' => $data['created_by'] ?? null,
                'status' => 'completed',
                'payload' => [
                    'screening_id' => $screening->id,
                    'visit_id' => $visit->id,
                    'screening_method' => $data['screening_method'] ?? null,
                    'follow_up_date' => $data['follow_up_date'] ?? null,
                ],
                'metadata' => [
                    'event_sub_type' => 'negative_screening',
                    'priority' => 'normal',
                    'result_type' => 'negative',
                ],
            ];

            ProcessEventData::dispatch($eventData, 'screening');

            Log::info('Negative screening event dispatched', [
                'screening_id' => $screening->id,
                'event_type' => 'negative_cervical_screening',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch negative screening event', [
                'screening_id' => $screening->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Dispatch mental health event - using string event_type
     */
    private function dispatchMentalHealthEvent($screening, array $data, $patient, $visit, $facilityId, $district, $province): void
    {
        try {
            $phq9 = (int)($data['phq9_score'] ?? 0);
            $gad7 = (int)($data['gad7_score'] ?? 0);
            $distress = (int)($data['distress_thermometer'] ?? 0);

            $riskLevel = $this->getMentalHealthRiskLevel($phq9, $gad7, $distress);

            $eventData = [
                'source_type' => 'mental_health',
                'event_type' => 'mental_health_screening', // String value
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $patient->id,
                'entity_type' => 'patient',
                'entity_name' => $patient->full_name ?? null,
                'age' => $patient->age ?? null,
                'gender' => $patient->gender ?? null,
                'phone' => $patient->phone ?? null,
                'event_date' => $data['screening_date'] ?? now()->toDateString(),
                'risk_level' => $riskLevel,
                'provider_name' => $data['provider_name'] ?? null,
                'performed_by' => $data['created_by'] ?? null,
                'status' => $riskLevel === 'high' ? 'requires_intervention' : 'monitoring',
                'follow_up_date' => $data['follow_up_date'] ?? now()->addWeeks(1)->toDateString(),
                'payload' => [
                    'screening_id' => $screening->id,
                    'visit_id' => $visit->id,
                    'phq9_score' => $phq9,
                    'phq9_category' => $data['phq9_category'] ?? null,
                    'gad7_score' => $gad7,
                    'gad7_category' => $data['gad7_category'] ?? null,
                    'distress_thermometer' => $distress,
                    'mental_health_services' => $data['mental_health_services'] ?? [],
                    'mental_health_risk_level' => $data['mental_health_risk_level'] ?? null,
                ],
                'metadata' => [
                    'event_sub_type' => 'mental_health_screening',
                    'priority' => $riskLevel === 'high' ? 'high' : 'normal',
                    'requires_action' => $riskLevel === 'high',
                    'phq9_score' => $phq9,
                    'gad7_score' => $gad7,
                ],
            ];

            ProcessEventData::dispatch($eventData, 'mental_health');

            Log::info('Mental health event dispatched', [
                'screening_id' => $screening->id,
                'event_type' => 'mental_health_screening',
                'risk_level' => $riskLevel,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch mental health event', [
                'screening_id' => $screening->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Dispatch NCD event - using string event_type
     */


// In IntegratedScreeningController.php - update the dispatch methods


// In IntegratedScreeningController.php - update the dispatch methods

    private function dispatchNCDEvent($screening, array $data, $patient, $visit, $facilityId, $district, $province): void
    {
        try {
            // Ensure district and province are set
            if (empty($district) || empty($province)) {
                // Try to get from facility
                if ($facilityId) {
                    $facility = \App\Models\EnrolledFacility::find($facilityId);
                    if ($facility) {
                        if (empty($district) && !empty($facility->district)) {
                            $district = $facility->district;
                        }
                        if (empty($province) && !empty($facility->province)) {
                            $province = $facility->province;
                        }
                    }
                }

                // Still empty? Use default
                if (empty($district)) {
                    $district = $data['district'] ?? 'Unknown';
                }
                if (empty($province)) {
                    $province = $data['province'] ?? 'Unknown';
                }
            }

            $bmi = (float)($data['bmi'] ?? 0);
            $systolic = (int)($data['systolic_bp'] ?? 0);
            $diastolic = (int)($data['diastolic_bp'] ?? 0);

            $riskLevel = $data['ncd_risk_level'] ?? $this->getNCDRiskLevel($bmi, $systolic, $diastolic);

            $eventData = [
                'source_type' => 'ncd',
                'event_type' => 'ncd_screening',
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $patient->id,
                'entity_type' => 'patient',
                'entity_name' => $patient->full_name ?? null,
                'age' => $patient->age ?? null,
                'gender' => $patient->gender ?? null,
                'phone' => $patient->phone ?? null,
                'event_date' => $data['screening_date'] ?? now()->toDateString(),
                'risk_level' => $riskLevel,
                'provider_name' => $data['provider_name'] ?? null,
                'performed_by' => $data['created_by'] ?? null,
                'status' => $riskLevel === 'high' || $riskLevel === 'moderate' ? 'requires_intervention' : 'monitoring',
                'follow_up_date' => $data['follow_up_date'] ?? now()->addWeeks(4)->toDateString(),
                'payload' => [
                    'screening_id' => $screening->id,
                    'visit_id' => $visit->id,
                    'weight_kg' => $data['weight_kg'] ?? null,
                    'height_cm' => $data['height_cm'] ?? null,
                    'bmi' => $bmi,
                    'bmi_category' => $data['bmi_category'] ?? null,
                    'systolic_bp' => $systolic,
                    'diastolic_bp' => $diastolic,
                    'bp_category' => $data['bp_category'] ?? null,
                    'ncd_risk_level' => $riskLevel,
                ],
                'metadata' => [
                    'event_sub_type' => 'ncd_screening',
                    'priority' => $riskLevel === 'high' ? 'high' : ($riskLevel === 'moderate' ? 'medium' : 'low'),
                    'requires_action' => $riskLevel === 'high' || $riskLevel === 'moderate',
                    'bmi' => $bmi,
                    'blood_pressure' => $systolic . '/' . $diastolic,
                    'facility_district' => $district,
                    'facility_province' => $province,
                ],
            ];

            ProcessEventData::dispatch($eventData, 'ncd');

            Log::info('NCD event dispatched', [
                'screening_id' => $screening->id,
                'event_type' => 'ncd_screening',
                'risk_level' => $riskLevel,
                'district' => $district,
                'province' => $province,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch NCD event', [
                'screening_id' => $screening->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }


    /**
     * Determine if screening is positive
     */
    private function determinePositiveScreening(array $data): bool
    {
        $result = $data['screening_result'] ?? '';
        return in_array($result, ['via_positive', 'hpv_positive', 'suspicious_cancer', 'positive']);
    }

    /**
     * Determine if mental health support is needed
     */
    private function determineMentalHealthNeed(int $distress, int $anxiety, int $depression): bool
    {
        return $distress >= 7 || $anxiety >= 10 || $depression >= 10;
    }

    /**
     * Determine if NCD risk is present
     */
    private function determineNCDRisk(array $data): bool
    {
        $bmi = (float)($data['bmi'] ?? 0);
        $systolic = (int)($data['systolic_bp'] ?? 0);
        $diastolic = (int)($data['diastolic_bp'] ?? 0);

        // Check for abnormal BMI
        if ($bmi >= 25 || ($bmi > 0 && $bmi < 18.5)) {
            return true;
        }

        // Check for abnormal BP
        if ($systolic >= 130 || $diastolic >= 80) {
            return true;
        }

        return false;
    }

    /**
     * Get mental health risk level
     */
    private function getMentalHealthRiskLevel(int $phq9, int $gad7, int $distress): string
    {
        if ($phq9 >= 15 || $gad7 >= 15 || $distress >= 8) {
            return 'high';
        }
        if ($phq9 >= 10 || $gad7 >= 10 || $distress >= 5) {
            return 'moderate';
        }
        return 'low';
    }

    /**
     * Get NCD risk level
     */
    private function getNCDRiskLevel(float $bmi, int $systolic, int $diastolic): string
    {
        if ($bmi >= 30 || $systolic >= 140 || $diastolic >= 90) {
            return 'high';
        }
        if ($bmi >= 25 || $systolic >= 130 || $diastolic >= 80) {
            return 'moderate';
        }
        return 'low';
    }

    /**
     * Calculate follow-up date
     */
    private function calculateFollowUpDate(array $data, bool $isPositive): ?string
    {
        if (isset($data['follow_up_date']) && !empty($data['follow_up_date'])) {
            return $data['follow_up_date'];
        }
        if ($isPositive) {
            return now()->addWeeks(2)->toDateString();
        }
        return null;
    }
}

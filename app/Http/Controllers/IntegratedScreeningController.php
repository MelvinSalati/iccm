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
use App\Events\ScreeningRecorded;
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

                $isPositive = $this->determinePositiveScreening($screeningData);
                $needsMentalHealth = $this->determineMentalHealthNeed($distress, $anxiety, $depression);
                $consultantId = $screeningData['consultant_id'] ?? null;

                // ✅ Build metrics array - DON'T encode with json_encode()
                $metricsArray = [
                    'distress_thermometer' => $distress,
                    'anxiety_gad7_score' => $anxiety,
                    'depression_phq9_score' => $depression,
                    'is_positive' => $isPositive,
                    'needs_mental_health' => $needsMentalHealth,
                    'treatment_decision' => $treatmentDecision,
                    'mental_health_services' => $screeningData['mental_health_services'] ?? [],
                    'sms_reminder_sent' => $screeningData['sms_reminder_sent'] ?? false,
                    'cervical_image_url' => $imageUrl,
                    'consultant_id' => $consultantId,
                    'provider_id' => $request->provider_id,
                    'facility_id' => $request->facility_id || 1,
                ];

                // ✅ Build record - Let the model handle JSON casting
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
                    // ✅ Pass as array - model casting will handle JSON encoding
                    'metrics' => $metricsArray,
                    'full_data' => $screeningData,
                    'submitted_at' => now(),
                ];

                Log::info('Creating integrated screening record', [
                    'patient_id' => $patient->id,
                    'visit_id' => $visit->id,
                    'user_id' => $request->created_by,
                    'is_positive' => $isPositive,
                ]);

                // ✅ Create screening record
                $screening = IntegratedScreening::create($record);

                // In your IntegratedScreeningController.php store method:

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
                                'facility_id' => $request->facility_id ?? 1,
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
                        // Continue without consultation
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

    // ✅ Helper methods - make sure these are included
    private function determinePositiveScreening(array $data): bool
    {
        $result = $data['screening_result'] ?? '';
        return in_array($result, ['via_positive', 'hpv_positive', 'suspicious_cancer', 'positive']);
    }

    private function determineMentalHealthNeed(int $distress, int $anxiety, int $depression): bool
    {
        return $distress >= 7 || $anxiety >= 10 || $depression >= 10;
    }

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

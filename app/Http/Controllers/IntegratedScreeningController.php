<?php

namespace App\Http\Controllers;

use App\Helpers\IdentifiersHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IntegratedScreening;
use App\Events\ScreeningRecorded;
use Illuminate\Support\Facades\Log;

class IntegratedScreeningController extends Controller
{
    public function store(Request $request, $patientuuid, $visitId)
    {
        try {
            $validated = $request->validate([
                'data' => 'required|array',
                'form_id' => 'required|string',
                'form_version' => 'required|string',
//                'created_by' => 'required|uuid|exists:users,id',
            ]);

            $screeningData = $validated['data'];
            $patientId = IdentifiersHelper::getPatientIdByUuid($patientuuid);

            if (!$patientId) {
                return response()->json([
                    'message' => 'Patient not found'
                ], 404);
            }

            // Extract metrics
            $distress = (int)($screeningData['distress_thermometer'] ?? 0);
            $anxiety = (int)($screeningData['anxiety_gad7_score'] ?? 0);
            $depression = (int)($screeningData['depression_phq9_score'] ?? 0);
            $screeningResult = $screeningData['screening_result'] ?? '';
            $isPositive = in_array($screeningResult, ['via_positive', 'hpv_positive', 'suspicious_cancer']);
            $needsMentalHealth = $distress >= 7 || $anxiety >= 10 || $depression >= 10;

            $record = [
                // IDs
                'patient_uuid' => $patientuuid,
                'visit_uuid' => $visitId,
                'patient_id' => $patientId,
                'visit_id' => $visitId,

                // Use user_id (matches your model)
                'created_by' => $request->created_by,

                // Screening data
                'screening_date' => $screeningData['screening_date'] ?? now()->toDateString(),
                'screening_method' => $screeningData['screening_method'] ?? null,
                'screening_result' => $screeningResult,
                'treatment_decision' => $screeningData['treatment_decision'] ?? null,

                // JSON data
                'metrics' => [
                    'distress_thermometer' => $distress,
                    'anxiety_gad7_score' => $anxiety,
                    'depression_phq9_score' => $depression,
                    'is_positive' => $isPositive,
                    'needs_mental_health' => $needsMentalHealth,
                    'treatment_decision' => $screeningData['treatment_decision'] ?? null,
                    'mental_health_services' => $screeningData['mental_health_services'] ?? [],
                    'sms_reminder_sent' => $screeningData['sms_reminder_sent'] ?? false,
                ],

                'full_data' => $screeningData,

                'submitted_at' => now(),
            ];

            Log::info('Creating screening record', [
                'patient_id' => $patientId,
                'visit_id' => $visitId,
                'user_id' => $request->created_by,
            ]);

            $screening = IntegratedScreening::create($record);

            if (class_exists('App\Events\ScreeningRecorded')) {
                event(new ScreeningRecorded($screening));
            }

            return response()->json([
                'message' => 'Screening submitted successfully',
                'data' => $screening
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating screening', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to create screening',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

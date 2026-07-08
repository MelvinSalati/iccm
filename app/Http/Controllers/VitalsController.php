<?php
// app/Http/Controllers/Api/VitalsController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientVital;
use App\Models\Patient;
use App\Models\Visit;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class VitalsController extends Controller
{
    /**
     * Store new vitals for a patient/visit
     */
    public function store(Request $request, $patientUuid, $visitId)
    {
        try {
            $validated = $request->validate([
                'systolic_bp' => 'nullable|integer|min:50|max:250',
                'diastolic_bp' => 'nullable|integer|min:30|max:180',
                'heart_rate' => 'nullable|integer|min:20|max:250',
                'temperature' => 'nullable|numeric|min:32|max:45',
                'respiratory_rate' => 'nullable|integer|min:4|max:60',
                'oxygen_saturation' => 'nullable|integer|min:50|max:100',
                'weight' => 'nullable|numeric|min:1|max:500',
                'height' => 'nullable|numeric|min:20|max:300',
                'bmi' => 'nullable|numeric|min:5|max:100',
                'blood_glucose' => 'nullable|numeric|min:1|max:50',
                'pain_score' => 'nullable|integer|min:0|max:10',
                'pain_location' => 'nullable|string|max:255',
                'recorded_at' => 'nullable|date',
                'created_by' => 'required|uuid|exists:users,id',
            ]);

            // Find patient
            $patient = Patient::where('patient_uuid', $patientUuid)->first();
            if (!$patient) {
                return response()->json([
                    'success' => false,
                    'message' => 'Patient not found'
                ], 404);
            }

            // Find visit if provided
            $visit = null;
            if ($visitId) {
                $visit = Visit::where('id', $visitId)->orWhere('visit_number', $visitId)->first();
            }

            // Calculate BMI if not provided but height and weight are
            $bmi = $validated['bmi'] ?? null;
            if (!$bmi && !empty($validated['weight']) && !empty($validated['height']) && $validated['height'] > 0) {
                $heightInMeters = $validated['height'] / 100;
                $bmi = round($validated['weight'] / ($heightInMeters * $heightInMeters), 2);
            }

            // Start transaction
            DB::beginTransaction();

            // Mark all previous vitals as not current
            PatientVital::where('patient_uuid', $patientUuid)
                ->where('is_current', true)
                ->update(['is_current' => false]);

            // Create new vitals record
            $vital = PatientVital::create([
                'id' => (string) Str::uuid(),
                'patient_uuid' => $patientUuid,
                'visit_uuid' => $visit?->id,
                'recorded_by' => $validated['created_by'],
                'systolic_bp' => $validated['systolic_bp'] ?? null,
                'diastolic_bp' => $validated['diastolic_bp'] ?? null,
                'heart_rate' => $validated['heart_rate'] ?? null,
                'temperature' => $validated['temperature'] ?? null,
                'respiratory_rate' => $validated['respiratory_rate'] ?? null,
                'oxygen_saturation' => $validated['oxygen_saturation'] ?? null,
                'weight' => $validated['weight'] ?? null,
                'height' => $validated['height'] ?? null,
                'bmi' => $bmi,
                'blood_glucose' => $validated['blood_glucose'] ?? null,
                'pain_score' => $validated['pain_score'] ?? null,
                'pain_location' => $validated['pain_location'] ?? null,
                'recorded_at' => $validated['recorded_at'] ?? now(),
                'is_current' => true,
                'status' => 'active',
                'metadata' => [
                    'source' => 'api',
                    'visit_type' => $visit?->visit_type,
                    'recorded_by_name' => $request->user()?->name,
                ],
            ]);

            DB::commit();

            Log::info('Vitals recorded', [
                'patient_uuid' => $patientUuid,
                'visit_id' => $visitId,
                'vital_id' => $vital->id,
                'recorded_by' => $validated['created_by'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vitals recorded successfully',
                'data' => $vital->formatted,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error recording vitals', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to record vitals',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get current vitals for a patient
     */
    public function current(Request $request, $patientUuid)
    {
        try {
            $vital = PatientVital::where('patient_uuid', $patientUuid)
                ->where('is_current', true)
                ->with(['recorder'])
                ->first();

            if (!$vital) {
                return response()->json([
                    'success' => false,
                    'message' => 'No current vitals found for this patient',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $vital->formatted,
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching current vitals', [
                'patient_uuid' => $patientUuid,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch current vitals',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get vitals for a specific visit
     */
    public function forVisit(Request $request, $patientUuid, $visitId)
    {
        try {
            $vitals = PatientVital::where('patient_uuid', $patientUuid)
                ->where('visit_uuid', $visitId)
                ->with(['recorder'])
                ->orderBy('recorded_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $vitals->map->formatted,
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching visit vitals', [
                'patient_uuid' => $patientUuid,
                'visit_id' => $visitId,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch visit vitals',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get vitals history for a patient
     */
    public function history(Request $request, $patientUuid)
    {
        try {
            $limit = $request->input('limit', 10);
            $from = $request->input('from');
            $to = $request->input('to');

            $query = PatientVital::where('patient_uuid', $patientUuid)
                ->with(['recorder'])
                ->orderBy('recorded_at', 'desc');

            if ($from) {
                $query->where('recorded_at', '>=', $from);
            }
            if ($to) {
                $query->where('recorded_at', '<=', $to);
            }

            $vitals = $query->limit($limit)->get();

            return response()->json([
                'success' => true,
                'data' => $vitals->map->formatted,
                'meta' => [
                    'count' => $vitals->count(),
                    'limit' => $limit,
                    'has_more' => $vitals->count() >= $limit,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching vitals history', [
                'patient_uuid' => $patientUuid,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch vitals history',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update a vitals record
     */
    public function update(Request $request, $patientUuid, $vitalId)
    {
        try {
            $validated = $request->validate([
                'systolic_bp' => 'nullable|integer|min:50|max:250',
                'diastolic_bp' => 'nullable|integer|min:30|max:180',
                'heart_rate' => 'nullable|integer|min:20|max:250',
                'temperature' => 'nullable|numeric|min:32|max:45',
                'respiratory_rate' => 'nullable|integer|min:4|max:60',
                'oxygen_saturation' => 'nullable|integer|min:50|max:100',
                'weight' => 'nullable|numeric|min:1|max:500',
                'height' => 'nullable|numeric|min:20|max:300',
                'bmi' => 'nullable|numeric|min:5|max:100',
                'blood_glucose' => 'nullable|numeric|min:1|max:50',
                'pain_score' => 'nullable|integer|min:0|max:10',
                'pain_location' => 'nullable|string|max:255',
            ]);

            $vital = PatientVital::where('patient_uuid', $patientUuid)
                ->where('id', $vitalId)
                ->first();

            if (!$vital) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vitals record not found',
                ], 404);
            }

            // Calculate BMI if needed
            $bmi = $validated['bmi'] ?? null;
            if (!$bmi && isset($validated['weight']) && isset($validated['height']) && $validated['height'] > 0) {
                $heightInMeters = $validated['height'] / 100;
                $bmi = round($validated['weight'] / ($heightInMeters * $heightInMeters), 2);
                $validated['bmi'] = $bmi;
            }

            $vital->update($validated);

            Log::info('Vitals updated', [
                'patient_uuid' => $patientUuid,
                'vital_id' => $vitalId,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vitals updated successfully',
                'data' => $vital->formatted,
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating vitals', [
                'patient_uuid' => $patientUuid,
                'vital_id' => $vitalId,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update vitals',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get vitals statistics for a patient
     */
    public function stats(Request $request, $patientUuid)
    {
        try {
            $stats = PatientVital::where('patient_uuid', $patientUuid)
                ->select([
                    DB::raw('AVG(systolic_bp) as avg_systolic_bp'),
                    DB::raw('AVG(diastolic_bp) as avg_diastolic_bp'),
                    DB::raw('AVG(heart_rate) as avg_heart_rate'),
                    DB::raw('AVG(temperature) as avg_temperature'),
                    DB::raw('AVG(weight) as avg_weight'),
                    DB::raw('AVG(bmi) as avg_bmi'),
                    DB::raw('COUNT(*) as total_readings'),
                    DB::raw('MAX(recorded_at) as last_recorded_at'),
                ])
                ->first();

            // Get latest reading
            $latest = PatientVital::where('patient_uuid', $patientUuid)
                ->orderBy('recorded_at', 'desc')
                ->first();

            return response()->json([
                'success' => true,
                'data' => [
                    'statistics' => [
                        'avg_systolic_bp' => round($stats->avg_systolic_bp ?? 0, 1),
                        'avg_diastolic_bp' => round($stats->avg_diastolic_bp ?? 0, 1),
                        'avg_heart_rate' => round($stats->avg_heart_rate ?? 0, 1),
                        'avg_temperature' => round($stats->avg_temperature ?? 0, 1),
                        'avg_weight' => round($stats->avg_weight ?? 0, 2),
                        'avg_bmi' => round($stats->avg_bmi ?? 0, 2),
                        'total_readings' => $stats->total_readings ?? 0,
                        'last_recorded_at' => $stats->last_recorded_at,
                    ],
                    'latest' => $latest?->formatted,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching vitals stats', [
                'patient_uuid' => $patientUuid,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch vitals statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

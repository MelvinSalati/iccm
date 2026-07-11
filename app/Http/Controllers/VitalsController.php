<?php
// app/Http/Controllers/Api/VitalsController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientVital;
use App\Models\Patients\Patient;
use App\Models\Patients\PatientVisit as Visit;
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
            // Get all data from request
            $data = $request->all();

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
            if ($visitId && $visitId !== 'null' && $visitId !== 'undefined') {
                $visit = Visit::where('id', $visitId)->orWhere('visit_number', $visitId)->first();
            }

            // Calculate BMI if not provided but height and weight are
            $bmi = $data['bmi'] ?? null;
            if (!$bmi && !empty($data['weight']) && !empty($data['height']) && $data['height'] > 0) {
                $heightInMeters = $data['height'] / 100;
                $bmi = round($data['weight'] / ($heightInMeters * $heightInMeters), 2);
            }

            // Ensure BMI is within reasonable range, otherwise set to null
            if ($bmi !== null && ($bmi < 5 || $bmi > 100)) {
                $bmi = null;
            }

            // Start transaction
            DB::beginTransaction();

            // Mark all previous vitals as not current
            PatientVital::where('patient_uuid', $patientUuid)
                ->where('is_current', true)
                ->update(['is_current' => false]);

            // Prepare data with proper types for SQLite - explicitly handle nulls
            $vitalData = [
                'id' => (string) Str::uuid(),
                'patient_uuid' => $patientUuid,
                'visit_uuid' => $visit?->id,
                'recorded_by' => isset($data['created_by']) ? (string) $data['created_by'] : null,
                'systolic_bp' => isset($data['systolic_bp']) && $data['systolic_bp'] !== '' && $data['systolic_bp'] !== null ? (int) $data['systolic_bp'] : null,
                'diastolic_bp' => isset($data['diastolic_bp']) && $data['diastolic_bp'] !== '' && $data['diastolic_bp'] !== null ? (int) $data['diastolic_bp'] : null,
                'heart_rate' => isset($data['heart_rate']) && $data['heart_rate'] !== '' && $data['heart_rate'] !== null ? (int) $data['heart_rate'] : null,
                'temperature' => isset($data['temperature']) && $data['temperature'] !== '' && $data['temperature'] !== null ? (float) $data['temperature'] : null,
                'respiratory_rate' => isset($data['respiratory_rate']) && $data['respiratory_rate'] !== '' && $data['respiratory_rate'] !== null ? (int) $data['respiratory_rate'] : null,
                'oxygen_saturation' => isset($data['oxygen_saturation']) && $data['oxygen_saturation'] !== '' && $data['oxygen_saturation'] !== null ? (int) $data['oxygen_saturation'] : null,
                'weight' => isset($data['weight']) && $data['weight'] !== '' && $data['weight'] !== null ? (float) $data['weight'] : null,
                'height' => isset($data['height']) && $data['height'] !== '' && $data['height'] !== null ? (float) $data['height'] : null,
                'bmi' => $bmi !== null ? (float) $bmi : null,
                'blood_glucose' => isset($data['blood_glucose']) && $data['blood_glucose'] !== '' && $data['blood_glucose'] !== null ? (float) $data['blood_glucose'] : null,
                'pain_score' => isset($data['pain_score']) && $data['pain_score'] !== '' && $data['pain_score'] !== null ? (int) $data['pain_score'] : null,
                'pain_location' => isset($data['pain_location']) && $data['pain_location'] !== '' ? (string) $data['pain_location'] : null,
                'recorded_at' => isset($data['recorded_at']) ? $data['recorded_at'] : now(),
                'is_current' => true,
                'status' => isset($data['status']) && $data['status'] !== '' ? (string) $data['status'] : 'active',
                'metadata' => json_encode(array_merge(
                    [
                        'source' => 'api',
                        'visit_type' => $visit?->visit_type,
                        'recorded_by_name' => $request->user()?->name,
                    ],
                    isset($data['metadata']) && is_array($data['metadata']) ? $data['metadata'] : []
                )),
            ];

            // Remove any null values that might cause issues with SQLite
            // But keep the fields that should be null
            $finalData = [];
            foreach ($vitalData as $key => $value) {
                if ($key === 'metadata') {
                    $finalData[$key] = $value;
                } elseif ($value !== null && $value !== '') {
                    $finalData[$key] = $value;
                } else {
                    $finalData[$key] = null;
                }
            }

            Log::info('Attempting to insert vitals', ['data' => $finalData]);

            // Create new vitals record
            $vital = PatientVital::create($finalData);

            DB::commit();

            Log::info('Vitals recorded successfully', [
                'patient_uuid' => $patientUuid,
                'visit_id' => $visitId,
                'vital_id' => $vital->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vitals recorded successfully',
                'data' => $vital->formatted ?? $vital,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error recording vitals', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to record vitals: ' . $e->getMessage(),
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
                'data' => $vital->formatted ?? $vital,
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
                'data' => $vitals->map(function($vital) {
                    return $vital->formatted ?? $vital;
                }),
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
                'data' => $vitals->map(function($vital) {
                    return $vital->formatted ?? $vital;
                }),
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
            $data = $request->all();

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
            $bmi = $data['bmi'] ?? null;
            if (!$bmi && isset($data['weight']) && isset($data['height']) && $data['height'] > 0) {
                $heightInMeters = $data['height'] / 100;
                $bmi = round($data['weight'] / ($heightInMeters * $heightInMeters), 2);
                $data['bmi'] = $bmi;
            }

            // Ensure BMI is within reasonable range
            if (isset($data['bmi']) && ($data['bmi'] < 5 || $data['bmi'] > 100)) {
                $data['bmi'] = null;
            }

            // Cast numeric values and handle nulls
            $numericFields = [
                'systolic_bp', 'diastolic_bp', 'heart_rate', 'temperature',
                'respiratory_rate', 'oxygen_saturation', 'weight', 'height',
                'bmi', 'blood_glucose', 'pain_score'
            ];

            foreach ($numericFields as $field) {
                if (isset($data[$field]) && $data[$field] !== '' && $data[$field] !== null) {
                    if (in_array($field, ['temperature', 'weight', 'height', 'bmi', 'blood_glucose'])) {
                        $data[$field] = (float) $data[$field];
                    } else {
                        $data[$field] = (int) $data[$field];
                    }
                } else {
                    $data[$field] = null;
                }
            }

            // Update metadata if provided
            if (isset($data['metadata']) && is_array($data['metadata'])) {
                $currentMetadata = $vital->metadata ?? [];
                $data['metadata'] = array_merge($currentMetadata, $data['metadata']);
            }

            $vital->update($data);

            Log::info('Vitals updated', [
                'patient_uuid' => $patientUuid,
                'vital_id' => $vitalId,
                'data' => $data,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vitals updated successfully',
                'data' => $vital->formatted ?? $vital,
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
                    'latest' => $latest?->formatted ?? $latest,
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

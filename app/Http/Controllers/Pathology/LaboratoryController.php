<?php

namespace App\Http\Controllers\Pathology;

use App\Http\Controllers\Controller;
use App\Models\LaboratoryOrder;
use App\Models\Patients\Patient;
use App\Models\SampleQualityAssessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LaboratoryController extends Controller
{
    /**
     * View laboratory orders with patient information
     */
    public function viewLaboratoryOrders()
    {
        try {
            // Join with patients and map the data
            $viewLaboratoryOrders = LaboratoryOrder::join('patients', 'laboratory_orders.patient_id', '=', 'patients.id')
                ->select(
                    'laboratory_orders.*',
                    'patients.first_name as patient_first_name',
                    'patients.last_name as patient_last_name',
                    'patients.patient_uuid',
                    'patients.date_of_birth',
                    'patients.gender',
                    'patients.phone_number'
                )
                ->orderBy('laboratory_orders.created_at', 'desc')
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'laboratory_uuid' => $order->laboratory_uuid,
                        'patient_id' => $order->patient_id,
                        'patient_uuid' => $order->patient_uuid,
                        'patient_name' => $order->patient_first_name && $order->patient_last_name
                            ? $order->patient_first_name . ' ' . $order->patient_last_name
                            : 'Patient #' . $order->patient_id,
                        'patient_first_name' => $order->patient_first_name ?? null,
                        'patient_last_name' => $order->patient_last_name ?? null,
                        'patient_date_of_birth' => $order->date_of_birth ?? null,
                        'patient_gender' => $order->gender ?? null,
                        'patient_phone' => $order->phone_number ?? null,
                        'facility_id' => $order->facility_id,
                        'facility_name' => $order->facility ? $order->facility->name : null,
                        'ordered_by' => $order->ordered_by,
                        'ordered_by_name' => $order->user ? $order->user->name : null,
                        'results' => $order->results,
                        'status' => $order->status,
                        'sample_status' => $order->sample_status ?? null,
                        'processed_by' => $order->processed_by,
                        'processed_by_name' => $order->resultEntry ? $order->resultEntry->name : null,
                        'comment' => $order->comment,
                        'priority' => $order->priority ?? 'routine',
                        'test_ids' => $order->test_ids ?? [],
                        'test_names' => $order->test_names ?? null,
                        'test_count' => $order->test_count ?? 0,
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ];
                });

            // Log for debugging
            Log::info('Laboratory orders fetched:', ['count' => $viewLaboratoryOrders->count()]);

            return Inertia::render('Pathology/lab-orders', [
                'orders' => $viewLaboratoryOrders,
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching laboratory orders:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('Pathology/lab-orders', [
                'orders' => [],
                'auth' => [
                    'user' => auth()->user(),
                ],
                'error' => 'Failed to load laboratory orders'
            ]);
        }
    }

    public function createOrder(Request $request)
    {
        $data = array_merge($request->all(), [
            'laboratory_uuid' => Str::uuid(),
            'order_number' => rand(111111, 999999)
        ]);
        $order = LaboratoryOrder::create($data);
        return response()->json([
            'message' => 'Laboratory order created successfully!',
            'order' => $order
        ], 201);
    }

    /**
     * Get a single laboratory order with patient details
     */
    public function getOrder($id)
    {
        try {
            $order = LaboratoryOrder::with(['user', 'facility', 'resultEntry'])
                ->join('patients', 'laboratory_orders.patient_id', '=', 'patients.id')
                ->select(
                    'laboratory_orders.*',
                    'patients.first_name as patient_first_name',
                    'patients.last_name as patient_last_name',
                    'patients.patient_uuid',
                    'patients.date_of_birth',
                    'patients.gender',
                    'patients.phone_number'
                )
                ->where('laboratory_orders.id', $id)
                ->first();

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $order->id,
                    'laboratory_uuid' => $order->laboratory_uuid,
                    'patient_id' => $order->patient_id,
                    'patient_uuid' => $order->patient_uuid,
                    'patient_name' => $order->patient_first_name && $order->patient_last_name
                        ? $order->patient_first_name . ' ' . $order->patient_last_name
                        : 'Patient #' . $order->patient_id,
                    'patient_first_name' => $order->patient_first_name,
                    'patient_last_name' => $order->patient_last_name,
                    'patient_date_of_birth' => $order->date_of_birth,
                    'patient_gender' => $order->gender,
                    'patient_phone' => $order->phone_number,
                    'facility_id' => $order->facility_id,
                    'facility_name' => $order->facility ? $order->facility->name : null,
                    'ordered_by' => $order->ordered_by,
                    'ordered_by_name' => $order->user ? $order->user->name : null,
                    'results' => $order->results,
                    'status' => $order->status,
                    'sample_status' => $order->sample_status ?? null,
                    'processed_by' => $order->processed_by,
                    'processed_by_name' => $order->resultEntry ? $order->resultEntry->name : null,
                    'comment' => $order->comment,
                    'priority' => $order->priority ?? 'routine',
                    'test_ids' => $order->test_ids ?? [],
                    'test_names' => $order->test_names ?? null,
                    'test_count' => $order->test_count ?? 0,
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching order:', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get orders for a specific patient by UUID
     */
    public function getPatientOrders($patientUuid)
    {
        try {
            $patient = Patient::where('patient_uuid', $patientUuid)->first();

            if (!$patient) {
                return response()->json([
                    'success' => false,
                    'message' => 'Patient not found'
                ], 404);
            }

            $orders = LaboratoryOrder::where('patient_id', $patient->id)
                ->with(['user', 'facility', 'resultEntry'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'laboratory_uuid' => $order->laboratory_uuid,
                        'patient_id' => $order->patient_id,
                        'facility_id' => $order->facility_id,
                        'facility_name' => $order->facility ? $order->facility->name : null,
                        'ordered_by' => $order->ordered_by,
                        'ordered_by_name' => $order->user ? $order->user->name : null,
                        'results' => $order->results,
                        'status' => $order->status,
                        'sample_status' => $order->sample_status ?? null,
                        'processed_by' => $order->processed_by,
                        'processed_by_name' => $order->resultEntry ? $order->resultEntry->name : null,
                        'comment' => $order->comment,
                        'priority' => $order->priority ?? 'routine',
                        'test_ids' => $order->test_ids ?? [],
                        'test_names' => $order->test_names ?? null,
                        'test_count' => $order->test_count ?? 0,
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'patient' => [
                        'id' => $patient->id,
                        'patient_uuid' => $patient->patient_uuid,
                        'full_name' => $patient->full_name,
                    ],
                    'orders' => $orders
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching patient orders:', [
                'patient_uuid' => $patientUuid,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch patient orders',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save sample quality assessment
     */
    public function sampleAssessment(Request $request, $id)
    {
        try {
            $request->validate([
                'laboratory_order_id' => 'required|exists:laboratory_orders,id',
                'patient_id' => 'required|exists:patients,id',
                'assessed_by' => 'required|exists:users,id',
                'sample_quality' => 'required|in:adequate,inadequate,unsatisfactory',
                'quality_notes' => 'nullable|string',
                'assessment_status' => 'required|in:assessed,pending,rejected',
                'tissue_adequacy' => 'nullable|in:adequate,inadequate,marginal',
                'representative_sampling' => 'nullable|in:yes,no,uncertain',
                'fixation_quality' => 'nullable|in:good,fair,poor',
                'fixation_medium' => 'nullable|string',
                'fixative_ratio' => 'nullable|string',
                'specimen_integrity' => 'nullable|in:intact,compromised,damaged',
                'identification_verified' => 'nullable|boolean',
                'container_leak_proof' => 'nullable|boolean',
                'crushing_artifacts' => 'nullable|boolean',
                'needs_special_handling' => 'nullable|boolean',
                'special_handling_details' => 'nullable|string',
                'rejection_reason' => 'nullable|string|required_if:sample_quality,unsatisfactory'
            ]);

            // Find the order
            $order = LaboratoryOrder::findOrFail($id);

            // Create or update the assessment
            $assessment = SampleQualityAssessment::updateOrCreate(
                ['laboratory_order_id' => $id],
                [
                    'patient_id' => $request->patient_id,
                    'assessed_by' => $request->assessed_by,
                    'sample_quality' => $request->sample_quality,
                    'quality_notes' => $request->quality_notes,
                    'assessment_status' => $request->assessment_status,
                    'tissue_adequacy' => $request->tissue_adequacy,
                    'representative_sampling' => $request->representative_sampling,
                    'fixation_quality' => $request->fixation_quality,
                    'fixation_medium' => $request->fixation_medium,
                    'fixative_ratio' => $request->fixative_ratio,
                    'specimen_integrity' => $request->specimen_integrity,
                    'identification_verified' => $request->identification_verified ?? false,
                    'container_leak_proof' => $request->container_leak_proof ?? false,
                    'crushing_artifacts' => $request->crushing_artifacts ?? false,
                    'needs_special_handling' => $request->needs_special_handling ?? false,
                    'special_handling_details' => $request->special_handling_details,
                    'rejection_reason' => $request->rejection_reason,
                ]
            );

            // Update the order status based on sample quality
            if ($request->sample_quality === 'adequate') {
                $order->sample_status = 'accepted';
            } elseif ($request->sample_quality === 'unsatisfactory') {
                $order->sample_status = 'rejected';
            } else {
                $order->sample_status = 'pending_review';
            }
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Sample quality assessment saved successfully',
                'data' => $assessment
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save assessment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save results entry
     */
    public function enterResults(Request $request, $id)
    {
        try {
            $request->validate([
                'order_id' => 'required|exists:laboratory_orders,id',
                'patient_id' => 'required|exists:patients,id',
                'entered_by' => 'required|exists:users,id',
                'results' => 'required|string',
                'result_category' => 'required|string',
                'diagnosis' => 'nullable|string',
                'notes' => 'nullable|string',
                'status' => 'required|in:pending,completed,rejected'
            ]);

            // Find the order
            $order = LaboratoryOrder::findOrFail($id);

            // Update the order with results
            $order->results = $request->results;
            $order->result_category = $request->result_category;
            $order->diagnosis = $request->diagnosis;
            $order->result_notes = $request->notes;
            $order->status = $request->status;
            $order->processed_by = $request->entered_by;
            $order->processed_at = now();
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Results saved successfully',
                'data' => $order
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save results: ' . $e->getMessage()
            ], 500);
        }
    }
}

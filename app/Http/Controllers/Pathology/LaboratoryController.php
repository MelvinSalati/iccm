<?php

namespace App\Http\Controllers\Pathology;

use App\Http\Controllers\Controller;
use App\Models\LaboratoryOrder;
use App\Models\Patients\Patient;
use App\Models\SampleQualityAssessment;
use App\Models\EnrolledFacility;
use App\Jobs\ProcessEventData;
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
            $orders = LaboratoryOrder::join('patients', 'laboratory_orders.patient_id', '=', 'patients.id')
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

            Log::info('Laboratory orders fetched', ['count' => $orders->count()]);

            return Inertia::render('Pathology/lab-orders', [
                'orders' => $orders,
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching laboratory orders', [
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

    /**
     * Create a new laboratory order
     */
    public function createOrder(Request $request)
    {
        try {
            Log::info('Creating laboratory order', [
                'facility_id' => $request->facility_id,
                'patient_id' => $request->patient_id,
                'test_count' => $request->test_count ?? 0
            ]);

            $data = array_merge($request->all(), [
                'laboratory_uuid' => (string) Str::uuid(),
                'order_number' => rand(111111, 999999)
            ]);

            $order = LaboratoryOrder::create($data);

            // Dispatch event to ProcessEventData
            $this->dispatchLabOrderEvent($order, $request);

            return response()->json([
                'message' => 'Laboratory order created successfully!',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating laboratory order', [
                'error' => $e->getMessage(),
                'data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Failed to create laboratory order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dispatch lab order event to ProcessEventData
     */
    protected function dispatchLabOrderEvent($order, $request): void
    {
        try {
            $facilityId = $order->facility_id ?? $request->facility_id ?? null;
            $district = null;
            $province = null;

            if ($facilityId) {
                $facility = EnrolledFacility::find($facilityId);
                if ($facility) {
                    $district = $facility->district ?? null;
                    $province = $facility->province ?? null;
                }
            }

            $patient = Patient::find($order->patient_id);
            $patientName = $patient ? $patient->full_name : null;

            $eventData = [
                'source_type' => 'laboratory',
                'event_type' => 'lab_order_created',
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $order->patient_id,
                'entity_type' => 'patient',
                'entity_name' => $patientName,
                'age' => $patient ? $patient->age : null,
                'gender' => $patient ? $patient->gender : null,
                'phone' => $patient ? $patient->phone_number : null,
                'event_date' => now()->toDateString(),
                'test_type' => 'laboratory_order',
                'test_result' => 'pending',
                'status' => 'pending',
                'provider_name' => null,
                'performed_by' => (string) $order->ordered_by,
                'notes' => $order->comment ?? null,
                'payload' => [
                    'order_id' => $order->id,
                    'order_uuid' => $order->laboratory_uuid,
                    'order_number' => $order->order_number ?? null,
                    'visit_id' => $request->visit_id ?? null,
                    'test_ids' => $order->test_ids ?? [],
                    'test_names' => $order->test_names ?? null,
                    'test_count' => $order->test_count ?? 0,
                    'priority' => $order->priority ?? 'routine',
                    'tests' => $order->tests ?? [],
                ],
                'metadata' => [
                    'source' => 'laboratory_order_modal',
                    'order_type' => 'laboratory',
                    'priority' => $order->priority ?? 'routine',
                    'submitted_at' => now()->toISOString(),
                ],
            ];

            ProcessEventData::dispatch($eventData, 'laboratory');

            Log::info('Lab order event dispatched', [
                'order_id' => $order->id,
                'order_uuid' => $order->laboratory_uuid,
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch lab order event', [
                'order_id' => $order->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
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
            Log::error('Error fetching order', [
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
            Log::error('Error fetching patient orders', [
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
            $validated = $request->validate([
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

            $order = LaboratoryOrder::findOrFail($id);

            $assessment = SampleQualityAssessment::updateOrCreate(
                ['laboratory_order_id' => $id],
                [
                    'patient_id' => $validated['patient_id'],
                    'assessed_by' => $validated['assessed_by'],
                    'sample_quality' => $validated['sample_quality'],
                    'quality_notes' => $validated['quality_notes'] ?? null,
                    'assessment_status' => $validated['assessment_status'],
                    'tissue_adequacy' => $validated['tissue_adequacy'] ?? null,
                    'representative_sampling' => $validated['representative_sampling'] ?? null,
                    'fixation_quality' => $validated['fixation_quality'] ?? null,
                    'fixation_medium' => $validated['fixation_medium'] ?? null,
                    'fixative_ratio' => $validated['fixative_ratio'] ?? null,
                    'specimen_integrity' => $validated['specimen_integrity'] ?? null,
                    'identification_verified' => $validated['identification_verified'] ?? false,
                    'container_leak_proof' => $validated['container_leak_proof'] ?? false,
                    'crushing_artifacts' => $validated['crushing_artifacts'] ?? false,
                    'needs_special_handling' => $validated['needs_special_handling'] ?? false,
                    'special_handling_details' => $validated['special_handling_details'] ?? null,
                    'rejection_reason' => $validated['rejection_reason'] ?? null,
                ]
            );

            // Update order status based on sample quality
            $order->sample_status = match ($validated['sample_quality']) {
                'adequate' => 'accepted',
                'unsatisfactory' => 'rejected',
                default => 'pending_review',
            };
            $order->save();

            // Dispatch sample assessment event
            $this->dispatchSampleAssessmentEvent($order, $assessment, $validated);

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
            Log::error('Failed to save sample assessment', [
                'error' => $e->getMessage(),
                'order_id' => $id
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save assessment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dispatch sample assessment event
     */
    protected function dispatchSampleAssessmentEvent($order, $assessment, $data): void
    {
        try {
            $facilityId = $order->facility_id ?? null;
            $district = null;
            $province = null;

            if ($facilityId) {
                $facility = EnrolledFacility::find($facilityId);
                if ($facility) {
                    $district = $facility->district ?? null;
                    $province = $facility->province ?? null;
                }
            }

            $patient = Patient::find($order->patient_id);

            $eventData = [
                'source_type' => 'laboratory',
                'event_type' => 'sample_quality_assessed',
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $order->patient_id,
                'entity_type' => 'patient',
                'entity_name' => $patient ? $patient->full_name : null,
                'event_date' => now()->toDateString(),
                'test_type' => 'sample_quality_assessment',
                'test_result' => $data['sample_quality'],
                'status' => $data['assessment_status'],
                'notes' => $data['quality_notes'] ?? null,
                'payload' => [
                    'order_id' => $order->id,
                    'order_uuid' => $order->laboratory_uuid,
                    'assessment_id' => $assessment->id,
                    'sample_quality' => $data['sample_quality'],
                    'tissue_adequacy' => $data['tissue_adequacy'] ?? null,
                    'representative_sampling' => $data['representative_sampling'] ?? null,
                    'fixation_quality' => $data['fixation_quality'] ?? null,
                    'specimen_integrity' => $data['specimen_integrity'] ?? null,
                    'rejection_reason' => $data['rejection_reason'] ?? null,
                ],
                'metadata' => [
                    'event_sub_type' => 'sample_quality_assessment',
                    'assessed_by' => $data['assessed_by'],
                ],
            ];

            ProcessEventData::dispatch($eventData, 'laboratory');

            Log::info('Sample assessment event dispatched', [
                'order_id' => $order->id,
                'assessment_id' => $assessment->id,
                'facility_id' => $facilityId,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch sample assessment event', [
                'order_id' => $order->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Save results entry
     */
    public function enterResults(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'order_id' => 'required|exists:laboratory_orders,id',
                'patient_id' => 'required|exists:patients,id',
                'entered_by' => 'required|exists:users,id',
                'results' => 'required|string',
                'result_category' => 'required|string',
                'diagnosis' => 'nullable|string',
                'notes' => 'nullable|string',
                'status' => 'required|in:pending,completed,rejected'
            ]);

            $order = LaboratoryOrder::findOrFail($id);

            $order->update([
                'results' => $validated['results'],
                'result_category' => $validated['result_category'],
                'diagnosis' => $validated['diagnosis'] ?? null,
                'result_notes' => $validated['notes'] ?? null,
                'status' => $validated['status'],
                'processed_by' => $validated['entered_by'],
                'processed_at' => now(),
            ]);

            // Dispatch results entry event
            $this->dispatchResultsEvent($order, $validated);

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
            Log::error('Failed to save results', [
                'error' => $e->getMessage(),
                'order_id' => $id
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save results: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dispatch results entry event
     */
    protected function dispatchResultsEvent($order, $data): void
    {
        try {
            $facilityId = $order->facility_id ?? null;
            $district = null;
            $province = null;

            if ($facilityId) {
                $facility = EnrolledFacility::find($facilityId);
                if ($facility) {
                    $district = $facility->district ?? null;
                    $province = $facility->province ?? null;
                }
            }

            $patient = Patient::find($order->patient_id);

            $eventData = [
                'source_type' => 'laboratory',
                'event_type' => 'lab_results_entered',
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $order->patient_id,
                'entity_type' => 'patient',
                'entity_name' => $patient ? $patient->full_name : null,
                'event_date' => now()->toDateString(),
                'test_type' => 'laboratory_results',
                'test_result' => $data['status'] === 'completed' ? 'completed' : 'pending',
                'status' => $data['status'],
                'notes' => $data['notes'] ?? null,
                'payload' => [
                    'order_id' => $order->id,
                    'order_uuid' => $order->laboratory_uuid,
                    'results' => $data['results'],
                    'result_category' => $data['result_category'],
                    'diagnosis' => $data['diagnosis'] ?? null,
                    'entered_by' => $data['entered_by'],
                ],
                'metadata' => [
                    'event_sub_type' => 'results_entry',
                    'entered_by' => $data['entered_by'],
                    'result_status' => $data['status'],
                ],
            ];

            ProcessEventData::dispatch($eventData, 'laboratory');

            Log::info('Results entry event dispatched', [
                'order_id' => $order->id,
                'status' => $data['status'],
                'facility_id' => $facilityId,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch results entry event', [
                'order_id' => $order->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }
}

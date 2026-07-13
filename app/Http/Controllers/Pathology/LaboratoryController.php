<?php

namespace App\Http\Controllers\Pathology;

use App\Http\Controllers\Controller;
use App\Models\LaboratoryOrder;
use App\Models\Patients\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
}

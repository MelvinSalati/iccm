<?php

namespace App\Http\Controllers\Pathology;

use App\Http\Controllers\Controller;
use App\Models\LaboratoryOrder;
use App\Models\SampleDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class laboratoryController extends Controller
{
    public function createOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|integer|exists:users,id',
            'test_id' => 'required|integer',
            'facility_id' => 'required|integer|exists:facilities,id',
            'ordered_by' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $create = LaboratoryOrder::create($request->all());
            return response()->json([
                'message' => 'Laboratory order created',
                'data' => $create
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function sampleAssessment(Request $request, $orderId)
    {
        $validator = Validator::make($request->all(), [
            'laboratory_order_id' => 'required|integer|exists:laboratory_orders,id',
            'patient_id' => 'required|integer|exists:users,id',
            'assessed_by' => 'required|integer|exists:users,id',
            'sample_quality' => 'required|in:adequate,inadequate,unsatisfactory',
            'quality_notes' => 'nullable|string|max:500',
            'assessment_status' => 'required|in:pending,assessed,rejected',
            'is_hemolyzed' => 'boolean',
            'is_icteric' => 'boolean',
            'is_lipemic' => 'boolean',
            'rejection_reason' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $assessment = SampleDetail::create($request->all());
            // Update the laboratory order status if needed
            LaboratoryOrder::where('id', $orderId)->update(['status' => 'processing']);

            return response()->json([
                'message' => 'Sample quality assessment completed!',
                'data' => $assessment
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function viewLaboratoryOrders(Request $request)
    {
        try {
            $viewLaboratoryOrders = LaboratoryOrder::with(['user', 'facility', 'resultEntry'])
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render(
                'Pathology/lab-orders',
                [
                    'orders' => $viewLaboratoryOrders,
                    'auth' => [
                        'user' => auth()->user()
                    ]
                ]
            );
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function enterResults(Request $request, $orderId)
    {
        $validator = Validator::make($request->all(), [
            'processed_by' => 'required|integer|exists:users,id',
            'results' => 'required|string',
            'comment' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $order = LaboratoryOrder::findOrFail($orderId);
            $order->update([
                'results' => $request->results,
                'processed_by' => $request->processed_by,
                'status' => 'completed',
                'comment' => $request->comment
            ]);

            return response()->json([
                'message' => 'Results entered successfully!',
                'data' => $order
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

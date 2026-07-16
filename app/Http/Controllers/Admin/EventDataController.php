<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventData;
use App\Models\Indicator;
use App\Models\IndicatorPerformance;
use App\Services\EventDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventDataController extends Controller
{
    protected $eventService;

    public function __construct(EventDataService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Display a listing of events
     */
    public function index(Request $request)
    {
        $query = EventData::with('facility');

        // Filters
        if ($request->facility_id) {
            $query->where('facility_id', $request->facility_id);
        }

        if ($request->source_type) {
            $query->where('source_type', $request->source_type);
        }

        if ($request->event_type) {
            $query->where('event_type', $request->event_type);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->result) {
            $query->where('result', $request->result);
        }

        if ($request->entity_id) {
            $query->where('entity_id', $request->entity_id);
        }

        if ($request->start_date && $request->end_date) {
            $query->whereBetween('event_date', [$request->start_date, $request->end_date]);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('entity_name', 'like', "%{$request->search}%")
                    ->orWhere('entity_id', 'like', "%{$request->search}%")
                    ->orWhere('patient_phone', 'like', "%{$request->search}%");
            });
        }

        $perPage = $request->per_page ?? 20;
        $events = $query->orderBy('event_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($events);
    }

    /**
     * Store a newly created event
     */
    public function store(Request $request)
    {
        $validated = $this->validateEvent($request);

        try {
            DB::beginTransaction();

            $event = $this->eventService->recordEvent($validated);

            // Recalculate indicators
            $this->eventService->calculateIndicators($event->facility_id);

            DB::commit();

            return response()->json([
                'message' => 'Event recorded successfully',
                'data' => $event->load('facility')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to record event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified event
     */
    public function show($id)
    {
        $event = EventData::with('facility')->findOrFail($id);
        return response()->json($event);
    }

    /**
     * Update the specified event
     */
    public function update(Request $request, $id)
    {
        $event = EventData::findOrFail($id);

        $validated = $this->validateEvent($request, true);

        try {
            DB::beginTransaction();

            $event->update($validated);

            // Recalculate indicators
            $this->eventService->calculateIndicators($event->facility_id);

            DB::commit();

            return response()->json([
                'message' => 'Event updated successfully',
                'data' => $event->fresh('facility')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to update event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified event
     */
    public function destroy($id)
    {
        try {
            $event = EventData::findOrFail($id);
            $facilityId = $event->facility_id;

            $event->delete();

            // Recalculate indicators
            $this->eventService->calculateIndicators($facilityId);

            return response()->json([
                'message' => 'Event deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get patient history
     */
    public function patientHistory($patientId)
    {
        $history = EventData::where('entity_id', $patientId)
            ->where('entity_type', 'patient')
            ->orderBy('event_date', 'desc')
            ->with('facility')
            ->get();

        return response()->json($history);
    }

    /**
     * Get daily schedule
     */
    public function dailySchedule(Request $request)
    {
        $request->validate([
            'facility_id' => 'required|exists:enrolled_facilities,id',
            'date' => 'required|date',
        ]);

        $events = EventData::forFacility($request->facility_id)
            ->whereDate('event_date', $request->date)
            ->orderBy('event_time')
            ->get();

        return response()->json($events);
    }

    /**
     * Update event result
     */
    public function updateResult(Request $request, $id)
    {
        $validated = $request->validate([
            'result' => 'required|in:positive,negative,abnormal,normal,pending',
            'result_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $event = EventData::findOrFail($id);
        $event->update([
            'result' => $validated['result'],
            'result_date' => $validated['result_date'] ?? now(),
            'notes' => $validated['notes'] ?? $event->notes,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Recalculate indicators
        $this->eventService->calculateIndicators($event->facility_id);

        return response()->json([
            'message' => 'Result updated successfully',
            'data' => $event
        ]);
    }

    /**
     * Validate event data
     */
    protected function validateEvent(Request $request, $isUpdate = false)
    {
        $rules = [
            'source_type' => 'required|in:consultation,screening,laboratory,appointment,referral,treatment,follow_up,counseling,pharmacy,admission,discharge,registration,hiv_risk_assessment',
            'event_type' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_time' => 'nullable|date_format:H:i',
            'facility_id' => 'required|exists:enrolled_facilities,id',
            'district' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'entity_id' => 'required|string|max:255',
            'entity_name' => 'nullable|string|max:255',
            'age' => 'nullable|integer|min:0|max:150',
            'gender' => 'nullable|in:male,female,other',
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|in:pending,in_progress,completed,cancelled,no_show,pending_results,referred,treated,scheduled,confirmed',
            'result' => 'nullable|in:positive,negative,abnormal,normal,pending',
            'result_date' => 'nullable|date',
            'screening_type' => 'nullable|string|max:255',
            'test_type' => 'nullable|string|max:255',
            'test_result' => 'nullable|string|max:255',
            'test_value' => 'nullable|numeric',
            'test_units' => 'nullable|string|max:50',
            'hiv_positive' => 'nullable|boolean',
            'risk_factors' => 'nullable|array',
            'risk_level' => 'nullable|in:high,moderate,low',
            'referred_to' => 'nullable|string|max:255',
            'referral_reason' => 'nullable|string|max:500',
            'referral_date' => 'nullable|date',
            'follow_up_date' => 'nullable|date|after_or_equal:today',
            'follow_up_reason' => 'nullable|string|max:500',
            'treatment_given' => 'nullable|string|max:500',
            'treatment_notes' => 'nullable|string',
            'provider_name' => 'nullable|string|max:255',
            'performed_by' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'clinical_notes' => 'nullable|string',
            'patient_notes' => 'nullable|string',
            'numeric_value' => 'nullable|numeric',
            'monetary_value' => 'nullable|numeric',
            'payload' => 'nullable|array',
            'metadata' => 'nullable|array',
        ];

        if (!$isUpdate) {
            $rules['source_type'] = 'required|in:' . implode(',', [
                    'consultation', 'screening', 'laboratory', 'appointment',
                    'referral', 'treatment', 'follow_up', 'counseling',
                    'pharmacy', 'admission', 'discharge', 'registration',
                    'hiv_risk_assessment'
                ]);
        }

        return $request->validate($rules);
    }
}

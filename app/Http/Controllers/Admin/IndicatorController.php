<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Indicator;
use App\Models\IndicatorPerformance;
use App\Services\EventDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class IndicatorController extends Controller
{
    protected $eventService;

    public function __construct(EventDataService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Display a listing of indicators
     */
    public function index(Request $request)
    {
        $query = Indicator::query();

        if ($request->category) {
            $query->where('category', $request->category);
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

        if ($request->is_kpi !== null) {
            $query->where('is_kpi', $request->is_kpi);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('code', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        $perPage = $request->per_page ?? 20;
        $indicators = $query->orderBy('category')
            ->orderBy('name')
            ->paginate($perPage);

        return response()->json($indicators);
    }

    /**
     * Store a newly created indicator
     */
    public function store(Request $request)
    {
        $validated = $this->validateIndicator($request);

        try {
            $indicator = Indicator::create(array_merge(
                $validated,
                ['uuid' => (string) Str::uuid()]
            ));

            return response()->json([
                'message' => 'Indicator created successfully',
                'data' => $indicator
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create indicator: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified indicator
     */
    public function show($id)
    {
        $indicator = Indicator::findOrFail($id);
        return response()->json($indicator);
    }

    /**
     * Update the specified indicator
     */
    public function update(Request $request, $id)
    {
        $indicator = Indicator::findOrFail($id);
        $validated = $this->validateIndicator($request, true);

        try {
            $indicator->update($validated);

            return response()->json([
                'message' => 'Indicator updated successfully',
                'data' => $indicator
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update indicator: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified indicator
     */
    public function destroy($id)
    {
        try {
            $indicator = Indicator::findOrFail($id);

            // Delete related performances first
            IndicatorPerformance::where('indicator_id', $id)->delete();

            $indicator->delete();

            return response()->json([
                'message' => 'Indicator deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete indicator: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Calculate indicator performance
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'facility_id' => 'required|exists:enrolled_facilities,id',
            'period' => 'nullable|in:daily,weekly,monthly,quarterly,annual',
            'indicator_id' => 'nullable|exists:indicators,id',
        ]);

        $facilityId = $request->facility_id;
        $period = $request->period ?? 'monthly';

        if ($request->indicator_id) {
            // Calculate single indicator
            $indicator = Indicator::findOrFail($request->indicator_id);
            $value = $this->eventService->calculateIndicator($indicator, $facilityId, $period);

            $performance = $this->savePerformance($indicator, $facilityId, $period, $value);

            return response()->json([
                'message' => 'Indicator calculated successfully',
                'data' => [
                    'indicator' => $indicator,
                    'performance' => $performance
                ]
            ]);

        } else {
            // Calculate all indicators
            $results = $this->eventService->calculateIndicators($facilityId, $period);

            return response()->json([
                'message' => 'All indicators calculated successfully',
                'data' => $results
            ]);
        }
    }

    /**
     * Get indicator performance history
     */
    public function performanceHistory($indicatorId)
    {
        $indicator = Indicator::findOrFail($indicatorId);

        $performances = IndicatorPerformance::where('indicator_id', $indicatorId)
            ->orderBy('period_date', 'desc')
            ->limit(12)
            ->get();

        return response()->json([
            'indicator' => $indicator,
            'performances' => $performances
        ]);
    }

    /**
     * Get indicators dashboard
     */
    public function dashboard(Request $request)
    {
        $request->validate([
            'facility_id' => 'required|exists:enrolled_facilities,id',
            'period' => 'nullable|in:daily,weekly,monthly,quarterly,annual',
        ]);

        $facilityId = $request->facility_id;
        $period = $request->period ?? 'monthly';

        // Get all active indicators with their performance
        $indicators = Indicator::where('status', 'active')
            ->orderBy('is_kpi', 'desc')
            ->get();

        $results = [];
        foreach ($indicators as $indicator) {
            $performance = IndicatorPerformance::where('indicator_id', $indicator->id)
                ->where('facility_id', $facilityId)
                ->where('period', $period)
                ->orderBy('period_date', 'desc')
                ->first();

            $results[] = [
                'indicator' => $indicator,
                'performance' => $performance,
                'status' => $performance ? $performance->status : 'not_calculated',
            ];
        }

        return response()->json($results);
    }

    /**
     * Validate indicator data
     */
    protected function validateIndicator(Request $request, $isUpdate = false)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:indicators,code',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'source_type' => 'nullable|string|max:255',
            'event_type' => 'nullable|string|max:255',
            'result_filter' => 'nullable|string|max:255',
            'calculation_type' => 'required|in:count,percentage,rate,ratio,sum,average,numerator_denominator',
            'numerator_definition' => 'nullable|array',
            'denominator_definition' => 'nullable|array',
            'target_value' => 'nullable|numeric',
            'target_min' => 'nullable|numeric',
            'target_max' => 'nullable|numeric',
            'threshold_green' => 'nullable|numeric',
            'threshold_yellow' => 'nullable|numeric',
            'threshold_red' => 'nullable|numeric',
            'time_period' => 'nullable|in:daily,weekly,monthly,quarterly,annual',
            'is_kpi' => 'nullable|boolean',
            'is_public' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive,draft',
        ];

        // For updates, ignore unique code check for current record
        if ($isUpdate) {
            $rules['code'] = 'required|string|max:50|unique:indicators,code,' . $request->id;
        }

        return $request->validate($rules);
    }

    /**
     * Save indicator performance
     */
    protected function savePerformance($indicator, $facilityId, $period, $value)
    {
        $periodDate = now()->startOfMonth();

        $status = $this->determineStatus($value, $indicator);

        return IndicatorPerformance::updateOrCreate(
            [
                'indicator_id' => $indicator->id,
                'facility_id' => $facilityId,
                'period' => $period,
                'period_date' => $periodDate,
            ],
            [
                'actual_value' => $value,
                'target_value' => $indicator->target_value,
                'percentage_achieved' => $indicator->target_value > 0
                    ? ($value / $indicator->target_value) * 100
                    : null,
                'status' => $status,
                'calculated_at' => now(),
            ]
        );
    }

    /**
     * Determine performance status
     */
    protected function determineStatus($value, $indicator)
    {
        if (!$indicator->target_value) {
            return 'on_track';
        }

        $percentage = ($value / $indicator->target_value) * 100;

        if ($percentage >= $indicator->threshold_green) {
            return 'on_track';
        } elseif ($percentage >= $indicator->threshold_yellow) {
            return 'at_risk';
        } elseif ($percentage >= $indicator->threshold_red) {
            return 'behind';
        } else {
            return 'critical';
        }
    }
}

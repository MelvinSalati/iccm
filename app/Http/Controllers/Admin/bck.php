<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventData;
use App\Models\Facility;
use App\Models\Indicator;
use App\Models\IndicatorPerformance;
use App\Models\EnrolledFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index(){

        $appointments  =  EventData::where('source_type','appointment');
        $scheduledAppointments = $appointments->where('status','pending')->count();
        $completeAppointments = $appointments->where('status','completed')->count();
        $missedAppointments = $scheduledAppointments-$completeAppointments;

    }
    /**
     * Get main dashboard data and render admin dashboard
     */
//    public function index(Request $request)
//    {
//        $request->validate([
//            'period' => 'nullable|in:today,week,month,quarter,year',
//        ]);
//
//        $period = $request->period ?? 'week'; // Default to week
//        $dates = $this->getDateRange($period);
//
//        // Get dashboard data
//        $dashboardData = [
//            'summary' => $this->getSummary($dates),
//            'screenings' => $this->getScreeningStats($dates),
//            'laboratory' => $this->getLabStats($dates),
//            'referrals' => $this->getReferralStats($dates),
//            'indicators' => $this->getIndicatorPerformance(),
//            'recent_events' => $this->getRecentEvents(),
//            'trends' => $this->getTrends($dates),
//        ];
//
//        // For Inertia rendering - send data as props
//        return Inertia::render('admin/admin-dashboard', [
//            'dashboard' => $dashboardData,
//            'period' => $period,
//            'auth' => [
//                'user' => auth()->user(),
//            ],
//        ]);
//    }

    /**
     * API endpoint for fetching dashboard data
     */
    public function getDashboardData(Request $request)
    {
        $request->validate([
            'period' => 'nullable|in:today,week,month,quarter,year',
        ]);

        $period = $request->period ?? 'week';
        $dates = $this->getDateRange($period);

        return response()->json([
            'summary' => $this->getSummary($dates),
            'screenings' => $this->getScreeningStats($dates),
            'laboratory' => $this->getLabStats($dates),
            'referrals' => $this->getReferralStats($dates),
            'indicators' => $this->getIndicatorPerformance(),
            'recent_events' => $this->getRecentEvents(),
            'trends' => $this->getTrends($dates),
        ]);
    }

    public function viewFacilities(Request $request){
        return Inertia::render('admin/manage-facility', [
            'facility' => EnrolledFacility::all(),
        ]);
    }

    /**
     * Get facility summary
     */
    protected function getSummary($dates)
    {
        $query = EventData::whereBetween('event_date', [$dates['start'], $dates['end']]);

        $total = $query->count();
        $completed = (clone $query)->where('status', 'completed')->count();
        $pending = (clone $query)->whereIn('status', ['pending', 'scheduled', 'in_progress'])->count();
        $cancelled = (clone $query)->where('status', 'cancelled')->count();

        // Previous period comparison
        $previousDates = $this->getPreviousDateRange($dates);
        $previousTotal = EventData::whereBetween('event_date', [$previousDates['start'], $previousDates['end']])
            ->count();

        $growth = $previousTotal > 0 ? (($total - $previousTotal) / $previousTotal) * 100 : 0;

        return [
            'total_events' => $total,
            'completed' => $completed,
            'pending' => $pending,
            'cancelled' => $cancelled,
            'growth_percentage' => round($growth, 2),
            'by_source' => (clone $query)->select('source_type', DB::raw('COUNT(*) as count'))
                ->groupBy('source_type')
                ->get()
                ->pluck('count', 'source_type')
                ->toArray(),
            'by_status' => [
                'completed' => $completed,
                'pending' => $pending,
                'cancelled' => $cancelled,
            ]
        ];
    }

    /**
     * Get screening statistics
     */
    protected function getScreeningStats($dates)
    {
        $query = EventData::where('source_type', 'screening')
            ->whereBetween('event_date', [$dates['start'], $dates['end']]);

        return [
            'total' => $query->count(),
            'by_type' => [
                'hpv' => [
                    'total' => (clone $query)->where('event_type', 'hpv_screening')->count(),
                    'positive' => (clone $query)->where('event_type', 'hpv_screening')
                        ->where('result', 'positive')->count(),
                ],
                'via' => [
                    'total' => (clone $query)->where('event_type', 'via_screening')->count(),
                    'positive' => (clone $query)->where('event_type', 'via_screening')
                        ->where('result', 'positive')->count(),
                ],
                'hiv' => [
                    'total' => (clone $query)->where('event_type', 'hiv_screening')->count(),
                    'positive' => (clone $query)->where('event_type', 'hiv_screening')
                        ->where('result', 'positive')->count(),
                ],
                'breast_cancer' => [
                    'total' => (clone $query)->where('event_type', 'breast_cancer_screening')->count(),
                    'positive' => (clone $query)->where('event_type', 'breast_cancer_screening')
                        ->where('result', 'positive')->count(),
                ],
            ],
            'positivity_rates' => $this->calculatePositivityRates($dates),
        ];
    }

    /**
     * Get laboratory statistics
     */
    protected function getLabStats($dates)
    {
        $query = EventData::where('source_type', 'laboratory')
            ->whereBetween('event_date', [$dates['start'], $dates['end']]);

        return [
            'total_tests' => $query->count(),
            'pending_results' => (clone $query)->where('status', 'pending_results')->count(),
            'completed' => (clone $query)->where('status', 'completed')->count(),
            'by_test_type' => (clone $query)->select('test_type', DB::raw('COUNT(*) as count'))
                ->groupBy('test_type')
                ->get()
                ->pluck('count', 'test_type')
                ->toArray(),
            'abnormal_results' => (clone $query)->where('test_result', 'abnormal')->count(),
        ];
    }

    /**
     * Get referral statistics
     */
    protected function getReferralStats($dates)
    {
        $query = EventData::where('source_type', 'referral')
            ->whereBetween('event_date', [$dates['start'], $dates['end']]);

        return [
            'total' => $query->count(),
            'internal' => (clone $query)->where('event_type', 'internal_referral')->count(),
            'external' => (clone $query)->where('event_type', 'external_referral')->count(),
            'by_reason' => (clone $query)->select('referral_reason', DB::raw('COUNT(*) as count'))
                ->groupBy('referral_reason')
                ->get()
                ->pluck('count', 'referral_reason')
                ->toArray(),
            'completed' => (clone $query)->where('status', 'completed')->count(),
        ];
    }

    /**
     * Get indicator performance
     */
    protected function getIndicatorPerformance()
    {
        $indicators = Indicator::where('status', 'active')
            ->where('is_kpi', true)
            ->get();

        $performance = [];

        foreach ($indicators as $indicator) {
            $latest = IndicatorPerformance::where('indicator_id', $indicator->id)
                ->orderBy('period_date', 'desc')
                ->first();

            $performance[] = [
                'code' => $indicator->code,
                'name' => $indicator->name,
                'category' => $indicator->category,
                'target' => $indicator->target_value,
                'actual' => $latest ? $latest->actual_value : null,
                'status' => $latest ? $latest->status : 'not_calculated',
                'percentage_achieved' => $latest ? $latest->percentage_achieved : null,
            ];
        }

        return $performance;
    }

    /**
     * Get recent events
     */
    protected function getRecentEvents()
    {
        return EventData::orderBy('event_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->with('facility')
            ->get();
    }

    /**
     * Get trends
     */
    protected function getTrends($dates)
    {
        $months = 12;
        $trends = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $start = $date->copy()->startOfMonth();
            $end = $date->copy()->endOfMonth();

            $query = EventData::whereBetween('event_date', [$start, $end]);

            $trends[$date->format('Y-m')] = [
                'total' => $query->count(),
                'screenings' => (clone $query)->where('source_type', 'screening')->count(),
                'laboratory' => (clone $query)->where('source_type', 'laboratory')->count(),
                'consultations' => (clone $query)->where('source_type', 'consultation')->count(),
                'referrals' => (clone $query)->where('source_type', 'referral')->count(),
            ];
        }

        return $trends;
    }

    /**
     * Calculate positivity rates
     */
    protected function calculatePositivityRates($dates)
    {
        $rates = [];
        $types = ['hpv_screening', 'via_screening', 'hiv_screening', 'breast_cancer_screening'];

        foreach ($types as $type) {
            $total = EventData::where('event_type', $type)
                ->whereBetween('event_date', [$dates['start'], $dates['end']])
                ->count();

            $positive = EventData::where('event_type', $type)
                ->where('result', 'positive')
                ->whereBetween('event_date', [$dates['start'], $dates['end']])
                ->count();

            $rates[$type] = $total > 0 ? round(($positive / $total) * 100, 2) : 0;
        }

        return $rates;
    }

    /**
     * Get date range
     */
    protected function getDateRange($period)
    {
        switch ($period) {
            case 'today':
                return ['start' => now()->startOfDay(), 'end' => now()];
            case 'week':
                return ['start' => now()->startOfWeek(), 'end' => now()];
            case 'quarter':
                return ['start' => now()->startOfQuarter(), 'end' => now()];
            case 'year':
                return ['start' => now()->startOfYear(), 'end' => now()];
            case 'month':
                return ['start' => now()->startOfMonth(), 'end' => now()];
            default:
                return ['start' => now()->startOfWeek(), 'end' => now()];
        }
    }

    /**
     * Get previous date range
     */
    protected function getPreviousDateRange($dates)
    {
        $diff = $dates['start']->diffInDays($dates['end']);
        return [
            'start' => $dates['start']->copy()->subDays($diff + 1),
            'end' => $dates['start']->copy()->subDay(),
        ];
    }
}
<?php

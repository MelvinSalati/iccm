<?php

namespace App\Http\Controllers\CommunityEngagement;

use App\Http\Controllers\Controller;
use App\Models\CommunityAggregate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AggregateController extends Controller
{

    public function dashboard()
    {
        Log::info('🚀 Dashboard method called');

        // Get all aggregates with relationships
        $aggregates = CommunityAggregate::with(['facility', 'assessedBy'])
            ->orderBy('assessment_date', 'desc')
            ->get();

        Log::info('📊 Aggregates fetched:', ['count' => $aggregates->count()]);

        // Calculate KPIs from aggregate data - handle null values
        $totalParticipants = $aggregates->sum('total_participants') ?? 0;
        $totalCervicalEducation = $aggregates->sum('cervical_education') ?? 0;
        $totalBreastEducation = $aggregates->sum('breast_education') ?? 0;
        $totalFamilyPlanning = $aggregates->sum('family_planning_education') ?? 0;
        $totalNutrition = $aggregates->sum('nutrition_education') ?? 0;
        $totalCervicalScreening = $aggregates->sum('cervical_screening') ?? 0;
        $totalBreastScreening = $aggregates->sum('breast_screening') ?? 0;
        $totalHIVScreening = $aggregates->sum('hiv_screening') ?? 0;
        $totalHypertensionScreening = $aggregates->sum('hypertension_screening') ?? 0;
        $totalDiabetesScreening = $aggregates->sum('diabetes_screening') ?? 0;
        $totalReferralsMade = $aggregates->sum('referrals_made') ?? 0;
        $totalReferralsCompleted = $aggregates->sum('referrals_completed') ?? 0;
        $totalFollowUpsCompleted = $aggregates->sum('follow_ups_completed') ?? 0;
        $totalFollowUpsPending = $aggregates->sum('follow_ups_pending') ?? 0;
        $totalHealthWorkers = $aggregates->sum('community_health_workers') ?? 0;
        $totalMeetings = $aggregates->sum('community_meetings_held') ?? 0;
        $totalHouseholdVisits = $aggregates->sum('household_visits') ?? 0;

        Log::info('📈 KPI totals:', [
            'totalParticipants' => $totalParticipants,
            'totalCervicalScreening' => $totalCervicalScreening,
            'totalHIVScreening' => $totalHIVScreening,
            'totalReferralsMade' => $totalReferralsMade,
            'totalFollowUpsCompleted' => $totalFollowUpsCompleted,
            'totalHealthWorkers' => $totalHealthWorkers,
        ]);

        // Calculate age group totals
        $age15_24 = $aggregates->sum('age_15_24') ?? 0;
        $age25_34 = $aggregates->sum('age_25_34') ?? 0;
        $age35_44 = $aggregates->sum('age_35_44') ?? 0;
        $age45_54 = $aggregates->sum('age_45_54') ?? 0;
        $age55Plus = $aggregates->sum('age_55_plus') ?? 0;

        Log::info('👥 Age groups:', [
            'age15_24' => $age15_24,
            'age25_34' => $age25_34,
            'age35_44' => $age35_44,
            'age45_54' => $age45_54,
            'age55Plus' => $age55Plus,
        ]);

        // Calculate totals
        $totalFemales = $aggregates->sum('total_females') ?? 0;
        $totalMales = $aggregates->sum('total_males') ?? 0;

        // Get weekly trends (last 7 days)
        $startDate = now()->subDays(6)->toDateString();
        $endDate = now()->toDateString();

        Log::info('📅 Date range:', ['start' => $startDate, 'end' => $endDate]);

        $weeklyTrendsRaw = CommunityAggregate::whereBetween('assessment_date', [$startDate, $endDate])
            ->selectRaw('DATE(assessment_date) as date,
             SUM(COALESCE(total_participants, 0)) as screened,
             SUM(COALESCE(cervical_screening, 0)) as via_positive,
             SUM(COALESCE(total_females, 0)) as hpv_positive,
             SUM(COALESCE(referrals_completed, 0)) as treated,
             SUM(COALESCE(follow_ups_completed, 0)) as follow_up_completed')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->keyBy('date');

        Log::info('📊 Weekly trends raw:', ['count' => $weeklyTrendsRaw->count()]);

        // Create complete 7-day dataset with zeros for missing dates
        $weeklyTrends = collect(range(6, 0))->map(function ($daysAgo) use ($weeklyTrendsRaw) {
            $date = now()->subDays($daysAgo);
            $dateString = $date->toDateString();
            $data = $weeklyTrendsRaw->get($dateString);

            return [
                'date' => $dateString,
                'day' => $date->format('D'),
                'screened' => (int) ($data->screened ?? 0),
                'viaPositive' => (int) ($data->via_positive ?? 0),
                'hpvPositive' => (int) ($data->hpv_positive ?? 0),
                'treated' => (int) ($data->treated ?? 0),
                'followUpCompleted' => (int) ($data->follow_up_completed ?? 0),
            ];
        });

        Log::info('📊 Weekly trends final:', ['count' => $weeklyTrends->count()]);

        // Prepare KPI data
        $kpis = [
            [
                'id' => '1',
                'title' => 'Total Participants',
                'value' => $totalParticipants,
                'icon' => 'users',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#2563EB',
                'sparklineData' => $weeklyTrends->pluck('screened')->toArray(),
                'comparison' => '0 vs last week'
            ],
            [
                'id' => '2',
                'title' => 'Cervical Screening',
                'value' => $totalCervicalScreening,
                'icon' => 'microscope',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#7C3AED',
                'sparklineData' => $weeklyTrends->pluck('viaPositive')->toArray(),
                'comparison' => '0 vs last week'
            ],
            [
                'id' => '3',
                'title' => 'HIV Screening',
                'value' => $totalHIVScreening,
                'icon' => 'eye',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#F59E0B',
                'sparklineData' => $weeklyTrends->pluck('hpvPositive')->toArray(),
                'comparison' => '0 vs last week'
            ],
            [
                'id' => '4',
                'title' => 'Referrals Made',
                'value' => $totalReferralsMade,
                'icon' => 'arrow-right-left',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#10B981',
                'sparklineData' => $weeklyTrends->pluck('treated')->toArray(),
                'comparison' => '0 vs last week'
            ],
            [
                'id' => '5',
                'title' => 'Follow-ups Done',
                'value' => $totalFollowUpsCompleted,
                'icon' => 'check-circle',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#2563EB',
                'sparklineData' => $weeklyTrends->pluck('followUpCompleted')->toArray(),
                'comparison' => '0 vs last week'
            ],
            [
                'id' => '6',
                'title' => 'Health Workers',
                'value' => $totalHealthWorkers,
                'icon' => 'users',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#EF4444',
                'sparklineData' => $weeklyTrends->pluck('screened')->map(function() { return 0; })->toArray(),
                'comparison' => '0 vs last week'
            ],
        ];

        Log::info('📈 KPIs prepared:', ['count' => count($kpis)]);

        // Prepare HIV data
        $hivPositive = $aggregates->where('hiv_screening', '>', 0)->count();
        $hivNegative = max(0, $totalParticipants - $hivPositive);
        $hivUnknown = max(0, $totalParticipants - ($hivPositive + $hivNegative));

        $hivDisaggregation = [
            ['name' => 'HIV Positive', 'value' => $hivPositive, 'color' => '#7C3AED'],
            ['name' => 'HIV Negative', 'value' => $hivNegative, 'color' => '#10B981'],
            ['name' => 'Unknown', 'value' => $hivUnknown, 'color' => '#94A3B8'],
        ];

        Log::info('🔄 HIV data:', $hivDisaggregation);

        // Prepare disability data
        $disabilityDisaggregation = [
            ['name' => 'With Disability', 'value' => 0, 'color' => '#2563EB'],
            ['name' => 'Without Disability', 'value' => $totalParticipants, 'color' => '#F59E0B'],
            ['name' => 'Not Recorded', 'value' => 0, 'color' => '#94A3B8'],
        ];

        Log::info('♿ Disability data:', $disabilityDisaggregation);

        // Prepare age groups
        $ageGroups = [
            ['name' => '15-24', 'value' => $age15_24, 'color' => '#2563EB'],
            ['name' => '25-34', 'value' => $age25_34, 'color' => '#3B82F6'],
            ['name' => '35-44', 'value' => $age35_44, 'color' => '#7C3AED'],
            ['name' => '45-54', 'value' => $age45_54, 'color' => '#F59E0B'],
            ['name' => '55-64', 'value' => 0, 'color' => '#10B981'],
            ['name' => '65+', 'value' => $age55Plus, 'color' => '#EF4444'],
        ];

        // Filter out age groups with zero values
        $ageGroups = array_filter($ageGroups, function($group) {
            return $group['value'] > 0;
        });

        // If all age groups are zero, add a placeholder
        if (empty($ageGroups)) {
            $ageGroups = [
                ['name' => 'No Data', 'value' => 1, 'color' => '#94A3B8'],
            ];
        }

        Log::info('👥 Age groups final:', ['count' => count($ageGroups)]);

        // Prepare final data
        $finalData = [
            'aggregates' => $aggregates,
            'kpis' => $kpis,
            'weeklyTrends' => $weeklyTrends,
            'hivDisaggregation' => $hivDisaggregation,
            'disabilityDisaggregation' => $disabilityDisaggregation,
            'ageGroups' => $ageGroups,
            'metadata' => [
                'lastSync' => now()->toISOString(),
                'dataSource' => 'Community Aggregate Data',
                'reportingPeriod' => 'Last 7 Days',
                'activeFacilities' => $aggregates->unique('facility_id')->count(),
                'activeDistricts' => 0,
                'totalRecords' => $aggregates->count(),
            ]
        ];

        Log::info('✅ Final data being sent to dashboard:', [
            'kpis_count' => count($finalData['kpis']),
            'weeklyTrends_count' => count($finalData['weeklyTrends']),
            'hivDisaggregation_count' => count($finalData['hivDisaggregation']),
            'ageGroups_count' => count($finalData['ageGroups']),
            'totalRecords' => $finalData['metadata']['totalRecords'],
        ]);

        // Log the actual data (be careful with large datasets)
        Log::info('📦 Full data payload:', $finalData);

        return Inertia::render('dashboard', $finalData);
    }
    /**
     * Display a listing of community aggregates.
     */
    public function index(Request $request)
    {
        try {
            $query = CommunityAggregate::with(['facility', 'assessedBy']);

            // Filter by facility
            if ($request->has('facility_id')) {
                $query->where('facility_id', $request->facility_id);
            }

            // Filter by status
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filter by date range
            if ($request->has('from_date') && $request->has('to_date')) {
                $query->whereBetween('assessment_date', [$request->from_date, $request->to_date]);
            }


            $aggregates = $query->orderBy('created_at', 'desc')->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $aggregates,
                'message' => 'Community aggregates retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve community aggregates',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created community aggregate.
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        try {
            // Prepare data with defaults
            $data = [
                'facility_id' => 1,
                'cervical_education' => $request->cervical_education ?? 0,
                'breast_education' => $request->breast_education ?? 0,
                'family_planning_education' => $request->family_planning_education ?? 0,
                'nutrition_education' => $request->nutrition_education ?? 0,
                'cervical_screening' => $request->cervical_screening ?? 0,
                'breast_screening' => $request->breast_screening ?? 0,
                'hiv_screening' => $request->hiv_screening ?? 0,
                'hypertension_screening' => $request->hypertension_screening ?? 0,
                'diabetes_screening' => $request->diabetes_screening ?? 0,
                'referrals_made' => $request->referrals_made ?? 0,
                'referrals_completed' => $request->referrals_completed ?? 0,
                'follow_ups_completed' => $request->follow_ups_completed ?? 0,
                'follow_ups_pending' => $request->follow_ups_pending ?? 0,
                'community_health_workers' => $request->community_health_workers ?? 0,
                'community_meetings_held' => $request->community_meetings_held ?? 0,
                'household_visits' => $request->household_visits ?? 0,
                'total_participants' => $request->total_participants ?? 0,
                'total_females' => $request->total_females ?? 0,
                'total_males' => $request->total_males ?? 0,
                'age_15_24' => $request->age_15_24 ?? 0,
                'age_25_34' => $request->age_25_34 ?? 0,
                'age_35_44' => $request->age_35_44 ?? 0,
                'age_45_54' => $request->age_45_54 ?? 0,
                'age_55_plus' => $request->age_55_plus ?? 0,
                'notes' => $request->notes,
                'assessment_date' => $request->assessment_date ?? now()->toDateString(),
                'assessed_by' => 1,
                'status' => $request->status ?? 'draft',
            ];

            Log::info($data);

            $aggregate = CommunityAggregate::create($data);

            return response()->json([
                'success' => true,
                'data' => $aggregate->load(['facility', 'assessedBy']),
                'message' => 'Community aggregate created successfully'
            ], 201);

        } catch (\Exception $e) {
            Log::info([$e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to create community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified community aggregate.
     */
    public function show($id)
    {
        try {
            $aggregate = CommunityAggregate::with(['facility', 'assessedBy'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $aggregate,
                'message' => 'Community aggregate retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Community aggregate not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified community aggregate.
     */
    public function update(Request $request, $id)
    {
        try {
            $aggregate = CommunityAggregate::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'cervical_education' => 'nullable|integer|min:0',
                'breast_education' => 'nullable|integer|min:0',
                'family_planning_education' => 'nullable|integer|min:0',
                'nutrition_education' => 'nullable|integer|min:0',
                'cervical_screening' => 'nullable|integer|min:0',
                'breast_screening' => 'nullable|integer|min:0',
                'hiv_screening' => 'nullable|integer|min:0',
                'hypertension_screening' => 'nullable|integer|min:0',
                'diabetes_screening' => 'nullable|integer|min:0',
                'referrals_made' => 'nullable|integer|min:0',
                'referrals_completed' => 'nullable|integer|min:0',
                'follow_ups_completed' => 'nullable|integer|min:0',
                'follow_ups_pending' => 'nullable|integer|min:0',
                'community_health_workers' => 'nullable|integer|min:0',
                'community_meetings_held' => 'nullable|integer|min:0',
                'household_visits' => 'nullable|integer|min:0',
                'total_participants' => 'nullable|integer|min:0',
                'total_females' => 'nullable|integer|min:0',
                'total_males' => 'nullable|integer|min:0',
                'age_15_24' => 'nullable|integer|min:0',
                'age_25_34' => 'nullable|integer|min:0',
                'age_35_44' => 'nullable|integer|min:0',
                'age_45_54' => 'nullable|integer|min:0',
                'age_55_plus' => 'nullable|integer|min:0',
                'notes' => 'nullable|string|max:1000',
                'assessment_date' => 'nullable|date',
                'status' => 'nullable|in:draft,submitted,approved,rejected',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update only provided fields
            $aggregate->update($request->only([
                'facility_id',
                'cervical_education',
                'breast_education',
                'family_planning_education',
                'nutrition_education',
                'cervical_screening',
                'breast_screening',
                'hiv_screening',
                'hypertension_screening',
                'diabetes_screening',
                'referrals_made',
                'referrals_completed',
                'follow_ups_completed',
                'follow_ups_pending',
                'community_health_workers',
                'community_meetings_held',
                'household_visits',
                'total_participants',
                'total_females',
                'total_males',
                'age_15_24',
                'age_25_34',
                'age_35_44',
                'age_45_54',
                'age_55_plus',
                'notes',
                'assessment_date',
                'status',
            ]));

            return response()->json([
                'success' => true,
                'data' => $aggregate->load(['facility', 'assessedBy']),
                'message' => 'Community aggregate updated successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified community aggregate.
     */
    public function destroy($id)
    {
        try {
            $aggregate = CommunityAggregate::findOrFail($id);
            $aggregate->delete();

            return response()->json([
                'success' => true,
                'message' => 'Community aggregate deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get aggregate statistics for a facility.
     */
    public function stats(Request $request)
    {
        try {
            $facilityId = $request->facility_id;
            $year = $request->year ?? date('Y');

            $stats = CommunityAggregate::where('facility_id', $facilityId)
                ->whereYear('assessment_date', $year)
                ->select(
                    \DB::raw('SUM(cervical_education) as total_cervical_education'),
                    \DB::raw('SUM(breast_education) as total_breast_education'),
                    \DB::raw('SUM(cervical_screening) as total_cervical_screening'),
                    \DB::raw('SUM(breast_screening) as total_breast_screening'),
                    \DB::raw('SUM(hiv_screening) as total_hiv_screening'),
                    \DB::raw('SUM(referrals_made) as total_referrals_made'),
                    \DB::raw('SUM(referrals_completed) as total_referrals_completed'),
                    \DB::raw('SUM(total_participants) as total_participants'),
                    \DB::raw('COUNT(*) as total_entries')
                )
                ->first();

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistics retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit aggregate for approval.
     */
    public function submit($id)
    {
        try {
            $aggregate = CommunityAggregate::findOrFail($id);

            // Only draft can be submitted
            if ($aggregate->status !== 'draft') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only draft records can be submitted'
                ], 422);
            }

            $aggregate->update(['status' => 'submitted']);

            return response()->json([
                'success' => true,
                'data' => $aggregate,
                'message' => 'Community aggregate submitted for approval'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve a submitted aggregate.
     */
    public function approve($id)
    {
        try {
            $aggregate = CommunityAggregate::findOrFail($id);

            // Only submitted can be approved
            if ($aggregate->status !== 'submitted') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only submitted records can be approved'
                ], 422);
            }

            $aggregate->update([
                'status' => 'approved'
            ]);

            return response()->json([
                'success' => true,
                'data' => $aggregate,
                'message' => 'Community aggregate approved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to approve community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reject a submitted aggregate.
     */
    public function reject($id)
    {
        try {
            $aggregate = CommunityAggregate::findOrFail($id);

            // Only submitted can be rejected
            if ($aggregate->status !== 'submitted') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only submitted records can be rejected'
                ], 422);
            }

            $aggregate->update([
                'status' => 'rejected'
            ]);

            return response()->json([
                'success' => true,
                'data' => $aggregate,
                'message' => 'Community aggregate rejected'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject community aggregate',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

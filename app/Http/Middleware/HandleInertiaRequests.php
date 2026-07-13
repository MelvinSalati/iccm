<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\IntegratedScreening;
use App\Models\Patients\PatientRiskFactor;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sharedData' => [
                'users' => User::where('role_id', 3)->get(),
                'dashboard' => $this->getDashboardData(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Get dashboard data for sharing across all pages
     */
    private function getDashboardData(): array
    {
        try {
            // Date range - last 7 days by default
            $startDate = Carbon::now()->subDays(7);
            $endDate = Carbon::now();

            // Query screenings
            $screenings = IntegratedScreening::whereBetween('created_at', [$startDate, $endDate]);
            $patientRisks = PatientRiskFactor::whereBetween('created_at', [$startDate, $endDate]);

            // Calculate KPIs
            $screenedWomen = $screenings->count();
            $hpvPositive = $screenings->where('screening_method', 'hpv_test')->where('screening_results', 'positive')->count();
            $viaPositive = $screenings->where('screening_method', 'via')->where('screening_results', 'positive')->count();
            $viaNegative = $screenings->where('screening_method', 'via')->where('screening_results', 'negative')->count();
            $hpvNegative = $screenings->where('screening_method', 'hpv_test')->where('screening_results', 'negative')->count();

            // Treatment and referral counts
            $treatment = $screenings->whereIn('treatment_decision', ['thermal_ablation', 'cryotherapy'])->count();
            $referral = $screenings->where('treatment_decision', 'referral')->count();

            // HIV status from risk factors
            $hivPositive = $patientRisks->where('hiv_status', 'positive')->count();
            $hivNegative = $patientRisks->where('hiv_status', 'negative')->count();

            // Disability count
            $disability = $patientRisks->where('has_disability', true)->count();

            // Mortality count
            $mortality = 0; // Adjust based on your schema

            // Get weekly trends
            $weeklyTrends = $this->getWeeklyTrends();

            // Get KPI data with icons as strings
            $kpis = $this->getKPIData([
                'screenedWomen' => $screenedWomen,
                'hpvPositive' => $hpvPositive,
                'viaPositive' => $viaPositive,
                'treatment' => $treatment,
                'referral' => $referral,
                'hivPositive' => $hivPositive,
                'mortality' => $mortality,
            ]);

            // Get HIV disaggregation
            $hivDisaggregation = [
                [
                    'name' => 'HIV Positive',
                    'value' => $hivPositive,
                    'color' => '#EF4444'
                ],
                [
                    'name' => 'HIV Negative',
                    'value' => $hivNegative,
                    'color' => '#22C55E'
                ],
            ];

            // Get disability disaggregation
            $disabilityDisaggregation = [
                [
                    'name' => 'No Disability',
                    'value' => $patientRisks->where('has_disability', false)->count(),
                    'color' => '#22C55E'
                ],
                [
                    'name' => 'With Disability',
                    'value' => $disability,
                    'color' => '#F59E0B'
                ],
            ];

            // Get age groups
            $ageGroups = $this->getAgeGroups($screenings);

            // Get facility stats
            $facilityStats = $this->getFacilityStats($startDate, $endDate);

            return [
                'kpis' => $kpis,
                'weeklyTrends' => $weeklyTrends,
                'hivDisaggregation' => $hivDisaggregation,
                'disabilityDisaggregation' => $disabilityDisaggregation,
                'ageGroups' => $ageGroups,
                'metadata' => [
                    'lastSync' => Carbon::now()->toISOString(),
                    'dataSource' => 'System Database',
                    'reportingPeriod' => 'Last 7 Days',
                    'activeFacilities' => $facilityStats['total_facilities'] ?? 0,
                    'activeDistricts' => $facilityStats['total_districts'] ?? 0,
                    'totalRecords' => $screenedWomen,
                ],
                'aggregates' => [
                    'total_screened' => $screenedWomen,
                    'hpv_positive' => $hpvPositive,
                    'via_positive' => $viaPositive,
                    'via_negative' => $viaNegative,
                    'hpv_negative' => $hpvNegative,
                    'treatment' => $treatment,
                    'referral' => $referral,
                    'hiv_positive' => $hivPositive,
                    'hiv_negative' => $hivNegative,
                    'disability' => $disability,
                    'mortality' => $mortality,
                ],
            ];

        } catch (\Exception $e) {
            // Return empty data on error
            return [
                'kpis' => [],
                'weeklyTrends' => [],
                'hivDisaggregation' => [],
                'disabilityDisaggregation' => [],
                'ageGroups' => [],
                'metadata' => [
                    'lastSync' => Carbon::now()->toISOString(),
                    'dataSource' => 'System',
                    'reportingPeriod' => 'Last 7 Days',
                    'activeFacilities' => 0,
                    'activeDistricts' => 0,
                    'totalRecords' => 0,
                ],
                'aggregates' => [
                    'total_screened' => 0,
                    'hpv_positive' => 0,
                    'via_positive' => 0,
                    'via_negative' => 0,
                    'hpv_negative' => 0,
                    'treatment' => 0,
                    'referral' => 0,
                    'hiv_positive' => 0,
                    'hiv_negative' => 0,
                    'disability' => 0,
                    'mortality' => 0,
                ],
            ];
        }
    }

    /**
     * Get weekly trends data
     */
    private function getWeeklyTrends(): array
    {
        $trends = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayStart = $date->copy()->startOfDay();
            $dayEnd = $date->copy()->endOfDay();

            $dayScreenings = IntegratedScreening::whereBetween('created_at', [$dayStart, $dayEnd]);

            $trends[] = [
                'date' => $date->format('Y-m-d'),
                'day' => $date->format('D'),
                'screened' => $dayScreenings->count(),
                'viaPositive' => $dayScreenings->where('screening_method', 'via')
                    ->where('screening_results', 'positive')
                    ->count(),
                'hpvPositive' => $dayScreenings->where('screening_method', 'hpv')
                    ->where('screening_results', 'positive')
                    ->count(),
                'treated' => $dayScreenings->whereIn('treatment_decision', ['thermal_ablation', 'cryotherapy'])->count(),
                'followUpCompleted' => $dayScreenings->where('follow_up_completed', true)->count(),
            ];
        }

        return $trends;
    }

    /**
     * Get age group distribution
     */
    private function getAgeGroups($screenings): array
    {
        $ageGroups = [
            ['name' => '15-24', 'value' => 0, 'color' => '#3B82F6'],
            ['name' => '25-34', 'value' => 0, 'color' => '#8B5CF6'],
            ['name' => '35-44', 'value' => 0, 'color' => '#EC4899'],
            ['name' => '45-54', 'value' => 0, 'color' => '#F59E0B'],
            ['name' => '55+', 'value' => 0, 'color' => '#EF4444'],
        ];

        // Assuming you have patient relationship with date_of_birth
        foreach ($screenings->get() as $screening) {
            if ($screening->patient && $screening->patient->date_of_birth) {
                $age = Carbon::parse($screening->patient->date_of_birth)->age;

                if ($age >= 15 && $age <= 24) {
                    $ageGroups[0]['value']++;
                } elseif ($age >= 25 && $age <= 34) {
                    $ageGroups[1]['value']++;
                } elseif ($age >= 35 && $age <= 44) {
                    $ageGroups[2]['value']++;
                } elseif ($age >= 45 && $age <= 54) {
                    $ageGroups[3]['value']++;
                } elseif ($age >= 55) {
                    $ageGroups[4]['value']++;
                }
            }
        }

        return $ageGroups;
    }

    /**
     * Get facility statistics
     */
    private function getFacilityStats($startDate, $endDate): array
    {
        try {
            $stats = DB::table('integrated_screenings')
                ->join('facilities', 'integrated_screenings.facility_id', '=', 'facilities.id')
                ->join('districts', 'facilities.district_id', '=', 'districts.id')
                ->whereBetween('integrated_screenings.created_at', [$startDate, $endDate])
                ->select(
                    DB::raw('COUNT(DISTINCT integrated_screenings.facility_id) as total_facilities'),
                    DB::raw('COUNT(DISTINCT facilities.district_id) as total_districts')
                )
                ->first();

            return [
                'total_facilities' => $stats->total_facilities ?? 0,
                'total_districts' => $stats->total_districts ?? 0,
            ];
        } catch (\Exception $e) {
            return [
                'total_facilities' => 0,
                'total_districts' => 0,
            ];
        }
    }

    /**
     * Get KPI data
     */
    private function getKPIData($data): array
    {
        return [
            [
                'id' => '1',
                'title' => 'Women Screened',
                'value' => $data['screenedWomen'],
                'icon' => 'users',
                'trend' => 12.5,
                'trendDirection' => 'up',
                'color' => '#2563EB',
                'sparklineData' => $this->getSparklineData('screened'),
                'comparison' => $data['screenedWomen'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['screenedWomen']),
            ],
            [
                'id' => '2',
                'title' => 'HPV Positive',
                'value' => $data['hpvPositive'],
                'icon' => 'microscope',
                'trend' => 8.7,
                'trendDirection' => 'up',
                'color' => '#7C3AED',
                'sparklineData' => $this->getSparklineData('hpv_positive'),
                'comparison' => $data['hpvPositive'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['hpvPositive']),
            ],
            [
                'id' => '3',
                'title' => 'VIA Positive',
                'value' => $data['viaPositive'],
                'icon' => 'eye',
                'trend' => -3.2,
                'trendDirection' => 'down',
                'color' => '#F59E0B',
                'sparklineData' => $this->getSparklineData('via_positive'),
                'comparison' => $data['viaPositive'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['viaPositive']),
            ],
            [
                'id' => '4',
                'title' => 'Treatment Completion',
                'value' => $data['treatment'],
                'icon' => 'check-circle',
                'trend' => 15.3,
                'trendDirection' => 'up',
                'color' => '#10B981',
                'sparklineData' => $this->getSparklineData('treated'),
                'comparison' => $data['treatment'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['treatment']),
            ],
            [
                'id' => '5',
                'title' => 'Referral Completion',
                'value' => $data['referral'],
                'icon' => 'arrow-right-left',
                'trend' => 3.2,
                'trendDirection' => 'up',
                'color' => '#2563EB',
                'sparklineData' => $this->getSparklineData('referral'),
                'comparison' => $data['referral'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['referral']),
            ],
            [
                'id' => '6',
                'title' => 'Mortality Rate',
                'value' => $data['mortality'],
                'icon' => 'skull',
                'trend' => -6.7,
                'trendDirection' => 'down',
                'color' => '#EF4444',
                'sparklineData' => $this->getSparklineData('mortality'),
                'comparison' => $data['mortality'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => $data['mortality'] . '‰',
            ],
        ];
    }

    /**
     * Get sparkline data for KPI trends
     */
    private function getSparklineData($metric): array
    {
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayStart = $date->copy()->startOfDay();
            $dayEnd = $date->copy()->endOfDay();

            $query = IntegratedScreening::whereBetween('created_at', [$dayStart, $dayEnd]);

            switch ($metric) {
                case 'screened':
                    $value = $query->count();
                    break;
                case 'via_positive':
                    $value = $query->where('screening_method', 'via')
                        ->where('screening_results', 'positive')
                        ->count();
                    break;
                case 'hpv_positive':
                    $value = $query->where('screening_method', 'hpv')
                        ->where('screening_results', 'positive')
                        ->count();
                    break;
                case 'treated':
                    $value = $query->whereIn('treatment_decision', ['thermal_ablation', 'cryotherapy'])->count();
                    break;
                case 'referral':
                    $value = $query->where('treatment_decision', 'referral')->count();
                    break;
                case 'mortality':
                    $value = 0; // Adjust based on your mortality table
                    break;
                default:
                    $value = 0;
            }

            $data[] = $value;
        }

        return $data;
    }
}

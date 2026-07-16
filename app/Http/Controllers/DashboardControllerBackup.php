<?php

namespace App\Http\Controllers;

use App\Models\CommunityAggregate;
use App\Models\CommunityOutreach;
use App\Models\IntegratedScreening;
use App\Models\Patients\PatientRiskFactor;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardControllerBackup extends Controller
{
    public function index($period = 'week')
    {
        // Determine date range based on period
        $endDate = Carbon::now();
        $startDate = Carbon::now();

        switch ($period) {
            case 'today':
                $startDate = Carbon::now()->startOfDay();
                break;
            case 'week':
                $startDate = Carbon::now()->subDays(7);
                break;
            case 'month':
                $startDate = Carbon::now()->subDays(30);
                break;
            case 'quarter':
                $startDate = Carbon::now()->subDays(14);
                break;
            default:
                $startDate = Carbon::now()->subDays(7);
                break;
        }

        // Query screenings within date range
        $screenings = IntegratedScreening::whereBetween('created_at', [$startDate, $endDate]);
        $patientRisks = PatientRiskFactor::whereBetween('created_at', [$startDate, $endDate]);

        // Calculate KPIs
        $screenedWomen = $screenings->count();
        $hpvPositive = $screenings->where('screening_method', 'hpv')->where('screening_results', 'positive')->count();
        $viaPositive = $screenings->where('screening_method', 'via')->where('screening_results', 'positive')->count();
        $viaNegative = $screenings->where('screening_method', 'via')->where('screening_results', 'negative')->count();
        $hpvNegative = $screenings->where('screening_method', 'hpv')->where('screening_results', 'negative')->count();

        // Treatment and referral counts (adjust based on your schema)
        $treatment = $screenings->where('treatment_decision', 'thermal_ablation')
            ->orWhere('treatment_decision', 'cryotherapy')
            ->count();
        $referral = $screenings->where('treatment_decision', 'referral')->count();

        // HIV status from risk factors
        $hivPositive = $patientRisks->where('hiv_status', 'positive')->count();
        $hivNegative = $patientRisks->where('hiv_status', 'negative')->count();

        // Disability count (adjust based on your schema)
        $disability = $patientRisks->where('has_disability', true)->count();

        // Mortality count (adjust based on your schema)
        $mortality = 0; // You'll need to query from your mortality table

        // Weekly trends data
        $weeklyTrends = $this->getWeeklyTrends($startDate, $endDate);

        // HIV disaggregation
        $hivDisaggregation = [
            [
                'name' => 'Positive',
                'value' => $hivPositive,
                'color' => '#EF4444'
            ],
            [
                'name' => 'Negative',
                'value' => $hivNegative,
                'color' => '#22C55E'
            ],
        ];

        // Disability disaggregation
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

        // Age groups
        $ageGroups = $this->getAgeGroups($screenings);

        // Get facility and district stats
        $facilityStats = $this->getFacilityStats($startDate, $endDate);

        // Get KPI data
        $kpis = $this->getKPIData([
            'screenedWomen' => $screenedWomen,
            'hpvPositive' => $hpvPositive,
            'viaPositive' => $viaPositive,
            'treatment' => $treatment,
            'referral' => $referral,
            'hivPositive' => $hivPositive,
            'mortality' => $mortality,
        ]);

        return Inertia::render('dashboard', [
            'kpis' => $kpis,
            'weeklyTrends' => $weeklyTrends,
            'hivDisaggregation' => $hivDisaggregation,
            'disabilityDisaggregation' => $disabilityDisaggregation,
            'ageGroups' => $ageGroups,
            'metadata' => [
                'lastSync' => Carbon::now()->toISOString(),
                'dataSource' => 'System Database',
                'reportingPeriod' => $this->getPeriodLabel($period),
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
        ]);
    }

    /**
     * Get weekly trends data
     */
    private function getWeeklyTrends($startDate, $endDate): array
    {
        $trends = [];

        // Get last 7 days
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

        // Assuming you have age or date_of_birth in your screening data
        // Adjust based on your actual schema
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
    }

    /**
     * Get KPI data
     */
    private function getKPIData($data): array
    {
        return [
            [
                'id' => '1',
                'title' => 'Total Screened',
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
                'title' => 'VIA Positive',
                'value' => $data['viaPositive'],
                'icon' => 'microscope',
                'trend' => -3.2,
                'trendDirection' => 'down',
                'color' => '#F59E0B',
                'sparklineData' => $this->getSparklineData('via_positive'),
                'comparison' => $data['viaPositive'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['viaPositive']),
            ],
            [
                'id' => '3',
                'title' => 'HPV Positive',
                'value' => $data['hpvPositive'],
                'icon' => 'eye',
                'trend' => 8.7,
                'trendDirection' => 'up',
                'color' => '#8B5CF6',
                'sparklineData' => $this->getSparklineData('hpv_positive'),
                'comparison' => $data['hpvPositive'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['hpvPositive']),
            ],
            [
                'id' => '4',
                'title' => 'Treated',
                'value' => $data['treatment'],
                'icon' => 'check-circle',
                'trend' => 15.3,
                'trendDirection' => 'up',
                'color' => '#22C55E',
                'sparklineData' => $this->getSparklineData('treated'),
                'comparison' => $data['treatment'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['treatment']),
            ],
            [
                'id' => '5',
                'title' => 'HIV Positive',
                'value' => $data['hivPositive'],
                'icon' => 'activity',
                'trend' => -5.1,
                'trendDirection' => 'down',
                'color' => '#EC4899',
                'sparklineData' => $this->getSparklineData('hiv_positive'),
                'comparison' => $data['hivPositive'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['hivPositive']),
            ],
            [
                'id' => '6',
                'title' => 'Mortality',
                'value' => $data['mortality'],
                'icon' => 'skull',
                'trend' => 0,
                'trendDirection' => 'neutral',
                'color' => '#EF4444',
                'sparklineData' => $this->getSparklineData('mortality'),
                'comparison' => $data['mortality'] > 0 ? 'vs last period' : '0 vs last period',
                'formattedValue' => number_format($data['mortality']),
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
                case 'hiv_positive':
                    $value = PatientRiskFactor::whereBetween('created_at', [$dayStart, $dayEnd])
                        ->where('hiv_status', 'positive')
                        ->count();
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

    /**
     * Get period label
     */
    private function getPeriodLabel($period): string
    {
        $labels = [
            'today' => 'Today',
            'week' => 'Last 7 Days',
            'month' => 'Last 30 Days',
            'quarter' => 'Last 90 Days',
            'year' => 'Last 365 Days',
        ];

        return $labels[$period] ?? 'Last 7 Days';
    }
}

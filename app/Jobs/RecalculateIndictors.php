<?php

namespace App\Jobs;

use App\Models\EventData;
use App\Models\Indicator;
use App\Models\IndicatorPerformance;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RecalculateIndicators implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [60, 120, 300];

    protected int $facilityId;
    protected string $period;

    public function __construct(int $facilityId, string $period = 'monthly')
    {
        $this->facilityId = $facilityId;
        $this->period = $period;
    }

    public function handle(): void
    {
        try {
            $indicators = Indicator::where('status', 'active')->get();

            if ($indicators->isEmpty()) {
                Log::info('No active indicators found to recalculate', [
                    'facility_id' => $this->facilityId,
                ]);
                return;
            }

            $startDate = now()->startOfMonth();
            $endDate = now()->endOfMonth();

            foreach ($indicators as $indicator) {
                $this->calculateIndicator($indicator, $startDate, $endDate);
            }

            Log::info('Indicators recalculated successfully', [
                'facility_id' => $this->facilityId,
                'period' => $this->period,
                'indicators_count' => $indicators->count(),
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to recalculate indicators', [
                'facility_id' => $this->facilityId,
                'period' => $this->period,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    protected function calculateIndicator(Indicator $indicator, $startDate, $endDate): void
    {
        try {
            // Build base query
            $query = EventData::forFacility($this->facilityId)
                ->betweenDates($startDate, $endDate);

            // Apply source filter
            if ($indicator->source_type) {
                $query->fromSource($indicator->source_type);
            }

            // Apply event type filter
            if ($indicator->event_type) {
                $query->ofType($indicator->event_type);
            }

            // Apply result filter
            if ($indicator->result_filter) {
                $query->withResult($indicator->result_filter);
            }

            // Calculate value based on calculation type
            $value = $this->calculateValue($query, $indicator);

            // Calculate percentage achieved
            $percentage = $indicator->target_value && $indicator->target_value > 0
                ? ($value / $indicator->target_value) * 100
                : null;

            // Determine status
            $status = $this->determineStatus($percentage, $indicator);

            // Save or update performance
            IndicatorPerformance::updateOrCreate(
                [
                    'indicator_id' => $indicator->id,
                    'facility_id' => $this->facilityId,
                    'period' => $this->period,
                    'period_date' => $startDate,
                ],
                [
                    'actual_value' => $value,
                    'target_value' => $indicator->target_value,
                    'percentage_achieved' => $percentage,
                    'status' => $status,
                    'calculated_at' => now(),
                ]
            );

            Log::debug('Indicator calculated', [
                'indicator_id' => $indicator->id,
                'indicator_code' => $indicator->code,
                'value' => $value,
                'status' => $status,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to calculate indicator', [
                'indicator_id' => $indicator->id,
                'indicator_code' => $indicator->code,
                'error' => $e->getMessage(),
            ]);
            // Don't throw - continue with other indicators
        }
    }

    protected function calculateValue($query, Indicator $indicator)
    {
        switch ($indicator->calculation_type) {
            case 'count':
                return $query->count();

            case 'percentage':
                $numeratorQuery = clone $query;
                $denominatorQuery = clone $query;

                // Apply numerator definition
                if ($indicator->numerator_definition) {
                    if (isset($indicator->numerator_definition['result'])) {
                        $numeratorQuery->where('result', $indicator->numerator_definition['result']);
                    }
                    if (isset($indicator->numerator_definition['risk_level'])) {
                        $numeratorQuery->where('risk_level', $indicator->numerator_definition['risk_level']);
                    }
                    if (isset($indicator->numerator_definition['status'])) {
                        $numeratorQuery->where('status', $indicator->numerator_definition['status']);
                    }
                }

                $numerator = $numeratorQuery->count();
                $denominator = $denominatorQuery->count();

                return $denominator > 0 ? ($numerator / $denominator) * 100 : 0;

            case 'rate':
                $numeratorQuery = clone $query;
                $denominatorQuery = clone $query;

                if ($indicator->numerator_definition) {
                    if (isset($indicator->numerator_definition['result'])) {
                        $numeratorQuery->where('result', $indicator->numerator_definition['result']);
                    }
                }

                $numerator = $numeratorQuery->count();
                $denominator = $denominatorQuery->count();

                return $denominator > 0 ? ($numerator / $denominator) * 1000 : 0;

            case 'sum':
                return $query->sum('numeric_value');

            case 'average':
                return $query->avg('numeric_value');

            default:
                return $query->count();
        }
    }

    protected function determineStatus($percentage, Indicator $indicator): string
    {
        if ($percentage === null) {
            return 'not_started';
        }

        $green = $indicator->threshold_green ?? 80;
        $yellow = $indicator->threshold_yellow ?? 60;
        $red = $indicator->threshold_red ?? 40;

        if ($percentage >= $green) {
            return 'on_track';
        } elseif ($percentage >= $yellow) {
            return 'at_risk';
        } elseif ($percentage >= $red) {
            return 'behind';
        } else {
            return 'critical';
        }
    }
}

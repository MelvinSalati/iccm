<?php

namespace App\Models;

use App\Models\Patients\Patient;
use App\Models\Visit;
use App\Models\User;
use App\Models\EventData;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class IntegratedScreening extends Model
{
    use SoftDeletes;

    protected $table = 'v2_integrated_screenings';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'patient_uuid',
        'visit_uuid',
        'patient_id',
        'visit_id',
        'created_by',
        'screening_date',
        'screening_method',
        'screening_result',
        'treatment_decision',
        'is_positive',
        'is_mental_health_flagged',
        'follow_up_date',
        'status',
        'metrics',
        'full_data',
        'submitted_at',
    ];

    protected $casts = [
        'metrics' => 'array',
        'full_data' => 'array',
        'is_positive' => 'boolean',
        'is_mental_health_flagged' => 'boolean',
        'screening_date' => 'date',
        'follow_up_date' => 'date',
        'submitted_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });

        // After creating, dispatch events
        static::created(function ($model) {
            $model->dispatchEvents();
        });
    }

    // ============================================================
    // RELATIONSHIPS
    // ============================================================

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function visit()
    {
        return $this->belongsTo(Visit::class, 'visit_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    /**
     * Get the event data records associated with this screening
     */
    public function eventData()
    {
        return $this->morphMany(EventData::class, 'entity', 'entity_type', 'entity_id')
            ->where('entity_type', 'screening');
    }

    /**
     * Get the positive screening event
     */
    public function positiveEvent()
    {
        return $this->eventData()->where('event_type', 'positive_cervical_screening')->first();
    }

    /**
     * Get the mental health event
     */
    public function mentalHealthEvent()
    {
        return $this->eventData()->where('event_type', 'mental_health_screening')->first();
    }

    /**
     * Get the NCD event
     */
    public function ncdEvent()
    {
        return $this->eventData()->where('event_type', 'ncd_screening')->first();
    }

    // ============================================================
    // ACCESSORS
    // ============================================================

    public function getDistressThermometerAttribute()
    {
        return $this->metrics['distress_thermometer'] ?? null;
    }

    public function getAnxietyGad7ScoreAttribute()
    {
        return $this->metrics['anxiety_gad7_score'] ?? null;
    }

    public function getDepressionPhq9ScoreAttribute()
    {
        return $this->metrics['depression_phq9_score'] ?? null;
    }

    public function getCervicalImageUrlAttribute()
    {
        return $this->metrics['cervical_image_url'] ?? null;
    }

    public function getMentalHealthServicesAttribute()
    {
        return $this->metrics['mental_health_services'] ?? [];
    }

    public function getWeightKgAttribute()
    {
        return $this->metrics['weight_kg'] ?? null;
    }

    public function getHeightCmAttribute()
    {
        return $this->metrics['height_cm'] ?? null;
    }

    public function getBmiAttribute()
    {
        return $this->metrics['bmi'] ?? null;
    }

    public function getBmiCategoryAttribute()
    {
        return $this->metrics['bmi_category'] ?? null;
    }

    public function getSystolicBpAttribute()
    {
        return $this->metrics['systolic_bp'] ?? null;
    }

    public function getDiastolicBpAttribute()
    {
        return $this->metrics['diastolic_bp'] ?? null;
    }

    public function getBpCategoryAttribute()
    {
        return $this->metrics['bp_category'] ?? null;
    }

    public function getNcdRiskLevelAttribute()
    {
        return $this->metrics['ncd_risk_level'] ?? null;
    }

    public function getPhq9ScoreAttribute()
    {
        return $this->metrics['phq9_score'] ?? null;
    }

    public function getPhq9CategoryAttribute()
    {
        return $this->metrics['phq9_category'] ?? null;
    }

    public function getGad7ScoreAttribute()
    {
        return $this->metrics['gad7_score'] ?? null;
    }

    public function getGad7CategoryAttribute()
    {
        return $this->metrics['gad7_category'] ?? null;
    }

    public function getMentalHealthRiskLevelAttribute()
    {
        return $this->metrics['mental_health_risk_level'] ?? null;
    }

    public function getIsNcdRiskAttribute()
    {
        return $this->metrics['has_ncd_risk'] ?? false;
    }

    // ============================================================
    // SCOPES
    // ============================================================

    public function scopePositive($query)
    {
        return $query->where('is_positive', true);
    }

    public function scopeNegative($query)
    {
        return $query->where('is_positive', false)
            ->where('screening_result', 'negative');
    }

    public function scopeMentalHealthFlagged($query)
    {
        return $query->where('is_mental_health_flagged', true);
    }

    public function scopeNcdRisk($query)
    {
        return $query->whereJsonContains('metrics->has_ncd_risk', true);
    }

    public function scopeByPatient($query, $patientId)
    {
        return $query->where('patient_id', $patientId);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('screening_date', [$startDate, $endDate]);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByResult($query, $result)
    {
        return $query->where('screening_result', $result);
    }

    // ============================================================
    // HELPER METHODS
    // ============================================================

    /**
     * Check if screening is positive
     */
    public function isPositive(): bool
    {
        return $this->is_positive;
    }

    /**
     * Check if screening is negative
     */
    public function isNegative(): bool
    {
        return !$this->is_positive && $this->screening_result === 'negative';
    }

    /**
     * Check if mental health is flagged
     */
    public function isMentalHealthFlagged(): bool
    {
        return $this->is_mental_health_flagged;
    }

    /**
     * Check if NCD risk is present
     */
    public function hasNCDRisk(): bool
    {
        return $this->metrics['has_ncd_risk'] ?? false;
    }

    /**
     * Get the risk level for this screening
     */
    public function getRiskLevel(): string
    {
        if ($this->is_positive) {
            return 'high';
        }

        if ($this->is_mental_health_flagged) {
            return $this->mental_health_risk_level ?? 'moderate';
        }

        if ($this->hasNCDRisk()) {
            return $this->ncd_risk_level ?? 'moderate';
        }

        return 'low';
    }

    /**
     * Get the priority for this screening
     */
    public function getPriority(): string
    {
        $riskLevel = $this->getRiskLevel();

        if ($riskLevel === 'high') {
            return 'high';
        }

        if ($riskLevel === 'moderate') {
            return 'medium';
        }

        return 'low';
    }

    /**
     * Get all event data records for this screening
     */
    public function getEventData(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->eventData()->get();
    }

    /**
     * Get the event data grouped by type
     */
    public function getEventDataGrouped(): array
    {
        $events = $this->eventData()->get();

        return [
            'main_screening' => $events->where('event_type', 'integrated_screening')->first(),
            'positive_screening' => $events->where('event_type', 'positive_cervical_screening')->first(),
            'negative_screening' => $events->where('event_type', 'negative_cervical_screening')->first(),
            'mental_health' => $events->where('event_type', 'mental_health_screening')->first(),
            'ncd' => $events->where('event_type', 'ncd_screening')->first(),
        ];
    }

    // ============================================================
    // EVENT DISPATCHING
    // ============================================================

    /**
     * Dispatch all events for this screening
     */
    public function dispatchEvents(): void
    {
        // Get the controller to dispatch events
        // This will be called from the controller
        // The events are already dispatched in the controller
        // This method is kept for future use
    }

    /**
     * Check if all events have been dispatched
     */
    public function hasAllEventsDispatched(): bool
    {
        $eventTypes = ['integrated_screening'];

        if ($this->is_positive) {
            $eventTypes[] = 'positive_cervical_screening';
        } elseif ($this->isNegative()) {
            $eventTypes[] = 'negative_cervical_screening';
        }

        if ($this->is_mental_health_flagged) {
            $eventTypes[] = 'mental_health_screening';
        }

        if ($this->hasNCDRisk()) {
            $eventTypes[] = 'ncd_screening';
        }

        $existingEvents = $this->eventData()->pluck('event_type')->toArray();

        foreach ($eventTypes as $type) {
            if (!in_array($type, $existingEvents)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get missing events that haven't been dispatched yet
     */
    public function getMissingEvents(): array
    {
        $expectedEvents = ['integrated_screening'];

        if ($this->is_positive) {
            $expectedEvents[] = 'positive_cervical_screening';
        } elseif ($this->isNegative()) {
            $expectedEvents[] = 'negative_cervical_screening';
        }

        if ($this->is_mental_health_flagged) {
            $expectedEvents[] = 'mental_health_screening';
        }

        if ($this->hasNCDRisk()) {
            $expectedEvents[] = 'ncd_screening';
        }

        $existingEvents = $this->eventData()->pluck('event_type')->toArray();

        return array_diff($expectedEvents, $existingEvents);
    }

    // ============================================================
    // STATISTICS HELPERS
    // ============================================================

    /**
     * Get statistics for screenings
     */
    public static function getStatistics(array $filters = []): array
    {
        $query = self::query();

        if (isset($filters['facility_id'])) {
            $query->where('facility_id', $filters['facility_id']);
        }

        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('screening_date', [$filters['start_date'], $filters['end_date']]);
        }

        return [
            'total' => $query->count(),
            'positive' => (clone $query)->positive()->count(),
            'negative' => (clone $query)->negative()->count(),
            'mental_health_flagged' => (clone $query)->mentalHealthFlagged()->count(),
            'ncd_risk' => (clone $query)->ncdRisk()->count(),
            'by_result' => (clone $query)->select('screening_result', \DB::raw('COUNT(*) as count'))
                ->groupBy('screening_result')
                ->pluck('count', 'screening_result')
                ->toArray(),
            'by_method' => (clone $query)->select('screening_method', \DB::raw('COUNT(*) as count'))
                ->groupBy('screening_method')
                ->pluck('count', 'screening_method')
                ->toArray(),
        ];
    }
}

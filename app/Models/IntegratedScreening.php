<?php
// app/Models/IntegratedScreening.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IntegratedScreening extends Model
{
    use HasFactory;

    protected $table = 'integrated_screenings';

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'patient_uuid',
        'visit_uuid',
        'patient_id',
        'visit_id',
        'created_by',
        'form_id',
        'form_version',
        'screening_data',
        'metadata',
        'metrics',
        'full_data',
        'screening_date',
        'screening_method',
        'screening_result',
        'treatment_decision',
        'distress_score',
        'anxiety_score',
        'depression_score',
        'is_positive',
        'is_mental_health_flagged',
        'follow_up_date',

        'submitted_at',
        'triggers',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'screening_data' => 'array',
        'triggers' => 'array',
        'metrics' => 'array',      // ← ADD THIS
        'full_data' => 'array',
        'metadata' => 'array',
        'screening_date' => 'date',
        'follow_up_date' => 'date',
        'submitted_at' => 'datetime',
        'is_positive' => 'boolean',
        'is_mental_health_flagged' => 'boolean',
        'distress_score' => 'integer',
        'anxiety_score' => 'integer',
        'depression_score' => 'integer',
        'created_by',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [

        'is_positive' => false,
        'is_mental_health_flagged' => false,
    ];

    /**
     * Relationships
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_id', 'id');
    }

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class, 'visit_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    /**
     * Scope filters
     */
    public function scopePositive($query)
    {
        return $query->where('is_positive', true);
    }

    public function scopeMentalHealthFlagged($query)
    {
        return $query->where('is_mental_health_flagged', true);
    }

    public function scopeByDateRange($query, $from, $to)
    {
        if ($from) {
            $query->where('screening_date', '>=', $from);
        }
        if ($to) {
            $query->where('screening_date', '<=', $to);
        }
        return $query;
    }

    public function scopeByMethod($query, $method)
    {
        if ($method) {
            $query->where('screening_method', $method);
        }
        return $query;
    }

    public function scopeByResult($query, $result)
    {
        if ($result) {
            $query->where('screening_result', $result);
        }
        return $query;
    }

    /**
     * Accessors
     */
    public function getScreeningMethodLabelAttribute(): string
    {
        $labels = [
            'via' => 'VIA',
            'hpv_test' => 'HPV Test',
            'cytology' => 'Cytology',
        ];
        return $labels[$this->screening_method] ?? $this->screening_method ?? 'Unknown';
    }

    public function getScreeningResultLabelAttribute(): string
    {
        $labels = [
            'negative' => 'Negative',
            'via_positive' => 'VIA Positive',
            'hpv_positive' => 'HPV Positive',
            'suspicious_cancer' => 'Suspicious Cancer',
        ];
        return $labels[$this->screening_result] ?? $this->screening_result ?? 'Unknown';
    }

    public function getTreatmentDecisionLabelAttribute(): string
    {
        $labels = [
            'thermal_ablation' => 'Thermal Ablation',
            'leep' => 'LEEP',
            'referral' => 'Referral to Tertiary Hospital',
            'observation' => 'Observation',
        ];
        return $labels[$this->treatment_decision] ?? $this->treatment_decision ?? 'Unknown';
    }

    public function getDistressLevelAttribute(): string
    {
        $score = $this->distress_score ?? 0;
        if ($score >= 7) return 'Severe';
        if ($score >= 4) return 'Moderate';
        if ($score >= 1) return 'Mild';
        return 'None';
    }

    public function getAnxietyLevelAttribute(): string
    {
        $score = $this->anxiety_score ?? 0;
        if ($score >= 15) return 'Severe';
        if ($score >= 10) return 'Moderate';
        if ($score >= 5) return 'Mild';
        return 'Minimal';
    }

    public function getDepressionLevelAttribute(): string
    {
        $score = $this->depression_score ?? 0;
        if ($score >= 15) return 'Severe';
        if ($score >= 10) return 'Moderate';
        if ($score >= 5) return 'Mild';
        return 'Minimal';
    }

    public function getIsMentalHealthConcernAttribute(): bool
    {
        return ($this->distress_score ?? 0) >= 7 ||
            ($this->anxiety_score ?? 0) >= 10 ||
            ($this->depression_score ?? 0) >= 10;
    }

    /**
     * Get full screening data with labels
     */
    public function getFormattedDataAttribute(): array
    {
        return [
            'id' => $this->id,
            'patient_id' => $this->patient_id,
            'visit_id' => $this->visit_id,
            'screening_date' => $this->screening_date?->format('Y-m-d'),
            'screening_method' => $this->screening_method,
            'screening_method_label' => $this->screening_method_label,
            'screening_result' => $this->screening_result,
            'screening_result_label' => $this->screening_result_label,
            'treatment_decision' => $this->treatment_decision,
            'treatment_decision_label' => $this->treatment_decision_label,
            'distress_score' => $this->distress_score,
            'distress_level' => $this->distress_level,
            'anxiety_score' => $this->anxiety_score,
            'anxiety_level' => $this->anxiety_level,
            'depression_score' => $this->depression_score,
            'depression_level' => $this->depression_level,
            'is_positive' => $this->is_positive,
            'is_mental_health_flagged' => $this->is_mental_health_flagged,
            'is_mental_health_concern' => $this->is_mental_health_concern,
            'follow_up_date' => $this->follow_up_date?->format('Y-m-d'),

            'submitted_at' => $this->submitted_at?->format('Y-m-d H:i:s'),
            'metadata' => $this->metadata,
            'triggers' => $this->triggers,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get summary for dashboard
     */
    public function getSummaryAttribute(): array
    {
        return [
            'is_positive' => $this->is_positive,
            'is_mental_health_flagged' => $this->is_mental_health_flagged,
            'needs_follow_up' => $this->follow_up_date && $this->follow_up_date->isFuture(),
            'needs_urgent_attention' => $this->is_positive || $this->is_mental_health_concern,
        ];
    }
}

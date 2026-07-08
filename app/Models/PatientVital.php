<?php
// app/Models/PatientVital.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PatientVital extends Model
{
    use HasFactory;

    protected $table = 'patient_vitals';

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'patient_id',
        'visit_id',
        'recorded_by',
        'systolic_bp',
        'diastolic_bp',
        'heart_rate',
        'temperature',
        'respiratory_rate',
        'oxygen_saturation',
        'weight',
        'height',
        'bmi',
        'blood_glucose',
        'pain_score',
        'pain_location',
        'metadata',
        'recorded_at',
        'is_current',
        'status',
    ];

    protected $casts = [
        'systolic_bp' => 'integer',
        'diastolic_bp' => 'integer',
        'heart_rate' => 'integer',
        'temperature' => 'decimal:1',
        'respiratory_rate' => 'integer',
        'oxygen_saturation' => 'integer',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bmi' => 'decimal:2',
        'blood_glucose' => 'decimal:2',
        'pain_score' => 'integer',
        'metadata' => 'array',
        'recorded_at' => 'datetime',
        'is_current' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'is_current' => true,
        'status' => 'active',
    ];

    /**
     * Relationships
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_uuid', 'patient_uuid');
    }

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class, 'visit_uuid', 'id');
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by', 'id');
    }

    /**
     * Scopes
     */
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }

    public function scopeForPatient($query, $patientUuid)
    {
        return $query->where('patient_uuid', $patientUuid);
    }

    public function scopeForVisit($query, $visitUuid)
    {
        return $query->where('visit_uuid', $visitUuid);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByDateRange($query, $from, $to)
    {
        if ($from) {
            $query->where('recorded_at', '>=', $from);
        }
        if ($to) {
            $query->where('recorded_at', '<=', $to);
        }
        return $query;
    }

    /**
     * Accessors
     */
    public function getBpDisplayAttribute(): string
    {
        if ($this->systolic_bp && $this->diastolic_bp) {
            return "{$this->systolic_bp}/{$this->diastolic_bp} mmHg";
        }
        return 'N/A';
    }

    public function getBmiCategoryAttribute(): string
    {
        if (!$this->bmi) return 'Unknown';

        if ($this->bmi < 18.5) return 'Underweight';
        if ($this->bmi < 25) return 'Normal';
        if ($this->bmi < 30) return 'Overweight';
        if ($this->bmi < 35) return 'Obese Class I';
        if ($this->bmi < 40) return 'Obese Class II';
        return 'Obese Class III';
    }

    public function getBmiColorAttribute(): string
    {
        if (!$this->bmi) return 'text-slate-500';

        if ($this->bmi < 18.5) return 'text-amber-600';
        if ($this->bmi < 25) return 'text-emerald-600';
        if ($this->bmi < 30) return 'text-amber-600';
        return 'text-rose-600';
    }

    public function getIsAbnormalAttribute(): bool
    {
        $abnormal = false;

        // Check BP
        if ($this->systolic_bp && ($this->systolic_bp < 90 || $this->systolic_bp > 140)) {
            $abnormal = true;
        }
        if ($this->diastolic_bp && ($this->diastolic_bp < 60 || $this->diastolic_bp > 90)) {
            $abnormal = true;
        }

        // Check Heart Rate
        if ($this->heart_rate && ($this->heart_rate < 60 || $this->heart_rate > 100)) {
            $abnormal = true;
        }

        // Check Temperature
        if ($this->temperature && ($this->temperature < 36.1 || $this->temperature > 37.8)) {
            $abnormal = true;
        }

        // Check Oxygen Saturation
        if ($this->oxygen_saturation && $this->oxygen_saturation < 95) {
            $abnormal = true;
        }

        return $abnormal;
    }

    /**
     * Get formatted vitals for display
     */
    public function getFormattedAttribute(): array
    {
        return [
            'id' => $this->id,
            'patient_uuid' => $this->patient_uuid,
            'visit_uuid' => $this->visit_uuid,
            'systolic_bp' => $this->systolic_bp,
            'diastolic_bp' => $this->diastolic_bp,
            'bp_display' => $this->bp_display,
            'heart_rate' => $this->heart_rate,
            'temperature' => $this->temperature,
            'respiratory_rate' => $this->respiratory_rate,
            'oxygen_saturation' => $this->oxygen_saturation,
            'weight' => $this->weight,
            'height' => $this->height,
            'bmi' => $this->bmi,
            'bmi_category' => $this->bmi_category,
            'bmi_color' => $this->bmi_color,
            'blood_glucose' => $this->blood_glucose,
            'pain_score' => $this->pain_score,
            'pain_location' => $this->pain_location,
            'is_abnormal' => $this->is_abnormal,
            'is_current' => $this->is_current,
            'recorded_at' => $this->recorded_at?->format('Y-m-d H:i:s'),
            'recorded_by' => $this->recorder?->name ?? null,
        ];
    }
}

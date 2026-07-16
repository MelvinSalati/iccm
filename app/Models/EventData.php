<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventData extends Model
{
    use SoftDeletes;

    protected $table = 'event_data';

    protected $fillable = [
        'uuid',
        'source_type',
        'event_type',
        'sub_type',
        'status',
        'event_date',
        'event_time',
        'started_at',
        'completed_at',
        'facility_id',
        'facility_code',
        'department',
        'ward',
        'district',
        'province',
        'catchment_area',
        'entity_id',
        'entity_type',
        'entity_name',
        'age',
        'gender',
        'phone',
        'nrc',
        'diagnosis',
        'screening_type',
        'result',
        'result_date',
        'test_type',
        'test_result',
        'test_value',
        'test_units',
        'hiv_positive',
        'hiv_status',
        'hiv_test_date',
        'hpv_strain',
        'hpv_genotype',
        'via_findings',
        'breast_exam_findings',
        'family_history',
        'risk_factors',
        'risk_level',
        'referred_from',
        'referred_to',
        'referral_reason',
        'referral_date',
        'referral_status',
        'follow_up_date',
        'follow_up_reason',
        'follow_up_status',
        'treatment_given',
        'treatment_notes',
        'treatment_start_date',
        'treatment_end_date',
        'provider_name',
        'performed_by',
        'nurse_name',
        'doctor_name',
        'notes',
        'clinical_notes',
        'patient_notes',
        'count_value',
        'numeric_value',
        'monetary_value',
        'payload',
        'metadata',
    ];

    protected $casts = [
        'event_date' => 'date',
        'result_date' => 'date',
        'referral_date' => 'date',
        'follow_up_date' => 'date',
        'treatment_start_date' => 'date',
        'treatment_end_date' => 'date',
        'hiv_test_date' => 'date',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'risk_factors' => 'array',
        'payload' => 'array',
        'metadata' => 'array',
        'test_value' => 'decimal:2',
        'numeric_value' => 'decimal:2',
        'monetary_value' => 'decimal:2',
        'count_value' => 'integer',
        'hiv_positive' => 'boolean',
        'family_history' => 'boolean',
    ];

    /**
     * Relationships
     */
    public function facility()
    {
        return $this->belongsTo(EnrolledFacility::class);
    }

    /**
     * Scopes
     */
    public function scopeForFacility($query, $facilityId)
    {
        return $query->where('facility_id', $facilityId);
    }

    public function scopeFromSource($query, $source)
    {
        return $query->where('source_type', $source);
    }

    public function scopeOfType($query, $type)
    {
        return $query->where('event_type', $type);
    }

    public function scopeWithResult($query, $result)
    {
        return $query->where('result', $result);
    }

    public function scopePositive($query)
    {
        return $query->where('result', 'positive');
    }

    public function scopeBetweenDates($query, $start, $end)
    {
        return $query->whereBetween('event_date', [$start, $end]);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeForEntity($query, $entityId, $entityType = 'patient')
    {
        return $query->where('entity_id', $entityId)
            ->where('entity_type', $entityType);
    }

    public function scopeHivPositive($query)
    {
        return $query->where('hiv_positive', true);
    }

    public function scopeHighRisk($query)
    {
        return $query->where('risk_level', 'high');
    }

    /**
     * Helper Methods
     */
    public function isScreening()
    {
        return in_array($this->source_type, ['screening']) ||
            in_array($this->event_type, ['hpv_screening', 'via_screening', 'hiv_screening', 'breast_cancer_screening']);
    }

    public function isLabTest()
    {
        return $this->source_type === 'laboratory';
    }

    public function isReferral()
    {
        return $this->source_type === 'referral';
    }

    public function isHIVRelated()
    {
        return $this->event_type === 'hiv_screening' ||
            $this->event_type === 'hiv_test' ||
            $this->hiv_positive;
    }

    public function isHPVRelated()
    {
        return $this->event_type === 'hpv_screening' ||
            $this->screening_type === 'HPV' ||
            !is_null($this->hpv_strain);
    }

    public function isVIARelated()
    {
        return $this->event_type === 'via_screening' ||
            !is_null($this->via_findings);
    }

    public function isBreastCancerRelated()
    {
        return $this->event_type === 'breast_cancer_screening' ||
            $this->event_type === 'mammogram' ||
            $this->event_type === 'clinical_breast_exam';
    }
}

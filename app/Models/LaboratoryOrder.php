<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaboratoryOrder extends Model
{
    protected $fillable = [
        'laboratory_uuid',
        'order_number',
        'patient_id',
        'facility_id',
        'ordered_by',
        'ordered_by_name',
        'test_id',
        'test_ids',
        'test_names',
        'test_count',
        'results',
        'result_category',
        'diagnosis',
        'result_notes',
        'status',
        'sample_status',
        'processed_by',
        'processed_by_name',
        'processed_at',
        'comment',
        'priority',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'ordered_by');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patients\Patient::class, 'patient_id');
    }

    public function sampleDetail()
    {
        return $this->hasMany(LaboratoryOrderSampleDetail::class, 'laboratory_order_id');
    }

    public function resultEntry()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    public function sampleQualityAssessment()
    {
        return $this->hasOne(Pathology\SampleQualityAssessment::class, 'laboratory_order_id');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeAcceptedSamples($query)
    {
        return $query->where('sample_status', 'accepted');
    }

    public function scopeRejectedSamples($query)
    {
        return $query->where('sample_status', 'rejected');
    }
}

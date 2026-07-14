<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Patient;

class SampleQualityAssessment extends Model
{
    protected $table = 'sample_quality_assessments';

    protected $fillable = [
        'laboratory_order_id',
        'patient_id',
        'assessed_by',
        'sample_quality',
        'quality_notes',
        'assessment_status',
        'tissue_adequacy',
        'representative_sampling',
        'fixation_quality',
        'fixation_medium',
        'fixative_ratio',
        'specimen_integrity',
        'identification_verified',
        'container_leak_proof',
        'crushing_artifacts',
        'needs_special_handling',
        'special_handling_details',
        'rejection_reason'
    ];

    protected $casts = [
        'identification_verified' => 'boolean',
        'container_leak_proof' => 'boolean',
        'crushing_artifacts' => 'boolean',
        'needs_special_handling' => 'boolean',
    ];

    public function laboratoryOrder()
    {
        return $this->belongsTo(LaboratoryOrder::class, 'laboratory_order_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function assessedBy()
    {
        return $this->belongsTo(User::class, 'assessed_by');
    }
}

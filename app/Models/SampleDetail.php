<?php

namespace App\Models;

use App\Models\Patients\Patient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SampleDetail extends Model
{
    protected $fillable = [

        'laboratory_order_id',
        'patient_id',
        'assessed_by',
        'sample_quality',
        'quality_notes',
        'assessment_status',
        'is_hemolyzed',
        'is_icteric',
        'is_lipemic',
        'rejection_reason'
    ];

    protected $casts = [
        'is_hemolyzed' => 'boolean',
        'is_icteric' => 'boolean',
        'is_lipemic' => 'boolean',
    ];

    public function laboratoryOrder(): BelongsTo
    {
        return $this->belongsTo(LaboratoryOrder::class);
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function assessedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assessed_by');
    }
}

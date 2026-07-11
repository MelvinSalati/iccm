<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Consultation extends Model
{
    use SoftDeletes;

    protected $table = 'consultations';

    public $incrementing = false;
    protected $keyType = 'string';

    // ✅ Match your actual table columns
    protected $fillable = [
        'id',
        'visit_id',
        'consultation_uuid',
        'cervical_cancer_image_url',
        'sms_to_dr',
        'assigned_to_user_id',
        'patient_appointment',
        'assigning_user_id',
        'facility_id',
        'consultation_status',
        'comment',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'consultation_uuid' => 'string',
        'cervical_cancer_image_url' => 'string',
        'sms_to_dr' => 'boolean',
        'patient_appointment' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ✅ Auto-generate UUID on create
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->consultation_uuid)) {
                $model->consultation_uuid = (string) Str::uuid();
            }
        });
    }

    // ✅ Relationships
    public function visit()
    {
        return $this->belongsTo(Patients\PatientVisit::class, 'visit_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }

    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigning_user_id');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }
}

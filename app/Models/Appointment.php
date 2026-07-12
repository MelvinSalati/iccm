<?php

namespace App\Models;

use App\Models\Patients\PatientVisit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'patient_id',
        'user_id',
        'visit_id',
        'appointment_date',
        'appointment_time',
        'appointment_type',
        'appointment_status',
        'priority',
        'department',
        'doctor_id',
        'doctor_name',
        'reason',
        'notes',
        'facility_id',
        'provider_id',
        'province_code',
        'district_code',
        'duration_minutes',
        'reminder_sent',
        'sms_sent',
        'email_sent',
        'cancelled_at',
        'cancelled_reason',
        'completed_at',
        'no_show_at',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime',
        'reminder_sent' => 'boolean',
        'sms_sent' => 'boolean',
        'email_sent' => 'boolean',
        'duration_minutes' => 'integer',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function visit(): BelongsTo
    {
        return $this->belongsTo(PatientVisit::class,'visit_id');
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}

<?php

namespace App\Models\Patients;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientVisit extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'patient_visits';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'patient_id',
        'visit_number',
        'external_visit_id',
        'visit_token',
        'visit_type',
        'visit_mode',
        'check_in_time',
        'check_out_time',
        'duration_minutes',
        'facility',
        'department',
        'ward',
        'room_number',
        'bed_number',
        'visit_status',
        'is_admission',
        'admission_date',
        'discharge_date',
        'admission_type',
        'is_referral',
        'referred_from',
        'referred_to',
        'referral_date',
        'referral_source',
        'referral_reason',
        'referral_type',
        'referred_by',
        'referring_facility',
        'referring_doctor',
        'priority',
        'presenting_complaint',
        'chief_complaint',
        'history_of_presenting_illness',
        'triage_notes',
        'triage_category',
        'triage_score',
        'vital_signs',
        'symptoms',
        'diagnosis',
        'icd10_code',
        'treatment_plan',
        'primary_provider',
        'primary_provider_role',
        'care_team',
        'visit_outcome',
        'outcome_notes',
        'outcome_metrics',
        'discharge_instructions',
        'discharge_status',
        'scheduled_follow_up',
        'follow_up_completed',
        'follow_up_instructions',
        'patient_satisfaction_score',
        'patient_feedback',
        'is_billed',
        'total_cost',
        'payment_status',
        'insurance_details',
        'created_by',
        'updated_by',
        'checked_in_by',
        'checked_out_by',
        'supervised_by',
        'checkin_latitude',
        'checkin_longitude',
        'checkin_location_name',
        'device_id',
        'ip_address',
        'source',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relationship',
        'language_interpretation_needed',
        'interpretation_language',
        'visit_purpose',
        'consent_obtained',
        'consent_obtained_at',
        'consent_obtained_by',
        'clinical_notes',
        'nursing_notes',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'check_in_time' => 'datetime',
        'check_out_time' => 'datetime',
        'admission_date' => 'datetime',
        'discharge_date' => 'datetime',
        'referral_date' => 'datetime',
        'scheduled_follow_up' => 'datetime',
        'consent_obtained_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'is_referral' => 'boolean',
        'is_admission' => 'boolean',
        'is_billed' => 'boolean',
        'follow_up_completed' => 'boolean',
        'consent_obtained' => 'boolean',
        'care_team' => 'array',
        'outcome_metrics' => 'array',
        'insurance_details' => 'array',
        'metadata' => 'array',
        'vital_signs' => 'array',
        'symptoms' => 'array',
        'diagnosis' => 'array',
        'treatment_plan' => 'array',
        'duration_minutes' => 'integer',
        'triage_score' => 'integer',
        'patient_satisfaction_score' => 'integer',
        'total_cost' => 'decimal:2',
        'checkin_latitude' => 'decimal:8',
        'checkin_longitude' => 'decimal:8',

    ];

    /**
     * Get the patient that owns the visit.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_id', 'id');
    }

    /**
     * Get the user who created the visit.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who updated the visit.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the user who checked in the patient.
     */
    public function checkedInBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'checked_in_by');
    }

    /**
     * Get the user who checked out the patient.
     */
    public function checkedOutBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'checked_out_by');
    }

    /**
     * Get the supervisor for this visit.
     */
    public function supervisedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervised_by');
    }

    /**
     * Check if the visit is active.
     */
    public function isActive(): bool
    {
        return in_array($this->visit_status, ['scheduled', 'checked_in', 'in_progress']);
    }

    /**
     * Check if the visit is completed.
     */
    public function isCompleted(): bool
    {
        return $this->visit_status === 'completed';
    }

    /**
     * Check if the visit is a referral.
     */
    public function isReferral(): bool
    {
        return (bool) $this->is_referral;
    }

    /**
     * Calculate and update the visit duration.
     */
    public function calculateDuration(): ?int
    {
        if ($this->check_in_time && $this->check_out_time) {
            $duration = $this->check_in_time->diffInMinutes($this->check_out_time);
            $this->duration_minutes = $duration;
            $this->save();
            return $duration;
        }
        return null;
    }

    /**
     * Scope a query to only include active visits.
     */
    public function scopeActive($query)
    {
        return $query->whereIn('visit_status', ['scheduled', 'checked_in', 'in_progress']);
    }

    /**
     * Scope a query to only include completed visits.
     */
    public function scopeCompleted($query)
    {
        return $query->where('visit_status', 'completed');
    }

    /**
     * Scope a query to only include visits by facility.
     */
    public function scopeAtFacility($query, string $facility)
    {
        return $query->where('facility', $facility);
    }

    /**
     * Scope a query to only include visits by department.
     */
    public function scopeInDepartment($query, string $department)
    {
        return $query->where('department', $department);
    }

    /**
     * Scope a query to only include referral visits.
     */
    public function scopeReferrals($query)
    {
        return $query->where('is_referral', true);
    }

    /**
     * Scope a query to only include visits with a specific status.
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('visit_status', $status);
    }

    /**
     * Scope a query to only include visits of a specific type.
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('visit_type', $type);
    }

    /**patient_visits
     * Scope a query to only include visits within a date range.
     */
    public function scopeDateRange($query, $start, $end)
    {
        return $query->whereBetween('check_in_time', [$start, $end]);
    }
}

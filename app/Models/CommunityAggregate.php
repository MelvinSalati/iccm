<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommunityAggregate extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'facility_id',
        'cervical_education',
        'breast_education',
        'family_planning_education',
        'nutrition_education',
        'cervical_screening',
        'breast_screening',
        'hiv_screening',
        'hypertension_screening',
        'diabetes_screening',
        'referrals_made',
        'referrals_completed',
        'follow_ups_completed',
        'follow_ups_pending',
        'community_health_workers',
        'community_meetings_held',
        'household_visits',
        'total_participants',
        'total_females',
        'total_males',
        'age_15_24',
        'age_25_34',
        'age_35_44',
        'age_45_54',
        'age_55_plus',
        'notes',
        'assessment_date',
        'assessed_by',
        'status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'assessment_date' => 'date',
        'cervical_education' => 'integer',
        'breast_education' => 'integer',
        'family_planning_education' => 'integer',
        'nutrition_education' => 'integer',
        'cervical_screening' => 'integer',
        'breast_screening' => 'integer',
        'hiv_screening' => 'integer',
        'hypertension_screening' => 'integer',
        'diabetes_screening' => 'integer',
        'referrals_made' => 'integer',
        'referrals_completed' => 'integer',
        'follow_ups_completed' => 'integer',
        'follow_ups_pending' => 'integer',
        'community_health_workers' => 'integer',
        'community_meetings_held' => 'integer',
        'household_visits' => 'integer',
        'total_participants' => 'integer',
        'total_females' => 'integer',
        'total_males' => 'integer',
        'age_15_24' => 'integer',
        'age_25_34' => 'integer',
        'age_35_44' => 'integer',
        'age_45_54' => 'integer',
        'age_55_plus' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the facility that owns the community aggregate.
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    /**
     * Get the user who assessed the community aggregate.
     */
    public function assessedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assessed_by');
    }

    /**
     * Scope a query to only include aggregates for a specific facility.
     */
    public function scopeForFacility($query, $facilityId)
    {
        return $query->where('facility_id', $facilityId);
    }

    /**
     * Scope a query to only include aggregates with a specific status.
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include aggregates from a specific date range.
     */
    public function scopeDateRange($query, $from, $to)
    {
        return $query->whereBetween('assessment_date', [$from, $to]);
    }

    /**
     * Scope a query to only include aggregates from a specific year.
     */
    public function scopeYear($query, $year)
    {
        return $query->whereYear('assessment_date', $year);
    }

    /**
     * Get the total education count.
     */
    public function getTotalEducationAttribute(): int
    {
        return $this->cervical_education +
            $this->breast_education +
            $this->family_planning_education +
            $this->nutrition_education;
    }

    /**
     * Get the total screening count.
     */
    public function getTotalScreeningAttribute(): int
    {
        return $this->cervical_screening +
            $this->breast_screening +
            $this->hiv_screening +
            $this->hypertension_screening +
            $this->diabetes_screening;
    }

    /**
     * Get the total referrals count.
     */
    public function getTotalReferralsAttribute(): int
    {
        return $this->referrals_made + $this->referrals_completed;
    }

    /**
     * Get the total follow-ups count.
     */
    public function getTotalFollowUpsAttribute(): int
    {
        return $this->follow_ups_completed + $this->follow_ups_pending;
    }

    /**
     * Get the total participants including breakdown.
     */
    public function getParticipantsBreakdownAttribute(): array
    {
        return [
            'total' => $this->total_participants,
            'females' => $this->total_females,
            'males' => $this->total_males,
            'age_15_24' => $this->age_15_24,
            'age_25_34' => $this->age_25_34,
            'age_35_44' => $this->age_35_44,
            'age_45_54' => $this->age_45_54,
            'age_55_plus' => $this->age_55_plus,
        ];
    }

    /**
     * Check if the aggregate is submitted.
     */
    public function isSubmitted(): bool
    {
        return $this->status === 'submitted';
    }

    /**
     * Check if the aggregate is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if the aggregate is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if the aggregate is draft.
     */
    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    /**
     * Get the status badge color.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'draft' => 'gray',
            'submitted' => 'yellow',
            'approved' => 'green',
            'rejected' => 'red',
            default => 'gray',
        };
    }

    /**
     * Get the status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return ucfirst($this->status);
    }

    /**
     * Get formatted assessment date.
     */
    public function getFormattedAssessmentDateAttribute(): string
    {
        return $this->assessment_date ? $this->assessment_date->format('M d, Y') : 'N/A';
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->assessment_date)) {
                $model->assessment_date = now()->toDateString();
            }
            if (empty($model->status)) {
                $model->status = 'draft';
            }
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnrolledFacility extends Model
{
    use SoftDeletes;

    protected $table = 'enrolled_facilities';

    protected $fillable = [
        'name',
        'code',
        'type',
        'district',
        'province',
        'address',
        'phone',
        'email',
        'status',
        'enrollment_date',
        'expiry_date',
        'notes',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'enrollment_date' => 'date',
        'expiry_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Relationships
     */

    /**
     * Get all events for this facility
     */
    public function events()
    {
        return $this->hasMany(EventData::class);
    }

    /**
     * Get all screenings for this facility
     */
    public function screenings()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'screening');
    }

    /**
     * Get all laboratory tests for this facility
     */
    public function labTests()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'laboratory');
    }

    /**
     * Get all referrals for this facility
     */
    public function referrals()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'referral');
    }

    /**
     * Get all appointments for this facility
     */
    public function appointments()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'appointment');
    }

    /**
     * Get all consultations for this facility
     */
    public function consultations()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'consultation');
    }

    /**
     * Get all treatments for this facility
     */
    public function treatments()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'treatment');
    }

    /**
     * Get all follow-ups for this facility
     */
    public function followUps()
    {
        return $this->hasMany(EventData::class)->where('source_type', 'follow_up');
    }

    /**
     * Get indicator performances for this facility
     */
    public function indicatorPerformances()
    {
        return $this->hasMany(IndicatorPerformance::class);
    }

    /**
     * Get the user who created this facility
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this facility
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scopes
     */

    /**
     * Scope to get active facilities
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to get facilities by district
     */
    public function scopeInDistrict($query, $district)
    {
        return $query->where('district', $district);
    }

    /**
     * Scope to get facilities by province
     */
    public function scopeInProvince($query, $province)
    {
        return $query->where('province', $province);
    }

    /**
     * Scope to get facilities by type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to get facilities enrolled after a date
     */
    public function scopeEnrolledAfter($query, $date)
    {
        return $query->where('enrollment_date', '>=', $date);
    }

    /**
     * Scope to get facilities with upcoming expiry
     */
    public function scopeExpiringSoon($query, $days = 30)
    {
        return $query->whereNotNull('expiry_date')
            ->whereBetween('expiry_date', [now(), now()->addDays($days)]);
    }

    /**
     * Helper Methods
     */

    /**
     * Check if facility is active
     */
    public function isActive()
    {
        return $this->status === 'active';
    }

    /**
     * Check if facility is pending
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if facility is inactive
     */
    public function isInactive()
    {
        return $this->status === 'inactive';
    }

    /**
     * Get total events count
     */
    public function getTotalEventsAttribute()
    {
        return $this->events()->count();
    }

    /**
     * Get total screenings count
     */
    public function getTotalScreeningsAttribute()
    {
        return $this->screenings()->count();
    }

    /**
     * Get total HPV screenings
     */
    public function getTotalHpvScreeningsAttribute()
    {
        return $this->events()
            ->where('event_type', 'hpv_screening')
            ->count();
    }

    /**
     * Get total VIA screenings
     */
    public function getTotalViaScreeningsAttribute()
    {
        return $this->events()
            ->where('event_type', 'via_screening')
            ->count();
    }

    /**
     * Get total HIV screenings
     */
    public function getTotalHivScreeningsAttribute()
    {
        return $this->events()
            ->where('event_type', 'hiv_screening')
            ->count();
    }

    /**
     * Get total breast cancer screenings
     */
    public function getTotalBreastCancerScreeningsAttribute()
    {
        return $this->events()
            ->where('event_type', 'breast_cancer_screening')
            ->count();
    }

    /**
     * Get positive rate for HPV
     */
    public function getHpvPositivityRateAttribute()
    {
        $total = $this->events()
            ->where('event_type', 'hpv_screening')
            ->count();

        $positive = $this->events()
            ->where('event_type', 'hpv_screening')
            ->where('result', 'positive')
            ->count();

        return $total > 0 ? round(($positive / $total) * 100, 2) : 0;
    }

    /**
     * Get facility statistics
     */
    public function getStatistics($startDate = null, $endDate = null)
    {
        $query = $this->events();

        if ($startDate && $endDate) {
            $query->whereBetween('event_date', [$startDate, $endDate]);
        }

        return [
            'total_events' => $query->count(),
            'by_source' => (clone $query)->select('source_type', \DB::raw('COUNT(*) as count'))
                ->groupBy('source_type')
                ->get()
                ->pluck('count', 'source_type')
                ->toArray(),
            'by_type' => (clone $query)->select('event_type', \DB::raw('COUNT(*) as count'))
                ->groupBy('event_type')
                ->get()
                ->pluck('count', 'event_type')
                ->toArray(),
            'by_result' => (clone $query)->whereNotNull('result')
                ->select('result', \DB::raw('COUNT(*) as count'))
                ->groupBy('result')
                ->get()
                ->pluck('count', 'result')
                ->toArray(),
            'positive_rate' => $this->getOverallPositivityRate($startDate, $endDate),
        ];
    }

    /**
     * Get overall positivity rate
     */
    public function getOverallPositivityRate($startDate = null, $endDate = null)
    {
        $query = $this->events()->whereNotNull('result');

        if ($startDate && $endDate) {
            $query->whereBetween('event_date', [$startDate, $endDate]);
        }

        $total = $query->count();
        $positive = (clone $query)->where('result', 'positive')->count();

        return $total > 0 ? round(($positive / $total) * 100, 2) : 0;
    }

    /**
     * Get monthly summary
     */
    public function getMonthlySummary($year = null, $month = null)
    {
        $year = $year ?? now()->year;
        $month = $month ?? now()->month;

        $start = now()->setDate($year, $month, 1)->startOfMonth();
        $end = $start->copy()->endOfMonth();

        return [
            'total' => $this->events()->whereBetween('event_date', [$start, $end])->count(),
            'screenings' => $this->screenings()->whereBetween('event_date', [$start, $end])->count(),
            'laboratory' => $this->labTests()->whereBetween('event_date', [$start, $end])->count(),
            'referrals' => $this->referrals()->whereBetween('event_date', [$start, $end])->count(),
            'consultations' => $this->consultations()->whereBetween('event_date', [$start, $end])->count(),
        ];
    }

    /**
     * Get district statistics
     */
    public static function getDistrictStats($district, $startDate = null, $endDate = null)
    {
        $query = self::where('district', $district);

        if ($startDate && $endDate) {
            $facilityIds = $query->pluck('id');
            return EventData::whereIn('facility_id', $facilityIds)
                ->whereBetween('event_date', [$startDate, $endDate])
                ->count();
        }

        return $query->count();
    }

    /**
     * Get province statistics
     */
    public static function getProvinceStats($province, $startDate = null, $endDate = null)
    {
        $query = self::where('province', $province);

        if ($startDate && $endDate) {
            $facilityIds = $query->pluck('id');
            return EventData::whereIn('facility_id', $facilityIds)
                ->whereBetween('event_date', [$startDate, $endDate])
                ->count();
        }

        return $query->count();
    }
}

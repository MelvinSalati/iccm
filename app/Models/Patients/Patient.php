<?php

namespace App\Models\Patients;

use App\Models\Patients\PatientAddress;
use App\Models\Patients\PatientRiskFactor;
use App\Models\Patients\PatientTelecom;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use App\Models\User;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'patients';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'marital_status',
        'nrc_number',
        'phone_number',
        'is_active',
        'registered_at',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'registered_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'full_name',
        'age',
        'latest_risk_assessment',
        'risk_flags',
        'is_high_risk',
    ];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(PatientAddress::class);
    }

    public function primaryAddress(): HasOne
    {
        return $this->hasOne(PatientAddress::class)->where('is_primary', true);
    }

    public function telecoms(): HasMany
    {
        return $this->hasMany(PatientTelecom::class);
    }

    public function primaryTelecom(): HasOne
    {
        return $this->hasOne(PatientTelecom::class)->where('is_primary', true);
    }

    public function riskFactors(): HasMany
    {
        return $this->hasMany(PatientRiskFactor::class);
    }

    public function latestRiskFactor(): HasOne
    {
        return $this->hasOne(PatientRiskFactor::class)->latest('assessment_date');
    }

    // ============================================
    // ACCESSORS
    // ============================================

    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    public function getAgeAttribute(): ?int
    {
        if ($this->date_of_birth) {
            return Carbon::parse($this->date_of_birth)->age;
        }
        return null;
    }

    public function getLatestRiskAssessmentAttribute(): ?PatientRiskFactor
    {
        return $this->latestRiskFactor()->first();
    }

    public function getRiskFlagsAttribute(): array
    {
        $risk = $this->latestRiskFactor;
        return $risk ? $risk->getRiskFlags() : [];
    }

    public function getIsHighRiskAttribute(): bool
    {
        $risk = $this->latestRiskFactor;
        if (!$risk) return false;

        $summary = $risk->getRiskSummary();
        return in_array($summary['risk_level'], ['high', 'very_high']);
    }

    public function latestRiskAssessment(){
        return $this->belongsTo(PatientRiskFactor::class);
    }

    public function visitType(){
        return $this->belongsTo(PatientVisit::class);
    }
    public function getPrimaryAddressAttribute(): ?PatientAddress
    {
        return $this->primaryAddress()->first();
    }

    public function getPrimaryContactAttribute(): ?PatientTelecom
    {
        return $this->primaryTelecom()->first();
    }

    public function getFormattedAddressAttribute(): ?string
    {
        $address = $this->primaryAddress;
        if (!$address) return null;

        $parts = array_filter([
            $address->compound,
            $address->village,
            $address->ward,
            $address->chiefdom,
            $address->district,
            $address->province,
        ]);
        return implode(', ', $parts);
    }

    // ============================================
    // SCOPES
    // ============================================

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('nrc_number', 'like', "%{$search}%")
                ->orWhere('phone_number', 'like', "%{$search}%");
        });
    }

    public function scopeWithHighRisk($query)
    {
        return $query->whereHas('riskFactors', function ($q) {
            $q->whereIn('risk_level', ['high', 'very_high']);
        });
    }

    public function scopeWithHivPositive($query)
    {
        return $query->whereHas('riskFactors', function ($q) {
            $q->where('hiv_status', 'positive');
        });
    }

    public function scopeWithHpvPositive($query)
    {
        return $query->whereHas('riskFactors', function ($q) {
            $q->where('hpv_status', 'positive');
        });
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    public static function prepareData(array $data): array
    {
        return [
            'user_id' => $data['user_id'] ?? null,
            'first_name' => $data['firstName'] ?? '',
            'last_name' => $data['lastName'] ?? '',
            'date_of_birth' => $data['dateOfBirth'] ?? null,
            'gender' => $data['gender'] ?? null,
            'marital_status' => $data['maritalStatus'] ?? null,
            'nrc_number' => $data['nrcNumber'] ?? null,
            'phone_number' => $data['phoneNumber'] ?? null,
            'registered_at' => now(),
            'is_active' => true,
        ];
    }

    public static function prepareAddressData(array $data): array
    {
        $address = $data['address'] ?? [];
        return [
            'province' => $address['province'] ?? null,
            'district' => $address['district'] ?? null,
            'chiefdom' => $address['chiefdom'] ?? null,
            'village' => $address['village'] ?? null,
            'ward' => $address['ward'] ?? null,
            'compound' => $address['compound'] ?? null,
            'landmark' => $address['landmark'] ?? null,
            'postal_code' => $address['postalCode'] ?? null,
            'address_type' => 'current',
            'is_primary' => true,
        ];
    }

    public static function prepareTelecomData(array $data): array
    {
        $telecoms = [];
        $contacts = $data['telecom'] ?? [];

        foreach ($contacts as $index => $contact) {
            $telecoms[] = [
                'system' => $contact['system'] ?? 'mobile',
                'value' => $contact['value'] ?? '',
                'use' => $contact['use'] ?? 'mobile',
                'rank' => $contact['rank'] ?? ($index + 1),
                'is_primary' => $index === 0,
                'is_verified' => false,
            ];
        }

        return $telecoms;
    }

    public function getRiskSummary(): array
    {
        $risk = $this->latestRiskFactor;
        return $risk ? $risk->getRiskSummary() : [
            'risk_score' => 0,
            'risk_level' => 'unknown',
            'risk_flags' => [],
            'has_risks' => false,
            'hiv_positive' => false,
            'hpv_positive' => false,
        ];
    }

    public static function getStats(): array
    {
        return [
            'total' => self::count(),
            'active' => self::active()->count(),
            'high_risk' => self::withHighRisk()->count(),
            'hiv_positive' => self::withHivPositive()->count(),
            'hpv_positive' => self::withHpvPositive()->count(),
            'registered_today' => self::whereDate('registered_at', today())->count(),
            'registered_this_week' => self::whereBetween('registered_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
        ];
    }
}

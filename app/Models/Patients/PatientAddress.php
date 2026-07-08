<?php

namespace App\Models\Patients;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientAddress extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'patient_addresses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'patient_id',
        'province',
        'district',
        'chiefdom',
        'village',
        'ward',
        'compound',
        'landmark',
        'postal_code',
        'address_type',
        'is_primary',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'metadata' => 'array',
        'is_primary' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'full_address',
        'address_type_label',
    ];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    /**
     * Get the patient that owns this address.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    // ============================================
    // ACCESSORS
    // ============================================

    /**
     * Get the full address as a string.
     */
    public function getFullAddressAttribute(): string
    {
        $parts = array_filter([
            $this->compound,
            $this->village,
            $this->ward,
            $this->chiefdom,
            $this->district,
            $this->province,
        ]);

        return !empty($parts) ? implode(', ', $parts) : 'No address provided';
    }

    /**
     * Get the address type label.
     */
    public function getAddressTypeLabelAttribute(): string
    {
        $types = [
            'current' => 'Current',
            'previous' => 'Previous',
            'permanent' => 'Permanent',
            'temporary' => 'Temporary',
        ];

        return $types[$this->address_type ?? 'current'] ?? 'Current';
    }

    /**
     * Get the province with proper formatting.
     */
    public function getProvinceFormattedAttribute(): string
    {
        return $this->province ?? 'Not specified';
    }

    /**
     * Get the district with proper formatting.
     */
    public function getDistrictFormattedAttribute(): string
    {
        return $this->district ?? 'Not specified';
    }

    /**
     * Check if this is a complete address.
     */
    public function getIsCompleteAttribute(): bool
    {
        return !empty($this->province) && !empty($this->district);
    }

    // ============================================
    // MUTATORS
    // ============================================

    /**
     * Set the province and ensure proper formatting.
     */
    public function setProvinceAttribute(?string $value): void
    {
        $this->attributes['province'] = $value ? ucwords(strtolower(trim($value))) : null;
    }

    /**
     * Set the district and ensure proper formatting.
     */
    public function setDistrictAttribute(?string $value): void
    {
        $this->attributes['district'] = $value ? ucwords(strtolower(trim($value))) : null;
    }

    /**
     * Set the village and ensure proper formatting.
     */
    public function setVillageAttribute(?string $value): void
    {
        $this->attributes['village'] = $value ? ucwords(strtolower(trim($value))) : null;
    }

    /**
     * Set the compound and ensure proper formatting.
     */
    public function setCompoundAttribute(?string $value): void
    {
        $this->attributes['compound'] = $value ? ucwords(strtolower(trim($value))) : null;
    }

    // ============================================
    // SCOPES
    // ============================================

    /**
     * Scope a query to only include primary addresses.
     */
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }

    /**
     * Scope a query to only include non-primary addresses.
     */
    public function scopeSecondary($query)
    {
        return $query->where('is_primary', false);
    }

    /**
     * Scope a query to only include addresses of a specific type.
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('address_type', $type);
    }

    /**
     * Scope a query to only include current addresses.
     */
    public function scopeCurrent($query)
    {
        return $query->where('address_type', 'current');
    }

    /**
     * Scope a query to only include addresses in a specific province.
     */
    public function scopeByProvince($query, string $province)
    {
        return $query->where('province', $province);
    }

    /**
     * Scope a query to only include addresses in a specific district.
     */
    public function scopeByDistrict($query, string $district)
    {
        return $query->where('district', $district);
    }

    /**
     * Scope a query to only include complete addresses.
     */
    public function scopeComplete($query)
    {
        return $query->whereNotNull('province')
            ->whereNotNull('district');
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /**
     * Check if the address has a postal code.
     */
    public function hasPostalCode(): bool
    {
        return !empty($this->postal_code);
    }

    /**
     * Check if the address has a landmark.
     */
    public function hasLandmark(): bool
    {
        return !empty($this->landmark);
    }

    /**
     * Get the address as an array for API responses.
     */
    public function toApiArray(): array
    {
        return [
            'id' => $this->id,
            'province' => $this->province,
            'district' => $this->district,
            'chiefdom' => $this->chiefdom,
            'village' => $this->village,
            'ward' => $this->ward,
            'compound' => $this->compound,
            'landmark' => $this->landmark,
            'postal_code' => $this->postal_code,
            'address_type' => $this->address_type,
            'address_type_label' => $this->address_type_label,
            'is_primary' => $this->is_primary,
            'full_address' => $this->full_address,
            'is_complete' => $this->is_complete,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * Get the address as a formatted HTML string.
     */
    public function toHtml(): string
    {
        $parts = array_filter([
            $this->compound ? '<strong>' . e($this->compound) . '</strong>' : null,
            $this->village ? e($this->village) : null,
            $this->ward ? e($this->ward) : null,
            $this->chiefdom ? e($this->chiefdom) : null,
            $this->district ? e($this->district) : null,
            $this->province ? e($this->province) : null,
        ]);

        return !empty($parts) ? implode('<br>', $parts) : 'No address provided';
    }

    /**
     * Get the address as a Google Maps search query.
     */
    public function toGoogleMapsQuery(): string
    {
        $parts = array_filter([
            $this->compound,
            $this->village,
            $this->ward,
            $this->chiefdom,
            $this->district,
            $this->province,
            $this->postal_code,
        ]);

        return !empty($parts) ? implode(', ', $parts) : '';
    }

    /**
     * Create a new address from an array of data.
     */
    public static function createFromArray(array $data, int $patientId): self
    {
        $addressData = [
            'patient_id' => $patientId,
            'province' => $data['province'] ?? null,
            'district' => $data['district'] ?? null,
            'chiefdom' => $data['chiefdom'] ?? null,
            'village' => $data['village'] ?? null,
            'ward' => $data['ward'] ?? null,
            'compound' => $data['compound'] ?? null,
            'landmark' => $data['landmark'] ?? null,
            'postal_code' => $data['postalCode'] ?? null,
            'address_type' => $data['address_type'] ?? 'current',
            'is_primary' => $data['is_primary'] ?? true,
            'metadata' => $data['metadata'] ?? null,
        ];

        return self::create($addressData);
    }

    /**
     * Update the address or create a new primary address.
     */
    public static function updateOrCreatePrimary(int $patientId, array $data): self
    {
        // Find existing primary address or create new
        $address = self::where('patient_id', $patientId)
            ->where('is_primary', true)
            ->first();

        if ($address) {
            $address->update([
                'province' => $data['province'] ?? $address->province,
                'district' => $data['district'] ?? $address->district,
                'chiefdom' => $data['chiefdom'] ?? $address->chiefdom,
                'village' => $data['village'] ?? $address->village,
                'ward' => $data['ward'] ?? $address->ward,
                'compound' => $data['compound'] ?? $address->compound,
                'landmark' => $data['landmark'] ?? $address->landmark,
                'postal_code' => $data['postalCode'] ?? $address->postal_code,
                'address_type' => $data['address_type'] ?? $address->address_type,
            ]);
        } else {
            $address = self::createFromArray($data, $patientId);
        }

        return $address;
    }

    /**
     * Get a summary of the address for display.
     */
    public function getSummary(): string
    {
        $parts = array_filter([
            $this->compound,
            $this->village,
            $this->district,
        ]);

        return !empty($parts) ? implode(', ', $parts) : 'Address not complete';
    }

    /**
     * Check if two addresses are the same.
     */
    public function isSameAs(array $address): bool
    {
        return $this->province === ($address['province'] ?? null)
            && $this->district === ($address['district'] ?? null)
            && $this->chiefdom === ($address['chiefdom'] ?? null)
            && $this->village === ($address['village'] ?? null)
            && $this->compound === ($address['compound'] ?? null);
    }

    /**
     * Get the address for display in select dropdowns.
     */
    public function getSelectLabel(): string
    {
        return $this->full_address . ($this->is_primary ? ' (Primary)' : '');
    }

    /**
     * Get the address as a JSON object for API responses.
     * @param int $options
     */
    public function toJson($options = 0)
    {
        return [
            'province' => $this->province,
            'district' => $this->district,
            'chiefdom' => $this->chiefdom,
            'village' => $this->village,
            'ward' => $this->ward,
            'compound' => $this->compound,
            'landmark' => $this->landmark,
            'postalCode' => $this->postal_code,
        ];
    }

    /**
     * Get validation rules for address fields.
     */
    public static function getValidationRules(): array
    {
        return [
            'address.province' => 'required|string|max:255',
            'address.district' => 'required|string|max:255',
            'address.chiefdom' => 'nullable|string|max:255',
            'address.village' => 'nullable|string|max:255',
            'address.ward' => 'nullable|string|max:255',
            'address.compound' => 'nullable|string|max:255',
            'address.landmark' => 'nullable|string|max:255',
            'address.postalCode' => 'nullable|string|max:20',
        ];
    }
}

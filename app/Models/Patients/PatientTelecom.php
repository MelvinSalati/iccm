<?php

namespace App\Models\Patients;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientTelecom extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'patient_telecoms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'patient_id',
        'system',
        'value',
        'use',
        'rank',
        'is_primary',
        'is_verified',
        'verified_at',
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
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'system_label',
        'use_label',
        'formatted_value',
        'status_badge',
    ];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    /**
     * Get the patient that owns this telecom.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    // ============================================
    // ACCESSORS
    // ============================================

    /**
     * Get the system label.
     */
    public function getSystemLabelAttribute(): string
    {
        $labels = [
            'phone' => 'Phone',
            'mobile' => 'Mobile',
            'email' => 'Email',
            'whatsapp' => 'WhatsApp',
            'fax' => 'Fax',
            'sms' => 'SMS',
        ];
        return $labels[$this->system ?? ''] ?? ucfirst($this->system ?? 'Unknown');
    }

    /**
     * Get the use label.
     */
    public function getUseLabelAttribute(): string
    {
        $labels = [
            'home' => 'Home',
            'work' => 'Work',
            'mobile' => 'Mobile',
            'emergency' => 'Emergency',
            'temporary' => 'Temporary',
        ];
        return $labels[$this->use ?? ''] ?? ucfirst($this->use ?? 'Unknown');
    }

    /**
     * Get the formatted value.
     */
    public function getFormattedValueAttribute(): string
    {
        if ($this->system === 'email') {
            return $this->value;
        }

        // Format phone numbers if needed
        if (in_array($this->system, ['phone', 'mobile', 'whatsapp'])) {
            return $this->formatPhoneNumber($this->value);
        }

        return $this->value;
    }

    /**
     * Get the status badge.
     */
    public function getStatusBadgeAttribute(): string
    {
        if ($this->is_verified) {
            return '<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Verified</span>';
        }
        return '<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>';
    }

    /**
     * Get the status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return $this->is_verified ? 'Verified' : 'Pending Verification';
    }

    /**
     * Get the rank label.
     */
    public function getRankLabelAttribute(): string
    {
        $labels = [
            1 => 'Primary',
            2 => 'Secondary',
            3 => 'Tertiary',
        ];
        return $labels[$this->rank ?? 0] ?? 'Rank ' . ($this->rank ?? 0);
    }

    /**
     * Get the icon name for this telecom type.
     */
    public function getIconAttribute(): string
    {
        $icons = [
            'phone' => 'Phone',
            'mobile' => 'Smartphone',
            'email' => 'Mail',
            'whatsapp' => 'MessageCircle',
            'fax' => 'Printer',
            'sms' => 'MessageSquare',
        ];
        return $icons[$this->system ?? ''] ?? 'Contact';
    }

    // ============================================
    // MUTATORS
    // ============================================

    /**
     * Set the value and normalize it.
     */
    public function setValueAttribute(?string $value): void
    {
        if ($value && in_array($this->system ?? '', ['phone', 'mobile', 'whatsapp'])) {
            $this->attributes['value'] = $this->normalizePhoneNumber($value);
        } elseif ($value && $this->system === 'email') {
            $this->attributes['value'] = strtolower(trim($value));
        } else {
            $this->attributes['value'] = $value;
        }
    }

    // ============================================
    // SCOPES
    // ============================================

    /**
     * Scope a query to only include primary contacts.
     */
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }

    /**
     * Scope a query to only include verified contacts.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Scope a query to only include unverified contacts.
     */
    public function scopeUnverified($query)
    {
        return $query->where('is_verified', false);
    }

    /**
     * Scope a query to only include contacts of a specific system.
     */
    public function scopeBySystem($query, string $system)
    {
        return $query->where('system', $system);
    }

    /**
     * Scope a query to only include mobile contacts.
     */
    public function scopeMobile($query)
    {
        return $query->where('system', 'mobile');
    }

    /**
     * Scope a query to only include email contacts.
     */
    public function scopeEmail($query)
    {
        return $query->where('system', 'email');
    }

    /**
     * Scope a query to only include WhatsApp contacts.
     */
    public function scopeWhatsApp($query)
    {
        return $query->where('system', 'whatsapp');
    }

    /**
     * Scope a query to order by rank.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('rank')->orderBy('is_primary', 'desc');
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /**
     * Format phone number.
     */
    protected function formatPhoneNumber(?string $number): string
    {
        if (empty($number)) {
            return '';
        }

        // Remove all non-numeric characters
        $cleaned = preg_replace('/[^0-9+]/', '', $number);

        // Check if it's a Zambian number
        if (str_starts_with($cleaned, '+260')) {
            $number = substr($cleaned, 4);
            return '+260 ' . substr($number, 0, 3) . ' ' . substr($number, 3, 3) . ' ' . substr($number, 6);
        }

        // Check if it's a local Zambian number
        if (str_starts_with($cleaned, '0')) {
            $number = substr($cleaned, 1);
            if (strlen($number) === 9) {
                return '+260 ' . substr($number, 0, 3) . ' ' . substr($number, 3, 3) . ' ' . substr($number, 6);
            }
        }

        return $number;
    }

    /**
     * Normalize phone number.
     */
    protected function normalizePhoneNumber(?string $number): string
    {
        if (empty($number)) {
            return '';
        }

        // Remove all non-numeric characters
        $cleaned = preg_replace('/[^0-9+]/', '', $number);

        // If it's already international format
        if (str_starts_with($cleaned, '+260')) {
            return $cleaned;
        }

        // If it's a local Zambian number
        if (str_starts_with($cleaned, '0')) {
            return '+260' . substr($cleaned, 1);
        }

        // If it's just digits, assume it's a local number
        if (strlen($cleaned) === 9) {
            return '+260' . $cleaned;
        }

        return $number;
    }

    /**
     * Verify this contact.
     */
    public function verify(): self
    {
        $this->update([
            'is_verified' => true,
            'verified_at' => now(),
        ]);
        return $this;
    }

    /**
     * Unverify this contact.
     */
    public function unverify(): self
    {
        $this->update([
            'is_verified' => false,
            'verified_at' => null,
        ]);
        return $this;
    }

    /**
     * Mark this contact as primary.
     */
    public function markAsPrimary(): self
    {
        // Remove primary status from all other telecoms for this patient
        $this->patient->telecoms()->update(['is_primary' => false]);

        $this->update(['is_primary' => true]);
        return $this;
    }

    /**
     * Check if this contact is verified.
     */
    public function isVerified(): bool
    {
        return $this->is_verified === true;
    }

    /**
     * Check if this contact is primary.
     */
    public function isPrimary(): bool
    {
        return $this->is_primary === true;
    }

    /**
     * Check if this is a phone contact.
     */
    public function isPhone(): bool
    {
        return in_array($this->system, ['phone', 'mobile', 'whatsapp']);
    }

    /**
     * Check if this is an email contact.
     */
    public function isEmail(): bool
    {
        return $this->system === 'email';
    }

    /**
     * Get the contact as an array for API responses.
     */
    public function toApiArray(): array
    {
        return [
            'id' => $this->id,
            'system' => $this->system,
            'system_label' => $this->system_label,
            'value' => $this->value,
            'formatted_value' => $this->formatted_value,
            'use' => $this->use,
            'use_label' => $this->use_label,
            'rank' => $this->rank,
            'rank_label' => $this->rank_label,
            'is_primary' => $this->is_primary,
            'is_verified' => $this->is_verified,
            'status_label' => $this->status_label,
            'verified_at' => $this->verified_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    /**
     * Get the contact as a JSON object for FHIR compatibility.
     */
    public function toFhirArray(): array
    {
        return [
            'system' => $this->system,
            'value' => $this->value,
            'use' => $this->use,
            'rank' => $this->rank,
        ];
    }

    /**
     * Create from FHIR data.
     */
    public static function createFromFhir(array $data, int $patientId, bool $isPrimary = false, int $rank = 1): self
    {
        return self::create([
            'patient_id' => $patientId,
            'system' => $data['system'] ?? 'mobile',
            'value' => $data['value'] ?? '',
            'use' => $data['use'] ?? 'mobile',
            'rank' => $rank,
            'is_primary' => $isPrimary,
            'is_verified' => false,
        ]);
    }

    /**
     * Get validation rules for telecom fields.
     */
    public static function getValidationRules(): array
    {
        return [
            'telecom' => 'nullable|array',
            'telecom.*.system' => 'required|in:phone,mobile,email,whatsapp',
            'telecom.*.value' => 'required|string|max:255',
            'telecom.*.use' => 'required|in:home,work,mobile,emergency,temporary',
            'telecom.*.rank' => 'nullable|integer|min:1',
        ];
    }

    /**
     * Get the primary contact for a patient.
     */
    public static function getPrimaryForPatient(int $patientId): ?self
    {
        return self::where('patient_id', $patientId)
            ->where('is_primary', true)
            ->first();
    }

    /**
     * Get all verified contacts for a patient.
     */
    public static function getVerifiedForPatient(int $patientId): array
    {
        return self::where('patient_id', $patientId)
            ->where('is_verified', true)
            ->ordered()
            ->get()
            ->toArray();
    }

    /**
     * Check if a contact value already exists for a patient.
     */
    public static function existsForPatient(int $patientId, string $value, ?string $system = null): bool
    {
        $query = self::where('patient_id', $patientId)
            ->where('value', $value);

        if ($system) {
            $query->where('system', $system);
        }

        return $query->exists();
    }

    /**
     * Get contacts grouped by system.
     */
    public static function getGroupedForPatient(int $patientId): array
    {
        $contacts = self::where('patient_id', $patientId)
            ->ordered()
            ->get();

        $grouped = [];
        foreach ($contacts as $contact) {
            if (!isset($grouped[$contact->system])) {
                $grouped[$contact->system] = [];
            }
            $grouped[$contact->system][] = $contact->toApiArray();
        }

        return $grouped;
    }

    /**
     * Sync telecoms for a patient.
     */
    public static function syncForPatient(int $patientId, array $telecoms): void
    {
        // Delete existing telecoms
        self::where('patient_id', $patientId)->delete();

        // Create new telecoms
        foreach ($telecoms as $index => $telecom) {
            $telecom['patient_id'] = $patientId;
            $telecom['rank'] = $telecom['rank'] ?? ($index + 1);
            $telecom['is_primary'] = $telecom['is_primary'] ?? ($index === 0);
            $telecom['is_verified'] = $telecom['is_verified'] ?? false;

            self::create($telecom);
        }
    }

    /**
     * Get the contact as a simple string for display.
     */
    public function getDisplayString(): string
    {
        $parts = [
            $this->system_label,
            $this->formatted_value,
            $this->use_label,
        ];

        if ($this->is_primary) {
            $parts[] = '★';
        }

        return implode(' · ', array_filter($parts));
    }

    /**
     * Get the contact as HTML for display.
     */
    public function toHtml(): string
    {
        $parts = [];

        if ($this->is_primary) {
            $parts[] = '<span class="text-yellow-500" title="Primary">★</span>';
        }

        $parts[] = '<span class="font-medium">' . e($this->system_label) . ':</span>';
        $parts[] = '<span>' . e($this->formatted_value) . '</span>';

        if ($this->is_verified) {
            $parts[] = '<span class="text-green-600 text-xs">✓</span>';
        }

        return implode(' ', $parts);
    }

    /**
     * Get the best display label for the contact.
     */
    public function getBestLabel(): string
    {
        if ($this->system === 'email') {
            return $this->value;
        }
        return $this->formatted_value;
    }
}

<?php

namespace App\Models\Patients;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientRiskFactor extends Model
{
    use HasFactory;

    protected $table = 'patient_risk_factors';

    protected $fillable = [
        'patient_id',
        // Reproductive
        'number_of_pregnancies',
        'number_of_deliveries',
        'long_term_contraceptive_use',
        'contraceptive_use_years',
        'contraceptive_type',

        // HIV/ART
        'hiv_status',
        'hiv_diagnosis_date',
        'art_status',
        'art_start_date',
        'viral_load_status',
        'viral_load_date',
        'viral_load_value',
        'hpv_status',
        'hpv_type',
        'hpv_test_date',

        // Lifestyle
        'smoking_status',
        'smoking_years',
        'smoking_packs_per_day',
        'alcohol_use',
        'alcohol_type',
        'alcohol_units_per_week',
        'family_history_of_cancer',
        'family_cancer_type',
        'family_relationship',

        // Previous History
        'previous_via_positive',
        'via_positive_date',
        'previous_hpv_positive',
        'hpv_positive_date',
        'previous_cin_diagnosis',
        'cin_grade',
        'cin_diagnosis_date',
        'previous_cervical_cancer',
        'cancer_stage',
        'cancer_diagnosis_date',
        'cancer_treatment',

        // Other
        'immunosuppression',
        'immunosuppression_cause',
        'long_term_contraceptive',
        'other_risk_factors',
        'additional_risk_data',

        // Assessment
        'assessment_date',
        'assessed_by',
        'clinical_notes',

        // Scores
        'risk_score',
        'risk_level',
    ];

    protected $casts = [
        'additional_risk_data' => 'array',
        'number_of_pregnancies' => 'integer',
        'number_of_deliveries' => 'integer',
        'contraceptive_use_years' => 'integer',
        'smoking_years' => 'integer',
        'smoking_packs_per_day' => 'integer',
        'alcohol_units_per_week' => 'integer',
        'viral_load_value' => 'integer',
        'risk_score' => 'integer',
        'hiv_diagnosis_date' => 'date',
        'art_start_date' => 'date',
        'viral_load_date' => 'date',
        'hpv_test_date' => 'date',
        'via_positive_date' => 'date',
        'hpv_positive_date' => 'date',
        'cin_diagnosis_date' => 'date',
        'cancer_diagnosis_date' => 'date',
        'assessment_date' => 'date',
    ];

    protected $appends = [
        'hiv_status_label',
        'hpv_status_label',
        'risk_level_badge',
    ];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function assessedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assessed_by');
    }

    // ============================================
    // ACCESSORS
    // ============================================

    public function getHivStatusLabelAttribute(): string
    {
        $labels = [
            'positive' => 'Positive',
            'negative' => 'Negative',
            'unknown' => 'Unknown',
        ];
        return $labels[$this->hiv_status ?? ''] ?? 'Not Assessed';
    }

    public function getHpvStatusLabelAttribute(): string
    {
        $labels = [
            'positive' => 'Positive',
            'negative' => 'Negative',
            'unknown' => 'Unknown',
        ];
        return $labels[$this->hpv_status ?? ''] ?? 'Not Assessed';
    }

    public function getRiskLevelBadgeAttribute(): string
    {
        $badges = [
            'low' => 'bg-green-100 text-green-800',
            'moderate' => 'bg-yellow-100 text-yellow-800',
            'high' => 'bg-orange-100 text-orange-800',
            'very_high' => 'bg-red-100 text-red-800',
        ];
        return $badges[$this->risk_level ?? ''] ?? 'bg-gray-100 text-gray-800';
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /**
     * Calculate risk flags based on risk assessment data
     */
    public function getRiskFlags(): array
    {
        $flags = [];

        if ($this->hiv_status === 'positive') $flags[] = 'HIV Positive';
        if ($this->hpv_status === 'positive') $flags[] = 'HPV Positive';
        if (in_array($this->smoking_status, ['current', 'former'])) $flags[] = 'Smoker';
        if (in_array($this->alcohol_use, ['current', 'former'])) $flags[] = 'Alcohol Use';
        if ($this->family_history_of_cancer === 'yes') $flags[] = 'Family History of Cancer';
        if ($this->previous_via_positive === 'yes') $flags[] = 'Previous VIA Positive';
        if ($this->previous_hpv_positive === 'yes') $flags[] = 'Previous HPV Positive';
        if ($this->previous_cin_diagnosis === 'yes') $flags[] = 'Previous CIN Diagnosis';
        if ($this->previous_cervical_cancer === 'yes') $flags[] = 'Previous Cervical Cancer';
        if ($this->immunosuppression === 'yes') $flags[] = 'Immunosuppression';
        if ($this->long_term_contraceptive === 'yes') $flags[] = 'Long-Term Contraceptive Use';

        return $flags;
    }

    /**
     * Calculate risk score
     */
    public function calculateRiskScore(): int
    {
        $score = 0;

        // HIV status
        if ($this->hiv_status === 'positive') $score += 10;
        if ($this->hiv_status === 'unknown') $score += 2;

        // HPV status
        if ($this->hpv_status === 'positive') $score += 15;
        if ($this->hpv_status === 'unknown') $score += 3;

        // Smoking
        if ($this->smoking_status === 'current') $score += 8;
        if ($this->smoking_status === 'former') $score += 4;

        // Alcohol
        if ($this->alcohol_use === 'current') $score += 5;
        if ($this->alcohol_use === 'former') $score += 2;

        // Family history
        if ($this->family_history_of_cancer === 'yes') $score += 10;

        // Previous history
        if ($this->previous_via_positive === 'yes') $score += 8;
        if ($this->previous_hpv_positive === 'yes') $score += 8;
        if ($this->previous_cin_diagnosis === 'yes') $score += 12;
        if ($this->previous_cervical_cancer === 'yes') $score += 20;

        // Other factors
        if ($this->immunosuppression === 'yes') $score += 8;
        if ($this->long_term_contraceptive === 'yes') $score += 5;

        return $score;
    }

    /**
     * Determine risk level based on score
     */
    public function determineRiskLevel(int $score): string
    {
        if ($score >= 30) return 'very_high';
        if ($score >= 20) return 'high';
        if ($score >= 10) return 'moderate';
        return 'low';
    }

    /**
     * Prepare data from form input
     */
    public static function prepareData(array $data): array
    {
        $risk = $data['riskAssessment'] ?? [];

        return [
            'number_of_pregnancies' => $risk['numberOfPregnancies'] ?? 0,
            'number_of_deliveries' => $risk['numberOfDeliveries'] ?? 0,
            'long_term_contraceptive_use' => $risk['longTermContraceptiveUse'] ?? null,

            'hiv_status' => $risk['hivStatus'] ?? null,
            'art_status' => $risk['artStatus'] ?? null,
            'viral_load_status' => $risk['viralLoadStatus'] ?? null,
            'hpv_status' => $risk['hpvStatus'] ?? null,

            'smoking_status' => $risk['smokingHistory'] === 'yes' ? 'current' : ($risk['smokingHistory'] === 'no' ? 'never' : null),
            'alcohol_use' => $risk['alcoholUse'] === 'yes' ? 'current' : ($risk['alcoholUse'] === 'no' ? 'never' : null),
            'family_history_of_cancer' => $risk['familyHistoryOfCancer'] ?? null,

            'previous_via_positive' => $risk['previousVIAPositive'] ?? null,
            'previous_hpv_positive' => $risk['previousHPVPositive'] ?? null,
            'previous_cin_diagnosis' => $risk['previousCINDiagnosis'] ?? null,
            'previous_cervical_cancer' => $risk['previousCervicalCancer'] ?? null,

            'immunosuppression' => $risk['immunosuppression'] ?? null,
            'long_term_contraceptive' => $risk['longTermContraceptive'] ?? null,

            'assessment_date' => now(),
        ];
    }

    /**
     * Get risk summary for patient
     */
    public function getRiskSummary(): array
    {
        return [
            'risk_score' => $this->risk_score ?? $this->calculateRiskScore(),
            'risk_level' => $this->risk_level ?? $this->determineRiskLevel($this->risk_score ?? $this->calculateRiskScore()),
            'risk_flags' => $this->getRiskFlags(),
            'has_risks' => count($this->getRiskFlags()) > 0,
            'hiv_positive' => $this->hiv_status === 'positive',
            'hpv_positive' => $this->hpv_status === 'positive',
        ];
    }
}

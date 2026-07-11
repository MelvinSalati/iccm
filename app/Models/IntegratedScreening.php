<?php

namespace App\Models;

use App\Models\Patients\Patient;
use App\Models\Visit;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class IntegratedScreening extends Model
{
    use SoftDeletes;

    protected  $table = 'v2_integrated_screenings';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'patient_uuid',
        'visit_uuid',
        'patient_id',
        'visit_id',
        'created_by',
        'screening_date',
        'screening_method',
        'screening_result',
        'treatment_decision',
        'is_positive',
        'is_mental_health_flagged',
        'follow_up_date',
        'status',
        'metrics',
        'full_data',
        'submitted_at',
    ];


    protected $casts = [
        'metrics' => 'array',    // ✅ This handles JSON encoding/decoding
        'full_data' => 'array',  // ✅ This handles JSON encoding/decoding
        'is_positive' => 'boolean',
        'is_mental_health_flagged' => 'boolean',
        'screening_date' => 'date',
        'follow_up_date' => 'date',
        'submitted_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Relationships
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    // Accessors
    public function getDistressThermometerAttribute()
    {
        return $this->metrics['distress_thermometer'] ?? null;
    }

    public function getAnxietyGad7ScoreAttribute()
    {
        return $this->metrics['anxiety_gad7_score'] ?? null;
    }

    public function getDepressionPhq9ScoreAttribute()
    {
        return $this->metrics['depression_phq9_score'] ?? null;
    }

    public function getCervicalImageUrlAttribute()
    {
        return $this->metrics['cervical_image_url'] ?? null;
    }

    public function getMentalHealthServicesAttribute()
    {
        return $this->metrics['mental_health_services'] ?? [];
    }

    // Scopes
    public function scopePositive($query)
    {
        return $query->where('is_positive', true);
    }

    public function scopeMentalHealthFlagged($query)
    {
        return $query->where('is_mental_health_flagged', true);
    }

    public function scopeByPatient($query, $patientId)
    {
        return $query->where('patient_id', $patientId);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('screening_date', [$startDate, $endDate]);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}

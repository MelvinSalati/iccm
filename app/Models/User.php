<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'email',
        'password',
        'username',
        'phone',
        'alternative_phone',
        'gender',
        'date_of_birth',
        'address',
        'designation',
        'cadre',
        'professional_registration_no',
        'department',
        'province_id',
        'district_id',
        'facility_id',
        'employee_number',
        'employment_date',
        'is_active',
        'is_verified',
        'role_id',
        'profile_photo',
        'settings',
        'metadata',
        'remember_token',
        'email_verified_at',
        'last_login_at',
        'last_login_ip',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_of_birth' => 'date',
        'employment_date' => 'date',
        'last_login_at' => 'datetime',
        'is_active' => 'boolean',
        'is_verified' => 'boolean',
        'settings' => 'array',
        'metadata' => 'array',
    ];

    // Relationships
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}

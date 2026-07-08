<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',

        'first_name',
        'last_name',
        'employee_number',

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

        'employment_date',

        'is_active',
        'is_verified',

        'profile_photo',

        'settings',
        'metadata',
    ];
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',

           'date_of_birth' => 'date',
           'employment_date' => 'date',

           'is_active' => 'boolean',
           'is_verified' => 'boolean',

           'last_login_at' => 'datetime',

           'settings' => 'array',
           'metadata' => 'array',
       ];
    }
}

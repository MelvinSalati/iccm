<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Province;
use App\Models\District;
use App\Models\Facility;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Fortify\Rules\Password;

class CreateNewUser implements CreatesNewUsers
{
    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        // Log the incoming data for debugging
        Log::info('Registration data received:', $input);

        // Validate the input
        $validator = Validator::make($input, [
            // Personal Information - Required
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone_number' => ['required', 'string', 'max:20'],
            'username' => ['required', 'string', 'min:3', 'max:255', 'unique:users'],

            // Optional fields
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', 'in:Male,Female,Other,Prefer not to say'],
            'nrc' => ['nullable', 'string', 'max:50'],

            // Professional Information
            'role_id' => ['nullable', 'exists:roles,id'],
            'employee_id' => ['nullable', 'string', 'max:50'],
            'job_title' => ['nullable', 'string', 'max:255'],

            // Location
            'province_code' => ['nullable', 'string'],
            'district_code' => ['nullable', 'string'],
            'facility_code' => ['nullable', 'string'],

            // Security
            'password' => ['required', 'string', new Password, 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
            'terms' => ['accepted'],
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed:', $validator->errors()->toArray());
            throw new \Illuminate\Validation\ValidationException($validator);
        }

        // Get location IDs
        $provinceId = $this->getProvinceId($input['province_code'] ?? null);
        $districtId = $this->getDistrictId($input['district_code'] ?? null);
        $facilityId = $this->getFacilityId($input['facility_code'] ?? null);

        // Prepare user data
        $userData = [
            // Personal Information
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'name' => $input['first_name'] . ' ' . $input['last_name'],
            'email' => $input['email'],
            'phone' => $input['phone_number'],
            'username' => $input['username'],
            'password' => Hash::make($input['password']),

            // Optional personal fields
            'date_of_birth' => $input['date_of_birth'] ?? null,
            'gender' => $input['gender'] ?? null,

            // Professional fields
            'role_id' => $input['role_id'] ?? null,
            'employee_number' => $input['employee_id'] ?? null,
            'designation' => $input['job_title'] ?? null,

            // Location fields
            'province_id' => $provinceId,
            'district_id' => $districtId,
            'facility_id' => $facilityId,

            // Status
            'is_active' => true,
            'is_verified' => false,

            // Metadata (store extra fields)
            'metadata' => json_encode([
                'nrc' => $input['nrc'] ?? null,
                'registration_ip' => request()->ip() ?? null,
                'registered_at' => now()->toDateTimeString(),
                'user_agent' => request()->userAgent() ?? null,
            ]),
        ];

        // Log what we're about to create
        Log::info('Creating user with data:', $userData);

        try {
            $user = User::create($userData);
            Log::info('User created successfully with ID: ' . $user->id);
            return $user;
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            throw $e;
        }
    }

    /**
     * Get province ID from code.
     */
    protected function getProvinceId(?string $code): ?int
    {
        if (empty($code)) {
            return null;
        }

        try {
            $province = Province::where('code', $code)->first();
            return $province?->id;
        } catch (\Exception $e) {
            Log::error('Error fetching province: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get district ID from code.
     */
    protected function getDistrictId(?string $code): ?int
    {
        if (empty($code)) {
            return null;
        }

        try {
            $district = District::where('code', $code)->first();
            return $district?->id;
        } catch (\Exception $e) {
            Log::error('Error fetching district: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get facility ID from code.
     */
    protected function getFacilityId(?string $code): ?int
    {
        if (empty($code)) {
            return null;
        }

        try {
            $facility = Facility::where('code', $code)->first();
            return $facility?->id;
        } catch (\Exception $e) {
            Log::error('Error fetching facility: ' . $e->getMessage());
            return null;
        }
    }
}

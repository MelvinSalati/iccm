<?php

namespace Database\Seeders;

use App\Models\Patients\Patient;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Patient::insert([
            [
                'facility_id' => 1,
                'user_id' => 1,
                'patient_uuid' => (string) Str::uuid(),
                'first_name' => 'Mary',
                'last_name' => 'Banda',
                'date_of_birth' => '1987-04-12',
                'gender' => 'female', // Correct enum value
                'marital_status' => 'married', // Changed from 'Married' to 'married'
                'nrc_number' => '123456/10/1',
                'phone_number' => '0977000001',
                'is_active' => true,
                'registered_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'facility_id' => 1,
                'user_id' => 1,
                'patient_uuid' => (string) Str::uuid(),
                'first_name' => 'Agnes',
                'last_name' => 'Phiri',
                'date_of_birth' => '1991-09-21',
                'gender' => 'female', // Correct enum value
                'marital_status' => 'single', // Changed from 'Single' to 'single'
                'nrc_number' => '223456/10/1',
                'phone_number' => '0977000002',
                'is_active' => true,
                'registered_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'facility_id' => 1,
                'user_id' => 1,
                'patient_uuid' => (string) Str::uuid(),
                'first_name' => 'John',
                'last_name' => 'Zulu',
                'date_of_birth' => '1983-02-15',
                'gender' => 'male', // FIXED: Changed from 'female' to 'male'
                'marital_status' => 'married', // Changed from 'Married' to 'married'
                'nrc_number' => '323456/10/1',
                'phone_number' => '0977000003',
                'is_active' => true,
                'registered_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'facility_id' => 1,
                'user_id' => 1,
                'patient_uuid' => (string) Str::uuid(),
                'first_name' => 'Ruth',
                'last_name' => 'Tembo',
                'date_of_birth' => '1995-12-08',
                'gender' => 'female', // Correct enum value
                'marital_status' => 'divorced', // Changed from 'Divorced' to 'divorced'
                'nrc_number' => '423456/10/1',
                'phone_number' => '0977000004',
                'is_active' => true,
                'registered_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'facility_id' => 1,
                'user_id' => 1,
                'patient_uuid' => (string) Str::uuid(),
                'first_name' => 'Peter',
                'last_name' => 'Mbewe',
                'date_of_birth' => '1979-06-30',
                'gender' => 'male', // FIXED: Changed from 'female' to 'male'
                'marital_status' => 'widowed', // Changed from 'Widowed' to 'widowed'
                'nrc_number' => '523456/10/1',
                'phone_number' => '0977000005',
                'is_active' => true,
                'registered_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

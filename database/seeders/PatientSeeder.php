<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('patients')->truncate();
        Schema::enableForeignKeyConstraints();

        $patients = [
            [
                'unique_id' => 'PAT-2026-001',
                'nrc' => '123456/78/1',
                'first_name' => 'Martha',
                'last_name' => 'Banda',
                'date_of_birth' => '1985-03-15',
                'age' => 41,
                'sex' => 'Female',
                'phone_number' => '+260977123001',
                'village' => 'Kanakantapa',
                'ward' => 'Chipata Central',
                'chiefdom' => 'Mpezeni',
                'district_id' => 1,
                'facility_id' => 1,
                'province_id' => 1,
                'hiv_status' => false,
                'smoking_status' => false,
                'alcohol_use' => false,
                'family_history_cancer' => false,
                'diabetes_status' => false,
                'hypertension_status' => true,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now(),
            ],
            [
                'unique_id' => 'PAT-2026-002',
                'nrc' => '123457/78/1',
                'first_name' => 'Grace',
                'last_name' => 'Chilufya',
                'date_of_birth' => '1990-07-22',
                'age' => 36,
                'sex' => 'Female',
                'phone_number' => '+260977123002',
                'village' => 'Chiwoko',
                'ward' => 'Chief Ndake',
                'chiefdom' => 'Ndake',
                'district_id' => 1,
                'facility_id' => 1,
                'province_id' => 1,
                'hiv_status' => true,
                'smoking_status' => false,
                'alcohol_use' => false,
                'family_history_cancer' => false,
                'diabetes_status' => false,
                'hypertension_status' => false,
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now(),
            ],
            [
                'unique_id' => 'PAT-2026-003',
                'nrc' => '123458/78/1',
                'first_name' => 'Peter',
                'last_name' => 'Mwanza',
                'date_of_birth' => '1978-11-10',
                'age' => 48,
                'sex' => 'Male',
                'phone_number' => '+260977123003',
                'village' => 'Mtiliza',
                'ward' => 'Chipata Central',
                'chiefdom' => 'Mpezeni',
                'district_id' => 1,
                'facility_id' => 1,
                'province_id' => 1,
                'hiv_status' => false,
                'smoking_status' => true,
                'alcohol_use' => true,
                'family_history_cancer' => true,
                'diabetes_status' => true,
                'hypertension_status' => true,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now(),
            ],
            // Add 50+ more patients using factory or manual data
        ];

        // Generate additional patients using loop
        for ($i = 4; $i <= 50; $i++) {
            $patients[] = [
                'unique_id' => 'PAT-2026-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'nrc' => '12' . rand(3459, 9999) . '/78/1',
                'first_name' => $this->generateFirstName(),
                'last_name' => $this->generateLastName(),
                'date_of_birth' => Carbon::now()->subYears(rand(20, 65))->format('Y-m-d'),
                'age' => rand(20, 65),
                'sex' => rand(0, 1) ? 'Female' : 'Male',
                'phone_number' => '+260977' . rand(100000, 999999),
                'village' => $this->generateVillage(),
                'ward' => 'Chipata Central',
                'chiefdom' => 'Mpezeni',
                'district_id' => 1,
                'facility_id' => 1,
                'province_id' => 1,
                'hiv_status' => (bool)rand(0, 3) ? false : true,
                'smoking_status' => (bool)rand(0, 4) ? false : true,
                'alcohol_use' => (bool)rand(0, 3) ? false : true,
                'family_history_cancer' => (bool)rand(0, 5) ? false : true,
                'diabetes_status' => (bool)rand(0, 4) ? false : true,
                'hypertension_status' => (bool)rand(0, 3) ? false : true,
                'created_at' => Carbon::now()->subDays(rand(1, 60)),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('patients')->insert($patients);
        $this->command->info('Patients seeded successfully!');
    }

    private function generateFirstName(): string
    {
        $names = ['Alice', 'John', 'Mary', 'James', 'Emily', 'David', 'Sarah', 'Joseph', 'Elizabeth', 'Michael', 'Margaret', 'Charles', 'Rose', 'Francis', 'Agnes', 'George', 'Veronica', 'Patrick', 'Catherine', 'Jonathan'];
        return $names[array_rand($names)];
    }

    private function generateLastName(): string
    {
        $names = ['Banda', 'Mwanza', 'Chilufya', 'Phiri', 'Kabwe', 'Tembo', 'Mwamba', 'Zulu', 'Mulenga', 'Lungu', 'Daka', 'Chanda', 'Mwansa', 'Nkole', 'Chama', 'Kasonde', 'Mumba', 'Matthews', 'Chikwanda', 'Mwape'];
        return $names[array_rand($names)];
    }

    private function generateVillage(): string
    {
        $villages = ['Kanakantapa', 'Chiwoko', 'Mtiliza', 'Chibale', 'Kakoma', 'Luangwa', 'Nyimba', 'Msoro', 'Mateyo', 'Chamuka'];
        return $villages[array_rand($villages)];
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            PatientSeeder::class,
            ScreeningSeeder::class,
            TreatmentSeeder::class,
            ReferralSeeder::class,
            OutreachActivitySeeder::class,
            MentalHealthAssessmentSeeder::class,
            NCDAssessmentSeeder::class,
            AdmissionSeeder::class,
            DischargeSeeder::class,
            MortalityReviewSeeder::class,
            AppointmentSeeder::class,
            ProvinceSeeder::class,
            DistrictSeeder::class,
            FacilitySeeder::class,
            // AuditLogSeeder::class,
            // PatientVisitSeeder::class,
        ]);
    }
}

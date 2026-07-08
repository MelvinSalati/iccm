<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Clear table before seeding
        Schema::disableForeignKeyConstraints();
        DB::table('roles')->truncate();
        Schema::enableForeignKeyConstraints();

        $roles = [
            [
                'role_name' => 'CHW',
                'description' => 'Community Health Worker - Community screening, referral, follow-up',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Nurse',
                'description' => 'Nurse/Midwife - Screening, treatment, admissions',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Clinician',
                'description' => 'Clinical Officer/Medical Officer - Full clinical records',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Counsellor',
                'description' => 'Psychosocial Counsellor - Psychosocial module',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Ward Clerk',
                'description' => 'Ward Clerk - Admissions/Discharges',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Facility Manager',
                'description' => 'Facility In-Charge - Facility dashboard',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'DHO',
                'description' => 'District Health Office Staff - District dashboard',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'MEL Officer',
                'description' => 'MEL Officer - Reporting and analytics',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'Administrator',
                'description' => 'Full system management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('roles')->insert($roles);
        $this->command->info('Roles seeded successfully!');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->truncate();
        Schema::enableForeignKeyConstraints();

        $permissions = [
            // Patient Management
            ['permission_name' => 'view_patients', 'description' => 'View patient records'],
            ['permission_name' => 'create_patients', 'description' => 'Create patient records'],
            ['permission_name' => 'edit_patients', 'description' => 'Edit patient records'],
            ['permission_name' => 'delete_patients', 'description' => 'Delete patient records'],

            // Screening Management
            ['permission_name' => 'view_screenings', 'description' => 'View screening records'],
            ['permission_name' => 'create_screenings', 'description' => 'Create screening records'],
            ['permission_name' => 'edit_screenings', 'description' => 'Edit screening records'],
            ['permission_name' => 'delete_screenings', 'description' => 'Delete screening records'],

            // Treatment Management
            ['permission_name' => 'view_treatments', 'description' => 'View treatment records'],
            ['permission_name' => 'create_treatments', 'description' => 'Create treatment records'],
            ['permission_name' => 'edit_treatments', 'description' => 'Edit treatment records'],
            ['permission_name' => 'delete_treatments', 'description' => 'Delete treatment records'],

            // Referral Management
            ['permission_name' => 'view_referrals', 'description' => 'View referral records'],
            ['permission_name' => 'create_referrals', 'description' => 'Create referral records'],
            ['permission_name' => 'edit_referrals', 'description' => 'Edit referral records'],
            ['permission_name' => 'delete_referrals', 'description' => 'Delete referral records'],

            // Admission Management
            ['permission_name' => 'view_admissions', 'description' => 'View admission records'],
            ['permission_name' => 'create_admissions', 'description' => 'Create admission records'],
            ['permission_name' => 'edit_admissions', 'description' => 'Edit admission records'],
            ['permission_name' => 'delete_admissions', 'description' => 'Delete admission records'],

            // Discharge Management
            ['permission_name' => 'view_discharges', 'description' => 'View discharge records'],
            ['permission_name' => 'create_discharges', 'description' => 'Create discharge records'],
            ['permission_name' => 'edit_discharges', 'description' => 'Edit discharge records'],
            ['permission_name' => 'delete_discharges', 'description' => 'Delete discharge records'],

            // Mortality Management
            ['permission_name' => 'view_mortality', 'description' => 'View mortality records'],
            ['permission_name' => 'create_mortality', 'description' => 'Create mortality records'],
            ['permission_name' => 'edit_mortality', 'description' => 'Edit mortality records'],
            ['permission_name' => 'delete_mortality', 'description' => 'Delete mortality records'],

            // NCD Management
            ['permission_name' => 'view_ncd', 'description' => 'View NCD assessment records'],
            ['permission_name' => 'create_ncd', 'description' => 'Create NCD assessment records'],
            ['permission_name' => 'edit_ncd', 'description' => 'Edit NCD assessment records'],
            ['permission_name' => 'delete_ncd', 'description' => 'Delete NCD assessment records'],

            // Mental Health Management
            ['permission_name' => 'view_mental_health', 'description' => 'View mental health records'],
            ['permission_name' => 'create_mental_health', 'description' => 'Create mental health records'],
            ['permission_name' => 'edit_mental_health', 'description' => 'Edit mental health records'],
            ['permission_name' => 'delete_mental_health', 'description' => 'Delete mental health records'],

            // Outreach Management
            ['permission_name' => 'view_outreach', 'description' => 'View outreach activities'],
            ['permission_name' => 'create_outreach', 'description' => 'Create outreach activities'],
            ['permission_name' => 'edit_outreach', 'description' => 'Edit outreach activities'],
            ['permission_name' => 'delete_outreach', 'description' => 'Delete outreach activities'],

            // Appointment Management
            ['permission_name' => 'view_appointments', 'description' => 'View appointments'],
            ['permission_name' => 'create_appointments', 'description' => 'Create appointments'],
            ['permission_name' => 'edit_appointments', 'description' => 'Edit appointments'],
            ['permission_name' => 'delete_appointments', 'description' => 'Delete appointments'],

            // Dashboard & Reports
            ['permission_name' => 'view_dashboard', 'description' => 'View dashboards'],
            ['permission_name' => 'generate_reports', 'description' => 'Generate reports'],
            ['permission_name' => 'view_analytics', 'description' => 'View analytics data'],

            // System Management
            ['permission_name' => 'manage_users', 'description' => 'Manage system users'],
            ['permission_name' => 'manage_roles', 'description' => 'Manage roles and permissions'],
            ['permission_name' => 'view_audit_logs', 'description' => 'View audit logs'],
            ['permission_name' => 'manage_system', 'description' => 'Manage system settings'],

            // Mobile Features
            ['permission_name' => 'offline_access', 'description' => 'Access offline data capture'],
            ['permission_name' => 'sync_data', 'description' => 'Synchronize data with server'],
        ];

        DB::table('permissions')->insert($permissions);
        $this->command->info('Permissions seeded successfully!');
    }
}

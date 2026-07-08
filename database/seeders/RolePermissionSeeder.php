<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('role_permissions')->truncate();
        Schema::enableForeignKeyConstraints();

        // Get all roles
        $roles = DB::table('roles')->get();
        $permissions = DB::table('permissions')->get();

        // Define role permissions mapping
        $rolePermissions = [];

        // Administrator - All permissions
        $adminRole = $roles->where('role_name', 'Administrator')->first();
        if ($adminRole) {
            foreach ($permissions as $permission) {
                $rolePermissions[] = [
                    'role_id' => $adminRole->id,
                    'permission_id' => $permission->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // CHW - Limited permissions
        $chwRole = $roles->where('role_name', 'CHW')->first();
        if ($chwRole) {
            $chwPermissions = [
                'view_patients',
                'create_patients',
                'edit_patients',
                'view_screenings',
                'create_screenings',
                'view_referrals',
                'create_referrals',
                'view_outreach',
                'create_outreach',
                'view_appointments',
                'create_appointments',
                'offline_access',
                'sync_data'
            ];
            foreach ($chwPermissions as $permName) {
                $perm = $permissions->where('permission_name', $permName)->first();
                if ($perm) {
                    $rolePermissions[] = [
                        'role_id' => $chwRole->id,
                        'permission_id' => $perm->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Nurse - Extended permissions
        $nurseRole = $roles->where('role_name', 'Nurse')->first();
        if ($nurseRole) {
            $nursePermissions = [
                'view_patients', 'create_patients', 'edit_patients',
                'view_screenings', 'create_screenings', 'edit_screenings',
                'view_treatments', 'create_treatments',
                'view_referrals', 'create_referrals',
                'view_admissions', 'create_admissions', 'edit_admissions',
                'view_discharges', 'create_discharges',
                'view_appointments', 'create_appointments', 'edit_appointments',
                'view_ncd', 'create_ncd', 'edit_ncd',
                'view_mental_health', 'create_mental_health',
                'view_dashboard',
                'offline_access', 'sync_data'
            ];
            foreach ($nursePermissions as $permName) {
                $perm = $permissions->where('permission_name', $permName)->first();
                if ($perm) {
                    $rolePermissions[] = [
                        'role_id' => $nurseRole->id,
                        'permission_id' => $perm->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Clinician - Full clinical access
        $clinicianRole = $roles->where('role_name', 'Clinician')->first();
        if ($clinicianRole) {
            $clinicianPermissions = [
                'view_patients', 'create_patients', 'edit_patients',
                'view_screenings', 'create_screenings', 'edit_screenings',
                'view_treatments', 'create_treatments', 'edit_treatments',
                'view_referrals', 'create_referrals', 'edit_referrals',
                'view_admissions', 'create_admissions', 'edit_admissions',
                'view_discharges', 'create_discharges', 'edit_discharges',
                'view_mortality', 'create_mortality', 'edit_mortality',
                'view_appointments', 'create_appointments', 'edit_appointments',
                'view_ncd', 'create_ncd', 'edit_ncd',
                'view_mental_health', 'create_mental_health', 'edit_mental_health',
                'view_dashboard', 'view_analytics',
                'offline_access', 'sync_data'
            ];
            foreach ($clinicianPermissions as $permName) {
                $perm = $permissions->where('permission_name', $permName)->first();
                if ($perm) {
                    $rolePermissions[] = [
                        'role_id' => $clinicianRole->id,
                        'permission_id' => $perm->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // DHO - District level access
        $dhoRole = $roles->where('role_name', 'DHO')->first();
        if ($dhoRole) {
            $dhoPermissions = [
                'view_patients', 'view_screenings', 'view_treatments',
                'view_referrals', 'view_admissions', 'view_discharges',
                'view_mortality', 'view_appointments', 'view_ncd',
                'view_mental_health', 'view_outreach',
                'view_dashboard', 'view_analytics', 'generate_reports',
                'view_audit_logs'
            ];
            foreach ($dhoPermissions as $permName) {
                $perm = $permissions->where('permission_name', $permName)->first();
                if ($perm) {
                    $rolePermissions[] = [
                        'role_id' => $dhoRole->id,
                        'permission_id' => $perm->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // MEL Officer - Reporting focus
        $melRole = $roles->where('role_name', 'MEL Officer')->first();
        if ($melRole) {
            $melPermissions = [
                'view_patients', 'view_screenings', 'view_treatments',
                'view_referrals', 'view_admissions', 'view_discharges',
                'view_mortality', 'view_appointments', 'view_ncd',
                'view_mental_health', 'view_outreach',
                'view_dashboard', 'view_analytics', 'generate_reports',
                'view_audit_logs'
            ];
            foreach ($melPermissions as $permName) {
                $perm = $permissions->where('permission_name', $permName)->first();
                if ($perm) {
                    $rolePermissions[] = [
                        'role_id' => $melRole->id,
                        'permission_id' => $perm->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Bulk insert
        if (!empty($rolePermissions)) {
            DB::table('role_permissions')->insert($rolePermissions);
        }

        $this->command->info('Role permissions seeded successfully!');
    }
}

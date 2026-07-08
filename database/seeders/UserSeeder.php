<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Disable foreign key constraints to allow truncating the table
        Schema::disableForeignKeyConstraints();

        // Truncate the users table to remove all existing records
        DB::table('users')->truncate();

        // Re-enable foreign key constraints
        Schema::enableForeignKeyConstraints();

        // Get all provinces, districts, and facilities for reference
        $provinces = DB::table('provinces')->get()->keyBy('name');
        $districts = DB::table('districts')->get()->keyBy('name');
        $facilities = DB::table('facilities')->get()->keyBy('name');

        // Generate username from first_name.last_name
        $users = [
            // ============================================
            // 1. SYSTEM ADMINISTRATOR - Full Access
            // ============================================
            [
                'username' => 'system.administrator',
                'name' => 'System Administrator',
                'email' => 'admin@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Admin@123'),
                'first_name' => 'System',
                'last_name' => 'Administrator',
                'phone' => '+260977123456',
                'alternative_phone' => null,
                'gender' => 'male',
                'date_of_birth' => '1980-01-01',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'System Administrator',
                'cadre' => 'Administration',
                'professional_registration_no' => 'ADMIN-001',
                'department' => 'ICT Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2020-01-01',
                'role_id' => 9, // Administrator
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 2. MEL OFFICER - Monitoring & Evaluation
            // ============================================
            [
                'username' => 'melinda.officer',
                'name' => 'Melinda Officer',
                'email' => 'mel@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Mel@123'),
                'first_name' => 'Melinda',
                'last_name' => 'Officer',
                'phone' => '+260977123457',
                'alternative_phone' => null,
                'gender' => 'female',
                'date_of_birth' => '1985-05-15',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'MEL Officer',
                'cadre' => 'Monitoring and Evaluation',
                'professional_registration_no' => 'MEL-001',
                'department' => 'MEL Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2021-03-01',
                'role_id' => 8, // MEL Officer
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 3. DHO - District Health Office
            // ============================================
            [
                'username' => 'district.health',
                'name' => 'District Health Officer',
                'email' => 'dho@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Dho@123'),
                'first_name' => 'District',
                'last_name' => 'Health',
                'phone' => '+260977123458',
                'alternative_phone' => '+260977123459',
                'gender' => 'male',
                'date_of_birth' => '1978-08-20',
                'address' => 'District Health Office, Chipata, Eastern Province',
                'designation' => 'District Health Officer',
                'cadre' => 'Public Health',
                'professional_registration_no' => 'DHO-001',
                'department' => 'District Health Office',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2019-06-01',
                'role_id' => 7, // DHO
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 4. NURSE - Clinical Care
            // ============================================
            [
                'username' => 'jane.mwanza',
                'name' => 'Jane Mwanza',
                'email' => 'jane.nurse@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Nurse@123'),
                'first_name' => 'Jane',
                'last_name' => 'Mwanza',
                'phone' => '+260977123459',
                'alternative_phone' => null,
                'gender' => 'female',
                'date_of_birth' => '1990-03-10',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Senior Nursing Officer',
                'cadre' => 'Nursing',
                'professional_registration_no' => 'NUR-001',
                'department' => 'Nursing Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2020-07-15',
                'role_id' => 2, // Nurse
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 5. CHW - Community Health Worker
            // ============================================
            [
                'username' => 'peter.banda',
                'name' => 'Peter Banda',
                'email' => 'peter.chw@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Chw@123'),
                'first_name' => 'Peter',
                'last_name' => 'Banda',
                'phone' => '+260977123460',
                'alternative_phone' => null,
                'gender' => 'male',
                'date_of_birth' => '1992-11-25',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Community Health Worker',
                'cadre' => 'Community Health',
                'professional_registration_no' => 'CHW-001',
                'department' => 'Community Health Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2022-01-10',
                'role_id' => 1, // CHW
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 6. CLINICIAN - Medical Officer
            // ============================================
            [
                'username' => 'musonda.chilufya',
                'name' => 'Dr. Musonda Chilufya',
                'email' => 'dr.musonda@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Clin@123'),
                'first_name' => 'Musonda',
                'last_name' => 'Chilufya',
                'phone' => '+260977123461',
                'alternative_phone' => '+260977123462',
                'gender' => 'male',
                'date_of_birth' => '1982-07-05',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Medical Officer',
                'cadre' => 'Clinical Services',
                'professional_registration_no' => 'MED-001',
                'department' => 'Clinical Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2018-09-01',
                'role_id' => 3, // Clinician
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 7. COUNSELLOR - Mental Health
            // ============================================
            [
                'username' => 'grace.phiri',
                'name' => 'Grace Phiri',
                'email' => 'grace.counsellor@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Grace@123'),
                'first_name' => 'Grace',
                'last_name' => 'Phiri',
                'phone' => '+260977123462',
                'alternative_phone' => null,
                'gender' => 'female',
                'date_of_birth' => '1988-09-12',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Psychosocial Counsellor',
                'cadre' => 'Mental Health',
                'professional_registration_no' => 'COU-001',
                'department' => 'Mental Health Department',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2021-08-01',
                'role_id' => 4, // Counsellor
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 8. WARD CLERK - Admissions/Discharges
            // ============================================
            [
                'username' => 'john.kabwe',
                'name' => 'John Kabwe',
                'email' => 'john.wardclerk@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Ward@123'),
                'first_name' => 'John',
                'last_name' => 'Kabwe',
                'phone' => '+260977123463',
                'alternative_phone' => null,
                'gender' => 'male',
                'date_of_birth' => '1995-04-18',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Ward Clerk',
                'cadre' => 'Administration',
                'professional_registration_no' => 'WCL-001',
                'department' => 'Administration',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2022-06-01',
                'role_id' => 5, // Ward Clerk
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 9. FACILITY MANAGER
            // ============================================
            [
                'username' => 'facility.manager',
                'name' => 'Facility Manager',
                'email' => 'facility.manager@chipata.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Facility@123'),
                'first_name' => 'Facility',
                'last_name' => 'Manager',
                'phone' => '+260977123464',
                'alternative_phone' => null,
                'gender' => 'male',
                'date_of_birth' => '1975-12-01',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'designation' => 'Facility Manager',
                'cadre' => 'Administration',
                'professional_registration_no' => 'FM-001',
                'department' => 'Administration',
                'province_id' => $provinces['Eastern']->id ?? null,
                'district_id' => $districts['Chipata']->id ?? null,
                'facility_id' => $facilities['Chipata Central Hospital']->id ?? null,
                'employment_date' => '2017-01-01',
                'role_id' => 6, // Facility Manager
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 10. CHW in Kabwe (Central Province)
            // ============================================
            [
                'username' => 'sarah.mulenga',
                'name' => 'Sarah Mulenga',
                'email' => 'sarah.chw@kabwe.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Chw@123'),
                'first_name' => 'Sarah',
                'last_name' => 'Mulenga',
                'phone' => '+260977123465',
                'alternative_phone' => null,
                'gender' => 'female',
                'date_of_birth' => '1993-06-20',
                'address' => 'Kabwe Central Hospital, Kabwe, Central Province',
                'designation' => 'Community Health Worker',
                'cadre' => 'Community Health',
                'professional_registration_no' => 'CHW-002',
                'department' => 'Community Health Department',
                'province_id' => $provinces['Central']->id ?? null,
                'district_id' => $districts['Kabwe']->id ?? null,
                'facility_id' => $facilities['Kabwe Central Hospital']->id ?? null,
                'employment_date' => '2022-03-15',
                'role_id' => 1, // CHW
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 11. Nurse in Lusaka
            // ============================================
            [
                'username' => 'mary.zulu',
                'name' => 'Mary Zulu',
                'email' => 'mary.nurse@lusaka.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Nurse@123'),
                'first_name' => 'Mary',
                'last_name' => 'Zulu',
                'phone' => '+260977123466',
                'alternative_phone' => '+260977123467',
                'gender' => 'female',
                'date_of_birth' => '1991-08-14',
                'address' => 'University Teaching Hospital, Lusaka, Lusaka Province',
                'designation' => 'Registered Nurse',
                'cadre' => 'Nursing',
                'professional_registration_no' => 'NUR-002',
                'department' => 'Nursing Department',
                'province_id' => $provinces['Lusaka']->id ?? null,
                'district_id' => $districts['Lusaka']->id ?? null,
                'facility_id' => $facilities['University Teaching Hospital']->id ?? null,
                'employment_date' => '2021-05-01',
                'role_id' => 2, // Nurse
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ============================================
            // 12. Clinician in Ndola
            // ============================================
            [
                'username' => 'michael.banda',
                'name' => 'Dr. Michael Banda',
                'email' => 'michael.clinician@ndola.gov.zm',
                'email_verified_at' => now(),
                'password' => Hash::make('Clin@123'),
                'first_name' => 'Michael',
                'last_name' => 'Banda',
                'phone' => '+260977123467',
                'alternative_phone' => null,
                'gender' => 'male',
                'date_of_birth' => '1983-10-30',
                'address' => 'Ndola Central Hospital, Ndola, Copperbelt Province',
                'designation' => 'Medical Officer',
                'cadre' => 'Clinical Services',
                'professional_registration_no' => 'MED-002',
                'department' => 'Clinical Department',
                'province_id' => $provinces['Copperbelt']->id ?? null,
                'district_id' => $districts['Ndola']->id ?? null,
                'facility_id' => $facilities['Ndola Central Hospital']->id ?? null,
                'employment_date' => '2019-11-01',
                'role_id' => 3, // Clinician
                'is_active' => true,
                'is_verified' => true,
                'last_login_at' => null,
                'last_login_ip' => null,
                'profile_photo' => null,
                'settings' => null,
                'metadata' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert all users into the database
        DB::table('users')->insert($users);

        // Output success message
        $this->command->info('✅ Users seeded successfully!');
        $this->command->info('📊 Total users seeded: ' . count($users));

        // Display the seeded users
        $this->command->info("\n📝 Seeded Users:");
        $this->command->line(str_repeat('=', 120));
        $this->command->line(sprintf(
            " %-20s | %-25s | %-15s | %-12s | %-12s | %-15s",
            "Username", "Full Name", "Role", "Province", "District", "Facility"
        ));
        $this->command->line(str_repeat('-', 120));

        // Role mapping for display
        $roleNames = [
            1 => 'CHW',
            2 => 'Nurse',
            3 => 'Clinician',
            4 => 'Counsellor',
            5 => 'Ward Clerk',
            6 => 'Facility Manager',
            7 => 'DHO',
            8 => 'MEL Officer',
            9 => 'Administrator',
        ];

        // Province mapping
        $provinceNames = $provinces->pluck('name', 'id')->toArray();
        $districtNames = $districts->pluck('name', 'id')->toArray();
        $facilityNames = $facilities->pluck('name', 'id')->toArray();

        foreach ($users as $user) {
            $roleName = $roleNames[$user['role_id']] ?? 'Unknown';
            $provinceName = $provinceNames[$user['province_id']] ?? 'N/A';
            $districtName = $districtNames[$user['district_id']] ?? 'N/A';
            $facilityName = $facilityNames[$user['facility_id']] ?? 'N/A';

            $this->command->line(sprintf(
                " %-20s | %-25s | %-15s | %-12s | %-12s | %-15s",
                $user['username'],
                $user['name'],
                $roleName,
                $provinceName,
                $districtName,
                $facilityName
            ));
        }

        $this->command->line(str_repeat('=', 120));

        // Display login credentials
        $this->command->info("\n🔑 Login Credentials:");
        $this->command->line(str_repeat('-', 100));
        $this->command->line(sprintf(" %-25s | %-30s | %-20s | %-15s", "Username", "Email", "Password", "Role"));
        $this->command->line(str_repeat('-', 100));

        foreach ($users as $user) {
            $roleName = $roleNames[$user['role_id']] ?? 'Unknown';
            $this->command->line(sprintf(
                " %-25s | %-30s | %-20s | %-15s",
                $user['username'],
                $user['email'],
                'Password set',
                $roleName
            ));
        }

        $this->command->line(str_repeat('-', 100));

        // Show password reference
        $this->command->info("\n🔑 Password Reference:");
        $this->command->line(str_repeat('-', 80));
        $this->command->line(sprintf(" %-30s | %-20s", "Email", "Password"));
        $this->command->line(str_repeat('-', 80));

        $passwordRef = [
            'admin@chipata.gov.zm' => 'Admin@123',
            'mel@chipata.gov.zm' => 'Mel@123',
            'dho@chipata.gov.zm' => 'Dho@123',
            'jane.nurse@chipata.gov.zm' => 'Nurse@123',
            'peter.chw@chipata.gov.zm' => 'Chw@123',
            'dr.musonda@chipata.gov.zm' => 'Clin@123',
            'grace.counsellor@chipata.gov.zm' => 'Grace@123',
            'john.wardclerk@chipata.gov.zm' => 'Ward@123',
            'facility.manager@chipata.gov.zm' => 'Facility@123',
            'sarah.chw@kabwe.gov.zm' => 'Chw@123',
            'mary.nurse@lusaka.gov.zm' => 'Nurse@123',
            'michael.clinician@ndola.gov.zm' => 'Clin@123',
        ];

        foreach ($passwordRef as $email => $password) {
            $this->command->line(sprintf(
                " %-30s | %-20s",
                $email,
                $password
            ));
        }

        $this->command->line(str_repeat('-', 80));
        $this->command->info("\n💡 Note: All passwords are hashed using Laravel's Hash::make() (bcrypt).");
        $this->command->info("🔒 The plain text passwords shown above are for reference only.");

        // Display role reference
        $this->command->info("\n📋 Role ID Reference:");
        $this->command->line("   1 = CHW (Community Health Worker)");
        $this->command->line("   2 = Nurse (Nurse/Midwife)");
        $this->command->line("   3 = Clinician (Clinical Officer/Medical Officer)");
        $this->command->line("   4 = Counsellor (Psychosocial Counsellor)");
        $this->command->line("   5 = Ward Clerk (Admissions/Discharges)");
        $this->command->line("   6 = Facility Manager (Facility In-Charge)");
        $this->command->line("   7 = DHO (District Health Office Staff)");
        $this->command->line("   8 = MEL Officer (Reporting and analytics)");
        $this->command->line("   9 = Administrator (Full system management)");

        // Display location summary
        $this->command->info("\n📍 Location Summary:");
        $this->command->line("   • Eastern Province: " . count(array_filter($users, function($u) use ($provinces) {
                return $u['province_id'] == ($provinces['Eastern']->id ?? null);
            })) . " users");
        $this->command->line("   • Central Province: " . count(array_filter($users, function($u) use ($provinces) {
                return $u['province_id'] == ($provinces['Central']->id ?? null);
            })) . " users");
        $this->command->line("   • Lusaka Province: " . count(array_filter($users, function($u) use ($provinces) {
                return $u['province_id'] == ($provinces['Lusaka']->id ?? null);
            })) . " users");
        $this->command->line("   • Copperbelt Province: " . count(array_filter($users, function($u) use ($provinces) {
                return $u['province_id'] == ($provinces['Copperbelt']->id ?? null);
            })) . " users");

        // Display gender summary
        $this->command->info("\n👤 Gender Summary:");
        $maleCount = count(array_filter($users, function($u) { return $u['gender'] === 'male'; }));
        $femaleCount = count(array_filter($users, function($u) { return $u['gender'] === 'female'; }));
        $this->command->line("   • Male: " . $maleCount . " users");
        $this->command->line("   • Female: " . $femaleCount . " users");
    }
}

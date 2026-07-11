<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key constraints
        Schema::disableForeignKeyConstraints();
        DB::table('facilities')->truncate();
        Schema::enableForeignKeyConstraints();

        // Get all districts for reference
        $districts = DB::table('districts')->get()->keyBy('name');

        $facilities = [
            // ============================================
            // EASTERN PROVINCE - CHIPATA DISTRICT
            // ============================================
            [
                'district' => 'Chipata',
                'name' => 'Chipata Central Hospital',
                'code' => 'CCH-001',
                'type' => 'Central Hospital',
                'phone' => '+260977123456',
                'email' => 'chipata.central@health.gov.zm',
                'address' => 'Chipata Central Hospital, Chipata, Eastern Province',
                'latitude' => '-13.645000',
                'longitude' => '32.645000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Chipata Level One Hospital',
                'code' => 'CL1-001',
                'type' => 'Level One Hospital',
                'phone' => '+260977123457',
                'email' => 'chipata.level1@health.gov.zm',
                'address' => 'Chipata Level One Hospital, Chipata, Eastern Province',
                'latitude' => '-13.646000',
                'longitude' => '32.646000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Kapata Urban Clinic',
                'code' => 'KPT-001',
                'type' => 'Urban Clinic',
                'phone' => '+260977123458',
                'email' => 'kapata.urban@health.gov.zm',
                'address' => 'Kapata Urban Clinic, Chipata, Eastern Province',
                'latitude' => '-13.647000',
                'longitude' => '32.647000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Ndeke Urban Clinic',
                'code' => 'NDK-001',
                'type' => 'Urban Clinic',
                'phone' => '+260977123459',
                'email' => 'ndeke.urban@health.gov.zm',
                'address' => 'Ndeke Urban Clinic, Chipata, Eastern Province',
                'latitude' => '-13.648000',
                'longitude' => '32.648000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Namuseche Urban Clinic',
                'code' => 'NMS-001',
                'type' => 'Urban Clinic',
                'phone' => '+260977123460',
                'email' => 'namuseche.urban@health.gov.zm',
                'address' => 'Namuseche Urban Clinic, Chipata, Eastern Province',
                'latitude' => '-13.649000',
                'longitude' => '32.649000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Msekera Rural Health Centre',
                'code' => 'MSK-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123461',
                'email' => 'msekera.rhc@health.gov.zm',
                'address' => 'Msekera Rural Health Centre, Chipata, Eastern Province',
                'latitude' => '-13.650000',
                'longitude' => '32.650000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Mchini Rural Health Centre',
                'code' => 'MCH-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123462',
                'email' => 'mchini.rhc@health.gov.zm',
                'address' => 'Mchini Rural Health Centre, Chipata, Eastern Province',
                'latitude' => '-13.651000',
                'longitude' => '32.651000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Chisitu Rural Health Centre',
                'code' => 'CST-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123463',
                'email' => 'chisitu.rhc@health.gov.zm',
                'address' => 'Chisitu Rural Health Centre, Chipata, Eastern Province',
                'latitude' => '-13.652000',
                'longitude' => '32.652000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Kwenje Rural Health Centre',
                'code' => 'KWJ-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123464',
                'email' => 'kwenje.rhc@health.gov.zm',
                'address' => 'Kwenje Rural Health Centre, Chipata, Eastern Province',
                'latitude' => '-13.653000',
                'longitude' => '32.653000',
                'is_active' => true,
            ],
            [
                'district' => 'Chipata',
                'name' => 'Lutembwe Rural Health Centre',
                'code' => 'LTB-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123465',
                'email' => 'lutembwe.rhc@health.gov.zm',
                'address' => 'Lutembwe Rural Health Centre, Chipata, Eastern Province',
                'latitude' => '-13.654000',
                'longitude' => '32.654000',
                'is_active' => true,
            ],
            // ============================================
            // EASTERN PROVINCE - KATETE DISTRICT
            // ============================================
            [
                'district' => 'Katete',
                'name' => 'Katete District Hospital',
                'code' => 'KTT-001',
                'type' => 'District Hospital',
                'phone' => '+260977123466',
                'email' => 'katete.dh@health.gov.zm',
                'address' => 'Katete District Hospital, Katete, Eastern Province',
                'latitude' => '-14.000000',
                'longitude' => '32.000000',
                'is_active' => true,
            ],
            [
                'district' => 'Katete',
                'name' => 'St. Francis Mission Hospital',
                'code' => 'SFM-001',
                'type' => 'Mission Hospital',
                'phone' => '+260977123467',
                'email' => 'st.francis@health.gov.zm',
                'address' => 'St. Francis Mission Hospital, Katete, Eastern Province',
                'latitude' => '-14.001000',
                'longitude' => '32.001000',
                'is_active' => true,
            ],
            [
                'district' => 'Katete',
                'name' => 'Kafumbwe Rural Health Centre',
                'code' => 'KFB-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123468',
                'email' => 'kafumbwe.rhc@health.gov.zm',
                'address' => 'Kafumbwe Rural Health Centre, Katete, Eastern Province',
                'latitude' => '-14.002000',
                'longitude' => '32.002000',
                'is_active' => true,
            ],
            // ============================================
            // EASTERN PROVINCE - PETAUKE DISTRICT
            // ============================================
            [
                'district' => 'Petauke',
                'name' => 'Petauke District Hospital',
                'code' => 'PTK-001',
                'type' => 'District Hospital',
                'phone' => '+260977123469',
                'email' => 'petauke.dh@health.gov.zm',
                'address' => 'Petauke District Hospital, Petauke, Eastern Province',
                'latitude' => '-14.250000',
                'longitude' => '31.500000',
                'is_active' => true,
            ],
            [
                'district' => 'Petauke',
                'name' => 'Kalindawalo General Hospital',
                'code' => 'KDG-001',
                'type' => 'General Hospital',
                'phone' => '+260977123470',
                'email' => 'kalindawalo.gh@health.gov.zm',
                'address' => 'Kalindawalo General Hospital, Petauke, Eastern Province',
                'latitude' => '-14.251000',
                'longitude' => '31.501000',
                'is_active' => true,
            ],
            // ============================================
            // EASTERN PROVINCE - CHADIZA DISTRICT
            // ============================================
            [
                'district' => 'Chadiza',
                'name' => 'Chadiza District Hospital',
                'code' => 'CDZ-001',
                'type' => 'District Hospital',
                'phone' => '+260977123471',
                'email' => 'chadiza.dh@health.gov.zm',
                'address' => 'Chadiza District Hospital, Chadiza, Eastern Province',
                'latitude' => '-14.100000',
                'longitude' => '31.800000',
                'is_active' => true,
            ],
            [
                'district' => 'Chadiza',
                'name' => 'Chanida Rural Health Centre',
                'code' => 'CHN-001',
                'type' => 'Rural Health Centre',
                'phone' => '+260977123472',
                'email' => 'chanida.rhc@health.gov.zm',
                'address' => 'Chanida Rural Health Centre, Chadiza, Eastern Province',
                'latitude' => '-14.101000',
                'longitude' => '31.801000',
                'is_active' => true,
            ],
        ];

        // Insert facilities
        $insertData = [];
        foreach ($facilities as $facility) {
            if (isset($districts[$facility['district']])) {
                $insertData[] = [
                    'district_id' => $districts[$facility['district']]->id,
                    'name' => $facility['name'],
                    'code' => $facility['code'],
                    'type' => $facility['type'],
                    'phone' => $facility['phone'] ?? null,
                    'email' => $facility['email'] ?? null,
                    'address' => $facility['address'] ?? null,
                    'latitude' => $facility['latitude'] ?? null,
                    'longitude' => $facility['longitude'] ?? null,
                    'is_active' => $facility['is_active'] ?? true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (!empty($insertData)) {
            DB::table('facilities')->insert($insertData);
        }

        $this->command->info('✅ Facilities seeded successfully!');
        $this->command->info('📊 Total facilities seeded: ' . count($insertData));
    }
}

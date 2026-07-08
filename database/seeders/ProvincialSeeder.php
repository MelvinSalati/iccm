<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProvinceSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('provinces')->truncate();
        Schema::enableForeignKeyConstraints();

        $provinces = [
            ['name' => 'Central', 'code' => 'CE'],
            ['name' => 'Copperbelt', 'code' => 'CB'],
            ['name' => 'Eastern', 'code' => 'EA'],
            ['name' => 'Luapula', 'code' => 'LP'],
            ['name' => 'Lusaka', 'code' => 'LS'],
            ['name' => 'Muchinga', 'code' => 'MU'],
            ['name' => 'Northern', 'code' => 'NO'],
            ['name' => 'North-Western', 'code' => 'NW'],
            ['name' => 'Southern', 'code' => 'SO'],
            ['name' => 'Western', 'code' => 'WE'],
        ];

        foreach ($provinces as $province) {
            DB::table('provinces')->insert(array_merge($province, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $this->command->info('✅ Provinces seeded successfully!');
    }
}

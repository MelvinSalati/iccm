<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateUserFacilitiesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->update(['facility_id' => 1]);
    }
}

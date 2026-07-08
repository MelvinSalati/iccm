<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class TreatmentSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('treatments')->truncate();
        Schema::enableForeignKeyConstraints();

        $screenings = DB::table('screenings')->whereIn('result', ['VIA Positive', 'Suspicious Cancer'])->pluck('id')->toArray();
        $patients = DB::table('patients')->pluck('id')->toArray();
        $users = DB::table('users')->pluck('id')->toArray();

        if (empty($screenings)) {
            $this->command->warn('No screenings with positive results found. Skipping treatments.');
            return;
        }

        $treatments = [];
        $treatmentTypes = ['Thermal Ablation', 'LEEP', 'Referral', 'Other'];

        foreach ($screenings as $screeningId) {
            $treatments[] = [
                'patient_id' => DB::table('screenings')->where('id', $screeningId)->value('patient_id'),
                'screening_id' => $screeningId,
                'treatment_date' => Carbon::now()->subDays(rand(1, 30)),
                'treatment_type' => $treatmentTypes[array_rand($treatmentTypes)],
                'outcome' => rand(0, 3) ? 'Completed' : 'Pending',
                'performed_by' => $users[array_rand($users)],
                'facility_id' => 1,
                'notes' => rand(0, 1) ? 'Treatment administered successfully' : null,
                'created_at' => Carbon::now()->subDays(rand(1, 30)),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('treatments')->insert($treatments);
        $this->command->info('Treatments seeded successfully!');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class ScreeningSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('screenings')->truncate();
        Schema::enableForeignKeyConstraints();

        $patients = DB::table('patients')->pluck('id')->toArray();
        $users = DB::table('users')->pluck('id')->toArray();

        $screenings = [];
        $screeningTypes = ['VIA', 'HPV Testing', 'Cytology'];
        $results = ['Negative', 'VIA Positive', 'Suspicious Cancer', 'HPV Positive', 'Cytology Abnormal'];

        foreach ($patients as $patientId) {
            // Each patient has 1-3 screenings
            $screeningCount = rand(1, 3);
            for ($i = 0; $i < $screeningCount; $i++) {
                $screeningDate = Carbon::now()->subDays(rand(1, 180));
                $screenings[] = [
                    'patient_id' => $patientId,
                    'screening_date' => $screeningDate,
                    'screening_type' => $screeningTypes[array_rand($screeningTypes)],
                    'result' => $results[array_rand($results)],
                    'performed_by' => $users[array_rand($users)],
                    'facility_id' => 1,
                    'notes' => rand(0, 1) ? 'Routine screening' : null,
                    'created_at' => $screeningDate,
                    'updated_at' => $screeningDate,
                ];
            }
        }

        DB::table('screenings')->insert($screenings);
        $this->command->info('Screenings seeded successfully!');
    }
}

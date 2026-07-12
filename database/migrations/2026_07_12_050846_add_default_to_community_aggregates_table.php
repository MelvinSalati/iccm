<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // List all tables that need their columns updated
        $tables = [
            'community_aggregates',
            // Add other tables here
        ];

        foreach ($tables as $tableName) {
            $columns = Schema::getColumnListing($tableName);

            // Columns that should have default 0 (numeric columns)
            $numericColumns = [
                'cervical_education',
                'breast_education',
                'family_planning_education',
                'nutrition_education',
                'cervical_screening',
                'breast_screening',
                'hiv_screening',
                'hypertension_screening',
                'diabetes_screening',
                'referrals_made',
                'referrals_completed',
                'follow_ups_completed',
                'follow_ups_pending',
                'community_health_worker',
                'community_health_workers',
                'community_meetings_held',
                'household_visits',
                'total_participants',
                'total_females',
                'total_males',
                'age_15_24',
                'age_25_34',
                'age_35_44',
                'age_45_54',
                'age_55_plus',
            ];

            foreach ($numericColumns as $column) {
                if (in_array($column, $columns)) {
                    try {
                        // For SQLite
                        if (DB::connection()->getDriverName() === 'sqlite') {
                            // SQLite doesn't support ALTER COLUMN SET DEFAULT easily
                            // Update existing NULL values to 0
                            DB::statement("UPDATE {$tableName} SET {$column} = 0 WHERE {$column} IS NULL");
                        } else {
                            // For MySQL/PostgreSQL
                            DB::statement("ALTER TABLE {$tableName} MODIFY COLUMN {$column} INT DEFAULT 0 NOT NULL");
                        }
                    } catch (\Exception $e) {
                        // Log error and continue
                        \Log::error("Failed to update column {$column} in table {$tableName}: " . $e->getMessage());
                    }
                }
            }
        }
    }

    public function down(): void
    {
        // Revert changes if needed
    }
};

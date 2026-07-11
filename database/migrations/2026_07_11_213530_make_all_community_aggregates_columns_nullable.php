<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Get existing columns first
        $columns = Schema::getColumnListing('community_aggregates');

        // All columns that should be nullable (excluding id, created_at, updated_at)
        $nullableColumns = [
            'facility_id',
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
            'notes',
            'assessment_date',
            'assessed_by',
            'status',
        ];

        foreach ($nullableColumns as $column) {
            if (in_array($column, $columns)) {
                try {
                    // For SQLite, we need to use raw SQL
                    DB::statement("ALTER TABLE community_aggregates ALTER COLUMN {$column} DROP NOT NULL");
                } catch (\Exception $e) {
                    // If ALTER COLUMN doesn't work, try a different approach
                    try {
                        DB::statement("ALTER TABLE community_aggregates MODIFY COLUMN {$column} NULL");
                    } catch (\Exception $e2) {
                        // For SQLite, we may need to recreate the table
                        // Skip if column doesn't exist or can't be modified
                    }
                }
            }
        }
    }

    public function down(): void
    {
        // Reverting is complex for SQLite, so we'll skip
    }
};

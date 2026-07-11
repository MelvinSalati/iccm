<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Check if the table exists
        if (Schema::hasTable('community_aggregates')) {

            // Get existing columns
            $existingColumns = Schema::getColumnListing('community_aggregates');

            // Define all columns to add
            $columnsToAdd = [
                'community_meetings_held',
                'household_visits',
                'total_females',
                'total_males',
                'age_15_24',
                'age_25_34',
                'age_35_44',
                'age_45_54',
                'age_55_plus'
            ];

            // Add each column if it doesn't exist
            foreach ($columnsToAdd as $column) {
                if (!in_array($column, $existingColumns)) {
                    try {
                        DB::statement("ALTER TABLE community_aggregates ADD COLUMN {$column} INTEGER DEFAULT 0");
                        echo "Added column: {$column}\n";
                    } catch (\Exception $e) {
                        echo "Error adding column {$column}: " . $e->getMessage() . "\n";
                    }
                } else {
                    echo "Column already exists: {$column}\n";
                }
            }

            // Verify what was added
            $updatedColumns = Schema::getColumnListing('community_aggregates');
            echo "\nUpdated columns in community_aggregates:\n";
            print_r($updatedColumns);
        }
    }

    public function down(): void
    {
        // SQLite doesn't support dropping columns directly
        // This is a no-op for SQLite
    }
};

// database/migrations/YYYY_MM_DD_add_missing_columns_to_community_aggregates_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('community_aggregates', function (Blueprint $table) {
            // Add household_visits if it doesn't exist
            if (!Schema::hasColumn('community_aggregates', 'household_visits')) {
                $table->integer('household_visits')->default(0)->after('community_meetings_held');
            }

            // Add demographic columns
            if (!Schema::hasColumn('community_aggregates', 'total_females')) {
                $table->integer('total_females')->default(0)->after('total_participants');
            }

            if (!Schema::hasColumn('community_aggregates', 'total_males')) {
                $table->integer('total_males')->default(0)->after('total_females');
            }

            if (!Schema::hasColumn('community_aggregates', 'age_15_24')) {
                $table->integer('age_15_24')->default(0)->after('total_males');
            }

            if (!Schema::hasColumn('community_aggregates', 'age_25_34')) {
                $table->integer('age_25_34')->default(0)->after('age_15_24');
            }

            if (!Schema::hasColumn('community_aggregates', 'age_35_44')) {
                $table->integer('age_35_44')->default(0)->after('age_25_34');
            }

            if (!Schema::hasColumn('community_aggregates', 'age_45_54')) {
                $table->integer('age_45_54')->default(0)->after('age_35_44');
            }

            if (!Schema::hasColumn('community_aggregates', 'age_55_plus')) {
                $table->integer('age_55_plus')->default(0)->after('age_45_54');
            }
        });
    }

    public function down(): void
    {
        Schema::table('community_aggregates', function (Blueprint $table) {
            $columns = [
                'household_visits',
                'total_females',
                'total_males',
                'age_15_24',
                'age_25_34',
                'age_35_44',
                'age_45_54',
                'age_55_plus'
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('community_aggregates', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};

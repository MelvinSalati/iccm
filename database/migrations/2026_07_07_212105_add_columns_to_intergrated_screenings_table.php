<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('integrated_screenings', function (Blueprint $table) {
            if (!Schema::hasColumn('integrated_screenings', 'created_by')) {
                $table->uuid('created_by')->nullable()->after('full_data');
                $table->foreign('created_by')
                    ->references('id')
                    ->on('users')
                    ->onDelete('set null');
            }

            // Add columns for better querying (extracted from metrics)


            if (!Schema::hasColumn('integrated_screenings', 'is_mental_health_flagged')) {
                $table->boolean('is_mental_health_flagged')->default(false)->after('is_positive');
                $table->index('is_mental_health_flagged');
            }

            // Add follow_up_date if needed
            if (!Schema::hasColumn('integrated_screenings', 'follow_up_date')) {
                $table->date('follow_up_date')->nullable()->after('is_mental_health_flagged');
                $table->index('follow_up_date');
            }

            // Add status column
            if (!Schema::hasColumn('integrated_screenings', 'status')) {
                $table->string('status')->default('submitted')->after('submitted_at');
                $table->index('status');
            }

            // Add indexes for faster reporting
            $table->index(['screening_date', 'is_positive']);
            $table->index(['screening_method', 'screening_result']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intergrated_screenings', function (Blueprint $table) {
            //
        });
    }
};

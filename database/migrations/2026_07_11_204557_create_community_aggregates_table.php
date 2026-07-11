// database/migrations/YYYY_MM_DD_create_community_aggregates_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
//        Schema::create('community_aggregates', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('facility_id')->nullable()->constrained('facilities')->onDelete('set null');
//
//            // Education
//            $table->integer('cervical_education')->default(0);
//            $table->integer('breast_education')->default(0);
//            $table->integer('family_planning_education')->default(0);
//            $table->integer('nutrition_education')->default(0);
//
//            // Screenings
//            $table->integer('cervical_screening')->default(0);
//            $table->integer('breast_screening')->default(0);
//            $table->integer('hiv_screening')->default(0);
//            $table->integer('hypertension_screening')->default(0);
//            $table->integer('diabetes_screening')->default(0);
//
//            // Referrals
//            $table->integer('referrals_made')->default(0);
//            $table->integer('referrals_completed')->default(0);
//
//            // Follow-ups
//            $table->integer('follow_ups_completed')->default(0);
//            $table->integer('follow_ups_pending')->default(0);
//
//            // Community health
//            $table->integer('community_health_workers')->default(0);
//            $table->integer('community_meetings_held')->default(0);
//            $table->integer('household_visits')->default(0);
//
//            // Demographics
//            $table->integer('total_participants')->default(0);
//            $table->integer('total_females')->default(0);
//            $table->integer('total_males')->default(0);
//            $table->integer('age_15_24')->default(0);
//            $table->integer('age_25_34')->default(0);
//            $table->integer('age_35_44')->default(0);
//            $table->integer('age_45_54')->default(0);
//            $table->integer('age_55_plus')->default(0);
//
//            // Additional fields
//            $table->text('notes')->nullable();
//            $table->date('assessment_date')->nullable();
//            $table->foreignId('assessed_by')->nullable()->constrained('users')->onDelete('set null');
//            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])->default('draft');
//
//            $table->timestamps();
//
//
//        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_aggregates');
    }
};

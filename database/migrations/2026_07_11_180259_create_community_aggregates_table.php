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
        Schema::create('community_aggregates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained('facilities')->onDelete('cascade');
            $table->integer('cervical_education')->default(0);
            $table->integer('breast_education')->default(0);
            $table->integer('family_planning_education')->default(0);
            $table->integer('nutrition_education')->default(0);
            $table->integer('cervical_screening')->default(0);
            $table->integer('breast_screening')->default(0);
            $table->integer('hiv_screening')->default(0);
            $table->integer('hypertension_screening')->default(0);
            $table->integer('diabetes_screening')->default(0);
            $table->integer('referrals_made')->default(0);
            $table->integer('referrals_completed')->default(0);
            $table->integer('follow_ups_completed')->default(0);
            $table->integer('follow_ups_pending')->default(0);
            $table->integer('total_participants')->default(0);
            $table->text('notes')->nullable();
            $table->date('assessment_date')->nullable();
            $table->foreignId('assessed_by')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['draft', 'submitted', 'approved'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_aggregates');
    }
};

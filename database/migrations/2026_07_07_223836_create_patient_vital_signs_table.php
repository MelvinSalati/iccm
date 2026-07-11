<?php
// database/migrations/2026_07_08_create_patient_vitals_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // In your migration file
        Schema::create('patient_vitals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('patient_uuid');
            $table->uuid('visit_uuid')->nullable();
            $table->uuid('recorded_by')->nullable();

            // Vital signs - all nullable
            $table->integer('systolic_bp')->nullable();
            $table->integer('diastolic_bp')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->decimal('temperature', 4, 1)->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->integer('oxygen_saturation')->nullable();
            $table->decimal('weight', 6, 2)->nullable();
            $table->decimal('height', 6, 2)->nullable();
            $table->decimal('bmi', 5, 2)->nullable();
            $table->decimal('blood_glucose', 5, 2)->nullable();
            $table->integer('pain_score')->nullable();
            $table->string('pain_location')->nullable();

            $table->timestamp('recorded_at')->nullable();
            $table->boolean('is_current')->default(true);
            $table->string('status')->default('active');
            $table->json('metadata')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_vitals');
    }
};

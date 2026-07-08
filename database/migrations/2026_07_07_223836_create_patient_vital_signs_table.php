<?php
// database/migrations/2026_07_08_create_patient_vitals_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_vitals', function (Blueprint $table) {
            $table->id('id');
            // Foreign keys
            $table->uuid('patient_uuid');
            $table->integer('visit_id')->nullable();
            $table->integer('recorded_by')->nullable();

            // Vital signs
            $table->integer('systolic_bp')->nullable();      // Systolic Blood Pressure (mmHg)
            $table->integer('diastolic_bp')->nullable();     // Diastolic Blood Pressure (mmHg)
            $table->integer('heart_rate')->nullable();        // Heart Rate (bpm)
            $table->decimal('temperature', 4, 1)->nullable(); // Temperature (°C)
            $table->integer('respiratory_rate')->nullable();  // Respiratory Rate (/min)
            $table->integer('oxygen_saturation')->nullable(); // Oxygen Saturation (%)
            $table->decimal('weight', 5, 2)->nullable();      // Weight (kg)
            $table->decimal('height', 5, 2)->nullable();      // Height (cm)
            $table->decimal('bmi', 5, 2)->nullable();         // BMI (kg/m²)

            // Additional measurements
            $table->decimal('blood_glucose', 5, 2)->nullable(); // Blood Glucose (mmol/L)
            $table->integer('pain_score')->nullable();          // Pain Score (0-10)
            $table->string('pain_location')->nullable();        // Pain Location

            // Metadata
            $table->json('metadata')->nullable();
            $table->timestamp('recorded_at');

            // Status
            $table->boolean('is_current')->default(true);
            $table->string('status')->default('active');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_vitals');
    }
};

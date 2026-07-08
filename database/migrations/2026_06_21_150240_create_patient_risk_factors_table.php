<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_risk_factors', function (Blueprint $table) {
            $table->id();

            // Foreign key to patients
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');

            // ============================================
            // REPRODUCTIVE FACTORS
            // ============================================
            $table->integer('number_of_pregnancies')->nullable()->default(0);
            $table->integer('number_of_deliveries')->nullable()->default(0);
            $table->enum('long_term_contraceptive_use', ['yes', 'no', 'unknown'])->nullable();
            $table->integer('contraceptive_use_years')->nullable();
            $table->enum('contraceptive_type', ['oral', 'injectable', 'implant', 'iud', 'other'])->nullable();

            // ============================================
            // HIV/ART STATUS
            // ============================================
            $table->enum('hiv_status', ['positive', 'negative', 'unknown'])->nullable();
            $table->date('hiv_diagnosis_date')->nullable();
            $table->enum('art_status', ['active', 'defaulted', 'never', 'unknown'])->nullable();
            $table->date('art_start_date')->nullable();
            $table->enum('viral_load_status', ['suppressed', 'detectable', 'unknown'])->nullable();
            $table->date('viral_load_date')->nullable();
            $table->integer('viral_load_value')->nullable();
            $table->enum('hpv_status', ['positive', 'negative', 'unknown'])->nullable();
            $table->string('hpv_type')->nullable();
            $table->date('hpv_test_date')->nullable();

            // ============================================
            // LIFESTYLE FACTORS
            // ============================================
            $table->enum('smoking_status', ['current', 'former', 'never', 'unknown'])->nullable();
            $table->integer('smoking_years')->nullable();
            $table->integer('smoking_packs_per_day')->nullable();
            $table->enum('alcohol_use', ['current', 'former', 'never', 'unknown'])->nullable();
            $table->string('alcohol_type')->nullable();
            $table->integer('alcohol_units_per_week')->nullable();
            $table->enum('family_history_of_cancer', ['yes', 'no', 'unknown'])->nullable();
            $table->string('family_cancer_type')->nullable();
            $table->string('family_relationship')->nullable();

            // ============================================
            // PREVIOUS HISTORY
            // ============================================
            $table->enum('previous_via_positive', ['yes', 'no', 'unknown'])->nullable();
            $table->date('via_positive_date')->nullable();
            $table->enum('previous_hpv_positive', ['yes', 'no', 'unknown'])->nullable();
            $table->date('hpv_positive_date')->nullable();
            $table->enum('previous_cin_diagnosis', ['yes', 'no', 'unknown'])->nullable();
            $table->enum('cin_grade', ['CIN1', 'CIN2', 'CIN3', 'unknown'])->nullable();
            $table->date('cin_diagnosis_date')->nullable();
            $table->enum('previous_cervical_cancer', ['yes', 'no', 'unknown'])->nullable();
            $table->string('cancer_stage')->nullable();
            $table->date('cancer_diagnosis_date')->nullable();
            $table->string('cancer_treatment')->nullable();

            // ============================================
            // OTHER RISK FACTORS
            // ============================================
            $table->enum('immunosuppression', ['yes', 'no', 'unknown'])->nullable();
            $table->string('immunosuppression_cause')->nullable();
            $table->enum('long_term_contraceptive', ['yes', 'no', 'unknown'])->nullable();
            $table->text('other_risk_factors')->nullable();
            $table->json('additional_risk_data')->nullable();

            // ============================================
            // ASSESSMENT METADATA
            // ============================================
            $table->date('assessment_date')->nullable();
            $table->foreignId('assessed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('clinical_notes')->nullable();

            // ============================================
            // RISK SCORES (calculated)
            // ============================================
            $table->integer('risk_score')->nullable();
            $table->enum('risk_level', ['low', 'moderate', 'high', 'very_high'])->nullable();

            // ============================================
            // TIMESTAMPS
            // ============================================
            $table->timestamps();

            // ============================================
            // INDEXES
            // ============================================
            $table->index('hiv_status');
            $table->index('hpv_status');
            $table->index('risk_level');
            $table->index('assessment_date');
            $table->index('patient_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_risk_factors');
    }
};

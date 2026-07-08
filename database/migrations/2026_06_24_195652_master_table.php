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
        // ============================================
        // 1. ROLES AND PERMISSIONS TABLES
        // ============================================

//        Schema::create('roles', function (Blueprint $table) {
//            $table->id();
//            $table->string('role_name', 50)->unique();
//            $table->text('description')->nullable();
//            $table->timestamps();
//        });

//        Schema::create('permissions', function (Blueprint $table) {
//            $table->id();
//            $table->string('permission_name', 100)->unique();
//            $table->text('description')->nullable();
//            $table->timestamps();
//        });

//        Schema::create('role_permissions', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('role_id')->constrained()->onDelete('cascade');
//            $table->foreignId('permission_id')->constrained()->onDelete('cascade');
//            $table->timestamps();
//
//            $table->unique(['role_id', 'permission_id']);
//        });

        // ============================================
        // 2. PATIENTS TABLE
        // ============================================

//        Schema::create('patients', function (Blueprint $table) {
//            $table->id();
//            $table->string('unique_id', 50)->unique();
//            $table->string('nrc', 20)->unique()->nullable();
//            $table->string('first_name', 100);
//            $table->string('last_name', 100);
//            $table->date('date_of_birth')->nullable();
//            $table->integer('age')->nullable();
//            $table->enum('sex', ['Male', 'Female', 'Other'])->nullable();
//            $table->string('phone_number', 20)->nullable();
//            $table->string('village', 100)->nullable();
//            $table->string('ward', 100)->nullable();
//            $table->string('chiefdom', 100)->nullable();
//
//            // Foreign keys to master data (these tables are assumed to exist)
//            $table->unsignedBigInteger('district_id')->nullable();
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->unsignedBigInteger('province_id')->nullable();
//
//            // Risk Factors
//            $table->boolean('hiv_status')->nullable();
//            $table->boolean('smoking_status')->nullable();
//            $table->boolean('alcohol_use')->nullable();
//            $table->boolean('family_history_cancer')->nullable();
//            $table->boolean('diabetes_status')->nullable();
//            $table->boolean('hypertension_status')->nullable();
//
//            $table->timestamps();
//
//            // Indexes
//            $table->index(['last_name', 'first_name']);
//            $table->index('unique_id');
//            $table->index('district_id');
//            $table->index('facility_id');
//        });

        // ============================================
        // 3. SCREENINGS TABLE (Cervical Cancer)
        // ============================================

//        Schema::create('screenings', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('screening_date');
//            $table->enum('screening_type', ['VIA', 'HPV Testing', 'Cytology']);
//            $table->enum('result', [
//                'Negative',
//                'VIA Positive',
//                'Suspicious Cancer',
//                'HPV Positive',
//                'Cytology Abnormal'
//            ])->nullable();
//            $table->unsignedBigInteger('performed_by')->nullable(); // User ID
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->text('notes')->nullable();
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('screening_date');
//            $table->index('screening_type');
//            $table->index('result');
//        });

        // ============================================
        // 4. TREATMENTS TABLE
        // ============================================
//
//        Schema::create('treatments', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->foreignId('screening_id')->nullable()->constrained()->onDelete('set null');
//            $table->date('treatment_date');
//            $table->enum('treatment_type', [
//                'Thermal Ablation',
//                'LEEP',
//                'Referral',
//                'Other'
//            ]);
//            $table->string('outcome', 50)->nullable();
//            $table->unsignedBigInteger('performed_by')->nullable(); // User ID
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->text('notes')->nullable();
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('treatment_date');
//            $table->index('treatment_type');
//        });

        // ============================================
        // 5. REFERRALS TABLE
        // ============================================

//        Schema::create('referrals', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('referral_date');
//            $table->text('reason');
//            $table->unsignedBigInteger('referring_facility_id')->nullable();
//            $table->unsignedBigInteger('receiving_facility_id')->nullable();
//            $table->enum('referral_status', [
//                'Pending',
//                'Completed',
//                'Cancelled',
//                'Feedback Received'
//            ])->default('Pending');
//            $table->text('feedback_notes')->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('referral_status');
//            $table->index('referral_date');
//        });

        // ============================================
        // 6. OUTREACH ACTIVITIES TABLE
        // ============================================
//
//        Schema::create('outreach_activities', function (Blueprint $table) {
//            $table->id();
//            $table->date('activity_date');
//            $table->string('location', 255);
//            $table->string('village', 100)->nullable();
//            $table->string('ward', 100)->nullable();
//            $table->string('chiefdom', 100)->nullable();
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->unsignedBigInteger('coordinator_id')->nullable(); // User ID
//            $table->integer('women_screened')->default(0);
//            $table->integer('men_reached')->default(0);
//            $table->integer('community_awareness_sessions')->default(0);
//            $table->text('chw_performance_notes')->nullable();
//            $table->timestamps();
//
//            $table->index('activity_date');
//            $table->index('facility_id');
//        });

        // ============================================
        // 7. MENTAL HEALTH ASSESSMENTS TABLE
        // ============================================

//        Schema::create('mental_health_assessments', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('assessment_date');
//            $table->integer('anxiety_score')->nullable(); // GAD-7
//            $table->integer('depression_score')->nullable(); // PHQ-9
//            $table->integer('distress_thermometer_score')->nullable(); // 0-10
//            $table->integer('quality_of_life_score')->nullable();
//            $table->text('services_provided')->nullable(); // Counselling, Support Groups
//            $table->text('outcome_notes')->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID (Counsellor)
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('assessment_date');
//        });

        // ============================================
        // 8. NCD ASSESSMENTS TABLE
        // ============================================

//        Schema::create('ncd_assessments', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('assessment_date');
//            $table->enum('condition_type', [
//                'Hypertension',
//                'Diabetes',
//                'Stroke',
//                'Heart Failure',
//                'Chronic Kidney Disease',
//                'Asthma',
//                'Epilepsy'
//            ]);
//            $table->integer('systolic_bp')->nullable();
//            $table->integer('diastolic_bp')->nullable();
//            $table->decimal('weight_kg', 5, 2)->nullable();
//            $table->decimal('height_m', 4, 2)->nullable();
//            $table->decimal('bmi', 5, 2)->nullable();
//            $table->decimal('blood_sugar_mmol_L', 5, 2)->nullable();
//            $table->text('medications')->nullable();
//            $table->text('follow_up_plan')->nullable();
//            $table->text('treatment_adherence_notes')->nullable();
//            $table->text('complications')->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('assessment_date');
//            $table->index('condition_type');
//        });

        // ============================================
        // 9. ADMISSIONS TABLE
        // ============================================

//        Schema::create('admissions', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('admission_date');
//            $table->unsignedBigInteger('department_id')->nullable();
//            $table->string('ward', 100)->nullable();
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->string('referral_source', 100)->nullable();
//            $table->text('primary_diagnosis')->nullable();
//            $table->text('secondary_diagnoses')->nullable();
//            $table->string('icd_11_code', 20)->nullable();
//            $table->boolean('hiv_status')->nullable();
//            $table->boolean('ncd_status')->nullable();
//            $table->enum('severity', ['Emergency', 'Urgent', 'Elective'])->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID (Ward Clerk)
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('admission_date');
//            $table->index('department_id');
//            $table->index('facility_id');
//        });

        // ============================================
        // 10. DISCHARGES TABLE
        // ============================================

//        Schema::create('discharges', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('admission_id')->constrained()->onDelete('cascade');
//            $table->date('discharge_date');
//            $table->enum('outcome', [
//                'Recovered',
//                'Improved',
//                'Referred',
//                'Absconded',
//                'Died'
//            ]);
//            $table->integer('length_of_stay_days')->nullable();
//            $table->text('complications')->nullable();
//            $table->date('next_appointment_date')->nullable();
//            $table->string('referral_destination', 255)->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->timestamps();
//
//            $table->index('admission_id');
//            $table->index('discharge_date');
//            $table->index('outcome');
//        });

        // ============================================
        // 11. MORTALITY REVIEWS TABLE
        // ============================================

//        Schema::create('mortality_reviews', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->foreignId('admission_id')->nullable()->constrained()->onDelete('set null');
//            $table->date('death_date');
//            $table->unsignedBigInteger('department_id')->nullable();
//            $table->text('cause_of_death')->nullable();
//            $table->text('immediate_cause')->nullable();
//            $table->text('underlying_cause')->nullable();
//            $table->text('contributing_factors')->nullable();
//
//            // Classification
//            $table->boolean('maternal_death')->default(false);
//            $table->boolean('neonatal_death')->default(false);
//            $table->boolean('child_death')->default(false);
//            $table->boolean('adult_death')->default(false);
//            $table->boolean('cancer_death')->default(false);
//            $table->boolean('ncd_death')->default(false);
//
//            // Audit
//            $table->boolean('mortality_review_completed')->default(false);
//            $table->text('avoidable_factors_identified')->nullable();
//            $table->text('action_plan_generated')->nullable();
//            $table->unsignedBigInteger('reviewed_by')->nullable(); // User ID
//            $table->date('review_date')->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('death_date');
//            $table->index('department_id');
//            $table->index('maternal_death');
//            $table->index('neonatal_death');
//        });

        // ============================================
        // 12. APPOINTMENTS TABLE
        // ============================================
//
//        Schema::create('appointments', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('appointment_date');
//            $table->enum('appointment_type', [
//                'Screening',
//                'Treatment',
//                'Follow-up',
//                'Mental Health',
//                'NCD'
//            ]);
//            $table->unsignedBigInteger('related_entity_id')->nullable(); // Can reference screening_id, treatment_id, etc.
//            $table->enum('status', [
//                'Scheduled',
//                'Completed',
//                'Missed',
//                'Cancelled'
//            ])->default('Scheduled');
//            $table->text('notes')->nullable();
//            $table->boolean('reminder_sent')->default(false);
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('appointment_date');
//            $table->index('status');
//            $table->index(['appointment_date', 'status']);
//        });

        // ============================================
        // 13. USERS TABLE
        // ============================================

//        Schema::create('users', function (Blueprint $table) {
//            $table->id();
//            $table->string('username', 50)->unique();
//            $table->string('password_hash', 255);
//            $table->string('email', 100)->unique()->nullable();
//            $table->string('first_name', 100)->nullable();
//            $table->string('last_name', 100)->nullable();
//            $table->string('phone_number', 20)->nullable();
//            $table->foreignId('role_id')->nullable()->constrained()->onDelete('set null');
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->boolean('is_active')->default(true);
//            $table->timestamp('last_login')->nullable();
//            $table->rememberToken();
//            $table->timestamps();
//
//            $table->index('username');
//            $table->index('email');
//            $table->index('role_id');
//        });

        // ============================================
        // 14. AUDIT LOGS TABLE
        // ============================================

//        Schema::create('audit_logs', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
//            $table->string('action', 100);
//            $table->string('table_name', 50)->nullable();
//            $table->unsignedBigInteger('record_id')->nullable();
//            $table->json('old_data')->nullable();
//            $table->json('new_data')->nullable();
//            $table->string('ip_address', 45)->nullable();
//            $table->text('user_agent')->nullable();
//            $table->timestamps();
//
//            $table->index('user_id');
//            $table->index('table_name');
//            $table->index('record_id');
//            $table->index('created_at');
//            $table->index(['table_name', 'record_id']);
//        });

        // ============================================
        // 15. PATIENT VISITS / ENCOUNTERS TABLE (Optional)
        // ============================================

//        Schema::create('patient_visits', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
//            $table->date('visit_date');
//            $table->enum('visit_type', [
//                'Screening',
//                'Treatment',
//                'Follow-up',
//                'Mental Health',
//                'NCD',
//                'Admission',
//                'Outreach'
//            ]);
//            $table->unsignedBigInteger('related_id')->nullable(); // ID of the related record
//            $table->string('related_table', 50)->nullable(); // Table name of the related record
//            $table->unsignedBigInteger('facility_id')->nullable();
//            $table->unsignedBigInteger('created_by')->nullable(); // User ID
//            $table->text('notes')->nullable();
//            $table->timestamps();
//
//            $table->index('patient_id');
//            $table->index('visit_date');
//            $table->index('visit_type');
//            $table->index(['patient_id', 'visit_date']);
//        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop tables in reverse order to avoid foreign key constraints
        Schema::dropIfExists('patient_visits');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('users');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('mortality_reviews');
        Schema::dropIfExists('discharges');
        Schema::dropIfExists('admissions');
        Schema::dropIfExists('ncd_assessments');
        Schema::dropIfExists('mental_health_assessments');
        Schema::dropIfExists('outreach_activities');
        Schema::dropIfExists('referrals');
        Schema::dropIfExists('treatments');
        Schema::dropIfExists('screenings');
        Schema::dropIfExists('patients');
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};

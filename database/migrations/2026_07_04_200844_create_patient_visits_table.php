<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop the existing table if it exists
        Schema::dropIfExists('patient_visits');

        // Create the new table with all columns
        Schema::create('patient_visits', function (Blueprint $table) {
            $table->id();
            $table->uuid('patient_id');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');

            // Visit Identification
            $table->string('visit_number')->unique()->comment('Auto-generated: VIS-YYYYMMDD-XXXX');
            $table->string('external_visit_id')->nullable()->comment('External system reference');
            $table->text('visit_token')->nullable();

            // Visit Type & Mode - All visit types from frontend
            $table->enum('visit_type', [
                'cervical_cancer_screening',
                'colposcopy',
                'biopsy',
                'hpv_testing',
                'pap_smear',
                'treatment',
                'follow_up',
                'post_treatment_surveillance',
                'palliative_care',
                'consultation',
                'radiation_therapy',
                'chemotherapy',
                'surgery',
                'pre_treatment_assessment',
                'counseling',
                'health_education',
                'community_outreach',
                'teleconsultation',
                'home_based_care'
            ])->nullable(false);

            $table->enum('visit_mode', [
                'physical',
                'virtual',
                'hybrid'
            ])->default('physical');

            // Visit Timing
            $table->dateTime('check_in_time')->nullable(false);
            $table->dateTime('check_out_time')->nullable();
            $table->integer('duration_minutes')->nullable()->comment('Auto-calculated');

            // Visit Location
            $table->string('facility')->nullable(false);
            $table->string('department')->nullable();
            $table->string('ward')->nullable();
            $table->string('room_number')->nullable();
            $table->string('bed_number')->nullable();

            // Visit Status
            $table->enum('visit_status', [
                'scheduled',
                'checked_in',
                'in_progress',
                'completed',
                'cancelled',
                'no_show',
                'discharged',
                'transferred'
            ])->default('scheduled');

            // Admission Details
            $table->boolean('is_admission')->default(false);
            $table->dateTime('admission_date')->nullable();
            $table->dateTime('discharge_date')->nullable();
            $table->enum('admission_type', [
                'elective',
                'emergency',
                'urgent',
                'observation'
            ])->nullable();

            // Referral Tracking
            $table->boolean('is_referral')->default(false);
            $table->string('referred_from')->nullable();
            $table->string('referred_to')->nullable();
            $table->dateTime('referral_date')->nullable();
            $table->string('referral_source')->nullable();
            $table->string('referral_reason')->nullable();
            $table->string('referral_type')->nullable()->comment('internal, external, self');
            $table->string('referred_by')->nullable()->comment('Name of referring person/entity');
            $table->string('referring_facility')->nullable();
            $table->string('referring_doctor')->nullable();

            // Visit Priority
            $table->enum('priority', [
                'routine',
                'urgent',
                'emergency',
                'critical'
            ])->default('routine');

            // Clinical Information
            $table->text('presenting_complaint')->nullable();
            $table->text('chief_complaint')->nullable();
            $table->text('history_of_presenting_illness')->nullable();
            $table->text('triage_notes')->nullable();
            $table->string('triage_category')->nullable()->comment('Red, Orange, Yellow, Green, Blue');
            $table->integer('triage_score')->nullable()->comment('1-5 scale');
            $table->json('vital_signs')->nullable();
            $table->json('symptoms')->nullable();
            $table->json('diagnosis')->nullable();
            $table->string('icd10_code')->nullable()->comment('International Classification of Diseases');
            $table->json('treatment_plan')->nullable();

            // Provider Information
            $table->string('primary_provider')->nullable();
            $table->string('primary_provider_role')->nullable();
            $table->json('care_team')->nullable()->comment('Array of providers involved');

            // Visit Outcome
            $table->enum('visit_outcome', [
                'pending',
                'treated_discharged',
                'admitted',
                'referred_out',
                'transferred',
                'absconded',
                'expired',
                'completed'
            ])->default('pending');

            $table->text('outcome_notes')->nullable();
            $table->json('outcome_metrics')->nullable();
            $table->text('discharge_instructions')->nullable();
            $table->string('discharge_status')->nullable()->comment('planned, unplanned, against_medical_advice');

            // Follow-up
            $table->dateTime('scheduled_follow_up')->nullable();
            $table->boolean('follow_up_completed')->default(false);
            $table->text('follow_up_instructions')->nullable();

            // Patient Experience
            $table->integer('patient_satisfaction_score')->nullable()->comment('1-5 scale');
            $table->text('patient_feedback')->nullable();

            // Billing & Insurance
            $table->boolean('is_billed')->default(false);
            $table->decimal('total_cost', 12, 2)->nullable();
            $table->string('payment_status')->nullable()->comment('paid, pending, insurance, waived');
            $table->json('insurance_details')->nullable();

            // System Fields
            $table->foreignUuid('created_by')->constrained('users');
            $table->foreignUuid('updated_by')->nullable()->constrained('users');
            $table->foreignUuid('checked_in_by')->nullable()->constrained('users');
            $table->foreignUuid('checked_out_by')->nullable()->constrained('users');
            $table->foreignUuid('supervised_by')->nullable()->constrained('users');

            // Geolocation
            $table->decimal('checkin_latitude', 10, 8)->nullable();
            $table->decimal('checkin_longitude', 11, 8)->nullable();
            $table->string('checkin_location_name')->nullable();

            // Device & Source
            $table->string('device_id')->nullable();
            $table->string('ip_address')->nullable();
            $table->enum('source', ['web', 'mobile_app', 'tablet', 'api', 'offline_sync'])->default('web');

            // Emergency Contact
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('emergency_contact_relationship')->nullable();

            // Additional Fields
            $table->string('language_interpretation_needed')->nullable();
            $table->string('interpretation_language')->nullable();
            $table->string('visit_purpose')->nullable();
            $table->boolean('consent_obtained')->default(false);
            $table->dateTime('consent_obtained_at')->nullable();
            $table->string('consent_obtained_by')->nullable();

            // Clinical Notes
            $table->text('clinical_notes')->nullable();
            $table->text('nursing_notes')->nullable();

            // Metadata
            $table->json('metadata')->nullable()->comment('Additional visit data');

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('patient_id');
            $table->index('visit_number');
            $table->index('visit_type');
            $table->index('visit_status');
            $table->index('facility');
            $table->index('department');
            $table->index('check_in_time');
            $table->index('check_out_time');
            $table->index('is_admission');
            $table->index('visit_outcome');
            $table->index('priority');
            $table->index('primary_provider');
            $table->index('scheduled_follow_up');
            $table->index('referral_source');
            $table->index('referred_by');
            $table->index('referring_facility');
            $table->index('visit_purpose');
            $table->index('icd10_code');

            // Composite indexes
            $table->index(['patient_id', 'visit_status']);
            $table->index(['facility', 'department', 'visit_status']);
            $table->index(['check_in_time', 'check_out_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_visits');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('patient_id')->constrained()->onDelete('cascade');

            // Interaction Metadata
            $table->enum('interaction_type', [
                'community_screening',
                'cervical_screening',
                'cervical_treatment',
                'psychosocial_assessment',
                'ncd_management',
                'referral',
                'admission',
                'discharge',
                'mortality_review',
                'follow_up',
                'appointment',
                'lab_result',
                'medication_dispensed',
                'teleconsultation',
                'home_visit'
            ])->nullable(false);

            // Polymorphic relationship to reference any form/record
            $table->uuid('interactionable_id')->nullable();
            $table->string('interactionable_type')->nullable();

            // Interaction Details
            $table->dateTime('interaction_date')->nullable(false);
            $table->string('facility')->nullable();
            $table->string('department')->nullable();
            $table->string('ward')->nullable();
            $table->string('provider_name')->nullable();
            $table->string('provider_role')->nullable()->comment('CHW, Nurse, Clinical Officer, Doctor, Specialist');

            // Status Tracking
            $table->enum('status', [
                'scheduled',
                'in_progress',
                'completed',
                'cancelled',
                'rescheduled',
                'pending_review',
                'referred_out',
                'lost_to_follow_up'
            ])->default('scheduled');

            // Outcome & Notes
            $table->text('interaction_notes')->nullable();
            $table->text('clinical_summary')->nullable();
            $table->json('outcome_metrics')->nullable()->comment('Store key metrics from the interaction');

            // Referral Tracking
            $table->boolean('is_referral')->default(false);
            $table->string('referral_from')->nullable();
            $table->string('referral_to')->nullable();

            // Follow-up Tracking
            $table->dateTime('follow_up_date')->nullable();
            $table->boolean('follow_up_completed')->default(false);

            // Communication
            $table->boolean('sms_sent')->default(false);
            $table->timestamp('sms_sent_at')->nullable();
            $table->boolean('email_sent')->default(false);
            $table->timestamp('email_sent_at')->nullable();
            $table->boolean('patient_notified')->default(false);

            // Duration & Resources
            $table->integer('duration_minutes')->nullable()->comment('Duration of interaction in minutes');
            $table->json('resources_used')->nullable()->comment('Supplies, equipment, medications used');

            // System Fields
            $table->foreignUuid('created_by')->constrained('users');
            $table->foreignUuid('updated_by')->nullable()->constrained('users');
            $table->foreignUuid('supervised_by')->nullable()->constrained('users')->comment('Supervisor who reviewed this interaction');

            // Geolocation
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('location_name')->nullable();

            // Device & Source
            $table->string('device_id')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->enum('source', ['web', 'mobile_app', 'tablet', 'api', 'offline_sync'])->default('web');

            $table->timestamps();
            $table->softDeletes();

            // Indexes for performance
            $table->index('patient_id');
            $table->index('interaction_type');
            $table->index('interaction_date');
            $table->index('facility');
            $table->index('status');
            $table->index('provider_name');
            $table->index(['interactionable_id', 'interactionable_type']);
            $table->index('follow_up_date');
            $table->index('is_referral');
            $table->index('created_by');

            // Composite indexes for common queries
            $table->index(['patient_id', 'interaction_date']);
            $table->index(['interaction_type', 'status']);
            $table->index(['facility', 'department']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_interactions');
    }
};

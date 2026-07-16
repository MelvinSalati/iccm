<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For SQLite, we need to recreate the table
        if (DB::connection()->getDriverName() === 'sqlite') {
            // 1. Create a new table with the desired schema (ALL columns from original)
            Schema::create('event_data_new', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();

                // Event Classification
                $table->enum('source_type', [
                    'consultation',
                    'screening',
                    'laboratory',
                    'appointment',
                    'referral',
                    'treatment',
                    'follow_up',
                    'counseling',
                    'pharmacy',
                    'admission',
                    'discharge',
                    'registration',
                    'hiv_risk_assessment'
                ])->index();

                $table->string('event_type')->index();
                $table->string('sub_type')->nullable();

                // Status
                $table->enum('status', [
                    'pending',
                    'in_progress',
                    'completed',
                    'cancelled',
                    'no_show',
                    'pending_results',
                    'referred',
                    'treated',
                    'scheduled',
                    'confirmed'
                ])->default('pending')->index();

                // Dates
                $table->date('event_date')->index();
                $table->time('event_time')->nullable();
                $table->datetime('started_at')->nullable();
                $table->datetime('completed_at')->nullable();

                // Facility & Location - NOW NULLABLE
                $table->foreignId('facility_id')->nullable()->constrained('enrolled_facilities')->onDelete('cascade');
                $table->string('facility_code')->nullable();
                $table->string('department')->nullable();
                $table->string('ward')->nullable();

                // Location - NOW NULLABLE with default null
                $table->string('district')->nullable()->index();
                $table->string('province')->nullable()->index();
                $table->string('catchment_area')->nullable();

                // Entity (Patient/Client) - NOW NULLABLE
                $table->string('entity_id')->nullable()->index();
                $table->string('entity_type')->default('patient');
                $table->string('entity_name')->nullable();

                // Demographics
                $table->integer('age')->nullable();
                $table->string('gender')->nullable();
                $table->string('phone')->nullable();
                $table->string('nrc')->nullable();

                // Clinical Data
                $table->string('diagnosis')->nullable();
                $table->string('screening_type')->nullable()->index();
                $table->string('result')->nullable()->index();
                $table->date('result_date')->nullable();

                // Laboratory
                $table->string('test_type')->nullable();
                $table->string('test_result')->nullable();
                $table->decimal('test_value', 15, 2)->nullable();
                $table->string('test_units')->nullable();

                // HIV Specific
                $table->boolean('hiv_positive')->default(false)->index();
                $table->string('hiv_status')->nullable();
                $table->date('hiv_test_date')->nullable();

                // HPV Specific
                $table->string('hpv_strain')->nullable();
                $table->string('hpv_genotype')->nullable();

                // VIA Specific
                $table->string('via_findings')->nullable();

                // Breast Cancer
                $table->string('breast_exam_findings')->nullable();
                $table->boolean('family_history')->default(false);

                // Risk Assessment
                $table->json('risk_factors')->nullable();
                $table->string('risk_level')->nullable()->index();

                // Referral
                $table->string('referred_from')->nullable();
                $table->string('referred_to')->nullable();
                $table->string('referral_reason')->nullable();
                $table->date('referral_date')->nullable();
                $table->string('referral_status')->nullable();

                // Follow-up
                $table->date('follow_up_date')->nullable()->index();
                $table->string('follow_up_reason')->nullable();
                $table->string('follow_up_status')->nullable();

                // Treatment
                $table->string('treatment_given')->nullable();
                $table->text('treatment_notes')->nullable();
                $table->date('treatment_start_date')->nullable();
                $table->date('treatment_end_date')->nullable();

                // Staff
                $table->string('provider_name')->nullable();
                $table->string('performed_by')->nullable();
                $table->string('nurse_name')->nullable();
                $table->string('doctor_name')->nullable();

                // Notes
                $table->text('notes')->nullable();
                $table->text('clinical_notes')->nullable();
                $table->text('patient_notes')->nullable();

                // Aggregation Values
                $table->integer('count_value')->default(1);
                $table->decimal('numeric_value', 15, 2)->nullable();
                $table->decimal('monetary_value', 15, 2)->nullable();

                // Flexible Data
                $table->json('payload')->nullable();
                $table->json('metadata')->nullable();

                $table->timestamps();
                $table->softDeletes();

                // Strategic Indexes
                $table->index(['source_type', 'event_type']);
                $table->index(['facility_id', 'event_date']);
                $table->index(['event_type', 'result']);
                $table->index(['entity_id', 'event_date']);
                $table->index(['district', 'province', 'event_date']);
                $table->index(['source_type', 'status']);
                $table->index(['screening_type', 'result']);
                $table->index(['hiv_positive', 'event_date']);
                $table->index(['risk_level', 'event_date']);
            });

            // 2. Copy data from old table to new table
            // Get all columns from the original table
            $columns = [
                'id', 'uuid', 'source_type', 'event_type', 'sub_type', 'status',
                'event_date', 'event_time', 'started_at', 'completed_at',
                'facility_id', 'facility_code', 'department', 'ward',
                'district', 'province', 'catchment_area',
                'entity_id', 'entity_type', 'entity_name',
                'age', 'gender', 'phone', 'nrc',
                'diagnosis', 'screening_type', 'result', 'result_date',
                'test_type', 'test_result', 'test_value', 'test_units',
                'hiv_positive', 'hiv_status', 'hiv_test_date',
                'hpv_strain', 'hpv_genotype', 'via_findings',
                'breast_exam_findings', 'family_history',
                'risk_factors', 'risk_level',
                'referred_from', 'referred_to', 'referral_reason', 'referral_date', 'referral_status',
                'follow_up_date', 'follow_up_reason', 'follow_up_status',
                'treatment_given', 'treatment_notes', 'treatment_start_date', 'treatment_end_date',
                'provider_name', 'performed_by', 'nurse_name', 'doctor_name',
                'notes', 'clinical_notes', 'patient_notes',
                'count_value', 'numeric_value', 'monetary_value',
                'payload', 'metadata',
                'created_at', 'updated_at', 'deleted_at'
            ];

            $columnsList = implode(', ', $columns);
            DB::statement("INSERT INTO event_data_new ({$columnsList}) SELECT {$columnsList} FROM event_data");

            // 3. Drop old table
            Schema::dropIfExists('event_data');

            // 4. Rename new table to old name
            Schema::rename('event_data_new', 'event_data');
        } else {
            // For MySQL/PostgreSQL - just modify the columns
            Schema::table('event_data', function (Blueprint $table) {
                $table->string('district')->nullable()->change();
                $table->string('province')->nullable()->change();
                $table->foreignId('facility_id')->nullable()->change();
                $table->string('entity_id')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // For SQLite, we'd need to recreate with NOT NULL constraints
        // This is complex, so we'll just handle it
    }
};

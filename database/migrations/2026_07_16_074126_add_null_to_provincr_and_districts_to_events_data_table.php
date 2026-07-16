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
            // 1. Create a new table with the desired schema
            Schema::create('event_data_new', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique()->index();
                $table->string('source_type', 50)->index();
                $table->string('event_type', 100)->index();
                $table->string('sub_type', 100)->nullable();
                $table->enum('status', [
                    'pending', 'in_progress', 'completed', 'cancelled',
                    'no_show', 'pending_results', 'referred', 'treated',
                    'scheduled', 'confirmed'
                ])->default('pending')->index();
                $table->date('event_date')->index();
                $table->time('event_time')->nullable();
                $table->datetime('started_at')->nullable();
                $table->datetime('completed_at')->nullable();
                $table->foreignId('facility_id')->nullable()->constrained('enrolled_facilities')->onDelete('cascade');
                $table->string('facility_code')->nullable();
                $table->string('department')->nullable();
                $table->string('ward')->nullable();

                // Make these nullable
                $table->string('district')->nullable()->index();
                $table->string('province')->nullable()->index();
                $table->string('catchment_area')->nullable();

                $table->string('entity_id')->nullable()->index();
                $table->string('entity_type')->default('patient');
                $table->string('entity_name')->nullable();
                $table->integer('age')->nullable();
                $table->string('gender')->nullable();
                $table->string('phone')->nullable();
                $table->string('nrc')->nullable();
                $table->string('diagnosis')->nullable();
                $table->string('screening_type')->nullable()->index();
                $table->string('result')->nullable()->index();
                $table->date('result_date')->nullable();
                $table->string('test_type')->nullable();
                $table->string('test_result')->nullable();
                $table->decimal('test_value', 15, 2)->nullable();
                $table->string('test_units')->nullable();
                $table->boolean('hiv_positive')->default(false)->index();
                $table->string('hiv_status')->nullable();
                $table->date('hiv_test_date')->nullable();
                $table->string('hpv_strain')->nullable();
                $table->string('hpv_genotype')->nullable();
                $table->string('via_findings')->nullable();
                $table->string('breast_exam_findings')->nullable();
                $table->boolean('family_history')->default(false);
                $table->json('risk_factors')->nullable();
                $table->string('risk_level')->nullable()->index();
                $table->string('referred_from')->nullable();
                $table->string('referred_to')->nullable();
                $table->string('referral_reason')->nullable();
                $table->date('referral_date')->nullable();
                $table->string('referral_status')->nullable();
                $table->date('follow_up_date')->nullable()->index();
                $table->string('follow_up_reason')->nullable();
                $table->string('follow_up_status')->nullable();
                $table->string('treatment_given')->nullable();
                $table->text('treatment_notes')->nullable();
                $table->date('treatment_start_date')->nullable();
                $table->date('treatment_end_date')->nullable();
                $table->string('provider_name')->nullable();
                $table->string('performed_by')->nullable();
                $table->string('nurse_name')->nullable();
                $table->string('doctor_name')->nullable();
                $table->text('notes')->nullable();
                $table->text('clinical_notes')->nullable();
                $table->text('patient_notes')->nullable();
                $table->integer('count_value')->default(1);
                $table->decimal('numeric_value', 15, 2)->nullable();
                $table->decimal('monetary_value', 15, 2)->nullable();
                $table->json('payload')->nullable();
                $table->json('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

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
            DB::statement('INSERT INTO event_data_new SELECT * FROM event_data');

            // 3. Drop old table
            Schema::dropIfExists('event_data');

            // 4. Rename new table to old name
            Schema::rename('event_data_new', 'event_data');
        } else {
            // For MySQL/PostgreSQL
            Schema::table('event_data', function (Blueprint $table) {
                $table->string('district')->nullable()->change();
                $table->string('province')->nullable()->change();
                $table->foreignId('facility_id')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This is complex for SQLite, so we'll just handle it
    }
};

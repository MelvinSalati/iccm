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
        Schema::create('v2_integrated_screenings', function (Blueprint $table) {
            $table->id();
            // UUID references
            $table->uuid('patient_uuid');
            $table->uuid('visit_uuid');
            // Numeric IDs
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('visit_id');

            // User ID (Laravel default)
            $table->unsignedBigInteger('created_by');

            // Screening information
            $table->date('screening_date');
            $table->string('screening_method')->nullable();
            $table->string('screening_result')->nullable();
            $table->string('treatment_decision')->nullable();

            // Dashboard fields
            $table->boolean('is_positive')->default(false);
            $table->boolean('is_mental_health_flagged')->default(false);

            $table->date('follow_up_date')->nullable();

            $table->string('status')->default('submitted');

            // JSON payloads
            $table->json('metrics');
            $table->json('full_data');

            $table->timestamp('submitted_at')->nullable();

            $table->timestamps();

            /*
             |------------------------------------------------------------
             | Foreign Keys
             |------------------------------------------------------------
             */

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            /*
             |------------------------------------------------------------
             | Indexes
             |------------------------------------------------------------
             */

            $table->index('patient_uuid');
            $table->index('visit_uuid');

            $table->index('patient_id');
            $table->index('visit_id');

            $table->index('screening_result');
            $table->index('screening_method');
            $table->index('treatment_decision');

            $table->index('status');
            $table->index('follow_up_date');
            $table->index('is_positive');
            $table->index('is_mental_health_flagged');

            $table->index(['screening_date', 'is_positive']);
            $table->index(['screening_method', 'screening_result']);
            $table->index(['submitted_at', 'screening_method']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('v2_integrated_screenings');
    }
};

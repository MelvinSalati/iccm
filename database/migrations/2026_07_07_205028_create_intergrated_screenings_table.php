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
        // database/migrations/2024_01_01_create_integrated_screenings_table.php

        Schema::create('integrated_screenings', function (Blueprint $table) {
            $table->id('id');
            $table->uuid('patient_uuid');
            $table->uuid('visit_uuid');
            $table->integer('patient_id');
            $table->integer('visit_id');
            $table->date('screening_date');
            $table->string('screening_method')->nullable();
            $table->string('screening_result')->nullable();
            $table->string('treatment_decision')->nullable();
            $table->json('metrics'); // For quick dashboard queries
            $table->json('full_data'); // Full form data
            $table->uuid('created_by');
            $table->timestamp('submitted_at');
            $table->timestamps();

            // Indexes for dashboard performance
            $table->index(['submitted_at', 'screening_method']);
            $table->index('screening_result');
            $table->index('treatment_decision');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intergrated_screenings');
    }
};

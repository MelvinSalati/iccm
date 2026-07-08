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
        // 1. UNIFIED INTERACTION MASTER TABLE
        Schema::create('patient_interactions', function (Blueprint $table) {
            // Explicitly define UUID as the Primary Key
            $table->uuid('interaction_id')->primary();

            // Explicit UUID Foreign Key linking to your existing patient_visits table
            $table->uuid('visit_id');
            $table->foreign('visit_id')
                ->references('visit_id')
                ->on('patient_visits')
                ->onDelete('cascade');

            // Explicit UUID Foreign Key linking to your existing patient_registration table
            $table->uuid('patient_id');
            $table->foreign('patient_id')
                ->references('patient_id')
                ->on('patient_registration')
                ->onDelete('cascade');

            $table->string('interaction_type', 50); // e.g., 'Cervical_Screening', 'Mental_Health_Assessment'
            $table->string('provider_name', 100)->nullable();
            $table->text('notes')->nullable();

            $table->timestamp('interaction_timestamp')->useCurrent();
            $table->timestamps();

            // Indexes for fast querying
            $table->index(['patient_id', 'interaction_type']);
            $table->index('interaction_timestamp');
        });

        // 2. DYNAMIC INTERACTION DETAILS STORAGE (EAV Key-Value Store)
        Schema::create('interaction_details', function (Blueprint $table) {
            // Explicitly define UUID as the Primary Key
            $table->uuid('detail_id')->primary();

            // Explicit UUID Foreign Key linking to the master interactions table
            $table->uuid('interaction_id');
            $table->foreign('interaction_id')
                ->references('interaction_id')
                ->on('patient_interactions')
                ->onDelete('cascade');

            $table->string('attribute_key', 100);
            $table->text('attribute_value');
            $table->json('metadata_json')->nullable();

            $table->timestamps();

            // Composite unique constraint to prevent duplicate keys per interaction
            $table->unique(['interaction_id', 'attribute_key']);

            // Performance index for lookups during metrics generation
            $table->index(['attribute_key', 'attribute_value']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interaction_details');
        Schema::dropIfExists('patient_interactions');
    }
};

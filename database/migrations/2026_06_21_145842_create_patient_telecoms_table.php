<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_telecoms', function (Blueprint $table) {
            $table->id();

            // Foreign key to patients
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');

            // Telecom fields (FHIR compliant)
            $table->enum('system', ['phone', 'mobile', 'email', 'whatsapp', 'fax', 'sms']);
            $table->string('value');
            $table->enum('use', ['home', 'work', 'mobile', 'emergency', 'temporary']);
            $table->integer('rank')->default(0);

            // Is this the primary contact?
            $table->boolean('is_primary')->default(false);

            // Is this verified?
            $table->boolean('is_verified')->default(false);

            // Verified at timestamp
            $table->timestamp('verified_at')->nullable();

            // Additional metadata
            $table->json('metadata')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('value');
            $table->index('system');
            $table->index('is_primary');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_telecoms');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_addresses', function (Blueprint $table) {
            $table->id();

            // Foreign key to patients
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');

            // Address fields
            $table->string('province')->nullable();
            $table->string('district')->nullable();
            $table->string('chiefdom')->nullable();
            $table->string('village')->nullable();
            $table->string('ward')->nullable();
            $table->string('compound')->nullable();
            $table->string('landmark')->nullable();
            $table->string('postal_code')->nullable();

            // Address type (current, previous, etc.)
            $table->enum('address_type', ['current', 'previous', 'permanent', 'temporary'])->default('current');

            // Is this the primary address?
            $table->boolean('is_primary')->default(true);

            // Additional metadata
            $table->json('metadata')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('province');
            $table->index('district');
            $table->index('is_primary');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_addresses');
    }
};

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
        Schema::create('enrolled_facilities', function (Blueprint $table) {
            $table->id();

            // Facility information
            $table->uuid('facility_uuid')->nullable();
            $table->string('name')->nullable();
            $table->string('code')->unique()->nullable();
            $table->enum('type', ['hospital', 'urban_health_center', 'rural_health_center', 'district_hospital'])->nullable();
            $table->string('district')->nullable();
            $table->string('province')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active')->nullable();

            // Foreign keys for relationships
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps();

            // Indexes for better performance
            $table->index(['district', 'province']);
            $table->index('status');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrolled_facilities');
    }
};

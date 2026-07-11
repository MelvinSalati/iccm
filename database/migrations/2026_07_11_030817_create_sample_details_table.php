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
        Schema::create('sample_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('laboratory_order_id')->constrained('laboratory_orders')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('assessed_by')->constrained('users')->onDelete('cascade');
            $table->enum('sample_quality', ['adequate', 'inadequate', 'unsatisfactory'])->default('adequate');
            $table->text('quality_notes')->nullable();
            $table->enum('assessment_status', ['pending', 'assessed', 'rejected'])->default('pending');
            $table->boolean('is_hemolyzed')->default(false);
            $table->boolean('is_icteric')->default(false);
            $table->boolean('is_lipemic')->default(false);
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sample_details');
    }
};

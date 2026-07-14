<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sample_quality_assessments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('laboratory_order_id');
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('assessed_by');
            $table->enum('sample_quality', ['adequate', 'inadequate', 'unsatisfactory'])->default('adequate');
            $table->text('quality_notes')->nullable();
            $table->enum('assessment_status', ['assessed', 'pending', 'rejected'])->default('assessed');

            // Histopathology specific fields
            $table->enum('tissue_adequacy', ['adequate', 'inadequate', 'marginal'])->nullable();
            $table->enum('representative_sampling', ['yes', 'no', 'uncertain'])->nullable();
            $table->enum('fixation_quality', ['good', 'fair', 'poor'])->nullable();
            $table->string('fixation_medium')->nullable();
            $table->string('fixative_ratio')->nullable();
            $table->enum('specimen_integrity', ['intact', 'compromised', 'damaged'])->nullable();

            $table->boolean('identification_verified')->default(false);
            $table->boolean('container_leak_proof')->default(false);
            $table->boolean('crushing_artifacts')->default(false);
            $table->boolean('needs_special_handling')->default(false);
            $table->text('special_handling_details')->nullable();

            $table->text('rejection_reason')->nullable();

            $table->timestamps();

            $table->foreign('laboratory_order_id')->references('id')->on('laboratory_orders')->onDelete('cascade');
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('assessed_by')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('sample_quality_assessments');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('indicators', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();

            // Basic Info
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();

            // Category
            $table->string('category')->nullable()->index(); // cervical_cancer, breast_cancer, hiv_aids, general

            // Data Source
            $table->string('source_type')->nullable()->index(); // screening, laboratory, consultation, referral
            $table->string('event_type')->nullable()->index(); // hpv_screening, hiv_test, etc.
            $table->string('result_filter')->nullable(); // positive, negative, abnormal

            // Calculation
            $table->enum('calculation_type', [
                'count',
                'percentage',
                'rate',
                'ratio',
                'sum',
                'average',
                'numerator_denominator'
            ])->default('count');

            $table->json('numerator_definition')->nullable();
            $table->json('denominator_definition')->nullable();

            // Targets
            $table->decimal('target_value', 15, 2)->nullable();
            $table->decimal('target_min', 15, 2)->nullable();
            $table->decimal('target_max', 15, 2)->nullable();

            // Thresholds
            $table->decimal('threshold_green', 15, 2)->default(80);
            $table->decimal('threshold_yellow', 15, 2)->default(60);
            $table->decimal('threshold_red', 15, 2)->default(40);

            // Time Period
            $table->enum('time_period', ['daily', 'weekly', 'monthly', 'quarterly', 'annual'])->default('monthly');

            // Classification
            $table->boolean('is_kpi')->default(false);
            $table->boolean('is_public')->default(false);

            // Status
            $table->enum('status', ['active', 'inactive', 'draft'])->default('draft');

            $table->timestamps();
            $table->softDeletes();

            $table->index(['source_type', 'event_type']);
            $table->index(['category', 'is_kpi']);
            $table->index(['status', 'is_kpi']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('indicators');
    }
};

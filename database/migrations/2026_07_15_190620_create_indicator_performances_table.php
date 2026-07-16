<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('indicator_performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('indicator_id')->constrained('indicators')->onDelete('cascade');
            $table->foreignId('facility_id')->constrained('enrolled_facilities')->onDelete('cascade');

            $table->string('period')->index(); // monthly, quarterly, annual
            $table->date('period_date')->index();

            $table->decimal('actual_value', 15, 2);
            $table->decimal('target_value', 15, 2)->nullable();
            $table->decimal('percentage_achieved', 15, 2)->nullable();

            $table->enum('status', ['on_track', 'at_risk', 'behind', 'critical', 'exceeded'])->default('on_track');

            $table->json('metadata')->nullable();
            $table->datetime('calculated_at');

            $table->timestamps();

            $table->unique(['indicator_id', 'facility_id', 'period', 'period_date'], 'indicator_performance_unique');
            $table->index(['facility_id', 'period_date']);
            $table->index(['status', 'period_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('indicator_performance');
    }
};

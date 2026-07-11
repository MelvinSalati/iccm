<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('visit_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('facility_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('provider_id')->nullable()->constrained()->nullOnDelete();

            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->string('appointment_type', 100);
            $table->enum('appointment_status', ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])->default('scheduled');
            $table->enum('priority', ['routine', 'urgent', 'emergency'])->default('routine');
            $table->string('department', 100)->nullable();
            $table->string('doctor_name', 255)->nullable();
            $table->text('reason')->nullable();
            $table->text('notes')->nullable();
            $table->string('province_code', 50)->nullable();
            $table->string('district_code', 50)->nullable();
            $table->integer('duration_minutes')->default(30);

            $table->boolean('reminder_sent')->default(false);
            $table->boolean('sms_sent')->default(false);
            $table->boolean('email_sent')->default(false);

            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancelled_reason')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('no_show_at')->nullable();

            $table->softDeletes();
            $table->timestamps();

            $table->index(['appointment_date', 'appointment_status']);
            $table->index(['patient_id', 'appointment_date']);
            $table->index('visit_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};

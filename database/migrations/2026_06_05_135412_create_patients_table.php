<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();

            // User who registered
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // ============================================
            // DEMOGRAPHICS
            // ============================================
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other', 'unknown']);
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed', 'separated'])->nullable();
            $table->string('nrc_number')->nullable()->unique();
            $table->string('phone_number')->nullable();

            // ============================================
            // STATUS & TIMESTAMPS
            // ============================================
            $table->boolean('is_active')->default(true);
            $table->timestamp('registered_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // ============================================
            // INDEXES
            // ============================================
            $table->index(['first_name', 'last_name']);
            $table->index('nrc_number');
            $table->index('phone_number');
            $table->index('is_active');
            $table->index('registered_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};

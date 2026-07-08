<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
//        Schema::create('facilities', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('district_id')->constrained('districts')->onDelete('cascade');
//            $table->string('name', 255);
//            $table->string('code', 50)->nullable();
//            $table->string('type', 50)->nullable();
//            $table->string('ownership', 50)->nullable();
//            $table->decimal('latitude', 10, 8)->nullable();
//            $table->decimal('longitude', 11, 8)->nullable();
//            $table->string('phone', 20)->nullable();
//            $table->string('email', 100)->nullable();
//            $table->text('address')->nullable();
//            $table->boolean('is_active')->default(true);
//            $table->timestamps();
//
//            $table->index('name');
//            $table->index('district_id');
//            $table->index('type');
//            $table->unique(['district_id', 'name']);
//        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};

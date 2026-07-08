<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
//        Schema::create('provinces', function (Blueprint $table) {
//            $table->id();
//            $table->string('name', 100);
//            $table->string('code', 10)->unique();
//            $table->decimal('latitude', 10, 8)->nullable();
//            $table->decimal('longitude', 11, 8)->nullable();
//            $table->boolean('is_active')->default(true);
//            $table->timestamps();
//
//            $table->index('name');
//            $table->index('code');
//        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};

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
        Schema::table('v2_integrated_screenings', function (Blueprint $table) {
            $table->dropColumn('metrics');
            $table->dropColumn('full_data');
        });
        Schema::table('v2_integrated_screenings', function (Blueprint $table) {
            $table->text('metrics')->nullable();
            $table->text('full_data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

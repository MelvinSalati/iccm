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
        Schema::table('patient_visits', function (Blueprint $table) {
            // Add missing referral fields
            $table->string('referral_source')->nullable();
            $table->string('referral_reason')->nullable();
            $table->string('referral_type')->nullable()->comment('internal, external, self');
            $table->string('referred_by')->nullable()->comment('Name of referring person/entity');
            $table->string('referring_facility')->nullable();
            $table->string('referring_doctor')->nullable();

            // Add indexes for the new columns
            $table->index('referral_source');
            $table->index('referred_by');
            $table->index('referring_facility');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_visits', function (Blueprint $table) {
            $table->dropColumn([
                'referral_source',
                'referral_reason',
                'referral_type',
                'referred_by',
                'referring_facility',
                'referring_doctor',
            ]);
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('community_outreaches', function (Blueprint $table) {
            $table->id();

            // Outreach Details
            $table->date('outreach_date');
            $table->string('community_name', 255);
            $table->string('chw_name', 255);
            $table->string('outreach_type', 100);
            $table->string('facility', 255);
            $table->string('province_code', 50)->nullable();
            $table->string('district_code', 50)->nullable();

            // Services Provided (JSON)
            $table->json('services')->nullable();
            $table->json('service_counts')->nullable();

            // Outputs
            $table->boolean('referred_for_screening')->default(false);
            $table->boolean('awareness_session_conducted')->default(false);
            $table->integer('women_reached')->default(0);
            $table->integer('total_beneficiaries')->default(0);
            $table->integer('men_reached')->default(0);

            // Referral Information
            $table->boolean('referral_required')->default(false);
            $table->string('referred_facility')->nullable();
            $table->date('referral_date')->nullable();
            $table->string('referral_outcome')->nullable();
            $table->enum('referral_status', ['pending', 'completed', 'not_required'])->default('not_required');

            // Timestamps
            $table->timestamps();

            // Indexes for faster queries
            $table->index('outreach_date');
            $table->index('facility');
            $table->index('referral_status');
        });
    }

    public function down()
    {
        Schema::dropIfExists('community_outreaches');
    }
};

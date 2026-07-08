<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            // Identity
            $table->string('first_name')->after('id')->nullable();
            $table->string('last_name')->after('first_name')->nullable();

            $table->string('employee_number')
                ->nullable()
                ->unique()
                ->after('email');

            // Contact
            $table->string('phone', 20)
                ->nullable()
                ->after('employee_number');

            $table->string('alternative_phone', 20)
                ->nullable()
                ->after('phone');

            // Demographics
            $table->enum('gender', [
                'male',
                'female'
            ])->nullable();

            $table->date('date_of_birth')
                ->nullable();

            $table->text('address')
                ->nullable();

            // Professional Information
            $table->string('designation')
                ->nullable();

            $table->string('cadre')
                ->nullable();

            $table->string('professional_registration_no')
                ->nullable();

            $table->string('department')
                ->nullable();

            // Administrative Assignment
            $table->unsignedBigInteger('province_id')
                ->nullable();

            $table->unsignedBigInteger('district_id')
                ->nullable();

            $table->unsignedBigInteger('facility_id')
                ->nullable();

            // Employment
            $table->date('employment_date')
                ->nullable();

            $table->boolean('is_active')
                ->default(true);

            $table->boolean('is_verified')
                ->default(false);

            // Security
            $table->timestamp('last_login_at')
                ->nullable();

            $table->string('last_login_ip')
                ->nullable();

            // Media
            $table->string('profile_photo')
                ->nullable();

            // Misc
            $table->json('settings')
                ->nullable();

            $table->json('metadata')
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn([
                'first_name',
                'last_name',
                'employee_number',
                'phone',
                'alternative_phone',
                'gender',
                'date_of_birth',
                'address',
                'designation',
                'cadre',
                'professional_registration_no',
                'department',
                'province_id',
                'district_id',
                'facility_id',
                'employment_date',
                'is_active',
                'is_verified',
                'last_login_at',
                'last_login_ip',
                'profile_photo',
                'settings',
                'metadata',
            ]);
        });
    }
};

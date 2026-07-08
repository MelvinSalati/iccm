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
        // Drop existing table if it exists
        Schema::dropIfExists('provinces');

        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('code', 10)->unique();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('name');
            $table->index('code');
        });

        // Insert all provinces with codes
        $provinces = [
            ['name' => 'Central', 'code' => 'CE'],
            ['name' => 'Copperbelt', 'code' => 'CB'],
            ['name' => 'Eastern', 'code' => 'EA'],
            ['name' => 'Luapula', 'code' => 'LP'],
            ['name' => 'Lusaka', 'code' => 'LS'],
            ['name' => 'Muchinga', 'code' => 'MU'],
            ['name' => 'Northern', 'code' => 'NO'],
            ['name' => 'North-Western', 'code' => 'NW'],
            ['name' => 'Southern', 'code' => 'SO'],
            ['name' => 'Western', 'code' => 'WE'],
        ];

        foreach ($provinces as $province) {
            DB::table('provinces')->insert(array_merge($province, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};

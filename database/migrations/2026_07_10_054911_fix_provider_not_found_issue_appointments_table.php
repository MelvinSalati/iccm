<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['provider_id']);

            // Re-add it referencing users table
            $table->foreign('provider_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['provider_id']);
            // Restore original constraint if needed
        });
    }
};

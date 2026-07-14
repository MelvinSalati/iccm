<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('laboratory_orders', function (Blueprint $table) {
            $table->enum('sample_status', ['accepted', 'rejected', 'pending_review'])->nullable()->after('status');
            $table->string('result_category')->nullable()->after('results');
            $table->text('diagnosis')->nullable()->after('result_category');
            $table->text('result_notes')->nullable()->after('diagnosis');
            $table->timestamp('processed_at')->nullable()->after('processed_by');
        });
    }

    public function down()
    {
        Schema::table('laboratory_orders', function (Blueprint $table) {
            $table->dropColumn(['sample_status', 'result_category', 'diagnosis', 'result_notes', 'processed_at']);
        });
    }
};

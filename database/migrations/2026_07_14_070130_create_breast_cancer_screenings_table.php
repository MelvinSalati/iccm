<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
Schema::create('breast_cancer_screenings', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->foreignId('patient_id')->constrained();
$table->string('screening_type');
$table->string('result');
$table->boolean('is_positive')->default(false);
$table->date('screening_date');
$table->string('stage_group')->nullable();
$table->integer('er_status')->nullable();
$table->integer('pr_status')->nullable();
$table->integer('her2_status')->nullable();
$table->json('full_data')->nullable();
$table->foreignId('submitted_by')->constrained('users');
$table->timestamps();
$table->softDeletes();

$table->index(['patient_id', 'screening_date']);
$table->index('result');
$table->index('stage_group');
});
}

public function down()
{
Schema::dropIfExists('breast_cancer_screenings');
}
};

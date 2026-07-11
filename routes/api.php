<?php

use App\Domains\Patients\Controllers\LocationController;
use App\Domains\Patients\Controllers\PatientController;
use App\Http\Controllers\Appointments\AppointmentController;
use App\Http\Controllers\Pathology\laboratoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Domains\Patients\Actions\CreateVisitAction;
use App\Http\Controllers\VitalsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::prefix('v1/registry')->group(function () {
    Route::post('/search', [PatientController::class, 'search']);
});


Route::prefix('v1/patients')->group(function () {
   /**
   *   start a visit return to patients
    * */
   Route::post('/{patientUuid}/visit', [CreateVisitAction::class, 'execute']);
    Route::post('/{patientuuid}/visit/{visitId}/screening/integrated', [\App\Http\Controllers\IntegratedScreeningController::class, 'store']);
    // Current vitals
    Route::get('/{patientuuid}/vitals/current', [VitalsController::class, 'current'])->name('vitals.current');

    // Vitals history
    Route::get('/{patientuuid}/vitals/history', [VitalsController::class, 'history'])->name('vitals.history');

    // Vitals statistics
    Route::get('/{patientuuid}/vitals/stats', [VitalsController::class, 'stats'])->name('vitals.stats');

    // Vitals for specific visit
    Route::get('/{patientuuid}/visit/{visitId}/vitals', [VitalsController::class, 'forVisit'])->name('vitals.for-visit');

    // Store vitals (for a visit)
    Route::post('/{patientuuid}/visit/{visitId}/vitals', [VitalsController::class, 'store'])->name('vitals.store');
// Route::post('/{patientuuid}/l', [LaboratoryController::class, 'store']);
    // Update specific vitals record
    Route::put('/{patientuuid}/vitals/{vitalId}', [VitalsController::class, 'update'])->name('vitals.update');
});

/*
 *  Appointments
 * **/

Route::prefix('v1/appointments')->group(function () {
    Route::post('/create', [AppointmentController::class, 'createAppointment']);
});
Route::get('v1/locations/provinces', [LocationController::class, 'getProvinces']);
Route::get('v1/locations/districts', [LocationController::class, 'getDistricts']);
Route::get('v1/locations/facilities', [LocationController::class, 'getFacilities']);


Route::prefix('v1/laboratory')->group(function () {
    Route::post('/orders', [LaboratoryController::class, 'createOrder']);
    Route::post('/orders/{orderId}/sample-assessment', [LaboratoryController::class, 'sampleAssessment']);
    Route::post('/orders/{orderId}/results', [LaboratoryController::class, 'enterResults']);
});


Route::post('/v1/community-outreach',[\App\Http\Controllers\CommunityEngagement\AggregateController::class,'store']);
Route::get('/community/engagement',[\App\Http\Controllers\CommunityEngagement\AggregateController::class,'index']);

<?php

use App\Domains\Patients\Controllers\LocationController;
use App\Domains\Patients\Controllers\PatientController;
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

    // Update specific vitals record
    Route::put('/{patientuuid}/vitals/{vitalId}', [VitalsController::class, 'update'])->name('vitals.update');
});
Route::get('v1/locations/provinces', [LocationController::class, 'getProvinces']);
Route::get('v1/locations/districts', [LocationController::class, 'getDistricts']);
Route::get('v1/locations/facilities', [LocationController::class, 'getFacilities']);

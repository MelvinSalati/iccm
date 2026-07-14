<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Patients\CreateController as PatientCreate;
use App\Domains\Patients\Controllers\PatientController;
use Inertia\Inertia;
use App\Http\Controllers\BreastCancerController;
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');

    Route::prefix('patients')->group(function () {
        // Web routes
        Route::get('/', [PatientController::class, 'index'])->name('patients.index');
        Route::get('/search', function () {
            return Inertia::render('patients/search');
        })->name('patients.search');
        Route::get('/create', function () {
            return Inertia::render('patients/Create');
        })->name('patients.create');
        Route::post('/register', [PatientController::class, 'store'])->name('patients.store');
        Route::get('/{uuid}', [PatientController::class, 'show'])->name('patients.show');
        Route::put('/{uuid}', [PatientController::class, 'update'])->name('patients.update');
        Route::delete('/{uuid}', [PatientController::class, 'destroy'])->name('patients.destroy');
        Route::get('/registry/{uuid}', [PatientController::class, 'registry'])->name('patients.registry');
        Route::get('/{uuid}/visit/{visitId}',[PatientController::class,'visitInteractions']);
        Route::get('/registry/new',[PatientController::class,'create']);
        Route::get('/{uuid}/medications',[PatientController::class,'medications']);
        Route::get('/{uuid}/appointments',[PatientController::class,'appointments']);
        Route::get('/{uuid}/referrals',[PatientController::class,'referral']);
        Route::get('/{uuid}/risk-assessment',[PatientController::class,'riskAssessment']);
        Route::get('/{uuid}/lab',[PatientController::class,'labs']);
        Route::get('/{uuid}/breast-cancer',[PatientController::class,'viewBreastCancerScreening']);
        Route::get('/{uuid}/breast-cancer/screening',[PatientController::class,'screening']);
        Route::get('/{uuid}/breast-cancer/imaging',[PatientController::class,'imaging']);
        Route::get('/{uuid}/breast-cancer/treatment',[PatientController::class,'treatment']);
        Route::get('/{uuid}/breast-cancer/biopsy',[PatientController::class,'biopsy']);
    });


    /*
    |--------------------------------------------------------------------------
    | Breast Cancer Screening Routes
    |--------------------------------------------------------------------------
    */

// Main index page - list all screenings


// Create new screening form
    Route::get('/breast-cancer/new', [BreastCancerController::class, 'create'])
        ->name('breast-cancer.create')
        ->middleware(['auth', 'verified']);

// Store new screening
    Route::post('/breast-cancer/screening', [BreastCancerController::class, 'store'])
        ->name('breast-cancer.store')
        ->middleware(['auth', 'verified']);

// View single screening details
    Route::get('/breast-cancer/{id}', [BreastCancerController::class, 'show'])
        ->name('breast-cancer.show')
        ->middleware(['auth', 'verified']);

// Edit screening
    Route::get('/breast-cancer/{id}/edit', [BreastCancerController::class, 'edit'])
        ->name('breast-cancer.edit')
        ->middleware(['auth', 'verified']);

// Update screening
    Route::put('/breast-cancer/{id}', [BreastCancerController::class, 'update'])
        ->name('breast-cancer.update')
        ->middleware(['auth', 'verified']);

// Delete screening
    Route::delete('/breast-cancer/{id}', [BreastCancerController::class, 'destroy'])
        ->name('breast-cancer.destroy')
        ->middleware(['auth', 'verified']);

// Export screenings to CSV
    Route::get('/breast-cancer/export', [BreastCancerController::class, 'export'])
        ->name('breast-cancer.export')
        ->middleware(['auth', 'verified']);

});

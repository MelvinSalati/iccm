<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Patients\CreateController as PatientCreate;
use App\Domains\Patients\Controllers\PatientController;
use Inertia\Inertia;

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
    });

    // API routes for patient search (must be before the {uuid} route to avoid conflicts)

});

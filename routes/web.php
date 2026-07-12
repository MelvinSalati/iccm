<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CommunityOutreachController;
use App\Http\Controllers\Patients\CreateController as PatientCreate;
use App\Http\Controllers\Consultancies\ConsultancyController;
use App\Http\Controllers\Pathology\LaboratoryController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'data' => [],
        ]);
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Patient
    |--------------------------------------------------------------------------
    */

    Route::prefix('patient')->group(function () {
        Route::get('/create', [PatientCreate::class, 'index'])
            ->name('patient.create');
    });

    /*
    |--------------------------------------------------------------------------
    | Community
    |--------------------------------------------------------------------------
    */

    Route::get('/community', function () {
        return Inertia::render('Community/community', [
            'aggregates' => \App\Models\CommunityAggregate::all(),
        ]);
    })->name('community');

    Route::resource('community-outreach', CommunityOutreachController::class)
        ->except(['create', 'edit']);

    /*
    |--------------------------------------------------------------------------
    | Consultancies
    |--------------------------------------------------------------------------
    */

    Route::get('/consultancy/{facilityId}', [ConsultancyController::class, 'viewConsultancy'])
        ->name('consultancy.index');

    /*
    |--------------------------------------------------------------------------
    | Referrals
    |--------------------------------------------------------------------------
    */

    Route::get('/referrals', function () {
        return Inertia::render('Referral/referral', [
            'referral' => [],
        ]);
    })->name('referrals');

    /*
    |--------------------------------------------------------------------------
    | Mental Health
    |--------------------------------------------------------------------------
    */

    Route::get('/mental-health', function () {
        return Inertia::render('Mental/mental', [
            'referral' => [],
        ]);
    })->name('mental-health');

    /*
    |--------------------------------------------------------------------------
    | Mortality
    |--------------------------------------------------------------------------
    */

    Route::get('/mortality', function () {
        return Inertia::render('Mortality/review', [
            'referral' => [],
        ]);
    })->name('mortality');

    /*
    |--------------------------------------------------------------------------
    | Admissions
    |--------------------------------------------------------------------------
    */

    Route::get('/admissions', function () {
        return Inertia::render('Admissions/admission');
    })->name('admissions');

    /*
    |--------------------------------------------------------------------------
    | Discharges
    |--------------------------------------------------------------------------
    */

    Route::get('/discharges', function () {
        return Inertia::render('Discharges/discharges', [
            'discharges' => [],
        ]);
    })->name('discharges');

    /*
    |--------------------------------------------------------------------------
    | Appointments
    |--------------------------------------------------------------------------
    */

    Route::get('/appointments', function () {
        return Inertia::render('Appointments/appointments');
    })->name('appointments');

    /*
    |--------------------------------------------------------------------------
    | Laboratory
    |--------------------------------------------------------------------------
    */

    Route::prefix('laboratory')->group(function () {
        Route::get('/orders', [LaboratoryController::class, 'viewLaboratoryOrders'])
            ->name('laboratory.orders');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/Patient.php';

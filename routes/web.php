<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\CommunityOutreachController;
use App\Http\Controllers\Patients\CreateController as PatientCreate;
use App\Http\Controllers\Consultancies\ConsultancyController;
use App\Http\Controllers\Pathology\LaboratoryController;
use App\Http\Controllers\ImageController;

// ============================================
// IMAGE ROUTE - Place this BEFORE any auth middleware
// ============================================
//Route::get('/{path}', [ImageController::class, 'show'])
//    ->where('path', '.*')
//    ->name('image.show');

// ============================================
// PUBLIC ROUTES
// ============================================
Route::inertia('/', 'welcome')->name('home');

// ============================================
// AUTHENTICATED ROUTES
// ============================================
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

    Route::get('/admin',function(){
        return Inertia::render('admin/admin-dashboard');
    });
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

    Route::get('/appointments',[\App\Http\Controllers\Appointments\AppointmentController::class,'viewAppointment'])->name('appointments');

    /*
    |--------------------------------------------------------------------------
    | Laboratory
    |--------------------------------------------------------------------------
    */

    Route::prefix('laboratory')->group(function () {
        Route::get('/orders', [LaboratoryController::class, 'viewLaboratoryOrders'])
            ->name('laboratory.orders');
    });

    /*
    |--------------------------------------------------------------------------
    | Consultations
    |--------------------------------------------------------------------------
    */
    Route::get('/consultations', function () {
        return Inertia::render('consultations', [
            'consultationEvents' => \App\Models\Consultation::all(),
        ]);
    })->name('consultations');
});

Route::get('manage-reports',function (){
    Inertia::render('Reports/index.tsx');
});


/// Test
///
///
// routes/web.php

use App\Http\Controllers\BreastCancerController;

// Breast Cancer Routes
Route::prefix('breast-cancer')->group(function () {
    Route::get('/', [BreastCancerController::class, 'index'])->name('breast-cancer.index');
    Route::get('/create', [BreastCancerController::class, 'create'])->name('breast-cancer.create');
    Route::post('/screening', [BreastCancerController::class, 'store'])->name('breast-cancer.store');
    Route::get('/{id}', [BreastCancerController::class, 'show'])->name('breast-cancer.show');
    Route::get('/{id}/edit', [BreastCancerController::class, 'edit'])->name('breast-cancer.edit');
    Route::put('/{id}', [BreastCancerController::class, 'update'])->name('breast-cancer.update');
    Route::delete('/{id}', [BreastCancerController::class, 'destroy'])->name('breast-cancer.destroy');
    Route::get('/export', [BreastCancerController::class, 'export'])->name('breast-cancer.export');
    Route::get('/stats', [BreastCancerController::class, 'stats'])->name('breast-cancer.stats');
});

// Patient-specific breast cancer routes
Route::prefix('patients/{uuid}')->group(function () {
    Route::get('/breast-cancer', [BreastCancerController::class, 'patientScreenings'])
        ->name('patients.breast-cancer');
    Route::post('/breast-cancer', [BreastCancerController::class, 'storeForPatient'])
        ->name('patients.breast-cancer.store');
});

// Search patients
Route::get('/patients/search', [BreastCancerController::class, 'searchPatients'])
    ->name('patients.search');
require __DIR__.'/settings.php';
require __DIR__.'/Patient.php';
require __DIR__.'/admin.php';

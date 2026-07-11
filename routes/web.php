<?php

use App\Http\Controllers\Pathology\laboratoryController as LaboratoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Patients\CreateController as PatientCreate;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard'); // Fixed: Was missing slash in path
    Route::prefix('patient')->group(function () {
        Route::get('/create', [PatientCreate::class, 'index']); // Fixed: Class name must be fully qualified
    });

    Route::get('/referrals',function (){
        return \Inertia\Inertia::render('Referral/referral',[
            'referral' =>  []
        ]);
    });
    /**
     *
     * mental routes
     */
    Route::get('/mental-health',function (){
        return \Inertia\Inertia::render('Mental/mental',[
            'referral' =>  []
        ]);
    });
    /***
     *  Consulktancy
     *
     */
    Route::get('/consultancy/{facilityId}',[\App\Http\Controllers\Consultancies\ConsultancyController::class,'viewConsultancy']);
    /**
     *  Mortality
     */
    Route::get('/mortality',function (){
        return \Inertia\Inertia::render('Mortality/review',[
            'referral' =>  []
        ]);
    });
    /**
     *
     *  Admissions
     */
    Route::get('/admissions',function (){
        return \Inertia\Inertia::render('admissions/admission',[
            'referral' =>  []
        ]);
    });
    /**
     * Discharge routes
    **/
    Route::get('/discharges',function (){
        return \Inertia\Inertia::render('Discharges/discharges',[
            'discharges' =>  []
        ]);
    });
    Route::get('/community',function (){
        return \Inertia\Inertia::render('Community/community',[]);
    });
    Route::get('/referrals',function (){
        return \Inertia\Inertia::render('Appointments/appointments');
    });

    Route::get('/appointments',function (){
        return \Inertia\Inertia::render('Appointments/appointments');
    });

    /**
     * laboratory
     */

    // In routes/web.php or routes/api.php
    Route::prefix('laboratory')->group(function () {
       Route::get('/orders', [LaboratoryController::class, 'viewLaboratoryOrders']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/Patient.php';

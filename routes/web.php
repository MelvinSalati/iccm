<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Patients\CreateController as PatientCreate;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard'); // Fixed: Was missing slash in path

    Route::prefix('patient')->group(function () {
        Route::get('/create', [PatientCreate::class, 'index']); // Fixed: Class name must be fully qualified
    });

    Route::get('/referrals',function (){
        return \Inertia\Inertia::render('Referral/referral');
    });
    Route::get('/referrals',function (){
        return \Inertia\Inertia::render('Appointments/appointments');
    });

    Route::get('/appointments',function (){
        return \Inertia\Inertia::render('Appointments/appointments');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/Patient.php';

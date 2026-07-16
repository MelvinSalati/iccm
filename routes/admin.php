<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\EventDataController;
use App\Http\Controllers\Admin\IndicatorController;
use App\Http\Controllers\Admin\EnrolledFacilityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes (Inertia Pages)
|--------------------------------------------------------------------------
*/
Route::prefix('admin/')->middleware(['auth', 'verified'])->group((function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard']);
    Route::get('manage-facility', [DashboardController::class, 'viewFacilities']);
    Route::get('indicators', [DashboardController::class, 'indicators']);
    Route::get('kpi', [DashboardController::class, 'kpi']);
    Route::get('events', [DashboardController::class, 'events']);
    Route::get('reports', [DashboardController::class, 'reports']);
}));




Route::prefix('v1/admin')->group(function () {
    Route::get('/dashboard/summary', [DashboardController::class, 'getSummary']);
    Route::get('/dashboard/screenings', [DashboardController::class, 'getScreenings']);
    Route::get('/dashboard/trends', [DashboardController::class, 'getTrends']);
    Route::get('/dashboard/geographic', [DashboardController::class, 'getGeographicData']);
    Route::get('/dashboard/appointments', [DashboardController::class, 'getAppointments']);
    Route::get('/dashboard/screening-details', [DashboardController::class, 'getScreeningDetails']);
    Route::get('/facilities', [DashboardController::class, 'getFacilities']);
});
Route::prefix('v1/admin')->group(function () {
    // Dashboard routes
    Route::get('/dashboard/summary', [DashboardController::class, 'getSummary']);
    Route::get('/dashboard/screenings', [DashboardController::class, 'getScreenings']);
    Route::get('/dashboard/trends', [DashboardController::class, 'getTrends']);
    Route::get('/dashboard/geographic', [DashboardController::class, 'getGeographicData']);
    Route::get('/dashboard/screening-details', [DashboardController::class, 'getScreeningDetails']);
    Route::get('/dashboard/appointments', [DashboardController::class, 'getAppointments']);
   Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard/summary', [DashboardController::class, 'getSummary']);
    Route::get('/dashboard/screenings', [DashboardController::class, 'getScreenings']);
    Route::get('/dashboard/laboratory', [DashboardController::class, 'getLaboratory']);
    Route::get('/dashboard/referrals', [DashboardController::class, 'getReferrals']);
    Route::get('/dashboard/indicators', [DashboardController::class, 'getIndicators']);
    Route::get('/dashboard/recent-events', [DashboardController::class, 'getRecentEvents']);
    Route::get('/dashboard/trends', [DashboardController::class, 'getTrends']);
    Route::get('/dashboard/debug', [DashboardController::class, 'debugScreenings']);
});

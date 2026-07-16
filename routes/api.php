<?php

use App\Domains\Patients\Controllers\LocationController;
use App\Domains\Patients\Controllers\PatientController;
use App\Http\Controllers\Appointments\AppointmentController;
use App\Http\Controllers\Pathology\LaboratoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Domains\Patients\Actions\CreateVisitAction;
use App\Http\Controllers\VitalsController;
use App\Http\Controllers\Admin\EnrolledFacilityController;
use App\Http\Controllers\Admin\DashboardController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::prefix('v1/registry')->group(function () {
    Route::post('/search', [PatientController::class, 'search']);
});

// In your routes/api.php or web.php
Route::get('v1/locations/enrolled-facilities', [EnrolledFacilityController::class, 'index']);
Route::get('v1/locations/facilities/{facilityId}', [EnrolledFacilityController::class, 'getFacilityById']);


Route::prefix('v1/patients')->group(function () {


    /***
   /**
   *   start a visit return to patients
    * */
    Route::post('{patientUuid}/lab-orders', [LaboratoryController::class, 'createOrder']);
    Route::post('/register',[PatientController::class,'store']);
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
    Route::post('{patientuuid}/referral',[PatientController::class,'manageClientTransfer']);
    // Store vitals (/for a visit)
    Route::post('/{patientuuid}/visit/{visitId}/vitals', [VitalsController::class, 'store'])->name('vitals.store');

    // Update specific vitals record
    Route::put('/{patientuuid}/vitals/{vitalId}', [VitalsController::class, 'update'])->name('vitals.update');
});
// routes/api.php

use App\Http\Controllers\CommunityOutreachController;

// Community Outreach Routes
Route::prefix('v1/community-outreach')->group(function () {
    Route::get('/', [CommunityOutreachController::class, 'index']);
    Route::post('/', [CommunityOutreachController::class, 'store']);
    Route::get('/statistics', [CommunityOutreachController::class, 'statistics']);
    Route::get('/{id}', [CommunityOutreachController::class, 'show']);
    Route::put('/{id}', [CommunityOutreachController::class, 'update']);
    Route::delete('/{id}', [CommunityOutreachController::class, 'destroy']);
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



    Route::put('v1/appointments/{id}', [AppointmentController::class, 'updateAppointment']);

Route::post('/v1/community-outreach',[\App\Http\Controllers\CommunityEngagement\AggregateController::class,'store']);
Route::get('/community/engagement',[\App\Http\Controllers\CommunityEngagement\AggregateController::class,'index']);

/*
|--------------------------------------------------------------------------
| API Routes (v1)
|--------------------------------------------------------------------------
*/
Route::prefix('v1/admin')->group(function () {

    // ========================================
    // Facility Management
    // ========================================
    Route::prefix('/facilities')->group(function () {
        Route::get('/', [EnrolledFacilityController::class, 'index'])->name('admin.facilities.index');
        Route::post('/', [EnrolledFacilityController::class, 'store'])->name('admin.facilities.store');
        Route::get('{id}', [EnrolledFacilityController::class, 'show'])->name('admin.facilities.show');
        Route::put('{id}', [EnrolledFacilityController::class, 'update'])->name('admin.facilities.update');
        Route::delete('{id}', [EnrolledFacilityController::class, 'destroy'])->name('admin.facilities.destroy');
        Route::get('{id}/stats', [EnrolledFacilityController::class, 'stats'])->name('admin.facilities.stats');
    });

    // ========================================
    // Event Data Management
    // ========================================
    Route::prefix('events')->group(function () {
        Route::get('/', [EventDataController::class, 'index'])->name('admin.events.index');
        Route::post('/', [EventDataController::class, 'store'])->name('admin.events.store');
        Route::get('{id}', [EventDataController::class, 'show'])->name('admin.events.show');
        Route::put('{id}', [EventDataController::class, 'update'])->name('admin.events.update');
        Route::delete('{id}', [EventDataController::class, 'destroy'])->name('admin.events.destroy');
        Route::put('{id}/result', [EventDataController::class, 'updateResult'])->name('admin.events.updateResult');
        Route::put('{id}/status', [EventDataController::class, 'updateStatus'])->name('admin.events.updateStatus');
        Route::get('patient/{patientId}', [EventDataController::class, 'patientHistory'])->name('admin.events.patientHistory');
        Route::get('daily-schedule', [EventDataController::class, 'dailySchedule'])->name('admin.events.dailySchedule');
        Route::get('statistics', [EventDataController::class, 'statistics'])->name('admin.events.statistics');
    });

    // ========================================
    // Screening Specific Endpoints
    // ========================================
    Route::prefix('screenings')->group(function () {
        Route::post('hpv', [EventDataController::class, 'recordHPV'])->name('admin.screenings.hpv');
        Route::get('hpv/stats', [EventDataController::class, 'getHPVStats'])->name('admin.screenings.hpv.stats');
        Route::post('via', [EventDataController::class, 'recordVIA'])->name('admin.screenings.via');
        Route::get('via/stats', [EventDataController::class, 'getVIAStats'])->name('admin.screenings.via.stats');
        Route::post('hiv', [EventDataController::class, 'recordHIV'])->name('admin.screenings.hiv');
        Route::get('hiv/stats', [EventDataController::class, 'getHIVStats'])->name('admin.screenings.hiv.stats');
        Route::post('breast-cancer', [EventDataController::class, 'recordBreastCancer'])->name('admin.screenings.breast-cancer');
        Route::get('breast-cancer/stats', [EventDataController::class, 'getBreastCancerStats'])->name('admin.screenings.breast-cancer.stats');
    });

    // ========================================
    // Laboratory Endpoints
    // ========================================
    Route::prefix('laboratory')->group(function () {
        Route::post('test', [EventDataController::class, 'recordLabTest'])->name('admin.laboratory.test.store');
        Route::get('tests', [EventDataController::class, 'getLabTests'])->name('admin.laboratory.tests');
        Route::get('test/{id}', [EventDataController::class, 'getLabTest'])->name('admin.laboratory.test.show');
        Route::put('test/{id}/result', [EventDataController::class, 'updateLabResult'])->name('admin.laboratory.test.update');
        Route::get('stats', [EventDataController::class, 'getLabStats'])->name('admin.laboratory.stats');
    });

    // ========================================
    // Referral Endpoints
    // ========================================
    Route::prefix('referrals')->group(function () {
        Route::post('/', [EventDataController::class, 'recordReferral'])->name('admin.referrals.store');
        Route::get('/', [EventDataController::class, 'getReferrals'])->name('admin.referrals.index');
        Route::get('stats', [EventDataController::class, 'getReferralStats'])->name('admin.referrals.stats');
        Route::put('{id}/complete', [EventDataController::class, 'completeReferral'])->name('admin.referrals.complete');
    });

    // ========================================
    // Appointment Endpoints
    // ========================================
    Route::prefix('appointments')->group(function () {
        Route::post('/', [EventDataController::class, 'recordAppointment'])->name('admin.appointments.store');
        Route::get('/', [EventDataController::class, 'getAppointments'])->name('admin.appointments.index');
        Route::put('{id}/checkin', [EventDataController::class, 'checkInAppointment'])->name('admin.appointments.checkin');
        Route::put('{id}/cancel', [EventDataController::class, 'cancelAppointment'])->name('admin.appointments.cancel');
        Route::put('{id}/reschedule', [EventDataController::class, 'rescheduleAppointment'])->name('admin.appointments.reschedule');
        Route::get('stats', [EventDataController::class, 'getAppointmentStats'])->name('admin.appointments.stats');
    });

    // ========================================
    // Indicator Management
    // ========================================
    Route::prefix('indicators')->group(function () {
        Route::get('/', [IndicatorController::class, 'index'])->name('admin.indicators.index');
        Route::post('/', [IndicatorController::class, 'store'])->name('admin.indicators.store');
        Route::get('{id}', [IndicatorController::class, 'show'])->name('admin.indicators.show');
        Route::put('{id}', [IndicatorController::class, 'update'])->name('admin.indicators.update');
        Route::delete('{id}', [IndicatorController::class, 'destroy'])->name('admin.indicators.destroy');
        Route::post('calculate', [IndicatorController::class, 'calculate'])->name('admin.indicators.calculate');
        Route::get('performance/{indicatorId}', [IndicatorController::class, 'performanceHistory'])->name('admin.indicators.performance');
        Route::get('dashboard', [IndicatorController::class, 'dashboard'])->name('admin.indicators.dashboard');
        Route::get('categories', [IndicatorController::class, 'getCategories'])->name('admin.indicators.categories');
        Route::post('bulk-calculate', [IndicatorController::class, 'bulkCalculate'])->name('admin.indicators.bulk-calculate');
        Route::post('reset', [IndicatorController::class, 'resetIndicator'])->name('admin.indicators.reset');
    });

    // ========================================
    // Dashboard & Analytics
    // ========================================
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'getDashboardData'])->name('admin.dashboard.data');
        Route::get('summary', [DashboardController::class, 'getSummary'])->name('admin.dashboard.summary');
        Route::get('trends', [DashboardController::class, 'getTrends'])->name('admin.dashboard.trends');
        Route::get('screenings', [DashboardController::class, 'getScreeningStats'])->name('admin.dashboard.screenings');
        Route::get('performance', [DashboardController::class, 'getPerformanceStats'])->name('admin.dashboard.performance');
        Route::get('geographic', [DashboardController::class, 'getGeographicStats'])->name('admin.dashboard.geographic');
        Route::get('export', [DashboardController::class, 'exportData'])->name('admin.dashboard.export');
    });

    // ========================================
    // Reports
    // ========================================
    Route::prefix('reports')->group(function () {
        Route::get('monthly', [DashboardController::class, 'getMonthlyReport'])->name('admin.reports.monthly');
        Route::get('quarterly', [DashboardController::class, 'getQuarterlyReport'])->name('admin.reports.quarterly');
        Route::get('annual', [DashboardController::class, 'getAnnualReport'])->name('admin.reports.annual');
        Route::get('screening-report', [DashboardController::class, 'getScreeningReport'])->name('admin.reports.screening');
        Route::get('indicator-report', [DashboardController::class, 'getIndicatorReport'])->name('admin.reports.indicator');
        Route::post('generate', [DashboardController::class, 'generateReport'])->name('admin.reports.generate');
    });

    // ========================================
    // Export Endpoints
    // ========================================
    Route::prefix('export')->group(function () {
        Route::get('events', [DashboardController::class, 'exportEvents'])->name('admin.export.events');
        Route::get('screenings', [DashboardController::class, 'exportScreenings'])->name('admin.export.screenings');
        Route::get('indicators', [DashboardController::class, 'exportIndicators'])->name('admin.export.indicators');
        Route::get('patients', [DashboardController::class, 'exportPatients'])->name('admin.export.patients');
    });

    // ========================================
    // Patient Management
    // ========================================
    Route::prefix('patients')->group(function () {
        Route::get('history/{patientId}', [EventDataController::class, 'patientHistory'])->name('admin.patients.history');
        Route::get('summary/{patientId}', [EventDataController::class, 'patientSummary'])->name('admin.patients.summary');
        Route::get('screenings/{patientId}', [EventDataController::class, 'patientScreenings'])->name('admin.patients.screenings');
        Route::get('follow-ups/{patientId}', [EventDataController::class, 'patientFollowUps'])->name('admin.patients.followups');
    });

    // ========================================
    // Risk Assessment
    // ========================================
    Route::prefix('risk-assessment')->group(function () {
        Route::post('/', [EventDataController::class, 'recordRiskAssessment'])->name('admin.risk-assessment.store');
        Route::get('stats', [EventDataController::class, 'getRiskAssessmentStats'])->name('admin.risk-assessment.stats');
        Route::get('high-risk-patients', [EventDataController::class, 'getHighRiskPatients'])->name('admin.risk-assessment.high-risk');
        Route::get('risk-factors', [EventDataController::class, 'getRiskFactors'])->name('admin.risk-assessment.factors');
    });

    // ========================================
    // Follow-up Management
    // ========================================
    Route::prefix('follow-ups')->group(function () {
        Route::get('today', [EventDataController::class, 'getTodayFollowUps'])->name('admin.followups.today');
        Route::get('pending', [EventDataController::class, 'getPendingFollowUps'])->name('admin.followups.pending');
        Route::put('{id}/complete', [EventDataController::class, 'completeFollowUp'])->name('admin.followups.complete');
        Route::put('{id}/reschedule', [EventDataController::class, 'rescheduleFollowUp'])->name('admin.followups.reschedule');
        Route::get('stats', [EventDataController::class, 'getFollowUpStats'])->name('admin.followups.stats');
    });

    // ========================================
    // Settings & Configuration
    // ========================================
    Route::prefix('settings')->group(function () {
        Route::get('screening-types', [DashboardController::class, 'getScreeningTypes'])->name('admin.settings.screening-types');
        Route::get('event-types', [DashboardController::class, 'getEventTypes'])->name('admin.settings.event-types');
        Route::get('categories', [DashboardController::class, 'getCategories'])->name('admin.settings.categories');
        Route::get('districts', [DashboardController::class, 'getDistricts'])->name('admin.settings.districts');
        Route::get('provinces', [DashboardController::class, 'getProvinces'])->name('admin.settings.provinces');
    });
});

/*
|--------------------------------------------------------------------------
| Public API Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/
Route::prefix('v1/public')->group(function () {
    Route::get('facilities', [EnrolledFacilityController::class, 'publicIndex'])->name('public.facilities.index');
    Route::get('facilities/{id}', [EnrolledFacilityController::class, 'publicShow'])->name('public.facilities.show');
    Route::get('indicators', [IndicatorController::class, 'publicIndex'])->name('public.indicators.index');
    Route::get('indicators/{id}', [IndicatorController::class, 'publicShow'])->name('public.indicators.show');
});

/*
|--------------------------------------------------------------------------
| Webhook Endpoints (External Integrations)
|--------------------------------------------------------------------------
*/
Route::prefix('webhooks')->group(function () {
    Route::post('event-received', [EventDataController::class, 'webhookReceive'])->name('webhooks.event-received');
    Route::post('lab-result', [EventDataController::class, 'webhookLabResult'])->name('webhooks.lab-result');
    Route::post('ehr-integration', [EventDataController::class, 'webhookEHR'])->name('webhooks.ehr');
});

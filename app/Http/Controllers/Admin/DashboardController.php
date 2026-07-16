<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventData;
use App\Models\Facility;
use App\Models\Indicator;
use App\Models\IndicatorPerformance;
use App\Models\EnrolledFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index(){

        return Inertia::render('admin/admin-dashboard',
            [
                'Appointments' => $this->getAppointmentsEvents(),
            ]);

    }

    public function getAppointmentsEvents(){
        $appointments  =  EventData::where('source_type','appointment');
        $scheduledAppointments = $appointments->where('status','pending')->count();
        $completeAppointments = $appointments->where('status','completed')->count();
        $missedAppointments = $scheduledAppointments-$completeAppointments;
        return  [
            'total_appointments'=>$scheduledAppointments,
            'complete_appointments'=>$completeAppointments,
             'missed_appointments'=>$missedAppointments
        ];
    }

}

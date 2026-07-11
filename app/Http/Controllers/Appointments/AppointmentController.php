<?php

namespace App\Http\Controllers\Appointments;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        try {
            return Appointment::create($request->all());
        }catch (\Exception $exception){
            Log::info([$exception->getMessage()]);
           return response()->json([
                'message' => $exception->getMessage()
            ],301);
        }
    }

    public function viewAppointment(Request $request)
    {
        $appointments = Appointment::with(['patient', 'visit'])->get();
        return Inertia::render('/appointments/view', [
            'appointments' => $appointments,
        ]);
    }

    public function updateAppointment(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());
        return $appointment;
    }

    public function deleteAppointment($id)
    {
        return Appointment::destroy($id);
    }
}

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
        $appointments = Appointment::with(['patient', 'visit'])->get()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'patient_uuid' => $appointment->patient->uuid ?? $appointment->patient_uuid ?? '',
                'patient_name' => $appointment->patient->name ?? $appointment->patient_name ?? 'Unknown',
                'patient_initial' => $appointment->patient->initial ?? null,
                'date' => $appointment->date,
                'time' => $appointment->time,
                'type' => $appointment->type,
                'status' => $appointment->status,
                'doctor_name' => $appointment->doctor_name ?? null,
                'facility_name' => $appointment->facility_name ?? null,
                'notes' => $appointment->notes ?? null,
            ];
        });

        return Inertia::render('Appointments/appointments', [
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

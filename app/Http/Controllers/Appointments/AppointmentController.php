<?php

namespace App\Http\Controllers\Appointments;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patients\Patient;
use App\Models\Patients\PatientVisit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        try {
            $patientId  = PatientVisit::where('patient_id',$request->patient_id)->value('id');
            $addPatientVisitId  = array_merge($request->all(),[
                'visit_id' => $patientId,
            ]);
            return Appointment::create($addPatientVisitId);
        }catch (\Exception $exception){
            Log::info([$exception->getMessage()]);
           return response()->json([
                'message' => $exception->getMessage()
            ],301);
        }
    }

    public function viewAppointment(Request $request)
    {
        $appointments = Appointment::with(['patient', 'visit','doctor'])->where('appointment_status','scheduled')->get()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'patient_uuid' => $appointment->patient->patient_uuid ?? $appointment->patient->patient_uuid ?? '',
                'patient_name' =>  $appointment->patient->first_name.' '.$appointment->patient->last_name  ?? 'Unknown',
                'patient_initial' => substr($appointment->patient->first_name,0,1).' '.substr($appointment->patient->last_name,0,1) ?? null,
                'date' => Carbon::parse($appointment->appointment_date)->format('Y-m-d'),
                'time' => Carbon::parse($appointment->appointment_time)->format('H:i'),
                'type' => $appointment->appointment_type,
                'status' => $appointment->appointment_status,
                'doctor_name' => $appointment->doctor->name ?? null,
                'facility_name' => $appointment->facility_name ?? null,
                'notes' => $appointment->notes ?? null,
            ];
        });

Log::info([$appointments]);

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

    public function update(Request $request, $id)
    {

        $appointment = Appointment::where('id',$id)->update([
            'appointment_status' => $request->status,
//            'review_notes' => $request->review_notes,
//            'notes' => $request->notes,
//            'doctor_name' => $request->doctor_name,
//            'reason' => $request->reason,
//            'follow_up_needed' => $request->follow_up_needed,
//            'follow_up_date' => $request->follow_up_date,
        ]);

        return response()->json(['success' => true, 'data' => $appointment]);
    }
}

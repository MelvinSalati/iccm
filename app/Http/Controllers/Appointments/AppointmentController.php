<?php

namespace App\Http\Controllers\Appointments;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patients\Patient;
use App\Models\Patients\PatientVisit;
use App\Models\EnrolledFacility;
use App\Jobs\ProcessEventData;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        try {
            $validated = $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'appointment_date' => 'required|date',
                'appointment_time' => 'required|date_format:H:i',
                'appointment_type' => 'required|string|max:255',
                'appointment_status' => 'nullable|string|in:scheduled,confirmed,cancelled,completed,no_show',
                'doctor_name' => 'nullable|string|max:255',
                'notes' => 'nullable|string',
                'reason' => 'nullable|string',
                'follow_up_needed' => 'nullable|boolean',
                'follow_up_date' => 'nullable|date|after:today',
                'created_by' => 'nullable|exists:users,id',
            ]);

            $patientId = $validated['patient_id'];
            $visitId = PatientVisit::where('patient_id', $patientId)->value('id');

            $appointmentData = array_merge($validated, [
                'visit_id' => $visitId,
                'appointment_status' => $validated['appointment_status'] ?? 'scheduled',
            ]);

            $appointment = Appointment::create($appointmentData);

            // Dispatch event to ProcessEventData
            $this->dispatchAppointmentEvent($appointment, $validated, 'created');

            return response()->json([
                'message' => 'Appointment created successfully',
                'data' => $appointment
            ], 201);

        } catch (\Exception $exception) {
            Log::error('Error creating appointment', [
                'error' => $exception->getMessage(),
                'data' => $request->all()
            ]);

            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function viewAppointment(Request $request)
    {
        $appointments = Appointment::with(['patient', 'visit', 'doctor'])
            ->where('appointment_status', 'scheduled')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patient_uuid' => $appointment->patient->patient_uuid ?? '',
                    'patient_name' => ($appointment->patient->first_name ?? '') . ' ' . ($appointment->patient->last_name ?? ''),
                    'patient_initial' => substr($appointment->patient->first_name ?? '', 0, 1) . ' ' . substr($appointment->patient->last_name ?? '', 0, 1),
                    'date' => Carbon::parse($appointment->appointment_date)->format('Y-m-d'),
                    'time' => Carbon::parse($appointment->appointment_time)->format('H:i'),
                    'type' => $appointment->appointment_type,
                    'status' => $appointment->appointment_status,
                    'doctor_name' => $appointment->doctor->name ?? null,
                    'facility_name' => $appointment->facility_name ?? null,
                    'notes' => $appointment->notes ?? null,
                ];
            });

        Log::info('Appointments fetched', ['count' => $appointments->count()]);

        return Inertia::render('Appointments/appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function updateAppointment(Request $request, $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);

            $validated = $request->validate([
                'appointment_date' => 'sometimes|date',
                'appointment_time' => 'sometimes|date_format:H:i',
                'appointment_type' => 'sometimes|string|max:255',
                'appointment_status' => 'sometimes|string|in:scheduled,confirmed,cancelled,completed,no_show',
                'doctor_name' => 'nullable|string|max:255',
                'notes' => 'nullable|string',
                'reason' => 'nullable|string',
                'follow_up_needed' => 'nullable|boolean',
                'follow_up_date' => 'nullable|date|after:today',
            ]);

            $appointmentUpdated  = array_merge($validated,[
                'appointment_status' => 'completed'
            ]);
            $appointment->update($appointmentUpdated);

            // Dispatch event for update
            $this->dispatchAppointmentEvent($appointment, $validated, 'updated');

            return response()->json([
                'success' => true,
                'message' => 'Appointment updated successfully',
                'data' => $appointment
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating appointment', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update appointment: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:scheduled,confirmed,cancelled,completed,no_show',
                'notes' => 'nullable|string'
            ]);

            $appointment = Appointment::findOrFail($id);
            $oldStatus = $appointment->appointment_status;

            $appointment->update([
                'appointment_status' => $validated['status'],
                'notes' => $validated['notes'] ?? $appointment->notes,
            ]);

            // Dispatch event for status change
            $this->dispatchAppointmentEvent($appointment, ['old_status' => $oldStatus, 'new_status' => $validated['status']], 'status_changed');

            return response()->json([
                'success' => true,
                'message' => 'Appointment status updated successfully',
                'data' => $appointment
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating appointment status', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update status: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteAppointment($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointmentData = $appointment->toArray();

            $appointment->delete();

            // Dispatch event for deletion
            $this->dispatchAppointmentEvent((object)$appointmentData, ['deleted_at' => now()->toDateTimeString()], 'deleted');

            return response()->json([
                'success' => true,
                'message' => 'Appointment deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting appointment', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete appointment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dispatch appointment event to ProcessEventData
     */
    protected function dispatchAppointmentEvent($appointment, array $data, string $action): void
    {
        try {
            $facilityId = $appointment->facility_id ?? $data['facility_id'] ?? null;
            $district = null;
            $province = null;

            if ($facilityId) {
                $facility = EnrolledFacility::find($facilityId);
                if ($facility) {
                    $district = $facility->district ?? null;
                    $province = $facility->province ?? null;
                }
            }

            $patient = Patient::find($appointment->patient_id);
            $patientName = $patient ? $patient->full_name : null;

            $eventData = [
                'source_type' => 'appointment',
                'event_type' => 'appointment_' . $action,
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $appointment->patient_id,
                'entity_type' => 'patient',
                'entity_name' => $patientName,
                'age' => $patient ? $patient->age : null,
                'gender' => $patient ? $patient->gender : null,
                'phone' => $patient ? $patient->phone_number : null,
                'event_date' => $appointment->appointment_date ?? now()->toDateString(),
                'event_time' => $appointment->appointment_time ?? null,
                'status' => $appointment->appointment_status ?? 'scheduled',
                'provider_name' => $appointment->doctor_name ?? $data['doctor_name'] ?? null,
                'notes' => $appointment->notes ?? $data['notes'] ?? null,
                'payload' => [
                    'appointment_id' => $appointment->id,
                    'visit_id' => $appointment->visit_id ?? null,
                    'appointment_type' => $appointment->appointment_type ?? $data['appointment_type'] ?? null,
                    'reason' => $appointment->reason ?? $data['reason'] ?? null,
                    'follow_up_needed' => $appointment->follow_up_needed ?? $data['follow_up_needed'] ?? false,
                    'follow_up_date' => $appointment->follow_up_date ?? $data['follow_up_date'] ?? null,
                    'action' => $action,
                ],
                'metadata' => [
                    'source' => 'appointment_controller',
                    'action' => $action,
                    'old_status' => $data['old_status'] ?? null,
                    'new_status' => $data['new_status'] ?? null,
                    'appointment_status' => $appointment->appointment_status ?? null,
                ],
            ];

            ProcessEventData::dispatch($eventData, 'appointment');

            Log::info('Appointment event dispatched', [
                'appointment_id' => $appointment->id,
                'action' => $action,
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to dispatch appointment event', [
                'appointment_id' => $appointment->id ?? null,
                'action' => $action,
                'error' => $e->getMessage(),
            ]);
            // Don't throw - appointment was already created/updated
        }
    }
}

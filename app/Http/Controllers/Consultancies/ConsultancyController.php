<?php

namespace App\Http\Controllers\Consultancies;

use App\Helpers\EncryptionHelper;
use App\Http\Controllers\Controller;
use App\Models\Consultancy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ConsultancyController extends Controller
{
    public function createConsultancy(Request $request){
        return  Consultancy::create($request->all());
    }

    public function viewConsultancy($facilityId)
    {
        $facility = EncryptionHelper::decryptId($facilityId);

        $consultationEvents = Consultancy::join('patient_visits','patient_visits.id','=','consultations.visit_id')
            ->join('patients','patient_visits.patient_id','=','patients.id')
            ->join('facilities','facilities.id','=','consultations.facility_id')
            ->select(
                'consultations.*',
                'patients.first_name as patient_first_name',
                'patients.last_name as patient_last_name',
                'patient_visits.visit_number'
            )
            ->where('consultations.facility_id', $facility)
            ->orderBy('consultations.created_at', 'desc')
            ->get()
            ->map(function ($consultation) {
                // ============================================
                // FIX: Use Storage::url() for proper URL generation
                // ============================================
                $imageUrl = null;
                if ($consultation->cervical_cancer_image_url) {
                    // Clean the path
                    $path = $consultation->cervical_cancer_image_url;
                    $path = str_replace('storage/', '', $path);
                    $path = str_replace('public/', '', $path);
                    $path = ltrim($path, '/');

                    // Use Storage::url() to generate the correct URL
                    $imageUrl = Storage::url($path);
                }

                return [
                    'id' => $consultation->id,
                    'consultation_uuid' => $consultation->consultation_uuid,
                    'patient_id' => $consultation->patient_id,
                    'patient_name' => $consultation->patient_first_name && $consultation->patient_last_name ?
                        ($consultation->patient_first_name . ' ' . $consultation->patient_last_name) :
                        'Patient #' . $consultation->patient_id,
                    'patient_first_name' => $consultation->patient_first_name ?? null,
                    'patient_last_name' => $consultation->patient_last_name ?? null,
                    'visit_id' => $consultation->visit_number ?? $consultation->visit_id,
                    'cervical_cancer_image_url' => $imageUrl,
                    'sms_to_dr' => (bool) $consultation->sms_to_dr,
                    'assigned_to_user_id' => $consultation->assigned_to_user_id,
                    'assigned_to_name' => $consultation->assignedTo ?
                        ($consultation->assignedTo->name ?? $consultation->assignedTo->first_name . ' ' . $consultation->assignedTo->last_name) :
                        null,
                    'patient_appointment' => $consultation->patient_appointment,
                    'assigning_user_id' => $consultation->assigning_user_id,
                    'assigner_name' => $consultation->assignedBy ?
                        ($consultation->assignedBy->name ?? $consultation->assignedBy->first_name . ' ' . $consultation->assignedBy->last_name) :
                        null,
                    'facility_id' => $consultation->facility_id,
                    'facility_name' => $consultation->name, // From facilities join
                    'consultation_status' => $consultation->consultation_status,
                    'comment' => $consultation->comment,
                    'created_at' => $consultation->created_at,
                    'updated_at' => $consultation->updated_at,
                ];
            });

        return Inertia::render('Consultancy/consultancy', [
            'consultationEvents' => $consultationEvents
        ]);
    }

    public function updateConsultancy(Request $request, $id){
        return Consultancy::where('id', $id)->update($request->all());
    }
}

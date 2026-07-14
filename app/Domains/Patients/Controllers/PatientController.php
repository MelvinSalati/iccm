<?php

namespace App\Domains\Patients\Controllers;

use App\Domains\Patients\Actions\PatientRegistrationAction;
use App\Domains\Patients\Actions\PatientSearchAction;
use App\Helpers\IdentifiersHelper;
use App\Models\IntegratedScreening;
use App\Models\LaboratoryOrder;
use App\Models\Patients\Patient;
use App\Models\Patients\PatientVisit;
use App\Models\Patients\PatientVisitInteraction;
use App\Models\Referral;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the patients.
     */
    public function index(Request $request)
    {
        $patients = Patient::paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Patient registry - displays patient details.
     */
    public function registry(Request $request, $uuid)
    {
        $patientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        return Inertia::render('patients/patient-details', [
            'demographics' => Patient::with(['addresses', 'telecoms', 'riskFactors'])
                ->where('patient_uuid', $uuid)
                ->first(),
            'visits' => PatientVisit::where('patient_id', $patientId)->get(),
            'stats' => []
        ]);
    }

    /**
     * Patient search.
     */
    public function search(Request $request)
    {
        if($request->search_type==='nrc'){

        }
        return Patient::where('nrc_number', 'LIKE', '%' . $request->search_value . '%')
            ->orWhere('first_name', 'LIKE', '%' . $request->search_value . '%')
            ->orWhere('last_name', 'LIKE', '%' . $request->search_value . '%')
            ->orWhere('phone_number', 'LIKE', '%' . $request->search_value . '%')
            ->get();
    }

    /**
     * Store a newly created patient in storage.
     */
    public function store(Request $request)
    {
        try {
            $result = PatientRegistrationAction::createPatient($request->all());

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => $result['patient'],
                ], 201);
            }

            if (isset($result['errors'])) {
                return response()->json([
                    'success' => false,
                    'errors' => $result['errors'],
                ], 422);
            }

            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified patient.
     */
    public function show($uuid)
    {
        try {
            $patient = Patient::where('uuid', $uuid)->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $patient,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found.',
            ], 404);
        }
    }

    /**
     * Update the specified patient in storage.
     */
    public function update(Request $request, $uuid)
    {
        try {
            $patient = Patient::where('uuid', $uuid)->firstOrFail();

            $result = PatientRegistrationAction::updatePatient($patient, $request->all());

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => $result['patient'],
                ]);
            }

            if (isset($result['errors'])) {
                return response()->json([
                    'success' => false,
                    'errors' => $result['errors'],
                ], 422);
            }

            return response()->json([
                'success' => false,
                'message' => $result['message'],
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified patient from storage.
     */
    public function destroy($uuid)
    {
        try {
            $patient = Patient::where('uuid', $uuid)->firstOrFail();
            $patient->delete();

            return response()->json([
                'success' => true,
                'message' => 'Patient deleted successfully.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the patient: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Quick register a patient via API.
     */
    public function quickRegister(Request $request)
    {
        $result = PatientRegistrationAction::quickRegister($request->all());

        if ($result['success']) {
            return response()->json($result, 201);
        }

        return response()->json($result, 422);
    }

    // ============================================================================
    // API Search Methods (Minimal)
    // ============================================================================

    /**
     * Search patients by NRC number.
     */
    public function searchByNrc(Request $request)
    {
        $patients = Patient::where('nrc_number', 'LIKE', "%{$request->nrc}%")
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Search patients by name.
     */
    public function searchByName(Request $request)
    {
        $patients = Patient::where('first_name', 'LIKE', "%{$request->name}%")
            ->orWhere('last_name', 'LIKE', "%{$request->name}%")
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Search patients by phone number.
     */
    public function searchByPhone(Request $request)
    {
        $patients = Patient::where('phone_number', 'LIKE', "%{$request->phone}%")
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Search patients by ID or UUID.
     */
    public function searchById(Request $request)
    {
        $query = Patient::query();

        if (is_numeric($request->id)) {
            $query->where('id', $request->id);
        } else {
            $query->where('uuid', 'LIKE', "%{$request->id}%");
        }

        $patients = $query->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Generic search endpoint.
     */
    public function searchGeneric(Request $request)
    {
        $searchTerm = $request->query;
        $type = $request->type ?? 'name';

        $query = Patient::query();

        switch ($type) {
            case 'nrc':
                $query->where('nrc_number', 'LIKE', "%{$searchTerm}%");
                break;
            case 'phone':
                $query->where('phone_number', 'LIKE', "%{$searchTerm}%");
                break;
            case 'id':
                if (is_numeric($searchTerm)) {
                    $query->where('id', $searchTerm);
                } else {
                    $query->where('uuid', 'LIKE', "%{$searchTerm}%");
                }
                break;
            case 'name':
            default:
                $query->where('first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('last_name', 'LIKE', "%{$searchTerm}%");
                break;
        }

        $patients = $query->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Display visit interactions for a patient.
     */
    public function manageClientTransfer(Request $request)
    {
        try {
            // Validate the request
//            $validated = $request->validate([
//                'referral_date' => 'required|date',
//                'reason' => 'required|string|max:500',
//                'referring_facility_id' => 'required|exists:facilities,id',
//                'receiving_facility_id' => 'required|exists:facilities,id|different:referring_facility_id',
//                'referral_status' => 'required|in:pending,accepted,rejected,completed,cancelled',
//                'feedback_notes' => 'nullable|string|max:1000',
//                'created_by' => 'required|exists:users,id',
//            ]);

            // Log the validated data (remove in production or use debug level)
//            Log::info('Creating referral with data:', $validated);

            // Generate reference number
            $validated['referral_reference'] = $this->generateReferralReference();

            // Use transaction to ensure data integrity
            $referral = DB::transaction(function () use ($validated) {
                return Referral::create($validated);
            });

            // Load relationships for response
            $referral->load(['patient', 'referringFacility', 'receivingFacility', 'creator']);

            return response()->json([
                'success' => true,
                'message' => 'Patient referral created successfully.',
                'data' => $referral
            ], 201);

        } catch (ValidationException $e) {
            Log::warning('Validation failed for referral creation:', $e->errors());

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Log the full error for debugging
            Log::error('Failed to create referral: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create referral',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    private function generateReferralReference()
    {
        // Generate unique reference number
        // Format: REF-YYYYMMDD-XXXX (where XXXX is random)
        $reference = 'REF-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

        // Ensure uniqueness (optional)
        while (Referral::where('referral_reference', $reference)->exists()) {
            $reference = 'REF-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        }

        return $reference;
    }
    public function visitInteractions(Request $request, $patientUuid, $visitId = null)
    {
        // Get patient with only the relationships that exist
        $patient = Patient::with(['addresses', 'telecoms', 'riskFactors'])
            ->where('patient_uuid', $patientUuid)
            ->first();

        if (!$patient) {
            return Inertia::render('patients/interaction-details', [
                'patient' => null,
                'visit' => null,
                'interaction' => null,
            ]);
        }

        $patientId = $patient->id;

        // If visit ID is provided, get specific visit
        if ($visitId) {
            $visit = PatientVisit::where('patient_id', $patientId)
                ->where('id', $visitId)
                ->first();

            // Build interaction data from integrated_screenings table
            $interaction = null;

            if ($visit) {
                // Get all integrated screenings for this visit
                $screenings = IntegratedScreening::where('patient_uuid', $patientUuid)
                    ->where('visit_uuid', $visitId)
                    ->orderBy('created_at', 'desc')
                    ->get();

                // Get vitals for this visit
                $vitals = \App\Models\PatientVital::where('patient_uuid', $patientUuid)
                    ->where('visit_uuid', $visitId)
                    ->where('is_current', true)
                    ->first();

                // Build the interaction object - NOT AN ARRAY!
                $interaction = [
                    'id' => $visit->id,
                    'visit_number' => $visit->visit_number,
                    'visit_type' => $visit->visit_type_id,
                    'visit_status' => $visit->visit_status,
                    'priority' => $visit->priority,
                    'department' => $visit->department,
                    'check_in_time' => $visit->check_in_time,
                    'check_out_time' => $visit->check_out_time,
                    'presenting_complaint' => $visit->presenting_complaint,
                    'primary_provider' => $visit->primary_provider,
                    'visit_outcome' => $visit->visit_outcome,
                    'screenings' => $screenings->map(function ($screening) {
                        $data = $screening->screening_data ?? [];

                        return [
                            'id' => $screening->id,
                            'screening_type' => 'Integrated Cervical & Mental Health',
                            'screening_method' => $screening->screening_method_label ?? $screening->screening_method ?? 'N/A',
                            'result' => $screening->screening_result_label ?? $screening->screening_result ?? 'pending',
                            'result_raw' => $screening->screening_result,
                            'is_positive' => $screening->is_positive,
                            'is_mental_health_flagged' => $screening->is_mental_health_flagged,
                            'distress_score' => $screening->distress_score,
                            'anxiety_score' => $screening->anxiety_score,
                            'depression_score' => $screening->depression_score,
                            'treatment_decision' => $screening->treatment_decision_label ?? $screening->treatment_decision,
                            'follow_up_date' => $screening->follow_up_date?->format('Y-m-d'),
                            'screening_date' => $screening->screening_date?->format('Y-m-d'),
                            'notes' => $data['integrated_chronic_care_notes'] ?? null,
                            'created_at' => $screening->created_at?->format('Y-m-d H:i:s'),
                            'submitted_at' => $screening->submitted_at?->format('Y-m-d H:i:s'),
                            'submitted_by' => null,
                            'metadata' => $screening->metadata,
                            'full_data' => $data,
                            'metrics' => $screening->metrics ?? [],
                        ];
                    })->toArray(),
                    'vitals' => $vitals ? [
                        'systolic_bp' => $vitals->systolic_bp,
                        'diastolic_bp' => $vitals->diastolic_bp,
                        'heart_rate' => $vitals->heart_rate,
                        'temperature' => $vitals->temperature,
                        'respiratory_rate' => $vitals->respiratory_rate,
                        'oxygen_saturation' => $vitals->oxygen_saturation,
                        'weight' => $vitals->weight,
                        'height' => $vitals->height,
                        'bmi' => $vitals->bmi,
                        'recorded_at' => $vitals->recorded_at?->format('Y-m-d H:i:s'),
                    ] : null,
                    'notes' => [],
                    'referrals' => [],
                ];
            }

            return Inertia::render('patients/interaction-details', [
                'patient' => $patient,
                'visit' => $visit,
                'interaction' => $interaction, // This is now an array/object, not a collection
            ]);
        }

        // If no visit ID, get all visits
        $visits = PatientVisit::where('patient_id', $patientId)->get();

        return Inertia::render('patients/interaction-details', [
            'patient' => $patient,
            'visits' => $visits,
            'interaction' => null,
        ]);
    }
    /**
     * Show the create patient form.
     */
    public function create()
    {
        return Inertia::render('patients/create');
    }

    /**
     * Display patient medications page.
     */
    public function medications($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();

        return Inertia::render('patients/medications', [
            'patient' => $patient,
            'medications' => [], // Fetch medications from your medications table
        ]);
    }

    /**
     * Display patient appointments page.
     */
    public function appointments($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();

        return Inertia::render('patients/appointments', [
            'patient' => $patient,
            'appointments' => [], // Fetch appointments from your appointments table
        ]);
    }

    /**
     * Display patient referrals page.
     */
    public function referrals($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();

        return Inertia::render('patients/referrals', [
            'patient' => $patient,
            'referrals' => [], // Fetch referrals from your referrals table
        ]);
    }

    /**
     * Display patient visits page.
     */
    public function visits($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();
        $patientId = $patient->id;

        return Inertia::render('patients/visits', [
            'patient' => $patient,
            'visits' => PatientVisit::where('patient_id', $patientId)->get(),
        ]);
    }

    /**
     * Display patient risk assessment page.
     */
    public function riskAssessment($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)
            ->firstOrFail();

        return Inertia::render('patients/riskassessment', [
            'patient' => $patient,
            'riskAssessment' => $patient->latestRiskAssessment,
        ]);
    }
    public function referral($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)
            ->firstOrFail();

        return Inertia::render('patients/referral', [
            'patient' => $patient,
            'riskAssessment' => $patient->latestRiskAssessment,
        ]);
    }
    public function lab($uuid)
    {
        $patient = IdentifiersHelper::getPatientIdByUuid($uuid);
        $patient = LaboratoryOrder::where('patient_id', $patient)->get();
        return Inertia::render('patients/laboratory', [
            'orders' => $patient,
        ]);
    }
    /**
     * Display patient lab results page.
     */
    public function labs($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();
        $pstientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        return Inertia::render('patients/labs', [
            'patient' => $patient,
            'labOrders' => LaboratoryOrder::where('patient_id',$pstientId)->get(), // Fetch lab results from your lab results table
        ]);
    }
    public function screening($uuid){

        $patientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        $patient = Patient::where('id', $patientId)->firstOrFail();
        return Inertia::render('patients/screening',[
            'patient' => $patient,
        ]);
    }

    public function imaging($uuid){

        $patientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        $patient = Patient::where('id', $patientId)->firstOrFail();
        return Inertia::render('patients/imaging',[
            'patient' => $patient,
        ]);
    }
    public function treatment($uuid){

        $patientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        $patient = Patient::where('id', $patientId)->firstOrFail();
        return Inertia::render('patients/treatment',[
            'patient' => $patient,
        ]);
    }
    public function biospy($uuid){

        $patientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        $patient = Patient::where('id', $patientId)->firstOrFail();
        return Inertia::render('patients/biopsy',[
            'patient' => $patient,
        ]);
    }
    public function viewBreastCancerScreening($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();
        $pstientId = IdentifiersHelper::getPatientIdByUuid($uuid);
        return Inertia::render('patients/breast-cancer', [
            'patient' => $patient,
            'breastScreening' => LaboratoryOrder::where('patient_id',$pstientId)->get(), // Fetch lab results from your lab results table
        ]);
    }
    /**
     * Display patient imaging page.
     */
    public function biopsy($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();

        return Inertia::render('patients/biopsy', [
            'patient' => $patient,
            'biopsy' => [], // Fetch imaging records from your imaging table
        ]);
    }

    /**
     * Display patient documents page.
     */
    public function documents($uuid)
    {
        $patient = Patient::where('patient_uuid', $uuid)->firstOrFail();

        return Inertia::render('patients/documents', [
            'patient' => $patient,
            'documents' => [], // Fetch documents from your documents table
        ]);
    }
}

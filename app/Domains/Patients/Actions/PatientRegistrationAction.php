<?php

namespace App\Domains\Patients\Actions;

use App\Domains\Patients\Services\PatientService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PatientRegistrationAction
{
    protected static $patientService;

    /**
     * Initialize the service for static methods.
     */
    protected static function getService(): PatientService
    {
        if (self::$patientService === null) {
            self::$patientService = app(PatientService::class);
        }
        return self::$patientService;
    }

    /**
     * Create a new patient.
     *
     * @param array $data
     * @return array
     * @throws ValidationException
     * @throws \Exception
     */
    public static function createPatient(array $data): array
    {
        try {
            // Validate inputs first
            $patientData = array_merge($data,[
                'patient_uuid' => Str::uuid()
            ]);
//            self::validateInputs($data);

            // Get the service and create patient
            $service = self::getService();
            $patient = $service->create($patientData);

            return [
                'success' => true,
                'message' => 'Patient registered successfully',
                'patient' => $patient,
                'patient_id' => $patient->id,
                'uuid' => $patient->uuid ?? null,
            ];

        } catch (ValidationException $e) {
            Log::warning('Patient registration validation failed', [
                'errors' => $e->errors(),
                'data' => $data
            ]);

            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ];

        } catch (\Exception $e) {
            Log::error('Patient registration failed', [
                'error' => $e->getMessage(),
                'data' => $data
            ]);

            return [
                'success' => false,
                'message' => 'Failed to register patient: ' . $e->getMessage(),
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Validate patient registration inputs.
     *
     * @param array $patientData
     * @return array
     * @throws ValidationException
     */
    public static function validateInputs(array $patientData): array
    {
        $rules = [
            // Demographics
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dateOfBirth' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other,unknown',
            'maritalStatus' => 'nullable|in:single,married,divorced,widowed,separated',
            'nrcNumber' => 'nullable|string|max:50',
            'phoneNumber' => 'nullable|string|max:20',

            // Address
            'address' => 'nullable|array',
            'address.province' => 'required_with:address|string|max:255',
            'address.district' => 'required_with:address|string|max:255',
            'address.chiefdom' => 'nullable|string|max:255',
            'address.village' => 'nullable|string|max:255',
            'address.ward' => 'nullable|string|max:255',
            'address.compound' => 'nullable|string|max:255',
            'address.landmark' => 'nullable|string|max:255',
            'address.postalCode' => 'nullable|string|max:20',

            // Facility
            'facility' => 'required|string|max:255',

            // Telecom

            // Risk Assessment
            'riskAssessment' => 'nullable|array',
            'riskAssessment.numberOfPregnancies' => 'nullable|integer|min:0',
            'riskAssessment.numberOfDeliveries' => 'nullable|integer|min:0',
            'riskAssessment.longTermContraceptiveUse' => 'nullable|in:yes,no',
            'riskAssessment.hivStatus' => 'nullable|in:positive,negative,unknown',
            'riskAssessment.artStatus' => 'nullable|in:active,defaulted,never',
            'riskAssessment.viralLoadStatus' => 'nullable|in:suppressed,detectable,unknown',
            'riskAssessment.hpvStatus' => 'nullable|in:positive,negative,unknown',
            'riskAssessment.smokingHistory' => 'nullable|in:yes,no',
            'riskAssessment.alcoholUse' => 'nullable|in:yes,no',
            'riskAssessment.familyHistoryOfCancer' => 'nullable|in:yes,no',
            'riskAssessment.previousVIAPositive' => 'nullable|in:yes,no',
            'riskAssessment.previousHPVPositive' => 'nullable|in:yes,no',
            'riskAssessment.previousCINDiagnosis' => 'nullable|in:yes,no',
            'riskAssessment.previousCervicalCancer' => 'nullable|in:yes,no',
            'riskAssessment.immunosuppression' => 'nullable|in:yes,no',
            'riskAssessment.longTermContraceptive' => 'nullable|in:yes,no',

            // User
            'user_id' => 'required|exists:users,id',
        ];

        $messages = [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'dateOfBirth.required' => 'Date of birth is required',
            'dateOfBirth.before' => 'Date of birth must be in the past',
            'gender.required' => 'Gender is required',
            'gender.in' => 'Invalid gender selected',
            'facility.required' => 'Facility is required',
            'address.province.required_with' => 'Province is required',
            'address.district.required_with' => 'District is required',
            'user_id.required' => 'User ID is required',
            'user_id.exists' => 'Invalid user',
        ];

        $validator = Validator::make($patientData, $rules, $messages);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    /**
     * Create a new patient with additional metadata.
     *
     * @param array $data
     * @param array $metadata
     * @return array
     */
    public static function createPatientWithMetadata(array $data, array $metadata = []): array
    {
        // Merge metadata with patient data
        $mergedData = array_merge($data, $metadata);

        return self::createPatient($mergedData);
    }

    /**
     * Quick registration with minimal fields.
     *
     * @param array $data
     * @return array
     */
    public static function quickRegister(array $data): array
    {
        $requiredFields = ['firstName', 'lastName', 'gender', 'user_id'];

        // Validate required fields
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return [
                    'success' => false,
                    'message' => "Field '{$field}' is required for quick registration",
                ];
            }
        }

        // Set default values for optional fields
        $data['dateOfBirth'] = $data['dateOfBirth'] ?? now()->subYears(30)->format('Y-m-d');
        $data['facility'] = $data['facility'] ?? 'Unknown Facility';
        $data['phoneNumber'] = $data['phoneNumber'] ?? null;

        return self::createPatient($data);
    }

    /**
     * Validate and prepare patient data for update.
     *
     * @param array $data
     * @param int $patientId
     * @return array
     * @throws ValidationException
     */
    public static function validateUpdate(array $data, int $patientId): array
    {
        $rules = [
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'dateOfBirth' => 'sometimes|date|before:today',
            'gender' => 'sometimes|in:male,female,other,unknown',
            'maritalStatus' => 'nullable|in:single,married,divorced,widowed,separated',
            'nrcNumber' => "nullable|string|max:50|unique:patients,nrc_number,{$patientId}",
            'phoneNumber' => 'nullable|string|max:20',
            'facility' => 'sometimes|string|max:255',
            'address.province' => 'nullable|string|max:255',
            'address.district' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    /**
     * Get validation rules for patient registration.
     *
     * @return array
     */
    public static function getValidationRules(): array
    {
        return [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dateOfBirth' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other,unknown',
            'maritalStatus' => 'nullable|in:single,married,divorced,widowed,separated',
            'nrcNumber' => 'nullable|string|max:50',
            'phoneNumber' => 'nullable|string|max:20',
            'facility' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ];
    }

    /**
     * Get validation messages.
     *
     * @return array
     */
    public static function getValidationMessages(): array
    {
        return [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'dateOfBirth.required' => 'Date of birth is required',
            'dateOfBirth.before' => 'Date of birth must be in the past',
            'gender.required' => 'Gender is required',
            'facility.required' => 'Facility is required',
            'user_id.required' => 'User ID is required',
            'user_id.exists' => 'Invalid user selected',
        ];
    }
}

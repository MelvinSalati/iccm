<?php

namespace App\Domains\Patients\Repositories;


use App\Models\Patients\PatientAddress;
use App\Models\Patients\PatientRiskFactor;
use App\Models\Patients\PatientTelecom;
use App\Domains\Patients\Repositories\Contracts\PatientInterface;
use App\Models\Patients\Patient;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PatientRepository implements PatientInterface
{
    protected $model;

    public function __construct(Patient $model)
    {
        $this->model = $model;
    }

    // ============================================
    // QUERY METHODS
    // ============================================

    /**
     * Create a new patient with all related data from the registration form.
     */
    public function newPatient(array $data): Patient
    {
        return DB::transaction(function () use ($data) {
            try {
                // ============================================
                // 1. PREPARE PATIENT DATA
                // ============================================
                $patientData = [
                    'user_id' => $data['user_id'] ?? null,
                    'first_name' => $data['firstName'] ?? '',
                    'last_name' => $data['lastName'] ?? '',
                    'date_of_birth' => $data['dateOfBirth'] ?? null,
                    'gender' => $data['gender'] ?? null,
                    'marital_status' => $data['maritalStatus'] ?? null,
                    'nrc_number' => $data['nrcNumber'] ?? null,
                    'phone_number' => $data['phoneNumber'] ?? null,
                    'facility_id' => $data['facility'] ?? null,
                    'registered_at' => now(),
                    'is_active' => true,
                ];

                // ============================================
                // 2. CREATE PATIENT
                // ============================================
                $patient = $this->model->create($patientData);
                Log::info('Patient created', ['patient_id' => $patient->id]);

                // ============================================
                // 3. CREATE ADDRESS
                // ============================================
                if (!empty($data['address'])) {
                    $addressData = [
                        'patient_id' => $patient->id,
                        'province' => $data['address']['province'] ?? null,
                        'district' => $data['address']['district'] ?? null,
                        'chiefdom' => $data['address']['chiefdom'] ?? null,
                        'village' => $data['address']['village'] ?? null,
                        'ward' => $data['address']['ward'] ?? null,
                        'compound' => $data['address']['compound'] ?? null,
                        'landmark' => $data['address']['landmark'] ?? null,
                        'postal_code' => $data['address']['postalCode'] ?? null,
                        'address_type' => 'current',
                        'is_primary' => true,
                    ];

                    PatientAddress::create($addressData);
                    Log::info('Patient address created', ['patient_id' => $patient->id]);
                }

                // ============================================
                // 4. CREATE TELECOM CONTACTS
                // ============================================
                if (!empty($data['telecom']) && is_array($data['telecom'])) {
                    foreach ($data['telecom'] as $index => $telecom) {
                        $telecomData = [
                            'patient_id' => $patient->id,
                            'system' => $telecom['system'] ?? 'mobile',
                            'value' => $telecom['value'] ?? '',
                            'use' => $telecom['use'] ?? 'mobile',
                            'rank' => $telecom['rank'] ?? ($index + 1),
                            'is_primary' => $index === 0,
                            'is_verified' => false,
                        ];

                        PatientTelecom::create($telecomData);
                    }
                    Log::info('Patient telecoms created', [
                        'patient_id' => $patient->id,
                        'count' => count($data['telecom'])
                    ]);
                }

                // ============================================
                // 5. CREATE RISK ASSESSMENT
                // ============================================
                if (!empty($data['riskAssessment'])) {
                    $risk = $data['riskAssessment'];

                    $riskData = [
                        'patient_id' => $patient->id,
                        'number_of_pregnancies' => $risk['numberOfPregnancies'] ?? 0,
                        'number_of_deliveries' => $risk['numberOfDeliveries'] ?? 0,
                        'long_term_contraceptive_use' => $risk['longTermContraceptiveUse'] ?? null,
                        'hiv_status' => $risk['hivStatus'] ?? null,
                        'art_status' => $risk['artStatus'] ?? null,
                        'viral_load_status' => $risk['viralLoadStatus'] ?? null,
                        'hpv_status' => $risk['hpvStatus'] ?? null,
                        'smoking_status' => $risk['smokingHistory'] === 'yes' ? 'current' : ($risk['smokingHistory'] === 'no' ? 'never' : null),
                        'alcohol_use' => $risk['alcoholUse'] === 'yes' ? 'current' : ($risk['alcoholUse'] === 'no' ? 'never' : null),
                        'family_history_of_cancer' => $risk['familyHistoryOfCancer'] ?? null,
                        'previous_via_positive' => $risk['previousVIAPositive'] ?? null,
                        'previous_hpv_positive' => $risk['previousHPVPositive'] ?? null,
                        'previous_cin_diagnosis' => $risk['previousCINDiagnosis'] ?? null,
                        'previous_cervical_cancer' => $risk['previousCervicalCancer'] ?? null,
                        'immunosuppression' => $risk['immunosuppression'] ?? null,
                        'long_term_contraceptive' => $risk['longTermContraceptive'] ?? null,
                        'assessment_date' => now(),
                        'assessed_by' => $data['user_id'] ?? null,
                    ];

                    $riskFactor = PatientRiskFactor::create($riskData);

                    $score = $riskFactor->calculateRiskScore();
                    $level = $riskFactor->determineRiskLevel($score);

                    $riskFactor->update([
                        'risk_score' => $score,
                        'risk_level' => $level,
                    ]);

                    $riskFlags = $riskFactor->getRiskFlags();

                    if (!empty($riskFlags)) {
                        $patient->update(['risk_flags' => $riskFlags]);
                    }

                    Log::info('Patient risk assessment created', [
                        'patient_id' => $patient->id,
                        'risk_score' => $score,
                        'risk_level' => $level,
                        'risk_flags' => $riskFlags
                    ]);
                }

                return $patient->fresh([
                    'user',
                    'primaryAddress',
                    'primaryTelecom',
                    'telecoms',
                    'latestRiskFactor'
                ]);

            } catch (\Exception $e) {
                Log::error('Failed to create patient', [
                    'error' => $e->getMessage(),
                    'data' => $data
                ]);
                throw $e;
            }
        });
    }

    /**
     * Alternative: Create patient with validation and error handling.
     */
    public function newPatientWithValidation(array $data): array
    {
        try {
            $patient = $this->newPatient($data);

            return [
                'success' => true,
                'message' => 'Patient registered successfully',
                'patient' => $patient,
                'patient_id' => $patient->id,
            ];
        } catch (\Illuminate\Validation\ValidationException $e) {
            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to register patient: ' . $e->getMessage(),
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Bulk create patients from array data.
     */
    public function newPatientsBulk(array $patients): array
    {
        $results = [
            'success' => 0,
            'failed' => 0,
            'patients' => [],
            'errors' => [],
        ];

        foreach ($patients as $patientData) {
            try {
                $patient = $this->newPatient($patientData);
                $results['success']++;
                $results['patients'][] = $patient;
            } catch (\Exception $e) {
                $results['failed']++;
                $results['errors'][] = [
                    'data' => $patientData,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $results;
    }

    /**
     * Quick register patient with minimal data.
     */
    public function quickRegister(array $data): Patient
    {
        return DB::transaction(function () use ($data) {
            $patientData = [
                'user_id' => $data['user_id'] ?? auth()->id(),
                'first_name' => $data['first_name'] ?? $data['firstName'] ?? '',
                'last_name' => $data['last_name'] ?? $data['lastName'] ?? '',
                'date_of_birth' => $data['date_of_birth'] ?? $data['dateOfBirth'] ?? null,
                'gender' => $data['gender'] ?? null,
                'phone_number' => $data['phone_number'] ?? $data['phoneNumber'] ?? null,
                'registered_at' => now(),
                'is_active' => true,
            ];

            $patient = $this->model->create($patientData);

            if (!empty($data['address'])) {
                $addressData = [
                    'patient_id' => $patient->id,
                    'province' => $data['address']['province'] ?? null,
                    'district' => $data['address']['district'] ?? null,
                    'is_primary' => true,
                ];
                PatientAddress::create($addressData);
            }

            if (!empty($data['phone_number'])) {
                PatientTelecom::create([
                    'patient_id' => $patient->id,
                    'system' => 'mobile',
                    'value' => $data['phone_number'],
                    'use' => 'mobile',
                    'is_primary' => true,
                ]);
            }

            return $patient->fresh(['primaryAddress', 'primaryTelecom']);
        });
    }

    /**
     * Get all patients with optional filters.
     */
    public function getAll(array $filters = [], array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $this->applyFilters($query, $filters);

        return $query->get();
    }

    /**
     * Get paginated patients.
     */
    public function getPaginated(int $perPage = 15, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $this->applyFilters($query, $filters);

        return $query->paginate($perPage);
    }

    public static function findPatient(array $searchParameters)
    {
        $searchValue = trim($searchParameters['searchValue'] ?? '');

        // Search NRC first
        $patients = Patient::where('first_name', 'LIKE', "%{$searchValue}%")->where('nrc_number', 'LIKE', "%{$searchValue}%")->get();

        return $patients;
    }
    /**
     * Find a patient by ID.
     */
    public function findById(int $id, array $relations = []): ?Patient
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Find a patient by UUID.
     */
    public function findByUuid(string $uuid, array $relations = []): ?Patient
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('uuid', $uuid)->first();
    }

    /**
     * Find a patient by NRC number.
     */
    public function findByNrc(string $nrcNumber, array $relations = []): ?Patient
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('nrc_number', $nrcNumber)->first();
    }

    /**
     * Find a patient by phone number.
     */
    public function findByPhone(string $phoneNumber, array $relations = []): ?Patient
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('phone_number', $phoneNumber)->first();
    }

    /**
     * Find patients by first name and/or last name.
     */
    public function findByName(string $firstName, ?string $lastName = null, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->where('first_name', 'like', "%{$firstName}%");

        if ($lastName) {
            $query->where('last_name', 'like', "%{$lastName}%");
        }

        return $query->get();
    }

    /**
     * Find patients by date of birth.
     */
    public function findByDob(string $dateOfBirth, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('date_of_birth', $dateOfBirth)->get();
    }

    /**
     * Find patients by gender.
     */
    public function findByGender(string $gender, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('gender', $gender)->get();
    }

    /**
     * Find patients by province.
     */
    public function findByProvince(string $province, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->byProvince($province)->get();
    }

    /**
     * Find patients by district.
     */
    public function findByDistrict(string $district, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->byDistrict($district)->get();
    }

    /**
     * Find patients by facility.
     */
    public function findByFacility(string $facility, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->byFacility($facility)->get();
    }

    /**
     * Find patients by HIV status.
     */
    public function findByHivStatus(string $status, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->withHivStatus($status)->get();
    }

    /**
     * Find patients by HPV status.
     */
    public function findByHpvStatus(string $status, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->withHpvStatus($status)->get();
    }

    /**
     * Find patients by risk level.
     */
    public function findByRiskLevel(string $riskLevel, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->withRiskLevel($riskLevel)->get();
    }

    /**
     * Find patients with specific risk flags.
     */
    public function findByRiskFlags(array $riskFlags, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereHas('riskFactors', function ($q) use ($riskFlags) {
            $q->whereJsonContains('risk_flags', $riskFlags);
        })->get();
    }

    /**
     * Search patients across multiple fields.
     */
    public function search(string $searchTerm, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->search($searchTerm)->get();
    }

    /**
     * Search patients with pagination.
     */
    public function searchPaginated(string $searchTerm, int $perPage = 15, array $relations = []): LengthAwarePaginator
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->search($searchTerm)->paginate($perPage);
    }

    /**
     * Find by multiple criteria.
     */
    public function findByCriteria(array $criteria, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        foreach ($criteria as $key => $value) {
            if (is_array($value)) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }

        return $query->get();
    }

    /**
     * Find by NRC or phone for quick lookup.
     */
    public function findByNrcOrPhone(string $identifier): ?Patient
    {
        return $this->model->query()
            ->where('nrc_number', $identifier)
            ->orWhere('phone_number', $identifier)
            ->first();
    }

    /**
     * Get patients with their latest risk assessment.
     */
    public function getWithLatestRiskAssessment(array $filters = [], array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->with('latestRiskFactor');
        $this->applyFilters($query, $filters);

        return $query->get();
    }

    /**
     * Get patients with their primary address.
     */
    public function getWithPrimaryAddress(array $filters = [], array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->with('primaryAddress');
        $this->applyFilters($query, $filters);

        return $query->get();
    }

    /**
     * Get patients with their primary contact.
     */
    public function getWithPrimaryContact(array $filters = [], array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->with('primaryTelecom');
        $this->applyFilters($query, $filters);

        return $query->get();
    }

    /**
     * Get patients with all relations.
     */
    public function getWithAllRelations(array $filters = []): Collection
    {
        $query = $this->model->query()
            ->with([
                'primaryAddress',
                'primaryTelecom',
                'latestRiskFactor',
                'addresses',
                'telecoms',
                'riskFactors',
                'user'
            ]);

        $this->applyFilters($query, $filters);

        return $query->get();
    }

    // ============================================
    // CREATE METHODS
    // ============================================

    /**
     * Create a new patient with all related data.
     */
    public function createWithRelations(array $data, array $addressData = [], array $telecomData = [], array $riskData = []): Patient
    {
        return DB::transaction(function () use ($data, $addressData, $telecomData, $riskData) {
            $patient = $this->create($data);

            if (!empty($addressData)) {
                $addressData['patient_id'] = $patient->id;
                PatientAddress::create($addressData);
            }

            if (!empty($telecomData)) {
                foreach ($telecomData as $telecom) {
                    $telecom['patient_id'] = $patient->id;
                    PatientTelecom::create($telecom);
                }
            }

            if (!empty($riskData)) {
                $riskData['patient_id'] = $patient->id;
                $risk = PatientRiskFactor::create($riskData);

                $score = $risk->calculateRiskScore();
                $level = $risk->determineRiskLevel($score);
                $risk->update([
                    'risk_score' => $score,
                    'risk_level' => $level,
                ]);
            }

            return $patient->fresh(['primaryAddress', 'primaryTelecom', 'latestRiskFactor']);
        });
    }

    /**
     * Create a new patient.
     */
    public function create(array $data): Patient
    {
        return $this->model->create($data);
    }

    // ============================================
    // UPDATE METHODS
    // ============================================

    /**
     * Update an existing patient.
     */
    public function update(int $id, array $data): Patient
    {
        $patient = $this->findById($id);
        $patient->update($data);
        return $patient->fresh();
    }

    /**
     * Update patient with relations.
     */
    public function updateWithRelations(int $id, array $data, array $addressData = [], array $telecomData = [], array $riskData = []): Patient
    {
        return DB::transaction(function () use ($id, $data, $addressData, $telecomData, $riskData) {
            $patient = $this->findById($id);
            $patient->update($data);

            if (!empty($addressData)) {
                $address = $patient->primaryAddress;
                if ($address) {
                    $address->update($addressData);
                } else {
                    $addressData['patient_id'] = $patient->id;
                    PatientAddress::create($addressData);
                }
            }

            if (!empty($telecomData)) {
                $patient->telecoms()->delete();
                foreach ($telecomData as $telecom) {
                    $telecom['patient_id'] = $patient->id;
                    PatientTelecom::create($telecom);
                }
            }

            if (!empty($riskData)) {
                $riskData['patient_id'] = $patient->id;
                $risk = PatientRiskFactor::create($riskData);

                $score = $risk->calculateRiskScore();
                $level = $risk->determineRiskLevel($score);
                $risk->update([
                    'risk_score' => $score,
                    'risk_level' => $level,
                ]);
            }

            return $patient->fresh(['primaryAddress', 'primaryTelecom', 'latestRiskFactor']);
        });
    }

    /**
     * Update patient status.
     */
    public function updateStatus(int $id, bool $isActive): Patient
    {
        $patient = $this->findById($id);
        $patient->update(['is_active' => $isActive]);
        return $patient->fresh();
    }

    // ============================================
    // DELETE METHODS
    // ============================================

    /**
     * Delete a patient (soft delete).
     */
    public function delete(int $id): bool
    {
        $patient = $this->findById($id);
        return $patient->delete();
    }

    /**
     * Soft delete a patient.
     */
    public function softDelete(int $id): bool
    {
        return $this->delete($id);
    }

    /**
     * Restore a soft-deleted patient.
     */
    public function restore(int $id): bool
    {
        $patient = $this->model->withTrashed()->find($id);
        return $patient ? $patient->restore() : false;
    }

    /**
     * Permanently delete a patient.
     */
    public function forceDelete(int $id): bool
    {
        $patient = $this->model->withTrashed()->find($id);
        return $patient ? $patient->forceDelete() : false;
    }

    // ============================================
    // COUNT METHODS
    // ============================================

    /**
     * Get count of patients.
     */
    public function count(array $filters = []): int
    {
        $query = $this->model->query();
        $this->applyFilters($query, $filters);
        return $query->count();
    }

    /**
     * Get patient count by province.
     */
    public function getCountByProvince(): array
    {
        return $this->model
            ->select('province', DB::raw('count(*) as total'))
            ->join('patient_addresses', 'patients.id', '=', 'patient_addresses.patient_id')
            ->where('patient_addresses.is_primary', true)
            ->whereNotNull('patient_addresses.province')
            ->groupBy('patient_addresses.province')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by district.
     */
    public function getCountByDistrict(?string $province = null): array
    {
        $query = $this->model
            ->select('district', DB::raw('count(*) as total'))
            ->join('patient_addresses', 'patients.id', '=', 'patient_addresses.patient_id')
            ->where('patient_addresses.is_primary', true)
            ->whereNotNull('patient_addresses.district');

        if ($province) {
            $query->where('patient_addresses.province', $province);
        }

        return $query->groupBy('patient_addresses.district')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by facility.
     */
    public function getCountByFacility(?string $district = null): array
    {
        $query = $this->model
            ->select('facility', DB::raw('count(*) as total'))
            ->whereNotNull('facility');

        if ($district) {
            $query->where('district', $district);
        }

        return $query->groupBy('facility')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by risk level.
     */
    public function getCountByRiskLevel(): array
    {
        return $this->model
            ->select('risk_level', DB::raw('count(*) as total'))
            ->join('patient_risk_factors', 'patients.id', '=', 'patient_risk_factors.patient_id')
            ->whereNotNull('patient_risk_factors.risk_level')
            ->groupBy('patient_risk_factors.risk_level')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by HIV status.
     */
    public function getCountByHivStatus(): array
    {
        return $this->model
            ->select('hiv_status', DB::raw('count(*) as total'))
            ->join('patient_risk_factors', 'patients.id', '=', 'patient_risk_factors.patient_id')
            ->whereNotNull('patient_risk_factors.hiv_status')
            ->groupBy('patient_risk_factors.hiv_status')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by HPV status.
     */
    public function getCountByHpvStatus(): array
    {
        return $this->model
            ->select('hpv_status', DB::raw('count(*) as total'))
            ->join('patient_risk_factors', 'patients.id', '=', 'patient_risk_factors.patient_id')
            ->whereNotNull('patient_risk_factors.hpv_status')
            ->groupBy('patient_risk_factors.hpv_status')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by age group.
     */
    public function getCountByAgeGroup(): array
    {
        $ageGroups = [
            '0-14' => [0, 14],
            '15-24' => [15, 24],
            '25-34' => [25, 34],
            '35-44' => [35, 44],
            '45-54' => [45, 54],
            '55-64' => [55, 64],
            '65+' => [65, 200],
        ];

        $result = [];

        foreach ($ageGroups as $group => $range) {
            $minDate = now()->subYears($range[1])->format('Y-m-d');
            $maxDate = now()->subYears($range[0])->format('Y-m-d');

            $count = $this->model
                ->whereBetween('date_of_birth', [$minDate, $maxDate])
                ->count();

            $result[$group] = $count;
        }

        return $result;
    }

    /**
     * Get patient count by gender.
     */
    public function getCountByGender(): array
    {
        return $this->model
            ->select('gender', DB::raw('count(*) as total'))
            ->whereNotNull('gender')
            ->groupBy('gender')
            ->get()
            ->toArray();
    }

    /**
     * Get patient count by marital status.
     */
    public function getCountByMaritalStatus(): array
    {
        return $this->model
            ->select('marital_status', DB::raw('count(*) as total'))
            ->whereNotNull('marital_status')
            ->groupBy('marital_status')
            ->get()
            ->toArray();
    }

    // ============================================
    // DATE RANGE METHODS
    // ============================================

    /**
     * Get patients registered in a date range.
     */
    public function getRegisteredBetween(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('registered_at', [$startDate, $endDate])->get();
    }

    /**
     * Get patients registered today.
     */
    public function getRegisteredToday(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereDate('registered_at', today())->get();
    }

    /**
     * Get patients registered this week.
     */
    public function getRegisteredThisWeek(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('registered_at', [now()->startOfWeek(), now()->endOfWeek()])->get();
    }

    /**
     * Get patients registered this month.
     */
    public function getRegisteredThisMonth(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereMonth('registered_at', now()->month)
            ->whereYear('registered_at', now()->year)
            ->get();
    }

    /**
     * Get patients by date of birth range.
     */
    public function getByDobRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('date_of_birth', [$startDate, $endDate])->get();
    }

    // ============================================
    // RISK METHODS
    // ============================================

    /**
     * Get high risk patients.
     */
    public function getHighRiskPatients(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->withHighRisk()->get();
    }

    /**
     * Get HIV positive patients.
     */
    public function getHivPositivePatients(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->hivPositive()->get();
    }

    /**
     * Get HPV positive patients.
     */
    public function getHpvPositivePatients(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->hpvPositive()->get();
    }

    /**
     * Get patients needing follow-up.
     */
    public function getPatientsNeedingFollowUp(int $daysSinceLastVisit = 90, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->needingFollowUp($daysSinceLastVisit)->get();
    }

    /**
     * Get patient risk summary.
     */
    public function getRiskSummary(int $id): array
    {
        $patient = $this->findById($id, ['latestRiskFactor']);
        if (!$patient || !$patient->latestRiskFactor) {
            return [
                'risk_score' => 0,
                'risk_level' => 'unknown',
                'risk_flags' => [],
                'has_risks' => false,
                'hiv_positive' => false,
                'hpv_positive' => false,
            ];
        }

        return $patient->latestRiskFactor->getRiskSummary();
    }

    // ============================================
    // PATIENT SPECIFIC FIND METHODS
    // ============================================

    /**
     * Get patients with incomplete profiles.
     */
    public function getPatientsWithIncompleteProfiles(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->incompleteProfiles()->get();
    }

    /**
     * Get patients by registered user.
     */
    public function getByRegisteredUser(int $userId, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('user_id', $userId)->get();
    }

    /**
     * Get patients by age range.
     */
    public function getByAgeRange(int $minAge, int $maxAge, array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $minDate = now()->subYears($maxAge)->format('Y-m-d');
        $maxDate = now()->subYears($minAge)->format('Y-m-d');

        return $query->whereBetween('date_of_birth', [$minDate, $maxDate])->get();
    }

    /**
     * Get active patients only.
     */
    public function getActivePatients(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->active()->get();
    }

    /**
     * Get inactive patients.
     */
    public function getInactivePatients(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->inactive()->get();
    }

    // ============================================
    // DISTINCT VALUES
    // ============================================

    /**
     * Get distinct provinces.
     */
    public function getDistinctProvinces(): array
    {
        return $this->model
            ->join('patient_addresses', 'patients.id', '=', 'patient_addresses.patient_id')
            ->where('patient_addresses.is_primary', true)
            ->whereNotNull('patient_addresses.province')
            ->distinct()
            ->pluck('patient_addresses.province')
            ->toArray();
    }

    /**
     * Get distinct districts.
     */
    public function getDistinctDistricts(?string $province = null): array
    {
        $query = $this->model
            ->join('patient_addresses', 'patients.id', '=', 'patient_addresses.patient_id')
            ->where('patient_addresses.is_primary', true)
            ->whereNotNull('patient_addresses.district');

        if ($province) {
            $query->where('patient_addresses.province', $province);
        }

        return $query->distinct()
            ->pluck('patient_addresses.district')
            ->toArray();
    }

    /**
     * Get distinct facilities.
     */
    public function getDistinctFacilities(?string $district = null): array
    {
        $query = $this->model
            ->whereNotNull('facility');

        if ($district) {
            $query->where('district', $district);
        }

        return $query->distinct()
            ->pluck('facility')
            ->toArray();
    }

    /**
     * Get distinct risk levels.
     */
    public function getDistinctRiskLevels(): array
    {
        return $this->model
            ->join('patient_risk_factors', 'patients.id', '=', 'patient_risk_factors.patient_id')
            ->whereNotNull('patient_risk_factors.risk_level')
            ->distinct()
            ->pluck('patient_risk_factors.risk_level')
            ->toArray();
    }

    // ============================================
    // DUPLICATE METHODS
    // ============================================

    /**
     * Get patients with duplicate NRC numbers.
     */
    public function getDuplicateNrcs(): Collection
    {
        return $this->model
            ->select('nrc_number', DB::raw('count(*) as count'))
            ->whereNotNull('nrc_number')
            ->groupBy('nrc_number')
            ->having('count', '>', 1)
            ->get();
    }

    /**
     * Get patients with duplicate phone numbers.
     */
    public function getDuplicatePhones(): Collection
    {
        return $this->model
            ->select('phone_number', DB::raw('count(*) as count'))
            ->whereNotNull('phone_number')
            ->groupBy('phone_number')
            ->having('count', '>', 1)
            ->get();
    }

    /**
     * Merge duplicate patients.
     */
    public function mergeDuplicates(int $primaryId, array $duplicateIds): Patient
    {
        return DB::transaction(function () use ($primaryId, $duplicateIds) {
            $primary = $this->findById($primaryId);

            foreach ($duplicateIds as $duplicateId) {
                $duplicate = $this->findById($duplicateId);
                if (!$duplicate) continue;

                $duplicate->addresses()->update(['patient_id' => $primaryId]);
                $duplicate->telecoms()->update(['patient_id' => $primaryId]);
                $duplicate->riskFactors()->update(['patient_id' => $primaryId]);
                $duplicate->forceDelete();
            }

            return $primary->fresh(['primaryAddress', 'primaryTelecom', 'latestRiskFactor']);
        });
    }

    // ============================================
    // STATISTICS METHODS
    // ============================================

    /**
     * Get statistics for dashboard.
     */
    public function getStatistics(): array
    {
        return [
            'total' => $this->model->count(),
            'active' => $this->model->active()->count(),
            'inactive' => $this->model->inactive()->count(),
            'high_risk' => $this->model->withHighRisk()->count(),
            'hiv_positive' => $this->model->hivPositive()->count(),
            'hpv_positive' => $this->model->hpvPositive()->count(),
            'registered_today' => $this->model->registeredToday()->count(),
            'registered_this_week' => $this->model->registeredThisWeek()->count(),
            'registered_this_month' => $this->model->registeredThisMonth()->count(),
            'by_gender' => $this->getCountByGender(),
            'by_province' => $this->getCountByProvince(),
            'by_district' => $this->getCountByDistrict(),
            'by_risk_level' => $this->getCountByRiskLevel(),
            'by_hiv_status' => $this->getCountByHivStatus(),
            'by_hpv_status' => $this->getCountByHpvStatus(),
            'by_age_group' => $this->getCountByAgeGroup(),
            'by_marital_status' => $this->getCountByMaritalStatus(),
        ];
    }

    /**
     * Get monthly registration trends.
     */
    public function getRegistrationTrends(int $months = 12): array
    {
        $startDate = now()->subMonths($months)->startOfMonth();

        return $this->model
            ->select(
                DB::raw('YEAR(registered_at) as year'),
                DB::raw('MONTH(registered_at) as month'),
                DB::raw('count(*) as total')
            )
            ->where('registered_at', '>=', $startDate)
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->toArray();
    }

    // ============================================
    // EXPORT AND IMPORT METHODS
    // ============================================

    /**
     * Export patients to array.
     */
    public function export(array $filters = [], array $fields = []): array
    {
        $query = $this->model->query();
        $this->applyFilters($query, $filters);

        if (empty($fields)) {
            $fields = [
                'id', 'first_name', 'last_name', 'date_of_birth', 'gender',
                'marital_status', 'nrc_number', 'phone_number', 'province',
                'district', 'facility', 'hiv_status', 'hpv_status',
                'risk_level', 'registered_at'
            ];
        }

        return $query->select($fields)->get()->toArray();
    }

    /**
     * Bulk import patients.
     */
    public function bulkImport(array $patients): array
    {
        $results = [
            'success' => 0,
            'failed' => 0,
            'errors' => [],
        ];

        foreach ($patients as $patientData) {
            try {
                DB::beginTransaction();

                $addressData = $patientData['address'] ?? [];
                $telecomData = $patientData['telecom'] ?? [];
                $riskData = $patientData['risk'] ?? [];

                unset($patientData['address'], $patientData['telecom'], $patientData['risk']);

                $patient = $this->create($patientData);

                if (!empty($addressData)) {
                    $addressData['patient_id'] = $patient->id;
                    PatientAddress::create($addressData);
                }

                if (!empty($telecomData)) {
                    foreach ($telecomData as $telecom) {
                        $telecom['patient_id'] = $patient->id;
                        PatientTelecom::create($telecom);
                    }
                }

                if (!empty($riskData)) {
                    $riskData['patient_id'] = $patient->id;
                    $risk = PatientRiskFactor::create($riskData);

                    $score = $risk->calculateRiskScore();
                    $level = $risk->determineRiskLevel($score);
                    $risk->update([
                        'risk_score' => $score,
                        'risk_level' => $level,
                    ]);
                }

                DB::commit();
                $results['success']++;
            } catch (\Exception $e) {
                DB::rollBack();
                $results['failed']++;
                $results['errors'][] = [
                    'patient' => $patientData,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $results;
    }

    // ============================================
    // SUMMARY METHODS
    // ============================================

    /**
     * Get patient demographic summary.
     */
    public function getDemographicSummary(int $id): array
    {
        $patient = $this->findById($id);

        if (!$patient) {
            return [];
        }

        return [
            'id' => $patient->id,
            'full_name' => $patient->full_name,
            'age' => $patient->age,
            'gender' => $patient->gender,
            'date_of_birth' => $patient->date_of_birth?->format('Y-m-d'),
            'marital_status' => $patient->marital_status,
            'nrc_number' => $patient->nrc_number,
            'phone_number' => $patient->phone_number,
            'registered_at' => $patient->registered_at?->format('Y-m-d H:i:s'),
            'registered_by' => $patient->user?->name,
        ];
    }

    /**
     * Get patient contact summary.
     */
    public function getContactSummary(int $id): array
    {
        $patient = $this->findById($id, ['telecoms', 'primaryAddress']);

        if (!$patient) {
            return [];
        }

        return [
            'primary_phone' => $patient->primaryTelecom?->value,
            'primary_email' => $patient->telecoms->where('system', 'email')->first()?->value,
            'address' => $patient->formatted_address,
            'province' => $patient->primaryAddress?->province,
            'district' => $patient->primaryAddress?->district,
            'telecoms' => $patient->telecoms->map(function ($telecom) {
                return [
                    'system' => $telecom->system,
                    'value' => $telecom->value,
                    'use' => $telecom->use,
                    'is_primary' => $telecom->is_primary,
                ];
            })->toArray(),
        ];
    }

    // ============================================
    // FIND WITH RELATIONS
    // ============================================

    /**
     * Get patient with all addresses.
     */
    public function findWithAddresses(int $id): ?Patient
    {
        return $this->findById($id, ['addresses']);
    }

    /**
     * Get patient with all telecoms.
     */
    public function findWithTelecoms(int $id): ?Patient
    {
        return $this->findById($id, ['telecoms']);
    }

    /**
     * Get patient with all risk assessments.
     */
    public function findWithRiskAssessments(int $id): ?Patient
    {
        return $this->findById($id, ['riskFactors']);
    }

    /**
     * Get patient with specific risk assessment.
     */
    public function findWithSpecificRiskAssessment(int $patientId, int $riskId): ?Patient
    {
        return $this->model->query()
            ->with(['riskFactors' => function ($query) use ($riskId) {
                $query->where('id', $riskId);
            }])
            ->find($patientId);
    }

    /**
     * Get patients with risk assessments count.
     */
    public function getWithRiskAssessmentCount(array $relations = []): Collection
    {
        $query = $this->model->query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->withCount('riskFactors')->get();
    }

    // ============================================
    // APPOINTMENT METHODS (Placeholder)
    // ============================================

    /**
     * Get patients with upcoming appointments.
     */
    public function getWithUpcomingAppointments(int $daysAhead = 7, array $relations = []): Collection
    {
        return collect([]);
    }

    /**
     * Get patients with overdue appointments.
     */
    public function getWithOverdueAppointments(int $daysOverdue = 30, array $relations = []): Collection
    {
        return collect([]);
    }

    // ============================================
    // SELECT/DROPDOWN METHODS
    // ============================================

    /**
     * Get patients for dropdown/select.
     */
    public function getForSelect(?string $search = null, int $limit = 50): array
    {
        $query = $this->model->query()
            ->select('id', 'first_name', 'last_name', 'nrc_number', 'phone_number')
            ->active();

        if ($search) {
            $query->search($search);
        }

        return $query->limit($limit)
            ->get()
            ->map(function ($patient) {
                return [
                    'id' => $patient->id,
                    'text' => $patient->full_name . ' (' . $patient->nrc_number . ')',
                    'name' => $patient->full_name,
                    'nrc' => $patient->nrc_number,
                    'phone' => $patient->phone_number,
                ];
            })
            ->toArray();
    }

    /**
     * Check if a patient exists.
     */
    public function exists(array $criteria): bool
    {
        return $this->model->where($criteria)->exists();
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /**
     * Apply filters to query.
     */
    protected function applyFilters($query, array $filters): void
    {
        if (isset($filters['search'])) {
            $query->search($filters['search']);
        }

        if (isset($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }

        if (isset($filters['province'])) {
            $query->byProvince($filters['province']);
        }

        if (isset($filters['district'])) {
            $query->byDistrict($filters['district']);
        }

        if (isset($filters['facility'])) {
            $query->byFacility($filters['facility']);
        }

        if (isset($filters['hiv_status'])) {
            $query->withHivStatus($filters['hiv_status']);
        }

        if (isset($filters['hpv_status'])) {
            $query->withHpvStatus($filters['hpv_status']);
        }

        if (isset($filters['risk_level'])) {
            $query->withRiskLevel($filters['risk_level']);
        }

        if (isset($filters['date_from'])) {
            $query->whereDate('registered_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to'])) {
            $query->whereDate('registered_at', '<=', $filters['date_to']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['age_min'])) {
            $minDate = now()->subYears($filters['age_min'])->format('Y-m-d');
            $query->where('date_of_birth', '<=', $minDate);
        }

        if (isset($filters['age_max'])) {
            $maxDate = now()->subYears($filters['age_max'])->format('Y-m-d');
            $query->where('date_of_birth', '>=', $maxDate);
        }

        if (isset($filters['ids']) && is_array($filters['ids'])) {
            $query->whereIn('id', $filters['ids']);
        }

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (isset($filters['sort_by'])) {
            $direction = $filters['sort_direction'] ?? 'asc';
            $query->orderBy($filters['sort_by'], $direction);
        }
    }
}

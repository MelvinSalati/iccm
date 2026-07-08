<?php

namespace App\Domains\Patients\Services;

use App\Domains\Patients\Actions\PatientRegistrationAction;
use App\Domains\Patients\Repositories\PatientRepository;

class PatientService
{
    protected $repository;

    public function __construct(PatientRepository $repository)
    {
        $this->repository = $repository;
    }

    public static function search($patientSearch){
        return PatientRepository::findPatient($patientSearch);
    }

    public function create(array $data)
    {
        // Validate the data before creating
        $validatedData = PatientRegistrationAction::validateInputs($data);

        // Create the patient using repository
        return $this->repository->newPatient($validatedData);
    }
}

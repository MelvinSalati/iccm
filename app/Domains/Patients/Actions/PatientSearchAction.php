<?php

namespace App\Domains\Patients\Actions;

use App\Domains\Patients\Services\PatientService;
use Inertia\Inertia;

class PatientSearchAction
{
    protected   $patient;

    /**
     * Create a new class instance.
     */
    public function __construct(PatientService $patientService)
    {
        $this->patient = $patientService;
    }

    public static function search($patientRequest)
    {
        return PatientService::search($patientRequest);
    }
}

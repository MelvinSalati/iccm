<?php

namespace App\Domains\Patients\Repositories\Contracts;

interface PatientVisitInterface
{
    public function createVisit(array $patientVisitData);
}

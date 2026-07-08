<?php


namespace App\Domains\Patients\Repositories;
use App\Domains\Patients\Repositories\Contracts\PatientVisitInterface;
use App\Models\Patients\PatientVisit;

class PatientVisitRepository implements  PatientVisitInterface {

    public  function createVisit(array $patientVisitData)
    {
        // TODO: Implement createVisit() method.
        return PatientVisit::create($patientVisitData);
    }
}

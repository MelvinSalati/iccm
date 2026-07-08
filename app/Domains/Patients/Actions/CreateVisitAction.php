<?php

namespace App\Domains\Patients\Actions;
use App\Helpers\IdentifiersHelper;
use App\Jobs\Domains\DatawareHousing\Queues\DataWarehouseJob;
use App\Models\Patients\PatientVisit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Helpers\TokenGeneratorHelper;

class CreateVisitAction
{

    private $visit;
    /**
     * Create a new class instance.
     */
    public function __construct(Request $request)
    {
        $this->visit  = $request->all();
    }
    private  function isCreated($patientUuid){
        $patientId      =  IdentifiersHelper::getPatientIdByUuid($patientUuid);
        return PatientVisit::where('patient_id', $patientId)->where('visit_status','checked_in')->first();
    }

    public function execute(): mixed{

        if($this->isCreated($this->visit['patient_id'])){
            return response()->json([
                'message' => 'Patient visit already created!'
            ],403);
        }

        $data = array_merge($this->visit, [
            'visit_token' => TokenGeneratorHelper::generateRandom(32, 'TOKEN_'),
            'patient_id' => IdentifiersHelper::getPatientIdByUuid($this->visit['patient_id']),
            'visit_number' => rand(10000, 99999),
            'metadata' => json_encode([
                'location_type' => 'facility',
                'initiated_by' => $this->visit['created_by'],
                'initiated_at' => now()->toISOString()
            ]),
        ]);

        $createVisit = PatientVisit::create($data);

        if ($createVisit) {

            $createVisit->refresh();

            DataWarehouseJob::dispatch(
                interaction: 'visit.created',
                model: PatientVisit::class,
                id: $createVisit->id
            )->onQueue('datawarehouse');

            return response()->json([
                'message' => 'Visit created successfully.',
                'data' => [
                    'id' => $createVisit->visit_token,
                ]
            ], 201);
        }
        return $response;
   }
}

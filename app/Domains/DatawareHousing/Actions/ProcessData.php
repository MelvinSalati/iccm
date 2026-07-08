<?php

namespace App\Domains\DatawareHousing\Actions;

use App\Domains\DatawareHousing\Builders\BuilderFactory;
use App\Domains\DatawareHousing\Services\RabbitMQPublisher;
use App\Jobs\Domains\DatawareHousing\Queues\DataWarehouseJob;

class ProcessData
{
    protected mixed $payload;
    protected string $interaction;

    public function __construct(
        mixed $payload,
        string $interaction
    ) {
        $this->payload = $payload;
        $this->interaction = $interaction;
    }

    /**
     * Convert the interaction into an HL7 message.
     */
    private function convertToHL7(): string
    {
        $builder = BuilderFactory::make($this->interaction);

        return $builder->build($this->payload);
    }

    /**
     * Execute the integration.
     */
    public function execute(): void
    {
        $hl7 = $this->convertToHL7();

        DataWarehouseJob::dispatch(
            interaction: $this->interaction,
            hl7: $hl7,
            metadata: [
                'patient_id' => $this->payload->patient_id ?? null,
                'facility_id' => $this->payload->facility_id ?? null,
                'module' => 'cervical_cancer',
            ]
        )->onQueue('datawarehouse');
    }
}

<?php

namespace App\Listeners;

use App\Events\PatientVisitCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class QueueClinicalInteraction
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PatientVisitCreated $event): void
    {
        //
    }
}

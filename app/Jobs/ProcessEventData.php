<?php

namespace App\Jobs;

use App\Models\EventData;
use App\Models\EnrolledFacility;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProcessEventData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [60, 120, 300];

    protected array $eventData;
    protected string $sourceType;

    public function __construct(array $eventData, string $sourceType)
    {
        $this->eventData = $eventData;
        $this->sourceType = $sourceType;
    }

    public function handle(): void
    {
        try {
            // Get facility_id
            $facilityId = $this->eventData['facility_id'] ?? null;
            $district = $this->eventData['district'] ?? null;
            $province = $this->eventData['province'] ?? null;

            // If facility_id exists, try to get district and province from facility
            if ($facilityId) {
                try {
                    $facility = EnrolledFacility::find($facilityId);
                    if ($facility) {
                        // Use facility's district/province if not provided
                        if (empty($district) && !empty($facility->district)) {
                            $district = $facility->district;
                        }
                        if (empty($province) && !empty($facility->province)) {
                            $province = $facility->province;
                        }
                    }
                } catch (\Exception $e) {
                    Log::warning('Could not fetch facility details', [
                        'facility_id' => $facilityId,
                        'error' => $e->getMessage()
                    ]);
                }
            }

            // If still no district or province, try to get from event data or use defaults
            if (empty($district)) {
                $district = $this->eventData['district'] ?? 'Unknown';
                Log::warning('District missing, using default', [
                    'facility_id' => $facilityId,
                    'source_type' => $this->sourceType,
                    'default_district' => $district
                ]);
            }

            if (empty($province)) {
                $province = $this->eventData['province'] ?? 'Unknown';
                Log::warning('Province missing, using default', [
                    'facility_id' => $facilityId,
                    'source_type' => $this->sourceType,
                    'default_province' => $province
                ]);
            }

            // If still null, use fallback values
            if (empty($district)) {
                $district = 'Unknown';
            }
            if (empty($province)) {
                $province = 'Unknown';
            }

            // Create the EventData record
            $event = EventData::create([
                'uuid' => (string) Str::uuid(),
                'source_type' => $this->sourceType,
                'event_type' => $this->eventData['event_type'] ?? $this->sourceType,
                'facility_id' => $facilityId,
                'district' => $district,
                'province' => $province,
                'entity_id' => $this->eventData['entity_id'] ?? null,
                'entity_type' => $this->eventData['entity_type'] ?? 'patient',
                'entity_name' => $this->eventData['entity_name'] ?? null,
                'age' => $this->eventData['age'] ?? null,
                'gender' => $this->eventData['gender'] ?? null,
                'phone' => $this->eventData['phone'] ?? null,
                'event_date' => $this->eventData['event_date'] ?? now()->toDateString(),
                'event_time' => $this->eventData['event_time'] ?? null,
                'screening_type' => $this->eventData['screening_type'] ?? null,
                'result' => $this->eventData['result'] ?? null,
                'result_date' => $this->eventData['result_date'] ?? null,
                'test_type' => $this->eventData['test_type'] ?? null,
                'test_result' => $this->eventData['test_result'] ?? null,
                'test_value' => $this->eventData['test_value'] ?? null,
                'test_units' => $this->eventData['test_units'] ?? null,
                'hiv_positive' => $this->eventData['hiv_positive'] ?? false,
                'hiv_status' => $this->eventData['hiv_status'] ?? null,
                'hpv_strain' => $this->eventData['hpv_strain'] ?? null,
                'via_findings' => $this->eventData['via_findings'] ?? null,
                'risk_factors' => $this->eventData['risk_factors'] ?? null,
                'risk_level' => $this->eventData['risk_level'] ?? null,
                'referred_to' => $this->eventData['referred_to'] ?? null,
                'referral_reason' => $this->eventData['referral_reason'] ?? null,
                'referral_date' => $this->eventData['referral_date'] ?? null,
                'follow_up_date' => $this->eventData['follow_up_date'] ?? null,
                'treatment_given' => $this->eventData['treatment_given'] ?? null,
                'provider_name' => $this->eventData['provider_name'] ?? null,
                'performed_by' => $this->eventData['performed_by'] ?? null,
                'status' => $this->eventData['status'] ?? 'completed',
                'notes' => $this->eventData['notes'] ?? null,
                'payload' => $this->eventData['payload'] ?? null,
                'metadata' => $this->eventData['metadata'] ?? null,
            ]);

            Log::info('EventData created', [
                'event_id' => $event->id,
                'source_type' => $this->sourceType,
                'event_type' => $this->eventData['event_type'] ?? $this->sourceType,
                'facility_id' => $event->facility_id,
                'district' => $event->district,
                'province' => $event->province,
            ]);

            // Dispatch indicator recalculation if facility_id exists
            if ($event->facility_id) {
                RecalculateIndicators::dispatch($event->facility_id, 'monthly')
                    ->delay(now()->addSeconds(5));
            }

        } catch (\Exception $e) {
            Log::error('ProcessEventData failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'event_data' => $this->eventData,
                'source_type' => $this->sourceType,
            ]);
            throw $e;
        }
    }
}

<?php

namespace App\Helpers;

use App\Models\Patients\Patient;

class IdentifiersHelper
{
    /**
     * Get patient auto-increment ID by UUID
     *
     * @param string $uuid
     * @return int|null
     */
    public static function getPatientIdByUuid(string $uuid): ?int
    {
        $patient = Patient::where('patient_uuid', $uuid)->first();
        return $patient?->id;
    }

    public static function createIdentity($timeStamp)
    {
        $number = rand(100000, 999999);

        $identity = $number . '-' . $timeStamp->format('m-Y');

        return $identity;
    }
    /**
     * Get patient by UUID and return specific fields
     *
     * @param string $uuid
     * @param array $fields
     * @return object|null
     */
    public static function getPatientByUuid(string $uuid, array $fields = ['id', 'patient_uuid']): ?object
    {
        return Patient::where('patient_uuid', $uuid)->select($fields)->first();
    }

    /**
     * Get multiple patient IDs by UUIDs
     *
     * @param array $uuids
     * @return array
     */
    public static function getPatientIdsByUuids(array $uuids): array
    {
        return Patient::whereIn('patient_uuid', $uuids)
            ->pluck('id', 'patient_uuid')
            ->toArray();
    }

    /**
     * Check if patient exists by UUID
     *
     * @param string $uuid
     * @return bool
     */
    public static function patientExistsByUuid(string $uuid): bool
    {
        return Patient::where('patient_uuid', $uuid)->exists();
    }
}

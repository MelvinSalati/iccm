<?php

namespace App\Domains\Patients\Repositories\Contracts;

use App\Models\Patients\Patient;
use App\Models\Patients\PatientAddress;
use App\Models\Patients\PatientRiskFactor;
use App\Models\Patients\PatientTelecom;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface PatientInterface
{
    public function newPatient(array $data);
    /**
     * Get all patients with optional filters.
     *
     * @param array $filters
     * @param array $relations
     * @return Collection
     */
    public function getAll(array $filters = [], array $relations = []): Collection;

    /**
     * Get paginated patients.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function getPaginated(int $perPage = 15, array $filters = [], array $relations = []): LengthAwarePaginator;

    /**
     * Find a patient by ID.
     *
     * @param int $id
     * @param array $relations
     * @return Patient|null
     */
    public function findById(int $id, array $relations = []);

    /**
     * Find a patient by NRC number.
     *
     * @param string $nrcNumber
     * @param array $relations
     * @return Patient|null
     */
    public function findByNrc(string $nrcNumber, array $relations = []): ?Patient;

    /**
     * Find a patient by phone number.
     *
     * @param string $phoneNumber
     * @param array $relations
     * @return Patient|null
     */
    public function findByPhone(string $phoneNumber, array $relations = []): ?Patient;

    /**
     * Find patients by first name and/or last name.
     *
     * @param string $firstName
     * @param string|null $lastName
     * @param array $relations
     * @return Collection
     */
    public function findByName(string $firstName, ?string $lastName = null, array $relations = []): Collection;

    /**
     * Find patients by date of birth.
     *
     * @param string $dateOfBirth
     * @param array $relations
     * @return Collection
     */
    public function findByDob(string $dateOfBirth, array $relations = []): Collection;

    /**
     * Find patients by gender.
     *
     * @param string $gender
     * @param array $relations
     * @return Collection
     */
    public function findByGender(string $gender, array $relations = []): Collection;

    /**
     * Find patients by province.
     *
     * @param string $province
     * @param array $relations
     * @return Collection
     */
    public function findByProvince(string $province, array $relations = []): Collection;

    /**
     * Find patients by district.
     *
     * @param string $district
     * @param array $relations
     * @return Collection
     */
    public function findByDistrict(string $district, array $relations = []): Collection;

    /**
     * Find patients by facility.
     *
     * @param string $facility
     * @param array $relations
     * @return Collection
     */
    public function findByFacility(string $facility, array $relations = []): Collection;

    /**
     * Find patients by HIV status.
     *
     * @param string $status
     * @param array $relations
     * @return Collection
     */
    public function findByHivStatus(string $status, array $relations = []): Collection;

    /**
     * Find patients by HPV status.
     *
     * @param string $status
     * @param array $relations
     * @return Collection
     */
    public function findByHpvStatus(string $status, array $relations = []): Collection;

    /**
     * Find patients by risk level.
     *
     * @param string $riskLevel
     * @param array $relations
     * @return Collection
     */
    public function findByRiskLevel(string $riskLevel, array $relations = []): Collection;

    /**
     * Find patients with specific risk flags.
     *
     * @param array $riskFlags
     * @param array $relations
     * @return Collection
     */
    public function findByRiskFlags(array $riskFlags, array $relations = []): Collection;

    /**
     * Search patients across multiple fields.
     *
     * @param string $searchTerm
     * @param array $relations
     * @return Collection
     */
    public function search(string $searchTerm, array $relations = []): Collection;

    /**
     * Search patients with pagination.
     *
     * @param string $searchTerm
     * @param int $perPage
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function searchPaginated(string $searchTerm, int $perPage = 15, array $relations = []): LengthAwarePaginator;

    /**
     * Create a new patient with all related data.
     *
     * @param array $data
     * @param array $addressData
     * @param array $telecomData
     * @param array $riskData
     * @return Patient
     */
    public function createWithRelations(array $data, array $addressData = [], array $telecomData = [], array $riskData = []): Patient;

    /**
     * Create a new patient.
     *
     * @param array $data
     * @return Patient
     */
    public function create(array $data): Patient;

    /**
     * Update an existing patient.
     *
     * @param int $id
     * @param array $data
     * @return Patient
     */
    public function update(int $id, array $data): Patient;

    /**
     * Update patient with relations.
     *
     * @param int $id
     * @param array $data
     * @param array $addressData
     * @param array $telecomData
     * @param array $riskData
     * @return Patient
     */
    public function updateWithRelations(int $id, array $data, array $addressData = [], array $telecomData = [], array $riskData = []): Patient;

    /**
     * Delete a patient.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Soft delete a patient.
     *
     * @param int $id
     * @return bool
     */
    public function softDelete(int $id): bool;

    /**
     * Restore a soft-deleted patient.
     *
     * @param int $id
     * @return bool
     */
    public function restore(int $id): bool;

    /**
     * Permanently delete a patient.
     *
     * @param int $id
     * @return bool
     */
    public function forceDelete(int $id): bool;

    /**
     * Get count of patients.
     *
     * @param array $filters
     * @return int
     */
    public function count(array $filters = []): int;

    /**
     * Get statistics for dashboard.
     *
     * @return array
     */
    public function getStatistics(): array;

    /**
     * Get patients registered in a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getRegisteredBetween(string $startDate, string $endDate, array $relations = []): Collection;

    /**
     * Get patients registered today.
     *
     * @param array $relations
     * @return Collection
     */
    public function getRegisteredToday(array $relations = []): Collection;

    /**
     * Get patients registered this week.
     *
     * @param array $relations
     * @return Collection
     */
    public function getRegisteredThisWeek(array $relations = []): Collection;

    /**
     * Get patients registered this month.
     *
     * @param array $relations
     * @return Collection
     */
    public function getRegisteredThisMonth(array $relations = []): Collection;

    /**
     * Get patients by age range.
     *
     * @param int $minAge
     * @param int $maxAge
     * @param array $relations
     * @return Collection
     */
    public function getByAgeRange(int $minAge, int $maxAge, array $relations = []): Collection;

    /**
     * Get patients who are high risk.
     *
     * @param array $relations
     * @return Collection
     */
    public function getHighRiskPatients(array $relations = []): Collection;

    /**
     * Get patients who are HIV positive.
     *
     * @param array $relations
     * @return Collection
     */
    public function getHivPositivePatients(array $relations = []): Collection;

    /**
     * Get patients who are HPV positive.
     *
     * @param array $relations
     * @return Collection
     */
    public function getHpvPositivePatients(array $relations = []): Collection;

    /**
     * Get patients needing follow-up.
     *
     * @param int $daysSinceLastVisit
     * @param array $relations
     * @return Collection
     */
    public function getPatientsNeedingFollowUp(int $daysSinceLastVisit = 90, array $relations = []): Collection;

    /**
     * Get patients with incomplete profiles.
     *
     * @param array $relations
     * @return Collection
     */
    public function getPatientsWithIncompleteProfiles(array $relations = []): Collection;

    /**
     * Get patients by registered user.
     *
     * @param int $userId
     * @param array $relations
     * @return Collection
     */
    public function getByRegisteredUser(int $userId, array $relations = []): Collection;

    /**
     * Get patient count by province.
     *
     * @return array
     */
    public function getCountByProvince(): array;

    /**
     * Get patient count by district.
     *
     * @param string|null $province
     * @return array
     */
    public function getCountByDistrict(?string $province = null): array;

    /**
     * Get patient count by facility.
     *
     * @param string|null $district
     * @return array
     */
    public function getCountByFacility(?string $district = null): array;

    /**
     * Get patient count by risk level.
     *
     * @return array
     */
    public function getCountByRiskLevel(): array;

    /**
     * Get patient count by HIV status.
     *
     * @return array
     */
    public function getCountByHivStatus(): array;

    /**
     * Get patient count by HPV status.
     *
     * @return array
     */
    public function getCountByHpvStatus(): array;

    /**
     * Get patient count by age group.
     *
     * @return array
     */
    public function getCountByAgeGroup(): array;

    /**
     * Get patient count by gender.
     *
     * @return array
     */
    public function getCountByGender(): array;

    /**
     * Get patient count by marital status.
     *
     * @return array
     */
    public function getCountByMaritalStatus(): array;

    /**
     * Get monthly registration trends.
     *
     * @param int $months
     * @return array
     */
    public function getRegistrationTrends(int $months = 12): array;

    /**
     * Bulk import patients.
     *
     * @param array $patients
     * @return array
     */
    public function bulkImport(array $patients): array;

    /**
     * Export patients to array.
     *
     * @param array $filters
     * @param array $fields
     * @return array
     */
    public function export(array $filters = [], array $fields = []): array;

    /**
     * Check if a patient exists.
     *
     * @param array $criteria
     * @return bool
     */
    public function exists(array $criteria): bool;

    /**
     * Get distinct provinces.
     *
     * @return array
     */
    public function getDistinctProvinces(): array;

    /**
     * Get distinct districts.
     *
     * @param string|null $province
     * @return array
     */
    public function getDistinctDistricts(?string $province = null): array;

    /**
     * Get distinct facilities.
     *
     * @param string|null $district
     * @return array
     */
    public function getDistinctFacilities(?string $district = null): array;

    /**
     * Get distinct risk levels.
     *
     * @return array
     */
    public function getDistinctRiskLevels(): array;

    /**
     * Get patients with their latest risk assessment.
     *
     * @param array $filters
     * @param array $relations
     * @return Collection
     */
    public function getWithLatestRiskAssessment(array $filters = [], array $relations = []): Collection;

    /**
     * Get patients with their primary address.
     *
     * @param array $filters
     * @param array $relations
     * @return Collection
     */
    public function getWithPrimaryAddress(array $filters = [], array $relations = []): Collection;

    /**
     * Get patients with their primary contact.
     *
     * @param array $filters
     * @param array $relations
     * @return Collection
     */
    public function getWithPrimaryContact(array $filters = [], array $relations = []): Collection;

    /**
     * Get patients with all relations.
     *
     * @param array $filters
     * @return Collection
     */
    public function getWithAllRelations(array $filters = []): Collection;

    /**
     * Find by multiple criteria.
     *
     * @param array $criteria
     * @param array $relations
     * @return Collection
     */
    public function findByCriteria(array $criteria, array $relations = []): Collection;

    /**
     * Get patients with duplicate NRC numbers.
     *
     * @return Collection
     */
    public function getDuplicateNrcs(): Collection;

    /**
     * Get patients with duplicate phone numbers.
     *
     * @return Collection
     */
    public function getDuplicatePhones(): Collection;

    /**
     * Merge duplicate patients.
     *
     * @param int $primaryId
     * @param array $duplicateIds
     * @return Patient
     */
    public function mergeDuplicates(int $primaryId, array $duplicateIds): Patient;

    /**
     * Update patient status.
     *
     * @param int $id
     * @param bool $isActive
     * @return Patient
     */
    public function updateStatus(int $id, bool $isActive): Patient;

    /**
     * Get patients for dropdown/select.
     *
     * @param string|null $search
     * @param int $limit
     * @return array
     */
    public function getForSelect(?string $search = null, int $limit = 50): array;

    /**
     * Get patient with all addresses.
     *
     * @param int $id
     * @return Patient|null
     */
    public function findWithAddresses(int $id): ?Patient;

    /**
     * Get patient with all telecoms.
     *
     * @param int $id
     * @return Patient|null
     */
    public function findWithTelecoms(int $id): ?Patient;

    /**
     * Get patient with all risk assessments.
     *
     * @param int $id
     * @return Patient|null
     */
    public function findWithRiskAssessments(int $id): ?Patient;

    /**
     * Get patient with specific risk assessment.
     *
     * @param int $patientId
     * @param int $riskId
     * @return Patient|null
     */
    public function findWithSpecificRiskAssessment(int $patientId, int $riskId): ?Patient;

    /**
     * Get active patients only.
     *
     * @param array $relations
     * @return Collection
     */
    public function getActivePatients(array $relations = []): Collection;

    /**
     * Get inactive patients.
     *
     * @param array $relations
     * @return Collection
     */
    public function getInactivePatients(array $relations = []): Collection;

    /**
     * Get patients with upcoming appointments (if applicable).
     *
     * @param int $daysAhead
     * @param array $relations
     * @return Collection
     */
    public function getWithUpcomingAppointments(int $daysAhead = 7, array $relations = []): Collection;

    /**
     * Get patients with overdue appointments (if applicable).
     *
     * @param int $daysOverdue
     * @param array $relations
     * @return Collection
     */
    public function getWithOverdueAppointments(int $daysOverdue = 30, array $relations = []): Collection;

    /**
     * Get patients by NRC or phone for quick lookup.
     *
     * @param string $identifier
     * @return Patient|null
     */
    public function findByNrcOrPhone(string $identifier): ?Patient;

    /**
     * Get patients by date of birth range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDobRange(string $startDate, string $endDate, array $relations = []): Collection;

    /**
     * Get all patients with risk assessments count.
     *
     * @param array $relations
     * @return Collection
     */
    public function getWithRiskAssessmentCount(array $relations = []): Collection;

    /**
     * Get patient risk summary.
     *
     * @param int $id
     * @return array
     */
    public function getRiskSummary(int $id): array;

    /**
     * Get patient demographic summary.
     *
     * @param int $id
     * @return array
     */
    public function getDemographicSummary(int $id): array;

    /**
     * Get patient contact summary.
     *
     * @param int $id
     * @return array
     */
    public function getContactSummary(int $id): array;
}

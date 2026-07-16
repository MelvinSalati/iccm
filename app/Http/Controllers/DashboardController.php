<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get appointments data for the appointments modal - Overall Admin/Program Officer View
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAppointmentsData(Request $request)
    {
        $period = $request->get('period', 'week');

        // Base query - NO facility filter
        $query = DB::table('event_data')->whereNull('deleted_at');

        // Apply period filter
        $this->applyPeriodFilter($query, $period);

        // Get appointment events
        $appointmentQuery = clone $query;
        $appointmentQuery->whereIn('event_type', ['appointment_created', 'appointment_updated']);

        // Get all appointment events
        $appointments = (clone $appointmentQuery)->get();

        // Process appointments to get unique appointments with latest status
        $processedAppointments = $this->processAppointmentEvents($appointments);

        // Calculate summary statistics
        $summary = $this->calculateAppointmentSummary($processedAppointments);

        // Group by type
        $typeBreakdown = $this->groupAppointmentsByType($processedAppointments);

        // Get recent appointments (overall)
        $recentAppointments = $this->getRecentAppointments($appointments);

        // Get appointment trends (last 6 months)
        $trends = $this->getAppointmentTrends($appointmentQuery);

        // Get follow-ups
        $followUps = $this->getFollowUpData($appointments);

        // Get status distribution
        $statusDistribution = $this->getStatusDistribution($processedAppointments);

        return response()->json([
            'summary' => $summary,
            'type_breakdown' => $typeBreakdown,
            'status_distribution' => $statusDistribution,
            'recent_appointments' => $recentAppointments,
            'trends' => $trends,
            'follow_ups' => $followUps,
            'period' => $period,
        ]);
    }

    /**
     * Process appointment events to get unique appointments with latest status
     */
    private function processAppointmentEvents($appointments)
    {
        $appointmentMap = [];

        foreach ($appointments as $event) {
            $metadata = json_decode($event->metadata ?? '{}', true);
            $extraData = json_decode($event->extra_data ?? '{}', true);

            $appointmentId = $metadata['appointment_id'] ?? $event->id;

            // Determine status
            $status = 'pending';
            if ($event->event_type === 'appointment_created') {
                $status = $extraData['appointment_status'] ?? 'scheduled';
            } elseif ($event->event_type === 'appointment_updated') {
                $appStatus = $extraData['appointment_status'] ?? $metadata['appointment_status'] ?? null;
                if ($appStatus === 'completed' || $appStatus === 'confirmed') {
                    $status = 'completed';
                } elseif ($appStatus === 'cancelled') {
                    $status = 'cancelled';
                } elseif ($appStatus === 'no-show') {
                    $status = 'no-show';
                } else {
                    $status = 'scheduled';
                }
            }

            // Get appointment type
            $type = $metadata['appointment_type'] ?? 'Consultation';

            // Store or update appointment
            if (!isset($appointmentMap[$appointmentId])) {
                $appointmentMap[$appointmentId] = [
                    'id' => $appointmentId,
                    'patient_id' => $event->patient_id,
                    'patient_name' => $event->patient_name ?? 'Unknown Patient',
                    'patient_age' => $event->patient_age ?? null,
                    'patient_gender' => $event->patient_gender ?? null,
                    'patient_phone' => $event->patient_phone ?? null,
                    'appointment_type' => $type,
                    'status' => $status,
                    'scheduled_date' => $event->appointment_date ?? $event->event_date,
                    'scheduled_time' => $event->appointment_time ?? '00:00:00',
                    'facility_name' => $event->facility_name ?? 'Unknown Facility',
                    'facility_id' => $event->facility_id,
                    'doctor_name' => $metadata['doctor_name'] ?? '',
                    'reason' => $metadata['reason'] ?? '',
                    'follow_up_needed' => $metadata['follow_up_needed'] ?? false,
                    'follow_up_date' => $metadata['follow_up_date'] ?? null,
                    'notes' => $metadata['notes'] ?? '',
                    'created_at' => $event->created_at,
                    'updated_at' => $event->updated_at,
                ];
            } else {
                // Update existing appointment with latest status
                $appointmentMap[$appointmentId]['status'] = $status;
                $appointmentMap[$appointmentId]['updated_at'] = $event->updated_at;

                // Update follow-up info if available
                if (isset($metadata['follow_up_needed'])) {
                    $appointmentMap[$appointmentId]['follow_up_needed'] = $metadata['follow_up_needed'];
                    $appointmentMap[$appointmentId]['follow_up_date'] = $metadata['follow_up_date'] ?? null;
                }
                if (isset($metadata['reason'])) {
                    $appointmentMap[$appointmentId]['reason'] = $metadata['reason'];
                }
                if (isset($metadata['notes'])) {
                    $appointmentMap[$appointmentId]['notes'] = $metadata['notes'];
                }
                if (isset($metadata['doctor_name'])) {
                    $appointmentMap[$appointmentId]['doctor_name'] = $metadata['doctor_name'];
                }
            }
        }

        return array_values($appointmentMap);
    }

    /**
     * Calculate appointment summary statistics
     */
    private function calculateAppointmentSummary($appointments)
    {
        $summary = [
            'total' => count($appointments),
            'scheduled' => 0,
            'completed' => 0,
            'cancelled' => 0,
            'no_show' => 0,
            'pending' => 0,
            'consultation' => 0,
            'follow_up' => 0,
            'screening' => 0,
            'attendance_rate' => 0,
            'completion_rate' => 0,
        ];

        foreach ($appointments as $appt) {
            // Count by status
            if ($appt['status'] === 'scheduled') {
                $summary['scheduled']++;
            } elseif ($appt['status'] === 'completed') {
                $summary['completed']++;
            } elseif ($appt['status'] === 'cancelled') {
                $summary['cancelled']++;
            } elseif ($appt['status'] === 'no-show') {
                $summary['no_show']++;
            } else {
                $summary['pending']++;
            }

            // Count by type
            $type = strtolower($appt['appointment_type']);
            if (str_contains($type, 'consult')) {
                $summary['consultation']++;
            } elseif (str_contains($type, 'follow') || str_contains($type, 'follow-up')) {
                $summary['follow_up']++;
            } elseif (str_contains($type, 'screen')) {
                $summary['screening']++;
            }
        }

        // Calculate rates
        $totalAppointments = $summary['scheduled'] + $summary['completed'] + $summary['cancelled'] + $summary['no_show'];
        $summary['attendance_rate'] = $totalAppointments > 0
            ? round(($summary['completed'] / $totalAppointments) * 100, 2)
            : 0;

        $totalBooked = $summary['scheduled'] + $summary['completed'];
        $summary['completion_rate'] = $totalBooked > 0
            ? round(($summary['completed'] / $totalBooked) * 100, 2)
            : 0;

        return $summary;
    }

    /**
     * Group appointments by type
     */
    private function groupAppointmentsByType($appointments)
    {
        $types = [
            'Consultation' => ['count' => 0, 'completed' => 0, 'scheduled' => 0, 'cancelled' => 0],
            'Follow-up' => ['count' => 0, 'completed' => 0, 'scheduled' => 0, 'cancelled' => 0],
            'Screening' => ['count' => 0, 'completed' => 0, 'scheduled' => 0, 'cancelled' => 0],
            'Other' => ['count' => 0, 'completed' => 0, 'scheduled' => 0, 'cancelled' => 0],
        ];

        foreach ($appointments as $appt) {
            $type = $appt['appointment_type'];
            $key = 'Other';

            $typeLower = strtolower($type);
            if (str_contains($typeLower, 'consult')) {
                $key = 'Consultation';
            } elseif (str_contains($typeLower, 'follow') || str_contains($typeLower, 'follow-up')) {
                $key = 'Follow-up';
            } elseif (str_contains($typeLower, 'screen')) {
                $key = 'Screening';
            }

            $types[$key]['count']++;
            if ($appt['status'] === 'completed') {
                $types[$key]['completed']++;
            } elseif ($appt['status'] === 'scheduled') {
                $types[$key]['scheduled']++;
            } elseif ($appt['status'] === 'cancelled') {
                $types[$key]['cancelled']++;
            }
        }

        return $types;
    }

    /**
     * Get status distribution
     */
    private function getStatusDistribution($appointments)
    {
        $distribution = [
            'scheduled' => 0,
            'completed' => 0,
            'cancelled' => 0,
            'no_show' => 0,
            'pending' => 0,
        ];

        foreach ($appointments as $appt) {
            if (isset($distribution[$appt['status']])) {
                $distribution[$appt['status']]++;
            }
        }

        // Calculate percentages
        $total = array_sum($distribution);
        if ($total > 0) {
            foreach ($distribution as $key => $value) {
                $distribution[$key . '_percentage'] = round(($value / $total) * 100, 2);
            }
        }

        return $distribution;
    }

    /**
     * Get recent appointments
     */
    private function getRecentAppointments($appointments, $limit = 10)
    {
        return $appointments->sortByDesc('event_date')
            ->take($limit)
            ->map(function($event) {
                $metadata = json_decode($event->metadata ?? '{}', true);
                $extraData = json_decode($event->extra_data ?? '{}', true);

                $status = $event->status ?? 'pending';
                if ($event->event_type === 'appointment_created') {
                    $status = $extraData['appointment_status'] ?? 'scheduled';
                } elseif ($event->event_type === 'appointment_updated') {
                    $appStatus = $extraData['appointment_status'] ?? $metadata['appointment_status'] ?? null;
                    if ($appStatus === 'completed' || $appStatus === 'confirmed') {
                        $status = 'completed';
                    } elseif ($appStatus === 'cancelled') {
                        $status = 'cancelled';
                    } elseif ($appStatus === 'no-show') {
                        $status = 'no-show';
                    } else {
                        $status = 'scheduled';
                    }
                }

                return [
                    'id' => $event->id,
                    'patient_name' => $event->patient_name ?? 'Unknown',
                    'appointment_type' => $metadata['appointment_type'] ?? 'Consultation',
                    'status' => $status,
                    'event_date' => $event->event_date,
                    'appointment_date' => $event->appointment_date ?? $event->event_date,
                    'appointment_time' => $event->appointment_time ?? '00:00:00',
                    'facility_name' => $event->facility_name ?? 'Unknown',
                    'event_type' => $event->event_type,
                    'follow_up_needed' => $metadata['follow_up_needed'] ?? false,
                ];
            })
            ->values()
            ->toArray();
    }

    /**
     * Get appointment trends over time
     */
    private function getAppointmentTrends($query, $months = 6)
    {
        $trends = [];
        $currentDate = Carbon::now();

        for ($i = $months - 1; $i >= 0; $i--) {
            $month = $currentDate->copy()->subMonths($i);
            $monthStart = $month->copy()->startOfMonth();
            $monthEnd = $month->copy()->endOfMonth();

            $monthQuery = clone $query;
            $monthQuery->whereBetween('event_date', [$monthStart, $monthEnd]);

            // Total appointments
            $total = (clone $monthQuery)->whereIn('event_type', ['appointment_created', 'appointment_updated'])->count();

            // Completed appointments
            $completed = (clone $monthQuery)
                ->whereIn('event_type', ['appointment_created', 'appointment_updated'])
                ->where('status', 'completed')
                ->count();

            // Scheduled appointments
            $scheduled = (clone $monthQuery)
                ->whereIn('event_type', ['appointment_created', 'appointment_updated'])
                ->where('status', 'scheduled')
                ->count();

            // Follow-ups
            $followUps = (clone $monthQuery)
                ->whereIn('event_type', ['appointment_created', 'appointment_updated'])
                ->where('appointment_type', 'Follow-up')
                ->count();

            // Consultations
            $consultations = (clone $monthQuery)
                ->whereIn('event_type', ['appointment_created', 'appointment_updated'])
                ->where('appointment_type', 'Consultation')
                ->count();

            $trends[$month->format('M Y')] = [
                'month' => $month->format('M Y'),
                'total' => $total,
                'completed' => $completed,
                'scheduled' => $scheduled,
                'follow_ups' => $followUps,
                'consultations' => $consultations,
                'rate' => $total > 0 ? round(($completed / $total) * 100, 2) : 0,
            ];
        }

        return $trends;
    }

    /**
     * Get follow-up data
     */
    private function getFollowUpData($appointments)
    {
        $followUps = [];
        $pendingFollowUps = 0;
        $completedFollowUps = 0;
        $overdueFollowUps = 0;
        $today = Carbon::now()->toDateString();

        foreach ($appointments as $event) {
            $metadata = json_decode($event->metadata ?? '{}', true);

            if (isset($metadata['follow_up_needed']) && $metadata['follow_up_needed'] === true) {
                $status = $event->status ?? 'pending';
                $followUpDate = $metadata['follow_up_date'] ?? null;

                // Check if overdue
                $isOverdue = false;
                if ($followUpDate && $status !== 'completed') {
                    $isOverdue = Carbon::parse($followUpDate)->isPast();
                }

                $followUps[] = [
                    'appointment_id' => $metadata['appointment_id'] ?? $event->id,
                    'patient_name' => $event->patient_name ?? 'Unknown',
                    'follow_up_date' => $followUpDate,
                    'status' => $status,
                    'appointment_type' => $metadata['appointment_type'] ?? 'Follow-up',
                    'is_overdue' => $isOverdue,
                ];

                if ($status === 'completed') {
                    $completedFollowUps++;
                } else {
                    $pendingFollowUps++;
                    if ($isOverdue) {
                        $overdueFollowUps++;
                    }
                }
            }
        }

        return [
            'total' => count($followUps),
            'pending' => $pendingFollowUps,
            'completed' => $completedFollowUps,
            'overdue' => $overdueFollowUps,
            'list' => $followUps,
        ];
    }

    /**
     * Apply period filter to query
     */
    private function applyPeriodFilter(&$query, $period)
    {
        $now = Carbon::now();

        switch ($period) {
            case 'today':
                $query->whereDate('event_date', $now->toDateString());
                break;
            case 'week':
                $query->whereBetween('event_date', [
                    $now->copy()->startOfWeek(),
                    $now->copy()->endOfWeek()
                ]);
                break;
            case 'month':
                $query->whereBetween('event_date', [
                    $now->copy()->startOfMonth(),
                    $now->copy()->endOfMonth()
                ]);
                break;
            case 'quarter':
                $query->whereBetween('event_date', [
                    $now->copy()->startOfQuarter(),
                    $now->copy()->endOfQuarter()
                ]);
                break;
            case 'year':
                $query->whereBetween('event_date', [
                    $now->copy()->startOfYear(),
                    $now->copy()->endOfYear()
                ]);
                break;
        }

        return $query;
    }

    // ... (keep all other existing methods like getSummary, getScreenings, etc.)
}

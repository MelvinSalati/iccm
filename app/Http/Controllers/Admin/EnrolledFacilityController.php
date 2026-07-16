<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EnrolledFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EnrolledFacilityController extends Controller
{
    /**
     * Display a listing of facilities
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $facilities = EnrolledFacility::all(); // Or whatever your model is
        return response()->json($facilities);
    }

    public function getFacilityById($facilityId){
        return response()->json([
            'facility' => EnrolledFacility::where('id', $facilityId)->first()
        ]);
    }
    public function getFacilities(){
        return Inertia::render('admin/manage-facility');
    }

    /**
     * Store a new facility
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:enrolled_facilities,code',
            'type' => 'required|in:hospital,clinic,health_center,district_hospital',
            'district' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'status' => 'nullable|in:active,inactive,pending',
        ]);

        $facility = EnrolledFacility::create($validated);

        return response()->json([
            'message' => 'Facility created successfully',
            'data' => $facility
        ], 201);
    }

    /**
     * Display the specified facility
     */
    public function show($id)
    {
        $facility = EnrolledFacility::findOrFail($id);
        return response()->json($facility);
    }

    /**
     * Update the specified facility
     */
    public function update(Request $request, $id)
    {
        $facility = EnrolledFacility::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:enrolled_facilities,code,' . $id,
            'type' => 'sometimes|in:hospital,clinic,health_center,district_hospital',
            'district' => 'sometimes|string|max:255',
            'province' => 'sometimes|string|max:255',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'status' => 'nullable|in:active,inactive,pending',
        ]);

        $facility->update($validated);

        return response()->json([
            'message' => 'Facility updated successfully',
            'data' => $facility
        ]);
    }

    /**
     * Remove the specified facility
     */
    public function destroy($id)
    {
        try {
            $facility = EnrolledFacility::findOrFail($id);
            $facility->delete();

            return response()->json([
                'message' => 'Facility deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete facility: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get facility statistics
     */
    public function stats($id)
    {
        $facility = EnrolledFacility::findOrFail($id);

        $stats = [
            'facility' => $facility,
            'event_counts' => [
                'total' => $facility->events()->count(),
                'by_source' => $facility->events()
                    ->select('source_type', \DB::raw('COUNT(*) as count'))
                    ->groupBy('source_type')
                    ->get()
                    ->pluck('count', 'source_type')
                    ->toArray(),
                'today' => $facility->events()
                    ->whereDate('event_date', now())
                    ->count(),
                'this_week' => $facility->events()
                    ->whereBetween('event_date', [now()->startOfWeek(), now()])
                    ->count(),
                'this_month' => $facility->events()
                    ->whereBetween('event_date', [now()->startOfMonth(), now()])
                    ->count(),
            ]
        ];

        return response()->json($stats);
    }
}

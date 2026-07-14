<?php

namespace App\Http\Controllers;

use App\Models\BreastCancerScreening;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BreastCancerController extends Controller
{
    public function index(Request $request)
    {
        $query = BreastCancerScreening::query()
            ->with(['patient', 'creator'])
            ->where('screening_type', 'breast');

        // Apply filters
        if ($request->filled('result')) {
            $query->where('result', $request->result);
        }

        if ($request->filled('stage')) {
            $query->where('stage_group', $request->stage);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('screening_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('screening_date', '<=', $request->date_to);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'LIKE', "%{$search}%")
                    ->orWhereHas('patient', function ($pq) use ($search) {
                        $pq->where('first_name', 'LIKE', "%{$search}%")
                            ->orWhere('last_name', 'LIKE', "%{$search}%")
                            ->orWhere('nrc_number', 'LIKE', "%{$search}%");
                    });
            });
        }

        $screenings = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 20);

        return inertia('breast-cancer', [
            'screenings' => $screenings->items(),
            'filters' => $request->only(['result', 'stage', 'date_from', 'date_to']),
            'pagination' => [
                'current_page' => $screenings->currentPage(),
                'last_page' => $screenings->lastPage(),
                'per_page' => $screenings->perPage(),
                'total' => $screenings->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'left_breast_swelling' => 'boolean',
            'left_breast_swelling_duration' => 'nullable|string',
            'right_breast_swelling' => 'boolean',
            'right_breast_swelling_duration' => 'nullable|string',
            // ... all other fields validation
        ]);

        try {
            DB::beginTransaction();

            // Determine result based on staging
            $isPositive = $request->m_category === 'M1';
            $result = $isPositive ? 'positive' : 'inconclusive';

            $screening = BreastCancerScreening::create([
                'patient_id' => $request->patient_id,
                'screening_type' => 'breast',
                'result' => $result,
                'is_positive' => $isPositive,
                'screening_date' => now(),
                'submitted_by' => auth()->id(),
                'full_data' => $request->all(),
                'stage_group' => $request->stage_group,
                'er_status' => $request->er ?? 0,
                'pr_status' => $request->pr ?? 0,
                'her2_status' => $request->her2 ?? 0,
            ]);

            DB::commit();

            return response()->json($screening, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create breast cancer screening', [
                'error' => $e->getMessage(),
                'data' => $request->all(),
            ]);
            return response()->json(['message' => 'Failed to create screening'], 500);
        }
    }

    public function export(Request $request)
    {
        $query = BreastCancerScreening::query()
            ->with(['patient'])
            ->where('screening_type', 'breast');

        // Apply same filters as index

        $screenings = $query->get();

        $csvData = $this->generateCSV($screenings);

        return response()
            ->streamDownload(function () use ($csvData) {
                echo $csvData;
            }, 'breast_cancer_screenings_' . date('Y-m-d') . '.csv');
    }

    private function generateCSV($screenings)
    {
        $headers = [
            'ID', 'Patient Name', 'Age', 'Gender', 'Screening Date',
            'Result', 'Stage', 'ER%', 'PR%', 'HER2', 'Submitted By'
        ];

        $output = fopen('php://temp', 'r+');
        fputcsv($output, $headers);

        foreach ($screenings as $screening) {
            fputcsv($output, [
                $screening->id,
                $screening->patient->full_name ?? 'Unknown',
                $screening->patient->age ?? 'N/A',
                $screening->patient->gender ?? 'N/A',
                $screening->screening_date,
                $screening->is_positive ? 'Positive' : $screening->result,
                $screening->stage_group ?? 'N/A',
                $screening->er_status ?? 0,
                $screening->pr_status ?? 0,
                $screening->her2_status ?? 0,
                $screening->submitted_by ?? 'N/A',
            ]);
        }

        rewind($output);
        return stream_get_contents($output);
    }
}

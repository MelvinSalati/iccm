<?php

namespace App\Http\Controllers;

use App\Models\CommunityOutreach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CommunityOutreachController extends Controller
{
    public function index()
    {
        try {
            $records = DB::table('community_outreaches')
                ->orderBy('outreach_date', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $records,
                'count' => $records->count()
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch records: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch records',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created community outreach record.
     */
    public function store(Request $request)
    {
        // Log the incoming request
        Log::info('Community Outreach Store Request:', $request->all());

        // Validate the request
        $validator = Validator::make($request->all(), [
            'outreach_date' => ['required', 'date'],
            'outreach_type' => ['required', 'string', 'max:255'],
            'community_name' => ['required', 'string', 'max:255'],
            'chw_name' => ['required', 'string', 'max:255'],
            'facility' => ['required', 'string', 'max:255'],
            'services' => ['required', 'array', 'min:1'],
            'services.*' => ['string'],
            'women_reached' => ['nullable', 'integer', 'min:0'],
            'men_reached' => ['nullable', 'integer', 'min:0'],
            'male_engagement' => ['nullable', 'integer', 'min:0'],
            'total_beneficiaries' => ['nullable', 'integer', 'min:0'],
            'awareness_session_conducted' => ['nullable', 'boolean'],
            'referred_for_screening' => ['nullable', 'boolean'],
            'referral_required' => ['nullable', 'boolean'],
            'referred_facility' => ['nullable', 'string', 'max:255'],
            'referral_date' => ['nullable', 'date'],
            'referral_outcome' => ['nullable', 'string', 'max:255'],
            'referral_status' => ['nullable', 'string', 'in:pending,completed,not_required'],
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed:', $validator->errors()->toArray());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // ============================================
        // CREATE DATA INSERT ARRAY - ONLY COLUMNS THAT EXIST
        // ============================================
        $data = [
            'outreach_date' => $request->outreach_date,
            'outreach_type' => $request->outreach_type,
            'community_name' => $request->community_name,
            'chw_name' => $request->chw_name,
            'facility' => $request->facility,
            'services' => json_encode($request->services), // Convert to JSON string
            'women_reached' => $request->women_reached ?? 0,
            'men_reached' => $request->men_reached ?? 0,
            'total_beneficiaries' => $request->total_beneficiaries ?? 0,
            'awareness_session_conducted' => $request->awareness_session_conducted ?? false,
            'referred_for_screening' => $request->referred_for_screening ?? false,
            'referral_required' => $request->referral_required ?? false,
            'referred_facility' => $request->referral_required ? $request->referred_facility : null,
            'referral_date' => $request->referral_required ? $request->referral_date : null,
            'referral_outcome' => $request->referral_required ? $request->referral_outcome : null,
            'referral_status' => $request->referral_status ?? 'not_required',
        ];

        // ============================================
        // ONLY ADD male_engagement IF COLUMN EXISTS
        // ============================================
        $columns = \DB::getSchemaBuilder()->getColumnListing('community_outreaches');
        if (in_array('male_engagement', $columns)) {
            $data['male_engagement'] = $request->male_engagement ?? 0;
        }

        // ============================================
        // ONLY ADD service_counts IF COLUMN EXISTS
        // ============================================
        if (in_array('service_counts', $columns)) {
            // Create service counts from selected services
            $serviceCounts = [];
            foreach ($request->services as $service) {
                $serviceCounts[$service] = 0;
            }
            $data['service_counts'] = json_encode($serviceCounts);
        }

        // ============================================
        // ONLY ADD province_code and district_code IF COLUMNS EXIST
        // ============================================
        if (in_array('province_code', $columns)) {
            $data['province_code'] = $request->province_code ?? null;
        }
        if (in_array('district_code', $columns)) {
            $data['district_code'] = $request->district_code ?? null;
        }

        // Log the final data array
        Log::info('Final data insert array:', $data);

        try {
            // Create the record
            $record = CommunityOutreach::create($data);

            Log::info('Record created successfully:', ['id' => $record->id]);

            return response()->json([
                'message' => 'Community outreach record created successfully',
                'data' => $record
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating record:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to create record',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing community outreach record.
     */
    public function update(Request $request, $id)
    {
        Log::info('Community Outreach Update Request:', ['id' => $id, 'data' => $request->all()]);

        // Validate the request
        $validator = Validator::make($request->all(), [
            'outreach_date' => ['required', 'date'],
            'outreach_type' => ['required', 'string', 'max:255'],
            'community_name' => ['required', 'string', 'max:255'],
            'chw_name' => ['required', 'string', 'max:255'],
            'facility' => ['required', 'string', 'max:255'],
            'services' => ['required', 'array', 'min:1'],
            'services.*' => ['string'],
            'women_reached' => ['nullable', 'integer', 'min:0'],
            'men_reached' => ['nullable', 'integer', 'min:0'],
            'male_engagement' => ['nullable', 'integer', 'min:0'],
            'total_beneficiaries' => ['nullable', 'integer', 'min:0'],
            'awareness_session_conducted' => ['nullable', 'boolean'],
            'referred_for_screening' => ['nullable', 'boolean'],
            'referral_required' => ['nullable', 'boolean'],
            'referred_facility' => ['nullable', 'string', 'max:255'],
            'referral_date' => ['nullable', 'date'],
            'referral_outcome' => ['nullable', 'string', 'max:255'],
            'referral_status' => ['nullable', 'string', 'in:pending,completed,not_required'],
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed:', $validator->errors()->toArray());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Find the record
        $record = CommunityOutreach::find($id);

        if (!$record) {
            return response()->json([
                'message' => 'Record not found'
            ], 404);
        }

        // ============================================
        // CREATE DATA UPDATE ARRAY FROM PAYLOAD
        // ============================================
        $data = [
            'outreach_date' => $request->outreach_date,
            'outreach_type' => $request->outreach_type,
            'community_name' => $request->community_name,
            'chw_name' => $request->chw_name,
            'facility' => $request->facility,
            'services' => $request->services,
            'women_reached' => $request->women_reached ?? 0,
            'men_reached' => $request->men_reached ?? 0,
            'male_engagement' => $request->male_engagement ?? 0,
            'total_beneficiaries' => $request->total_beneficiaries ?? 0,
            'awareness_session_conducted' => $request->awareness_session_conducted ?? false,
            'referred_for_screening' => $request->referred_for_screening ?? false,
            'referral_required' => $request->referral_required ?? false,
            'referred_facility' => $request->referral_required ? $request->referred_facility : null,
            'referral_date' => $request->referral_required ? $request->referral_date : null,
            'referral_outcome' => $request->referral_required ? $request->referral_outcome : null,
            'referral_status' => $request->referral_status ?? 'not_required',
        ];

        // Log the data array
        Log::info('Data update array:', $data);

        try {
            // Update the record
            $record->update($data);

            Log::info('Record updated successfully:', ['id' => $record->id]);

            return response()->json([
                'message' => 'Community outreach record updated successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error updating record:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to update record',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

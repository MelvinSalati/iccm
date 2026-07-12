<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CommunityOutreachControllers extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
     * Store a newly created resource.
     */
    public function store(Request $request)
    {
        try {
            // Log incoming data
            Log::info('📥 Incoming POST data:', $request->all());

            // Get values with proper defaults
            $womenReached = (int) $request->input('women_reached', 0);
            $menReached = (int) $request->input('men_reached', 0);
            $totalBeneficiaries = (int) $request->input('total_beneficiaries', 0);

            // If total not provided, calculate it
            if (!$totalBeneficiaries) {
                $totalBeneficiaries = $womenReached + $menReached;
            }

            // Prepare data
            $data = [
                'outreach_date' => $request->input('outreach_date', date('Y-m-d')),
                'community_name' => $request->input('community_name', 'Unknown'),
                'chw_name' => $request->input('chw_name', 'Unknown'),
                'outreach_type' => $request->input('outreach_type', 'Other'),
                'facility' => $request->input('facility', 'Unknown'),
                'province_code' => $request->input('province_code'),
                'district_code' => $request->input('district_code'),
                'services' => json_encode($request->input('services', [])),
                'service_counts' => json_encode($request->input('service_counts', [])),
                'referred_for_screening' => $request->boolean('referred_for_screening', false) ? 1 : 0,
                'awareness_session_conducted' => $request->boolean('awareness_session_conducted', false) ? 1 : 0,
                'women_reached' => $womenReached,
                'men_reached' => $menReached,
                'total_beneficiaries' => $totalBeneficiaries,
                'referral_required' => $request->boolean('referral_required', false) ? 1 : 0,
                'referred_facility' => $request->input('referred_facility'),
                'referral_date' => $request->input('referral_date'),
                'referral_outcome' => $request->input('referral_outcome'),
                'referral_status' => $request->input('referral_status', 'not_required'),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            Log::info('📝 Inserting data:', $data);

            // Insert
            $inserted = DB::table('community_outreaches')->insert($data);

            if ($inserted) {
                $lastId = DB::getPdo()->lastInsertId();
                $record = DB::table('community_outreaches')->where('id', $lastId)->first();

                Log::info('✅ Record inserted:', ['id' => $lastId]);

                return response()->json([
                    'success' => true,
                    'message' => 'Community outreach record created successfully',
                    'data' => $record
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to insert record'
            ], 500);

        } catch (\Exception $e) {
            Log::error('❌ Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create record',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource.
     */
    public function update(Request $request, $id)
    {
        try {
            Log::info('📥 Incoming PUT data for ID ' . $id . ':', $request->all());

            // Check if record exists
            $record = DB::table('community_outreaches')->where('id', $id)->first();
            if (!$record) {
                return response()->json([
                    'success' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            // Prepare data
            $data = [
                'outreach_date' => $request->input('outreach_date', $record->outreach_date),
                'community_name' => $request->input('community_name', $record->community_name),
                'chw_name' => $request->input('chw_name', $record->chw_name),
                'outreach_type' => $request->input('outreach_type', $record->outreach_type),
                'facility' => $request->input('facility', $record->facility),
                'province_code' => $request->input('province_code', $record->province_code),
                'district_code' => $request->input('district_code', $record->district_code),
                'services' => $request->has('services') ? json_encode($request->input('services')) : $record->services,
                'service_counts' => $request->has('service_counts') ? json_encode($request->input('service_counts')) : $record->service_counts,
                'referred_for_screening' => $request->boolean('referred_for_screening', $record->referred_for_screening) ? 1 : 0,
                'awareness_session_conducted' => $request->boolean('awareness_session_conducted', $record->awareness_session_conducted) ? 1 : 0,
                'women_reached' => (int) $request->input('women_reached', $record->women_reached),
                'men_reached' => (int) $request->input('men_reached', $record->men_reached),
                'total_beneficiaries' => (int) $request->input('total_beneficiaries', 0),
                'referral_required' => $request->boolean('referral_required', $record->referral_required) ? 1 : 0,
                'referred_facility' => $request->input('referred_facility', $record->referred_facility),
                'referral_date' => $request->input('referral_date', $record->referral_date),
                'referral_outcome' => $request->input('referral_outcome', $record->referral_outcome),
                'referral_status' => $request->input('referral_status', $record->referral_status),
                'updated_at' => now(),
            ];

            // Calculate total
            if (!$data['total_beneficiaries']) {
                $data['total_beneficiaries'] = $data['women_reached'] + $data['men_reached'];
            }

            Log::info('📝 Updating data:', $data);

            // ✅ Update directly using DB
            $updated = DB::table('community_outreaches')
                ->where('id', $id)
                ->update($data);

            // Get the updated record
            $record = DB::table('community_outreaches')->where('id', $id)->first();

            Log::info('✅ Record updated successfully:', ['id' => $id]);

            return response()->json([
                'success' => true,
                'message' => 'Community outreach record updated successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            Log::error('❌ Failed to update record: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update record',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource.
     */
    public function destroy($id)
    {
        try {
            $deleted = DB::table('community_outreaches')->where('id', $id)->delete();

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            Log::info('🗑️ Record deleted:', ['id' => $id]);

            return response()->json([
                'success' => true,
                'message' => 'Community outreach record deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('❌ Failed to delete record: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete record',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a single record.
     */
    public function show($id)
    {
        try {
            $record = DB::table('community_outreaches')->where('id', $id)->first();

            if (!$record) {
                return response()->json([
                    'success' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch record: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch record',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics.
     */
    public function statistics()
    {
        try {
            $stats = [
                'total_outreaches' => DB::table('community_outreaches')->count(),
                'total_women_reached' => DB::table('community_outreaches')->sum('women_reached'),
                'total_men_reached' => DB::table('community_outreaches')->sum('men_reached'),
                'total_beneficiaries' => DB::table('community_outreaches')->sum('total_beneficiaries'),
                'referrals_made' => DB::table('community_outreaches')->where('referred_for_screening', 1)->count(),
                'referrals_completed' => DB::table('community_outreaches')->where('referral_status', 'completed')->count(),
                'awareness_sessions' => DB::table('community_outreaches')->where('awareness_session_conducted', 1)->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch statistics: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

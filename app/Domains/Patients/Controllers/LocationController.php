<?php

namespace App\Domains\Patients\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Province;
use App\Models\District;
use App\Models\Facility;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getProvinces()
    {
        return response()->json(
            Province::select('id', 'name', 'code')->orderBy('name')->get()
        );
    }

    public function getDistricts(Request $request)
    {
        $provinceId = $request->query('province_id');

        $query = District::select('id', 'name', 'province_id');

        if ($provinceId) {
            $query->where('province_id', $provinceId);
        }

        return response()->json(
            $query->orderBy('name')->get()
        );
    }

    public function getFacilities(Request $request)
    {
        $districtId = $request->query('district_id');

        $query = Facility::select('id', 'name', 'type', 'district_id');

        if ($districtId) {
            $query->where('district_id', $districtId);
        }

        return response()->json(
            $query->orderBy('name')->get()
        );
    }
}

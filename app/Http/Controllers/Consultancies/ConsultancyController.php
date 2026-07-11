<?php

namespace App\Http\Controllers\Consultancies;

use App\Helpers\EncryptionHelper;
use App\Http\Controllers\Controller;
use App\Models\Consultancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultancyController extends Controller
{
    public function createConsultancy(Request $request){
       return  Consultancy::create($request->all());
    }

    public function viewConsultancy($facilityId){
        $facility = EncryptionHelper::decryptId($facilityId);

        $consultationEvents =  Consultancy::all();
        return Inertia::render('Consultancy/consultancy', [
            'consultationEvents' => $consultationEvents
        ]);
    }

    public function updateConsultancy(Request $request, $id){
        return Consultancy::where('id', $id)->update($request->all());
    }
}

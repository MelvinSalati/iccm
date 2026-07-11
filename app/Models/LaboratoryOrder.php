<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaboratoryOrder extends Model
{
    protected $fillable = [
    'laboratory_uuid',
    'patient_id', 'ordered_by',
        'facility_id',
        'test_id',
        'ordered_by',
        'results',
        'status',
        'processed_by',
        'comment',
    ];

    public function user(){
        return $this->belongsTo('App\Models\User', 'ordered_by');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility', 'facility_id');
    }
    public function sampleDetail(){
        return $this->hasMany('App\Models\LaboratoryOrderSampleDetail', 'laboratory_order_id');
    }
    public function resultEntry(){
        return $this->belongsTo('App\Models\User', 'processed_by');
    }
}

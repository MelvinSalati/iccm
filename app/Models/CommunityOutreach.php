<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityOutreach extends Model
{
    protected $table = 'community_outreaches';

    protected $fillable = [
        'outreach_date',
        'community_name',
        'chw_name',
        'outreach_type',
        'facility',
        'province_code',
        'district_code',
        'services',
        'service_counts',
        'referred_for_screening',
        'awareness_session_conducted',
        'women_reached',
        'men_reached',
        'total_beneficiaries',
        'referral_required',
        'referred_facility',
        'referral_date',
        'referral_outcome',
        'referral_status',
    ];

    // ✅ Cast fields to proper types
    protected $casts = [
        'outreach_date' => 'date',
        'referral_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'services' => 'array',
        'service_counts' => 'array',
        'referred_for_screening' => 'boolean',
        'awareness_session_conducted' => 'boolean',
        'referral_required' => 'boolean',
        'women_reached' => 'integer',
        'men_reached' => 'integer',
        'total_beneficiaries' => 'integer',
    ];
}

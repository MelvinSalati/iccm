<?php

namespace Database\Seeders;

use App\Models\Indicator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class IndicatorSeeder extends Seeder
{
    public function run()
    {
        $indicators = [
            // HPV Indicators
            [
                'name' => 'HPV Screening Coverage',
                'code' => 'HPV-COV-001',
                'category' => 'cervical_cancer',
                'source_type' => 'screening',
                'event_type' => 'hpv_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 80,
                'threshold_green' => 80,
                'threshold_yellow' => 60,
                'threshold_red' => 40,
                'time_period' => 'quarterly',
                'is_kpi' => true,
                'description' => 'Percentage of eligible women screened for HPV'
            ],
            [
                'name' => 'HPV Positivity Rate',
                'code' => 'HPV-POS-002',
                'category' => 'cervical_cancer',
                'source_type' => 'screening',
                'event_type' => 'hpv_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'positive']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 5,
                'threshold_green' => 5,
                'threshold_yellow' => 10,
                'threshold_red' => 15,
                'time_period' => 'monthly',
                'is_kpi' => true,
                'description' => 'Percentage of HPV tests that are positive'
            ],

            // VIA Indicators
            [
                'name' => 'VIA Screening Coverage',
                'code' => 'VIA-COV-003',
                'category' => 'cervical_cancer',
                'source_type' => 'screening',
                'event_type' => 'via_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 70,
                'threshold_green' => 70,
                'threshold_yellow' => 50,
                'threshold_red' => 30,
                'time_period' => 'quarterly',
                'is_kpi' => true,
                'description' => 'Percentage of eligible women screened with VIA'
            ],
            [
                'name' => 'VIA Positivity Rate',
                'code' => 'VIA-POS-004',
                'category' => 'cervical_cancer',
                'source_type' => 'screening',
                'event_type' => 'via_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'positive']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 3,
                'threshold_green' => 3,
                'threshold_yellow' => 6,
                'threshold_red' => 10,
                'time_period' => 'monthly',
                'is_kpi' => true,
                'description' => 'Percentage of VIA tests that are positive'
            ],

            // HIV Indicators
            [
                'name' => 'HIV Testing Coverage',
                'code' => 'HIV-COV-005',
                'category' => 'hiv_aids',
                'source_type' => 'screening',
                'event_type' => 'hiv_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 90,
                'threshold_green' => 90,
                'threshold_yellow' => 75,
                'threshold_red' => 50,
                'time_period' => 'monthly',
                'is_kpi' => true,
                'description' => 'Percentage of target population tested for HIV'
            ],
            [
                'name' => 'HIV Positivity Rate',
                'code' => 'HIV-POS-006',
                'category' => 'hiv_aids',
                'source_type' => 'screening',
                'event_type' => 'hiv_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'positive']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 2,
                'threshold_green' => 2,
                'threshold_yellow' => 4,
                'threshold_red' => 8,
                'time_period' => 'monthly',
                'is_kpi' => true,
                'description' => 'Percentage of HIV tests that are positive'
            ],

            // Breast Cancer Indicators
            [
                'name' => 'Breast Cancer Screening Coverage',
                'code' => 'BC-COV-007',
                'category' => 'breast_cancer',
                'source_type' => 'screening',
                'event_type' => 'breast_cancer_screening',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['result' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 60,
                'threshold_green' => 60,
                'threshold_yellow' => 40,
                'threshold_red' => 20,
                'time_period' => 'quarterly',
                'is_kpi' => true,
                'description' => 'Percentage of eligible women screened for breast cancer'
            ],

            // Referral Indicators
            [
                'name' => 'Referral Completion Rate',
                'code' => 'REF-COMP-008',
                'category' => 'general',
                'source_type' => 'referral',
                'event_type' => 'external_referral',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['status' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 90,
                'threshold_green' => 90,
                'threshold_yellow' => 70,
                'threshold_red' => 50,
                'time_period' => 'monthly',
                'is_kpi' => true,
                'description' => 'Percentage of referrals that are completed'
            ],

            // Follow-up Indicators
            [
                'name' => 'Follow-up Attendance Rate',
                'code' => 'FU-ATT-009',
                'category' => 'general',
                'source_type' => 'follow_up',
                'event_type' => 'follow_up_visit',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['status' => 'completed']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 80,
                'threshold_green' => 80,
                'threshold_yellow' => 60,
                'threshold_red' => 40,
                'time_period' => 'quarterly',
                'is_kpi' => true,
                'description' => 'Percentage of patients who attend follow-up appointments'
            ],

            // Risk Assessment Indicators
            [
                'name' => 'High Risk Patients Identified',
                'code' => 'HR-ID-010',
                'category' => 'general',
                'source_type' => 'consultation',
                'calculation_type' => 'percentage',
                'numerator_definition' => json_encode(['risk_level' => 'high']),
                'denominator_definition' => json_encode(['all' => true]),
                'target_value' => 10,
                'threshold_green' => 10,
                'threshold_yellow' => 15,
                'threshold_red' => 20,
                'time_period' => 'monthly',
                'is_kpi' => false,
                'description' => 'Percentage of patients identified as high risk'
            ],
        ];

        foreach ($indicators as $indicator) {
            Indicator::create(array_merge(
                $indicator,
                ['uuid' => (string) Str::uuid()]
            ));
        }
    }
}

// pages/breast-cancer/components/BreastCancerTable.tsx

import React from 'react';
import { Eye, User, Calendar, ClipboardCheck, TrendingUp, Microscope } from 'lucide-react';

interface BreastCancerScreening {
    id: string;
    patient_name: string;
    patient_age: number;
    patient_gender: string;
    screening_date: string;
    result: string;
    is_positive: boolean;
    stage_group: string;
    er_status: number;
    pr_status: number;
    her2_status: number;
}

interface BreastCancerTableProps {
    screenings: BreastCancerScreening[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    onViewDetails: (screening: BreastCancerScreening) => void;
    onPageChange: (page: number) => void;
    formatDate: (date: string) => string;
    getResultBadge: (result: string, isPositive: boolean) => string;
    getStageColor: (stage: string) => string;
}

// ✅ Default export
export default function BreastCancerTable({
                                              screenings,
                                              pagination,
                                              onViewDetails,
                                              onPageChange,
                                              formatDate,
                                              getResultBadge,
                                              getStageColor,
                                          }: BreastCancerTableProps) {
    // ... rest of component
}

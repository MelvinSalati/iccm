// components/patients/SearchResults.tsx

import React, { useState } from 'react';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    User,
    Calendar,
    Phone,
    FileText,
    Shield,
    AlertCircle,
} from 'lucide-react';
import PatientDetailModal from './PatientDetailModal';

// ============================================================================
// Types
// ============================================================================

interface RiskAssessment {
    id: number;
    patient_id: number;
    risk_level: 'low' | 'medium' | 'high';
    risk_score: number;
    assessment_date: string;
    hiv_status_label?: string;
    hpv_status_label?: string;
    risk_level_badge?: string;
}

interface Patient {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    date_of_birth: string;
    gender: string;
    age: number;
    phone_number: string | null;
    nrc_number: string | null;
    marital_status: string | null;
    is_active: boolean;
    registered_at: string;
    created_at: string;
    updated_at: string;
    latest_risk_assessment?: RiskAssessment | null;
    latest_risk_factor?: RiskAssessment | null;
    risk_flags?: string[];
    is_high_risk?: boolean;
}

interface PaginatedResponse {
    current_page: number;
    data: Patient[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface SearchResultsProps {
    results: PaginatedResponse;
    onViewPatient?: (patient: Patient) => void;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}

// ============================================================================
// Status Badge Component
// ============================================================================

const RiskBadge: React.FC<{ level: string }> = ({ level }) => {
    const config = {
        low: {
            text: 'Low',
            bgClass: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
        },
        medium: {
            text: 'Medium',
            bgClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400',
        },
        high: {
            text: 'High',
            bgClass: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
        },
    };

    const { text, bgClass } = config[level as keyof typeof config] || config.low;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${bgClass}`}
        >
            <AlertCircle className="h-2.5 w-2.5" />
            {text}
        </span>
    );
};

const ActiveBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}
            />
            {isActive ? 'Active' : 'Inactive'}
        </span>
    );
};

// ============================================================================
// Main Component
// ============================================================================

export default function SearchResults({
                                          results,
                                          onViewPatient,
                                          onPageChange,
                                          isLoading = false,
                                      }: SearchResultsProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: patients, current_page, last_page, total, per_page } = results;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day:

                'numeric',
            year: 'numeric',
        });
    };

    const formatPhone = (phone: string | null) => {
        if (!phone) return '—';
        return phone;
    };

    const handleViewDetails = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsModalOpen(true);
        onViewPatient?.(patient);
    };

    // Get risk level from latest assessment
    const getRiskLevel = (patient: Patient): string => {
        if (patient.latest_risk_assessment?.risk_level) {
            return patient.latest_risk_assessment.risk_level;
        }
        if (patient.latest_risk_factor?.risk_level) {
            return patient.latest_risk_factor.risk_level;
        }
        return 'low';
    };

    // Get risk score
    const getRiskScore = (patient: Patient): number => {
        if (patient.latest_risk_assessment?.risk_score !== undefined) {
            return patient.latest_risk_assessment.risk_score;
        }
        if (patient.latest_risk_factor?.risk_score !== undefined) {
            return patient.latest_risk_factor.risk_score;
        }
        return 0;
    };

    // Pagination handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= last_page && page !== current_page) {
            onPageChange?.(page);
        }
    };

    const goToPrevPage = () => {
        if (current_page > 1) {
            goToPage(current_page - 1);
        }
    };

    const goToNextPage = () => {
        if (current_page < last_page) {
            goToPage(current_page + 1);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, current_page - Math.floor(maxVisible / 2));
        let end = Math.min(last_page, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
           <div>
               {JSON.stringify(results)}
           </div>
        </>
    );
}

// pages/breast-cancer/index.tsx

import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    ChevronRight,
    ClipboardCheck,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Heart,
    Microscope,
    Plus,
    Search,
    Stethoscope,
    TrendingUp,
    User,
    X
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

interface BreastCancerScreening {
    id: string;
    patient_id: string;
    patient_name: string;
    patient_age: number;
    patient_gender: string;
    screening_date: string;
    result: 'negative' | 'positive' | 'inconclusive' | 'pending';
    is_positive: boolean;
    stage_group: string;
    er_status: number;
    pr_status: number;
    her2_status: number;
    created_at: string;
    submitted_by: string;
}

interface PageProps {
    screenings: BreastCancerScreening[];
    filters: {
        result?: string;
        stage?: string;
        date_from?: string;
        date_to?: string;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function BreastCancerIndex({ screenings, filters, pagination }: PageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedScreening, setSelectedScreening] = useState<BreastCancerScreening | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [filterResult, setFilterResult] = useState(filters?.result || '');
    const [filterStage, setFilterStage] = useState(filters?.stage || '');
    const [filterDateFrom, setFilterDateFrom] = useState(filters?.date_from || '');
    const [filterDateTo, setFilterDateTo] = useState(filters?.date_to || '');

    // Format date
    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Get result badge
    const getResultBadge = (result: string, isPositive: boolean) => {
        if (isPositive || result === 'positive') {
            return 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200';
        }
        if (result === 'negative') {
            return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200';
        }
        if (result === 'inconclusive') {
            return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200';
        }
        return 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200';
    };

    // Get stage badge color
    const getStageColor = (stage: string) => {
        if (!stage) return 'bg-slate-100 text-slate-600';
        if (stage.startsWith('0') || stage === 'IA' || stage === 'IB') {
            return 'bg-emerald-50 text-emerald-700';
        }
        if (stage.startsWith('II')) {
            return 'bg-blue-50 text-blue-700';
        }
        if (stage.startsWith('III')) {
            return 'bg-amber-50 text-amber-700';
        }
        if (stage.startsWith('IV')) {
            return 'bg-rose-50 text-rose-700';
        }
        return 'bg-slate-100 text-slate-600';
    };

    // Handle view screening details
    const handleViewDetails = (screening: BreastCancerScreening) => {
        setSelectedScreening(screening);
        setShowDetailsModal(true);
    };

    // Handle apply filters
    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        if (filterResult) params.append('result', filterResult);
        if (filterStage) params.append('stage', filterStage);
        if (filterDateFrom) params.append('date_from', filterDateFrom);
        if (filterDateTo) params.append('date_to', filterDateTo);
        if (searchTerm) params.append('search', searchTerm);

        router.visit(`/breast-cancer?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true,
        });
        setShowFilters(false);
    };

    // Handle clear filters
    const handleClearFilters = () => {
        setFilterResult('');
        setFilterStage('');
        setFilterDateFrom('');
        setFilterDateTo('');
        setSearchTerm('');
        router.visit('/breast-cancer', {
            preserveState: true,
            preserveScroll: true,
        });
        setShowFilters(false);
    };

    // Handle export data
    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await Http.get('/breast-cancer/export', {
                params: {
                    result: filterResult,
                    stage: filterStage,
                    date_from: filterDateFrom,
                    date_to: filterDateTo,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `breast_cancer_screenings_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            Notiflix.Notify.success('Export started successfully');
        } catch (error) {
            console.error('Export error:', error);
            Notiflix.Notify.failure('Failed to export data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Oncology', href: '/oncology' },
                { title: 'Breast Cancer Screenings', href: '#' },
            ]}
        >
            <div className="min-h-screen bg-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                                    <Heart className="h-6 w-6 text-rose-500" />
                                    Breast Cancer Screenings
                                </h1>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    Manage and track all breast cancer screenings
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleExport}
                                    disabled={loading}
                                    className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <Download className="h-4 w-4" />
                                    Export
                                </button>
                                <button
                                    onClick={() => router.visit('/breast-cancer/new')}
                                    className="flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    New Screening
                                </button>
                            </div>
                        </div>

                        {/* Search and Filter Bar */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by patient name, NRC, or screening ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                                    className="w-full rounded-md border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                                        showFilters || filterResult || filterStage || filterDateFrom || filterDateTo
                                            ? 'border-rose-200 bg-rose-50 text-rose-700'
                                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                    {(filterResult || filterStage || filterDateFrom || filterDateTo) && (
                                        <span className="ml-1 rounded-full bg-rose-200 px-1.5 py-0.5 text-xs">
                                            {[filterResult, filterStage, filterDateFrom, filterDateTo].filter(Boolean).length}
                                        </span>
                                    )}
                                </button>
                                {searchTerm && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            handleApplyFilters();
                                        }}
                                        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Result</label>
                                        <select
                                            value={filterResult}
                                            onChange={(e) => setFilterResult(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        >
                                            <option value="">All Results</option>
                                            <option value="positive">Positive</option>
                                            <option value="negative">Negative</option>
                                            <option value="inconclusive">Inconclusive</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Stage Group</label>
                                        <select
                                            value={filterStage}
                                            onChange={(e) => setFilterStage(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        >
                                            <option value="">All Stages</option>
                                            <option value="0">0</option>
                                            <option value="IA">IA</option>
                                            <option value="IB">IB</option>
                                            <option value="IIA">IIA</option>
                                            <option value="IIB">IIB</option>
                                            <option value="IIIA">IIIA</option>
                                            <option value="IIIB">IIIB</option>
                                            <option value="IIIC">IIIC</option>
                                            <option value="IV">IV</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date From</label>
                                        <input
                                            type="date"
                                            value={filterDateFrom}
                                            onChange={(e) => setFilterDateFrom(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date To</label>
                                        <input
                                            type="date"
                                            value={filterDateTo}
                                            onChange={(e) => setFilterDateTo(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={handleClearFilters}
                                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Clear Filters
                                    </button>
                                    <button
                                        onClick={handleApplyFilters}
                                        className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Screening List */}
                <div className="container mx-auto px-4 py-4">
                    <div className="rounded-md border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3.5 w-3.5" />
                                            Patient
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Date
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <ClipboardCheck className="h-3.5 w-3.5" />
                                            Result
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            Stage
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Microscope className="h-3.5 w-3.5" />
                                            IHC Markers
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {screenings && screenings.length > 0 ? (
                                    screenings.map((screening) => (
                                        <tr
                                            key={screening.id}
                                            className="cursor-pointer transition-colors hover:bg-slate-50"
                                            onClick={() => handleViewDetails(screening)}
                                        >
                                            <td className="px-4 py-3">
                                                <div>
                                                    <div className="font-medium text-slate-900">
                                                        {screening.patient_name}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {screening.patient_age} years • {screening.patient_gender}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {formatDate(screening.screening_date)}
                                            </td>
                                            <td className="px-4 py-3">
                                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getResultBadge(screening.result, screening.is_positive)}`}>
                                                        {screening.is_positive ? 'Positive' : screening.result}
                                                    </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {screening.stage_group ? (
                                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(screening.stage_group)}`}>
                                                            {screening.stage_group}
                                                        </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                        <span className="inline-block rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                            ER: {screening.er_status}%
                                                        </span>
                                                    <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                            PR: {screening.pr_status}%
                                                        </span>
                                                    <span className="inline-block rounded bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                                                            HER2: {screening.her2_status}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewDetails(screening);
                                                    }}
                                                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center">
                                            <div className="flex flex-col items-center">
                                                <ClipboardCheck className="h-12 w-12 text-slate-300" />
                                                <h3 className="mt-2 text-sm font-medium text-slate-900">No screenings found</h3>
                                                <p className="text-sm text-slate-500">
                                                    No breast cancer screenings match your criteria
                                                </p>
                                                <button
                                                    onClick={() => router.visit('/breast-cancer/new')}
                                                    className="mt-4 rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
                                                >
                                                    Create New Screening
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.last_page > 1 && (
                            <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                                <div className="text-xs text-slate-500">
                                    Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
                                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                                    {pagination.total} results
                                </div>
                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                        let pageNum;
                                        if (pagination.last_page <= 5) {
                                            pageNum = i + 1;
                                        } else if (pagination.current_page <= 3) {
                                            pageNum = i + 1;
                                        } else if (pagination.current_page >= pagination.last_page - 2) {
                                            pageNum = pagination.last_page - 4 + i;
                                        } else {
                                            pageNum = pagination.current_page - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => {
                                                    const params = new URLSearchParams(window.location.search);
                                                    params.set('page', pageNum.toString());
                                                    router.visit(`/breast-cancer?${params.toString()}`);
                                                }}
                                                className={`rounded-md px-3 py-1 text-sm transition-colors ${
                                                    pageNum === pagination.current_page
                                                        ? 'bg-rose-600 text-white'
                                                        : 'text-slate-700 hover:bg-slate-100'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    {pagination.current_page < pagination.last_page - 2 && (
                                        <>
                                            <span className="px-2 py-1 text-slate-400">...</span>
                                            <button
                                                onClick={() => {
                                                    const params = new URLSearchParams(window.location.search);
                                                    params.set('page', pagination.last_page.toString());
                                                    router.visit(`/breast-cancer?${params.toString()}`);
                                                }}
                                                className="rounded-md px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                                            >
                                                {pagination.last_page}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedScreening && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setShowDetailsModal(false)}
                    />
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl">
                            {/* Header */}
                            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-rose-50 p-2">
                                        <Heart className="h-5 w-5 text-rose-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Breast Cancer Screening Details
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {selectedScreening.patient_name} • {formatDateTime(selectedScreening.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="rounded-md bg-slate-50 p-4 text-center">
                                        <div className="text-xs text-slate-500">Result</div>
                                        <div className={`mt-1 text-lg font-bold ${selectedScreening.is_positive ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            {selectedScreening.is_positive ? 'Positive' : selectedScreening.result}
                                        </div>
                                    </div>
                                    <div className="rounded-md bg-slate-50 p-4 text-center">
                                        <div className="text-xs text-slate-500">Stage</div>
                                        <div className="mt-1 text-lg font-bold text-slate-800">
                                            {selectedScreening.stage_group || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="rounded-md bg-slate-50 p-4 text-center">
                                        <div className="text-xs text-slate-500">Patient Age</div>
                                        <div className="mt-1 text-lg font-bold text-slate-800">
                                            {selectedScreening.patient_age} years
                                        </div>
                                    </div>
                                    <div className="rounded-md bg-slate-50 p-4 text-center">
                                        <div className="text-xs text-slate-500">Screening Date</div>
                                        <div className="mt-1 text-sm font-semibold text-slate-800">
                                            {formatDate(selectedScreening.screening_date)}
                                        </div>
                                    </div>
                                </div>

                                {/* IHC Markers */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                                        <Microscope className="h-4 w-4 text-slate-400" />
                                        IHC Markers
                                    </h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-center">
                                            <div className="text-xs text-amber-600">ER</div>
                                            <div className="text-xl font-bold text-amber-800">{selectedScreening.er_status}%</div>
                                        </div>
                                        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-center">
                                            <div className="text-xs text-emerald-600">PR</div>
                                            <div className="text-xl font-bold text-emerald-800">{selectedScreening.pr_status}%</div>
                                        </div>
                                        <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-center">
                                            <div className="text-xs text-rose-600">HER2</div>
                                            <div className="text-xl font-bold text-rose-800">{selectedScreening.her2_status}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-slate-500">Screening ID:</span>
                                            <span className="ml-2 font-medium text-slate-800">{selectedScreening.id}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Submitted By:</span>
                                            <span className="ml-2 font-medium text-slate-800">{selectedScreening.submitted_by}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Created:</span>
                                            <span className="ml-2 font-medium text-slate-800">{formatDateTime(selectedScreening.created_at)}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Patient Gender:</span>
                                            <span className="ml-2 font-medium text-slate-800 capitalize">{selectedScreening.patient_gender}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        router.visit(`/patients/${selectedScreening.patient_id}`);
                                    }}
                                    className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    View Patient
                                </button>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

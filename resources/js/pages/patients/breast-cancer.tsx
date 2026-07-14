// pages/breast-cancer/index.tsx

import AppLayout from '@/layouts/app-layout';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import BreastCancerScreeningModal from './components/modals/BreastScreeningModal';
import BreastCancerTable from './components/modals/BreastCancerTable';
import {
    Plus,
    AlertTriangle,
    Printer,
    ArrowLeft,
    Clock,
    RefreshCw,
    Calendar,
    CheckCircle,
    AlertCircle,
    Search,
    Heart,
} from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';

// Types
interface Address {
    id?: number;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    district?: string;
    province?: string;
    country?: string;
    postal_code?: string;
}

interface RiskAssessment {
    id: number;
    patient_id: number;
    number_of_pregnancies: number;
    number_of_deliveries: number;
    long_term_contraceptive_use: string | null;
}

interface Patient {
    id: number;
    user_id: number;
    patient_uuid: string;
    first_name: string;
    last_name: string;
    full_name: string;
    date_of_birth: string;
    age: number;
    gender: string;
    phone_number: string;
    nrc_number: string;
    marital_status: string | null;
    is_active: boolean;
    is_high_risk: boolean;
    addresses: Address[];
    latest_risk_assessment: RiskAssessment | null;
    registered_at: string;
}

interface BreastCancerScreening {
    id: string;
    patient_id: string;
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
    created_at: string;
    submitted_by: string;
    submitted_by_name: string;
}

interface PageProps {
    patient: Patient;
    screenings: BreastCancerScreening[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
        pending: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="h-3 w-3" /> },
        positive: { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <AlertCircle className="h-3 w-3" /> },
        negative: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="h-3 w-3" /> },
        inconclusive: { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <AlertTriangle className="h-3 w-3" /> },
    };

    const { color, icon } = config[status] || config.pending;
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border', color)}>
            {icon}
            {label}
        </span>
    );
};

// Helper functions
const formatDate = (date: string) => {
    if (!date) return 'N/A';
    try {
        return format(parseISO(date), 'MMM dd, yyyy');
    } catch {
        return 'N/A';
    }
};

const formatRelativeTime = (date: string) => {
    if (!date) return 'N/A';
    try {
        return formatDistanceToNow(parseISO(date), { addSuffix: true });
    } catch {
        return 'N/A';
    }
};

const getResultBadge = (result: string, isPositive: boolean) => {
    return isPositive ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800';
};

const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
        '0': 'bg-gray-100 text-gray-800',
        IA: 'bg-blue-100 text-blue-800',
        IB: 'bg-blue-100 text-blue-800',
        IIA: 'bg-indigo-100 text-indigo-800',
        IIB: 'bg-indigo-100 text-indigo-800',
        IIIA: 'bg-purple-100 text-purple-800',
        IIIB: 'bg-purple-100 text-purple-800',
        IIIC: 'bg-purple-100 text-purple-800',
        IV: 'bg-rose-100 text-rose-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
};

export default function BreastCancerIndex() {
    const { props } = usePage<PageProps>();
    const { patient, screenings = [], auth } = props;

    // --- Modal state ---
    // IMPORTANT: must start closed. Starting it `true` meant the modal was
    // already "open" on first render, so clicking "New Screening" later set
    // the same value again (true -> true), which React treats as a no-op and
    // never re-triggers the modal's open behavior.
    const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);
    const [editingScreening, setEditingScreening] = useState<any>(null);

    // --- Data state ---
    const [screeningsList, setScreeningsList] = useState<BreastCancerScreening[]>(screenings || []);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedPatientId] = useState<string | undefined>(String(patient?.id));
    const [currentUserId] = useState<string | undefined>(auth?.user?.id);

    // --- Filters ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [periodFilter, setPeriodFilter] = useState<string>('all');

    const [pagination, setPagination] = useState<Pagination>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: screenings?.length || 0,
    });

    // Keep local list in sync with fresh server props (e.g. after an Inertia visit)
    useEffect(() => {
        setScreeningsList(screenings || []);
    }, [screenings]);

    const fetchScreenings = useCallback(
        async (page = pagination.current_page) => {
            setRefreshing(true);
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    per_page: String(pagination.per_page),
                    search: searchTerm,
                    status: statusFilter,
                    period: periodFilter,
                    patient_id: String(patient?.id),
                });

                const response = await Http.get(`/breast-cancer/screenings?${params}`);
                if (response.status === 200) {
                    setScreeningsList(response.data.data || []);
                    setPagination({
                        current_page: response.data.current_page || 1,
                        last_page: response.data.last_page || 1,
                        per_page: response.data.per_page || 10,
                        total: response.data.total || 0,
                    });
                }
            } catch (error) {
                console.error('Error fetching screenings:', error);
                Notiflix.Notify.failure('Failed to refresh screenings');
            } finally {
                setRefreshing(false);
            }
        },
        [patient?.id, pagination.current_page, pagination.per_page, searchTerm, statusFilter, periodFilter],
    );

    // Single source of truth for refetching when filters change.
    // (Removed the separate "initial fetch" effect that duplicated this call
    // and could race with handlePageChange.)
    useEffect(() => {
        fetchScreenings(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, statusFilter, periodFilter]);

    // --- Modal handlers ---
    const handleOpenNewScreening = () => {
        setEditingScreening(null);
        setIsScreeningModalOpen(true);
    };

    const handleEditScreening = async (screening: BreastCancerScreening) => {
        try {
            const response = await Http.get(`/breast-cancer/screenings/${screening.id}`);
            setEditingScreening(response.data);
            setIsScreeningModalOpen(true);
        } catch (error) {
            console.error('Error fetching screening details:', error);
            Notiflix.Notify.failure('Failed to load screening details');
        }
    };

    const handleViewDetails = (screening: BreastCancerScreening) => {
        router.visit(`/breast-cancer/screenings/${screening.id}`, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const handleCloseScreeningModal = () => {
        setIsScreeningModalOpen(false);
        setEditingScreening(null);
    };

    const handleScreeningSuccess = () => {
        setIsScreeningModalOpen(false);
        setEditingScreening(null);
        fetchScreenings(pagination.current_page);
        Notiflix.Notify.success('Screening saved successfully!');
    };

    const handlePageChange = (page: number) => {
        fetchScreenings(page);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setPeriodFilter('all');
    };

    // Client-side filtering on top of whatever page is currently loaded
    // (server-side filtering already applies via fetchScreenings; this keeps
    // typing in the search box feeling instant without waiting on the debounce).
    const filteredScreenings = useMemo(() => {
        let filtered = [...screeningsList];

        if (periodFilter !== 'all') {
            filtered = filtered.filter((screening) => {
                try {
                    const date = parseISO(screening.screening_date);
                    switch (periodFilter) {
                        case 'today':
                            return isToday(date);
                        case 'week':
                            return isThisWeek(date, { weekStartsOn: 1 });
                        case 'month':
                            return isThisMonth(date);
                        default:
                            return true;
                    }
                } catch {
                    return false;
                }
            });
        }

        filtered.sort((a, b) => {
            try {
                return new Date(b.screening_date).getTime() - new Date(a.screening_date).getTime();
            } catch {
                return 0;
            }
        });

        return filtered;
    }, [screeningsList, periodFilter]);

    // Stats should reflect the true totals, not just the current page's rows.
    const stats = {
        total: pagination.total || screeningsList.length,
        positive: screeningsList.filter((s) => s.is_positive).length,
        negative: screeningsList.filter((s) => !s.is_positive).length,
        stageIV: screeningsList.filter((s) => s.stage_group === 'IV').length,
    };

    const avatarUrl = patient?.full_name
        ? `https://avatarapi.runflare.run/public?usearname=${encodeURIComponent(patient.full_name)}`
        : '';

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
                    href: `/patients/registry/${patient?.patient_uuid || ''}`,
                },
                {
                    title: 'Breast Cancer Screening',
                    href: '#',
                },
            ]}
            patient={patient}
            isPatientView={true}
        >
            <div className="min-h-screen bg-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-3">
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => router.visit(`/patients/registry/${patient?.patient_uuid}`)}
                                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                                <img
                                    src={avatarUrl}
                                    alt={patient?.full_name || 'Patient'}
                                    className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-lg font-semibold text-slate-900">
                                            {patient?.full_name || 'Patient'}
                                        </h1>
                                        {patient?.is_high_risk && (
                                            <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 ring-1 ring-inset ring-rose-200">
                                                <AlertTriangle className="h-3 w-3" />
                                                High risk
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                        <span>Registered {formatRelativeTime(patient?.registered_at || '')}</span>
                                        <span className="text-slate-300">|</span>
                                        <span>ID: {patient?.patient_uuid || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.print()}
                                    title="Print"
                                    className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                </button>
                                <Button
                                    onClick={handleOpenNewScreening}
                                    className="flex items-center gap-1.5 bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    New Screening
                                </Button>
                            </div>
                        </div>

                        {/* Demographics */}
                        <div className="mb-3 grid grid-cols-2 divide-y divide-slate-100 rounded-md border border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-6">
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">NRC number</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.nrc_number || 'N/A'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Date of birth</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{formatDate(patient?.date_of_birth || '')}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Age</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.age || 0} years</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Gender</div>
                                <div className="mt-0.5 truncate text-sm font-medium capitalize text-slate-800">{patient?.gender || 'N/A'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Marital status</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.marital_status || 'Not specified'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Risk status</div>
                                <div className="mt-0.5 truncate text-sm font-medium">
                                    <span className={patient?.is_high_risk ? 'text-rose-600' : 'text-emerald-600'}>
                                        {patient?.is_high_risk ? 'High risk' : 'Standard'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2">
                                <p className="text-[11px] uppercase tracking-wide text-slate-400">Total Screenings</p>
                                <p className="text-lg font-bold text-slate-900">{stats.total}</p>
                            </div>
                            <div className="rounded-md border border-slate-200 bg-rose-50 px-3.5 py-2">
                                <p className="text-[11px] uppercase tracking-wide text-rose-400">Positive</p>
                                <p className="text-lg font-bold text-rose-600">{stats.positive}</p>
                            </div>
                            <div className="rounded-md border border-slate-200 bg-emerald-50 px-3.5 py-2">
                                <p className="text-[11px] uppercase tracking-wide text-emerald-400">Negative</p>
                                <p className="text-lg font-bold text-emerald-600">{stats.negative}</p>
                            </div>
                            <div className="rounded-md border border-slate-200 bg-purple-50 px-3.5 py-2">
                                <p className="text-[11px] uppercase tracking-wide text-purple-400">Stage IV</p>
                                <p className="text-lg font-bold text-purple-600">{stats.stageIV}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-md border border-slate-200 bg-white">
                            <div className="border-b border-slate-200 px-3.5 py-2.5">
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <Heart className="mr-1.5 inline h-3.5 w-3.5 text-rose-500" />
                                        Breast Cancer Screenings
                                        <span className="ml-1.5 font-normal text-slate-400">({filteredScreenings.length})</span>
                                    </h2>
                                    <button
                                        onClick={() => fetchScreenings(pagination.current_page)}
                                        disabled={refreshing}
                                        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                                        title="Refresh"
                                    >
                                        <RefreshCw className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} />
                                    </button>
                                </div>

                                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search screenings..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full rounded-md border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                        >
                                            <option value="all">All Results</option>
                                            <option value="positive">Positive</option>
                                            <option value="negative">Negative</option>
                                            <option value="pending">Pending</option>
                                            <option value="inconclusive">Inconclusive</option>
                                        </select>
                                        <select
                                            value={periodFilter}
                                            onChange={(e) => setPeriodFilter(e.target.value)}
                                            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                        >
                                            <option value="all">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                        </select>
                                        {(searchTerm || statusFilter !== 'all' || periodFilter !== 'all') && (
                                            <button
                                                onClick={clearFilters}
                                                className="rounded-md px-2 py-1.5 text-xs text-rose-600 transition-colors hover:bg-rose-50"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <BreastCancerTable
                                screenings={filteredScreenings}
                                pagination={pagination}
                                onViewDetails={handleViewDetails}
                                onPageChange={handlePageChange}
                                formatDate={formatDate}
                                getResultBadge={getResultBadge}
                                getStageColor={getStageColor}
                            />
                        </div>
                    </div>
                </div>

                {/* Modal: key forces a clean remount between "new" and "edit" so
                   internal form state can't leak between the two modes. */}
                <BreastCancerScreeningModal
                    key={editingScreening?.id ?? 'new'}
                    isOpen={isScreeningModalOpen}
                    onClose={handleCloseScreeningModal}
                    onSuccess={handleScreeningSuccess}
                    patientId={selectedPatientId}
                    userId={currentUserId}
                    editingData={editingScreening}
                />
            </div>
        </AppLayout>
    );
}

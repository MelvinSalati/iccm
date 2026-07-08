// pages/patients/patient-details.tsx
import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Plus,
    Phone,
    MapPin,
    Clock,
    FileText,
    ChevronRight,
    Search,
    Download,
    Printer,
    Eye,
    Trash2,
    AlertCircle,
    Shield,
    AlertTriangle,
} from 'lucide-react';
import { InitiateVisitModal } from './components/modals/InitiateVisitModal';
import AppLayout from '@/layouts/app-layout';

// Types based on your actual patient data
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
    risk_factors: any[];
    latest_risk_assessment: RiskAssessment | null;
    latest_risk_factor: RiskAssessment | null;
    risk_flags: any[];
    telecoms: any[];
    registered_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Visit {
    id: string;
    visit_number: string;
    visit_type: {
        id: string;
        name: string;
        color: string;
        icon: string;
    } | null;
    visit_status: string;
    priority: {
        id: string;
        name: string;
        color: string;
        bg_color: string;
    } | null;
    department: {
        id: string;
        name: string;
        color: string;
    } | null;
    check_in_time: string;
    check_out_time: string | null;
    presenting_complaint: string | null;
    primary_provider: string | null;
    visit_outcome: string | null;
    created_at: string;
}

interface Stats {
    total_visits: number;
    completed_visits: number;
    pending_visits: number;
    cancelled_visits: number;
    last_visit_date: string | null;
}

interface PageProps {
    patient: Patient;
    visits: Visit[];
    stats: Stats;
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function PatientDetails() {
    const { props } = usePage<PageProps>();
    const { demographics, visits = [], stats, auth } = props;

    const patient = demographics;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedVisit, setExpandedVisit] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

    // Get primary address
    const primaryAddress: Address | undefined = undefined;

    // Filter visits
    const filteredVisits = visits.filter(visit => {
        const matchesSearch =
            (visit.visit_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (visit.visit_type?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (visit.presenting_complaint?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilter === 'all' || visit.visit_status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    // Status colors — muted, clinical palette (kept distinct per status)
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            scheduled: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
            checked_in: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
            triage_completed: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
            with_clinician: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200',
            clinical_assessment_done: 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-200',
            treatment_planned: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
            completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
            cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
            no_show: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
            transferred: 'bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200',
        };
        return colors[status] || 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200';
    };

    // Outcome colors
    const getOutcomeColor = (outcome: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-slate-100 text-slate-600',
            screening_completed: 'bg-sky-50 text-sky-700',
            screening_negative: 'bg-emerald-50 text-emerald-700',
            screening_positive_requires_follow_up: 'bg-amber-50 text-amber-700',
            diagnosis_made: 'bg-violet-50 text-violet-700',
            treatment_scheduled: 'bg-orange-50 text-orange-700',
            treatment_completed: 'bg-emerald-50 text-emerald-700',
            admitted: 'bg-rose-50 text-rose-700',
            referred_out: 'bg-cyan-50 text-cyan-700',
            transferred: 'bg-indigo-50 text-indigo-700',
            expired: 'bg-rose-50 text-rose-700',
            defaulted: 'bg-slate-100 text-slate-600',
            completed: 'bg-emerald-50 text-emerald-700',
        };
        return colors[outcome] || 'bg-slate-100 text-slate-600';
    };

    // Format date
    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatShortDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Handle visit created
    const handleVisitCreated = (visitUuid: string) => {
        setIsReloading(true);

        router.reload({
            only: ['visits', 'stats'],
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsReloading(false);
                router.visit(`/patients/${patient.patient_uuid}/visit/${visitUuid}/interactions`, {
                    preserveState: false,
                    preserveScroll: true,
                });
            },
            onError: () => {
                setIsReloading(false);
                console.error('Failed to reload visit data');
            },
        });
    };

    // Handle visit click
    const handleVisitClick = (visit: Visit) => {
        router.visit(`/patients/${patient.patient_uuid}/visit/${visit.id}`, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    // Handle filter change
    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        router.get(
            `/patients/${patient.patient_uuid}`,
            { status: filter },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Delete visit
    const deleteVisit = () => {
        if (!selectedVisit) return;

        router.delete(`/patients/${patient.patient_uuid}/visit/${selectedVisit.id}`, {
            preserveState: true,
            preserveScroll: true,
            only: ['visits', 'stats'],
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedVisit(null);
            },
            onError: (errors) => {
                console.error('Failed to delete visit:', errors);
            },
        });
    };

    // Small helper for the contact/risk rows so markup stays tight and consistent
    const InfoRow = ({
                         label,
                         value,
                         icon,
                     }: {
        label: string;
        value: React.ReactNode;
        icon?: React.ReactNode;
    }) => (
        <div className="flex items-center justify-between px-3.5 py-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                {icon}
                {label}
            </span>
            <span className="text-xs font-medium text-slate-800">{value}</span>
        </div>
    );

    // Compact demographic field used in the full-width header strip
    const DemographicField = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div className="px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
            <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{value}</div>
        </div>
    );

    const avatarUrl = `https://avatarapi.runflare.run/public?usearname=${encodeURIComponent(patient.full_name)}`;

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: `${patient.first_name} ${patient.last_name}`,
                    href: '/',
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
                                <img
                                    src={avatarUrl}
                                    alt={patient.full_name}
                                    className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-lg font-semibold text-slate-900">
                                            {patient.full_name}
                                        </h1>
                                        {patient.is_high_risk && (
                                            <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 ring-1 ring-inset ring-rose-200">
                                                <AlertTriangle className="h-3 w-3" />
                                                High risk
                                            </span>
                                        )}
                                        {!patient.is_active && (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 text-xs text-slate-500">
                                        Registered {formatShortDate(patient.registered_at)}
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
                                <button
                                    onClick={() => router.get(`/patients/${patient.patient_uuid}/visits/export`)}
                                    title="Export"
                                    className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={isReloading}
                                    className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isReloading ? (
                                        <>
                                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Loading…
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-3.5 w-3.5" />
                                            Initiate visit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Demographics — compact, full-width strip (no UUID) */}
                        <div className="mb-3 grid grid-cols-2 divide-y divide-slate-100 rounded-md border border-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-6">
                            <DemographicField label="NRC number" value={patient.nrc_number} />
                            <DemographicField label="Date of birth" value={formatShortDate(patient.date_of_birth)} />
                            <DemographicField label="Age" value={`${patient.age || 0} years`} />
                            <DemographicField label="Gender" value={<span className="capitalize">{patient.gender}</span>} />
                            <DemographicField label="Marital status" value={patient.marital_status || 'Not specified'} />
                            <DemographicField
                                label="Risk status"
                                value={
                                    <span className={patient.is_high_risk ? 'text-rose-600' : 'text-emerald-600'}>
                                        {patient.is_high_risk ? 'High risk' : 'Standard'}
                                    </span>
                                }
                            />
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                            <div className="rounded-md bg-blue-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-blue-600">Total visits</div>
                                <div className="text-lg font-semibold text-blue-900">{stats.total_visits}</div>
                            </div>
                            <div className="rounded-md bg-emerald-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-emerald-600">Completed</div>
                                <div className="text-lg font-semibold text-emerald-900">{stats.completed_visits}</div>
                            </div>
                            <div className="rounded-md bg-amber-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-amber-600">Pending</div>
                                <div className="text-lg font-semibold text-amber-900">{stats.pending_visits}</div>
                            </div>
                            <div className="rounded-md bg-rose-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-rose-600">Cancelled</div>
                                <div className="text-lg font-semibold text-rose-900">{stats.cancelled_visits}</div>
                            </div>
                            <div className="col-span-2 rounded-md bg-violet-50 px-3.5 py-2.5 md:col-span-1">
                                <div className="text-[11px] uppercase tracking-wide text-violet-600">Last visit</div>
                                <div className="text-xs font-semibold text-violet-900">
                                    {stats.last_visit_date ? formatDate(stats.last_visit_date) : 'No visits'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Left Column - Patient Info */}
                        <div className="space-y-4">
                            {/* Contact Information */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Contact information
                                    </h2>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    <InfoRow
                                        label="Phone"
                                        icon={<Phone className="h-3 w-3 text-slate-400" />}
                                        value={patient.phone_number}
                                    />
                                    {primaryAddress && (
                                        <>
                                            {primaryAddress.address_line1 && (
                                                <InfoRow
                                                    label="Address"
                                                    icon={<MapPin className="h-3 w-3 text-slate-400" />}
                                                    value={
                                                        <>
                                                            {primaryAddress.address_line1}
                                                            {primaryAddress.address_line2 && `, ${primaryAddress.address_line2}`}
                                                        </>
                                                    }
                                                />
                                            )}
                                            {primaryAddress.city && (
                                                <InfoRow label="City" value={primaryAddress.city} />
                                            )}
                                            {primaryAddress.district && (
                                                <InfoRow label="District" value={primaryAddress.district} />
                                            )}
                                            {primaryAddress.province && (
                                                <InfoRow label="Province" value={primaryAddress.province} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Risk Assessment */}
                            {patient.latest_risk_assessment && (
                                <div className="rounded-md border border-slate-200 bg-white">
                                    <div className="border-b border-slate-200 px-3.5 py-2">
                                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <Shield className="h-3.5 w-3.5 text-rose-500" />
                                            Risk assessment
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        <InfoRow
                                            label="Pregnancies"
                                            value={patient.latest_risk_assessment.number_of_pregnancies || 0}
                                        />
                                        <InfoRow
                                            label="Deliveries"
                                            value={patient.latest_risk_assessment.number_of_deliveries || 0}
                                        />
                                        <InfoRow
                                            label="Long-term contraceptive"
                                            value={patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Visits */}
                        <div className="lg:col-span-2">
                            <div className="rounded-md border border-slate-200 bg-white">
                                {/* Visits Header */}
                                <div className="border-b border-slate-200 px-3.5 py-2.5">
                                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Visit history
                                            <span className="ml-1.5 font-normal text-slate-400">
                                                ({filteredVisits.length})
                                            </span>
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search visits…"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="rounded-md border border-slate-200 py-1.5 pl-8 pr-3 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                            <select
                                                value={activeFilter}
                                                onChange={(e) => handleFilterChange(e.target.value)}
                                                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            >
                                                <option value="all">All status</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="checked_in">Checked in</option>
                                                <option value="with_clinician">With clinician</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Visits List */}
                                <div className="divide-y divide-slate-100">
                                    {filteredVisits.length > 0 ? (
                                        filteredVisits.map((visit) => (
                                            <div key={visit.id} className="group px-3.5 py-2.5 transition-colors hover:bg-slate-50">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div
                                                        className="flex flex-1 cursor-pointer items-center gap-2.5"
                                                        onClick={() => handleVisitClick(visit)}
                                                    >
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                                            <FileText className="h-4 w-4" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-1.5">
                                                                <span className="text-sm font-medium text-slate-900">
                                                                    {visit.visit_number}
                                                                </span>
                                                                <span
                                                                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${getStatusColor(visit.visit_status)}`}
                                                                >
                                                                    {visit.visit_status.replace('_', ' ')}
                                                                </span>
                                                                <span
                                                                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${getOutcomeColor(visit.visit_outcome || 'pending')}`}
                                                                >
                                                                    {visit.visit_outcome || 'pending'}
                                                                </span>
                                                            </div>
                                                            <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
                                                                <span>{visit.visit_type?.name || 'N/A'}</span>
                                                                <span className="text-slate-300">·</span>
                                                                <span>{visit.department?.name || 'N/A'}</span>
                                                                <span className="text-slate-300">·</span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    {formatDate(visit.check_in_time)}
                                                                </span>
                                                            </div>
                                                            {visit.presenting_complaint && (
                                                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                                                    {visit.presenting_complaint}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() =>
                                                                setExpandedVisit(expandedVisit === visit.id ? null : visit.id)
                                                            }
                                                            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                                        >
                                                            <ChevronRight
                                                                className={`h-3.5 w-3.5 transition-transform ${
                                                                    expandedVisit === visit.id ? 'rotate-90' : ''
                                                                }`}
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedVisit(visit);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Expanded Details */}
                                                {expandedVisit === visit.id && (
                                                    <div className="mt-2 rounded-md bg-slate-50 p-3">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                                    Check-in
                                                                </p>
                                                                <p className="text-xs text-slate-800">
                                                                    {formatDate(visit.check_in_time)}
                                                                </p>
                                                            </div>
                                                            {visit.check_out_time && (
                                                                <div>
                                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                                        Check-out
                                                                    </p>
                                                                    <p className="text-xs text-slate-800">
                                                                        {formatDate(visit.check_out_time)}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <div className="col-span-2">
                                                                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                                    Priority
                                                                </p>
                                                                <span
                                                                    className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                                                                        visit.priority?.bg_color || 'bg-slate-100 text-slate-600'
                                                                    }`}
                                                                >
                                                                    {visit.priority?.name || 'N/A'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2.5 flex gap-2">
                                                            <button
                                                                onClick={() => handleVisitClick(visit)}
                                                                className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-blue-700"
                                                            >
                                                                <Eye className="h-3 w-3" />
                                                                View details
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-10 text-center">
                                            <FileText className="mx-auto h-9 w-9 text-slate-300" />
                                            <h3 className="mt-2 text-sm font-medium text-slate-800">No visits found</h3>
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {searchTerm || activeFilter !== 'all'
                                                    ? 'Try adjusting your search or filters'
                                                    : 'This patient has no visits recorded yet'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Initiate Visit Modal */}
                <InitiateVisitModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    patientId={patient.patient_uuid}
                    patientData={patient}
                    userId={auth.user.id}
                    onVisitCreated={handleVisitCreated}
                />

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedVisit && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-slate-500/60 transition-opacity"
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <div className="border-b border-slate-200 px-5 py-3.5">
                                    <h3 className="text-sm font-semibold text-slate-900">Delete visit</h3>
                                </div>
                                <div className="px-5 py-4">
                                    <div className="flex items-start gap-2.5">
                                        <AlertCircle className="h-4.5 w-4.5 mt-0.5 shrink-0 text-rose-500" />
                                        <p className="text-sm text-slate-600">
                                            Are you sure you want to delete visit{' '}
                                            <strong className="font-medium text-slate-900">
                                                {selectedVisit.visit_number}
                                            </strong>
                                            ? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 px-5 py-3">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={deleteVisit}
                                            className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-700"
                                        >
                                            Delete visit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

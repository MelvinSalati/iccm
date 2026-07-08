// pages/patients/interaction-details.tsx

import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Phone,
    MapPin,
    Printer,
    Trash2,
    AlertCircle,
    Shield,
    AlertTriangle,
    ArrowLeft,
    Plus,
    X,
    FileText,
    Clock,
    Heart,
    Activity,
    Thermometer,
    Droplets,
    Gauge,
    Weight,
    Ruler,
    Edit,
    ChevronRight,
    Calendar,
    User,
    Stethoscope,
    Brain,
    Pill,
    ClipboardCheck,
    Eye,
    Microscope,
    TrendingUp,
    TrendingDown,
    Minus,
    CheckCircle,
    AlertOctagon,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import IntegratedScreeningForm from './components/modals/IntegratedScreeningForm';

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

interface Vitals {
    systolic_bp?: number;
    diastolic_bp?: number;
    heart_rate?: number;
    temperature?: number;
    respiratory_rate?: number;
    oxygen_saturation?: number;
    weight?: number;
    height?: number;
    bmi?: number;
    recorded_at?: string;
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

interface Interaction {
    id: string;
    visit_number: string;
    visit_type: string;
    visit_status: string;
    priority: string;
    department: string;
    check_in_time: string;
    check_out_time: string | null;
    presenting_complaint: string;
    primary_provider: string | null;
    visit_outcome: string | null;
    screenings: any[];
    notes: any[];
    referrals: any[];
    vitals?: Vitals;
}

interface PageProps {
    patient?: Patient;
    visit?: Visit;
    interaction?: Interaction;
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function InteractionDetails() {
    const { props } = usePage<PageProps>();
    const { patient, visit, interaction, auth } = props;

    const [loading, setLoading] = useState(false);
    const [showScreeningForm, setShowScreeningForm] = useState(false);
    const [showIntegratedScreeningForm, setShowIntegratedScreeningForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [showScreeningDetails, setShowScreeningDetails] = useState(false);
    const [selectedScreening, setSelectedScreening] = useState<any>(null);
    const [screeningData, setScreeningData] = useState({
        screening_type: 'cervical',
        result: 'negative',
        notes: '',
    });
    const [vitalsData, setVitalsData] = useState<Vitals>({
        systolic_bp: interaction?.vitals?.systolic_bp || 0,
        diastolic_bp: interaction?.vitals?.diastolic_bp || 0,
        heart_rate: interaction?.vitals?.heart_rate || 0,
        temperature: interaction?.vitals?.temperature || 0,
        respiratory_rate: interaction?.vitals?.respiratory_rate || 0,
        oxygen_saturation: interaction?.vitals?.oxygen_saturation || 0,
        weight: interaction?.vitals?.weight || 0,
        height: interaction?.vitals?.height || 0,
        bmi: interaction?.vitals?.bmi || 0,
    });

    // Get primary address
    const primaryAddress: Address | undefined = patient?.addresses?.[0];

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

    const getStatusBadge = (status: string) => {
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

    const getOutcomeBadge = (outcome: string) => {
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

    // Handle back to patient
    const handleBack = () => {
        if (patient?.patient_uuid) {
            router.visit(`/patients/${patient.patient_uuid}`, {
                preserveState: false,
                preserveScroll: true,
            });
        } else {
            router.visit('/patients', {
                preserveState: false,
                preserveScroll: true,
            });
        }
    };

    // Handle screening click - show details
    const handleScreeningClick = (screening: any) => {
        setSelectedScreening(screening);
        setShowScreeningDetails(true);
    };

    // Handle add screening
    const handleAddScreening = async () => {
        if (!patient?.patient_uuid || !visit?.id) {
            Notiflix.Notify.warning('Missing patient or visit information');
            return;
        }

        setLoading(true);
        try {
            const response = await Http.post(`/patients/${patient.patient_uuid}/visit/${visit.id}/screening`, {
                ...screeningData,
                created_by: auth.user.id,
            });

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Screening added successfully');
                setShowScreeningForm(false);
                router.reload({
                    only: ['interaction'],
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        } catch (error: any) {
            console.error('Error adding screening:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to add screening');
        } finally {
            setLoading(false);
        }
    };

    // Handle integrated screening success
    const handleIntegratedScreeningSuccess = (data: any) => {
        console.log('Integrated screening submitted:', data);
        Notiflix.Notify.success('Integrated screening form submitted successfully');
        setShowIntegratedScreeningForm(false);
        router.reload({
            only: ['interaction'],
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handle save vitals
    const handleSaveVitals = async () => {
        if (!patient?.patient_uuid || !visit?.id) {
            Notiflix.Notify.warning('Missing patient or visit information');
            return;
        }

        let bmi = vitalsData.bmi;
        if (vitalsData.height && vitalsData.weight && vitalsData.height > 0) {
            bmi = vitalsData.weight / ((vitalsData.height / 100) * (vitalsData.height / 100));
        }

        const payload = {
            ...vitalsData,
            bmi: bmi,
            recorded_at: new Date().toISOString(),
            created_by: auth.user.id,
        };

        setLoading(true);
        try {
            const response = await Http.post(`/patients/${patient.patient_uuid}/visit/${visit.id}/vitals`, payload);

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Vitals saved successfully');
                setShowVitalsModal(false);
                router.reload({
                    only: ['interaction'],
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        } catch (error: any) {
            console.error('Error saving vitals:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save vitals');
        } finally {
            setLoading(false);
        }
    };

    // Handle delete visit
    const handleDeleteVisit = async () => {
        if (!patient?.patient_uuid || !visit?.id) {
            Notiflix.Notify.warning('Missing patient or visit information');
            return;
        }

        setLoading(true);
        try {
            const response = await Http.delete(`/patients/${patient.patient_uuid}/visit/${visit.id}`);

            if (response.status === 200 || response.status === 204) {
                Notiflix.Notify.success('Visit deleted successfully');
                setShowDeleteModal(false);
                if (patient?.patient_uuid) {
                    router.visit(`/patients/${patient.patient_uuid}`, {
                        preserveState: false,
                        preserveScroll: true,
                    });
                } else {
                    router.visit('/patients', {
                        preserveState: false,
                        preserveScroll: true,
                    });
                }
            }
        } catch (error: any) {
            console.error('Error deleting visit:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to delete visit');
        } finally {
            setLoading(false);
        }
    };

    // Info row for contact/risk
    const InfoRow = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => (
        <div className="flex items-center justify-between px-3.5 py-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                {icon}
                {label}
            </span>
            <span className="text-xs font-medium text-slate-800">{value}</span>
        </div>
    );

    // Compact demographic field
    const DemographicField = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div className="px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
            <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{value}</div>
        </div>
    );

    // Vitals Card Component
    const VitalsCard = ({ label, value, unit, icon, normalRange, color }: any) => {
        const isAbnormal = value && normalRange && (value < normalRange.min || value > normalRange.max);
        return (
            <div className={`rounded-md border p-3 ${isAbnormal ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`rounded-full p-1.5 ${isAbnormal ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                            {icon}
                        </div>
                        <span className="text-xs text-slate-500">{label}</span>
                    </div>
                    {isAbnormal && (
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                    )}
                </div>
                <div className="mt-1">
                    <span className="text-lg font-semibold text-slate-900">{value || '--'}</span>
                    <span className="ml-1 text-xs text-slate-500">{unit}</span>
                </div>
                {normalRange && (
                    <div className="mt-0.5 text-[10px] text-slate-400">
                        Normal: {normalRange.min}-{normalRange.max} {unit}
                    </div>
                )}
            </div>
        );
    };

    const avatarUrl = patient?.full_name
        ? `https://avatarapi.runflare.run/public?usearname=${encodeURIComponent(patient.full_name)}`
        : '';

    // If no patient data, show error state
    if (!patient) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Patient Not Found', href: '#' }]}>
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <AlertCircle className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-medium text-slate-900">Patient not found</h3>
                        <p className="mt-1 text-sm text-slate-500">The patient you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.visit('/patients')}
                            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Back to Patients
                        </button>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const vitals = interaction?.vitals;

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
                    href: `/patients/${patient?.patient_uuid || ''}`,
                },
                {
                    title: `Visit ${visit?.visit_number || ''}`,
                    href: '#',
                },
            ]}
            patient={patient}
            isPatientView={true}
        >
            <div className="min-h-screen bg-slate-100">
                {/* Header - same as before */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-3">
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleBack}
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
                                    <div className="mt-0.5 text-xs text-slate-500">
                                        Visit {visit?.visit_number || 'N/A'} • {formatShortDate(visit?.check_in_time || '')}
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
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-700"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete Visit
                                </button>
                            </div>
                        </div>

                        {/* Demographics */}
                        <div className="mb-3 grid grid-cols-2 divide-y divide-slate-100 rounded-md border border-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-6">
                            <DemographicField label="NRC number" value={patient?.nrc_number || 'N/A'} />
                            <DemographicField label="Date of birth" value={formatShortDate(patient?.date_of_birth || '')} />
                            <DemographicField label="Age" value={`${patient?.age || 0} years`} />
                            <DemographicField label="Gender" value={<span className="capitalize">{patient?.gender || 'N/A'}</span>} />
                            <DemographicField label="Marital status" value={patient?.marital_status || 'Not specified'} />
                            <DemographicField
                                label="Risk status"
                                value={
                                    <span className={patient?.is_high_risk ? 'text-rose-600' : 'text-emerald-600'}>
                                        {patient?.is_high_risk ? 'High risk' : 'Standard'}
                                    </span>
                                }
                            />
                        </div>

                        {/* Visit Stats Cards */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            <div className="rounded-md bg-blue-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-blue-600">Visit Number</div>
                                <div className="text-lg font-semibold text-blue-900">{visit?.visit_number || 'N/A'}</div>
                            </div>
                            <div className="rounded-md bg-emerald-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-emerald-600">Status</div>
                                <div className="text-sm font-semibold text-emerald-900">
                                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadge(visit?.visit_status || '')}`}>
                                        {visit?.visit_status?.replace('_', ' ') || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md bg-amber-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-amber-600">Outcome</div>
                                <div className="text-sm font-semibold text-amber-900">
                                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getOutcomeBadge(visit?.visit_outcome || 'pending')}`}>
                                        {visit?.visit_outcome || 'pending'}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md bg-violet-50 px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-violet-600">Check-in</div>
                                <div className="text-xs font-semibold text-violet-900">
                                    {formatDate(visit?.check_in_time || '')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Left Column - Patient Info & Vitals */}
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
                                        value={patient?.phone_number || 'N/A'}
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

                            {/* Vitals Section */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2 flex items-center justify-between">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <Heart className="inline h-3.5 w-3.5 mr-1.5 text-rose-500" />
                                        Vitals
                                    </h2>
                                    <button
                                        onClick={() => setShowVitalsModal(true)}
                                        className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        <Edit className="h-3 w-3" />
                                        {vitals ? 'Update' : 'Add'}
                                    </button>
                                </div>
                                <div className="p-3">
                                    {vitals ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-2">
                                                <VitalsCard
                                                    label="Systolic BP"
                                                    value={vitals.systolic_bp}
                                                    unit="mmHg"
                                                    icon={<Activity className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 90, max: 120 }}
                                                />
                                                <VitalsCard
                                                    label="Diastolic BP"
                                                    value={vitals.diastolic_bp}
                                                    unit="mmHg"
                                                    icon={<Activity className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 60, max: 80 }}
                                                />
                                                <VitalsCard
                                                    label="Heart Rate"
                                                    value={vitals.heart_rate}
                                                    unit="bpm"
                                                    icon={<Heart className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 60, max: 100 }}
                                                />
                                                <VitalsCard
                                                    label="Temperature"
                                                    value={vitals.temperature}
                                                    unit="°C"
                                                    icon={<Thermometer className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 36.1, max: 37.2 }}
                                                />
                                                <VitalsCard
                                                    label="Respiratory Rate"
                                                    value={vitals.respiratory_rate}
                                                    unit="/min"
                                                    icon={<Activity className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 12, max: 20 }}
                                                />
                                                <VitalsCard
                                                    label="Oxygen Saturation"
                                                    value={vitals.oxygen_saturation}
                                                    unit="%"
                                                    icon={<Droplets className="h-3.5 w-3.5" />}
                                                    normalRange={{ min: 95, max: 100 }}
                                                />
                                                <VitalsCard
                                                    label="Weight"
                                                    value={vitals.weight}
                                                    unit="kg"
                                                    icon={<Weight className="h-3.5 w-3.5" />}
                                                />
                                                <VitalsCard
                                                    label="Height"
                                                    value={vitals.height}
                                                    unit="cm"
                                                    icon={<Ruler className="h-3.5 w-3.5" />}
                                                />
                                            </div>
                                            {vitals.bmi && (
                                                <div className="mt-2 rounded-md bg-slate-50 p-2 text-center">
                                                    <span className="text-xs text-slate-500">BMI</span>
                                                    <span className="ml-2 text-sm font-semibold text-slate-800">
                                                        {vitals.bmi.toFixed(1)} kg/m²
                                                    </span>
                                                    <span className={`ml-2 text-xs font-medium ${
                                                        vitals.bmi < 18.5 ? 'text-amber-600' :
                                                            vitals.bmi < 25 ? 'text-emerald-600' :
                                                                vitals.bmi < 30 ? 'text-amber-600' :
                                                                    'text-rose-600'
                                                    }`}>
                                                        ({vitals.bmi < 18.5 ? 'Underweight' :
                                                        vitals.bmi < 25 ? 'Normal' :
                                                            vitals.bmi < 30 ? 'Overweight' :
                                                                'Obese'})
                                                    </span>
                                                </div>
                                            )}
                                            {vitals.recorded_at && (
                                                <div className="mt-1.5 text-[10px] text-slate-400 text-center">
                                                    Recorded: {formatDate(vitals.recorded_at)}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="py-4 text-center text-sm text-slate-500">
                                            No vitals recorded for this visit
                                            <button
                                                onClick={() => setShowVitalsModal(true)}
                                                className="ml-2 text-blue-600 hover:underline"
                                            >
                                                Add vitals
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Risk Assessment */}
                            {patient?.latest_risk_assessment && (
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

                        {/* Right Column - Interactions */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Presenting Complaint */}
                            {visit?.presenting_complaint && (
                                <div className="rounded-md border border-slate-200 bg-white p-4">
                                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Presenting Complaint
                                    </h4>
                                    <p className="text-sm text-slate-700">
                                        {visit.presenting_complaint}
                                    </p>
                                </div>
                            )}

                            {/* Screenings */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2.5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Screenings
                                            <span className="ml-1.5 font-normal text-slate-400">
                                                ({interaction?.screenings?.length || 0})
                                            </span>
                                        </h2>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setShowScreeningForm(true)}
                                                className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                                            >
                                                <Plus className="h-3 w-3" />
                                                Add Screening
                                            </button>
                                            <button
                                                onClick={() => setShowIntegratedScreeningForm(true)}
                                                className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                <Plus className="h-3 w-3" />
                                                Integrated Screening
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {interaction?.screenings && interaction.screenings.length > 0 ? (
                                        interaction.screenings.map((screening: any, index: number) => (
                                            <div
                                                key={index}
                                                className="px-3.5 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
                                                onClick={() => handleScreeningClick(screening)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-slate-800">
                                                                {screening.screening_type || 'Integrated Screening'}
                                                            </span>
                                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                screening.result === 'negative' ? 'bg-emerald-50 text-emerald-700' :
                                                                    screening.result === 'positive' || screening.is_positive ? 'bg-rose-50 text-rose-700' :
                                                                        'bg-slate-100 text-slate-600'
                                                            }`}>
                                                                {screening.result || 'pending'}
                                                            </span>
                                                            {screening.is_mental_health_flagged && (
                                                                <span className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                                    Mental Health
                                                                </span>
                                                            )}
                                                            {screening.is_positive && (
                                                                <span className="inline-block rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                                                                    Positive
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                            <span>Method: {screening.screening_method || 'N/A'}</span>
                                                            <span>•</span>
                                                            <span>{screening.screening_date || 'N/A'}</span>
                                                            {screening.follow_up_date && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span>Follow-up: {screening.follow_up_date}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        {screening.distress_score > 0 && (
                                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                                                <span>Distress: {screening.distress_score}/10</span>
                                                                <span>Anxiety: {screening.anxiety_score || 0}/21</span>
                                                                <span>Depression: {screening.depression_score || 0}/27</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(screening.created_at)}
                                                        </span>
                                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-6 text-center text-sm text-slate-500">
                                            No screenings recorded for this visit
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Clinical Notes */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2.5">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Clinical Notes
                                        <span className="ml-1.5 font-normal text-slate-400">
                                            ({interaction?.notes?.length || 0})
                                        </span>
                                    </h2>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {interaction?.notes && interaction.notes.length > 0 ? (
                                        interaction.notes.map((note: any, index: number) => (
                                            <div key={index} className="px-3.5 py-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-800">
                                                        {note.type || 'Note'}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {formatDate(note.created_at)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs text-slate-600">
                                                    {note.content}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-6 text-center text-sm text-slate-500">
                                            No notes recorded for this visit
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Referrals */}
                            {interaction?.referrals && interaction.referrals.length > 0 && (
                                <div className="rounded-md border border-slate-200 bg-white">
                                    <div className="border-b border-slate-200 px-3.5 py-2.5">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Referrals
                                            <span className="ml-1.5 font-normal text-slate-400">
                                                ({interaction.referrals.length})
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {interaction.referrals.map((referral: any, index: number) => (
                                            <div key={index} className="px-3.5 py-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-800">
                                                        {referral.destination || 'Referral'}
                                                    </span>
                                                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        referral.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                                            referral.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                                                                'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {referral.status || 'pending'}
                                                    </span>
                                                </div>
                                                {referral.reason && (
                                                    <p className="mt-1 text-xs text-slate-600">
                                                        Reason: {referral.reason}
                                                    </p>
                                                )}
                                                {referral.notes && (
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {referral.notes}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* SCREENING DETAILS MODAL - COMPACT DESIGN */}
                {/* ============================================================ */}
                {showScreeningDetails && selectedScreening && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowScreeningDetails(false)}
                        />
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                                {/* Header */}
                                <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-md bg-blue-50 p-1.5">
                                            <ClipboardCheck className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                Screening Details
                                            </h3>
                                            <p className="text-[10px] text-slate-500">
                                                {selectedScreening.screening_type || 'Integrated Screening'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowScreeningDetails(false)}
                                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    {/* Status Badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            selectedScreening.result === 'negative' ? 'bg-emerald-50 text-emerald-700' :
                                                selectedScreening.result === 'positive' || selectedScreening.is_positive ? 'bg-rose-50 text-rose-700' :
                                                    'bg-slate-100 text-slate-600'
                                        }`}>
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            Result: {selectedScreening.result || 'pending'}
                                        </span>
                                        {selectedScreening.is_positive && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                                                <AlertOctagon className="h-3 w-3" />
                                                Positive
                                            </span>
                                        )}
                                        {selectedScreening.is_mental_health_flagged && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                                <Brain className="h-3 w-3" />
                                                Mental Health Flagged
                                            </span>
                                        )}
                                    </div>

                                    {/* Screening Info Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="rounded-md bg-slate-50 p-2.5">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                                <Calendar className="h-3 w-3" />
                                                Screening Date
                                            </div>
                                            <div className="text-sm font-medium text-slate-800">
                                                {selectedScreening.screening_date || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="rounded-md bg-slate-50 p-2.5">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                                <Microscope className="h-3 w-3" />
                                                Method
                                            </div>
                                            <div className="text-sm font-medium text-slate-800">
                                                {selectedScreening.screening_method || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="rounded-md bg-slate-50 p-2.5">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                                <Stethoscope className="h-3 w-3" />
                                                Treatment Decision
                                            </div>
                                            <div className="text-sm font-medium text-slate-800 capitalize">
                                                {selectedScreening.treatment_decision?.replace(/_/g, ' ') || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="rounded-md bg-slate-50 p-2.5">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                                <Calendar className="h-3 w-3" />
                                                Follow-up Date
                                            </div>
                                            <div className="text-sm font-medium text-slate-800">
                                                {selectedScreening.follow_up_date || 'Not scheduled'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mental Health Scores */}
                                    {(selectedScreening.distress_score > 0 ||
                                        selectedScreening.anxiety_score > 0 ||
                                        selectedScreening.depression_score > 0) && (
                                        <div className="mb-4">
                                            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-1.5">
                                                <Brain className="h-3.5 w-3.5" />
                                                Mental Health Assessment
                                            </h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="rounded-md border border-slate-200 p-2.5 text-center">
                                                    <div className="text-[10px] text-slate-500">Distress</div>
                                                    <div className="text-lg font-bold text-slate-800">
                                                        {selectedScreening.distress_score || 0}
                                                        <span className="text-xs font-normal text-slate-400">/10</span>
                                                    </div>
                                                    <div className={`text-[10px] font-medium ${
                                                        selectedScreening.distress_score >= 7 ? 'text-rose-600' :
                                                            selectedScreening.distress_score >= 4 ? 'text-amber-600' :
                                                                'text-emerald-600'
                                                    }`}>
                                                        {selectedScreening.distress_score >= 7 ? 'Severe' :
                                                            selectedScreening.distress_score >= 4 ? 'Moderate' :
                                                                selectedScreening.distress_score >= 1 ? 'Mild' : 'None'}
                                                    </div>
                                                </div>
                                                <div className="rounded-md border border-slate-200 p-2.5 text-center">
                                                    <div className="text-[10px] text-slate-500">Anxiety (GAD-7)</div>
                                                    <div className="text-lg font-bold text-slate-800">
                                                        {selectedScreening.anxiety_score || 0}
                                                        <span className="text-xs font-normal text-slate-400">/21</span>
                                                    </div>
                                                    <div className={`text-[10px] font-medium ${
                                                        selectedScreening.anxiety_score >= 15 ? 'text-rose-600' :
                                                            selectedScreening.anxiety_score >= 10 ? 'text-amber-600' :
                                                                selectedScreening.anxiety_score >= 5 ? 'text-blue-600' :
                                                                    'text-emerald-600'
                                                    }`}>
                                                        {selectedScreening.anxiety_score >= 15 ? 'Severe' :
                                                            selectedScreening.anxiety_score >= 10 ? 'Moderate' :
                                                                selectedScreening.anxiety_score >= 5 ? 'Mild' : 'Minimal'}
                                                    </div>
                                                </div>
                                                <div className="rounded-md border border-slate-200 p-2.5 text-center">
                                                    <div className="text-[10px] text-slate-500">Depression (PHQ-9)</div>
                                                    <div className="text-lg font-bold text-slate-800">
                                                        {selectedScreening.depression_score || 0}
                                                        <span className="text-xs font-normal text-slate-400">/27</span>
                                                    </div>
                                                    <div className={`text-[10px] font-medium ${
                                                        selectedScreening.depression_score >= 15 ? 'text-rose-600' :
                                                            selectedScreening.depression_score >= 10 ? 'text-amber-600' :
                                                                selectedScreening.depression_score >= 5 ? 'text-blue-600' :
                                                                    'text-emerald-600'
                                                    }`}>
                                                        {selectedScreening.depression_score >= 15 ? 'Severe' :
                                                            selectedScreening.depression_score >= 10 ? 'Moderate' :
                                                                selectedScreening.depression_score >= 5 ? 'Mild' : 'Minimal'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Notes */}
                                    {selectedScreening.notes && (
                                        <div className="mb-3">
                                            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                                                Notes
                                            </h4>
                                            <div className="rounded-md bg-slate-50 p-2.5 text-sm text-slate-700">
                                                {selectedScreening.notes}
                                            </div>
                                        </div>
                                    )}

                                    {/* Full Data (collapsible) */}
                                    {selectedScreening.full_data && (
                                        <details className="mb-3">
                                            <summary className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
                                                View Full Data
                                            </summary>
                                            <div className="mt-2 rounded-md bg-slate-50 p-2.5 max-h-40 overflow-y-auto">
                                                <pre className="text-[10px] text-slate-600 whitespace-pre-wrap">
                                                    {JSON.stringify(selectedScreening.full_data, null, 2)}
                                                </pre>
                                            </div>
                                        </details>
                                    )}

                                    {/* Submitted Info */}
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-3">
                                        <div>
                                            <span className="font-medium">Submitted:</span>{' '}
                                            {formatDate(selectedScreening.submitted_at || selectedScreening.created_at)}
                                        </div>
                                        {selectedScreening.submitted_by && (
                                            <div>
                                                <span className="font-medium">By:</span> {selectedScreening.submitted_by}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-slate-200 px-4 py-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowScreeningDetails(false)}
                                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowScreeningDetails(false);
                                            // You could open the edit form here
                                            Notiflix.Notify.info('Edit functionality coming soon');
                                        }}
                                        className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        <Edit className="h-3 w-3 inline mr-1" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vitals Modal */}
                {showVitalsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                        <div
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                            onClick={() => setShowVitalsModal(false)}
                        />
                        <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white shadow-xl">
                            <div className="border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        <Heart className="inline h-4 w-4 mr-2 text-rose-500" />
                                        {vitals ? 'Update Vitals' : 'Record Vitals'}
                                    </h3>
                                    <p className="text-xs text-slate-500">Enter patient vital signs</p>
                                </div>
                                <button
                                    onClick={() => setShowVitalsModal(false)}
                                    className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Systolic BP (mmHg)</label>
                                            <input
                                                type="number"
                                                value={vitalsData.systolic_bp || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, systolic_bp: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 120"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Diastolic BP (mmHg)</label>
                                            <input
                                                type="number"
                                                value={vitalsData.diastolic_bp || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, diastolic_bp: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 80"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Heart Rate (bpm)</label>
                                            <input
                                                type="number"
                                                value={vitalsData.heart_rate || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, heart_rate: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 72"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Temperature (°C)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={vitalsData.temperature || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, temperature: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 36.5"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Respiratory Rate (/min)</label>
                                            <input
                                                type="number"
                                                value={vitalsData.respiratory_rate || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, respiratory_rate: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 16"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Oxygen Saturation (%)</label>
                                            <input
                                                type="number"
                                                value={vitalsData.oxygen_saturation || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, oxygen_saturation: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 98"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Weight (kg)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={vitalsData.weight || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, weight: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 70.5"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Height (cm)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={vitalsData.height || ''}
                                                onChange={(e) => setVitalsData({ ...vitalsData, height: parseFloat(e.target.value) || 0 })}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="e.g., 175"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {vitalsData.height > 0 && vitalsData.weight > 0 && (
                                    <div className="mt-4 rounded-md bg-slate-50 p-3 text-center">
                                        <span className="text-xs text-slate-500">Calculated BMI</span>
                                        <span className="ml-2 text-sm font-semibold text-slate-800">
                                            {(vitalsData.weight / ((vitalsData.height / 100) * (vitalsData.height / 100))).toFixed(1)} kg/m²
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-slate-200 px-5 py-3 flex justify-end gap-2">
                                <button
                                    onClick={() => setShowVitalsModal(false)}
                                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveVitals}
                                    disabled={loading}
                                    className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Vitals'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Screening Modal */}
                {showScreeningForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                        <div
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                            onClick={() => setShowScreeningForm(false)}
                        />
                        <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl">
                            <div className="border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Add Screening
                                </h3>
                                <button
                                    onClick={() => setShowScreeningForm(false)}
                                    className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700">
                                        Screening Type *
                                    </label>
                                    <select
                                        value={screeningData.screening_type}
                                        onChange={(e) => setScreeningData({ ...screeningData, screening_type: e.target.value })}
                                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    >
                                        <option value="cervical">Cervical Cancer Screening</option>
                                        <option value="breast">Breast Cancer Screening</option>
                                        <option value="mental">Mental Health Screening</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700">
                                        Result
                                    </label>
                                    <select
                                        value={screeningData.result}
                                        onChange={(e) => setScreeningData({ ...screeningData, result: e.target.value })}
                                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    >
                                        <option value="negative">Negative</option>
                                        <option value="positive">Positive</option>
                                        <option value="inconclusive">Inconclusive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700">
                                        Notes
                                    </label>
                                    <textarea
                                        value={screeningData.notes}
                                        onChange={(e) => setScreeningData({ ...screeningData, notes: e.target.value })}
                                        rows={3}
                                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Add any relevant notes about the screening..."
                                    />
                                </div>
                            </div>
                            <div className="border-t border-slate-200 px-5 py-3 flex justify-end gap-2">
                                <button
                                    onClick={() => setShowScreeningForm(false)}
                                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddScreening}
                                    disabled={loading}
                                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    {loading ? 'Adding...' : 'Add Screening'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Integrated Screening Form */}
                <IntegratedScreeningForm
                    isOpen={showIntegratedScreeningForm}
                    onClose={() => setShowIntegratedScreeningForm(false)}
                    patientId={patient?.patient_uuid || ''}
                    visitId={visit?.id || ''}
                    userId={auth?.user?.id || ''}
                    onSuccess={handleIntegratedScreeningSuccess}
                />

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-slate-500/60 transition-opacity"
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <div className="border-b border-slate-200 px-5 py-3.5">
                                    <h3 className="text-sm font-semibold text-slate-900">Delete Visit</h3>
                                </div>
                                <div className="px-5 py-4">
                                    <div className="flex items-start gap-2.5">
                                        <AlertCircle className="h-4.5 w-4.5 mt-0.5 shrink-0 text-rose-500" />
                                        <p className="text-sm text-slate-600">
                                            Are you sure you want to delete visit{' '}
                                            <strong className="font-medium text-slate-900">
                                                {visit?.visit_number}
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
                                            onClick={handleDeleteVisit}
                                            disabled={loading}
                                            className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
                                        >
                                            {loading ? 'Deleting...' : 'Delete Visit'}
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

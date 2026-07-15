// pages/patients/[patientUuid]/breast-cancer/treatment.tsx

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import TreatmentModal from './components/modals/TreatmentModal';
import { Button } from '@/components/ui/button';
import {
    Plus,
    ClipboardCheck,
    Calendar,
    Scissors,
    Radiation,
    Syringe,
    Pill,
    Activity,
    FileText,
    Printer,
    Search,
    Filter,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';
import { cn } from '@/lib/utils';

interface Patient {
    id: number;
    patient_uuid: string;
    first_name: string;
    last_name: string;
    full_name: string;
    nrc_number: string;
    age: number;
    gender: string;
    date_of_birth: string;
    phone_number: string;
    is_high_risk: boolean;
}

interface TreatmentPlan {
    id: string;
    patient_id: string;
    screening_id: string | null;
    surgery_date: string;
    surgery_type: string;
    surgery_notes: string;
    radiotherapy_start: string;
    radiotherapy_end: string;
    radiotherapy_dosage: string;
    radiotherapy_boost: string;
    radiotherapy_notes: string;
    chemo_neo_start: string;
    chemo_neo_end: string;
    chemo_adjuvant_start: string;
    chemo_adjuvant_end: string;
    chemo_cycles: string;
    chemo_regimen: string;
    chemo_toxicities: string;
    chemo_notes: string;
    hormonal_type: string;
    hormonal_duration: string;
    hormonal_notes: string;
    her2_agent: string;
    her2_cycles: string;
    her2_notes: string;
    targeted_therapy: string;
    targeted_therapy_notes: string;
    treatment_plan: string;
    treatment_notes: string;
    oncologist: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    patient: Patient;
    treatmentPlans: TreatmentPlan[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function BreastTreatment() {
    const { props } = usePage<PageProps>();
    const { patient, treatmentPlans = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plans, setPlans] = useState<TreatmentPlan[]>(treatmentPlans);
    const [editingData, setEditingData] = useState<TreatmentPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

    // Format date
    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    // Get treatment status
    const getTreatmentStatus = (plan: TreatmentPlan) => {
        const hasSurgery = !!plan.surgery_date;
        const hasRadiotherapy = !!plan.radiotherapy_start;
        const hasChemo = !!plan.chemo_neo_start || !!plan.chemo_adjuvant_start;
        const hasHormonal = !!plan.hormonal_type;
        const hasHER2 = !!plan.her2_agent;

        if (hasSurgery || hasRadiotherapy || hasChemo || hasHormonal || hasHER2) {
            return { label: 'Active', color: 'bg-emerald-100 text-emerald-800' };
        }
        return { label: 'Pending', color: 'bg-amber-100 text-amber-800' };
    };

    // Get treatment type badge
    const getTreatmentBadge = (type: string) => {
        const colors: Record<string, string> = {
            'Surgery': 'bg-blue-100 text-blue-800',
            'Radiotherapy': 'bg-purple-100 text-purple-800',
            'Chemotherapy': 'bg-rose-100 text-rose-800',
            'Hormonal': 'bg-emerald-100 text-emerald-800',
            'HER2': 'bg-indigo-100 text-indigo-800',
            'Targeted': 'bg-amber-100 text-amber-800',
        };
        return colors[type] || 'bg-slate-100 text-slate-800';
    };

    // Get treatment types present in a plan
    const getTreatmentTypes = (plan: TreatmentPlan): string[] => {
        const types: string[] = [];
        if (plan.surgery_date) types.push('Surgery');
        if (plan.radiotherapy_start) types.push('Radiotherapy');
        if (plan.chemo_neo_start || plan.chemo_adjuvant_start) types.push('Chemotherapy');
        if (plan.hormonal_type) types.push('Hormonal');
        if (plan.her2_agent) types.push('HER2');
        if (plan.targeted_therapy) types.push('Targeted');
        return types;
    };

    // Handle new treatment
    const handleNewTreatment = () => {
        setEditingData(null);
        setIsModalOpen(true);
    };

    // Handle edit treatment
    const handleEditTreatment = (plan: TreatmentPlan) => {
        setEditingData(plan);
        setIsModalOpen(true);
    };

    // Handle successful save
    const handleSaveSuccess = (data: any) => {
        if (editingData) {
            setPlans(prev => prev.map(p => p.id === data.id ? data : p));
            Notiflix.Notify.success('Treatment plan updated successfully');
        } else {
            setPlans(prev => [data, ...prev]);
            Notiflix.Notify.success('Treatment plan saved successfully');
        }
        setIsModalOpen(false);
        setEditingData(null);
    };

    // Toggle expanded plan
    const toggleExpanded = (planId: string) => {
        setExpandedPlan(expandedPlan === planId ? null : planId);
    };

    // Filter plans
    const filteredPlans = plans.filter(plan => {
        // Search filter
        const matchesSearch =
            plan.oncologist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.treatment_plan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.chemo_regimen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.hormonal_type?.toLowerCase().includes(searchTerm.toLowerCase());

        // Type filter
        let matchesType = true;
        if (filterType === 'surgery') {
            matchesType = !!plan.surgery_date;
        } else if (filterType === 'radiotherapy') {
            matchesType = !!plan.radiotherapy_start;
        } else if (filterType === 'chemotherapy') {
            matchesType = !!plan.chemo_neo_start || !!plan.chemo_adjuvant_start;
        } else if (filterType === 'hormonal') {
            matchesType = !!plan.hormonal_type;
        } else if (filterType === 'her2') {
            matchesType = !!plan.her2_agent;
        }

        return matchesSearch && matchesType;
    });

    return (
        <AppLayout
            patient={patient}
            isPatientView={true}
            breadcrumbs={[
                {
                    title: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
                    href: `/patients/registry/${patient?.patient_uuid || ''}`,
                },
                {
                    title: 'Breast Cancer',
                    href: `/patients/${patient?.patient_uuid}/breast-cancer`,
                },
                {
                    title: 'Treatment',
                    href: '#',
                },
            ]}
        >
            <div className="min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <ClipboardCheck className="h-6 w-6 text-slate-600" />
                                Treatment Plans
                            </h1>
                            <p className="text-sm text-slate-500">
                                {patient?.full_name} • {patient?.age} years • {patient?.gender}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.print()}
                                className="flex items-center gap-1"
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                            <Button
                                onClick={handleNewTreatment}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white"
                            >
                                <Plus className="h-4 w-4" />
                                New Treatment Plan
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards - Removed per request */}
                    {/* Filters */}
                    <div className="mb-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search treatment plans..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 bg-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 bg-white"
                            >
                                <option value="all">All Treatments</option>
                                <option value="surgery">Surgery</option>
                                <option value="radiotherapy">Radiotherapy</option>
                                <option value="chemotherapy">Chemotherapy</option>
                                <option value="hormonal">Hormonal</option>
                                <option value="her2">HER2</option>
                            </select>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterType('all');
                                }}
                                className="flex items-center gap-1"
                            >
                                <Filter className="h-3.5 w-3.5" />
                                Clear
                            </Button>
                        </div>
                    </div>

                    {/* Treatment Plans List */}
                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <ClipboardCheck className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                    Treatment Plans ({filteredPlans.length})
                                </span>
                            </div>
                        </div>

                        {filteredPlans.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {filteredPlans.map((plan) => {
                                    const status = getTreatmentStatus(plan);
                                    const treatmentTypes = getTreatmentTypes(plan);
                                    const isExpanded = expandedPlan === plan.id;

                                    return (
                                        <div key={plan.id} className="px-4 py-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <button
                                                            onClick={() => toggleExpanded(plan.id)}
                                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                        <span className="text-sm font-medium text-slate-900">
                                                            Treatment Plan
                                                        </span>
                                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                                                            {status.label}
                                                        </span>
                                                        {treatmentTypes.map((type) => (
                                                            <span key={type} className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getTreatmentBadge(type)}`}>
                                                                {type}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                                        {plan.surgery_date && (
                                                            <span className="flex items-center gap-1">
                                                                <Scissors className="h-3 w-3" />
                                                                Surgery: {formatDate(plan.surgery_date)}
                                                            </span>
                                                        )}
                                                        {plan.radiotherapy_start && (
                                                            <span className="flex items-center gap-1">
                                                                <Radiation className="h-3 w-3" />
                                                                RT: {formatDate(plan.radiotherapy_start)}
                                                            </span>
                                                        )}
                                                        {plan.chemo_neo_start && (
                                                            <span className="flex items-center gap-1">
                                                                <Syringe className="h-3 w-3" />
                                                                Neo: {formatDate(plan.chemo_neo_start)}
                                                            </span>
                                                        )}
                                                        {plan.oncologist && (
                                                            <span>• Oncologist: {plan.oncologist}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditTreatment(plan)}
                                                        className="text-xs"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            Notiflix.Notify.info('View details coming soon');
                                                        }}
                                                        className="text-xs"
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {isExpanded && (
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {/* Surgery Details */}
                                                        {plan.surgery_date && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Scissors className="h-3.5 w-3.5" />
                                                                    Surgery
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    <div><span className="text-slate-500">Type:</span> {plan.surgery_type}</div>
                                                                    <div><span className="text-slate-500">Date:</span> {formatDate(plan.surgery_date)}</div>
                                                                    {plan.surgery_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.surgery_notes}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Radiotherapy Details */}
                                                        {plan.radiotherapy_start && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Radiation className="h-3.5 w-3.5" />
                                                                    Radiotherapy
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    <div><span className="text-slate-500">Start:</span> {formatDate(plan.radiotherapy_start)}</div>
                                                                    {plan.radiotherapy_end && (
                                                                        <div><span className="text-slate-500">End:</span> {formatDate(plan.radiotherapy_end)}</div>
                                                                    )}
                                                                    {plan.radiotherapy_dosage && (
                                                                        <div><span className="text-slate-500">Dosage:</span> {plan.radiotherapy_dosage}</div>
                                                                    )}
                                                                    {plan.radiotherapy_boost && (
                                                                        <div><span className="text-slate-500">Boost:</span> {plan.radiotherapy_boost}</div>
                                                                    )}
                                                                    {plan.radiotherapy_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.radiotherapy_notes}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Chemotherapy Details */}
                                                        {(plan.chemo_neo_start || plan.chemo_adjuvant_start) && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Syringe className="h-3.5 w-3.5" />
                                                                    Chemotherapy
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    {plan.chemo_neo_start && (
                                                                        <div><span className="text-slate-500">Neo Adjuvant:</span> {formatDate(plan.chemo_neo_start)} {plan.chemo_neo_end && `- ${formatDate(plan.chemo_neo_end)}`}</div>
                                                                    )}
                                                                    {plan.chemo_adjuvant_start && (
                                                                        <div><span className="text-slate-500">Adjuvant:</span> {formatDate(plan.chemo_adjuvant_start)} {plan.chemo_adjuvant_end && `- ${formatDate(plan.chemo_adjuvant_end)}`}</div>
                                                                    )}
                                                                    {plan.chemo_cycles && (
                                                                        <div><span className="text-slate-500">Cycles:</span> {plan.chemo_cycles}</div>
                                                                    )}
                                                                    {plan.chemo_regimen && (
                                                                        <div><span className="text-slate-500">Regimen:</span> {plan.chemo_regimen}</div>
                                                                    )}
                                                                    {plan.chemo_toxicities && (
                                                                        <div><span className="text-slate-500">Toxicities:</span> {plan.chemo_toxicities}</div>
                                                                    )}
                                                                    {plan.chemo_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.chemo_notes}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Hormonal & HER2 Details */}
                                                        {(plan.hormonal_type || plan.her2_agent) && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Pill className="h-3.5 w-3.5" />
                                                                    Hormonal & HER2
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    {plan.hormonal_type && (
                                                                        <div><span className="text-slate-500">Hormonal:</span> {plan.hormonal_type} {plan.hormonal_duration && `(${plan.hormonal_duration})`}</div>
                                                                    )}
                                                                    {plan.hormonal_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.hormonal_notes}</div>
                                                                    )}
                                                                    {plan.her2_agent && (
                                                                        <div><span className="text-slate-500">HER2 Agent:</span> {plan.her2_agent} {plan.her2_cycles && `(${plan.her2_cycles} cycles)`}</div>
                                                                    )}
                                                                    {plan.her2_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.her2_notes}</div>
                                                                    )}
                                                                    {plan.targeted_therapy && (
                                                                        <div><span className="text-slate-500">Targeted:</span> {plan.targeted_therapy}</div>
                                                                    )}
                                                                    {plan.targeted_therapy_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.targeted_therapy_notes}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Treatment Plan Overview */}
                                                        {(plan.treatment_plan || plan.treatment_notes) && (
                                                            <div className="rounded-md border border-slate-200 p-3 md:col-span-2">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <FileText className="h-3.5 w-3.5" />
                                                                    Treatment Overview
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    {plan.treatment_plan && (
                                                                        <div><span className="text-slate-500">Plan:</span> {plan.treatment_plan}</div>
                                                                    )}
                                                                    {plan.treatment_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {plan.treatment_notes}</div>
                                                                    )}
                                                                    {plan.oncologist && (
                                                                        <div><span className="text-slate-500">Oncologist:</span> {plan.oncologist}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <ClipboardCheck className="mx-auto h-12 w-12 text-slate-300" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">No treatment plans found</h3>
                                <p className="text-sm text-slate-500">
                                    {searchTerm || filterType !== 'all'
                                        ? 'No plans match your filters.'
                                        : 'No treatment plans have been created for this patient yet.'}
                                </p>
                                <Button
                                    onClick={handleNewTreatment}
                                    className="mt-4 bg-slate-700 hover:bg-slate-800 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create First Treatment Plan
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Treatment Modal */}
                <TreatmentModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingData(null);
                    }}
                    onSuccess={handleSaveSuccess}
                    patientId={String(patient?.id)}
                    patientUuid={patient?.patient_uuid}
                    userId={auth?.user?.id}
                    editingData={editingData}
                />
            </div>
        </AppLayout>
    );
}

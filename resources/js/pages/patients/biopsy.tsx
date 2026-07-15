// pages/patients/[patientUuid]/breast-cancer/biopsy.tsx

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import BiopsyModal from './components/modals/biopsy'; // Fixed import path
import { Button } from '@/components/ui/button';
import {
    Plus,
    Microscope,
    Calendar,
    FileText,
    Printer,
    Search,
    Filter,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Activity,
    Syringe,
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

interface BiopsyResult {
    id: string;
    patient_id: string;
    screening_id: string | null;
    biopsy_type: string;
    biopsy_date: string;
    er: string;
    pr: string;
    her2: string;
    fish: string;
    ki67: string;
    lvi: string;
    pni: string;
    tumor_grade: string;
    biopsy_notes: string;
    pathologist: string;
    lab_reference: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    patient: Patient;
    biopsyResults: BiopsyResult[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function BreastBiopsy() {
    const { props } = usePage<PageProps>();
    const { patient, biopsyResults = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [biopsies, setBiopsies] = useState<BiopsyResult[]>(biopsyResults);
    const [editingData, setEditingData] = useState<BiopsyResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [expandedBiopsy, setExpandedBiopsy] = useState<string | null>(null);

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

    // Get HER2 status display
    const getHer2Display = (her2: string) => {
        const map: Record<string, string> = {
            '0': '0 (Negative)',
            '1': '1+ (Negative)',
            '2': '2+ (Equivocal)',
            '3': '3+ (Positive)',
        };
        return map[her2] || her2;
    };

    // Get HER2 badge color
    const getHer2Badge = (her2: string) => {
        const colors: Record<string, string> = {
            '0': 'bg-emerald-100 text-emerald-800',
            '1': 'bg-emerald-100 text-emerald-800',
            '2': 'bg-amber-100 text-amber-800',
            '3': 'bg-rose-100 text-rose-800',
        };
        return colors[her2] || 'bg-slate-100 text-slate-800';
    };

    // Get ER/PR status badge
    const getMarkerBadge = (value: string) => {
        const num = parseInt(value);
        if (isNaN(num)) return 'bg-slate-100 text-slate-800';
        if (num >= 10) return 'bg-emerald-100 text-emerald-800';
        if (num >= 1) return 'bg-amber-100 text-amber-800';
        return 'bg-rose-100 text-rose-800';
    };

    // Get tumor grade badge
    const getGradeBadge = (grade: string) => {
        const colors: Record<string, string> = {
            '1': 'bg-emerald-100 text-emerald-800',
            '2': 'bg-amber-100 text-amber-800',
            '3': 'bg-rose-100 text-rose-800',
        };
        return colors[grade] || 'bg-slate-100 text-slate-800';
    };

    // Handle new biopsy
    const handleNewBiopsy = () => {
        setEditingData(null);
        setIsModalOpen(true);
    };

    // Handle edit biopsy
    const handleEditBiopsy = (biopsy: BiopsyResult) => {
        setEditingData(biopsy);
        setIsModalOpen(true);
    };

    // Handle successful save
    const handleSaveSuccess = (data: any) => {
        if (editingData) {
            setBiopsies(prev => prev.map(b => b.id === data.id ? data : b));
            Notiflix.Notify.success('Biopsy updated successfully');
        } else {
            setBiopsies(prev => [data, ...prev]);
            Notiflix.Notify.success('Biopsy saved successfully');
        }
        setIsModalOpen(false);
        setEditingData(null);
    };

    // Toggle expanded biopsy
    const toggleExpanded = (biopsyId: string) => {
        setExpandedBiopsy(expandedBiopsy === biopsyId ? null : biopsyId);
    };

    // Filter biopsies
    const filteredBiopsies = biopsies.filter(biopsy => {
        // Search filter
        const matchesSearch =
            biopsy.pathologist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biopsy.biopsy_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biopsy.lab_reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biopsy.biopsy_notes?.toLowerCase().includes(searchTerm.toLowerCase());

        // Type filter
        let matchesType = true;
        if (filterType === 'core') {
            matchesType = biopsy.biopsy_type === 'Core needle biopsy';
        } else if (filterType === 'fna') {
            matchesType = biopsy.biopsy_type === 'Fine needle aspiration';
        } else if (filterType === 'surgical') {
            matchesType = biopsy.biopsy_type === 'Surgical biopsy';
        } else if (filterType === 'positive') {
            matchesType = parseInt(biopsy.er) >= 10 || parseInt(biopsy.pr) >= 10 || biopsy.her2 === '3';
        } else if (filterType === 'negative') {
            matchesType = parseInt(biopsy.er) < 1 && parseInt(biopsy.pr) < 1 && biopsy.her2 !== '3';
        }

        return matchesSearch && matchesType;
    });

    // Calculate molecular subtype
    const getMolecularSubtype = (biopsy: BiopsyResult) => {
        const er = parseInt(biopsy.er) || 0;
        const pr = parseInt(biopsy.pr) || 0;
        const her2 = biopsy.her2;

        const isErPrPositive = er >= 10 || pr >= 10;
        const isHer2Positive = her2 === '3' || her2 === '2';

        if (isErPrPositive && !isHer2Positive) return 'Luminal A/B';
        if (isErPrPositive && isHer2Positive) return 'Luminal HER2+';
        if (!isErPrPositive && isHer2Positive) return 'HER2 Enriched';
        if (!isErPrPositive && !isHer2Positive) return 'Triple Negative';
        return 'Unknown';
    };

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
                    title: 'Biopsy',
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
                                <Microscope className="h-6 w-6 text-slate-600" />
                                Biopsy Results
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
                                onClick={handleNewBiopsy}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white"
                            >
                                <Plus className="h-4 w-4" />
                                New Biopsy
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search biopsies..."
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
                                <option value="all">All Biopsies</option>
                                <option value="core">Core Needle</option>
                                <option value="fna">Fine Needle Aspiration</option>
                                <option value="surgical">Surgical</option>
                                <option value="positive">Receptor Positive</option>
                                <option value="negative">Triple Negative</option>
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

                    {/* Biopsy List */}
                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                    Biopsy Results ({filteredBiopsies.length})
                                </span>
                            </div>
                        </div>

                        {filteredBiopsies.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {filteredBiopsies.map((biopsy) => {
                                    const isExpanded = expandedBiopsy === biopsy.id;
                                    const molecularSubtype = getMolecularSubtype(biopsy);

                                    return (
                                        <div key={biopsy.id} className="px-4 py-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <button
                                                            onClick={() => toggleExpanded(biopsy.id)}
                                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                        <span className="text-sm font-medium text-slate-900">
                                                            {biopsy.biopsy_type}
                                                        </span>
                                                        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                                            Grade {biopsy.tumor_grade}
                                                        </span>
                                                        <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                                            {molecularSubtype}
                                                        </span>
                                                        {biopsy.biopsy_date && (
                                                            <span className="flex items-center gap-1 text-xs text-slate-500">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDate(biopsy.biopsy_date)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getMarkerBadge(biopsy.er)}`}>
                                                            ER: {biopsy.er || 'N/A'}%
                                                        </span>
                                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getMarkerBadge(biopsy.pr)}`}>
                                                            PR: {biopsy.pr || 'N/A'}%
                                                        </span>
                                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getHer2Badge(biopsy.her2)}`}>
                                                            HER2: {getHer2Display(biopsy.her2)}
                                                        </span>
                                                        {biopsy.ki67 && (
                                                            <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                                                KI67: {biopsy.ki67}%
                                                            </span>
                                                        )}
                                                        {biopsy.pathologist && (
                                                            <span className="text-xs text-slate-500">
                                                                • {biopsy.pathologist}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditBiopsy(biopsy)}
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
                                                        {/* Biopsy Details */}
                                                        <div className="rounded-md border border-slate-200 p-3">
                                                            <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                <Microscope className="h-3.5 w-3.5" />
                                                                Biopsy Details
                                                            </h5>
                                                            <div className="space-y-1 text-sm">
                                                                <div><span className="text-slate-500">Type:</span> {biopsy.biopsy_type}</div>
                                                                <div><span className="text-slate-500">Date:</span> {formatDate(biopsy.biopsy_date)}</div>
                                                                <div><span className="text-slate-500">Pathologist:</span> {biopsy.pathologist || 'N/A'}</div>
                                                                <div><span className="text-slate-500">Lab Reference:</span> {biopsy.lab_reference || 'N/A'}</div>
                                                                {biopsy.biopsy_notes && (
                                                                    <div><span className="text-slate-500">Notes:</span> {biopsy.biopsy_notes}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Molecular Markers */}
                                                        <div className="rounded-md border border-slate-200 p-3">
                                                            <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                <Activity className="h-3.5 w-3.5" />
                                                                Molecular Markers
                                                            </h5>
                                                            <div className="space-y-1 text-sm">
                                                                <div><span className="text-slate-500">ER Status:</span> {biopsy.er || 'N/A'}%</div>
                                                                <div><span className="text-slate-500">PR Status:</span> {biopsy.pr || 'N/A'}%</div>
                                                                <div><span className="text-slate-500">HER2:</span> {getHer2Display(biopsy.her2)}</div>
                                                                <div><span className="text-slate-500">FISH:</span> {biopsy.fish || 'N/A'}</div>
                                                                <div><span className="text-slate-500">KI67:</span> {biopsy.ki67 || 'N/A'}%</div>
                                                                <div><span className="text-slate-500">Tumor Grade:</span> {biopsy.tumor_grade}</div>
                                                            </div>
                                                        </div>

                                                        {/* Additional Pathology */}
                                                        <div className="rounded-md border border-slate-200 p-3 md:col-span-2">
                                                            <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                <Syringe className="h-3.5 w-3.5" />
                                                                Additional Pathology
                                                            </h5>
                                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                                <div><span className="text-slate-500">LVI:</span> {biopsy.lvi || 'Not specified'}</div>
                                                                <div><span className="text-slate-500">PNI:</span> {biopsy.pni || 'Not specified'}</div>
                                                            </div>
                                                            {biopsy.biopsy_notes && (
                                                                <div className="mt-2 text-sm">
                                                                    <span className="text-slate-500">Notes:</span> {biopsy.biopsy_notes}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Microscope className="mx-auto h-12 w-12 text-slate-300" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">No biopsy results found</h3>
                                <p className="text-sm text-slate-500">
                                    {searchTerm || filterType !== 'all'
                                        ? 'No biopsies match your filters.'
                                        : 'No biopsy results have been recorded for this patient yet.'}
                                </p>
                                <Button
                                    onClick={handleNewBiopsy}
                                    className="mt-4 bg-slate-700 hover:bg-slate-800 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Biopsy
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Biopsy Modal */}
                <BiopsyModal
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

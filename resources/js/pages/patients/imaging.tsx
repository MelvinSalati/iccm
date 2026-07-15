
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import ImagingModal from './components/modals/Imaging';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Camera,
    Calendar,
    Eye,
    FileText,
    Search,
    Filter,
    Download,
    Printer,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

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

interface ImagingStudy {
    id: string;
    patient_id: string;
    screening_id: string | null;
    mammogram_date: string;
    mammogram_laterality: string;
    mammogram_tumour_size: string;
    mammogram_birads: string;
    mammogram_findings: string;
    ultrasound_date: string;
    ultrasound_laterality: string;
    ultrasound_tumour_size: string;
    ultrasound_birads: string;
    ultrasound_findings: string;
    mri_date: string;
    mri_laterality: string;
    mri_findings: string;
    ct_scan: boolean;
    ct_scan_date: string;
    ct_scan_findings: string;
    bone_scan: boolean;
    bone_scan_date: string;
    bone_scan_findings: string;
    pet_scan: boolean;
    pet_scan_date: string;
    pet_scan_findings: string;
    radiologist: string;
    imaging_notes: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    patient: Patient;
    imagingStudies: ImagingStudy[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function BreastImaging() {
    const { props } = usePage<PageProps>();
    const { patient, imagingStudies = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studies, setStudies] = useState<ImagingStudy[]>(imagingStudies);
    const [editingData, setEditingData] = useState<ImagingStudy | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

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

    // Get BIRADS badge color
    const getBiradsBadge = (birads: string) => {
        const colors: Record<string, string> = {
            '0': 'bg-slate-100 text-slate-800',
            '1': 'bg-emerald-100 text-emerald-800',
            '2': 'bg-emerald-100 text-emerald-800',
            '3': 'bg-amber-100 text-amber-800',
            '4': 'bg-orange-100 text-orange-800',
            '5': 'bg-rose-100 text-rose-800',
            '6': 'bg-purple-100 text-purple-800',
        };
        return colors[birads] || 'bg-slate-100 text-slate-800';
    };

    // Get laterality badge
    const getLateralityBadge = (laterality: string) => {
        const colors: Record<string, string> = {
            'Right': 'bg-blue-100 text-blue-800',
            'Left': 'bg-purple-100 text-purple-800',
            'Bilateral': 'bg-indigo-100 text-indigo-800',
        };
        return colors[laterality] || 'bg-slate-100 text-slate-800';
    };

    // Get study type badge
    const getStudyTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            'Mammogram': 'bg-pink-100 text-pink-800',
            'Ultrasound': 'bg-cyan-100 text-cyan-800',
            'MRI': 'bg-violet-100 text-violet-800',
            'CT Scan': 'bg-blue-100 text-blue-800',
            'Bone Scan': 'bg-amber-100 text-amber-800',
            'PET Scan': 'bg-rose-100 text-rose-800',
        };
        return colors[type] || 'bg-slate-100 text-slate-800';
    };

    // Get study types present in a study
    const getStudyTypes = (study: ImagingStudy): string[] => {
        const types: string[] = [];
        if (study.mammogram_date) types.push('Mammogram');
        if (study.ultrasound_date) types.push('Ultrasound');
        if (study.mri_date) types.push('MRI');
        if (study.ct_scan) types.push('CT Scan');
        if (study.bone_scan) types.push('Bone Scan');
        if (study.pet_scan) types.push('PET Scan');
        return types;
    };

    // Handle new imaging
    const handleNewImaging = () => {
        setEditingData(null);
        setIsModalOpen(true);
    };

    // Handle edit imaging
    const handleEditImaging = (study: ImagingStudy) => {
        setEditingData(study);
        setIsModalOpen(true);
    };

    // Handle successful save
    const handleSaveSuccess = (data: any) => {
        if (editingData) {
            // Update existing
            setStudies(prev => prev.map(s => s.id === data.id ? data : s));
            Notiflix.Notify.success('Imaging study updated successfully');
        } else {
            // Add new
            setStudies(prev => [data, ...prev]);
            Notiflix.Notify.success('Imaging study saved successfully');
        }
        setIsModalOpen(false);
        setEditingData(null);
    };

    // Toggle expanded study
    const toggleExpanded = (studyId: string) => {
        setExpandedStudy(expandedStudy === studyId ? null : studyId);
    };

    // Filter studies
    const filteredStudies = studies.filter(study => {
        // Search filter
        const matchesSearch =
            study.radiologist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            study.mammogram_findings?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            study.ultrasound_findings?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            study.mri_findings?.toLowerCase().includes(searchTerm.toLowerCase());

        // Type filter
        let matchesType = true;
        if (filterType === 'mammogram') {
            matchesType = !!study.mammogram_date;
        } else if (filterType === 'ultrasound') {
            matchesType = !!study.ultrasound_date;
        } else if (filterType === 'mri') {
            matchesType = !!study.mri_date;
        } else if (filterType === 'ct') {
            matchesType = study.ct_scan;
        } else if (filterType === 'bone') {
            matchesType = study.bone_scan;
        } else if (filterType === 'pet') {
            matchesType = study.pet_scan;
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
                    title: 'Imaging',
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
                                <Camera className="h-6 w-6 text-slate-600" />
                                Breast Imaging
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
                                onClick={handleNewImaging}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white"
                            >
                                <Plus className="h-4 w-4" />
                                New Imaging Study
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs text-slate-500">Total Studies</p>
                            <p className="text-2xl font-bold text-slate-900">{studies.length}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs text-slate-500">Mammograms</p>
                            <p className="text-2xl font-bold text-pink-600">
                                {studies.filter(s => s.mammogram_date).length}
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs text-slate-500">Ultrasounds</p>
                            <p className="text-2xl font-bold text-cyan-600">
                                {studies.filter(s => s.ultrasound_date).length}
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs text-slate-500">Other Scans</p>
                            <p className="text-2xl font-bold text-slate-600">
                                {studies.filter(s => s.ct_scan || s.bone_scan || s.pet_scan).length}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search imaging studies..."
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
                                <option value="all">All Studies</option>
                                <option value="mammogram">Mammogram</option>
                                <option value="ultrasound">Ultrasound</option>
                                <option value="mri">MRI</option>
                                <option value="ct">CT Scan</option>
                                <option value="bone">Bone Scan</option>
                                <option value="pet">PET Scan</option>
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

                    {/* Imaging Studies List */}
                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                    Imaging Studies ({filteredStudies.length})
                                </span>
                            </div>
                        </div>

                        {filteredStudies.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {filteredStudies.map((study) => {
                                    const studyTypes = getStudyTypes(study);
                                    const isExpanded = expandedStudy === study.id;

                                    return (
                                        <div key={study.id} className="px-4 py-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <button
                                                            onClick={() => toggleExpanded(study.id)}
                                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                        <span className="text-sm font-medium text-slate-900">
                                                            Imaging Study
                                                        </span>
                                                        {studyTypes.map((type) => (
                                                            <span key={type} className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStudyTypeBadge(type)}`}>
                                                                {type}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                                        {study.mammogram_date && (
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                Mammogram: {formatDate(study.mammogram_date)}
                                                            </span>
                                                        )}
                                                        {study.mammogram_birads && study.mammogram_birads !== '0' && (
                                                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${getBiradsBadge(study.mammogram_birads)}`}>
                                                                BIRADS {study.mammogram_birads}
                                                            </span>
                                                        )}
                                                        {study.mammogram_tumour_size && (
                                                            <span>Size: {study.mammogram_tumour_size}</span>
                                                        )}
                                                        {study.radiologist && (
                                                            <span>• Radiologist: {study.radiologist}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditImaging(study)}
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
                                                        {/* Mammogram Details */}
                                                        {study.mammogram_date && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Camera className="h-3.5 w-3.5" />
                                                                    Mammogram
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    <div><span className="text-slate-500">Date:</span> {formatDate(study.mammogram_date)}</div>
                                                                    <div><span className="text-slate-500">Laterality:</span> {study.mammogram_laterality}</div>
                                                                    {study.mammogram_tumour_size && (
                                                                        <div><span className="text-slate-500">Size:</span> {study.mammogram_tumour_size}</div>
                                                                    )}
                                                                    <div><span className="text-slate-500">BIRADS:</span> {study.mammogram_birads}</div>
                                                                    {study.mammogram_findings && (
                                                                        <div><span className="text-slate-500">Findings:</span> {study.mammogram_findings}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Ultrasound Details */}
                                                        {study.ultrasound_date && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Camera className="h-3.5 w-3.5" />
                                                                    Ultrasound
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    <div><span className="text-slate-500">Date:</span> {formatDate(study.ultrasound_date)}</div>
                                                                    <div><span className="text-slate-500">Laterality:</span> {study.ultrasound_laterality}</div>
                                                                    {study.ultrasound_tumour_size && (
                                                                        <div><span className="text-slate-500">Size:</span> {study.ultrasound_tumour_size}</div>
                                                                    )}
                                                                    <div><span className="text-slate-500">BIRADS:</span> {study.ultrasound_birads}</div>
                                                                    {study.ultrasound_findings && (
                                                                        <div><span className="text-slate-500">Findings:</span> {study.ultrasound_findings}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* MRI Details */}
                                                        {study.mri_date && (
                                                            <div className="rounded-md border border-slate-200 p-3">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Camera className="h-3.5 w-3.5" />
                                                                    MRI
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    <div><span className="text-slate-500">Date:</span> {formatDate(study.mri_date)}</div>
                                                                    <div><span className="text-slate-500">Laterality:</span> {study.mri_laterality}</div>
                                                                    {study.mri_findings && (
                                                                        <div><span className="text-slate-500">Findings:</span> {study.mri_findings}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Other Scans */}
                                                        {(study.ct_scan || study.bone_scan || study.pet_scan) && (
                                                            <div className="rounded-md border border-slate-200 p-3 md:col-span-2">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <Camera className="h-3.5 w-3.5" />
                                                                    Other Scans
                                                                </h5>
                                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                                                    {study.ct_scan && (
                                                                        <div>
                                                                            <span className="text-slate-500">CT Scan:</span>
                                                                            <div>{formatDate(study.ct_scan_date)}</div>
                                                                            {study.ct_scan_findings && (
                                                                                <div className="text-xs text-slate-600">{study.ct_scan_findings}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {study.bone_scan && (
                                                                        <div>
                                                                            <span className="text-slate-500">Bone Scan:</span>
                                                                            <div>{formatDate(study.bone_scan_date)}</div>
                                                                            {study.bone_scan_findings && (
                                                                                <div className="text-xs text-slate-600">{study.bone_scan_findings}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {study.pet_scan && (
                                                                        <div>
                                                                            <span className="text-slate-500">PET Scan:</span>
                                                                            <div>{formatDate(study.pet_scan_date)}</div>
                                                                            {study.pet_scan_findings && (
                                                                                <div className="text-xs text-slate-600">{study.pet_scan_findings}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Notes & Radiologist */}
                                                        {(study.radiologist || study.imaging_notes) && (
                                                            <div className="rounded-md border border-slate-200 p-3 md:col-span-2">
                                                                <h5 className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-2">
                                                                    <FileText className="h-3.5 w-3.5" />
                                                                    Additional Information
                                                                </h5>
                                                                <div className="space-y-1 text-sm">
                                                                    {study.radiologist && (
                                                                        <div><span className="text-slate-500">Radiologist:</span> {study.radiologist}</div>
                                                                    )}
                                                                    {study.imaging_notes && (
                                                                        <div><span className="text-slate-500">Notes:</span> {study.imaging_notes}</div>
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
                                <Camera className="mx-auto h-12 w-12 text-slate-300" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">No imaging studies found</h3>
                                <p className="text-sm text-slate-500">
                                    {searchTerm || filterType !== 'all'
                                        ? 'No studies match your filters.'
                                        : 'No imaging studies have been recorded for this patient yet.'}
                                </p>
                                <Button
                                    onClick={handleNewImaging}
                                    className="mt-4 bg-slate-700 hover:bg-slate-800 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Imaging Study
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Imaging Modal */}
                <ImagingModal
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

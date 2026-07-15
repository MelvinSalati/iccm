// pages/patients/[patientUuid]/breast-cancer/screening.tsx

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import BreastCancerScreeningModal from './components/modals/BreastScreeningModal';
import { Button } from '@/components/ui/button';
import { Plus, Heart, FileSearch, Calendar, User, AlertCircle } from 'lucide-react';
import Notiflix from 'notiflix';

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
    breastCancerScreening: BreastCancerScreening[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

export default function Screening() {
    const { props } = usePage<PageProps>();
    const { patient, breastCancerScreening = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [screenings, setScreenings] = useState<BreastCancerScreening[]>(breastCancerScreening);
    const [editingData, setEditingData] = useState<any>(null);

    // Handler for opening the modal
    const handleOpenModal = () => {
        setEditingData(null);
        setIsModalOpen(true);
    };

    // Handler for editing a screening
    const handleEditScreening = async (screening: BreastCancerScreening) => {
        try {
            const response = await Http.get(`/patients/${patient.patient_uuid}/breast-cancer/screening/${screening.id}`);
            setEditingData(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching screening details:', error);
            Notiflix.Notify.failure('Failed to load screening details');
        }
    };

    // Handler for closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingData(null);
    };

    // Handler for successful screening submission
    const handleScreeningSuccess = (data: any) => {
        setScreenings(prev => {
            const existingIndex = prev.findIndex(s => s.id === data.id);
            if (existingIndex >= 0) {
                // Update existing
                const updated = [...prev];
                updated[existingIndex] = data;
                return updated;
            }
            // Add new
            return [data, ...prev];
        });
        setIsModalOpen(false);
        setEditingData(null);
        Notiflix.Notify.success('Screening saved successfully!');
    };

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

    // Get status badge
    const getStatusBadge = (isPositive: boolean) => {
        return isPositive
            ? 'bg-rose-100 text-rose-800 border-rose-200'
            : 'bg-emerald-100 text-emerald-800 border-emerald-200';
    };

    // Get stage color
    const getStageColor = (stage: string) => {
        const colors: Record<string, string> = {
            '0': 'bg-gray-100 text-gray-800',
            'IA': 'bg-blue-100 text-blue-800',
            'IB': 'bg-blue-100 text-blue-800',
            'IIA': 'bg-indigo-100 text-indigo-800',
            'IIB': 'bg-indigo-100 text-indigo-800',
            'IIIA': 'bg-purple-100 text-purple-800',
            'IIIB': 'bg-purple-100 text-purple-800',
            'IIIC': 'bg-purple-100 text-purple-800',
            'IV': 'bg-rose-100 text-rose-800'
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
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
                    title: 'Screening',
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
                                <Heart className="h-6 w-6 text-slate-600" />
                                Breast Cancer Screening
                            </h1>
                            <p className="text-sm text-slate-500">
                                {patient?.full_name} • {patient?.age} years • {patient?.gender}
                            </p>
                        </div>
                        <Button
                            onClick={handleOpenModal}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white"
                        >
                            <Plus className="h-4 w-4" />
                            New Screening
                        </Button>
                    </div>

                    {/* Screenings List */}
                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <FileSearch className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                    Screening History ({screenings.length})
                                </span>
                            </div>
                        </div>

                        {screenings.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {screenings.map((screening) => (
                                    <div key={screening.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {screening.patient_name}
                                                    </span>
                                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(screening.is_positive)}`}>
                                                        {screening.is_positive ? 'Positive' : 'Negative'}
                                                    </span>
                                                    {screening.stage_group && (
                                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(screening.stage_group)}`}>
                                                            Stage {screening.stage_group}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(screening.screening_date)}
                                                    </span>
                                                    <span>•</span>
                                                    <span>ER: {screening.er_status}%</span>
                                                    <span>PR: {screening.pr_status}%</span>
                                                    <span>HER2: {screening.her2_status}</span>
                                                    <span>•</span>
                                                    <span>By: {screening.submitted_by_name || screening.submitted_by}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => handleEditScreening(screening)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => {
                                                        Notiflix.Notify.info('View details coming soon');
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Heart className="mx-auto h-12 w-12 text-slate-300" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">No screenings found</h3>
                                <p className="text-sm text-slate-500">
                                    No breast cancer screenings have been recorded for this patient yet.
                                </p>
                                <Button
                                    onClick={handleOpenModal}
                                    className="mt-4 bg-slate-700 hover:bg-slate-800 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Start First Screening
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Breast Cancer Screening Modal */}
                <BreastCancerScreeningModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={handleScreeningSuccess}
                    patientId={String(patient?.id)}
                    patientUuid={patient?.patient_uuid}
                    userId={auth?.user?.id}
                    editingData={editingData}
                />
            </div>
        </AppLayout>
    );
}

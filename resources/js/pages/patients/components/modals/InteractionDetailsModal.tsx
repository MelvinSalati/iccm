// components/modals/InteractionDetailsModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Activity, User, Calendar, Stethoscope, FileText, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

interface InteractionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    visitId: string;
    patientData: any;
}

interface InteractionData {
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
}

export const InteractionDetailsModal: React.FC<InteractionDetailsModalProps> = ({
                                                                                    isOpen,
                                                                                    onClose,
                                                                                    patientId,
                                                                                    visitId,
                                                                                    patientData,
                                                                                }) => {
    const [loading, setLoading] = useState(true);
    const [interaction, setInteraction] = useState<InteractionData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showScreeningForm, setShowScreeningForm] = useState(false);

    useEffect(() => {
        if (isOpen && visitId) {
            fetchInteractionDetails();
        }
    }, [isOpen, visitId]);

    const fetchInteractionDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await Http.get(`/patients/${patientId}/visit/${visitId}/interactions`);
            if (response.status === 200) {
                setInteraction(response.data.data);
            } else {
                setError('Failed to load interaction details');
            }
        } catch (error: any) {
            console.error('Error fetching interaction details:', error);
            setError(error.response?.data?.message || 'Failed to load interaction details');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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

    // Handle adding a new screening
    const handleAddScreening = () => {
        setShowScreeningForm(true);
    };

    // Handle screening form submission
    const handleScreeningSubmit = (data: any) => {
        console.log('Screening submitted:', data);
        setShowScreeningForm(false);
        // Refresh interaction details
        fetchInteractionDetails();
        Notiflix.Notify.success('Screening added successfully');
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Modal */}
                <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                <Activity className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Interaction Details
                                </h3>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                    <User className="h-3 w-3" />
                                    <span>{patientData?.first_name} {patientData?.last_name}</span>
                                    {interaction && (
                                        <>
                                            <span className="text-slate-300">·</span>
                                            <span>{interaction.visit_number}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                            </div>
                        ) : error ? (
                            <div className="rounded-md bg-rose-50 p-4 text-center text-rose-700">
                                <AlertCircle className="mx-auto h-8 w-8" />
                                <p className="mt-2 text-sm font-medium">{error}</p>
                                <button
                                    onClick={fetchInteractionDetails}
                                    className="mt-2 rounded-md bg-rose-100 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-200"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : interaction ? (
                            <div className="space-y-5">
                                {/* Visit Summary */}
                                <div className="rounded-md bg-slate-50 p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Visit Type
                                            </p>
                                            <p className="text-sm font-medium text-slate-800">
                                                {interaction.visit_type || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Department
                                            </p>
                                            <p className="text-sm font-medium text-slate-800">
                                                {interaction.department || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Status
                                            </p>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadge(interaction.visit_status)}`}>
                                                {interaction.visit_status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Outcome
                                            </p>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getOutcomeBadge(interaction.visit_outcome || 'pending')}`}>
                                                {interaction.visit_outcome || 'pending'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Check-in
                                            </p>
                                            <p className="text-xs text-slate-600">
                                                {formatDate(interaction.check_in_time)}
                                            </p>
                                        </div>
                                        {interaction.check_out_time && (
                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                    Check-out
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    {formatDate(interaction.check_out_time)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Presenting Complaint */}
                                {interaction.presenting_complaint && (
                                    <div>
                                        <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Presenting Complaint
                                        </h4>
                                        <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
                                            {interaction.presenting_complaint}
                                        </p>
                                    </div>
                                )}

                                {/* Screenings */}
                                {interaction.screenings && interaction.screenings.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Screenings ({interaction.screenings.length})
                                            </h4>
                                            <button
                                                onClick={handleAddScreening}
                                                className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                                            >
                                                + Add Screening
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {interaction.screenings.map((screening: any, index: number) => (
                                                <div key={index} className="rounded-md border border-slate-200 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-slate-800">
                                                            {screening.screening_type || 'Screening'}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(screening.created_at)}
                                                        </span>
                                                    </div>
                                                    {screening.result && (
                                                        <p className="mt-1 text-xs text-slate-600">
                                                            Result: {screening.result}
                                                        </p>
                                                    )}
                                                    {screening.notes && (
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {screening.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {interaction.notes && interaction.notes.length > 0 && (
                                    <div>
                                        <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Clinical Notes
                                        </h4>
                                        <div className="space-y-2">
                                            {interaction.notes.map((note: any, index: number) => (
                                                <div key={index} className="rounded-md bg-slate-50 p-3">
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
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Referrals */}
                                {interaction.referrals && interaction.referrals.length > 0 && (
                                    <div>
                                        <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Referrals
                                        </h4>
                                        <div className="space-y-2">
                                            {interaction.referrals.map((referral: any, index: number) => (
                                                <div key={index} className="rounded-md border border-amber-200 bg-amber-50 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-amber-800">
                                                            {referral.destination || 'Referral'}
                                                        </span>
                                                        <span className="text-xs text-amber-600">
                                                            {referral.status || 'pending'}
                                                        </span>
                                                    </div>
                                                    {referral.reason && (
                                                        <p className="mt-1 text-xs text-amber-700">
                                                            Reason: {referral.reason}
                                                        </p>
                                                    )}
                                                    {referral.notes && (
                                                        <p className="mt-1 text-xs text-amber-600">
                                                            {referral.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-slate-500">
                                <AlertCircle className="mx-auto h-8 w-8" />
                                <p className="mt-2 text-sm">No interaction details found</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                        <div className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Patient:</span> {patientData?.first_name} {patientData?.last_name}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Close
                            </button>
                            {interaction && (
                                <button
                                    onClick={() => {
                                        window.print();
                                    }}
                                    className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    <FileText className="h-3.5 w-3.5" />
                                    Export
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screening Form Modal - Nested inside */}
            {showScreeningForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                        onClick={() => setShowScreeningForm(false)}
                    />
                    <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Add Screening
                            </h3>
                            <button
                                onClick={() => setShowScreeningForm(false)}
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-700">
                                    Screening Type *
                                </label>
                                <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
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
                                <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
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
                                    rows={3}
                                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Add any relevant notes about the screening..."
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t">
                                <button
                                    onClick={() => setShowScreeningForm(false)}
                                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle screening submission
                                        Notiflix.Notify.success('Screening added successfully');
                                        setShowScreeningForm(false);
                                        fetchInteractionDetails();
                                    }}
                                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                >
                                    Add Screening
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InteractionDetailsModal;

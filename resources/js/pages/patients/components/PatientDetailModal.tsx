// components/patients/PatientDetailModal.tsx

import React from 'react';
import { X, User, Calendar, Phone, Mail, MapPin, Shield, FileText } from 'lucide-react';

interface PatientDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient: {
        id: number;
        full_name: string;
        first_name: string;
        last_name: string;
        gender: string;
        age: number;
        date_of_birth: string;
        phone_number: string | null;
        nrc_number: string | null;
        marital_status: string | null;
        is_active: boolean;
        registered_at: string;
        latest_risk_assessment?: {
            risk_level: string;
            risk_score: number;
            assessment_date: string;
            hiv_status_label?: string;
            hpv_status_label?: string;
        } | null;
    };
}

export default function PatientDetailModal({
                                               isOpen,
                                               onClose,
                                               patient,
                                           }: PatientDetailModalProps) {
    if (!isOpen) return null;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        Patient Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {patient.first_name?.charAt(0)}
                            {patient.last_name?.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                {patient.full_name}
                            </h4>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {patient.gender || 'Not specified'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {patient.age > 0 ? `${patient.age} years` : 'N/A'}
                                </span>
                                {patient.nrc_number && (
                                    <span className="flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        {patient.nrc_number}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded border border-slate-200 p-2 dark:border-slate-700">
                            <p className="text-[10px] uppercase text-slate-500">Contact</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {patient.phone_number || 'No phone number'}
                            </p>
                        </div>
                        <div className="rounded border border-slate-200 p-2 dark:border-slate-700">
                            <p className="text-[10px] uppercase text-slate-500">Status</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {patient.is_active ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div className="rounded border border-slate-200 p-2 dark:border-slate-700">
                            <p className="text-[10px] uppercase text-slate-500">Registered</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {formatDate(patient.registered_at)}
                            </p>
                        </div>
                        <div className="rounded border border-slate-200 p-2 dark:border-slate-700">
                            <p className="text-[10px] uppercase text-slate-500">Risk Level</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {patient.latest_risk_assessment?.risk_level || 'Not assessed'}
                                {patient.latest_risk_assessment?.risk_score !== undefined && (
                                    <span className="ml-1 text-xs text-slate-500">
                                        ({patient.latest_risk_assessment.risk_score})
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {patient.latest_risk_assessment?.assessment_date && (
                        <div className="mt-3 rounded border border-slate-200 p-2 dark:border-slate-700">
                            <p className="text-[10px] uppercase text-slate-500">
                                Last Assessment
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {formatDate(patient.latest_risk_assessment.assessment_date)}
                            </p>
                            <div className="mt-1 flex gap-2 text-xs text-slate-600 dark:text-slate-400">
                                {patient.latest_risk_assessment.hiv_status_label && (
                                    <span className="flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        HIV: {patient.latest_risk_assessment.hiv_status_label}
                                    </span>
                                )}
                                {patient.latest_risk_assessment.hpv_status_label && (
                                    <span className="flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        HPV: {patient.latest_risk_assessment.hpv_status_label}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        className="w-full rounded bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

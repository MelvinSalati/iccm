// pages/breast-cancer/components/BiopsyModal.tsx

import React, { useState, useEffect } from 'react';
import {
    X,
    Microscope,
    Save,
    AlertCircle,
    CheckCircle,
    Calendar,
    Clock,
    FileText,
    Syringe,
    Activity,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

interface BiopsyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
    patientId?: string;
    patientUuid?: string;
    screeningId?: string;
    userId?: string;
    editingData?: any;
}

interface FormData {
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
}

export default function BiopsyModal({
                                        isOpen = false,
                                        onClose,
                                        onSuccess,
                                        patientId,
                                        patientUuid,
                                        screeningId,
                                        userId,
                                        editingData,
                                    }: BiopsyModalProps) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        patient_id: patientId || '',
        screening_id: screeningId || null,
        biopsy_type: 'Core needle biopsy',
        biopsy_date: '',
        er: '',
        pr: '',
        her2: '0',
        fish: 'Not specified',
        ki67: '',
        lvi: 'Not specified',
        pni: 'Not specified',
        tumor_grade: '1',
        biopsy_notes: '',
        pathologist: '',
        lab_reference: '',
    });

    useEffect(() => {
        if (editingData) {
            setFormData(prev => ({
                ...prev,
                ...editingData,
            }));
        }
    }, [editingData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.patient_id) {
            Notiflix.Notify.warning('Patient ID is required');
            return;
        }

        setSaving(true);
        try {
            // Use patientUuid in the URL path
            const basePath = patientUuid ? `/patients/${patientUuid}/breast-cancer` : '/breast-cancer';
            const endpoint = editingData
                ? `${basePath}/biopsy/${editingData.id}`
                : `${basePath}/biopsy`;
            const method = editingData ? 'put' : 'post';

            const response = await Http[method](endpoint, {
                ...formData,
                user_id: userId,
            });

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Biopsy saved successfully');
                onSuccess(response.data.data);
                onClose();
            }
        } catch (error: any) {
            console.error('Submit error:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save biopsy');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-slate-100 p-1.5">
                                <Microscope className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {editingData ? 'Edit' : 'New'} Biopsy
                                </h3>
                                <p className="text-xs text-slate-500">Pathology and molecular markers</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-hidden">
                        <div className="p-4 h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700">Biopsy Type *</label>
                                    <select
                                        name="biopsy_type"
                                        value={formData.biopsy_type}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                    >
                                        <option value="Core needle biopsy">Core needle biopsy</option>
                                        <option value="Fine needle aspiration">Fine needle aspiration</option>
                                        <option value="Surgical biopsy">Surgical biopsy</option>
                                        <option value="Vacuum assisted biopsy">Vacuum assisted biopsy</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700">Biopsy Date</label>
                                    <input
                                        type="date"
                                        name="biopsy_date"
                                        value={formData.biopsy_date}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 border-t border-slate-200 pt-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5" />
                                    Molecular Markers
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">ER (%)</label>
                                        <input
                                            type="number"
                                            name="er"
                                            value={formData.er}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">PR (%)</label>
                                        <input
                                            type="number"
                                            name="pr"
                                            value={formData.pr}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">HER2</label>
                                        <select
                                            name="her2"
                                            value={formData.her2}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="0">0 (Negative)</option>
                                            <option value="1">1+ (Negative)</option>
                                            <option value="2">2+ (Equivocal)</option>
                                            <option value="3">3+ (Positive)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">FISH</label>
                                        <select
                                            name="fish"
                                            value={formData.fish}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Positive">Positive</option>
                                            <option value="Negative">Negative</option>
                                            <option value="Equivocal">Equivocal</option>
                                            <option value="Not specified">Not specified</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">KI67 (%)</label>
                                        <input
                                            type="number"
                                            name="ki67"
                                            value={formData.ki67}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Tumor Grade</label>
                                        <select
                                            name="tumor_grade"
                                            value={formData.tumor_grade}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="1">1 (Low grade)</option>
                                            <option value="2">2 (Intermediate)</option>
                                            <option value="3">3 (High grade)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-slate-200 pt-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Activity className="h-3.5 w-3.5" />
                                    Additional Pathology
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">LVI</label>
                                        <select
                                            name="lvi"
                                            value={formData.lvi}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Not specified">Not specified</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">PNI</label>
                                        <select
                                            name="pni"
                                            value={formData.pni}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Not specified">Not specified</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Pathologist</label>
                                        <input
                                            type="text"
                                            name="pathologist"
                                            value={formData.pathologist}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Pathologist name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Lab Reference</label>
                                        <input
                                            type="text"
                                            name="lab_reference"
                                            value={formData.lab_reference}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Lab reference number"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-xs font-medium text-slate-700">Notes</label>
                                <textarea
                                    name="biopsy_notes"
                                    value={formData.biopsy_notes}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                    rows={2}
                                    placeholder="Additional pathology notes..."
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50 rounded-b-lg flex-shrink-0">
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <AlertCircle className="h-3.5 w-3.5" />
                                <span>* Required fields</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-1.5 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-3.5 w-3.5" />
                                            Save Biopsy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

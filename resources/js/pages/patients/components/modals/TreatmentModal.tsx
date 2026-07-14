// pages/breast-cancer/components/TreatmentModal.tsx

import React, { useState, useEffect } from 'react';
import {
    X,
    ClipboardCheck,
    Save,
    AlertCircle,
    Calendar,
    Scissors,
    Radiation,
    Syringe,
    Pill,
    Activity,
    FileText,
    Clock,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

interface TreatmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
    patientId?: string;
    screeningId?: string;
    userId?: string;
    editingData?: any;
}

interface FormData {
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
}

export default function TreatmentModal({
                                           isOpen = false,
                                           onClose,
                                           onSuccess,
                                           patientId,
                                           screeningId,
                                           userId,
                                           editingData,
                                       }: TreatmentModalProps) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        patient_id: patientId || '',
        screening_id: screeningId || null,
        surgery_date: '',
        surgery_type: 'Excision biopsy',
        surgery_notes: '',
        radiotherapy_start: '',
        radiotherapy_end: '',
        radiotherapy_dosage: '',
        radiotherapy_boost: '',
        radiotherapy_notes: '',
        chemo_neo_start: '',
        chemo_neo_end: '',
        chemo_adjuvant_start: '',
        chemo_adjuvant_end: '',
        chemo_cycles: '',
        chemo_regimen: '',
        chemo_toxicities: '',
        chemo_notes: '',
        hormonal_type: '',
        hormonal_duration: '',
        hormonal_notes: '',
        her2_agent: '',
        her2_cycles: '',
        her2_notes: '',
        targeted_therapy: '',
        targeted_therapy_notes: '',
        treatment_plan: '',
        treatment_notes: '',
        oncologist: '',
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
            const endpoint = editingData ? `/treatment/${editingData.id}` : '/treatment';
            const method = editingData ? 'put' : 'post';

            const response = await Http[method](endpoint, {
                ...formData,
                user_id: userId,
            });

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Treatment saved successfully');
                onSuccess(response.data.data);
                onClose();
            }
        } catch (error: any) {
            console.error('Submit error:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save treatment');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl max-h-[95vh] flex flex-col">
                    {/* Header */}
                    <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-slate-100 p-1.5">
                                <ClipboardCheck className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {editingData ? 'Edit' : 'New'} Treatment Plan
                                </h3>
                                <p className="text-xs text-slate-500">Comprehensive treatment management</p>
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
                            {/* Surgery */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Scissors className="h-3.5 w-3.5" />
                                    Surgery
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date</label>
                                        <input
                                            type="date"
                                            name="surgery_date"
                                            value={formData.surgery_date}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Type</label>
                                        <select
                                            name="surgery_type"
                                            value={formData.surgery_type}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Excision biopsy">Excision biopsy</option>
                                            <option value="Lumpectomy">Lumpectomy</option>
                                            <option value="Mastectomy">Mastectomy</option>
                                            <option value="Modified radical mastectomy">Modified radical mastectomy</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Notes</label>
                                        <textarea
                                            name="surgery_notes"
                                            value={formData.surgery_notes}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={1}
                                            placeholder="Surgery notes..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Radiotherapy */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Radiation className="h-3.5 w-3.5" />
                                    Radiotherapy
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Start Date</label>
                                        <input
                                            type="date"
                                            name="radiotherapy_start"
                                            value={formData.radiotherapy_start}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">End Date</label>
                                        <input
                                            type="date"
                                            name="radiotherapy_end"
                                            value={formData.radiotherapy_end}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Dosage</label>
                                        <input
                                            type="text"
                                            name="radiotherapy_dosage"
                                            value={formData.radiotherapy_dosage}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., 42.5 Gy"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Boost Dosage</label>
                                        <input
                                            type="text"
                                            name="radiotherapy_boost"
                                            value={formData.radiotherapy_boost}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., 10 Gy"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Notes</label>
                                        <textarea
                                            name="radiotherapy_notes"
                                            value={formData.radiotherapy_notes}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={1}
                                            placeholder="Radiotherapy notes..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Chemotherapy */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Syringe className="h-3.5 w-3.5" />
                                    Chemotherapy
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Neo Adjuvant Start</label>
                                        <input
                                            type="date"
                                            name="chemo_neo_start"
                                            value={formData.chemo_neo_start}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Neo Adjuvant End</label>
                                        <input
                                            type="date"
                                            name="chemo_neo_end"
                                            value={formData.chemo_neo_end}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Adjuvant Start</label>
                                        <input
                                            type="date"
                                            name="chemo_adjuvant_start"
                                            value={formData.chemo_adjuvant_start}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Adjuvant End</label>
                                        <input
                                            type="date"
                                            name="chemo_adjuvant_end"
                                            value={formData.chemo_adjuvant_end}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Cycles</label>
                                        <input
                                            type="number"
                                            name="chemo_cycles"
                                            value={formData.chemo_cycles}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Number of cycles"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Regimen</label>
                                        <input
                                            type="text"
                                            name="chemo_regimen"
                                            value={formData.chemo_regimen}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., AC-T"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Toxicities</label>
                                        <input
                                            type="text"
                                            name="chemo_toxicities"
                                            value={formData.chemo_toxicities}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., Neuropathy, Nausea"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Notes</label>
                                        <textarea
                                            name="chemo_notes"
                                            value={formData.chemo_notes}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={1}
                                            placeholder="Chemotherapy notes..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hormonal & HER2 */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Pill className="h-3.5 w-3.5" />
                                    Hormonal & HER2 Therapy
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Hormonal Type</label>
                                        <select
                                            name="hormonal_type"
                                            value={formData.hormonal_type}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="">Select type</option>
                                            <option value="Tamoxifen">Tamoxifen</option>
                                            <option value="Anastrozole">Anastrozole</option>
                                            <option value="Letrozole">Letrozole</option>
                                            <option value="Exemestane">Exemestane</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Duration</label>
                                        <input
                                            type="text"
                                            name="hormonal_duration"
                                            value={formData.hormonal_duration}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., 5 years"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">HER2 Agent</label>
                                        <select
                                            name="her2_agent"
                                            value={formData.her2_agent}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="">Select agent</option>
                                            <option value="Trastuzumab">Trastuzumab</option>
                                            <option value="Pertuzumab">Pertuzumab</option>
                                            <option value="Ado-trastuzumab">Ado-trastuzumab</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">HER2 Cycles</label>
                                        <input
                                            type="number"
                                            name="her2_cycles"
                                            value={formData.her2_cycles}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Number of cycles"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Targeted Therapy</label>
                                        <input
                                            type="text"
                                            name="targeted_therapy"
                                            value={formData.targeted_therapy}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Other targeted therapies"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Treatment Plan */}
                            <div>
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5" />
                                    Treatment Plan Overview
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Treatment Plan</label>
                                        <textarea
                                            name="treatment_plan"
                                            value={formData.treatment_plan}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={2}
                                            placeholder="Comprehensive treatment plan..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Oncologist</label>
                                            <input
                                                type="text"
                                                name="oncologist"
                                                value={formData.oncologist}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                                placeholder="Oncologist name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Notes</label>
                                            <input
                                                type="text"
                                                name="treatment_notes"
                                                value={formData.treatment_notes}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                                placeholder="Additional treatment notes"
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                            Save Treatment
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

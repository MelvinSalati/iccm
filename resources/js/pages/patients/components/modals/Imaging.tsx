// pages/breast-cancer/components/ImagingModal.tsx

import React, { useState, useEffect } from 'react';
import {
    X,
    Camera,
    Save,
    AlertCircle,
    Calendar,
    Image as ImageIcon,
    Scan,
    Activity,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

interface ImagingModalProps {
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
    imaging_notes: string;
    radiologist: string;
}

export default function ImagingModal({
                                         isOpen = false,
                                         onClose,
                                         onSuccess,
                                         patientId,
                                         patientUuid,
                                         screeningId,
                                         userId,
                                         editingData,
                                     }: ImagingModalProps) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        patient_id: patientId || '',
        screening_id: screeningId || null,
        mammogram_date: '',
        mammogram_laterality: 'Right',
        mammogram_tumour_size: '',
        mammogram_birads: '1',
        mammogram_findings: '',
        ultrasound_date: '',
        ultrasound_laterality: 'Right',
        ultrasound_tumour_size: '',
        ultrasound_birads: '1',
        ultrasound_findings: '',
        mri_date: '',
        mri_laterality: 'Right',
        mri_findings: '',
        ct_scan: false,
        ct_scan_date: '',
        ct_scan_findings: '',
        bone_scan: false,
        bone_scan_date: '',
        bone_scan_findings: '',
        pet_scan: false,
        pet_scan_date: '',
        pet_scan_findings: '',
        imaging_notes: '',
        radiologist: '',
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
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
                ? `${basePath}/imaging/${editingData.id}`
                : `${basePath}/imaging`;
            const method = editingData ? 'put' : 'post';

            const response = await Http[method](endpoint, {
                ...formData,
                user_id: userId,
            });

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Imaging saved successfully');
                onSuccess(response.data.data);
                onClose();
            }
        } catch (error: any) {
            console.error('Submit error:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save imaging');
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
                                <Camera className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {editingData ? 'Edit' : 'New'} Imaging Study
                                </h3>
                                <p className="text-xs text-slate-500">Radiology and imaging studies</p>
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
                            {/* Mammogram */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <ImageIcon className="h-3.5 w-3.5" />
                                    Mammogram
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date</label>
                                        <input
                                            type="date"
                                            name="mammogram_date"
                                            value={formData.mammogram_date}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Laterality</label>
                                        <select
                                            name="mammogram_laterality"
                                            value={formData.mammogram_laterality}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Right">Right</option>
                                            <option value="Left">Left</option>
                                            <option value="Bilateral">Bilateral</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Tumour Size</label>
                                        <input
                                            type="text"
                                            name="mammogram_tumour_size"
                                            value={formData.mammogram_tumour_size}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., 2.5 cm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">BIRADS</label>
                                        <select
                                            name="mammogram_birads"
                                            value={formData.mammogram_birads}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="0">0 - Incomplete</option>
                                            <option value="1">1 - Negative</option>
                                            <option value="2">2 - Benign</option>
                                            <option value="3">3 - Probably Benign</option>
                                            <option value="4">4 - Suspicious</option>
                                            <option value="5">5 - Highly Suggestive</option>
                                            <option value="6">6 - Known Biopsy</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Findings</label>
                                        <textarea
                                            name="mammogram_findings"
                                            value={formData.mammogram_findings}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={2}
                                            placeholder="Mammogram findings..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Ultrasound */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Scan className="h-3.5 w-3.5" />
                                    Ultrasound
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date</label>
                                        <input
                                            type="date"
                                            name="ultrasound_date"
                                            value={formData.ultrasound_date}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Laterality</label>
                                        <select
                                            name="ultrasound_laterality"
                                            value={formData.ultrasound_laterality}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Right">Right</option>
                                            <option value="Left">Left</option>
                                            <option value="Bilateral">Bilateral</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Tumour Size</label>
                                        <input
                                            type="text"
                                            name="ultrasound_tumour_size"
                                            value={formData.ultrasound_tumour_size}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="e.g., 2.5 cm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">BIRADS</label>
                                        <select
                                            name="ultrasound_birads"
                                            value={formData.ultrasound_birads}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="0">0 - Incomplete</option>
                                            <option value="1">1 - Negative</option>
                                            <option value="2">2 - Benign</option>
                                            <option value="3">3 - Probably Benign</option>
                                            <option value="4">4 - Suspicious</option>
                                            <option value="5">5 - Highly Suggestive</option>
                                            <option value="6">6 - Known Biopsy</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Findings</label>
                                        <textarea
                                            name="ultrasound_findings"
                                            value={formData.ultrasound_findings}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={2}
                                            placeholder="Ultrasound findings..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* MRI */}
                            <div className="border-b border-slate-200 pb-4 mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Activity className="h-3.5 w-3.5" />
                                    MRI
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date</label>
                                        <input
                                            type="date"
                                            name="mri_date"
                                            value={formData.mri_date}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Laterality</label>
                                        <select
                                            name="mri_laterality"
                                            value={formData.mri_laterality}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                        >
                                            <option value="Right">Right</option>
                                            <option value="Left">Left</option>
                                            <option value="Bilateral">Bilateral</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-medium text-slate-700">Findings</label>
                                        <textarea
                                            name="mri_findings"
                                            value={formData.mri_findings}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            rows={2}
                                            placeholder="MRI findings..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Other Scans */}
                            <div className="mb-4">
                                <h4 className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <Scan className="h-3.5 w-3.5" />
                                    Other Scans
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: 'CT Scan', key: 'ct_scan', dateKey: 'ct_scan_date', findingsKey: 'ct_scan_findings' },
                                        { label: 'Bone Scan', key: 'bone_scan', dateKey: 'bone_scan_date', findingsKey: 'bone_scan_findings' },
                                        { label: 'PET Scan', key: 'pet_scan', dateKey: 'pet_scan_date', findingsKey: 'pet_scan_findings' },
                                    ].map((scan) => (
                                        <div key={scan.key} className="border border-slate-200 rounded-md p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input
                                                    type="checkbox"
                                                    name={scan.key}
                                                    checked={formData[scan.key as keyof FormData] as boolean}
                                                    onChange={handleInputChange}
                                                    className="rounded border-slate-300 text-slate-600 focus:ring-slate-400 h-4 w-4"
                                                />
                                                <label className="text-xs font-medium text-slate-700">{scan.label}</label>
                                            </div>
                                            {formData[scan.key as keyof FormData] && (
                                                <>
                                                    <input
                                                        type="date"
                                                        name={scan.dateKey}
                                                        value={formData[scan.dateKey as keyof FormData] as string}
                                                        onChange={handleInputChange}
                                                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 mb-2"
                                                    />
                                                    <textarea
                                                        name={scan.findingsKey}
                                                        value={formData[scan.findingsKey as keyof FormData] as string}
                                                        onChange={handleInputChange}
                                                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                                        rows={2}
                                                        placeholder="Findings"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Radiologist</label>
                                        <input
                                            type="text"
                                            name="radiologist"
                                            value={formData.radiologist}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Radiologist name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Notes</label>
                                        <input
                                            type="text"
                                            name="imaging_notes"
                                            value={formData.imaging_notes}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                                            placeholder="Additional imaging notes"
                                        />
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
                                            Save Imaging
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

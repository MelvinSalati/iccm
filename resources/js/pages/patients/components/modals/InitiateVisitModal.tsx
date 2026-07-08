// components/InitiateVisitModal.tsx

import React, { useState, useEffect } from 'react';
import { X, Activity, User, ArrowRight } from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

interface InitiateVisitModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    patientData: any;
    userId: string;
    onVisitCreated: (visitUuid: string) => void;
}

interface VisitFormData {
    visit_type: string;
    reason_for_visit: string;
    location_type: 'facility' | 'outreach' | 'home_visit';
    facility: string;
    outreach_location: string;
    department: string;
    priority: 'routine' | 'urgent' | 'emergency' | 'critical';
    is_referral: boolean;
    referral_source: string;
    referral_reason: string;
    visit_mode: 'physical' | 'virtual' | 'hybrid';
}

export const InitiateVisitModal: React.FC<InitiateVisitModalProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          patientId,
                                                                          patientData,
                                                                          userId,
                                                                          onVisitCreated,
                                                                      }) => {
    const [formData, setFormData] = useState<VisitFormData>({
        visit_type: 'cervical_cancer_screening',
        reason_for_visit: '',
        location_type: 'facility',
        facility: '',
        outreach_location: '',
        department: 'gynecology',
        priority: 'routine',
        is_referral: false,
        referral_source: '',
        referral_reason: '',
        visit_mode: 'physical',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showReferralFields, setShowReferralFields] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                visit_type: 'cervical_cancer_screening',
                reason_for_visit: '',
                location_type: 'facility',
                facility: '',
                outreach_location: '',
                department: 'gynecology',
                priority: 'routine',
                is_referral: false,
                referral_source: '',
                referral_reason: '',
                visit_mode: 'physical',
            });
            setErrors({});
            setShowReferralFields(false);
        }
    }, [isOpen]);

    const visitTypes = [
        { value: 'cervical_cancer_screening', label: 'Cervical Cancer Screening' },
        { value: 'colposcopy', label: 'Colposcopy' },
        { value: 'biopsy', label: 'Biopsy' },
        { value: 'hpv_testing', label: 'HPV Testing' },
        { value: 'pap_smear', label: 'Pap Smear' },
        { value: 'treatment', label: 'Treatment' },
        { value: 'follow_up', label: 'Follow-up' },
        { value: 'post_treatment_surveillance', label: 'Post-Treatment Surveillance' },
        { value: 'palliative_care', label: 'Palliative Care' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'radiation_therapy', label: 'Radiation Therapy' },
        { value: 'chemotherapy', label: 'Chemotherapy' },
        { value: 'surgery', label: 'Surgery' },
        { value: 'pre_treatment_assessment', label: 'Pre-Treatment Assessment' },
        { value: 'counseling', label: 'Counseling' },
        { value: 'health_education', label: 'Health Education' },
        { value: 'community_outreach', label: 'Community Outreach' },
        { value: 'teleconsultation', label: 'Teleconsultation' },
        { value: 'home_based_care', label: 'Home-Based Care' },
    ];

    const departments = [
        { value: 'gynecology', label: 'Gynecology' },
        { value: 'oncology', label: 'Oncology' },
        { value: 'radiation_oncology', label: 'Radiation Oncology' },
        { value: 'surgical_oncology', label: 'Surgical Oncology' },
        { value: 'palliative_care', label: 'Palliative Care' },
        { value: 'community_health', label: 'Community Health' },
    ];

    const priorities = [
        { value: 'routine', label: 'Routine', color: 'bg-sky-50 text-sky-700 ring-sky-200' },
        { value: 'urgent', label: 'Urgent', color: 'bg-amber-50 text-amber-700 ring-amber-200' },
        { value: 'emergency', label: 'Emergency', color: 'bg-orange-50 text-orange-700 ring-orange-200' },
        { value: 'critical', label: 'Critical', color: 'bg-rose-50 text-rose-700 ring-rose-200' },
    ];

    const handleInputChange = (field: keyof VisitFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.visit_type) {
            newErrors.visit_type = 'Visit type is required';
        }
        if (!formData.reason_for_visit || formData.reason_for_visit.trim().length < 5) {
            newErrors.reason_for_visit = 'Please provide a valid reason for visit (min 5 characters)';
        }
        if (!formData.facility && formData.location_type === 'facility') {
            newErrors.facility = 'Facility is required';
        }
        if (!formData.outreach_location && formData.location_type === 'outreach') {
            newErrors.outreach_location = 'Outreach location is required';
        }
        if (formData.is_referral && !formData.referral_source) {
            newErrors.referral_source = 'Referral source is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const payload = {
                patient_id: patientId,
                created_by: userId,
                visit_type: formData.visit_type,
                visit_mode: formData.visit_mode,
                presenting_complaint: formData.reason_for_visit,
                priority: formData.priority,
                facility: formData.location_type === 'facility' ? formData.facility : formData.outreach_location,
                department: formData.department,
                is_referral: formData.is_referral,
                referral_source: formData.is_referral ? formData.referral_source : null,
                referral_reason: formData.is_referral ? formData.referral_reason : null,
                visit_status: 'checked_in',
                check_in_time: new Date().toISOString(),
                metadata: {
                    location_type: formData.location_type,
                    initiated_by: userId,
                    initiated_at: new Date().toISOString(),
                },
            };

            const response = await Http.post(`/patients/${patientId}/visit`, payload);
console.log(response)
            if (response.status===201) {

                Notiflix.Notify.success(response.data.message)
                const visitUuid = response.data.data.id;
                onVisitCreated(visitUuid);
                onClose();

                // Show success message or trigger navigation
                // The parent component will handle navigation
            } else {
                Notiflix.Notify.warning(response.data.message)

                onClose();
            }
        } catch (error: any) {
            console.error('Error initiating visit:', error);
            setErrors({
                submit: error.response?.data?.message || 'Failed to initiate visit. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
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
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            <Activity className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">Initiate patient visit</h3>
                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                <User className="h-3 w-3" />
                                <span>{patientData?.first_name} {patientData?.last_name}</span>
                                {patientData?.patient_number && (
                                    <>
                                        <span className="text-slate-300">·</span>
                                        <span>ID {patientData.patient_number}</span>
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
                    {errors.submit && (
                        <div className="mb-3.5 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700 ring-1 ring-inset ring-rose-200">
                            {errors.submit}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-3.5">
                            {/* Visit Type */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Visit type *
                                </label>
                                <select
                                    value={formData.visit_type}
                                    onChange={(e) => handleInputChange('visit_type', e.target.value)}
                                    className={`mt-1 w-full rounded-md border ${errors.visit_type ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                >
                                    {visitTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.visit_type && (
                                    <p className="mt-1 text-[11px] text-rose-500">{errors.visit_type}</p>
                                )}
                            </div>

                            {/* Reason for Visit */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Reason for visit *
                                </label>
                                <textarea
                                    value={formData.reason_for_visit}
                                    onChange={(e) => handleInputChange('reason_for_visit', e.target.value)}
                                    rows={2}
                                    className={`mt-1 w-full rounded-md border ${errors.reason_for_visit ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    placeholder="e.g., Routine cervical cancer screening, abnormal bleeding"
                                />
                                {errors.reason_for_visit && (
                                    <p className="mt-1 text-[11px] text-rose-500">{errors.reason_for_visit}</p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Department
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    {departments.map((dept) => (
                                        <option key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Visit Mode */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Visit mode
                                </label>
                                <div className="mt-1 grid grid-cols-3 gap-1.5">
                                    {['physical', 'virtual', 'hybrid'].map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => handleInputChange('visit_mode', mode)}
                                            className={`rounded-md border px-2.5 py-1.5 text-xs capitalize transition-colors ${
                                                formData.visit_mode === mode
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3.5">
                            {/* Location Type */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Location type
                                </label>
                                <div className="mt-1 grid grid-cols-3 gap-1.5">
                                    {[
                                        { value: 'facility', label: 'Facility' },
                                        { value: 'outreach', label: 'Outreach' },
                                        { value: 'home_visit', label: 'Home visit' },
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => handleInputChange('location_type', type.value as any)}
                                            className={`rounded-md border px-2 py-1.5 text-xs transition-colors ${
                                                formData.location_type === type.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Facility / Location */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    {formData.location_type === 'facility' ? 'Facility *' :
                                        formData.location_type === 'outreach' ? 'Outreach location *' :
                                            'Home visit address'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.location_type === 'facility' ? formData.facility :
                                        formData.location_type === 'outreach' ? formData.outreach_location : ''}
                                    onChange={(e) => {
                                        if (formData.location_type === 'facility') {
                                            handleInputChange('facility', e.target.value);
                                        } else if (formData.location_type === 'outreach') {
                                            handleInputChange('outreach_location', e.target.value);
                                        }
                                    }}
                                    className={`mt-1 w-full rounded-md border ${errors.facility || errors.outreach_location ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    placeholder={formData.location_type === 'facility' ? 'e.g., Central Hospital' :
                                        formData.location_type === 'outreach' ? 'e.g., Rural Health Center - Village A' :
                                            'e.g., 123 Main St, Village B'}
                                />
                                {(errors.facility || errors.outreach_location) && (
                                    <p className="mt-1 text-[11px] text-rose-500">
                                        {errors.facility || errors.outreach_location}
                                    </p>
                                )}
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Priority
                                </label>
                                <div className="mt-1 grid grid-cols-2 gap-1.5">
                                    {priorities.map((priority) => (
                                        <button
                                            key={priority.value}
                                            type="button"
                                            onClick={() => handleInputChange('priority', priority.value)}
                                            className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                                                formData.priority === priority.value
                                                    ? `${priority.color} border-current ring-1 ring-inset`
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {priority.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Referral Toggle */}
                            <div>
                                <label className="flex items-center gap-2 text-xs text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_referral}
                                        onChange={(e) => {
                                            handleInputChange('is_referral', e.target.checked);
                                            setShowReferralFields(e.target.checked);
                                            if (!e.target.checked) {
                                                handleInputChange('referral_source', '');
                                                handleInputChange('referral_reason', '');
                                            }
                                        }}
                                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    This is a referral visit
                                </label>
                            </div>

                            {/* Referral Fields (Conditional) */}
                            {formData.is_referral && (
                                <div className="space-y-2.5 rounded-md bg-slate-50 p-3">
                                    <div>
                                        <label className="text-[11px] font-medium text-slate-500">
                                            Referral source *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.referral_source}
                                            onChange={(e) => handleInputChange('referral_source', e.target.value)}
                                            className={`mt-1 w-full rounded-md border ${errors.referral_source ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            placeholder="e.g., Rural Health Center, Dr. Smith"
                                        />
                                        {errors.referral_source && (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.referral_source}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-medium text-slate-500">
                                            Referral reason
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.referral_reason}
                                            onChange={(e) => handleInputChange('referral_reason', e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="e.g., Suspicious lesion on VIA"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                    <div className="text-xs text-slate-500">
                        <span className="font-medium text-slate-700">Patient:</span> {patientData?.first_name} {patientData?.last_name}
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span className="font-medium text-slate-700">ID:</span> {patientData?.patient_number || 'N/A'}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Initiating…
                                </>
                            ) : (
                                <>
                                    Initiate visit
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// pages/patients/components/modals/IntegratedScreeningForm.tsx
import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Upload } from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import { usePage } from '@inertiajs/react';

interface IntegratedScreeningFormProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    visitId: string;
    userId: string;
    onSuccess?: (data: any) => void;
}

interface FormField {
    id: string;
    label: string;
    type: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    validation?: { [key: string]: any };
    description?: string;
    placeholder?: string;
    default?: any;
    condition?: string;
    colSpan?: 1 | 2;
}

interface Section {
    category: string;
    fields: FormField[];
}

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    facility_id: number;
    [key: string]: any;
}

const FORM_SCHEMA: Section[] = [
    {
        category: "Cervical Screening Core",
        fields: [
            {
                id: "screening_date",
                label: "Screening Date",
                type: "date",
                required: true,
                validation: { max: "current_date" },
                colSpan: 1
            },
            {
                id: "screening_method",
                label: "Screening Method",
                type: "select_one",
                required: true,
                options: [
                    { value: "via", label: "VIA" },
                    { value: "hpv_test", label: "HPV Test" },
                    { value: "cytology", label: "Cytology" }
                ],
                colSpan: 1
            },
            {
                id: "screening_result",
                label: "Results",
                type: "select_one",
                required: true,
                options: [
                    { value: "negative", label: "Negative" },
                    { value: "via_positive", label: "VIA Positive" },
                    { value: "hpv_positive", label: "HPV Positive" },
                    { value: "suspicious_cancer", label: "Suspicious Cancer" }
                ],
                colSpan: 1
            },
            {
                id: "treatment_decision",
                label: "Treatment Decision",
                type: "select_one",
                required: true,
                options: [
                    { value: "thermal_ablation", label: "Thermal Ablation" },
                    { value: "leep", label: "LEEP" },
                    { value: "referral", label: "Referral to Tertiary Hospital" },
                    { value: "observation", label: "Observation" }
                ],
                colSpan: 1
            },
            {
                id: "cervical_image",
                label: "Cervical Image",
                type: "image_upload",
                required: false,
                condition: "screening_result == 'via_positive' || screening_result == 'suspicious_cancer' || screening_result == 'hpv_positive'",
                description: "Upload cervical image for consultation",
                colSpan: 1
            },
            {
                id: "consultant_id",
                label: "Select Consultant",
                type: "consultant_select",
                required: false,
                condition: "screening_result == 'via_positive' || screening_result == 'suspicious_cancer' || screening_result == 'hpv_positive'",
                description: "Select a consultant for review",
                colSpan: 1
            }
        ]
    },
    {
        category: "NCD Linkage",
        fields: [
            {
                id: "ncd_status_flag",
                label: "Pre-existing NCD Linkage Status",
                type: "read_only_badge",
                description: "Pulled automatically via API from the active Global Vitals/NCD triage form history.",
                colSpan: 2
            },
            {
                id: "integrated_chronic_care_notes",
                label: "Integrated Care Notes",
                type: "text_area",
                required: false,
                placeholder: "Document clinical alignment if cervical lesions intersect with existing NCD medication management...",
                colSpan: 2
            }
        ]
    },
    {
        category: "Psychosocial & Mental Health",
        fields: [
            {
                id: "distress_thermometer",
                label: "Distress Thermometer Score (0-10)",
                type: "slider",
                required: true,
                validation: { min: 0, max: 10 },
                description: "Rapid emotional triage tool",
                colSpan: 1
            },
            {
                id: "anxiety_gad7_score",
                label: "Anxiety Screening Score (GAD-7)",
                type: "integer",
                required: false,
                condition: "screening_result && screening_result != 'negative' || distress_thermometer >= 4",
                description: "Triggers if positive cancer risk or distress ≥ 4",
                colSpan: 1
            },
            {
                id: "depression_phq9_score",
                label: "Depression Screening Score (PHQ-9)",
                type: "integer",
                required: false,
                condition: "screening_result && screening_result != 'negative' || distress_thermometer >= 4",
                colSpan: 1
            },
            {
                id: "mental_health_services",
                label: "Immediate Mental Health Action",
                type: "select_multiple",
                options: [
                    { value: "individual_counsel", label: "Individual On-site Counselling" },
                    { value: "family_support", label: "Family Counselling Session" },
                    { value: "survivor_linkage", label: "Linkage to Cancer Survivor Group" },
                    { value: "specialized_ref", label: "Referred to District Psychiatric/Mental Health Unit" }
                ],
                condition: "(anxiety_gad7_score >= 10 || depression_phq9_score >= 10 || distress_thermometer >= 7) && anxiety_gad7_score != null && depression_phq9_score != null",
                colSpan: 2
            }
        ]
    },
    {
        category: "Continuity of Care",
        fields: [
            {
                id: "follow_up_date",
                label: "Next Integrated Review Appointment",
                type: "date",
                required: true,
                colSpan: 1
            },
            {
                id: "sms_reminder_sent",
                label: "Send Unified SMS Alert",
                type: "toggle",
                default: true,
                colSpan: 1
            }
        ]
    }
];

const TAB_ICONS: { [key: string]: string } = {
    'Cervical Screening Core': '🔬',
    'NCD Linkage': '📋',
    'Psychosocial & Mental Health': '🧠',
    'Continuity of Care': '📅'
};

const IntegratedScreeningForm: React.FC<IntegratedScreeningFormProps> = ({
                                                                             isOpen,
                                                                             onClose,
                                                                             patientId,
                                                                             visitId,
                                                                             userId,
                                                                             onSuccess,
                                                                         }) => {
    const { props } = usePage();
    const { auth, sharedData } = props as any;

    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [ncdStatus, setNcdStatus] = useState<string>('Loading NCD status...');
    const [loadingNcd, setLoadingNcd] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const users = sharedData?.users || [];
    const consultantUsers = users.filter((user: User) => {
        return user.role_id === 3 || user.role_id === 2;
    });

    useEffect(() => {
        if (isOpen) {
            const initialData: { [key: string]: any } = {};
            FORM_SCHEMA.forEach(section => {
                section.fields.forEach(field => {
                    if (field.type === 'toggle') {
                        initialData[field.id] = field.default ?? true;
                    } else if (field.type === 'date' && field.id === 'screening_date') {
                        initialData[field.id] = new Date().toISOString().split('T')[0];
                    } else if (field.type === 'slider') {
                        initialData[field.id] = 0;
                    } else {
                        initialData[field.id] = field.default || '';
                    }
                });
            });
            setFormData(initialData);
            setErrors({});
            setSelectedImage(null);
            setImagePreview(null);
            fetchNcdStatus();
        }
    }, [isOpen]);

    const fetchNcdStatus = async () => {
        if (!patientId) return;
        setLoadingNcd(true);
        try {
            const response = await Http.get(`/patients/${patientId}/ncd-status`);
            setNcdStatus(response.data.status || 'No NCD records found');
        } catch (error) {
            console.error('Error fetching NCD status:', error);
            setNcdStatus('Unable to retrieve NCD status');
        } finally {
            setLoadingNcd(false);
        }
    };

    const evaluateCondition = (condition: string | undefined, data: { [key: string]: any }): boolean => {
        if (!condition) return true;

        try {
            const context = { ...data };
            const keys = Object.keys(context);
            const values = Object.values(context);
            const func = new Function(...keys, `try { return !!( ${condition} ); } catch(e) { return false; }`);
            return func(...values);
        } catch (error) {
            console.warn('Error evaluating condition:', condition, error);
            return false;
        }
    };

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
        if (errors[fieldId]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                Notiflix.Notify.warning('Please upload a valid image file (JPEG, PNG, WEBP, GIF)');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                Notiflix.Notify.warning('Image size should be less than 5MB');
                return;
            }

            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            handleInputChange('cervical_image', file.name);
        }
    };

    const validateField = (field: FormField, value: any): string | null => {
        if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
            return `${field.label} is required`;
        }

        if (field.validation) {
            if (field.validation.min !== undefined && Number(value) < field.validation.min) {
                return `${field.label} must be at least ${field.validation.min}`;
            }
            if (field.validation.max !== undefined && Number(value) > field.validation.max) {
                return `${field.label} must be at most ${field.validation.max}`;
            }
            if (field.validation.max === 'current_date' && new Date(value) > new Date()) {
                return `${field.label} cannot be in the future`;
            }
        }

        return null;
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        FORM_SCHEMA.forEach(section => {
            section.fields.forEach(field => {
                if (field.condition && !evaluateCondition(field.condition, formData)) {
                    return;
                }
                if (field.type === 'read_only_badge') return;

                const value = formData[field.id];
                const error = validateField(field, value);
                if (error) {
                    newErrors[field.id] = error;
                }
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Notiflix.Notify.warning('Please fix all validation errors');
            return;
        }

        setLoading(true);
        try {
            const result = formData.screening_result;
            const isPositive = result === 'via_positive' || result === 'suspicious_cancer' || result === 'hpv_positive';

            // ✅ Use a different name for the FormData instance
            const payload = new FormData();

            // Add all form fields as JSON
            payload.append('data', JSON.stringify({
                ...formData,
                cervical_image_url: null,
            }));
            payload.append('form_id', 'form_3_integrated_cervical_screening_optimized');
            payload.append('form_version', '3.0.0');
            payload.append('created_by', auth.user.id);

            // Attach image if selected and result is positive/suspicious
            if (selectedImage && isPositive) {
                payload.append('image', selectedImage);
            }

            const response = await Http.post(
                `/patients/${patientId}/visit/${visitId}/screening/integrated`,
                payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success(response.data.message || 'Screening form submitted successfully');
                if (onSuccess) {
                    onSuccess(response.data.data);
                }
                onClose();
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            Notiflix.Notify.failure(
                error.response?.data?.message || 'Failed to submit screening form. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };
    const renderField = (field: FormField) => {
        const value = formData[field.id] ?? '';
        const error = errors[field.id];
        const isVisible = !field.condition || evaluateCondition(field.condition, formData);

        if (!isVisible) return null;

        switch (field.type) {
            case 'date':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                            type="date"
                            value={value}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                            max={field.validation?.max === 'current_date' ? new Date().toISOString().split('T')[0] : undefined}
                        />
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'select_one':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <select
                            value={value}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                            <option value="">Select...</option>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'consultant_select':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <select
                            value={value}
                            onChange={(e) => handleInputChange(field.id, parseInt(e.target.value) || '')}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                            <option value="">Select Consultant...</option>
                            {consultantUsers.map((user: User) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} - {user.role_id === 3 ? 'Clinician' : 'Nurse'}
                                </option>
                            ))}
                        </select>
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                        {consultantUsers.length === 0 && (
                            <p className="mt-1 text-xs text-amber-600">No consultants available. Please add clinicians to the system.</p>
                        )}
                    </div>
                );

            case 'image_upload':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <div className="mt-1">
                            <div className="flex items-center gap-3">
                                <label className={`flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload className="h-4 w-4 text-slate-500" />
                                    <span>{loading ? 'Uploading...' : 'Choose Image'}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={loading}
                                    />
                                </label>
                                {selectedImage && (
                                    <span className="text-sm text-slate-600 truncate max-w-[150px]">
                                        {selectedImage.name}
                                    </span>
                                )}
                            </div>
                            {imagePreview && (
                                <div className="mt-2 relative inline-block">
                                    <img
                                        // src={}
                                        alt="Cervical"
                                        className="max-h-32 rounded-md border border-slate-200 object-cover"
                                    />
                                    <button
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImagePreview(null);
                                            handleInputChange('cervical_image', '');
                                        }}
                                        className="absolute top-1 right-1 rounded-full bg-slate-900/70 p-1 text-white hover:bg-slate-900"
                                        disabled={loading}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'select_multiple':
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">{field.label}</label>
                        <div className="mt-1 space-y-1.5 rounded-md border border-slate-200 p-2">
                            {field.options?.map((option) => (
                                <label key={option.value} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option.value)}
                                        onChange={(e) => {
                                            const currentValues = Array.isArray(value) ? value : [];
                                            if (e.target.checked) {
                                                handleInputChange(field.id, [...currentValues, option.value]);
                                            } else {
                                                handleInputChange(field.id, currentValues.filter(v => v !== option.value));
                                            }
                                        }}
                                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'integer':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => handleInputChange(field.id, parseInt(e.target.value) || 0)}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                            min={field.validation?.min}
                            max={field.validation?.max}
                        />
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'slider':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <div className="mt-1 flex items-center gap-3">
                            <input
                                type="range"
                                value={value || 0}
                                onChange={(e) => handleInputChange(field.id, parseInt(e.target.value))}
                                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                min={field.validation?.min || 0}
                                max={field.validation?.max || 10}
                                step={1}
                            />
                            <span className="min-w-[2.5rem] text-sm font-medium text-slate-700">
                                {value || 0}
                            </span>
                        </div>
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'text_area':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        <textarea
                            value={value}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            rows={3}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                            placeholder={field.placeholder}
                        />
                        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'toggle':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                checked={!!value}
                                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            {field.label}
                        </label>
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            case 'read_only_badge':
                return (
                    <div className="w-full rounded-md bg-slate-50 p-3 ring-1 ring-slate-200" key={field.id}>
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-700">{field.label}</p>
                                {loadingNcd ? (
                                    <p className="text-sm text-slate-400">Loading...</p>
                                ) : (
                                    <p className="text-sm text-slate-600">{ncdStatus}</p>
                                )}
                            </div>
                        </div>
                        {field.description && (
                            <p className="mt-1 text-xs text-slate-400">{field.description}</p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    const getTabValidationStatus = (sectionIndex: number): 'valid' | 'invalid' | 'untouched' => {
        const section = FORM_SCHEMA[sectionIndex];
        let hasErrors = false;
        let hasRequiredFields = false;

        for (const field of section.fields) {
            if (field.type === 'read_only_badge') continue;
            if (field.condition && !evaluateCondition(field.condition, formData)) continue;

            const value = formData[field.id];
            const error = validateField(field, value);

            if (field.required) {
                hasRequiredFields = true;
                if (error) {
                    hasErrors = true;
                    break;
                }
            }
        }

        if (hasErrors) return 'invalid';
        if (hasRequiredFields) return 'valid';
        return 'untouched';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Form 3: Integrated Cervical & Mental Health Screening
                        </h3>
                        <p className="text-xs text-slate-500">Version 3.0.0</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 bg-slate-50/80 px-4 sticky top-[57px] z-10">
                    <div className="flex space-x-1 overflow-x-auto">
                        {FORM_SCHEMA.map((section, index) => {
                            const status = getTabValidationStatus(index);
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all whitespace-nowrap border-b-2 ${
                                        activeTab === index
                                            ? 'border-blue-500 text-blue-700 bg-blue-50/50'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                    }`}
                                >
                                    <span>{TAB_ICONS[section.category] || '📄'}</span>
                                    <span>{section.category}</span>
                                    {status === 'valid' && (
                                        <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" title="All required fields filled" />
                                    )}
                                    {status === 'invalid' && (
                                        <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-rose-500" title="Required fields missing" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    {FORM_SCHEMA.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={sectionIndex === activeTab ? 'block' : 'hidden'}>
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">
                                    {section.category}
                                </h4>

                                {/* Two columns for first tab only */}
                                {sectionIndex === 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.fields.map((field) => {
                                            const isVisible = !field.condition || evaluateCondition(field.condition, formData);
                                            if (!isVisible) return null;

                                            return (
                                                <div
                                                    key={field.id}
                                                    className={field.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
                                                >
                                                    {renderField(field)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {section.fields.map((field) => {
                                            const isVisible = !field.condition || evaluateCondition(field.condition, formData);
                                            if (!isVisible) return null;

                                            return (
                                                <div key={field.id}>
                                                    {renderField(field)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between sticky bottom-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Step {activeTab + 1} of {FORM_SCHEMA.length}</span>
                        <span className="text-slate-300">|</span>
                        <span>Form 3.0.0</span>
                    </div>
                    <div className="flex gap-2">
                        {activeTab > 0 && (
                            <button
                                onClick={() => setActiveTab(activeTab - 1)}
                                className="rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Previous
                            </button>
                        )}
                        {activeTab < FORM_SCHEMA.length - 1 ? (
                            <button
                                onClick={() => setActiveTab(activeTab + 1)}
                                className="rounded-md bg-blue-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        {uploadingImage ? 'Uploading Image...' : 'Submitting...'}
                                    </>
                                ) : (
                                    'Submit Screening'
                                )}
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratedScreeningForm;

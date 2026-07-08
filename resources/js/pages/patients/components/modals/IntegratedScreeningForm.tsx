// pages/patients/components/modals/IntegratedScreeningForm.tsx
import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
}

interface Section {
    category: string;
    fields: FormField[];
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
                validation: { max: "current_date" }
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
                ]
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
                ]
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
                ]
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
                description: "Pulled automatically via API from the active Global Vitals/NCD triage form history."
            },
            {
                id: "integrated_chronic_care_notes",
                label: "Integrated Care Notes",
                type: "text_area",
                required: false,
                placeholder: "Document clinical alignment if cervical lesions intersect with existing NCD medication management..."
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
                description: "Rapid emotional triage tool performed alongside physical examination."
            },
            {
                id: "anxiety_gad7_score",
                label: "Anxiety Screening Score (GAD-7)",
                type: "integer",
                required: false,
                condition: "screening_result != 'negative' || distress_thermometer >= 4",
                description: "Conditionally visible: Triggers if a positive cancer risk is identified or baseline distress is high."
            },
            {
                id: "depression_phq9_score",
                label: "Depression Screening Score (PHQ-9)",
                type: "integer",
                required: false,
                condition: "screening_result != 'negative' || distress_thermometer >= 4"
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
                condition: "anxiety_gad7_score >= 10 || depression_phq9_score >= 10 || distress_thermometer >= 7"
            }
        ]
    },
    {
        category: "Continuity of Care",
        fields: [
            {
                id: "follow_up_date",
                label: "Next Integrated Review Appointment Date",
                type: "date",
                required: true
            },
            {
                id: "sms_reminder_sent",
                label: "Send Unified SMS Alert",
                type: "toggle",
                default: true
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
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [ncdStatus, setNcdStatus] = useState<string>('Loading NCD status...');
    const [loadingNcd, setLoadingNcd] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
const {auth} = usePage().props;
console.log(auth.user.id)
    // Initialize form with default values
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
            fetchNcdStatus();
        }
    }, [isOpen]);

    const fetchNcdStatus = async () => {
        if (!patientId) return;
        setLoadingNcd(true);
        try {
            const response = await Http.get(`/patients/${patientId}/ncd-status`);
            setNcdStatus(response.data.status || 'No NCD records found');
            console.log(response)
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
            const evalFn = new Function(
                ...Object.keys(data),
                `return !!( ${condition} );`
            );
            return evalFn(...Object.values(data));
        } catch (error) {
            console.error('Error evaluating condition:', error);
            return true;
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
            const payload = {
                patient_id: patientId,
                visit_id: visitId,
                created_by: auth.user.id,
                form_id: 'form_3_integrated_cervical_screening_optimized',
                form_version: '3.0.0',
                submitted_at: new Date().toISOString(),
                data: formData,
                metadata: {
                    submitted_by: userId,
                    submission_date: new Date().toISOString(),
                }

            };

            const response = await Http.post(`/patients/${patientId}/visit/${visitId}/screening/integrated`, payload);
            console.log(response)
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
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3" key={field.id}>
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

            case 'select_multiple':
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3" key={field.id}>
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
                    <div className="mb-3 rounded-md bg-slate-50 p-3 ring-1 ring-slate-200" key={field.id}>
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
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white px-5 py-3.5 flex items-center justify-between sticky top-0 z-10">
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
                <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                    {FORM_SCHEMA.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={sectionIndex === activeTab ? 'block' : 'hidden'}>
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                                    {section.category}
                                </h4>
                                {section.fields.map((field) => (
                                    <div key={field.id}>
                                        {renderField(field)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 flex items-center justify-between sticky bottom-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Step {activeTab + 1} of {FORM_SCHEMA.length}</span>
                        <span className="text-slate-300">|</span>
                        <span>Form 3.0.0</span>
                    </div>
                    <div className="flex gap-2">
                        {activeTab > 0 && (
                            <button
                                onClick={() => setActiveTab(activeTab - 1)}
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Previous
                            </button>
                        )}
                        {activeTab < FORM_SCHEMA.length - 1 ? (
                            <button
                                onClick={() => setActiveTab(activeTab + 1)}
                                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Screening'
                                )}
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
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

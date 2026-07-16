// pages/patients/components/modals/IntegratedScreeningForm.tsx
import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Upload, Activity, Heart, Brain, Scale, Weight, Calendar, Stethoscope, Clipboard, Syringe, ChevronLeft, ChevronRight, CheckCircle, Save } from 'lucide-react';
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
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}

interface Section {
    category: string;
    icon?: string;
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
        category: "Cervical Screening",
        icon: "🔬",
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
                colSpan: 1,
                description: "Select the screening result"
            },
            // Treatment Decision - Conditional on positive result
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
                colSpan: 1,
                condition: "screening_result == 'via_positive' || screening_result == 'suspicious_cancer' || screening_result == 'hpv_positive'",
                description: "Select treatment based on positive result"
            },
            // Follow-up only option for negative results
            {
                id: "treatment_decision",
                label: "Treatment Decision",
                type: "read_only_badge",
                colSpan: 1,
                condition: "screening_result == 'negative'",
                description: "No treatment needed for negative result"
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
        category: "NCD Screening",
        icon: "❤️",
        fields: [
            {
                id: "weight_kg",
                label: "Weight (kg)",
                type: "number",
                required: true,
                validation: { min: 10, max: 300 },
                description: "Patient's current weight in kilograms",
                colSpan: 1,
                step: 0.1,
                unit: "kg"
            },
            {
                id: "height_cm",
                label: "Height (cm)",
                type: "number",
                required: true,
                validation: { min: 50, max: 250 },
                description: "Patient's height in centimeters",
                colSpan: 1,
                step: 0.1,
                unit: "cm"
            },
            {
                id: "bmi",
                label: "BMI (Auto-calculated)",
                type: "read_only_badge",
                description: "Body Mass Index calculated from weight and height",
                colSpan: 1
            },
            {
                id: "bmi_category",
                label: "BMI Category",
                type: "read_only_badge",
                description: "Underweight, Normal, Overweight, Obese",
                colSpan: 1
            },
            {
                id: "systolic_bp",
                label: "Systolic BP (mmHg)",
                type: "number",
                required: true,
                validation: { min: 70, max: 250 },
                description: "Systolic blood pressure reading",
                colSpan: 1,
                unit: "mmHg"
            },
            {
                id: "diastolic_bp",
                label: "Diastolic BP (mmHg)",
                type: "number",
                required: true,
                validation: { min: 40, max: 150 },
                description: "Diastolic blood pressure reading",
                colSpan: 1,
                unit: "mmHg"
            },
            {
                id: "bp_category",
                label: "Blood Pressure Category",
                type: "read_only_badge",
                description: "Normal, Elevated, Stage 1, Stage 2 Hypertensive",
                colSpan: 2
            },
            {
                id: "ncd_risk_level",
                label: "NCD Risk Level",
                type: "read_only_badge",
                description: "Low, Moderate, High Risk",
                colSpan: 2
            }
        ]
    },
    {
        category: "Mental Health (PHQ-9 & GAD-7)",
        icon: "🧠",
        fields: [
            {
                id: "phq9_score",
                label: "PHQ-9 Score (Depression)",
                type: "number",
                required: true,
                validation: { min: 0, max: 27 },
                description: "Patient Health Questionnaire-9 score for depression",
                colSpan: 1
            },
            {
                id: "phq9_category",
                label: "Depression Severity",
                type: "read_only_badge",
                colSpan: 1
            },
            {
                id: "gad7_score",
                label: "GAD-7 Score (Anxiety)",
                type: "number",
                required: true,
                validation: { min: 0, max: 21 },
                description: "General Anxiety Disorder-7 score for anxiety",
                colSpan: 1
            },
            {
                id: "gad7_category",
                label: "Anxiety Severity",
                type: "read_only_badge",
                colSpan: 1
            },
            {
                id: "mental_health_risk_level",
                label: "Mental Health Risk Level",
                type: "read_only_badge",
                description: "Low, Moderate, High Risk",
                colSpan: 2
            },
            {
                id: "mental_health_services",
                label: "Recommended Mental Health Actions",
                type: "select_multiple",
                options: [
                    { value: "individual_counsel", label: "Individual On-site Counselling" },
                    { value: "family_support", label: "Family Counselling Session" },
                    { value: "survivor_linkage", label: "Linkage to Cancer Survivor Group" },
                    { value: "specialized_ref", label: "Referred to District Psychiatric/Mental Health Unit" }
                ],
                condition: "(phq9_score >= 10 || gad7_score >= 10)",
                colSpan: 2
            }
        ]
    },
    {
        category: "Continuity of Care",
        icon: "📅",
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

// Helpers for calculations
const calculateBMI = (weightKg: number, heightCm: number): number | null => {
    if (!weightKg || !heightCm || heightCm <= 0) return null;
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
};

const getBMICategory = (bmi: number | null): string => {
    if (!bmi) return 'Not Calculated';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

const getBPCategory = (systolic: number, diastolic: number): string => {
    if (!systolic || !diastolic) return 'Not Measured';
    if (systolic < 120 && diastolic < 80) return 'Normal';
    if (systolic < 130 && diastolic < 80) return 'Elevated';
    if (systolic < 140 || diastolic < 90) return 'Stage 1 Hypertension';
    return 'Stage 2 Hypertension';
};

const getPHQ9Category = (score: number): string => {
    if (!score) return 'Not Assessed';
    if (score <= 4) return 'Minimal Depression';
    if (score <= 9) return 'Mild Depression';
    if (score <= 14) return 'Moderate Depression';
    if (score <= 19) return 'Moderately Severe Depression';
    return 'Severe Depression';
};

const getGAD7Category = (score: number): string => {
    if (!score) return 'Not Assessed';
    if (score <= 4) return 'Minimal Anxiety';
    if (score <= 9) return 'Mild Anxiety';
    if (score <= 14) return 'Moderate Anxiety';
    return 'Severe Anxiety';
};

const getNCDRiskLevel = (bmi: number | null, bpSystolic: number, bpDiastolic: number): string => {
    if (!bmi || !bpSystolic || !bpDiastolic) return 'Not Assessed';

    let riskScore = 0;

    // BMI risk
    if (bmi >= 30) riskScore += 2;
    else if (bmi >= 25) riskScore += 1;

    // BP risk
    if (bpSystolic >= 140 || bpDiastolic >= 90) riskScore += 2;
    else if (bpSystolic >= 130 || bpDiastolic >= 80) riskScore += 1;

    if (riskScore >= 3) return 'High Risk';
    if (riskScore >= 2) return 'Moderate Risk';
    return 'Low Risk';
};

const getMentalHealthRiskLevel = (phq9: number, gad7: number): string => {
    if (!phq9 || !gad7) return 'Not Assessed';

    if (phq9 >= 15 || gad7 >= 15) return 'High Risk';
    if (phq9 >= 10 || gad7 >= 10) return 'Moderate Risk';
    return 'Low Risk';
};

const TAB_ICONS: { [key: string]: string } = {
    'Cervical Screening': '🔬',
    'NCD Screening': '❤️',
    'Mental Health (PHQ-9 & GAD-7)': '🧠',
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
    const [activeTab, setActiveTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const users = sharedData?.users || [];
    const consultantUsers = users.filter((user: User) => {
        return user.role_id === 3 || user.role_id === 2;
    });

    // Get facility_id from auth user
    const facilityId = auth?.user?.facility_id || null;

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
        }
    }, [isOpen]);

    // Auto-calculate derived fields
    useEffect(() => {
        const weight = parseFloat(formData.weight_kg);
        const height = parseFloat(formData.height_cm);
        const systolic = parseFloat(formData.systolic_bp);
        const diastolic = parseFloat(formData.diastolic_bp);
        const phq9 = parseFloat(formData.phq9_score);
        const gad7 = parseFloat(formData.gad7_score);

        // Calculate BMI
        const bmi = calculateBMI(weight, height);
        if (bmi !== null) {
            setFormData(prev => ({
                ...prev,
                bmi: bmi,
                bmi_category: getBMICategory(bmi)
            }));
        }

        // Calculate BP Category
        if (systolic && diastolic) {
            setFormData(prev => ({
                ...prev,
                bp_category: getBPCategory(systolic, diastolic)
            }));
        }

        // Calculate NCD Risk Level
        if (bmi !== null && systolic && diastolic) {
            setFormData(prev => ({
                ...prev,
                ncd_risk_level: getNCDRiskLevel(bmi, systolic, diastolic)
            }));
        }

        // Calculate PHQ-9 Category
        if (phq9 !== null && !isNaN(phq9)) {
            setFormData(prev => ({
                ...prev,
                phq9_category: getPHQ9Category(phq9)
            }));
        }

        // Calculate GAD-7 Category
        if (gad7 !== null && !isNaN(gad7)) {
            setFormData(prev => ({
                ...prev,
                gad7_category: getGAD7Category(gad7)
            }));
        }

        // Calculate Mental Health Risk Level
        if (phq9 !== null && !isNaN(phq9) && gad7 !== null && !isNaN(gad7)) {
            setFormData(prev => ({
                ...prev,
                mental_health_risk_level: getMentalHealthRiskLevel(phq9, gad7)
            }));
        }

    }, [formData.weight_kg, formData.height_cm, formData.systolic_bp, formData.diastolic_bp, formData.phq9_score, formData.gad7_score]);

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
        if (!facilityId) {
            Notiflix.Notify.warning('Facility ID not found. Please ensure you are logged in.');
            return;
        }

        if (!validateForm()) {
            Notiflix.Notify.warning('Please fix all validation errors');
            return;
        }

        setLoading(true);
        try {
            const result = formData.screening_result;
            const isPositive = result === 'via_positive' || result === 'suspicious_cancer' || result === 'hpv_positive';

            const payload = new FormData();

            // Add all form fields with facility_id from auth
            payload.append('data', JSON.stringify({
                ...formData,
                facility_id: facilityId,
                user_id: userId,
                patient_id: patientId,
                visit_id: visitId,
                cervical_image_url: null,
                // NCD fields
                bmi: formData.bmi || null,
                bmi_category: formData.bmi_category || null,
                bp_category: formData.bp_category || null,
                ncd_risk_level: formData.ncd_risk_level || null,
                // Mental Health fields
                phq9_category: formData.phq9_category || null,
                gad7_category: formData.gad7_category || null,
                mental_health_risk_level: formData.mental_health_risk_level || null,
                // Screening result flag
                is_positive: isPositive,
            }));
            payload.append('form_id', 'form_3_integrated_cervical_screening_optimized');
            payload.append('form_version', '3.0.0');
            payload.append('created_by', userId);
            payload.append('facility_id', String(facilityId));

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

            case 'number':
                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                            {field.unit && <span className="ml-1 text-xs text-slate-400">({field.unit})</span>}
                        </label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || '')}
                            className={`mt-1 w-full rounded-md border ${error ? 'border-rose-300' : 'border-slate-200'} bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                            min={field.validation?.min}
                            max={field.validation?.max}
                            step={field.step || 0.1}
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
                                        src={imagePreview}
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

            case 'read_only_badge':
                // Special handling for treatment decision when negative
                if (field.id === 'treatment_decision' && formData.screening_result === 'negative') {
                    return (
                        <div className="w-full" key={field.id}>
                            <label className="text-xs font-medium text-slate-700">Treatment Decision</label>
                            <div className="mt-1 rounded-md bg-emerald-50 p-3 ring-1 ring-emerald-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-emerald-700">
                                        ✅ No Treatment Needed - Negative Result
                                    </span>
                                    <span className="text-xs text-emerald-600">Follow-up recommended</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                const displayValue = field.id === 'bmi' ? (value || '—') :
                    field.id === 'bmi_category' ? (value || 'Not Calculated') :
                        field.id === 'bp_category' ? (value || 'Not Measured') :
                            field.id === 'ncd_risk_level' ? (value || 'Not Assessed') :
                                field.id === 'phq9_category' ? (value || 'Not Assessed') :
                                    field.id === 'gad7_category' ? (value || 'Not Assessed') :
                                        field.id === 'mental_health_risk_level' ? (value || 'Not Assessed') :
                                            value || '—';

                const getBadgeColor = (value: string) => {
                    if (value.includes('High Risk') || value.includes('Severe') || value.includes('Stage 2')) {
                        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
                    }
                    if (value.includes('Moderate') || value.includes('Stage 1') || value.includes('Moderately')) {
                        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
                    }
                    if (value.includes('Normal') || value.includes('Minimal') || value.includes('Low') || value.includes('Not')) {
                        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
                    }
                    return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200';
                };

                return (
                    <div className="w-full" key={field.id}>
                        <label className="text-xs font-medium text-slate-700">{field.label}</label>
                        <div className="mt-1 rounded-md bg-slate-50 p-3 ring-1 ring-slate-200">
                            <div className="flex items-center justify-between">
                                <span className={`text-sm font-medium px-2 py-1 rounded-md ${getBadgeColor(String(displayValue))}`}>
                                    {displayValue}
                                </span>
                                {field.description && (
                                    <span className="text-xs text-slate-400">{field.description}</span>
                                )}
                            </div>
                        </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-[2px]">
            <div className="relative z-10 w-full max-w-4xl max-h-[80vh] h-[80vh] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col">
                {/* Header - Fixed */}
                <div className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Form 3: Integrated Cervical, NCD & Mental Health Screening
                        </h3>
                        <p className="text-xs text-slate-500">Version 3.0.0</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Tabs - Fixed */}
                <div className="border-b border-slate-200 bg-slate-50/80 px-4 flex-shrink-0">
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
                                    disabled={loading}
                                >
                                    <span>{TAB_ICONS[section.category] || '📄'}</span>
                                    <span className="hidden sm:inline">{section.category}</span>
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

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {FORM_SCHEMA.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={sectionIndex === activeTab ? 'block' : 'hidden'}>
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">
                                    {section.category}
                                </h4>

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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer - Fixed with Buttons */}
                <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Step {activeTab + 1} of {FORM_SCHEMA.length}</span>
                        <span className="text-slate-300">|</span>
                        <span>Form 3.0.0</span>
                        {facilityId && (
                            <>
                                <span className="text-slate-300">|</span>
                                <span className="text-xs text-slate-400">Facility: {facilityId}</span>
                            </>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {activeTab > 0 && (
                            <button
                                onClick={() => setActiveTab(activeTab - 1)}
                                disabled={loading}
                                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>
                        )}

                        {activeTab < FORM_SCHEMA.length - 1 ? (
                            <button
                                onClick={() => setActiveTab(activeTab + 1)}
                                disabled={loading}
                                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Submit Screening
                                    </>
                                )}
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratedScreeningForm;

// pages/breast-cancer/components/BreastCancerScreeningModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    User,
    Heart,
    Microscope,
    ClipboardCheck,
    Eye,
    FileText,
    Save,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Activity,
    Scissors,
    Radiation,
    Syringe,
    Pill,
    Camera,
    Users,
    History,
    Shield,
    TrendingUp,
    Search,
    Image as ImageIcon,
    Plus,
} from 'lucide-react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';

interface BreastCancerScreeningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
    patientId?: string;
    visitId?: string;
    userId?: string;
    editingData?: any;
}

interface FormData {
    // Patient Information
    patient_id: string;
    patient_search: string;
    visit_id: string | null;

    // Symptoms
    left_breast_swelling: boolean;
    left_breast_swelling_duration: string;
    right_breast_swelling: boolean;
    right_breast_swelling_duration: string;
    left_axillary_swelling: boolean;
    left_axillary_swelling_duration: string;
    right_axillary_swelling: boolean;
    right_axillary_swelling_duration: string;
    left_bone_pain: boolean;
    left_bone_pain_duration: string;
    right_bone_pain: boolean;
    right_bone_pain_duration: string;
    left_arm_swelling: boolean;
    left_arm_swelling_duration: string;
    right_arm_swelling: boolean;
    right_arm_swelling_duration: string;
    weight_loss: boolean;
    weight_loss_duration: string;
    convulsions: boolean;
    convulsions_duration: string;

    // Biopsy
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

    // Surgery
    surgery_date: string;
    surgery_type: string;

    // Radiotherapy
    radiotherapy_start: string;
    radiotherapy_end: string;
    radiotherapy_dosage: string;
    radiotherapy_boost: string;

    // Chemotherapy
    chemo_neo_start: string;
    chemo_neo_end: string;
    chemo_adjuvant_start: string;
    chemo_adjuvant_end: string;
    chemo_cycles: string;
    chemo_toxicities: string;

    // Hormonal Therapy
    hormonal_type: string;
    hormonal_duration: string;

    // HER2 Therapy
    her2_agent: string;
    her2_cycles: string;

    // Imaging
    mammogram_date: string;
    mammogram_laterality: string;
    mammogram_tumour_size: string;
    mammogram_birads: string;
    ultrasound_date: string;
    ultrasound_laterality: string;
    ultrasound_tumour_size: string;
    ultrasound_birads: string;
    ct_scan: boolean;
    ct_scan_date: string;
    ct_scan_findings: string;
    bone_scan: boolean;
    bone_scan_date: string;
    bone_scan_findings: string;
    pet_scan: boolean;
    pet_scan_date: string;
    pet_scan_findings: string;

    // Reproductive History
    pregnancies: string;
    deliveries: string;
    contraceptive_use: string;
    contraceptive_type: string;
    menopause_status: string;

    // Family History
    family_breast_cancer: boolean;
    family_breast_cancer_relationship: string;
    family_ovarian_cancer: boolean;
    family_ovarian_cancer_relationship: string;
    family_other_cancer: boolean;
    family_other_cancer_details: string;
    brca1: string;
    brca2: string;
    genetic_other: string;

    // Physical Examination
    left_masses: string;
    left_mass_details: string;
    left_peau_dorange: string;
    left_nipple_retraction: string;
    left_discharge: string;
    right_masses: string;
    right_mass_details: string;
    right_peau_dorange: string;
    right_nipple_retraction: string;
    right_discharge: string;
    axillary_nodes: string;
    supraclavicular_nodes: string;
    other_nodes: string;
    ecog: string;
    comorbidities: string;
    other_exam_findings: string;

    // TNM Staging
    t_category: string;
    t_size: string;
    t_details: string;
    n_category: string;
    n_details: string;
    m_category: string;
    m_details: string;
    stage_group: string;

    // Plan
    treatment_plan: string;
    referrals: string;
    follow_up_date: string;
    follow_up_interval: string;
    plan_notes: string;
    recommended_by: string;
}

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export default function BreastCancerScreeningModal({
                                                       isOpen = false,
                                                       onClose,
                                                       onSuccess,
                                                       patientId,
                                                       visitId,
                                                       userId,
                                                       editingData,
                                                   }: BreastCancerScreeningModalProps) {
    const [activeTab, setActiveTab] = useState('patient');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        left: true,
        right: true,
    });
    const searchRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<FormData>({
        patient_id: patientId || '',
        patient_search: '',
        visit_id: visitId || null,
        left_breast_swelling: false,
        left_breast_swelling_duration: '',
        right_breast_swelling: false,
        right_breast_swelling_duration: '',
        left_axillary_swelling: false,
        left_axillary_swelling_duration: '',
        right_axillary_swelling: false,
        right_axillary_swelling_duration: '',
        left_bone_pain: false,
        left_bone_pain_duration: '',
        right_bone_pain: false,
        right_bone_pain_duration: '',
        left_arm_swelling: false,
        left_arm_swelling_duration: '',
        right_arm_swelling: false,
        right_arm_swelling_duration: '',
        weight_loss: false,
        weight_loss_duration: '',
        convulsions: false,
        convulsions_duration: '',
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
        surgery_date: '',
        surgery_type: 'Excision biopsy',
        radiotherapy_start: '',
        radiotherapy_end: '',
        radiotherapy_dosage: '',
        radiotherapy_boost: '',
        chemo_neo_start: '',
        chemo_neo_end: '',
        chemo_adjuvant_start: '',
        chemo_adjuvant_end: '',
        chemo_cycles: '',
        chemo_toxicities: '',
        hormonal_type: '',
        hormonal_duration: '',
        her2_agent: '',
        her2_cycles: '',
        mammogram_date: '',
        mammogram_laterality: 'Right',
        mammogram_tumour_size: '',
        mammogram_birads: '1',
        ultrasound_date: '',
        ultrasound_laterality: 'Right',
        ultrasound_tumour_size: '',
        ultrasound_birads: '1',
        ct_scan: false,
        ct_scan_date: '',
        ct_scan_findings: '',
        bone_scan: false,
        bone_scan_date: '',
        bone_scan_findings: '',
        pet_scan: false,
        pet_scan_date: '',
        pet_scan_findings: '',
        pregnancies: '',
        deliveries: '',
        contraceptive_use: 'Not specified',
        contraceptive_type: '',
        menopause_status: 'Unknown',
        family_breast_cancer: false,
        family_breast_cancer_relationship: '',
        family_ovarian_cancer: false,
        family_ovarian_cancer_relationship: '',
        family_other_cancer: false,
        family_other_cancer_details: '',
        brca1: 'Unknown',
        brca2: 'Unknown',
        genetic_other: '',
        left_masses: 'Not specified',
        left_mass_details: '',
        left_peau_dorange: 'Not specified',
        left_nipple_retraction: 'Not specified',
        left_discharge: 'Not specified',
        right_masses: 'Not specified',
        right_mass_details: '',
        right_peau_dorange: 'Not specified',
        right_nipple_retraction: 'Not specified',
        right_discharge: 'Not specified',
        axillary_nodes: 'Not specified',
        supraclavicular_nodes: 'Not specified',
        other_nodes: '',
        ecog: '0',
        comorbidities: '',
        other_exam_findings: '',
        t_category: 'Tx',
        t_size: '',
        t_details: '',
        n_category: 'Nx',
        n_details: '',
        m_category: 'Mx',
        m_details: '',
        stage_group: '',
        treatment_plan: '',
        referrals: '',
        follow_up_date: '',
        follow_up_interval: '',
        plan_notes: '',
        recommended_by: '',
    });

    const tabs: Tab[] = [
        { id: 'patient', label: 'Patient', icon: <User className="h-4 w-4" /> },
        { id: 'symptoms', label: 'Symptoms', icon: <Heart className="h-4 w-4" /> },
        { id: 'biopsy', label: 'Biopsy', icon: <Microscope className="h-4 w-4" /> },
        { id: 'treatment', label: 'Treatment', icon: <ClipboardCheck className="h-4 w-4" /> },
        { id: 'imaging', label: 'Imaging', icon: <Eye className="h-4 w-4" /> },
        { id: 'history', label: 'History', icon: <FileText className="h-4 w-4" /> },
        { id: 'exam', label: 'Exam', icon: <Activity className="h-4 w-4" /> },
        { id: 'tnm', label: 'TNM', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 'plan', label: 'Plan', icon: <Save className="h-4 w-4" /> },
    ];

    // Debug logging
    useEffect(() => {
        console.log('BreastCancerScreeningModal: isOpen =', isOpen);
    }, [isOpen]);

    // Load editing data if provided
    useEffect(() => {
        if (editingData) {
            setFormData(prev => ({
                ...prev,
                ...editingData,
            }));
        }
    }, [editingData]);

    // Click outside search results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePatientSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setFormData(prev => ({ ...prev, patient_search: query }));

        if (query.length < 2) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        try {
            const response = await Http.get(`/patients/search?q=${query}`);
            setSearchResults(response.data);
            setShowSearchResults(response.data.length > 0);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleSelectPatient = (patient: any) => {
        setFormData(prev => ({
            ...prev,
            patient_id: patient.id,
            patient_search: `${patient.full_name} (${patient.nrc_number || 'N/A'})`,
        }));
        setShowSearchResults(false);
        setSearchResults([]);
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.patient_id) {
            Notiflix.Notify.warning('Please select a patient');
            setActiveTab('patient');
            return;
        }

        setSaving(true);
        try {
            const endpoint = editingData ? `/breast-cancer/${editingData.id}` : '/breast-cancer/screening';
            const method = editingData ? 'put' : 'post';

            const response = await Http[method](endpoint, {
                ...formData,
                user_id: userId,
            });

            if (response.status === 201 || response.status === 200) {
                const newScreening = {
                    id: response.data.data.id,
                    patient_id: formData.patient_id,
                    patient_name: response.data.data.patient_name || formData.patient_search.split('(')[0].trim(),
                    patient_age: response.data.data.patient_age || 0,
                    patient_gender: response.data.data.patient_gender || 'Female',
                    screening_date: new Date().toISOString(),
                    result: response.data.data.result || 'pending',
                    is_positive: response.data.data.is_positive || false,
                    stage_group: formData.stage_group || '',
                    er_status: parseInt(formData.er) || 0,
                    pr_status: parseInt(formData.pr) || 0,
                    her2_status: parseInt(formData.her2) || 0,
                    created_at: new Date().toISOString(),
                    submitted_by: response.data.data.submitted_by || userId || 'Current User',
                };

                onSuccess(newScreening);
            }
        } catch (error: any) {
            console.error('Submit error:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to submit screening');
        } finally {
            setSaving(false);
        }
    };

    // If modal is not open, return null
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-6xl rounded-lg bg-white shadow-2xl max-h-[95vh] flex flex-col">
                    {/* Header */}
                    <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-rose-50 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-rose-100 p-1.5">
                                <Heart className="h-4 w-4 text-rose-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {editingData ? 'Edit' : 'New'} Breast Cancer Screening
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Complete all required sections
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-slate-200 bg-white px-4 overflow-x-auto flex-shrink-0">
                        <div className="flex gap-1 py-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                            isActive
                                                ? 'bg-rose-50 text-rose-700 shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                        {isActive && (
                                            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-hidden">
                        <div className="p-4 h-[60vh] overflow-y-auto">
                            {/* Patient Tab */}
                            {activeTab === 'patient' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <User className="h-3.5 w-3.5 text-slate-400" />
                                            Search Patient *
                                        </label>
                                        <div className="relative mt-1" ref={searchRef}>
                                            <input
                                                type="text"
                                                value={formData.patient_search}
                                                onChange={handlePatientSearch}
                                                className="w-full rounded-md border border-slate-200 px-3 py-2 pr-10 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                placeholder="Type patient name or NRC number..."
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            {showSearchResults && searchResults.length > 0 && (
                                                <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                                                    {searchResults.map((patient) => (
                                                        <button
                                                            key={patient.id}
                                                            type="button"
                                                            onClick={() => handleSelectPatient(patient)}
                                                            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between"
                                                        >
                                                            <span className="font-medium text-slate-800">
                                                                {patient.full_name}
                                                            </span>
                                                            <span className="text-xs text-slate-500">
                                                                {patient.nrc_number || 'No NRC'} • {patient.age} years
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {formData.patient_id && (
                                        <div className="rounded-md bg-emerald-50 p-3 flex items-center gap-2 border border-emerald-200">
                                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                                            <span className="text-sm text-emerald-700">
                                                Patient selected: <strong>{formData.patient_search}</strong>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Symptoms Tab */}
                            {activeTab === 'symptoms' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Left Side */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleSection('left')}
                                                className="flex items-center justify-between w-full mb-2 text-xs font-medium text-slate-500 hover:text-slate-700"
                                            >
                                                <span>Left Side</span>
                                                {expandedSections.left ? (
                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                )}
                                            </button>
                                            {expandedSections.left && (
                                                <div className="space-y-2">
                                                    {[
                                                        { label: 'Breast Swelling', key: 'left_breast_swelling', durationKey: 'left_breast_swelling_duration' },
                                                        { label: 'Axillary Swelling', key: 'left_axillary_swelling', durationKey: 'left_axillary_swelling_duration' },
                                                        { label: 'Bone Pain', key: 'left_bone_pain', durationKey: 'left_bone_pain_duration' },
                                                        { label: 'Arm Swelling', key: 'left_arm_swelling', durationKey: 'left_arm_swelling_duration' },
                                                    ].map((symptom) => (
                                                        <div key={symptom.key} className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                name={symptom.key}
                                                                checked={formData[symptom.key as keyof FormData] as boolean}
                                                                onChange={handleInputChange}
                                                                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                            />
                                                            <label className="text-xs text-slate-700 flex-1">{symptom.label}</label>
                                                            {formData[symptom.key as keyof FormData] && (
                                                                <input
                                                                    type="text"
                                                                    name={symptom.durationKey}
                                                                    value={formData[symptom.durationKey as keyof FormData] as string}
                                                                    onChange={handleInputChange}
                                                                    className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                                    placeholder="Duration"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => toggleSection('right')}
                                                className="flex items-center justify-between w-full mb-2 text-xs font-medium text-slate-500 hover:text-slate-700"
                                            >
                                                <span>Right Side</span>
                                                {expandedSections.right ? (
                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                )}
                                            </button>
                                            {expandedSections.right && (
                                                <div className="space-y-2">
                                                    {[
                                                        { label: 'Breast Swelling', key: 'right_breast_swelling', durationKey: 'right_breast_swelling_duration' },
                                                        { label: 'Axillary Swelling', key: 'right_axillary_swelling', durationKey: 'right_axillary_swelling_duration' },
                                                        { label: 'Bone Pain', key: 'right_bone_pain', durationKey: 'right_bone_pain_duration' },
                                                        { label: 'Arm Swelling', key: 'right_arm_swelling', durationKey: 'right_arm_swelling_duration' },
                                                    ].map((symptom) => (
                                                        <div key={symptom.key} className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                name={symptom.key}
                                                                checked={formData[symptom.key as keyof FormData] as boolean}
                                                                onChange={handleInputChange}
                                                                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                            />
                                                            <label className="text-xs text-slate-700 flex-1">{symptom.label}</label>
                                                            {formData[symptom.key as keyof FormData] && (
                                                                <input
                                                                    type="text"
                                                                    name={symptom.durationKey}
                                                                    value={formData[symptom.durationKey as keyof FormData] as string}
                                                                    onChange={handleInputChange}
                                                                    className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                                    placeholder="Duration"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* General Symptoms */}
                                    <div className="border-t border-slate-200 pt-3">
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Weight Loss', key: 'weight_loss', durationKey: 'weight_loss_duration' },
                                                { label: 'Convulsions', key: 'convulsions', durationKey: 'convulsions_duration' },
                                            ].map((symptom) => (
                                                <div key={symptom.key} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name={symptom.key}
                                                        checked={formData[symptom.key as keyof FormData] as boolean}
                                                        onChange={handleInputChange}
                                                        className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                    />
                                                    <label className="text-xs text-slate-700 flex-1">{symptom.label}</label>
                                                    {formData[symptom.key as keyof FormData] && (
                                                        <input
                                                            type="text"
                                                            name={symptom.durationKey}
                                                            value={formData[symptom.durationKey as keyof FormData] as string}
                                                            onChange={handleInputChange}
                                                            className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                            placeholder="Duration"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Biopsy Tab */}
                            {activeTab === 'biopsy' && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Biopsy Type</label>
                                        <select
                                            name="biopsy_type"
                                            value={formData.biopsy_type}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        >
                                            <option value="Core needle biopsy">Core needle biopsy</option>
                                            <option value="Fine needle aspiration">Fine needle aspiration</option>
                                            <option value="Surgical biopsy">Surgical biopsy</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Date</label>
                                        <input
                                            type="date"
                                            name="biopsy_date"
                                            value={formData.biopsy_date}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">ER (%)</label>
                                        <input
                                            type="number"
                                            name="er"
                                            value={formData.er}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        >
                                            <option value="1">1 (Low grade)</option>
                                            <option value="2">2 (Intermediate)</option>
                                            <option value="3">3 (High grade)</option>
                                            <option value="Not specified">Not specified</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">LVI</label>
                                        <select
                                            name="lvi"
                                            value={formData.lvi}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Not specified">Not specified</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Treatment Tab */}
                            {activeTab === 'treatment' && (
                                <div className="space-y-4">
                                    {/* Surgery */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Scissors className="h-3.5 w-3.5" />
                                            Surgery
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Date</label>
                                                <input
                                                    type="date"
                                                    name="surgery_date"
                                                    value={formData.surgery_date}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Type</label>
                                                <select
                                                    name="surgery_type"
                                                    value={formData.surgery_type}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Excision biopsy">Excision biopsy</option>
                                                    <option value="Lumpectomy">Lumpectomy</option>
                                                    <option value="Mastectomy">Mastectomy</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Radiotherapy */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Radiation className="h-3.5 w-3.5" />
                                            Radiotherapy
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="radiotherapy_start"
                                                    value={formData.radiotherapy_start}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">End Date</label>
                                                <input
                                                    type="date"
                                                    name="radiotherapy_end"
                                                    value={formData.radiotherapy_end}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Dosage</label>
                                                <input
                                                    type="text"
                                                    name="radiotherapy_dosage"
                                                    value={formData.radiotherapy_dosage}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., 10 Gy"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chemotherapy */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Syringe className="h-3.5 w-3.5" />
                                            Chemotherapy
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Neo Adjuvant Start</label>
                                                <input
                                                    type="date"
                                                    name="chemo_neo_start"
                                                    value={formData.chemo_neo_start}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Neo Adjuvant End</label>
                                                <input
                                                    type="date"
                                                    name="chemo_neo_end"
                                                    value={formData.chemo_neo_end}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Adjuvant Start</label>
                                                <input
                                                    type="date"
                                                    name="chemo_adjuvant_start"
                                                    value={formData.chemo_adjuvant_start}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Adjuvant End</label>
                                                <input
                                                    type="date"
                                                    name="chemo_adjuvant_end"
                                                    value={formData.chemo_adjuvant_end}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Cycles</label>
                                                <input
                                                    type="number"
                                                    name="chemo_cycles"
                                                    value={formData.chemo_cycles}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., 4"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Toxicities</label>
                                                <input
                                                    type="text"
                                                    name="chemo_toxicities"
                                                    value={formData.chemo_toxicities}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., Neuropathy"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hormonal & HER2 */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                                <Pill className="h-3.5 w-3.5" />
                                                Hormonal Therapy
                                            </h4>
                                            <div className="space-y-2">
                                                <select
                                                    name="hormonal_type"
                                                    value={formData.hormonal_type}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="Tamoxifen">Tamoxifen</option>
                                                    <option value="Anastrozole">Anastrozole</option>
                                                    <option value="Letrozole">Letrozole</option>
                                                    <option value="Exemestane">Exemestane</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name="hormonal_duration"
                                                    value={formData.hormonal_duration}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="Duration (e.g., 5 years)"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                                <Microscope className="h-3.5 w-3.5" />
                                                HER2 Therapy
                                            </h4>
                                            <div className="space-y-2">
                                                <select
                                                    name="her2_agent"
                                                    value={formData.her2_agent}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="">Select agent</option>
                                                    <option value="Trastuzumab">Trastuzumab</option>
                                                    <option value="Pertuzumab">Pertuzumab</option>
                                                    <option value="Ado-trastuzumab">Ado-trastuzumab</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    name="her2_cycles"
                                                    value={formData.her2_cycles}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="Number of cycles"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Imaging Tab */}
                            {activeTab === 'imaging' && (
                                <div className="space-y-4">
                                    {/* Mammogram */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Camera className="h-3.5 w-3.5" />
                                            Mammogram
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Date</label>
                                                <input
                                                    type="date"
                                                    name="mammogram_date"
                                                    value={formData.mammogram_date}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Laterality</label>
                                                <select
                                                    name="mammogram_laterality"
                                                    value={formData.mammogram_laterality}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., 2.5 cm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">BIRADS</label>
                                                <select
                                                    name="mammogram_birads"
                                                    value={formData.mammogram_birads}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                        </div>
                                    </div>

                                    {/* Ultrasound */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <ImageIcon className="h-3.5 w-3.5" />
                                            Ultrasound
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Date</label>
                                                <input
                                                    type="date"
                                                    name="ultrasound_date"
                                                    value={formData.ultrasound_date}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Laterality</label>
                                                <select
                                                    name="ultrasound_laterality"
                                                    value={formData.ultrasound_laterality}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., 2.5 cm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">BIRADS</label>
                                                <select
                                                    name="ultrasound_birads"
                                                    value={formData.ultrasound_birads}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
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
                                        </div>
                                    </div>

                                    {/* Other Scans */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'CT Scan', key: 'ct_scan', dateKey: 'ct_scan_date', findingsKey: 'ct_scan_findings' },
                                            { label: 'Bone Scan', key: 'bone_scan', dateKey: 'bone_scan_date', findingsKey: 'bone_scan_findings' },
                                            { label: 'PET Scan', key: 'pet_scan', dateKey: 'pet_scan_date', findingsKey: 'pet_scan_findings' },
                                        ].map((scan) => (
                                            <div key={scan.key} className="border border-slate-200 rounded-md p-2">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <input
                                                        type="checkbox"
                                                        name={scan.key}
                                                        checked={formData[scan.key as keyof FormData] as boolean}
                                                        onChange={handleInputChange}
                                                        className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3 w-3"
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
                                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        />
                                                        <textarea
                                                            name={scan.findingsKey}
                                                            value={formData[scan.findingsKey as keyof FormData] as string}
                                                            onChange={handleInputChange}
                                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                            rows={1}
                                                            placeholder="Findings"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* History Tab */}
                            {activeTab === 'history' && (
                                <div className="space-y-4">
                                    {/* Reproductive History */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5" />
                                            Reproductive History
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Pregnancies</label>
                                                <input
                                                    type="number"
                                                    name="pregnancies"
                                                    value={formData.pregnancies}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Deliveries</label>
                                                <input
                                                    type="number"
                                                    name="deliveries"
                                                    value={formData.deliveries}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Contraceptive Use</label>
                                                <select
                                                    name="contraceptive_use"
                                                    value={formData.contraceptive_use}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Not specified">Not specified</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Menopause Status</label>
                                                <select
                                                    name="menopause_status"
                                                    value={formData.menopause_status}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Unknown">Unknown</option>
                                                    <option value="Premenopausal">Premenopausal</option>
                                                    <option value="Perimenopausal">Perimenopausal</option>
                                                    <option value="Postmenopausal">Postmenopausal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Family History */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <History className="h-3.5 w-3.5" />
                                            Family History
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="family_breast_cancer"
                                                    checked={formData.family_breast_cancer}
                                                    onChange={handleInputChange}
                                                    className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                />
                                                <label className="text-xs text-slate-700 flex-1">Breast Cancer</label>
                                                {formData.family_breast_cancer && (
                                                    <input
                                                        type="text"
                                                        name="family_breast_cancer_relationship"
                                                        value={formData.family_breast_cancer_relationship}
                                                        onChange={handleInputChange}
                                                        className="w-32 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        placeholder="Relationship"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="family_ovarian_cancer"
                                                    checked={formData.family_ovarian_cancer}
                                                    onChange={handleInputChange}
                                                    className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                />
                                                <label className="text-xs text-slate-700 flex-1">Ovarian Cancer</label>
                                                {formData.family_ovarian_cancer && (
                                                    <input
                                                        type="text"
                                                        name="family_ovarian_cancer_relationship"
                                                        value={formData.family_ovarian_cancer_relationship}
                                                        onChange={handleInputChange}
                                                        className="w-32 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        placeholder="Relationship"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="family_other_cancer"
                                                    checked={formData.family_other_cancer}
                                                    onChange={handleInputChange}
                                                    className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                                                />
                                                <label className="text-xs text-slate-700 flex-1">Other Malignancies</label>
                                                {formData.family_other_cancer && (
                                                    <input
                                                        type="text"
                                                        name="family_other_cancer_details"
                                                        value={formData.family_other_cancer_details}
                                                        onChange={handleInputChange}
                                                        className="w-32 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        placeholder="Specify"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Genetic Mutations */}
                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                            <Shield className="h-3.5 w-3.5" />
                                            Genetic Mutations
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">BRCA1</label>
                                                <select
                                                    name="brca1"
                                                    value={formData.brca1}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Unknown">Unknown</option>
                                                    <option value="Positive">Positive</option>
                                                    <option value="Negative">Negative</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">BRCA2</label>
                                                <select
                                                    name="brca2"
                                                    value={formData.brca2}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Unknown">Unknown</option>
                                                    <option value="Positive">Positive</option>
                                                    <option value="Negative">Negative</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Other</label>
                                                <input
                                                    type="text"
                                                    name="genetic_other"
                                                    value={formData.genetic_other}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="Specify"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Physical Exam Tab */}
                            {activeTab === 'exam' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <h4 className="text-xs font-medium text-slate-500 mb-2">Left Breast</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Masses</label>
                                                    <select
                                                        name="left_masses"
                                                        value={formData.left_masses}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Details</label>
                                                    <input
                                                        type="text"
                                                        name="left_mass_details"
                                                        value={formData.left_mass_details}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        placeholder="Size, location"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Peau d'orange</label>
                                                    <select
                                                        name="left_peau_dorange"
                                                        value={formData.left_peau_dorange}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Nipple Retraction</label>
                                                    <select
                                                        name="left_nipple_retraction"
                                                        value={formData.left_nipple_retraction}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Discharge</label>
                                                    <select
                                                        name="left_discharge"
                                                        value={formData.left_discharge}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-medium text-slate-500 mb-2">Right Breast</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Masses</label>
                                                    <select
                                                        name="right_masses"
                                                        value={formData.right_masses}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Details</label>
                                                    <input
                                                        type="text"
                                                        name="right_mass_details"
                                                        value={formData.right_mass_details}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                        placeholder="Size, location"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Peau d'orange</label>
                                                    <select
                                                        name="right_peau_dorange"
                                                        value={formData.right_peau_dorange}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Nipple Retraction</label>
                                                    <select
                                                        name="right_nipple_retraction"
                                                        value={formData.right_nipple_retraction}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-slate-700">Discharge</label>
                                                    <select
                                                        name="right_discharge"
                                                        value={formData.right_discharge}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    >
                                                        <option value="Not specified">Not specified</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2">Lymph Nodes</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Axillary</label>
                                                <select
                                                    name="axillary_nodes"
                                                    value={formData.axillary_nodes}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Not specified">Not specified</option>
                                                    <option value="Palpable">Palpable</option>
                                                    <option value="Not palpable">Not palpable</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Supraclavicular</label>
                                                <select
                                                    name="supraclavicular_nodes"
                                                    value={formData.supraclavicular_nodes}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="Not specified">Not specified</option>
                                                    <option value="Palpable">Palpable</option>
                                                    <option value="Not palpable">Not palpable</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="text-xs font-medium text-slate-700">Other Nodes</label>
                                            <input
                                                type="text"
                                                name="other_nodes"
                                                value={formData.other_nodes}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                placeholder="Specify other node findings"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-medium text-slate-500 mb-2">General</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">ECOG Status</label>
                                                <select
                                                    name="ecog"
                                                    value={formData.ecog}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                >
                                                    <option value="0">0 - Fully active</option>
                                                    <option value="1">1 - Restricted</option>
                                                    <option value="2">2 - Ambulatory</option>
                                                    <option value="3">3 - Limited self-care</option>
                                                    <option value="4">4 - Disabled</option>
                                                    <option value="5">5 - Dead</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700">Comorbidities</label>
                                                <input
                                                    type="text"
                                                    name="comorbidities"
                                                    value={formData.comorbidities}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                    placeholder="e.g., Diabetes"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="text-xs font-medium text-slate-700">Other Findings</label>
                                            <textarea
                                                name="other_exam_findings"
                                                value={formData.other_exam_findings}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                rows={2}
                                                placeholder="Any other relevant findings..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TNM Tab */}
                            {activeTab === 'tnm' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">T Category</label>
                                            <select
                                                name="t_category"
                                                value={formData.t_category}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            >
                                                <option value="Tx">Tx</option>
                                                <option value="T0">T0</option>
                                                <option value="T1">T1</option>
                                                <option value="T2">T2</option>
                                                <option value="T3">T3</option>
                                                <option value="T4">T4</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">N Category</label>
                                            <select
                                                name="n_category"
                                                value={formData.n_category}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            >
                                                <option value="Nx">Nx</option>
                                                <option value="N0">N0</option>
                                                <option value="N1">N1</option>
                                                <option value="N2">N2</option>
                                                <option value="N3">N3</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">M Category</label>
                                            <select
                                                name="m_category"
                                                value={formData.m_category}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            >
                                                <option value="Mx">Mx</option>
                                                <option value="M0">M0</option>
                                                <option value="M1">M1</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">T Size</label>
                                            <input
                                                type="text"
                                                name="t_size"
                                                value={formData.t_size}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                placeholder="e.g., 2.5 cm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Stage Group</label>
                                            <select
                                                name="stage_group"
                                                value={formData.stage_group}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            >
                                                <option value="">Select Stage</option>
                                                <option value="0">0</option>
                                                <option value="IA">IA</option>
                                                <option value="IB">IB</option>
                                                <option value="IIA">IIA</option>
                                                <option value="IIB">IIB</option>
                                                <option value="IIIA">IIIA</option>
                                                <option value="IIIB">IIIB</option>
                                                <option value="IIIC">IIIC</option>
                                                <option value="IV">IV</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Additional Details</label>
                                        <textarea
                                            name="t_details"
                                            value={formData.t_details}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            rows={2}
                                            placeholder="Any additional details about TNM staging..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Plan Tab */}
                            {activeTab === 'plan' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Treatment Plan</label>
                                        <textarea
                                            name="treatment_plan"
                                            value={formData.treatment_plan}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            rows={3}
                                            placeholder="Describe the treatment plan..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Referrals</label>
                                        <textarea
                                            name="referrals"
                                            value={formData.referrals}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            rows={2}
                                            placeholder="Specialty | Urgency | Reason (one per line)"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Follow-up Date</label>
                                            <input
                                                type="date"
                                                name="follow_up_date"
                                                value={formData.follow_up_date}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Follow-up Interval</label>
                                            <input
                                                type="text"
                                                name="follow_up_interval"
                                                value={formData.follow_up_interval}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                                placeholder="e.g., 3 months"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Additional Notes</label>
                                        <textarea
                                            name="plan_notes"
                                            value={formData.plan_notes}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            rows={2}
                                            placeholder="Any additional notes about the treatment plan..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700">Recommended By</label>
                                        <input
                                            type="text"
                                            name="recommended_by"
                                            value={formData.recommended_by}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            placeholder="Name of recommending clinician"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50 rounded-b-lg flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    <span>* Required fields</span>
                                </div>
                                {activeTab !== 'plan' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentIndex = tabs.findIndex(t => t.id === activeTab);
                                            if (currentIndex < tabs.length - 1) {
                                                setActiveTab(tabs[currentIndex + 1].id);
                                            }
                                        }}
                                        className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                                    >
                                        Next →
                                    </button>
                                )}
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
                                    className="flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 transition-colors disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-3.5 w-3.5" />
                                            {editingData ? 'Update' : 'Save'} Screening
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

// pages/patients/risk-assessment.tsx
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Phone,
    MapPin,
    Shield,
    AlertTriangle,
    Printer,
    Download,
    ArrowLeft,
    Plus,
    Eye,
    Trash2,
    Search,
    ChevronDown,
    ChevronUp,
    Calendar,
    X,
    Info,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Types
interface Address {
    id?: number;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    district?: string;
    province?: string;
    country?: string;
    postal_code?: string;
}

interface RiskAssessment {
    id: number;
    patient_id: number;
    number_of_pregnancies: number;
    number_of_deliveries: number;
    long_term_contraceptive_use: string | null;
    risk_score?: number;
    risk_level?: 'low' | 'moderate' | 'high' | 'critical';
    assessment_date?: string;
    assessed_by?: string;
    notes?: string;
    form_data?: any;
    calculated_risk_tier?: string;
}

interface Patient {
    id: number;
    user_id: number;
    patient_uuid: string;
    first_name: string;
    last_name: string;
    full_name: string;
    date_of_birth: string;
    age: number;
    gender: string;
    phone_number: string;
    nrc_number: string;
    marital_status: string | null;
    is_active: boolean;
    is_high_risk: boolean;
    addresses: Address[];
    latest_risk_assessment: RiskAssessment | null;
    registered_at: string;
}

interface PageProps {
    patient: Patient;
    riskAssessments: RiskAssessment[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

// Risk Level Badge
const RiskLevelBadge = ({ level }: { level: RiskAssessment['risk_level'] }) => {
    const styles = {
        low: 'bg-emerald-100 text-emerald-700',
        moderate: 'bg-amber-100 text-amber-700',
        high: 'bg-orange-100 text-orange-700',
        critical: 'bg-rose-100 text-rose-700',
    };

    const labels = {
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
        critical: 'Critical',
    };

    if (!level) return <Badge className="bg-slate-100 text-slate-600">Not assessed</Badge>;

    return <Badge className={styles[level]}>{labels[level]}</Badge>;
};

// Risk Assessment Form Modal
const RiskAssessmentModal = ({
                                 isOpen,
                                 onClose,
                                 onSubmit,
                                 patient
                             }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    patient: Patient;
}) => {
    const [formData, setFormData] = useState<any>({
        // Section 1: HPV Vaccination
        hpv_vaccination_status: '',
        hpv_vaccine_brand: '',
        last_dose_date: '',

        // Section 2: Behavioral & Biological Co-Factors
        age_at_first_intercourse: '',
        lifetime_sexual_partners_tier: '',
        barrier_contraception_frequency: '',
        long_term_oral_contraceptive_use: false,
        parity_count: '',

        // Section 3: Immuno-Suppression & Synergy Profiling
        hiv_viral_load_status: '',
        concurrent_sti_history: [] as string[],

        // Section 4: Interventions
        risk_reduction_interventions_delivered: [] as string[],
    });

    const [calculatedRisk, setCalculatedRisk] = useState<string>('STANDARD_ROUTINE');

    // Calculate risk tier based on form data
    useEffect(() => {
        let risk = 'STANDARD_ROUTINE';

        // Check for critical risk
        if (formData.hiv_viral_load_status === 'unsuppressed') {
            risk = 'CRITICAL_RISK';
        }
        // Check for elevated vulnerability
        else if (formData.hpv_vaccination_status === 'unvaccinated' &&
            formData.lifetime_sexual_partners_tier === 'multiple_partners') {
            risk = 'ELEVATED_VULNERABILITY';
        }

        setCalculatedRisk(risk);
    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const riskLevelMap: { [key: string]: 'low' | 'moderate' | 'high' | 'critical' } = {
            'STANDARD_ROUTINE': 'low',
            'ELEVATED_VULNERABILITY': 'moderate',
            'CRITICAL_RISK': 'critical',
        };

        onSubmit({
            id: crypto.randomUUID(),
            ...formData,
            calculated_risk_tier: calculatedRisk,
            risk_level: riskLevelMap[calculatedRisk] || 'low',
            assessment_date: new Date().toISOString(),
            assessed_by: 'Current User',
            created_at: new Date().toISOString(),
        });
        onClose();
        // Reset form
        setFormData({
            hpv_vaccination_status: '',
            hpv_vaccine_brand: '',
            last_dose_date: '',
            age_at_first_intercourse: '',
            lifetime_sexual_partners_tier: '',
            barrier_contraception_frequency: '',
            long_term_oral_contraceptive_use: false,
            parity_count: '',
            hiv_viral_load_status: '',
            concurrent_sti_history: [],
            risk_reduction_interventions_delivered: [],
        });
    };

    const handleCheckboxChange = (field: string, value: string) => {
        setFormData((prev: any) => {
            const current = prev[field] || [];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter((v: string) => v !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    if (!isOpen) return null;

    const shouldShowVaccineFields =
        formData.hpv_vaccination_status === 'fully_vaccinated' ||
        formData.hpv_vaccination_status === 'partially_vaccinated';

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                <Shield className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Form 12: Cervical Cancer Risk Reduction
                                </h2>
                                <p className="text-xs text-slate-500">Version 1.0.0</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-md transition-colors">
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <form id="risk-assessment-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Patient Summary */}
                            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                    <p className="text-xs text-slate-500">Patient</p>
                                    <p className="text-sm font-medium text-slate-900">{patient?.full_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Age / Gender</p>
                                    <p className="text-sm font-medium text-slate-900">{patient?.age || 0} yrs / {patient?.gender || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">NRC</p>
                                    <p className="text-sm font-medium text-slate-900">{patient?.nrc_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Risk Tier</p>
                                    <Badge className={cn(
                                        calculatedRisk === 'CRITICAL_RISK' ? 'bg-rose-100 text-rose-700' :
                                            calculatedRisk === 'ELEVATED_VULNERABILITY' ? 'bg-amber-100 text-amber-700' :
                                                'bg-emerald-100 text-emerald-700'
                                    )}>
                                        {calculatedRisk.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>

                            {/* Section 1: HPV Vaccination */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[10px]">1</span>
                                    Protective Immunity (HPV Vaccination Tracking)
                                </h3>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">HPV Vaccination Status *</label>
                                    <select
                                        required
                                        value={formData.hpv_vaccination_status}
                                        onChange={(e) => setFormData({ ...formData, hpv_vaccination_status: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        <option value="">Select status</option>
                                        <option value="fully_vaccinated">Fully Vaccinated</option>
                                        <option value="partially_vaccinated">Partially Vaccinated</option>
                                        <option value="unvaccinated">Unvaccinated</option>
                                        <option value="unknown">Status Unknown</option>
                                    </select>
                                </div>

                                {shouldShowVaccineFields && (
                                    <>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Vaccine Formulation Type *</label>
                                            <select
                                                required
                                                value={formData.hpv_vaccine_brand}
                                                onChange={(e) => setFormData({ ...formData, hpv_vaccine_brand: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            >
                                                <option value="">Select vaccine</option>
                                                <option value="bivalent_cervarix">Bivalent (Cervarix)</option>
                                                <option value="quadrivalent_gardasil">Quadrivalent (Gardasil)</option>
                                                <option value="nonavalent_gardasil9">Nonavalent (Gardasil 9)</option>
                                                <option value="unknown_brand">Unknown Formulation</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700">Date of Most Recent Dose</label>
                                            <input
                                                type="date"
                                                value={formData.last_dose_date}
                                                onChange={(e) => setFormData({ ...formData, last_dose_date: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                max={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Section 2: Behavioral & Biological Co-Factors */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[10px]">2</span>
                                    Behavioral & Biological Co-Factors
                                </h3>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Age at First Sexual Intercourse (Years)</label>
                                    <input
                                        type="number"
                                        min="5"
                                        max="60"
                                        value={formData.age_at_first_intercourse}
                                        onChange={(e) => setFormData({ ...formData, age_at_first_intercourse: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        placeholder="e.g., 18"
                                    />
                                    <p className="mt-1 text-[10px] text-slate-400">Early exposure increases vulnerability of the transformation zone.</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Number of Lifetime Sexual Partners *</label>
                                    <select
                                        required
                                        value={formData.lifetime_sexual_partners_tier}
                                        onChange={(e) => setFormData({ ...formData, lifetime_sexual_partners_tier: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        <option value="">Select option</option>
                                        <option value="single_partner">1 Partner</option>
                                        <option value="few_partners">2 to 4 Partners</option>
                                        <option value="multiple_partners">5 or More Partners</option>
                                        <option value="declined_to_answer">Declined to Disclose</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Frequency of Male/Female Condom Use *</label>
                                    <select
                                        required
                                        value={formData.barrier_contraception_frequency}
                                        onChange={(e) => setFormData({ ...formData, barrier_contraception_frequency: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="always">Always / Consistent Use</option>
                                        <option value="sometimes">Sometimes / Inconsistent Use</option>
                                        <option value="never">Never Use Barrier Protection</option>
                                    </select>
                                    <p className="mt-1 text-[10px] text-slate-400">Protective reduction metric tracking exposure to persistent HPV and other STIs.</p>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.long_term_oral_contraceptive_use}
                                            onChange={(e) => setFormData({ ...formData, long_term_oral_contraceptive_use: e.target.checked })}
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        Oral Contraceptive (Pill) Use Exceeding 5 Years?
                                    </label>
                                    <p className="mt-1 text-[10px] text-slate-400">Prolonged continuous combined oral pill use is a slight risk co-factor.</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Parity (Number of Full-Term Pregnancies) *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="20"
                                        required
                                        value={formData.parity_count}
                                        onChange={(e) => setFormData({ ...formData, parity_count: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        placeholder="e.g., 2"
                                    />
                                    <p className="mt-1 text-[10px] text-slate-400">High parity acts as a co-factor due to prolonged hormonal and tissue alterations.</p>
                                </div>
                            </div>

                            {/* Section 3: Immuno-Suppression & Synergy Profiling */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[10px]">3</span>
                                    Immuno-Suppression & Synergy Profiling
                                </h3>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">HIV Viral Load Suppression Profile *</label>
                                    <select
                                        required
                                        value={formData.hiv_viral_load_status}
                                        onChange={(e) => setFormData({ ...formData, hiv_viral_load_status: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        <option value="">Select profile</option>
                                        <option value="not_applicable_hiv_negative">Patient is HIV Negative</option>
                                        <option value="suppressed">Suppressed (&lt;50 copies/mL)</option>
                                        <option value="unsuppressed">Unsuppressed (Viremic / High Risk)</option>
                                        <option value="pending_results">Viral Load Test Ordered / Pending Result</option>
                                    </select>
                                    <p className="mt-1 text-[10px] text-slate-400">Unsuppressed viral loads strongly accelerate cervical lesion development.</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Active or Frequent STI Diagnoses</label>
                                    <div className="mt-1 space-y-1.5 p-2 border border-slate-200 rounded-md">
                                        {[
                                            { value: 'chlamydia', label: 'Chlamydia trachomatis' },
                                            { value: 'gonorrhea', label: 'Neisseria gonorrhoeae' },
                                            { value: 'hsv_2', label: 'Herpes Simplex Virus Type 2 (HSV-2)' },
                                            { value: 'syphilis', label: 'Syphilis active screening markers' },
                                            { value: 'none', label: 'No current active STIs flagged' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.concurrent_sti_history.includes(option.value)}
                                                    onChange={() => handleCheckboxChange('concurrent_sti_history', option.value)}
                                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    <p className="mt-1 text-[10px] text-slate-400">Co-infections provoke chronic cervical inflammation, lowering natural clearance of HPV strains.</p>
                                </div>
                            </div>

                            {/* Section 4: Interventions */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[10px]">4</span>
                                    Automated Risk Classification & Interventions
                                </h3>

                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-start gap-2">
                                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-medium text-blue-700">Calculated Vulnerability Profile</p>
                                            <p className="text-sm font-semibold text-blue-900">
                                                {calculatedRisk.replace('_', ' ')}
                                            </p>
                                            <p className="text-[10px] text-blue-600">Auto-calculated based on HIV status, vaccination status, and partner count</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700">Targeted Actions/Counselling Delivered *</label>
                                    <div className="mt-1 space-y-1.5 p-2 border border-slate-200 rounded-md">
                                        {[
                                            { value: 'hpv_vaccine_referral', label: 'Referred for HPV Vaccination catch-up/initiation schedule' },
                                            { value: 'barrier_education', label: 'Provided Condom / Dual-Protection Counseling & Supplies' },
                                            { value: 'tobacco_cessation', label: 'Enrolled in Tobacco Cessation Counselling Track' },
                                            { value: 'art_adherence_linkage', label: 'Referred to ART Clinic for viral load optimization coaching' },
                                            { value: 'routine_screening_schedule', label: 'Scheduled for accelerated 12-month molecular screening window' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.risk_reduction_interventions_delivered.includes(option.value)}
                                                    onChange={() => handleCheckboxChange('risk_reduction_interventions_delivered', option.value)}
                                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Patient:</span> {patient?.full_name || 'N/A'}
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-medium text-slate-700">Risk Tier:</span>
                            <Badge className={cn(
                                'ml-1',
                                calculatedRisk === 'CRITICAL_RISK' ? 'bg-rose-100 text-rose-700' :
                                    calculatedRisk === 'ELEVATED_VULNERABILITY' ? 'bg-amber-100 text-amber-700' :
                                        'bg-emerald-100 text-emerald-700'
                            )}>
                                {calculatedRisk.replace('_', ' ')}
                            </Badge>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="risk-assessment-form"
                                className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center gap-2"
                            >
                                <Shield className="h-4 w-4" />
                                Submit Assessment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function RiskAssessment() {
    const { props } = usePage<PageProps>();
    const { patient, riskAssessments = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof RiskAssessment>('assessment_date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Get primary address
    const primaryAddress: Address | undefined = patient?.addresses?.[0];

    // Format date
    const formatShortDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Handle back to patient
    const handleBack = () => {
        if (patient?.patient_uuid) {
            router.visit(`/patients/registry/${patient.patient_uuid}`, {
                preserveState: false,
                preserveScroll: true,
            });
        }
    };

    const handleAddAssessment = (newAssessment: RiskAssessment) => {
        // In a real app, you'd save this to the backend
        console.log('New assessment:', newAssessment);
        // Refresh the page to show new data
        router.reload({
            only: ['riskAssessments'],
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Filter and sort risk assessments
    const filteredAssessments = riskAssessments
        .filter(assessment => {
            const search = searchTerm.toLowerCase();
            return (
                assessment.assessed_by?.toLowerCase().includes(search) ||
                assessment.notes?.toLowerCase().includes(search) ||
                assessment.risk_level?.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {
            const aVal = a[sortField]?.toString() || '';
            const bVal = b[sortField]?.toString() || '';
            return sortDirection === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const handleSort = (field: keyof RiskAssessment) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Info row for contact/risk
    const InfoRow = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => (
        <div className="flex items-center justify-between px-3.5 py-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                {icon}
                {label}
            </span>
            <span className="text-xs font-medium text-slate-800">{value}</span>
        </div>
    );

    // Compact demographic field
    const DemographicField = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div className="px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
            <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{value}</div>
        </div>
    );

    const avatarUrl = patient?.full_name
        ? `https://avatarapi.runflare.run/public?usearname=${encodeURIComponent(patient.full_name)}`
        : '';

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
                    href: `/patients/registry/${patient?.patient_uuid || ''}`,
                },
                {
                    title: 'Risk Assessment',
                    href: '#',
                },
            ]}
            patient={patient}
            isPatientView={true}
        >
            <div className="min-h-screen bg-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-3">
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleBack}
                                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                                <img
                                    src={avatarUrl}
                                    alt={patient?.full_name || 'Patient'}
                                    className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-lg font-semibold text-slate-900">
                                            {patient?.full_name || 'Patient'}
                                        </h1>
                                        {patient?.is_high_risk && (
                                            <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 ring-1 ring-inset ring-rose-200">
                                                <AlertTriangle className="h-3 w-3" />
                                                High risk
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 text-xs text-slate-500">
                                        Registered {formatShortDate(patient?.registered_at || '')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.print()}
                                    title="Print"
                                    className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                                >
                                    <Printer className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => router.get(`/patients/${patient?.patient_uuid}/risk-assessment/export`)}
                                    title="Export"
                                    className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                </button>
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-medium"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    New Assessment
                                </Button>
                            </div>
                        </div>

                        {/* Demographics — compact */}
                        <div className="mb-3 grid grid-cols-2 divide-y divide-slate-100 rounded-md border border-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-6">
                            <DemographicField label="NRC number" value={patient?.nrc_number || 'N/A'} />
                            <DemographicField label="Date of birth" value={formatShortDate(patient?.date_of_birth || '')} />
                            <DemographicField label="Age" value={`${patient?.age || 0} years`} />
                            <DemographicField label="Gender" value={<span className="capitalize">{patient?.gender || 'N/A'}</span>} />
                            <DemographicField label="Marital status" value={patient?.marital_status || 'Not specified'} />
                            <DemographicField
                                label="Risk status"
                                value={
                                    <span className={patient?.is_high_risk ? 'text-rose-600' : 'text-emerald-600'}>
                                        {patient?.is_high_risk ? 'High risk' : 'Standard'}
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Left Column - Patient Info */}
                        <div className="space-y-4">
                            {/* Contact Information */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Contact information
                                    </h2>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    <InfoRow
                                        label="Phone"
                                        icon={<Phone className="h-3 w-3 text-slate-400" />}
                                        value={patient?.phone_number || 'N/A'}
                                    />
                                    {primaryAddress && (
                                        <>
                                            {primaryAddress.address_line1 && (
                                                <InfoRow
                                                    label="Address"
                                                    icon={<MapPin className="h-3 w-3 text-slate-400" />}
                                                    value={
                                                        <>
                                                            {primaryAddress.address_line1}
                                                            {primaryAddress.address_line2 && `, ${primaryAddress.address_line2}`}
                                                        </>
                                                    }
                                                />
                                            )}
                                            {primaryAddress.city && (
                                                <InfoRow label="City" value={primaryAddress.city} />
                                            )}
                                            {primaryAddress.district && (
                                                <InfoRow label="District" value={primaryAddress.district} />
                                            )}
                                            {primaryAddress.province && (
                                                <InfoRow label="Province" value={primaryAddress.province} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Current Risk Assessment Summary */}
                            {patient?.latest_risk_assessment && (
                                <div className="rounded-md border border-slate-200 bg-white">
                                    <div className="border-b border-slate-200 px-3.5 py-2">
                                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <Shield className="h-3.5 w-3.5 text-rose-500" />
                                            Current Assessment
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        <InfoRow
                                            label="Pregnancies"
                                            value={patient.latest_risk_assessment.number_of_pregnancies || 0}
                                        />
                                        <InfoRow
                                            label="Deliveries"
                                            value={patient.latest_risk_assessment.number_of_deliveries || 0}
                                        />
                                        <InfoRow
                                            label="Contraceptive"
                                            value={patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                        />
                                        {patient.latest_risk_assessment.risk_level && (
                                            <InfoRow
                                                label="Risk Level"
                                                value={<RiskLevelBadge level={patient.latest_risk_assessment.risk_level} />}
                                            />
                                        )}
                                        {patient.latest_risk_assessment.assessment_date && (
                                            <InfoRow
                                                label="Assessed"
                                                value={formatDate(patient.latest_risk_assessment.assessment_date)}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Risk Assessments */}
                        <div className="lg:col-span-2">
                            {/* Header */}
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Risk Assessments
                                        <span className="ml-2 text-xs font-normal text-slate-500">
                                            ({filteredAssessments.length})
                                        </span>
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        History of patient risk assessments
                                    </p>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="mb-4 flex items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search assessments..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Risk Assessments Table */}
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('assessment_date')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date
                                                    {sortField === 'assessment_date' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('risk_level')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Risk Level
                                                    {sortField === 'risk_level' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead>Pregnancies</TableHead>
                                            <TableHead>Deliveries</TableHead>
                                            <TableHead>Contraceptive</TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('assessed_by')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Assessed By
                                                    {sortField === 'assessed_by' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAssessments.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                                                    <Shield className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                                    No risk assessments found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredAssessments.map((assessment) => (
                                                <TableRow key={assessment.id} className="hover:bg-slate-50">
                                                    <TableCell>
                                                        {formatDate(assessment.assessment_date || '')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <RiskLevelBadge level={assessment.risk_level} />
                                                    </TableCell>
                                                    <TableCell>{assessment.number_of_pregnancies || 0}</TableCell>
                                                    <TableCell>{assessment.number_of_deliveries || 0}</TableCell>
                                                    <TableCell>{assessment.long_term_contraceptive_use || 'None'}</TableCell>
                                                    <TableCell>{assessment.assessed_by || '—'}</TableCell>
                                                    <TableCell className="text-right">
                                                        <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors ml-1">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Assessment Modal */}
                <RiskAssessmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddAssessment}
                    patient={patient}
                />
            </div>
        </AppLayout>
    );
}

// components/ReferralModal.tsx
import { useState, useEffect } from 'react';
import {
    Phone,
    User,
    FileText,
    Building,
    AlertCircle,
    Navigation,
    X,
    MapPin,
    Hospital,
    ChevronRight,
    Check,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Http from '@/utils/Http';

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
    risk_level?: 'low' | 'moderate' | 'high' | 'critical';
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

interface Referral {
    id: string;
    referral_date: string;
    referral_type: string;
    source_department: string;
    target_department: string;
    target_facility: string;
    target_facility_code?: string;
    priority: 'routine' | 'urgent' | 'emergency';
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
    reason: string;
    notes?: string;
    referred_by: string;
    accepted_by?: string;
    accepted_date?: string;
    completed_date?: string;
    created_at: string;
    province_code?: string;
    district_code?: string;
}

interface Province {
    id: number;
    name: string;
    code: string;
}

interface District {
    id: number;
    name: string;
    province_id: number;
    code?: string; // Added code field
}

interface Facility {
    id: number;
    name: string;
    type: string;
    district_id: number;
    code?: string; // Added code field
}

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    patient: Patient;
}

// Tab Component
const TabButton = ({
                       active,
                       onClick,
                       icon: Icon,
                       label,
                       step
                   }: {
    active: boolean;
    onClick: () => void;
    icon: any;
    label: string;
    step: number;
}) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative",
            active
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700 border-b-2 border-transparent"
        )}
    >
        <span className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
            active
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-400"
        )}>
            {step}
        </span>
        <Icon className="h-4 w-4" />
        {label}
    </button>
);

export const ReferralModal = ({
                                  isOpen,
                                  onClose,
                                  onSubmit,
                                  patient
                              }: ReferralModalProps) => {
    const [activeTab, setActiveTab] = useState<'details' | 'location'>('details');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data - using codes instead of IDs
    const [formData, setFormData] = useState({
        referral_type: '',
        source_department: '',
        target_department: '',
        priority: 'routine' as Referral['priority'],
        reason: '',
        notes: '',
        referred_by: '',
        province_code: '',
        district_code: '',
        facility_code: '',
    });

    // Location data
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false,
        facilities: false
    });

    // Fetch provinces on mount
    useEffect(() => {
        if (isOpen) {
            fetchProvinces();
        }
    }, [isOpen]);

    // Fetch districts when province changes
    useEffect(() => {
        if (formData.province_code) {
            const selectedProvince = provinces.find(p => p.code === formData.province_code);
            if (selectedProvince) {
                fetchDistricts(selectedProvince.id);
                setFormData(prev => ({ ...prev, district_code: '', facility_code: '' }));
                setFacilities([]);
            }
        }
    }, [formData.province_code]);

    // Fetch facilities when district changes
    useEffect(() => {
        if (formData.district_code) {
            const selectedDistrict = districts.find(d => d.code === formData.district_code);
            if (selectedDistrict) {
                fetchFacilities(selectedDistrict.id);
                setFormData(prev => ({ ...prev, facility_code: '' }));
            }
        }
    }, [formData.district_code]);

    const fetchProvinces = async () => {
        setLoading(prev => ({ ...prev, provinces: true }));
        try {
            const response = await Http.get('/locations/provinces');
            setProvinces(response.data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        } finally {
            setLoading(prev => ({ ...prev, provinces: false }));
        }
    };

    const fetchDistricts = async (provinceId: number) => {
        setLoading(prev => ({ ...prev, districts: true }));
        try {
            const response = await Http.get(`/locations/districts?province_id=${provinceId}`);
            // Add code to districts if not present (use name as code or generate)
            const districtsWithCode = response.data.map((d: any) => ({
                ...d,
                code: d.code || d.name.toLowerCase().replace(/\s+/g, '_')
            }));
            setDistricts(districtsWithCode);
            console.log(response,provinceId)
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(prev => ({ ...prev, districts: false }));
        }
    };

    const fetchFacilities = async (districtId: number) => {
        setLoading(prev => ({ ...prev, facilities: true }));
        try {
            const response = await Http.get(`/locations/facilities?district_id=${districtId}`);
            // Add code to facilities if not present
            const facilitiesWithCode = response.data.map((f: any) => ({
                ...f,
                code: f.code || f.name.toLowerCase().replace(/\s+/g, '_')
            }));
            setFacilities(facilitiesWithCode);
        } catch (error) {
            console.error('Error fetching facilities:', error);
        } finally {
            setLoading(prev => ({ ...prev, facilities: false }));
        }
    };

    const departments = [
        'Gynecology',
        'Oncology',
        'Surgery',
        'Internal Medicine',
        'Pediatrics',
        'Dermatology',
        'Radiology',
        'Cardiology',
        'Neurology',
        'Urology',
        'Emergency',
        'Orthopedics',
        'Ophthalmology',
        'ENT',
        'Psychiatry',
        'Dentistry'
    ];

    const referralTypes = [
        'Consultation',
        'Specialist Review',
        'Diagnostic Imaging',
        'Laboratory Services',
        'Surgical Procedure',
        'Chemotherapy',
        'Radiation Therapy',
        'Rehabilitation',
        'Mental Health',
        'Social Services',
        'Palliative Care',
        'Emergency Transfer'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const selectedFacility = facilities.find(f => f.code === formData.facility_code);
            const selectedDistrict = districts.find(d => d.code === formData.district_code);
            const selectedProvince = provinces.find(p => p.code === formData.province_code);

            const referralData = {
                id: crypto.randomUUID(),
                referral_type: formData.referral_type,
                source_department: formData.source_department,
                target_department: formData.target_department,
                target_facility: selectedFacility?.name || '',
                target_facility_code: formData.facility_code,
                priority: formData.priority,
                reason: formData.reason,
                notes: formData.notes,
                referred_by: formData.referred_by,
                status: 'pending' as Referral['status'],
                referral_date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                province_code: formData.province_code,
                district_code: formData.district_code,
                // Also include the IDs for database storage
                province_id: selectedProvince?.id || null,
                district_id: selectedDistrict?.id || null,
                target_facility_id: selectedFacility?.id || null,
            };

            await onSubmit(referralData);
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error submitting referral:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            referral_type: '',
            source_department: '',
            target_department: '',
            priority: 'routine',
            reason: '',
            notes: '',
            referred_by: '',
            province_code: '',
            district_code: '',
            facility_code: '',
        });
        setDistricts([]);
        setFacilities([]);
        setActiveTab('details');
    };

    const isDetailsValid = () => {
        return (
            formData.referral_type &&
            formData.source_department &&
            formData.target_department &&
            formData.reason &&
            formData.referred_by
        );
    };

    const isLocationValid = () => {
        return (
            formData.province_code &&
            formData.district_code &&
            formData.facility_code
        );
    };

    const canSubmit = () => {
        return isDetailsValid() && isLocationValid();
    };

    // Helper to get display name from code
    const getProvinceName = (code: string) => {
        return provinces.find(p => p.code === code)?.name || code;
    };

    const getDistrictName = (code: string) => {
        return districts.find(d => d.code === code)?.name || code;
    };

    const getFacilityName = (code: string) => {
        return facilities.find(f => f.code === code)?.name || code;
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                <Navigation className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">New Referral</h2>
                                <p className="text-xs text-slate-500">Refer patient to another department or facility</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-md transition-colors">
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 px-6 bg-white flex-shrink-0">
                        <TabButton
                            active={activeTab === 'details'}
                            onClick={() => setActiveTab('details')}
                            icon={FileText}
                            label="Referral Details"
                            step={1}
                        />
                        <TabButton
                            active={activeTab === 'location'}
                            onClick={() => setActiveTab('location')}
                            icon={MapPin}
                            label="Location"
                            step={2}
                        />
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <form id="referral-form" onSubmit={handleSubmit} className="space-y-4">
                            {/* Tab 1: Referral Details */}
                            {activeTab === 'details' && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    {/* Patient Summary */}
                                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-slate-400" />
                                            <div>
                                                <p className="text-xs text-slate-500">Patient</p>
                                                <p className="text-sm font-medium text-slate-900">{patient?.full_name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <div>
                                                <p className="text-xs text-slate-500">Phone</p>
                                                <p className="text-sm font-medium text-slate-900">{patient?.phone_number || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <FileText className="h-3.5 w-3.5 text-slate-400" />
                                                Referral Type *
                                            </label>
                                            <select
                                                required
                                                value={formData.referral_type}
                                                onChange={(e) => setFormData({ ...formData, referral_type: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            >
                                                <option value="">Select type</option>
                                                {referralTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
                                                Priority *
                                            </label>
                                            <select
                                                required
                                                value={formData.priority}
                                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Referral['priority'] })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            >
                                                <option value="routine">Routine</option>
                                                <option value="urgent">Urgent</option>
                                                <option value="emergency">Emergency</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <Building className="h-3.5 w-3.5 text-slate-400" />
                                                Source Department *
                                            </label>
                                            <select
                                                required
                                                value={formData.source_department}
                                                onChange={(e) => setFormData({ ...formData, source_department: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            >
                                                <option value="">Select department</option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <Building className="h-3.5 w-3.5 text-slate-400" />
                                                Target Department *
                                            </label>
                                            <select
                                                required
                                                value={formData.target_department}
                                                onChange={(e) => setFormData({ ...formData, target_department: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            >
                                                <option value="">Select department</option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <User className="h-3.5 w-3.5 text-slate-400" />
                                            Referred By *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.referred_by}
                                            onChange={(e) => setFormData({ ...formData, referred_by: e.target.value })}
                                            placeholder="e.g., Dr. John Doe"
                                            className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <FileText className="h-3.5 w-3.5 text-slate-400" />
                                            Reason for Referral *
                                        </label>
                                        <textarea
                                            rows={2}
                                            required
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            placeholder="Detailed reason for the referral..."
                                            className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <FileText className="h-3.5 w-3.5 text-slate-400" />
                                            Additional Notes
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="Any additional information..."
                                            className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                                        />
                                    </div>

                                    {/* Navigation to next tab */}
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('location')}
                                            disabled={!isDetailsValid()}
                                            className={cn(
                                                "px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2",
                                                isDetailsValid()
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            )}
                                        >
                                            Next: Location
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Tab 2: Location */}
                            {activeTab === 'location' && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                Province *
                                            </label>
                                            <select
                                                required
                                                value={formData.province_code}
                                                onChange={(e) => setFormData({ ...formData, province_code: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                disabled={loading.provinces}
                                            >
                                                <option value="">Select province</option>
                                                {provinces.map((province) => (
                                                    <option key={province.code} value={province.code}>
                                                        {province.name} ({province.code})
                                                    </option>
                                                ))}
                                            </select>
                                            {loading.provinces && (
                                                <p className="text-xs text-slate-400 mt-1">Loading provinces...</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                District *
                                            </label>
                                            <select
                                                required
                                                value={formData.district_code}
                                                onChange={(e) => setFormData({ ...formData, district_code: e.target.value })}
                                                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                disabled={!formData.province_code || loading.districts}
                                            >
                                                <option value="">Select district</option>
                                                {districts.map((district) => (
                                                    <option key={district.code} value={district.code}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {loading.districts && (
                                                <p className="text-xs text-slate-400 mt-1">Loading districts...</p>
                                            )}
                                            {formData.province_code && districts.length === 0 && !loading.districts && (
                                                <p className="text-xs text-amber-600 mt-1">No districts found for this province</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <Hospital className="h-3.5 w-3.5 text-slate-400" />
                                            Target Facility *
                                        </label>
                                        <select
                                            required
                                            value={formData.facility_code}
                                            onChange={(e) => setFormData({ ...formData, facility_code: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                            disabled={!formData.district_code || loading.facilities}
                                        >
                                            <option value="">Select facility</option>
                                            {facilities.map((facility) => (
                                                <option key={facility.code} value={facility.code}>
                                                    {facility.name} ({facility.type})
                                                </option>
                                            ))}
                                        </select>
                                        {loading.facilities && (
                                            <p className="text-xs text-slate-400 mt-1">Loading facilities...</p>
                                        )}
                                        {formData.district_code && facilities.length === 0 && !loading.facilities && (
                                            <p className="text-xs text-amber-600 mt-1">No facilities found for this district</p>
                                        )}
                                    </div>

                                    {/* Selected location summary */}
                                    {formData.province_code && formData.district_code && formData.facility_code && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-green-800">Location Selected</p>
                                                    <p className="text-xs text-green-700">
                                                        {getProvinceName(formData.province_code)} →
                                                        {getDistrictName(formData.district_code)} →
                                                        {getFacilityName(formData.facility_code)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation buttons */}
                                    <div className="flex justify-between pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('details')}
                                            className="px-4 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700 transition-colors"
                                        >
                                            Back to Details
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Patient:</span> {patient?.full_name || 'N/A'}
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-medium text-slate-700">Priority:</span>
                            <Badge className={cn(
                                'ml-1',
                                formData.priority === 'emergency' ? 'bg-rose-100 text-rose-700' :
                                    formData.priority === 'urgent' ? 'bg-amber-100 text-amber-700' :
                                        'bg-slate-100 text-slate-700'
                            )}>
                                {formData.priority}
                            </Badge>
                            {formData.facility_code && (
                                <>
                                    <span className="mx-2 text-slate-300">·</span>
                                    <span className="font-medium text-slate-700">Facility:</span>
                                    <span className="ml-1 text-slate-700">
                                        {getFacilityName(formData.facility_code) || 'Not selected'}
                                    </span>
                                </>
                            )}
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
                                form="referral-form"
                                disabled={!canSubmit() || isSubmitting}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2",
                                    canSubmit() && !isSubmitting
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Navigation className="h-4 w-4" />
                                        Create Referral
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

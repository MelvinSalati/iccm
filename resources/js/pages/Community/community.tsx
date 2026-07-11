// pages/community/index.tsx

import { useState, useEffect, useCallback } from 'react';
import bg from '../assets/images/undraw_code-thinking_tqs9.svg'
import { Head, useForm } from '@inertiajs/react';
import {
    Plus, Eye, Edit, Trash2, MoreVertical, X,
    MapPin, Calendar, Users, Activity, ArrowRight, Check, Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

// ============================================
// TYPES
// ============================================
export interface CommunityOutreachRecord {
    id: number;
    outreach_date: string;
    community_name: string;
    chw_name: string;
    outreach_type: string;
    facility: string;
    services: string[];
    women_reached: number;
    awareness_session_conducted: boolean;
    referred_for_screening: boolean;
    referral_required: boolean;
    referred_facility?: string;
    referral_date?: string;
    referral_outcome?: string;
    referral_status: 'pending' | 'completed' | 'not_required';
    created_at: string;
    updated_at: string;
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
    code?: string;
}

// Service options - Moved outside component to prevent recreation
const SERVICE_OPTIONS = [
    'Cervical Cancer Education',
    'VIA Screening',
    'HPV Vaccination',
    'HIV Testing',
    'Family Planning',
    'Breast Cancer Awareness',
    'Blood Pressure Screening',
    'Blood Sugar Screening',
    'Mental Health Education',
    'Nutrition Education'
];

// ============================================
// DELETE DIALOG COMPONENT
// ============================================
function DeleteCommunityDialog({
                                   open,
                                   onOpenChange,
                                   recordId,
                                   onDelete
                               }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    recordId: number;
    onDelete: (id: number) => void;
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) onOpenChange(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await Http.delete(`/community-outreach/${recordId}`);
            if (response.status === 200 || response.status === 204) {
                onDelete(recordId);
                onOpenChange(false);
                Notiflix.Notify.success('Record deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
            Notiflix.Notify.failure('Failed to delete record');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
            {/*<div className="fixed inset-0 z-50 flex items-center justify-center p-4">*/}
            {/*    <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">*/}
            {/*        <div className="p-6">*/}
            {/*            <div className="flex items-start gap-3">*/}
            {/*                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">*/}
            {/*                    <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />*/}
            {/*                    </svg>*/}
            {/*                </div>*/}
            {/*                <div className="flex-1">*/}
            {/*                    <h3 className="text-lg font-semibold text-gray-900">Delete Outreach Record</h3>*/}
            {/*                    <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-end gap-3 mt-6">*/}
            {/*                <button*/}
            {/*                    onClick={() => onOpenChange(false)}*/}
            {/*                    className="h-9 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"*/}
            {/*                    disabled={isDeleting}*/}
            {/*                >*/}
            {/*                    Cancel*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    onClick={handleDelete}*/}
            {/*                    className="h-9 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2"*/}
            {/*                    disabled={isDeleting}*/}
            {/*                >*/}
            {/*                    {isDeleting ? (*/}
            {/*                        <>*/}
            {/*                            <Loader2 className="h-4 w-4 animate-spin" />*/}
            {/*                            Deleting...*/}
            {/*                        </>*/}
            {/*                    ) : (*/}
            {/*                        'Delete'*/}
            {/*                    )}*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

// ============================================
// TAB 1: METADATA COMPONENT
// ============================================
function MetaDataTab({
                         formData,
                         setFormData,
                         errors,
                         provinces,
                         districts,
                         loading,
                         fetchDistricts
                     }: any) {
    const outreachTypes = ['Market', 'Church', 'School', 'Community Meeting', 'Door to Door', 'Health Fair', 'Other'];

    // Get districts for selected province
    const availableDistricts = formData.province_code ? (districts[formData.province_code] || []) : [];

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Type of Outreach <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.outreach_type}
                        onChange={e => setFormData({...formData, outreach_type: e.target.value})}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="">Select type</option>
                        {outreachTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.outreach_type && <p className="text-[10px] text-red-500 mt-0.5">{errors.outreach_type}</p>}
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date Conducted <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={formData.outreach_date}
                        onChange={e => setFormData({...formData, outreach_date: e.target.value})}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.outreach_date && <p className="text-[10px] text-red-500 mt-0.5">{errors.outreach_date}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Province <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.province_code || ''}
                        onChange={e => {
                            const provinceCode = e.target.value;
                            setFormData({
                                ...formData,
                                province_code: provinceCode,
                                district_code: ''
                            });
                            if (provinceCode) {
                                const selectedProvince = provinces.find((p: any) => p.code === provinceCode);
                                if (selectedProvince) {
                                    fetchDistricts(selectedProvince.id);
                                }
                            }
                        }}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        disabled={loading.provinces}
                    >
                        <option value="">Select province</option>
                        {provinces.map((province: any) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {errors.province_code && <p className="text-[10px] text-red-500 mt-0.5">{errors.province_code}</p>}
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        District <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.district_code || ''}
                        onChange={e => setFormData({...formData, district_code: e.target.value})}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        disabled={!formData.province_code || loading.districts}
                    >
                        <option value="">{formData.province_code ? 'Select district' : 'Select province first'}</option>
                        {availableDistricts.map((district: any) => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    {errors.district_code && <p className="text-[10px] text-red-500 mt-0.5">{errors.district_code}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                    Community/Place Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.community_name}
                    onChange={e => setFormData({...formData, community_name: e.target.value})}
                    placeholder="Enter community or place name"
                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.community_name && <p className="text-[10px] text-red-500 mt-0.5">{errors.community_name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        CHW Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.chw_name}
                        onChange={e => setFormData({...formData, chw_name: e.target.value})}
                        placeholder="Enter CHW name"
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.chw_name && <p className="text-[10px] text-red-500 mt-0.5">{errors.chw_name}</p>}
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Facility <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.facility}
                        onChange={e => setFormData({...formData, facility: e.target.value})}
                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="">Select facility</option>
                        <option value="Facility A">Facility A</option>
                        <option value="Facility B">Facility B</option>
                        <option value="Facility C">Facility C</option>
                    </select>
                    {errors.facility && <p className="text-[10px] text-red-500 mt-0.5">{errors.facility}</p>}
                </div>
            </div>
        </div>
    );
}

// ============================================
// TAB 2: SERVICES COMPONENT - FIXED
// ============================================
function ServicesTab({ formData, setFormData, errors }: any) {
    const [initialized, setInitialized] = useState(false);

    // Initialize services only once
    useEffect(() => {
        if (!initialized && formData.services.length === 0) {
            setFormData((prev: any) => ({
                ...prev,
                services: SERVICE_OPTIONS.map(s => ({ name: s, count: 0, selected: false }))
            }));
            setInitialized(true);
        }
    }, [initialized, formData.services.length, setFormData]);

    const toggleService = (serviceName: string) => {
        setFormData((prev: any) => ({
            ...prev,
            services: prev.services.map((s: any) =>
                s.name === serviceName ? { ...s, selected: !s.selected, count: !s.selected ? (s.count || 1) : 0 } : s
            )
        }));
    };

    const updateServiceCount = (serviceName: string, count: number) => {
        setFormData((prev: any) => ({
            ...prev,
            services: prev.services.map((s: any) =>
                s.name === serviceName ? { ...s, count: Math.max(0, count) } : s
            )
        }));
    };

    const totalBeneficiaries = formData.services.reduce((sum: number, s: any) => {
        return s.selected ? sum + (s.count || 0) : sum;
    }, 0);

    const selectedCount = formData.services.filter((s: any) => s.selected).length;

    return (
        <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">
                        {selectedCount} service{selectedCount !== 1 ? 's' : ''} selected
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Total:</span>
                    <span className="text-lg font-bold text-blue-600">{totalBeneficiaries}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.services.map((service: any) => (
                    <div key={service.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <input
                            type="checkbox"
                            checked={service.selected || false}
                            onChange={() => toggleService(service.name)}
                            className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="flex-1 text-xs font-medium text-gray-700 cursor-pointer">
                            {service.name}
                        </label>
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                min="0"
                                value={service.count || 0}
                                onChange={(e) => updateServiceCount(service.name, Number(e.target.value))}
                                disabled={!service.selected}
                                className={`w-14 h-7 px-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 ${
                                    service.selected
                                        ? 'border-gray-300 bg-white'
                                        : 'border-gray-200 bg-gray-100 text-gray-400'
                                }`}
                                placeholder="0"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {errors.services && <p className="text-[10px] text-red-500 mt-0.5">{errors.services}</p>}

            {selectedCount === 0 && (
                <div className="text-center py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Activity className="h-6 w-6 text-gray-300 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Select at least one service</p>
                </div>
            )}
        </div>
    );
}

// ============================================
// COMMUNITY OUTREACH MODAL
// ============================================
function CommunityOutreachModal({
                                    open,
                                    onOpenChange,
                                    editingRecord,
                                    onSave
                                }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingRecord?: CommunityOutreachRecord | null;
    onSave: (data: any) => void;
}) {
    const [activeTab, setActiveTab] = useState<'metadata' | 'services'>('metadata');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<Record<string, District[]>>({});
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false
    });

    const [formData, setFormData] = useState({
        outreach_date: editingRecord?.outreach_date || new Date().toISOString().split('T')[0],
        outreach_type: editingRecord?.outreach_type || '',
        community_name: editingRecord?.community_name || '',
        chw_name: editingRecord?.chw_name || '',
        facility: editingRecord?.facility || '',
        province_code: '',
        district_code: '',
        services: editingRecord?.services?.map(s => ({ name: s, count: 0, selected: false })) || [],
        women_reached: editingRecord?.women_reached || 0,
        awareness_session_conducted: editingRecord?.awareness_session_conducted || false,
        referred_for_screening: editingRecord?.referred_for_screening || false,
        referral_required: editingRecord?.referral_required || false,
        referred_facility: editingRecord?.referred_facility || '',
        referral_date: editingRecord?.referral_date || '',
        referral_outcome: editingRecord?.referral_outcome || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fetch provinces when modal opens
    useEffect(() => {
        if (open) {
            fetchProvinces();
        }
    }, [open]);

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
            const province = provinces.find(p => p.id === provinceId);
            if (province) {
                setDistricts(prev => ({
                    ...prev,
                    [province.code]: response.data.map((d: any) => ({
                        ...d,
                        code: d.code || d.name.toLowerCase().replace(/\s+/g, '_')
                    }))
                }));
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(prev => ({ ...prev, districts: false }));
        }
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) onOpenChange(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    // Handle body overflow
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    // Update form when editing record changes
    useEffect(() => {
        if (editingRecord) {
            setFormData({
                outreach_date: editingRecord.outreach_date || new Date().toISOString().split('T')[0],
                outreach_type: editingRecord.outreach_type || '',
                community_name: editingRecord.community_name || '',
                chw_name: editingRecord.chw_name || '',
                facility: editingRecord.facility || '',
                province_code: '',
                district_code: '',
                services: editingRecord.services?.map(s => ({ name: s, count: 0, selected: false })) || [],
                women_reached: editingRecord.women_reached || 0,
                awareness_session_conducted: editingRecord.awareness_session_conducted || false,
                referred_for_screening: editingRecord.referred_for_screening || false,
                referral_required: editingRecord.referral_required || false,
                referred_facility: editingRecord.referred_facility || '',
                referral_date: editingRecord.referral_date || '',
                referral_outcome: editingRecord.referral_outcome || '',
            });
            // Reset services initialization flag in ServicesTab
            setInitialized(false);
        }
    }, [editingRecord]);

    // Track initialization for services
    const [initialized, setInitialized] = useState(false);

    const validateMetadata = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.outreach_date) newErrors.outreach_date = 'Required';
        if (!formData.outreach_type) newErrors.outreach_type = 'Required';
        if (!formData.community_name.trim()) newErrors.community_name = 'Required';
        if (!formData.chw_name.trim()) newErrors.chw_name = 'Required';
        if (!formData.facility) newErrors.facility = 'Required';
        if (!formData.province_code) newErrors.province_code = 'Required';
        if (!formData.district_code) newErrors.district_code = 'Required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateServices = () => {
        const newErrors: Record<string, string> = {};
        const hasSelected = formData.services.some((s: any) => s.selected);
        if (!hasSelected) newErrors.services = 'Select at least one service';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTabChange = (tab: 'metadata' | 'services') => {
        if (tab === 'services' && !validateMetadata()) {
            return;
        }
        setActiveTab(tab);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateMetadata()) {
            setActiveTab('metadata');
            return;
        }

        if (!validateServices()) {
            setActiveTab('services');
            return;
        }

        setIsSubmitting(true);

        try {
            const selectedServices = formData.services
                .filter((s: any) => s.selected)
                .map((s: any) => s.name);

            const serviceCounts = formData.services
                .filter((s: any) => s.selected)
                .reduce((acc: any, s: any) => {
                    acc[s.name] = s.count || 0;
                    return acc;
                }, {});

            let referral_status: 'pending' | 'completed' | 'not_required' = 'not_required';
            if (formData.referral_required) {
                referral_status = formData.referral_outcome ? 'completed' : 'pending';
            }

            const payload = {
                ...formData,
                services: selectedServices,
                service_counts: serviceCounts,
                referral_date: formData.referral_date || null,
                referral_status,
                total_beneficiaries: formData.services
                    .filter((s: any) => s.selected)
                    .reduce((sum: number, s: any) => sum + (s.count || 0), 0),
            };

            const url = editingRecord
                ? `/community-outreach/${editingRecord.id}`
                : '/community-outreach';

            const method = editingRecord ? 'put' : 'post';

            let response;
            if (method === 'post') {
                response = await Http.post(url, payload);
            } else {
                response = await Http.put(url, payload);
            }

            if (response.status === 200 || response.status === 201) {
                Notiflix.Notify.success(
                    editingRecord ? 'Record updated successfully!' : 'Record created successfully!'
                );
                onSave(payload);
                onOpenChange(false);
            }
        } catch (error: any) {
            console.error('Error saving record:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save record');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">

                    <div className="flex-shrink-0 border-b px-4 py-2.5 bg-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    {editingRecord ? 'Edit Outreach Record' : 'New Community Outreach'}
                                </h2>
                                <p className="text-[10px] text-gray-500">
                                    {editingRecord ? 'Update existing outreach record' : 'Record new community outreach activity'}
                                </p>
                            </div>
                            <button onClick={() => onOpenChange(false)} className="rounded p-1 hover:bg-gray-100">
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-shrink-0 px-4 pt-2 border-b border-gray-200">
                        <div className="flex gap-1">
                            <button
                                onClick={() => handleTabChange('metadata')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
                                    activeTab === 'metadata'
                                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Metadata
                                </div>
                            </button>
                            <button
                                onClick={() => handleTabChange('services')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
                                    activeTab === 'services'
                                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-1.5">
                                    <Activity className="h-3.5 w-3.5" />
                                    Services
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-3">
                        {activeTab === 'metadata' ? (
                            <MetaDataTab
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                                provinces={provinces}
                                districts={districts}
                                loading={loading}
                                fetchDistricts={fetchDistricts}
                            />
                        ) : (
                            <ServicesTab
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                            />
                        )}
                    </div>

                    <div className="flex-shrink-0 border-t px-4 py-2.5 bg-gray-50 rounded-b-lg flex justify-between items-center">
                        <div className="text-[10px] text-gray-500">
                            {activeTab === 'metadata' ? 'Step 1 of 2' : 'Step 2 of 2'}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="h-7 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            {activeTab === 'metadata' ? (
                                <button
                                    type="button"
                                    onClick={() => handleTabChange('services')}
                                    className="h-7 px-3 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-1.5"
                                >
                                    Next
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="h-7 px-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 flex items-center gap-1.5"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ============================================
// TABLE COMPONENT
// ============================================
function CommunityOutreachTable({
                                    records,
                                    onEdit,
                                    onDelete
                                }: {
    records: CommunityOutreachRecord[];
    onEdit: (record: CommunityOutreachRecord) => void;
    onDelete: (id: number) => void;
}) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            not_required: 'bg-gray-100 text-gray-800'
        };
        return colors[status as keyof typeof colors] || colors.not_required;
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            pending: 'Pending',
            completed: 'Completed',
            not_required: 'Not Required'
        };
        return labels[status as keyof typeof labels] || status;
    };

    return (
        <>
            {/*<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">*/}
            {/*    <div className="overflow-x-auto">*/}
            {/*        <table className="min-w-full divide-y divide-gray-200">*/}
            {/*            <thead className="bg-gray-50">*/}
            {/*            <tr>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Community</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">CHW</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Facility</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Services</th>*/}
            {/*                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Women</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Referral</th>*/}
            {/*                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>*/}
            {/*                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-12">Actions</th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody className="bg-white divide-y divide-gray-200">*/}
            {/*            {records.length === 0 ? (*/}
            {/*                <tr>*/}
            {/*                    <td colSpan={10} className="px-3 py-8 text-center text-sm text-gray-500">No records found</td>*/}
            {/*                </tr>*/}
            {/*            ) : (*/}
            {/*                records.map(record => (*/}
            {/*                    <tr key={record.id} className="hover:bg-gray-50">*/}
            {/*                        <td className="px-3 py-2 text-sm">{format(new Date(record.outreach_date), 'MMM d, yyyy')}</td>*/}
            {/*                        <td className="px-3 py-2 text-sm font-medium">{record.community_name}</td>*/}
            {/*                        <td className="px-3 py-2 text-sm">{record.chw_name}</td>*/}
            {/*                        <td className="px-3 py-2 text-sm">{record.outreach_type}</td>*/}
            {/*                        <td className="px-3 py-2 text-sm">{record.facility}</td>*/}
            {/*                        <td className="px-3 py-2">*/}
            {/*                            <div className="flex flex-wrap gap-1">*/}
            {/*                                {record.services.slice(0, 2).map(s => (*/}
            {/*                                    <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 rounded">{s.length > 15 ? s.slice(0, 15)+'...' : s}</span>*/}
            {/*                                ))}*/}
            {/*                                {record.services.length > 2 && (*/}
            {/*                                    <span className="px-2 py-0.5 text-xs border rounded">+{record.services.length - 2}</span>*/}
            {/*                                )}*/}
            {/*                            </div>*/}
            {/*                        </td>*/}
            {/*                        <td className="px-3 py-2 text-sm text-right">{record.women_reached}</td>*/}
            {/*                        <td className="px-3 py-2 text-sm">{record.referred_for_screening ? 'Yes' : 'No'}</td>*/}
            {/*                        <td className="px-3 py-2">*/}
            {/*                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(record.referral_status)}`}>*/}
            {/*                                    {getStatusLabel(record.referral_status)}*/}
            {/*                                </span>*/}
            {/*                        </td>*/}
            {/*                        <td className="px-3 py-2 text-right relative">*/}
            {/*                            <button onClick={() => setDropdownOpen(dropdownOpen === record.id ? null : record.id)} className="p-1 rounded hover:bg-gray-100">*/}
            {/*                                <MoreVertical className="h-4 w-4 text-gray-500" />*/}
            {/*                            </button>*/}
            {/*                            {dropdownOpen === record.id && (*/}
            {/*                                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10">*/}
            {/*                                    <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">*/}
            {/*                                        <Eye className="h-3.5 w-3.5" /> View*/}
            {/*                                    </button>*/}
            {/*                                    <button onClick={() => { onEdit(record); setDropdownOpen(null); }} className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">*/}
            {/*                                        <Edit className="h-3.5 w-3.5" /> Edit*/}
            {/*                                    </button>*/}
            {/*                                    <button onClick={() => { setDeleteId(record.id); setDropdownOpen(null); }} className="w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">*/}
            {/*                                        <Trash2 className="h-3.5 w-3.5" /> Delete*/}
            {/*                                    </button>*/}
            {/*                                </div>*/}
            {/*                            )}*/}
            {/*                        </td>*/}
            {/*                    </tr>*/}
            {/*                ))*/}
            {/*            )}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>
    );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
interface CommunityPageProps {
    records: CommunityOutreachRecord[];
}

export default function CommunityPage({ records: initialRecords = [] }: CommunityPageProps) {
    const [records, setRecords] = useState<CommunityOutreachRecord[]>(initialRecords);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CommunityOutreachRecord | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setRecords(initialRecords);
    }, [initialRecords]);

    const handleSave = useCallback(async (formData: any) => {
        setIsSaving(true);
        try {
            // Prepare services data
            const selectedServices = formData.services
                .filter((s: any) => s.selected)
                .map((s: any) => s.name);

            const serviceCounts = formData.services
                .filter((s: any) => s.selected)
                .reduce((acc: any, s: any) => {
                    acc[s.name] = s.count || 0;
                    return acc;
                }, {});

            const totalBeneficiaries = formData.services
                .filter((s: any) => s.selected)
                .reduce((sum: number, s: any) => sum + (s.count || 0), 0);

            const facilityId = formData.facility || 'default';

            // Prepare aggregate data
            const aggregateData = {
                facility_id: facilityId,
                total_participants: totalBeneficiaries,
                cervical_education: selectedServices.includes('Cervical Cancer Education')
                    ? (serviceCounts['Cervical Cancer Education'] || 0) : 0,
                breast_education: selectedServices.includes('Breast Cancer Awareness')
                    ? (serviceCounts['Breast Cancer Awareness'] || 0) : 0,
                family_planning_education: selectedServices.includes('Family Planning')
                    ? (serviceCounts['Family Planning'] || 0) : 0,
                nutrition_education: selectedServices.includes('Nutrition Education')
                    ? (serviceCounts['Nutrition Education'] || 0) : 0,
                cervical_screening: selectedServices.includes('VIA Screening')
                    ? (serviceCounts['VIA Screening'] || 0) : 0,
                hiv_screening: selectedServices.includes('HIV Testing')
                    ? (serviceCounts['HIV Testing'] || 0) : 0,
                referrals_made: formData.referred_for_screening ? 1 : 0,
                referrals_completed: formData.referral_status === 'completed' ? 1 : 0,
                follow_ups_completed: formData.referral_outcome ? 1 : 0,
                total_females: formData.women_reached || 0,
                notes: formData.community_name
                    ? `Outreach at ${formData.community_name} - ${formData.outreach_type}`
                    : null,
                assessment_date: formData.outreach_date || new Date().toISOString().split('T')[0],
                status: 'submitted'
            };

            // Send to server
            const response = await Http.post('/community/engagement', aggregateData);

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Community outreach data saved successfully!');
            }

            // Update local records
            if (editingRecord) {
                setRecords(prev => prev.map(r =>
                    r.id === editingRecord.id
                        ? { ...r, ...formData, id: r.id, created_at: r.created_at, updated_at: new Date().toISOString() }
                        : r
                ));
            } else {
                const newRecord: CommunityOutreachRecord = {
                    id: Date.now(),
                    ...formData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                setRecords(prev => [newRecord, ...prev]);
            }

            setIsModalOpen(false);
            setEditingRecord(null);

        } catch (error: any) {
            console.error('Error saving data:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save data');
        } finally {
            setIsSaving(false);
        }
    }, [editingRecord]);

    const handleDelete = useCallback((id: number) => {
        setRecords(prev => prev.filter(r => r.id !== id));
        Notiflix.Notify.success('Record deleted successfully');
    }, []);

    const handleEdit = useCallback((record: CommunityOutreachRecord) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    }, []);

    return (
        <>
            <Head title="Community Engagement" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between p-2">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Community Outreach</h1>
                        <p className="text-sm text-gray-500">Manage community outreach and engagement records</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingRecord(null);
                            setIsModalOpen(true);
                        }}
                        className="h-9 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
                        disabled={isSaving}
                    >
                        <Plus className="h-4 w-4" /> New Outreach
                    </button>
                </div>

                <CommunityOutreachTable
                    records={records}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <CommunityOutreachModal
                    open={isModalOpen}
                    onOpenChange={() => {
                        setIsModalOpen(false);
                        setEditingRecord(null);
                    }}
                    editingRecord={editingRecord}
                    onSave={handleSave}
                />

                {/*<img src={bg} style={{width:600}}/>*/}
            </div>
        </>
    );
}

CommunityPage.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard() }, { title: 'Community Engagement', href: '/community' }]}>
        {page}
    </AppLayout>
);

import { useState, useEffect, useCallback } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Plus, Eye, Edit, Trash2, MoreVertical, X,
    MapPin, Calendar, Users, Activity, ArrowRight, Check, Loader2,
    User, UserPlus, Female, Male
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
    province_code?: string;
    district_code?: string;
    services: string[];
    service_counts?: Record<string, number>;
    women_reached: number;
    men_reached: number;
    total_beneficiaries: number;
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

// Service options
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
// COMMUNITY OUTREACH PAGE
// ============================================
export default function CommunityOutreach({ records: initialRecords = [] }: { records?: CommunityOutreachRecord[] }) {
    const [records, setRecords] = useState<CommunityOutreachRecord[]>(initialRecords);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CommunityOutreachRecord | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<Record<string, District[]>>({});
    const [loading, setLoading] = useState({ provinces: false, districts: false });
    const [activeTab, setActiveTab] = useState<'metadata' | 'services'>('metadata');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Form state
    const [formData, setFormData] = useState({
        outreach_date: new Date().toISOString().split('T')[0],
        outreach_type: '',
        community_name: '',
        chw_name: '',
        facility: '',
        province_code: '',
        district_code: '',
        services: SERVICE_OPTIONS.map(s => ({ name: s, count: 0, selected: false })),
        women_reached: 0,
        men_reached: 0,
        awareness_session_conducted: false,
        referred_for_screening: false,
        referral_required: false,
        referred_facility: '',
        referral_date: '',
        referral_outcome: '',
        referral_status: 'not_required' as 'pending' | 'completed' | 'not_required',
    });

    // Fetch provinces
    useEffect(() => {
        fetchProvinces();
    }, []);

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

    const validateMetadata = () => {
        const errors: Record<string, string> = {};
        if (!formData.outreach_date) errors.outreach_date = 'Required';
        if (!formData.outreach_type) errors.outreach_type = 'Required';
        if (!formData.community_name.trim()) errors.community_name = 'Required';
        if (!formData.chw_name.trim()) errors.chw_name = 'Required';
        if (!formData.facility) errors.facility = 'Required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateServices = () => {
        const errors: Record<string, string> = {};
        const hasSelected = formData.services.some(s => s.selected);
        if (!hasSelected) errors.services = 'Select at least one service';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
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

        setIsLoading(true);

        try {
            const selectedServices = formData.services
                .filter(s => s.selected)
                .map(s => s.name);

            const serviceCounts = formData.services
                .filter(s => s.selected)
                .reduce((acc, s) => {
                    acc[s.name] = s.count || 0;
                    return acc;
                }, {} as Record<string, number>);

            const totalBeneficiaries = formData.women_reached + formData.men_reached;

            const payload = {
                outreach_date: formData.outreach_date,
                outreach_type: formData.outreach_type,
                community_name: formData.community_name,
                chw_name: formData.chw_name,
                facility: formData.facility,
                province_code: formData.province_code,
                district_code: formData.district_code,
                services: selectedServices,
                service_counts: serviceCounts,
                women_reached: formData.women_reached,
                men_reached: formData.men_reached,
                total_beneficiaries: totalBeneficiaries,
                awareness_session_conducted: formData.awareness_session_conducted,
                referred_for_screening: formData.referred_for_screening,
                referral_required: formData.referral_required,
                referred_facility: formData.referred_facility || null,
                referral_date: formData.referral_date || null,
                referral_outcome: formData.referral_outcome || null,
                referral_status: formData.referral_required
                    ? (formData.referral_outcome ? 'completed' : 'pending')
                    : 'not_required',
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

                // Refresh records
                const refreshResponse = await Http.get('/community-outreach');
                if (refreshResponse.data?.data) {
                    setRecords(refreshResponse.data.data);
                }

                setIsModalOpen(false);
                resetForm();
            }
        } catch (error: any) {
            console.error('Error saving record:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to save record');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            outreach_date: new Date().toISOString().split('T')[0],
            outreach_type: '',
            community_name: '',
            chw_name: '',
            facility: '',
            province_code: '',
            district_code: '',
            services: SERVICE_OPTIONS.map(s => ({ name: s, count: 0, selected: false })),
            women_reached: 0,
            men_reached: 0,
            awareness_session_conducted: false,
            referred_for_screening: false,
            referral_required: false,
            referred_facility: '',
            referral_date: '',
            referral_outcome: '',
            referral_status: 'not_required',
        });
        setFormErrors({});
        setActiveTab('metadata');
        setEditingRecord(null);
    };

    const handleEdit = (record: CommunityOutreachRecord) => {
        setEditingRecord(record);
        setFormData({
            outreach_date: record.outreach_date || new Date().toISOString().split('T')[0],
            outreach_type: record.outreach_type || '',
            community_name: record.community_name || '',
            chw_name: record.chw_name || '',
            facility: record.facility || '',
            province_code: record.province_code || '',
            district_code: record.district_code || '',
            services: SERVICE_OPTIONS.map(s => ({
                name: s,
                count: record.service_counts?.[s] || 0,
                selected: record.services?.includes(s) || false
            })),
            women_reached: record.women_reached || 0,
            men_reached: record.men_reached || 0,
            awareness_session_conducted: record.awareness_session_conducted || false,
            referred_for_screening: record.referred_for_screening || false,
            referral_required: record.referral_required || false,
            referred_facility: record.referred_facility || '',
            referral_date: record.referral_date || '',
            referral_outcome: record.referral_outcome || '',
            referral_status: record.referral_status || 'not_required',
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        try {
            await Http.delete(`/community-outreach/${id}`);
            Notiflix.Notify.success('Record deleted successfully');
            setRecords(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting record:', error);
            Notiflix.Notify.failure('Failed to delete record');
        }
    };

    return (
        <>
            <Head title="Community Outreach" />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between p-2">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Community Outreach</h1>
                        <p className="text-sm text-gray-500">Manage community outreach and engagement records</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="h-9 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" /> New Outreach
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Total Outreaches</span>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{records.length}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Women Reached</span>
                            <Female className="h-4 w-4 text-pink-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{records.reduce((sum, r) => sum + r.women_reached, 0)}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Men Reached</span>
                            <Male className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{records.reduce((sum, r) => sum + r.men_reached, 0)}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Total Beneficiaries</span>
                            <Users className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">
                            {records.reduce((sum, r) => sum + r.total_beneficiaries, 0)}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Community</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">CHW</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Women</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Men</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-12">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {records.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No records found
                                    </td>
                                </tr>
                            ) : (
                                records.map(record => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm">
                                            {format(new Date(record.outreach_date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-3 py-2 text-sm font-medium">{record.community_name}</td>
                                        <td className="px-3 py-2 text-sm">{record.chw_name}</td>
                                        <td className="px-3 py-2 text-sm">{record.outreach_type}</td>
                                        <td className="px-3 py-2 text-sm">{record.women_reached}</td>
                                        <td className="px-3 py-2 text-sm">{record.men_reached}</td>
                                        <td className="px-3 py-2 text-sm font-semibold">{record.total_beneficiaries}</td>
                                        <td className="px-3 py-2">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                                                    record.referral_status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : record.referral_status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {record.referral_status.charAt(0).toUpperCase() + record.referral_status.slice(1)}
                                                </span>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleEdit(record)}
                                                    className="p-1 rounded hover:bg-gray-100"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(record.id)}
                                                    className="p-1 rounded hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                            {/* Header */}
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
                                    <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="rounded p-1 hover:bg-gray-100">
                                        <X className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
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

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-4 py-3">
                                {activeTab === 'metadata' ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Outreach Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.outreach_date}
                                                    onChange={e => setFormData({...formData, outreach_date: e.target.value})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                                {formErrors.outreach_date && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.outreach_date}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Outreach Type <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={formData.outreach_type}
                                                    onChange={e => setFormData({...formData, outreach_type: e.target.value})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="Market">Market</option>
                                                    <option value="Church">Church</option>
                                                    <option value="School">School</option>
                                                    <option value="Community Meeting">Community Meeting</option>
                                                    <option value="Door to Door">Door to Door</option>
                                                    <option value="Health Fair">Health Fair</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {formErrors.outreach_type && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.outreach_type}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Community Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.community_name}
                                                onChange={e => setFormData({...formData, community_name: e.target.value})}
                                                placeholder="Enter community name"
                                                className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            />
                                            {formErrors.community_name && (
                                                <p className="text-[10px] text-red-500 mt-0.5">{formErrors.community_name}</p>
                                            )}
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
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                                {formErrors.chw_name && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.chw_name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Facility <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.facility}
                                                    onChange={e => setFormData({...formData, facility: e.target.value})}
                                                    placeholder="Enter facility name"
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                                {formErrors.facility && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.facility}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Women Reached</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={formData.women_reached}
                                                    onChange={e => setFormData({...formData, women_reached: Number(e.target.value)})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Men Reached</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={formData.men_reached}
                                                    onChange={e => setFormData({...formData, men_reached: Number(e.target.value)})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Awareness Session Conducted
                                                </label>
                                                <select
                                                    value={String(formData.awareness_session_conducted)}
                                                    onChange={e => setFormData({...formData, awareness_session_conducted: e.target.value === 'true'})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Referred for Screening
                                                </label>
                                                <select
                                                    value={String(formData.referred_for_screening)}
                                                    onChange={e => setFormData({...formData, referred_for_screening: e.target.value === 'true'})}
                                                    className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="border-t pt-3">
                                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Referral Information</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Referral Required
                                                    </label>
                                                    <select
                                                        value={String(formData.referral_required)}
                                                        onChange={e => {
                                                            const val = e.target.value === 'true';
                                                            setFormData({
                                                                ...formData,
                                                                referral_required: val,
                                                                referral_status: val ? 'pending' : 'not_required'
                                                            });
                                                        }}
                                                        className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                                                    >
                                                        <option value="false">No</option>
                                                        <option value="true">Yes</option>
                                                    </select>
                                                </div>
                                                {formData.referral_required && (
                                                    <>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                Referral Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={formData.referral_date}
                                                                onChange={e => setFormData({...formData, referral_date: e.target.value})}
                                                                className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                Referral Outcome
                                                            </label>
                                                            <select
                                                                value={formData.referral_outcome}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    setFormData({
                                                                        ...formData,
                                                                        referral_outcome: val,
                                                                        referral_status: val ? 'completed' : 'pending'
                                                                    });
                                                                }}
                                                                className="w-full h-8 px-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                                                            >
                                                                <option value="">Select outcome</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="Pending">Pending</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                            </select>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Users className="h-4 w-4 text-blue-600" />
                                                <span className="text-xs font-medium text-gray-700">
                                                    {formData.services.filter(s => s.selected).length} service(s) selected
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">Total:</span>
                                                <span className="text-lg font-bold text-blue-600">
                                                    {formData.services.reduce((sum, s) => s.selected ? sum + (s.count || 0) : sum, 0)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {formData.services.map((service, index) => (
                                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={service.selected}
                                                        onChange={() => {
                                                            const newServices = [...formData.services];
                                                            newServices[index].selected = !newServices[index].selected;
                                                            if (!newServices[index].selected) {
                                                                newServices[index].count = 0;
                                                            }
                                                            setFormData({...formData, services: newServices});
                                                        }}
                                                        className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <label className="flex-1 text-xs font-medium text-gray-700 cursor-pointer">
                                                        {service.name}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={service.count || 0}
                                                        onChange={(e) => {
                                                            const newServices = [...formData.services];
                                                            newServices[index].count = Number(e.target.value);
                                                            setFormData({...formData, services: newServices});
                                                        }}
                                                        disabled={!service.selected}
                                                        className={`w-14 h-7 px-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 ${
                                                            service.selected
                                                                ? 'border-gray-300 bg-white'
                                                                : 'border-gray-200 bg-gray-100 text-gray-400'
                                                        }`}
                                                        placeholder="0"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {formErrors.services && (
                                            <p className="text-[10px] text-red-500 mt-0.5">{formErrors.services}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex-shrink-0 border-t px-4 py-2.5 bg-gray-50 rounded-b-lg flex justify-between items-center">
                                <div className="text-[10px] text-gray-500">
                                    {activeTab === 'metadata' ? 'Step 1 of 2' : 'Step 2 of 2'}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                                        className="h-7 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        disabled={isLoading}
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
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
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
                )}
            </div>
        </>
    );
}

CommunityOutreach.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard() }, { title: 'Community Outreach', href: '/community-outreach' }]}>
        {page}
    </AppLayout>
);

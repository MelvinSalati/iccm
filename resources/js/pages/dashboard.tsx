// resources/js/pages/community-outreach/index.tsx

import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import {
    Plus,
    Edit,
    Trash2,
    X,
    MapPin,
    Users,
    Activity,
    ArrowRight,
    Loader2,
    User,
    UserCircle,
    Calendar,
    Search,
    Filter,
    Eye,
    Building2,
    Stethoscope,
    CheckSquare,
    UserPlus,
    UsersRound
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
    men_reached: number;
    total_beneficiaries: number;
    awareness_session_conducted: boolean;
    referred_for_screening: boolean;
    referral_required: boolean;
    referred_facility?: string;
    referral_date?: string;
    referral_outcome?: string;
    referral_status: 'pending' | 'completed' | 'not_required';
    male_engagement: number; // New field
    created_at: string;
    updated_at: string;
}

// Service options
const SERVICE_OPTIONS = [
    'Cervical Cancer Education',
    'HPV Vaccination',
    'Blood Pressure Screening',
    'Blood Sugar Screening',
    'Mental Health Awareness'
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function CommunityOutreach({ records: initialRecords = [] }: { records?: CommunityOutreachRecord[] }) {
    const [records, setRecords] = useState<CommunityOutreachRecord[]>(initialRecords);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CommunityOutreachRecord | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // ============================================
    // INDIVIDUAL USESTATE FOR EACH INPUT
    // ============================================

    // Outreach Details
    const [outreachDate, setOutreachDate] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [chwName, setChwName] = useState('');
    const [outreachType, setOutreachType] = useState('');
    const [facility, setFacility] = useState('');

    // Services Provided (checkbox array)
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Outputs
    const [referredForScreening, setReferredForScreening] = useState('');
    const [awarenessSessionConducted, setAwarenessSessionConducted] = useState('');

    // Number of People Reached
    const [womenReached, setWomenReached] = useState<number>(0);
    const [menReached, setMenReached] = useState<number>(0);
    const [maleEngagement, setMaleEngagement] = useState<number>(0); // NEW FIELD

    // Referral Information
    const [referralRequired, setReferralRequired] = useState('');
    const [referredFacility, setReferredFacility] = useState('');
    const [referralDate, setReferralDate] = useState('');
    const [referralOutcome, setReferralOutcome] = useState('');

    // ============================================
    // FORM VALIDATION
    // ============================================
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!outreachDate) errors.outreachDate = 'Outreach Date is required';
        if (!communityName.trim()) errors.communityName = 'Community Name is required';
        if (!chwName.trim()) errors.chwName = 'CHW Name is required';
        if (!outreachType) errors.outreachType = 'Outreach Type is required';
        if (!facility) errors.facility = 'Facility is required';
        if (selectedServices.length === 0) errors.selectedServices = 'Select at least one service';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ============================================
    // RESET FORM
    // ============================================
    const resetForm = () => {
        setOutreachDate('');
        setCommunityName('');
        setChwName('');
        setOutreachType('');
        setFacility('');
        setSelectedServices([]);
        setReferredForScreening('');
        setAwarenessSessionConducted('');
        setWomenReached(0);
        setMenReached(0);
        setMaleEngagement(0); // Reset new field
        setReferralRequired('');
        setReferredFacility('');
        setReferralDate('');
        setReferralOutcome('');
        setFormErrors({});
        setEditingRecord(null);
    };

    // ============================================
    // FETCH RECORDS
    // ============================================
    const fetchRecords = async () => {
        try {
            const response = await Http.get('/community-outreach');
            console.log('📊 GET /community-outreach - Response:', response.data);
            if (response.data?.data) {
                setRecords(response.data.data);
            } else if (response.data?.length !== undefined) {
                setRecords(response.data);
            }
        } catch (error) {
            console.error('❌ Error fetching records:', error);
        }
    };

    // ============================================
    // HANDLE EDIT
    // ============================================
    const handleEdit = (record: CommunityOutreachRecord) => {
        setEditingRecord(record);
        setOutreachDate(record.outreach_date || '');
        setCommunityName(record.community_name || '');
        setChwName(record.chw_name || '');
        setOutreachType(record.outreach_type || '');
        setFacility(record.facility || '');
        setSelectedServices(record.services || []);
        setReferredForScreening(record.referred_for_screening ? 'yes' : 'no');
        setAwarenessSessionConducted(record.awareness_session_conducted ? 'yes' : 'no');
        setWomenReached(record.women_reached || 0);
        setMenReached(record.men_reached || 0);
        setMaleEngagement(record.male_engagement || 0); // Edit new field
        setReferralRequired(record.referral_required ? 'yes' : 'no');
        setReferredFacility(record.referred_facility || '');
        setReferralDate(record.referral_date || '');
        setReferralOutcome(record.referral_outcome || '');
        setIsModalOpen(true);
    };

    // ============================================
    // HANDLE DELETE
    // ============================================
    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        try {
            console.log('🗑️ DELETE /community-outreach/' + id);
            await Http.delete(`/community-outreach/${id}`);
            Notiflix.Notify.success('Record deleted successfully');
            setRecords(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting record:', error);
            Notiflix.Notify.failure('Failed to delete record');
        }
    };

    // ============================================
    // TOGGLE SERVICE SELECTION
    // ============================================
    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    // ============================================
    // HANDLE SUBMIT
    // ============================================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            Notiflix.Notify.warning('Please fix the highlighted fields');
            return;
        }

        setIsLoading(true);

        try {
            const totalBeneficiaries = (womenReached || 0) + (menReached || 0);

            const payload = {
                outreach_date: outreachDate,
                outreach_type: outreachType,
                community_name: communityName,
                chw_name: chwName,
                facility: facility,
                services: selectedServices,
                women_reached: womenReached || 0,
                men_reached: menReached || 0,
                male_engagement: maleEngagement || 0, // NEW FIELD
                total_beneficiaries: totalBeneficiaries,
                awareness_session_conducted: awarenessSessionConducted === 'yes',
                referred_for_screening: referredForScreening === 'yes',
                referral_required: referralRequired === 'yes',
                referred_facility: referralRequired === 'yes' ? referredFacility : null,
                referral_date: referralRequired === 'yes' ? referralDate : null,
                referral_outcome: referralRequired === 'yes' ? referralOutcome : null,
                referral_status: referralRequired === 'yes'
                    ? (referralOutcome ? 'completed' : 'pending')
                    : 'not_required',
            };

            const url = editingRecord
                ? `/community-outreach/${editingRecord.id}`
                : '/community-outreach';

            const method = editingRecord ? 'PUT' : 'POST';

            // ============================================
            // CONSOLE LOGGING
            // ============================================
            console.log('================================================');
            console.log('📤 COMMUNITY OUTREACH REQUEST');
            console.log('================================================');
            console.log('📍 ENDPOINT:', url);
            console.log('📌 METHOD:', method);
            console.log('📦 PAYLOAD:', JSON.stringify(payload, null, 2));
            console.log('================================================');

            let response;
            if (editingRecord) {
                response = await Http.put(url, payload);
            } else {
                response = await Http.post(url, payload);
            }

            console.log('================================================');
            console.log('📥 COMMUNITY OUTREACH RESPONSE');
            console.log('================================================');
            console.log('📊 STATUS:', response.status);
            console.log('📦 DATA:', JSON.stringify(response.data, null, 2));
            console.log('================================================');

            if (response.status === 200 || response.status === 201) {
                Notiflix.Notify.success(
                    editingRecord ? 'Record updated successfully!' : 'Record created successfully!'
                );
                await fetchRecords();
                setIsModalOpen(false);
                resetForm();
            } else {
                Notiflix.Notify.warning('Unexpected response from server');
            }

        } catch (error: any) {
            console.error('❌ Error saving record:', error);
            console.error('❌ Error response:', error.response);
            console.error('❌ Error data:', error.response?.data);

            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat();
                Notiflix.Notify.failure(errorMessages.join(', '));
                setFormErrors(errors);
            } else if (error.response?.data?.message) {
                Notiflix.Notify.failure(error.response.data.message);
            } else {
                Notiflix.Notify.failure('Failed to save record. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ============================================
    // FILTER RECORDS
    // ============================================
    const filteredRecords = records.filter(record => {
        const matchesSearch =
            record.community_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.chw_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.facility.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || record.referral_status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    // ============================================
    // STATS
    // ============================================
    const stats = {
        total: records.length,
        women: records.reduce((sum, r) => sum + (r.women_reached || 0), 0),
        men: records.reduce((sum, r) => sum + (r.men_reached || 0), 0),
        maleEngagement: records.reduce((sum, r) => sum + (r.male_engagement || 0), 0), // New stat
        totalBeneficiaries: records.reduce((sum, r) => sum + (r.total_beneficiaries || 0), 0),
    };

    // ============================================
    // RENDER
    // ============================================
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

                {/* Stats Cards - Added Male Engagement */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Total Outreaches</span>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Women Reached</span>
                            <UserCircle className="h-4 w-4 text-pink-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{stats.women}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Men Reached</span>
                            <User className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{stats.men}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Male Engagement</span>
                            <UsersRound className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{stats.maleEngagement}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Total Beneficiaries</span>
                            <Users className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-2xl font-bold mt-1">{stats.totalBeneficiaries}</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by community, CHW, or facility..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 h-9 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="not_required">Not Required</option>
                    </select>
                </div>

                {/* Table - Added Male Engagement column */}
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
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Male Eng.</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No records found
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map(record => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm">
                                            {format(new Date(record.outreach_date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-3 py-2 text-sm font-medium">{record.community_name}</td>
                                        <td className="px-3 py-2 text-sm">{record.chw_name}</td>
                                        <td className="px-3 py-2 text-sm">{record.outreach_type}</td>
                                        <td className="px-3 py-2 text-sm">{record.women_reached || 0}</td>
                                        <td className="px-3 py-2 text-sm">{record.men_reached || 0}</td>
                                        <td className="px-3 py-2 text-sm font-medium text-purple-600">
                                            {record.male_engagement || 0}
                                        </td>
                                        <td className="px-3 py-2 text-sm font-semibold">{record.total_beneficiaries || 0}</td>
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

                {/* ============================================
                    MODAL
                    ============================================ */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex-shrink-0 border-b px-4 py-3 bg-white rounded-t-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-blue-600" />
                                            {editingRecord ? 'Edit Outreach Record' : 'New Community Outreach'}
                                        </h2>
                                        <p className="text-[10px] text-gray-500">
                                            {editingRecord ? 'Update existing outreach record' : 'Record new community outreach activity'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                                        className="rounded p-1 hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
                                <div className="space-y-4">
                                    {/* ==========================================
                                        OUTREACH DETAILS
                                        ========================================== */}
                                    <div>
                                        <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5 text-blue-600" />
                                            Outreach Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Outreach Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={outreachDate}
                                                    onChange={(e) => setOutreachDate(e.target.value)}
                                                    className={`w-full h-9 px-3 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                                                        formErrors.outreachDate ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {formErrors.outreachDate && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.outreachDate}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Community Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={communityName}
                                                    onChange={(e) => setCommunityName(e.target.value)}
                                                    placeholder="Enter community name"
                                                    className={`w-full h-9 px-3 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                                                        formErrors.communityName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {formErrors.communityName && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.communityName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    CHW Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={chwName}
                                                    onChange={(e) => setChwName(e.target.value)}
                                                    placeholder="Enter CHW name"
                                                    className={`w-full h-9 px-3 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                                                        formErrors.chwName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {formErrors.chwName && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.chwName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Outreach Type <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={outreachType}
                                                    onChange={(e) => setOutreachType(e.target.value)}
                                                    className={`w-full h-9 px-3 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 bg-white ${
                                                        formErrors.outreachType ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                >
                                                    <option value="">Select Outreach Type</option>
                                                    <option value="Market">Market</option>
                                                    <option value="Church">Church</option>
                                                    <option value="School">School</option>
                                                    <option value="Community Meeting">Community Meeting</option>
                                                    <option value="Door to Door">Door to Door</option>
                                                    <option value="Health Fair">Health Fair</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {formErrors.outreachType && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.outreachType}</p>
                                                )}
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Facility <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={facility}
                                                    onChange={(e) => setFacility(e.target.value)}
                                                    className={`w-full h-9 px-3 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 bg-white ${
                                                        formErrors.facility ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                >
                                                    <option value="">Select Facility</option>
                                                    <option value="Chawama Clinic">Chawama Clinic</option>
                                                    <option value="Kanyama Clinic">Kanyama Clinic</option>
                                                    <option value="University Teaching Hospital">University Teaching Hospital</option>
                                                    <option value="Levy Mwanawasa Hospital">Levy Mwanawasa Hospital</option>
                                                    <option value="Chipata Central Hospital">Chipata Central Hospital</option>
                                                    <option value="Lundazi District Hospital">Lundazi District Hospital</option>
                                                </select>
                                                {formErrors.facility && (
                                                    <p className="text-[10px] text-red-500 mt-0.5">{formErrors.facility}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ==========================================
                                        SERVICES PROVIDED
                                        ========================================== */}
                                    <div className="border-t pt-3">
                                        <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Stethoscope className="h-3.5 w-3.5 text-green-600" />
                                            Services Provided
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {SERVICE_OPTIONS.map((service) => (
                                                <label key={service} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedServices.includes(service)}
                                                        onChange={() => toggleService(service)}
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{service}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {formErrors.selectedServices && (
                                            <p className="text-[10px] text-red-500 mt-1">{formErrors.selectedServices}</p>
                                        )}
                                    </div>

                                    {/* ==========================================
                                        OUTPUTS
                                        ========================================== */}
                                    <div className="border-t pt-3">
                                        <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <CheckSquare className="h-3.5 w-3.5 text-purple-600" />
                                            Outputs
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Referred for Screening
                                                </label>
                                                <select
                                                    value={referredForScreening}
                                                    onChange={(e) => setReferredForScreening(e.target.value)}
                                                    className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Awareness Session Conducted
                                                </label>
                                                <select
                                                    value={awarenessSessionConducted}
                                                    onChange={(e) => setAwarenessSessionConducted(e.target.value)}
                                                    className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ==========================================
                                        NUMBER OF PEOPLE REACHED
                                        ========================================== */}
                                    <div className="border-t pt-3">
                                        <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Users className="h-3.5 w-3.5 text-orange-600" />
                                            Number of People Reached
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Women Reached
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={womenReached}
                                                    onChange={(e) => setWomenReached(Number(e.target.value))}
                                                    className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Men Reached
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={menReached}
                                                    onChange={(e) => setMenReached(Number(e.target.value))}
                                                    className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Male Engagement <span className="text-purple-600">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={maleEngagement}
                                                    onChange={(e) => setMaleEngagement(Number(e.target.value))}
                                                    className="w-full h-9 px-3 text-sm border border-purple-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                                    placeholder="Number of men engaged"
                                                />
                                                <p className="text-[10px] text-gray-400 mt-0.5">Number of men actively engaged in programs</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ==========================================
                                        REFERRAL INFORMATION
                                        ========================================== */}
                                    <div className="border-t pt-3">
                                        <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <UserPlus className="h-3.5 w-3.5 text-red-600" />
                                            Referral Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Referral Required
                                                </label>
                                                <select
                                                    value={referralRequired}
                                                    onChange={(e) => setReferralRequired(e.target.value)}
                                                    className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 bg-white"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            {referralRequired === 'yes' && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Facility Referred To
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={referredFacility}
                                                            onChange={(e) => setReferredFacility(e.target.value)}
                                                            placeholder="Enter facility name"
                                                            className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Referral Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={referralDate}
                                                            onChange={(e) => setReferralDate(e.target.value)}
                                                            className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Referral Outcome
                                                        </label>
                                                        <select
                                                            value={referralOutcome}
                                                            onChange={(e) => setReferralOutcome(e.target.value)}
                                                            className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 bg-white"
                                                        >
                                                            <option value="">Select Outcome</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Not Applicable">Not Applicable</option>
                                                        </select>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="flex-shrink-0 border-t px-6 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                                <div className="text-[10px] text-gray-500">
                                    {selectedServices.length} service(s) selected | Male Engagement: {maleEngagement}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                                        className="h-8 px-4 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="h-8 px-4 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-1.5"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Record'
                                        )}
                                    </button>
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

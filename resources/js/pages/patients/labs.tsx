// pages/patients/laboratory.tsx
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LabOrderModal } from './components/modals/lab-order-modal';
import {
    Plus,
    Phone,
    MapPin,
    Shield,
    AlertTriangle,
    Printer,
    ArrowLeft,
    X,
    Clock,
    Eye,
    Edit,
    RefreshCw,
    ClipboardList,
    TestTube,
    Calendar,
    User,
    Building,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Filter,
    Download,
    Search,
    Loader2,
    FileText,
    FlaskConical,
    Microscope,
    Syringe,
    Droplet,
    Activity,
    Pill,
} from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';

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

interface LabTest {
    id: string;
    test_name: string;
    test_category: string;
    code: string;
    price: number;
    requires_consent: boolean;
    preparation_instructions: string | null;
    turnaround_time: string;
    specimen_type: string;
}

interface LabOrder {
    id: string;
    order_number: string;
    patient_id: number;
    patient_uuid: string;
    visit_id: string;
    tests: LabTest[];
    status: 'draft' | 'ordered' | 'collected' | 'processing' | 'completed' | 'cancelled';
    priority: 'routine' | 'urgent' | 'stat';
    ordered_by: string;
    ordered_at: string;
    collected_at: string | null;
    collected_by: string | null;
    completed_at: string | null;
    notes: string | null;
    results: any[];
    created_at: string;
    updated_at: string;
}

interface PageProps {
    patient: Patient;
    labOrders: LabOrder[];
    availableTests: LabTest[];
    currentVisitId?: string; // Added current visit ID
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

// Available Lab Tests
const AVAILABLE_TESTS: LabTest[] = [
    // Cervical Cancer Screening
    { id: '1', test_name: 'HPV DNA Test', test_category: 'Cervical Cancer', code: 'HPV-DNA', price: 150, requires_consent: true, preparation_instructions: 'Avoid sexual intercourse 24 hours before test', turnaround_time: '3-5 days', specimen_type: 'Cervical Swab' },
    { id: '2', test_name: 'VIA (Visual Inspection with Acetic Acid)', test_category: 'Cervical Cancer', code: 'VIA', price: 50, requires_consent: true, preparation_instructions: 'Schedule 5-7 days after menstrual period', turnaround_time: 'Same day', specimen_type: 'Visual Inspection' },
    { id: '3', test_name: 'Pap Smear (Cytology)', test_category: 'Cervical Cancer', code: 'PAP', price: 80, requires_consent: true, preparation_instructions: 'Avoid douching 48 hours before test', turnaround_time: '2-3 days', specimen_type: 'Cervical Swab' },
    // Infectious Diseases
    { id: '4', test_name: 'HIV Rapid Test', test_category: 'Infectious Diseases', code: 'HIV-RAPID', price: 30, requires_consent: true, preparation_instructions: 'None required', turnaround_time: '15 minutes', specimen_type: 'Blood' },
    { id: '5', test_name: 'HIV ELISA', test_category: 'Infectious Diseases', code: 'HIV-ELISA', price: 60, requires_consent: true, preparation_instructions: 'None required', turnaround_time: '1-2 days', specimen_type: 'Blood' },
    { id: '6', test_name: 'Hepatitis B Surface Antigen', test_category: 'Infectious Diseases', code: 'HBsAg', price: 45, requires_consent: true, preparation_instructions: 'None required', turnaround_time: '1-2 days', specimen_type: 'Blood' },
    { id: '7', test_name: 'Syphilis (RPR/VDRL)', test_category: 'Infectious Diseases', code: 'RPR', price: 35, requires_consent: true, preparation_instructions: 'None required', turnaround_time: '1 day', specimen_type: 'Blood' },
    // Hematology
    { id: '8', test_name: 'Complete Blood Count (CBC)', test_category: 'Hematology', code: 'CBC', price: 40, requires_consent: false, preparation_instructions: 'Fasting not required', turnaround_time: '2-4 hours', specimen_type: 'Blood' },
    { id: '9', test_name: 'Hemoglobin (Hb)', test_category: 'Hematology', code: 'HB', price: 15, requires_consent: false, preparation_instructions: 'None required', turnaround_time: '1 hour', specimen_type: 'Blood' },
    // Chemistry
    { id: '10', test_name: 'Blood Glucose', test_category: 'Chemistry', code: 'GLU', price: 20, requires_consent: false, preparation_instructions: 'Fasting 8-12 hours required', turnaround_time: '1 hour', specimen_type: 'Blood' },
    { id: '11', test_name: 'Lipid Profile', test_category: 'Chemistry', code: 'LIPID', price: 55, requires_consent: false, preparation_instructions: 'Fasting 12 hours required', turnaround_time: '1-2 days', specimen_type: 'Blood' },
    { id: '12', test_name: 'Liver Function Test (LFT)', test_category: 'Chemistry', code: 'LFT', price: 60, requires_consent: false, preparation_instructions: 'Fasting 8-12 hours required', turnaround_time: '1-2 days', specimen_type: 'Blood' },
    { id: '13', test_name: 'Renal Function Test (RFT)', test_category: 'Chemistry', code: 'RFT', price: 50, requires_consent: false, preparation_instructions: 'Fasting 8-12 hours required', turnaround_time: '1-2 days', specimen_type: 'Blood' },
    // Microbiology
    { id: '14', test_name: 'Urinalysis', test_category: 'Microbiology', code: 'UA', price: 25, requires_consent: false, preparation_instructions: 'Clean catch midstream urine', turnaround_time: '1-2 hours', specimen_type: 'Urine' },
    { id: '15', test_name: 'Stool Analysis', test_category: 'Microbiology', code: 'STOOL', price: 35, requires_consent: false, preparation_instructions: 'Collect stool sample in sterile container', turnaround_time: '1-2 days', specimen_type: 'Stool' },
    { id: '16', test_name: 'Wet Mount (Vaginal Swab)', test_category: 'Microbiology', code: 'WET-MOUNT', price: 30, requires_consent: true, preparation_instructions: 'Avoid douching 24 hours before', turnaround_time: '2-4 hours', specimen_type: 'Vaginal Swab' },
];

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
        draft: { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <AlertCircle className="h-3 w-3" /> },
        ordered: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Clock className="h-3 w-3" /> },
        collected: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: <Syringe className="h-3 w-3" /> },
        processing: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
        completed: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="h-3 w-3" /> },
        cancelled: { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <XCircle className="h-3 w-3" /> },
    };

    const { color, icon } = config[status] || config.draft;
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border', color)}>
            {icon}
            {label}
        </span>
    );
};

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: string }) => {
    const config: Record<string, string> = {
        routine: 'bg-slate-100 text-slate-600 border-slate-200',
        urgent: 'bg-amber-100 text-amber-700 border-amber-200',
        stat: 'bg-rose-100 text-rose-700 border-rose-200',
    };

    return (
        <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border', config[priority] || config.routine)}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
    );
};

export default function Laboratory() {
    const { props } = usePage<PageProps>();
    const { patient, labOrders = [], auth, currentVisitId } = props;

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null);
    // Initialize ordersList with labOrders from props
    const [ordersList, setOrdersList] = useState<LabOrder[]>(() => labOrders || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [periodFilter, setPeriodFilter] = useState<string>('all');
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

    // Update ordersList when labOrders prop changes - with proper dependency
    useEffect(() => {
        // Only update if the labOrders array is different (by length or content)
        if (JSON.stringify(labOrders) !== JSON.stringify(ordersList)) {
            setOrdersList(labOrders || []);
        }
    }, [labOrders]);

    // Filter and search orders
    const filteredOrders = useMemo(() => {
        let filtered = [...ordersList];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(order =>
                (order.order_number?.toLowerCase().includes(term) || false) ||
                (order.id?.toLowerCase().includes(term) || false) ||
                (order.notes?.toLowerCase().includes(term) || false) ||
                order.tests?.some(test => test.test_name.toLowerCase().includes(term))
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Period filter
        if (periodFilter !== 'all') {
            const now = new Date();
            filtered = filtered.filter(order => {
                try {
                    const date = parseISO(order.ordered_at);
                    switch (periodFilter) {
                        case 'today':
                            return isToday(date);
                        case 'week':
                            return isThisWeek(date, { weekStartsOn: 1 });
                        case 'month':
                            return isThisMonth(date);
                        default:
                            return true;
                    }
                } catch {
                    return false;
                }
            });
        }

        // Sort by most recent first
        filtered.sort((a, b) => {
            try {
                return new Date(b.ordered_at).getTime() - new Date(a.ordered_at).getTime();
            } catch {
                return 0;
            }
        });

        return filtered;
    }, [ordersList, searchTerm, statusFilter, periodFilter]);

    // Get stats
    const stats = useMemo(() => {
        const total = ordersList.length;
        const pending = ordersList.filter(o => ['ordered', 'collected', 'processing'].includes(o.status)).length;
        const completed = ordersList.filter(o => o.status === 'completed').length;
        const cancelled = ordersList.filter(o => o.status === 'cancelled').length;
        return { total, pending, completed, cancelled };
    }, [ordersList]);

    // Get primary address
    const primaryAddress: Address | undefined = patient?.addresses?.[0];

    // Format date
    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        try {
            return format(parseISO(date), 'MMM dd, yyyy • HH:mm');
        } catch {
            return 'N/A';
        }
    };

    const formatShortDate = (date: string) => {
        if (!date) return 'N/A';
        try {
            return format(parseISO(date), 'MMM dd, yyyy');
        } catch {
            return 'N/A';
        }
    };

    const formatRelativeTime = (date: string) => {
        if (!date) return 'N/A';
        try {
            return formatDistanceToNow(parseISO(date), { addSuffix: true });
        } catch {
            return 'N/A';
        }
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

    // Fetch orders from server
    const fetchOrders = useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await Http.get(`/patients/${patient.patient_uuid}/lab-orders`);
            if (response.status === 200 && response.data.success) {
                setOrdersList(response.data.data || []);
                Notiflix.Notify.success('Orders refreshed');
            }
        } catch (error) {
            console.error('Error fetching lab orders:', error);
            Notiflix.Notify.failure('Failed to refresh orders');
        } finally {
            setRefreshing(false);
        }
    }, [patient?.patient_uuid]);

    // Handle submit order from modal
    const handleSubmitOrder = useCallback(async (orderData: any) => {
        setLoading(true);
        try {
            const payload = {
                patient_id: patient.id,
                patient_uuid: patient.patient_uuid,
                visit_id: orderData.visit_id || currentVisitId, // Include visit_id
                tests: orderData.tests.map((test: LabTest) => ({
                    id: test.id,
                    test_name: test.test_name,
                    test_category: test.test_category,
                    code: test.code,
                    price: test.price,
                    requires_consent: test.requires_consent,
                    preparation_instructions: test.preparation_instructions,
                    turnaround_time: test.turnaround_time,
                    specimen_type: test.specimen_type,
                })),
                priority: orderData.priority,
                notes: orderData.notes,
                ordered_by: auth.user.id,
                ordered_at: new Date().toISOString(),
            };

            console.log('Submitting lab order payload:', payload);

            const response = await Http.post(`/patients/${patient.patient_uuid}/lab-orders`, payload);

            if (response.status === 201 || response.status === 200) {
                Notiflix.Notify.success('Lab order submitted successfully');
                setShowOrderForm(false);
                await fetchOrders();
            }
        } catch (error: any) {
            console.error('Error submitting lab order:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Failed to submit lab order');
        } finally {
            setLoading(false);
        }
    }, [patient.id, patient.patient_uuid, auth.user.id, currentVisitId, fetchOrders]);

    // Handle view results
    const handleViewResults = (order: LabOrder) => {
        setSelectedOrder(order);
        setShowResultsModal(true);
    };

    // Toggle expanded order
    const toggleExpanded = (orderId: string) => {
        setExpandedOrders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                newSet.add(orderId);
            }
            return newSet;
        });
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setPeriodFilter('all');
    };

    // Get test category icon
    const getTestIcon = (category: string) => {
        const icons: Record<string, React.ReactNode> = {
            'Cervical Cancer': <Microscope className="h-3 w-3" />,
            'Infectious Diseases': <AlertCircle className="h-3 w-3" />,
            'Hematology': <Droplet className="h-3 w-3" />,
            'Chemistry': <FlaskConical className="h-3 w-3" />,
            'Microbiology': <Activity className="h-3 w-3" />,
        };
        return icons[category] || <TestTube className="h-3 w-3" />;
    };

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
                    title: 'Laboratory',
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
                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                        <span>Registered {formatRelativeTime(patient?.registered_at || '')}</span>
                                        <span className="text-slate-300">|</span>
                                        <span>ID: {patient?.patient_uuid || 'N/A'}</span>
                                        {currentVisitId && (
                                            <>
                                                <span className="text-slate-300">|</span>
                                                <span>Visit: #{currentVisitId}</span>
                                            </>
                                        )}
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
                                <Button
                                    onClick={() => setShowOrderForm(true)}
                                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-medium"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    New Lab Order
                                </Button>
                            </div>
                        </div>

                        {/* Demographics - Compact Grid */}
                        <div className="mb-3 grid grid-cols-2 divide-y divide-slate-100 rounded-md border border-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-6">
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">NRC number</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.nrc_number || 'N/A'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Date of birth</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{formatShortDate(patient?.date_of_birth || '')}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Age</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.age || 0} years</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Gender</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800 capitalize">{patient?.gender || 'N/A'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Marital status</div>
                                <div className="mt-0.5 truncate text-sm font-medium text-slate-800">{patient?.marital_status || 'Not specified'}</div>
                            </div>
                            <div className="px-3.5 py-2.5">
                                <div className="text-[11px] uppercase tracking-wide text-slate-400">Risk status</div>
                                <div className="mt-0.5 truncate text-sm font-medium">
                                    <span className={patient?.is_high_risk ? 'text-rose-600' : 'text-emerald-600'}>
                                        {patient?.is_high_risk ? 'High risk' : 'Standard'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        {/* Left Column - Patient Info & Stats */}
                        <div className="space-y-4 lg:col-span-1">
                            {/* Contact Information */}
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <Phone className="inline h-3.5 w-3.5 mr-1.5" />
                                        Contact Information
                                    </h2>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    <div className="flex items-center justify-between px-3.5 py-2">
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Phone className="h-3 w-3" />
                                            Phone
                                        </span>
                                        <span className="text-xs font-medium text-slate-800">{patient?.phone_number || 'N/A'}</span>
                                    </div>
                                    {primaryAddress && (
                                        <>
                                            {primaryAddress.address_line1 && (
                                                <div className="flex items-center justify-between px-3.5 py-2">
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                                        <MapPin className="h-3 w-3" />
                                                        Address
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-800 text-right max-w-[60%] truncate">
                                                        {primaryAddress.address_line1}
                                                        {primaryAddress.address_line2 && `, ${primaryAddress.address_line2}`}
                                                    </span>
                                                </div>
                                            )}
                                            {primaryAddress.city && (
                                                <div className="flex items-center justify-between px-3.5 py-2">
                                                    <span className="text-xs text-slate-500">City</span>
                                                    <span className="text-xs font-medium text-slate-800">{primaryAddress.city}</span>
                                                </div>
                                            )}
                                            {primaryAddress.province && (
                                                <div className="flex items-center justify-between px-3.5 py-2">
                                                    <span className="text-xs text-slate-500">Province</span>
                                                    <span className="text-xs font-medium text-slate-800">{primaryAddress.province}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {currentVisitId && (
                                        <div className="flex items-center justify-between px-3.5 py-2">
                                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <Calendar className="h-3 w-3" />
                                                Current Visit
                                            </span>
                                            <span className="text-xs font-medium text-slate-800">#{currentVisitId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Risk Assessment */}
                            {patient?.latest_risk_assessment && (
                                <div className="rounded-md border border-slate-200 bg-white">
                                    <div className="border-b border-slate-200 px-3.5 py-2">
                                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <Shield className="h-3.5 w-3.5 text-rose-500" />
                                            Risk Assessment
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        <div className="flex items-center justify-between px-3.5 py-2">
                                            <span className="text-xs text-slate-500">Pregnancies</span>
                                            <span className="text-xs font-medium text-slate-800">
                                                {patient.latest_risk_assessment.number_of_pregnancies || 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-3.5 py-2">
                                            <span className="text-xs text-slate-500">Deliveries</span>
                                            <span className="text-xs font-medium text-slate-800">
                                                {patient.latest_risk_assessment.number_of_deliveries || 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-3.5 py-2">
                                            <span className="text-xs text-slate-500">Contraceptive</span>
                                            <span className="text-xs font-medium text-slate-800">
                                                {patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stats Summary */}
                            <div className="rounded-md border border-slate-200 bg-white p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                                    <ClipboardList className="inline h-3.5 w-3.5 mr-1.5" />
                                    Lab Order Summary
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-md bg-blue-50 p-2 text-center">
                                        <div className="text-xs text-blue-600">Total</div>
                                        <div className="text-lg font-bold text-blue-900">{stats.total}</div>
                                    </div>
                                    <div className="rounded-md bg-amber-50 p-2 text-center">
                                        <div className="text-xs text-amber-600">Pending</div>
                                        <div className="text-lg font-bold text-amber-900">{stats.pending}</div>
                                    </div>
                                    <div className="rounded-md bg-emerald-50 p-2 text-center">
                                        <div className="text-xs text-emerald-600">Completed</div>
                                        <div className="text-lg font-bold text-emerald-900">{stats.completed}</div>
                                    </div>
                                    <div className="rounded-md bg-rose-50 p-2 text-center">
                                        <div className="text-xs text-rose-600">Cancelled</div>
                                        <div className="text-lg font-bold text-rose-900">{stats.cancelled}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Lab Orders */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="rounded-md border border-slate-200 bg-white">
                                {/* Header with Filters */}
                                <div className="border-b border-slate-200 px-3.5 py-2.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <ClipboardList className="inline h-3.5 w-3.5 mr-1.5" />
                                            Lab Orders
                                            <span className="ml-1.5 font-normal text-slate-400">
                                                ({filteredOrders.length})
                                            </span>
                                        </h2>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button
                                                onClick={fetchOrders}
                                                disabled={refreshing}
                                                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
                                                title="Refresh"
                                            >
                                                <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filters Bar */}
                                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search orders..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="px-2 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                <option value="all">All Status</option>
                                                <option value="ordered">Ordered</option>
                                                <option value="collected">Collected</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <select
                                                value={periodFilter}
                                                onChange={(e) => setPeriodFilter(e.target.value)}
                                                className="px-2 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                <option value="all">All Time</option>
                                                <option value="today">Today</option>
                                                <option value="week">This Week</option>
                                                <option value="month">This Month</option>
                                            </select>
                                            {(searchTerm || statusFilter !== 'all' || periodFilter !== 'all') && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="px-2 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Orders List */}
                                <div className="divide-y divide-slate-100">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <div key={order.id} className="px-3.5 py-3 hover:bg-slate-50 transition-colors">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <button
                                                                onClick={() => toggleExpanded(order.id)}
                                                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                                            >
                                                                {expandedOrders.has(order.id) ? (
                                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                                ) : (
                                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                                )}
                                                            </button>
                                                            <span className="text-sm font-medium text-slate-800">
                                                                Order #{order.order_number || order.id.slice(0, 8)}
                                                            </span>
                                                            {order.visit_id && (
                                                                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                                                    Visit: {order.visit_id}
                                                                </span>
                                                            )}
                                                            <StatusBadge status={order.status} />
                                                            <PriorityBadge priority={order.priority} />
                                                            <span className="text-[10px] text-slate-400">
                                                                {formatRelativeTime(order.ordered_at)}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDate(order.ordered_at)}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{order.tests?.length || 0} tests</span>
                                                            {order.notes && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span className="text-slate-400 truncate max-w-[200px]">{order.notes}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="mt-1.5 flex flex-wrap gap-1">
                                                            {order.tests?.slice(0, 4).map((test, idx) => (
                                                                <span key={idx} className="inline-flex items-center gap-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                                                                    {getTestIcon(test.test_category)}
                                                                    {test.test_name}
                                                                </span>
                                                            ))}
                                                            {order.tests?.length > 4 && (
                                                                <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                                                                    +{order.tests.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Expanded Details */}
                                                        {expandedOrders.has(order.id) && (
                                                            <div className="mt-3 pt-3 border-t border-slate-100">
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                                    <div>
                                                                        <span className="text-slate-500">Order ID:</span>
                                                                        <span className="ml-1 font-mono text-slate-700">{order.id}</span>
                                                                    </div>
                                                                    {order.visit_id && (
                                                                        <div>
                                                                            <span className="text-slate-500">Visit ID:</span>
                                                                            <span className="ml-1 font-mono text-slate-700">{order.visit_id}</span>
                                                                        </div>
                                                                    )}
                                                                    {order.collected_at && (
                                                                        <div>
                                                                            <span className="text-slate-500">Collected:</span>
                                                                            <span className="ml-1 text-slate-700">{formatDate(order.collected_at)}</span>
                                                                        </div>
                                                                    )}
                                                                    {order.completed_at && (
                                                                        <div>
                                                                            <span className="text-slate-500">Completed:</span>
                                                                            <span className="ml-1 text-slate-700">{formatDate(order.completed_at)}</span>
                                                                        </div>
                                                                    )}
                                                                    {order.collected_by && (
                                                                        <div>
                                                                            <span className="text-slate-500">Collected By:</span>
                                                                            <span className="ml-1 text-slate-700">{order.collected_by}</span>
                                                                        </div>
                                                                    )}
                                                                    {order.notes && (
                                                                        <div className="sm:col-span-2">
                                                                            <span className="text-slate-500">Notes:</span>
                                                                            <span className="ml-1 text-slate-700">{order.notes}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 ml-4">
                                                        {order.status === 'completed' && order.results?.length > 0 && (
                                                            <button
                                                                onClick={() => handleViewResults(order)}
                                                                className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors"
                                                                title="View Results"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => Notiflix.Notify.info('Edit functionality coming soon')}
                                                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center">
                                            <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />
                                            <h3 className="mt-2 text-sm font-medium text-slate-800">
                                                {ordersList.length === 0 ? 'No lab orders' : 'No orders match your filters'}
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                {ordersList.length === 0
                                                    ? 'No laboratory orders found for this patient'
                                                    : 'Try adjusting your search or filters'}
                                            </p>
                                            {ordersList.length === 0 && (
                                                <Button
                                                    onClick={() => setShowOrderForm(true)}
                                                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5"
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    Create Lab Order
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer with count */}
                                {filteredOrders.length > 0 && (
                                    <div className="border-t border-slate-200 px-3.5 py-2 text-[10px] text-slate-400 text-center">
                                        Showing {filteredOrders.length} of {ordersList.length} orders
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lab Order Modal with visitId */}
                <LabOrderModal
                    isOpen={showOrderForm}
                    onClose={() => setShowOrderForm(false)}
                    onSubmit={handleSubmitOrder}
                    availableTests={AVAILABLE_TESTS}
                    patientName={patient?.full_name}
                    patientId={patient?.id}
                    facilityId={1}
                    userId={parseInt(auth.user.id)}
                    visitId={currentVisitId} // Pass the current visit ID
                    loading={loading}
                />

                {/* Results Modal */}
                {showResultsModal && selectedOrder && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowResultsModal(false)}
                        />
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl">
                                <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">Lab Results</h3>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-2">
                                            <span>Order #{selectedOrder.order_number || selectedOrder.id.slice(0, 8)}</span>
                                            <span className="text-slate-300">|</span>
                                            <span>{selectedOrder.tests?.length || 0} tests</span>
                                            {selectedOrder.visit_id && (
                                                <>
                                                    <span className="text-slate-300">|</span>
                                                    <span>Visit: {selectedOrder.visit_id}</span>
                                                </>
                                            )}
                                            <span className="text-slate-300">|</span>
                                            <StatusBadge status={selectedOrder.status} />
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowResultsModal(false)}
                                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    {selectedOrder.results && selectedOrder.results.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedOrder.results.map((result: any, index: number) => (
                                                <div key={index} className="rounded-md border border-slate-200 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-medium text-slate-800">{result.test_name}</h4>
                                                        <span className={cn(
                                                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                                                            result.status === 'normal' ? 'bg-emerald-50 text-emerald-700' :
                                                                result.status === 'abnormal' ? 'bg-rose-50 text-rose-700' :
                                                                    'bg-amber-50 text-amber-700'
                                                        )}>
                                                            {result.status === 'normal' && <CheckCircle className="h-3 w-3" />}
                                                            {result.status === 'abnormal' && <AlertCircle className="h-3 w-3" />}
                                                            {result.status === 'pending' && <Clock className="h-3 w-3" />}
                                                            {result.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <span className="text-xs text-slate-500">Result</span>
                                                            <div className="font-medium text-slate-800">{result.value || 'N/A'}</div>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-slate-500">Reference Range</span>
                                                            <div className="font-medium text-slate-800">{result.reference_range || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                    {result.comment && (
                                                        <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                                                            {result.comment}
                                                        </p>
                                                    )}
                                                    {result.performed_at && (
                                                        <div className="mt-1 text-[10px] text-slate-400">
                                                            Performed: {formatDate(result.performed_at)}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-sm text-slate-500">
                                            <FileText className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                                            No results available for this order
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-slate-200 px-4 py-3 flex justify-between items-center">
                                    <span className="text-[10px] text-slate-400">
                                        Ordered {formatRelativeTime(selectedOrder.ordered_at)}
                                    </span>
                                    <button
                                        onClick={() => setShowResultsModal(false)}
                                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

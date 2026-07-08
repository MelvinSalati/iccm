// pages/patients/laboratory.tsx
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

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

export default function Laboratory() {
    const { props } = usePage<PageProps>();
    const { patient, labOrders = [], auth } = props;

    const [loading, setLoading] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null);
    const [ordersList, setOrdersList] = useState<LabOrder[]>(labOrders);

    // Update ordersList when labOrders prop changes
    useEffect(() => {
        setOrdersList(labOrders);
    }, [labOrders]);

    // Get primary address
    const primaryAddress: Address | undefined = patient?.addresses?.[0];

    // Format date
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

    const formatShortDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
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

    // Fetch orders from server
    const fetchOrders = async () => {
        try {
            const response = await Http.get(`/patients/${patient.patient_uuid}/lab-orders`);
            if (response.status === 200 && response.data.success) {
                setOrdersList(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching lab orders:', error);
        }
    };

    // Handle submit order from modal
    const handleSubmitOrder = async (orderData: any) => {
        setLoading(true);
        try {
            const payload = {
                patient_id: patient.id,
                patient_uuid: patient.patient_uuid,
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
    };

    // Handle view results
    const handleViewResults = (order: LabOrder) => {
        setSelectedOrder(order);
        setShowResultsModal(true);
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            draft: 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200',
            ordered: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
            collected: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200',
            processing: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
            completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
            cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
        };
        return colors[status] || 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200';
    };

    const getPriorityBadge = (priority: string) => {
        const colors: Record<string, string> = {
            routine: 'bg-slate-100 text-slate-600',
            urgent: 'bg-amber-50 text-amber-700',
            stat: 'bg-rose-50 text-rose-700',
        };
        return colors[priority] || 'bg-slate-100 text-slate-600';
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
                                <Button
                                    onClick={() => setShowOrderForm(true)}
                                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-medium"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    New Lab Order
                                </Button>
                            </div>
                        </div>

                        {/* Demographics */}
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

                            {/* Risk Assessment */}
                            {patient?.latest_risk_assessment && (
                                <div className="rounded-md border border-slate-200 bg-white">
                                    <div className="border-b border-slate-200 px-3.5 py-2">
                                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <Shield className="h-3.5 w-3.5 text-rose-500" />
                                            Risk assessment
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
                                            label="Long-term contraceptive"
                                            value={patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Stats Summary */}
                            <div className="rounded-md border border-slate-200 bg-white p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                                    Lab Order Summary
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-md bg-blue-50 p-2 text-center">
                                        <div className="text-xs text-blue-600">Total Orders</div>
                                        <div className="text-lg font-bold text-blue-900">{ordersList.length}</div>
                                    </div>
                                    <div className="rounded-md bg-amber-50 p-2 text-center">
                                        <div className="text-xs text-amber-600">Pending</div>
                                        <div className="text-lg font-bold text-amber-900">
                                            {ordersList.filter(o => o.status === 'ordered' || o.status === 'collected' || o.status === 'processing').length}
                                        </div>
                                    </div>
                                    <div className="rounded-md bg-emerald-50 p-2 text-center">
                                        <div className="text-xs text-emerald-600">Completed</div>
                                        <div className="text-lg font-bold text-emerald-900">
                                            {ordersList.filter(o => o.status === 'completed').length}
                                        </div>
                                    </div>
                                    <div className="rounded-md bg-rose-50 p-2 text-center">
                                        <div className="text-xs text-rose-600">Cancelled</div>
                                        <div className="text-lg font-bold text-rose-900">
                                            {ordersList.filter(o => o.status === 'cancelled').length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Lab Orders */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="rounded-md border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between">
                                    <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <ClipboardList className="inline h-3.5 w-3.5 mr-1.5" />
                                        Lab Orders
                                        <span className="ml-1.5 font-normal text-slate-400">
                                            ({ordersList.length})
                                        </span>
                                    </h2>
                                    <button
                                        onClick={fetchOrders}
                                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                        title="Refresh"
                                    >
                                        <RefreshCw className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {ordersList.length > 0 ? (
                                        ordersList.map((order) => (
                                            <div key={order.id} className="px-3.5 py-3 hover:bg-slate-50 transition-colors">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-sm font-medium text-slate-800">
                                                                Order #{order.order_number || order.id.slice(0, 8)}
                                                            </span>
                                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadge(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityBadge(order.priority)}`}>
                                                                {order.priority}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                                            <span>{formatDate(order.ordered_at)}</span>
                                                            <span>•</span>
                                                            <span>{order.tests?.length || 0} tests</span>
                                                            {order.notes && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span className="text-slate-400 truncate max-w-[200px]">{order.notes}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="mt-1 flex flex-wrap gap-1">
                                                            {order.tests?.slice(0, 3).map((test, idx) => (
                                                                <span key={idx} className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                                                                    {test.test_name}
                                                                </span>
                                                            ))}
                                                            {order.tests?.length > 3 && (
                                                                <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                                                                    +{order.tests.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 ml-4">
                                                        {order.status === 'completed' && order.results?.length > 0 && (
                                                            <button
                                                                onClick={() => handleViewResults(order)}
                                                                className="rounded-md p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
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
                                            <h3 className="mt-2 text-sm font-medium text-slate-800">No lab orders</h3>
                                            <p className="text-xs text-slate-500">No laboratory orders found for this patient</p>
                                            <Button
                                                onClick={() => setShowOrderForm(true)}
                                                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5"
                                            >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Create Lab Order
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lab Order Modal */}
                <LabOrderModal
                    isOpen={showOrderForm}
                    onClose={() => setShowOrderForm(false)}
                    onSubmit={handleSubmitOrder}
                    availableTests={AVAILABLE_TESTS}
                    patientName={patient?.full_name}
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
                                        <p className="text-[10px] text-slate-500">
                                            Order #{selectedOrder.order_number || selectedOrder.id.slice(0, 8)}
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
                                        <div className="space-y-4">
                                            {selectedOrder.results.map((result: any, index: number) => (
                                                <div key={index} className="rounded-md border border-slate-200 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-medium text-slate-800">{result.test_name}</h4>
                                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                            result.status === 'normal' ? 'bg-emerald-50 text-emerald-700' :
                                                                result.status === 'abnormal' ? 'bg-rose-50 text-rose-700' :
                                                                    'bg-amber-50 text-amber-700'
                                                        }`}>
                                                            {result.status || 'pending'}
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
                                                        <p className="mt-2 text-xs text-slate-600">{result.comment}</p>
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
                                            No results available for this order
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-slate-200 px-4 py-3 flex justify-end">
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

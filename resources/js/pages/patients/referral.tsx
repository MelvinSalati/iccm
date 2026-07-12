import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
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
    User,
    Stethoscope,
    FileText,
    Building,
    Clock,
    Navigation,
    CheckCircle,
    XCircle,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ReferralModal } from './components/modals/ReferralModal';
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
    priority: 'routine' | 'urgent' | 'emergency';
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
    reason: string;
    notes?: string;
    referred_by: string;
    accepted_by?: string;
    accepted_date?: string;
    completed_date?: string;
    created_at: string;
}

interface PageProps {
    patient: Patient;
    referrals: Referral[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

// Referral Status Badge
const ReferralStatusBadge = ({ status }: { status: Referral['status'] }) => {
    const styles = {
        pending: 'bg-amber-100 text-amber-700',
        accepted: 'bg-blue-100 text-blue-700',
        in_progress: 'bg-violet-100 text-violet-700',
        completed: 'bg-emerald-100 text-emerald-700',
        cancelled: 'bg-rose-100 text-rose-700',
        rejected: 'bg-slate-100 text-slate-700',
    };

    const icons = {
        pending: <Clock className="h-3 w-3" />,
        accepted: <CheckCircle className="h-3 w-3" />,
        in_progress: <Navigation className="h-3 w-3" />,
        completed: <CheckCircle className="h-3 w-3" />,
        cancelled: <XCircle className="h-3 w-3" />,
        rejected: <XCircle className="h-3 w-3" />,
    };

    const labels = {
        pending: 'Pending',
        accepted: 'Accepted',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
        rejected: 'Rejected',
    };

    return (
        <Badge className={cn('flex items-center gap-1', styles[status])}>
            {icons[status]}
            {labels[status]}
        </Badge>
    );
};

// Referral Priority Badge
const ReferralPriorityBadge = ({ priority }: { priority: Referral['priority'] }) => {
    const styles = {
        routine: 'bg-slate-100 text-slate-700',
        urgent: 'bg-amber-100 text-amber-700',
        emergency: 'bg-rose-100 text-rose-700',
    };

    const labels = {
        routine: 'Routine',
        urgent: 'Urgent',
        emergency: 'Emergency',
    };

    return <Badge className={styles[priority]}>{labels[priority]}</Badge>;
};

export default function Referral() {
    const { props } = usePage<PageProps>();
    const { patient, referrals = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<Referral['status'] | 'all'>('all');
    const [sortField, setSortField] = useState<keyof Referral>('referral_date');
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

    const handleAddReferral = (newReferral: Referral) => {
        const respponse = Http.post(`patients/${patient.patient_uuid}/referral`,newReferral);
console.log("new",newReferral)
        if(respponse){
            router.reload({
                only: ['referrals'],
                preserveState: true,
                preserveScroll: true,
            });
        }
      console.log(respponse)
    };

    // Filter and sort referrals
    const filteredReferrals = referrals
        .filter(ref => {
            const matchesSearch =
                ref.referral_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ref.target_department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ref.target_facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ref.referred_by.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || ref.status === filterStatus;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            const aVal = a[sortField]?.toString() || '';
            const bVal = b[sortField]?.toString() || '';
            return sortDirection === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const handleSort = (field: keyof Referral) => {
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
                    title: 'Referrals',
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
                                    onClick={() => router.get(`/patients/${patient?.patient_uuid}/referrals/export`)}
                                    title="Export"
                                    className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                </button>
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-medium"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    New Referral
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
                                            label="Contraceptive"
                                            value={patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Referrals */}
                        <div className="lg:col-span-2">
                            {/* Header */}
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Referrals
                                        <span className="ml-2 text-xs font-normal text-slate-500">
                                            ({filteredReferrals.length})
                                        </span>
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Manage patient referrals to other departments and facilities
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                <div className="relative flex-1 min-w-[200px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search referrals..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as Referral['status'] | 'all')}
                                    className="px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Referrals Table */}
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('referral_date')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date
                                                    {sortField === 'referral_date' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('referral_type')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Type
                                                    {sortField === 'referral_type' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('target_department')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Target
                                                    {sortField === 'target_department' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('priority')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Priority
                                                    {sortField === 'priority' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('status')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Status
                                                    {sortField === 'status' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredReferrals.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                    <Navigation className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                                    No referrals found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredReferrals.map((referral) => (
                                                <TableRow key={referral.id} className="hover:bg-slate-50">
                                                    <TableCell>{formatDate(referral.referral_date)}</TableCell>
                                                    <TableCell className="capitalize">{referral.referral_type}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm">{referral.target_department}</span>
                                                            <span className="text-xs text-slate-500">{referral.target_facility}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <ReferralPriorityBadge priority={referral.priority} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <ReferralStatusBadge status={referral.status} />
                                                    </TableCell>
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

                {/* Referral Modal - Imported component */}
                <ReferralModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddReferral}
                    patient={patient}
                />
            </div>
        </AppLayout>
    );
}

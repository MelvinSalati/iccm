// pages/patients/appointments.tsx
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Plus,
    Phone,
    MapPin,
    Shield,
    AlertTriangle,
    Printer,
    Download,
    ArrowLeft,
    Calendar,
    Eye,
    Trash2,
    Search,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AppointmentModal } from './components/modals/AppointmentModal';

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

interface Appointment {
    id: string;
    appointment_date: string;
    appointment_time: string;
    type: string;
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
    provider: string;
    department: string;
    notes?: string;
    created_at: string;
}

interface PageProps {
    patient: Patient;
    appointments: Appointment[];
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

// Appointment Status Badge
const AppointmentStatusBadge = ({ status }: { status: Appointment['status'] }) => {
    const styles = {
        scheduled: 'bg-blue-100 text-blue-700',
        confirmed: 'bg-green-100 text-green-700',
        completed: 'bg-slate-100 text-slate-700',
        cancelled: 'bg-red-100 text-red-700',
        no_show: 'bg-amber-100 text-amber-700',
    };

    const labels = {
        scheduled: 'Scheduled',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled',
        no_show: 'No Show',
    };

    return <Badge className={styles[status]}>{labels[status]}</Badge>;
};

export default function Appointments() {
    const { props } = usePage<PageProps>();
    const { patient, appointments = [], auth } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(appointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<Appointment['status'] | 'all'>('all');
    const [sortField, setSortField] = useState<keyof Appointment>('appointment_date');
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

    const formatDateTime = (date: string, time: string) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }) + (time ? ` at ${time}` : '');
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

    const handleAddAppointment = (newAppointment: Appointment) => {
        setAppointmentsList([...appointmentsList, newAppointment]);
    };

    // Filter and sort appointments
    const filteredAppointments = appointmentsList
        .filter(app => {
            const matchesSearch =
                app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.department.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            const aVal = a[sortField]?.toString() || '';
            const bVal = b[sortField]?.toString() || '';
            return sortDirection === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const handleSort = (field: keyof Appointment) => {
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
                    title: 'Appointments',
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
                                    onClick={() => router.get(`/patients/${patient?.patient_uuid}/appointments/export`)}
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
                                    New Appointment
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
                                            label="Long-term contraceptive"
                                            value={patient.latest_risk_assessment.long_term_contraceptive_use || 'None'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Appointments */}
                        <div className="lg:col-span-2">
                            {/* Appointments Header */}
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Appointments
                                        <span className="ml-2 text-xs font-normal text-slate-500">
                                            ({filteredAppointments.length})
                                        </span>
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Manage patient's appointments and schedule
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filter - Same as medications table */}
                            <div className="mb-4 flex items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search appointments..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as Appointment['status'] | 'all')}
                                    className="px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="no_show">No Show</option>
                                </select>
                            </div>

                            {/* Appointments Table - Same styling as medications table */}
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('appointment_date')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date
                                                    {sortField === 'appointment_date' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('type')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Type
                                                    {sortField === 'type' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('department')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Department
                                                    {sortField === 'department' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                            <TableHead
                                                className="cursor-pointer hover:bg-slate-100"
                                                onClick={() => handleSort('provider')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Provider
                                                    {sortField === 'provider' && (
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
                                        {filteredAppointments.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                    No appointments found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredAppointments.map((appointment) => (
                                                <TableRow key={appointment.id} className="hover:bg-slate-50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                            <span className="text-sm">
                                                                {formatDateTime(appointment.appointment_date, appointment.appointment_time)}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="capitalize">{appointment.type}</TableCell>
                                                    <TableCell>{appointment.department}</TableCell>
                                                    <TableCell>{appointment.provider || '—'}</TableCell>
                                                    <TableCell>
                                                        <AppointmentStatusBadge status={appointment.status} />
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

                {/* Appointment Modal */}
                <AppointmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddAppointment}
                    patient={patient}
                />
            </div>
        </AppLayout>
    );
}

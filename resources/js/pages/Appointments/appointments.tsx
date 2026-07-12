// resources/js/components/appointments/appointment-table.tsx
import { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Calendar,
    User,
    Stethoscope,
    Eye,
    ExternalLink,
    CalendarDays,
    CalendarRange,
    ListChecks,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { dashboard } from '@/routes';

// Types
interface Appointment {
    id: number | string;
    patient_uuid: string;
    patient_name: string;
    patient_initial?: string;
    date: string;
    time: string;
    type: string;
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
    doctor_name?: string;
    facility_name?: string;
    notes?: string;
}

interface AppointmentTableProps {
    appointments?: Appointment[];
}

type FilterPeriod = 'today' | 'weekly' | 'monthly' | 'all';

// Status badge component
const StatusBadge = ({ status }: { status: Appointment['status'] }) => {
    const statusConfig = {
        scheduled: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Scheduled' },
        confirmed: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Confirmed' },
        completed: { color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Completed' },
        cancelled: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelled' },
        'no-show': { color: 'bg-orange-100 text-orange-700 border-orange-200', label: 'No Show' },
    };

    const config = statusConfig[status] || statusConfig.scheduled;

    return (
        <Badge variant="outline" className={cn('px-2 py-0.5 text-xs font-medium', config.color)}>
            {config.label}
        </Badge>
    );
};

// Appointment Details Modal
const AppointmentDetailsModal = ({
                                     appointment,
                                     isOpen,
                                     onClose
                                 }: {
    appointment: Appointment | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    if (!isOpen || !appointment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Appointment Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-medium text-slate-500">Patient</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                        {appointment.patient_initial || appointment.patient_name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-sm font-medium text-slate-900">{appointment.patient_name}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Status</p>
                            <div className="mt-1">
                                <StatusBadge status={appointment.status} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-medium text-slate-500">Date</p>
                            <p className="text-sm text-slate-900 mt-1">{format(parseISO(appointment.date), 'PPP')}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Time</p>
                            <p className="text-sm text-slate-900 mt-1">{appointment.time}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-500">Appointment Type</p>
                        <p className="text-sm text-slate-900 mt-1">{appointment.type}</p>
                    </div>

                    {appointment.doctor_name && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Doctor</p>
                            <p className="text-sm text-slate-900 mt-1 flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-slate-400" />
                                {appointment.doctor_name}
                            </p>
                        </div>
                    )}

                    {appointment.facility_name && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Facility</p>
                            <p className="text-sm text-slate-900 mt-1">{appointment.facility_name}</p>
                        </div>
                    )}

                    {appointment.notes && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Notes</p>
                            <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-2 rounded-md border border-slate-200">
                                {appointment.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-2 p-4 border-t border-slate-200 bg-slate-50">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        className="w-full sm:w-auto"
                        asChild
                    >
                        <Link href={`/patients/registry/${appointment.patient_uuid}/appointments`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Patient Appointments
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Main Appointment Table Component
export default function AppointmentTable({ appointments = [] }: AppointmentTableProps) {
    const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 10;

    // Filter appointments based on period and search
    const filteredAppointments = useMemo(() => {
        // Ensure appointments is an array
        if (!appointments || !Array.isArray(appointments) || appointments.length === 0) {
            return [];
        }

        let filtered = [...appointments];

        // Period filter
        const now = new Date();
        filtered = filtered.filter(app => {
            try {
                const appDate = parseISO(app.date);
                switch (filterPeriod) {
                    case 'today':
                        return isToday(appDate);
                    case 'weekly':
                        return isThisWeek(appDate, { weekStartsOn: 1 });
                    case 'monthly':
                        return isThisMonth(appDate);
                    case 'all':
                    default:
                        return true;
                }
            } catch (error) {
                return false;
            }
        });

        // Search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(app =>
                app.patient_name?.toLowerCase().includes(term) ||
                app.type?.toLowerCase().includes(term) ||
                app.doctor_name?.toLowerCase().includes(term) ||
                app.facility_name?.toLowerCase().includes(term)
            );
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => {
            try {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateB.getTime() - dateA.getTime();
            } catch {
                return 0;
            }
        });

        return filtered;
    }, [appointments, filterPeriod, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    const paginatedAppointments = useMemo(() => {
        if (filteredAppointments.length === 0) return [];
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredAppointments.slice(start, end);
    }, [filteredAppointments, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewDetails = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    // Reset to first page when filter or search changes
    useMemo(() => {
        setCurrentPage(1);
    }, [filterPeriod, searchTerm]);

    return (
        <div className="space-y-3 p-2 bg-slate-100 rounded-lg">
            {/* Filters and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                    <Button
                        variant={filterPeriod === 'today' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterPeriod('today')}
                        className="h-7 text-xs px-3"
                    >
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        Today
                    </Button>
                    <Button
                        variant={filterPeriod === 'weekly' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterPeriod('weekly')}
                        className="h-7 text-xs px-3"
                    >
                        <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                        Weekly
                    </Button>
                    <Button
                        variant={filterPeriod === 'monthly' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterPeriod('monthly')}
                        className="h-7 text-xs px-3"
                    >
                        <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                        Monthly
                    </Button>
                    <Button
                        variant={filterPeriod === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterPeriod('all')}
                        className="h-7 text-xs px-3"
                    >
                        <ListChecks className="h-3.5 w-3.5 mr-1.5" />
                        All
                    </Button>
                </div>

                <div className="relative w-full sm:w-48">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 h-7 text-xs"
                    />
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
            </div>

            {/* Results count */}
            <div className="text-xs text-slate-500">
                {filteredAppointments.length === 0 ? (
                    'No appointments found'
                ) : (
                    `${paginatedAppointments.length} of ${filteredAppointments.length} appointments`
                )}
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="w-[160px] text-xs font-medium">Patient</TableHead>
                                <TableHead className="w-[130px] text-xs font-medium">Date & Time</TableHead>
                                <TableHead className="w-[120px] text-xs font-medium">Type</TableHead>
                                <TableHead className="w-[100px] text-xs font-medium">Status</TableHead>
                                <TableHead className="w-[120px] text-xs font-medium">Doctor</TableHead>
                                <TableHead className="w-[80px] text-right text-xs font-medium">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedAppointments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6 text-slate-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <Calendar className="h-6 w-6 text-slate-300" />
                                            <p className="text-sm">No appointments found</p>
                                            <p className="text-xs">Try adjusting your filters</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedAppointments.map((appointment) => (
                                    <TableRow key={appointment.id} className="hover:bg-slate-50">
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback
                                                        className="bg-blue-100 text-blue-700 text-[10px] font-medium">
                                                        {appointment.patient_initial || appointment.patient_name?.substring(0, 2).toUpperCase() || '??'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span
                                                    className="text-sm font-medium text-slate-900 truncate max-w-[120px]">
                                                    {appointment.patient_name || 'Unknown'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-xs">
                                                    {appointment.date ? format(parseISO(appointment.date), 'MMM dd') : '—'}
                                                </span>
                                                <span
                                                    className="text-[10px] text-slate-500">{appointment.time || '—'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className="text-xs truncate block max-w-[100px]">{appointment.type || '—'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={appointment.status} />
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-slate-700 truncate block max-w-[100px]">
                                                {appointment.doctor_name || '—'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-0.5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(appointment)}
                                                    className="h-6 w-6 p-0"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    className="h-6 w-6 p-0"
                                                    title="View Patient Appointments"
                                                >
                                                    <Link
                                                        href={`/patients/registry/${appointment.patient_uuid}/appointments`}>
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-3 py-2 border-t bg-slate-50">
                        <div className="text-xs text-slate-500">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-0.5">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="h-6 w-6 p-0"
                            >
                                <ChevronsLeft className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-6 w-6 p-0"
                            >
                                <ChevronLeft className="h-3 w-3" />
                            </Button>

                            {totalPages <= 5 ? (
                                [...Array(totalPages)].map((_, idx) => {
                                    const pageNum = idx + 1;
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                            className="h-6 w-6 p-0 text-xs"
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })
                            ) : (
                                <>
                                    {currentPage > 3 && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(1)}
                                                className="h-6 w-6 p-0 text-xs"
                                            >
                                                1
                                            </Button>
                                            {currentPage > 4 && <span className="text-xs px-0.5">...</span>}
                                        </>
                                    )}

                                    {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                                        let pageNum;
                                        if (currentPage <= 3) {
                                            pageNum = idx + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 2 + idx;
                                        } else {
                                            pageNum = currentPage - 1 + idx;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => handlePageChange(pageNum)}
                                                className="h-6 w-6 p-0 text-xs"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}

                                    {currentPage < totalPages - 2 && (
                                        <>
                                            {currentPage < totalPages - 3 &&
                                                <span className="text-xs px-0.5">...</span>}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(totalPages)}
                                                className="h-6 w-6 p-0 text-xs"
                                            >
                                                {totalPages}
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-6 w-6 p-0"
                            >
                                <ChevronRight className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="h-6 w-6 p-0"
                            >
                                <ChevronsRight className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Appointment Details Modal */}
            <AppointmentDetailsModal
                appointment={selectedAppointment}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedAppointment(null);
                }}
            />
        </div>
    );
}

// Layout configuration for the page
AppointmentTable.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Appointments',
            href: '',
        },
    ],
};

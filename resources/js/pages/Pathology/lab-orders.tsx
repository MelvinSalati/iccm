import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import Http from '@/utils/Http';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Calendar,
    CalendarDays,
    CalendarRange,
    ListChecks,
    Eye,
    X,
    FlaskConical,
    FileText,
    Search,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Building,
    Phone,
    Calendar as CalendarIcon,
    Activity,
    UserCircle,
    Stethoscope,
    ClipboardList,
    TrendingUp,
    Users,
    Filter,
    Download,
    Plus,
    Edit,
    Trash2,
    QrCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import SampleQualityAssessmentModal from './components/modals/SampleQualityAssessmentModal';
import ResultsEntryModal from './components/modals/ResultsEntryModal';

// Dummy data for testing
const DUMMY_ORDERS = [
    {
        id: 1,
        laboratory_uuid: 'LAB-2024-001',
        patient_id: 101,
        patient_name: 'Sarah Mwansa',
        patient_first_name: 'Sarah',
        patient_last_name: 'Mwansa',
        patient_date_of_birth: '1990-05-15',
        patient_gender: 'female',
        patient_phone: '+260971234567',
        facility_id: 1,
        facility_name: 'University Teaching Hospital',
        ordered_by: 5,
        ordered_by_name: 'Dr. James Banda',
        results: null,
        status: 'pending',
        sample_status: null, // 'accepted' or 'rejected'
        processed_by: null,
        processed_by_name: null,
        comment: 'Cervical biopsy for histopathological examination',
        priority: 'urgent',
        test_count: 1,
        test_names: 'Histopathology - Cervical Biopsy',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 2,
        laboratory_uuid: 'LAB-2024-002',
        patient_id: 102,
        patient_name: 'John Chanda',
        patient_first_name: 'John',
        patient_last_name: 'Chanda',
        patient_date_of_birth: '1985-10-20',
        patient_gender: 'male',
        patient_phone: '+260972345678',
        facility_id: 2,
        facility_name: 'Chipata Central Hospital',
        ordered_by: 3,
        ordered_by_name: 'Dr. Mary Zulu',
        results: null,
        status: 'pending',
        sample_status: null,
        processed_by: null,
        processed_by_name: null,
        comment: 'Routine blood work requested',
        priority: 'routine',
        test_count: 3,
        test_names: 'CBC, Lipid Profile, FBS',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
    }
];

// Status Badge with Dot
const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
        pending: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-800',
            border: 'border-yellow-200',
            dot: 'bg-yellow-400',
            label: 'Pending',
            icon: Clock
        },
        completed: {
            bg: 'bg-green-50',
            text: 'text-green-800',
            border: 'border-green-200',
            dot: 'bg-green-400',
            label: 'Completed',
            icon: CheckCircle
        },
        rejected: {
            bg: 'bg-red-50',
            text: 'text-red-800',
            border: 'border-red-200',
            dot: 'bg-red-400',
            label: 'Rejected',
            icon: XCircle
        },
        processing: {
            bg: 'bg-blue-50',
            text: 'text-blue-800',
            border: 'border-blue-200',
            dot: 'bg-blue-400',
            label: 'Processing',
            icon: AlertCircle
        },
        cancelled: {
            bg: 'bg-gray-50',
            text: 'text-gray-800',
            border: 'border-gray-200',
            dot: 'bg-gray-400',
            label: 'Cancelled',
            icon: XCircle
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
        <span className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
            config.bg,
            config.text,
            config.border
        )}>
            <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
            {config.label}
        </span>
    );
};

// Sample Status Badge
const SampleStatusBadge = ({ status }: { status: string }) => {
    if (!status) return null;

    const config = {
        accepted: {
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200',
            label: 'Accepted',
            icon: CheckCircle
        },
        rejected: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            label: 'Rejected',
            icon: XCircle
        }
    };

    const c = config[status as keyof typeof config];
    if (!c) return null;

    const Icon = c.icon;

    return (
        <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
            c.bg,
            c.text,
            c.border
        )}>
            <Icon className="h-3 w-3" />
            {c.label}
        </span>
    );
};

// Priority Badge
const PriorityBadge = ({ priority }: { priority: string }) => {
    const priorityConfig = {
        routine: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            label: 'Routine'
        },
        urgent: {
            bg: 'bg-orange-50',
            text: 'text-orange-700',
            border: 'border-orange-200',
            label: 'Urgent'
        },
        stat: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            label: 'STAT'
        },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.routine;

    return (
        <span className={cn(
            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
            config.bg,
            config.text,
            config.border
        )}>
            {config.label}
        </span>
    );
};

// ============================================
// UNIFORM MODAL COMPONENT
// ============================================
interface UniformModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    maxHeight?: string;
}

const UniformModal: React.FC<UniformModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       title,
                                                       icon,
                                                       children,
                                                       footer,
                                                       size = 'lg',
                                                       maxHeight = '90vh'
                                                   }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-3xl',
        xl: 'max-w-4xl'
    };

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className={cn(
                    "bg-white rounded-xl shadow-2xl w-full max-h-[90vh] flex flex-col",
                    sizeClasses[size]
                )} style={{ maxHeight }}>
                    {/* Header */}
                    <div className="flex-shrink-0 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between bg-white rounded-t-xl">
                        <div className="flex items-center gap-2.5">
                            {icon && (
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    {icon}
                                </div>
                            )}
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="flex-shrink-0 border-t border-slate-200 px-5 py-3 bg-slate-50/50 rounded-b-xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// ============================================
// ORDER DETAILS MODAL (UNIFORM)
// ============================================
const OrderDetailsModal = ({
                               order,
                               isOpen,
                               onClose,
                               onQualityAssessment,
                               onResultsEntry
                           }: {
    order: any;
    isOpen: boolean;
    onClose: () => void;
    onQualityAssessment: (order: any) => void;
    onResultsEntry: (order: any) => void;
}) => {
    if (!order) return null;

    const canEnterResults = order.sample_status === 'accepted';

    return (
        <UniformModal
            isOpen={isOpen}
            onClose={onClose}
            title="Order Details"
            icon={<FlaskConical className="h-4 w-4" />}
            size="lg"
            footer={
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-xs"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    {order.status !== 'completed' && order.status !== 'rejected' && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto text-xs"
                                onClick={() => {
                                    onClose();
                                    onQualityAssessment(order);
                                }}
                            >
                                <FileText className="h-3.5 w-3.5 mr-1.5" />
                                Quality Assessment
                            </Button>
                            {canEnterResults && (
                                <Button
                                    size="sm"
                                    className="w-full sm:w-auto text-xs bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                        onClose();
                                        onResultsEntry(order);
                                    }}
                                >
                                    <FlaskConical className="h-3.5 w-3.5 mr-1.5" />
                                    Enter Results
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                {/* Order Info with QR Code */}
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded border">
                            <QrCode className="h-10 w-10 text-slate-700" />
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Order Number</p>
                            <p className="text-sm font-mono font-semibold text-slate-900">{order.laboratory_uuid || '—'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Status</p>
                        <div className="mt-0.5">
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                </div>

                {/* Patient Info - No ID visible */}
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <h4 className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        Patient Information
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2">
                            <p className="text-[10px] text-blue-600">Name</p>
                            <p className="text-sm font-medium text-slate-900">{order.patient_name || 'Unknown'}</p>
                        </div>
                        {order.patient_date_of_birth && (
                            <div>
                                <p className="text-[10px] text-blue-600">Date of Birth</p>
                                <p className="text-sm text-slate-900">
                                    {format(parseISO(order.patient_date_of_birth), 'MMM d, yyyy')}
                                </p>
                            </div>
                        )}
                        {order.patient_gender && (
                            <div>
                                <p className="text-[10px] text-blue-600">Gender</p>
                                <p className="text-sm text-slate-900 capitalize">{order.patient_gender}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sample Status */}
                {order.sample_status && (
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Sample Status</p>
                        <div className="mt-1">
                            <SampleStatusBadge status={order.sample_status} />
                        </div>
                    </div>
                )}

                {/* Facility & Staff */}
                <div className="grid grid-cols-2 gap-2">
                    {order.facility_name && (
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Facility</p>
                            <p className="text-sm text-slate-900 mt-0.5 flex items-center gap-1">
                                <Building className="h-3.5 w-3.5 text-slate-400" />
                                {order.facility_name}
                            </p>
                        </div>
                    )}
                    {order.ordered_by_name && (
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Ordered By</p>
                            <p className="text-sm text-slate-900 mt-0.5">{order.ordered_by_name}</p>
                        </div>
                    )}
                </div>

                {/* Tests */}
                {order.test_names && (
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                            Tests ({order.test_count || 0})
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {order.test_names.split(',').map((test: string, index: number) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                                    {test.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comment */}
                {order.comment && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                        <p className="text-[10px] font-medium text-amber-700 uppercase tracking-wider">Comment</p>
                        <p className="text-sm text-slate-700 mt-1">{order.comment}</p>
                    </div>
                )}
            </div>
        </UniformModal>
    );
};

export default function LabOrders() {
    const { orders: initialOrders, auth } = usePage().props;
    const [orders, setOrders] = useState(initialOrders?.length ? initialOrders : DUMMY_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showQualityModal, setShowQualityModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const itemsPerPage = 10;

    useEffect(() => {
        if (initialOrders?.length) {
            setOrders(initialOrders);
        }
    }, [initialOrders]);

    const filteredOrders = useMemo(() => {
        if (!orders || !Array.isArray(orders)) return [];

        let filtered = [...orders];

        // Period filter
        const now = new Date();
        filtered = filtered.filter(order => {
            try {
                const orderDate = order.created_at ? parseISO(order.created_at) : new Date();
                switch (filterPeriod) {
                    case 'today':
                        return isToday(orderDate);
                    case 'weekly':
                        return isThisWeek(orderDate, { weekStartsOn: 1 });
                    case 'monthly':
                        return isThisMonth(orderDate);
                    case 'all':
                    default:
                        return true;
                }
            } catch (error) {
                return false;
            }
        });

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(order =>
                order.id?.toString().includes(term) ||
                (order.laboratory_uuid || '').toLowerCase().includes(term) ||
                (order.patient_name || '').toLowerCase().includes(term)
            );
        }

        filtered.sort((a, b) => {
            try {
                const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                return dateB.getTime() - dateA.getTime();
            } catch {
                return 0;
            }
        });

        return filtered;
    }, [orders, filterPeriod, statusFilter, searchTerm]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = useMemo(() => {
        if (filteredOrders.length === 0) return [];
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredOrders.slice(start, end);
    }, [filteredOrders, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterPeriod, statusFilter, searchTerm]);

    const handleSampleAssessment = async (data) => {
        try {
            const response = await Http.post(
                `/laboratory/orders/${data.laboratory_order_id}/sample-assessment`,
                data
            );
            if (response.status === 200 || response.status === 201) {
                // Update the order with sample status
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === data.laboratory_order_id
                            ? { ...order, sample_status: data.sample_quality === 'adequate' ? 'accepted' : 'rejected' }
                            : order
                    )
                );
                setShowQualityModal(false);
            }
        } catch (error) {
            console.error('Assessment failed:', error);
            alert(error.response?.data?.message || 'Assessment failed!');
        }
    };

    const handleResultsEntry = async (data) => {
        try {
            const response = await Http.post(
                `/laboratory/orders/${data.order_id}/results`,
                data
            );
            if (response.status === 200 || response.status === 201) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === data.order_id
                            ? { ...order, status: 'completed', results: data.results }
                            : order
                    )
                );
                setShowResultsModal(false);
            }
        } catch (error) {
            console.error('Results entry failed:', error);
            alert(error.response?.data?.message || 'Results entry failed!');
        }
    };

    const openQualityAssessment = (order) => {
        setSelectedOrder(order);
        setShowQualityModal(true);
    };

    const openResultsEntry = (order) => {
        setSelectedOrder(order);
        setShowResultsModal(true);
    };

    const openDetailsModal = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    const getStatusCount = (status) => {
        if (status === 'all') return orders.length;
        return orders.filter(order => order.status === status).length;
    };

    const getPeriodCount = (period) => {
        const now = new Date();
        return orders.filter(order => {
            try {
                const orderDate = order.created_at ? parseISO(order.created_at) : new Date();
                switch (period) {
                    case 'today':
                        return isToday(orderDate);
                    case 'weekly':
                        return isThisWeek(orderDate, { weekStartsOn: 1 });
                    case 'monthly':
                        return isThisMonth(orderDate);
                    case 'all':
                    default:
                        return true;
                }
            } catch {
                return false;
            }
        }).length;
    };

    return (
        <div className="space-y-3 p-2 bg-slate-100 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Laboratory Orders</h1>
                <span className="text-sm text-slate-500">
                    Total: {orders.length} orders
                </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
                <Button
                    variant={filterPeriod === 'today' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPeriod('today')}
                    className="h-7 text-xs px-2.5"
                >
                    <Calendar className="h-3 w-3 mr-1" />
                    Today ({getPeriodCount('today')})
                </Button>
                <Button
                    variant={filterPeriod === 'weekly' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPeriod('weekly')}
                    className="h-7 text-xs px-2.5"
                >
                    <CalendarDays className="h-3 w-3 mr-1" />
                    Weekly ({getPeriodCount('weekly')})
                </Button>
                <Button
                    variant={filterPeriod === 'monthly' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPeriod('monthly')}
                    className="h-7 text-xs px-2.5"
                >
                    <CalendarRange className="h-3 w-3 mr-1" />
                    Monthly ({getPeriodCount('monthly')})
                </Button>
                <Button
                    variant={filterPeriod === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPeriod('all')}
                    className="h-7 text-xs px-2.5"
                >
                    <ListChecks className="h-3 w-3 mr-1" />
                    All ({getPeriodCount('all')})
                </Button>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
                <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                    className="h-7 text-xs px-2.5"
                >
                    All Status ({getStatusCount('all')})
                </Button>
                <Button
                    variant={statusFilter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('pending')}
                    className={cn(
                        "h-7 text-xs px-2.5",
                        statusFilter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-300 text-yellow-700'
                    )}
                >
                    <Clock className="h-3 w-3 mr-1" />
                    Pending ({getStatusCount('pending')})
                </Button>
                <Button
                    variant={statusFilter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('completed')}
                    className={cn(
                        "h-7 text-xs px-2.5",
                        statusFilter === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300 text-green-700'
                    )}
                >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed ({getStatusCount('completed')})
                </Button>
                <Button
                    variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('rejected')}
                    className={cn(
                        "h-7 text-xs px-2.5",
                        statusFilter === 'rejected' ? 'bg-red-600 hover:bg-red-700' : 'border-red-300 text-red-700'
                    )}
                >
                    <XCircle className="h-3 w-3 mr-1" />
                    Rejected ({getStatusCount('rejected')})
                </Button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
                <Input
                    placeholder="Search by patient or order..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-7 text-xs"
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Results count */}
            <div className="text-xs text-slate-500">
                {filteredOrders.length === 0 ? (
                    'No orders found'
                ) : (
                    `${paginatedOrders.length} of ${filteredOrders.length} orders`
                )}
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="w-[80px] text-xs font-medium">Order</TableHead>
                                <TableHead className="w-[130px] text-xs font-medium">Order #</TableHead>
                                <TableHead className="w-[200px] text-xs font-medium">Patient</TableHead>
                                <TableHead className="w-[100px] text-xs font-medium">Priority</TableHead>
                                <TableHead className="w-[100px] text-xs font-medium">Sample</TableHead>
                                <TableHead className="w-[110px] text-xs font-medium">Created</TableHead>
                                <TableHead className="text-center w-[140px] text-xs font-medium">Status</TableHead>
                                <TableHead className="w-[120px] text-right text-xs font-medium">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-6 text-slate-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <FlaskConical className="h-6 w-6 text-slate-300" />
                                            <p className="text-sm">No orders found</p>
                                            <p className="text-xs">Try adjusting your filters</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const canEnterResults = order.sample_status === 'accepted' && order.status !== 'completed';

                                    return (
                                        <TableRow key={order.id} className="hover:bg-slate-50">
                                            <TableCell>
                                                <span className="text-sm font-medium text-slate-900">#{order.id}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-mono text-slate-500 truncate block max-w-[120px]">
                                                    {order.laboratory_uuid || '—'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7">
                                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px] font-medium">
                                                            {order.patient_name ? order.patient_name.charAt(0).toUpperCase() : 'P'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {order.patient_name || 'Unknown'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <PriorityBadge priority={order.priority || 'routine'} />
                                            </TableCell>
                                            <TableCell>
                                                <SampleStatusBadge status={order.sample_status} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-xs">
                                                        {order.created_at ? format(parseISO(order.created_at), 'MMM dd') : '—'}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500">
                                                        {order.created_at ? format(parseISO(order.created_at), 'HH:mm') : '—'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <StatusBadge status={order.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-0.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openDetailsModal(order)}
                                                        className="h-6 w-6 p-0"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </Button>
                                                    {order.status !== 'completed' && order.status !== 'rejected' && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openQualityAssessment(order)}
                                                                className="h-6 w-6 p-0"
                                                                title="Quality Assessment"
                                                            >
                                                                <FileText className="h-3.5 w-3.5" />
                                                            </Button>
                                                            {canEnterResults && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => openResultsEntry(order)}
                                                                    className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                                                                    title="Enter Results"
                                                                >
                                                                    <FlaskConical className="h-3.5 w-3.5" />
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                    {order.status === 'completed' && (
                                                        <span className="text-xs text-green-600 font-medium px-1">✓</span>
                                                    )}
                                                    {order.status === 'rejected' && (
                                                        <span className="text-xs text-red-600 font-medium px-1">✗</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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

            {/* Modals - Decoupled with independent triggers */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={showDetailsModal}
                onClose={() => {
                    setShowDetailsModal(false);
                    setSelectedOrder(null);
                }}
                onQualityAssessment={openQualityAssessment}
                onResultsEntry={openResultsEntry}
            />

            <SampleQualityAssessmentModal
                isOpen={showQualityModal}
                onClose={() => {
                    setShowQualityModal(false);
                    setSelectedOrder(null);
                }}
                handleSave={handleSampleAssessment}
                order={selectedOrder}
                userId={auth?.user?.id}
                patientId={selectedOrder?.patient_id}
            />

            <ResultsEntryModal
                isOpen={showResultsModal}
                onClose={() => {
                    setShowResultsModal(false);
                    setSelectedOrder(null);
                }}
                handleSave={handleResultsEntry}
                order={selectedOrder}
                userId={auth?.user?.id}
                patientId={selectedOrder?.patient_id}
            />
        </div>
    );
}

LabOrders.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Laboratory Orders',
            href: '',
        },
    ],
};

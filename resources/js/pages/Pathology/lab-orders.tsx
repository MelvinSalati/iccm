// resources/js/pages/pathology/laboratory-orders.jsx
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
    AlertCircle
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
        facility_id: 1,
        ordered_by: 5,
        results: null,
        status: 'pending',
        processed_by: null,
        comment: 'Routine blood work requested',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 2,
        laboratory_uuid: 'LAB-2024-002',
        patient_id: 102,
        facility_id: 2,
        ordered_by: 3,
        results: 'All values normal. No abnormalities detected.',
        status: 'completed',
        processed_by: 7,
        comment: 'Results reviewed and approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 3,
        laboratory_uuid: 'LAB-2024-003',
        patient_id: 103,
        facility_id: 1,
        ordered_by: 5,
        results: null,
        status: 'pending',
        processed_by: null,
        comment: 'Urgent: Troponin levels requested',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 4,
        laboratory_uuid: 'LAB-2024-004',
        patient_id: 104,
        facility_id: 3,
        ordered_by: 8,
        results: 'Elevated cholesterol levels detected. Follow-up recommended.',
        status: 'completed',
        processed_by: 7,
        comment: 'Results sent to referring physician',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
        id: 5,
        laboratory_uuid: 'LAB-2024-005',
        patient_id: 105,
        facility_id: 2,
        ordered_by: 3,
        results: null,
        status: 'rejected',
        processed_by: 9,
        comment: 'Sample hemolyzed. New sample required.',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString()
    },
    {
        id: 6,
        laboratory_uuid: 'LAB-2024-006',
        patient_id: 106,
        facility_id: 1,
        ordered_by: 5,
        results: 'CBC results within normal range. WBC: 7.2, RBC: 5.1',
        status: 'completed',
        processed_by: 10,
        comment: 'Normal complete blood count',
        created_at: new Date(Date.now() - 345600000).toISOString(),
        updated_at: new Date(Date.now() - 345600000).toISOString()
    },
    {
        id: 7,
        laboratory_uuid: 'LAB-2024-007',
        patient_id: 107,
        facility_id: 3,
        ordered_by: 8,
        results: null,
        status: 'pending',
        processed_by: null,
        comment: 'HIV screening test requested',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
        id: 8,
        laboratory_uuid: 'LAB-2024-008',
        patient_id: 108,
        facility_id: 2,
        ordered_by: 3,
        results: 'Glucose: 95 mg/dL (normal)',
        status: 'completed',
        processed_by: 7,
        comment: 'Fasting blood sugar completed',
        created_at: new Date(Date.now() - 432000000).toISOString(),
        updated_at: new Date(Date.now() - 432000000).toISOString()
    },
    {
        id: 9,
        laboratory_uuid: 'LAB-2024-009',
        patient_id: 109,
        facility_id: 1,
        ordered_by: 5,
        results: null,
        status: 'rejected',
        processed_by: 9,
        comment: 'Insufficient sample volume. Please recollect.',
        created_at: new Date(Date.now() - 518400000).toISOString(),
        updated_at: new Date(Date.now() - 518400000).toISOString()
    },
    {
        id: 10,
        laboratory_uuid: 'LAB-2024-010',
        patient_id: 110,
        facility_id: 3,
        ordered_by: 8,
        results: 'Thyroid function test: TSH 3.2 mIU/L (normal)',
        status: 'completed',
        processed_by: 10,
        comment: 'Thyroid panel completed',
        created_at: new Date(Date.now() - 604800000).toISOString(),
        updated_at: new Date(Date.now() - 604800000).toISOString()
    },
    {
        id: 11,
        laboratory_uuid: 'LAB-2024-011',
        patient_id: 111,
        facility_id: 2,
        ordered_by: 3,
        results: null,
        status: 'pending',
        processed_by: null,
        comment: 'Urinalysis requested for UTI screening',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        updated_at: new Date(Date.now() - 1800000).toISOString()
    }
];

// Status Badge with Dot - Using Tailwind CSS badge styles
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

// Order Details Modal
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
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-blue-600" />
                        Order Details
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
                            <p className="text-xs font-medium text-slate-500">Order ID</p>
                            <p className="text-sm font-medium text-slate-900 mt-1">#{order.id}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Status</p>
                            <div className="mt-1">
                                <StatusBadge status={order.status} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-500">Patient</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                    P{order.patient_id}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium text-slate-900">Patient #{order.patient_id}</p>
                        </div>
                    </div>

                    {order.laboratory_uuid && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Order Number</p>
                            <p className="text-sm text-slate-900 mt-1 font-mono text-xs">{order.laboratory_uuid}</p>
                        </div>
                    )}

                    {order.ordered_by && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Ordered By</p>
                            <p className="text-sm text-slate-900 mt-1">User #{order.ordered_by}</p>
                        </div>
                    )}

                    {order.facility_id && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Facility</p>
                            <p className="text-sm text-slate-900 mt-1">Facility #{order.facility_id}</p>
                        </div>
                    )}

                    {order.results && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Results</p>
                            <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-2 rounded-md border border-slate-200">
                                {order.results}
                            </p>
                        </div>
                    )}

                    {order.comment && (
                        <div>
                            <p className="text-xs font-medium text-slate-500">Comment</p>
                            <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-2 rounded-md border border-slate-200">
                                {order.comment}
                            </p>
                        </div>
                    )}

                    <div>
                        <p className="text-xs font-medium text-slate-500">Created</p>
                        <p className="text-sm text-slate-900 mt-1">
                            {order.created_at ? format(parseISO(order.created_at), 'PPP p') : '—'}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-2 p-4 border-t border-slate-200 bg-slate-50">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-xs"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    {order.status !== 'completed' && order.status !== 'rejected' && (
                        <>
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
                                Quality
                            </Button>
                            <Button
                                size="sm"
                                className="w-full sm:w-auto text-xs bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                    onClose();
                                    onResultsEntry(order);
                                }}
                            >
                                <FlaskConical className="h-3.5 w-3.5 mr-1.5" />
                                Results
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function LabOrders() {
    // Use dummy data if no orders provided
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
                order.id.toString().includes(term) ||
                (order.laboratory_uuid || '').toLowerCase().includes(term) ||
                order.patient_id.toString().includes(term)
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
                setOrders(prevOrders =>
                    prevOrders.filter(order => order.id !== data.laboratory_order_id)
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

            {/* Filter Buttons - Compact */}
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

            {/* Status Filter Buttons - Compact */}
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
                    placeholder="Search orders..."
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
                                <TableHead className="w-[90px] text-xs font-medium">Patient</TableHead>
                                <TableHead className="w-[110px] text-xs font-medium">Created</TableHead>
                                <TableHead className="text-right w-[140px] text-xs font-medium">Status</TableHead>
                                <TableHead className="w-[100px] text-right text-xs font-medium">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6 text-slate-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <FlaskConical className="h-6 w-6 text-slate-300" />
                                            <p className="text-sm">No orders found</p>
                                            <p className="text-xs">Try adjusting your filters</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedOrders.map((order) => (
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
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px] font-medium">
                                                        P{order.patient_id}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-slate-700">
                                                    #{order.patient_id}
                                                </span>
                                            </div>
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
                                        <TableCell className="text-right">
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
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => openResultsEntry(order)}
                                                            className="h-6 w-6 p-0 text-green-600"
                                                            title="Enter Results"
                                                        >
                                                            <FlaskConical className="h-3.5 w-3.5" />
                                                        </Button>
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination - Compact */}
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

            {/* Modals */}
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

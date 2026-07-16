// resources/js/components/appointments/appointment-table.tsx
import { useState, useMemo, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
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
    X,
    Clock,
    MapPin,
    FileText,
    CheckCircle,
    Edit,
    Save,
    UserCircle,
    Phone,
    Mail,
    ClipboardCheck,
    Activity,
    CalendarPlus,
    ChevronDown,
    AlertCircle,
    Pencil, Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { dashboard } from '@/routes';
import Notiflix from 'notiflix';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

// Types
interface Appointment {
    id: number | string;
    patient_uuid: string;
    patient_name: string;
    patient_initial?: string;
    patient_email?: string;
    patient_phone?: string;
    patient_nrc?: string;
    date: string;
    time: string;
    type: string;
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | 'in-progress';
    doctor_name?: string;
    doctor_id?: string;
    facility_name?: string;
    notes?: string;
    review_notes?: string;
    department?: string;
    priority?: string;
    duration_minutes?: number;
    created_at?: string;
    reason?: string;
    follow_up_needed?: boolean;
    follow_up_date?: string;
}

interface AppointmentTableProps {
    appointments?: Appointment[];
}

type FilterPeriod = 'today' | 'weekly' | 'monthly' | 'all';

// Status badge component
const StatusBadge = ({ status }: { status: Appointment['status'] }) => {
    const statusConfig = {
        scheduled: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Scheduled' },
        confirmed: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Confirmed' },
        'in-progress': { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'In Progress' },
        completed: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Completed' },
        cancelled: { color: 'bg-red-50 text-red-700 border-red-200', label: 'Cancelled' },
        'no-show': { color: 'bg-orange-50 text-orange-700 border-orange-200', label: 'No Show' },
    };

    const config = statusConfig[status] || statusConfig.scheduled;

    return (
        <Badge variant="outline" className={cn('px-2 py-0.5 text-xs font-medium', config.color)}>
            {config.label}
        </Badge>
    );
};

// Priority Badge
const PriorityBadge = ({ priority }: { priority?: string }) => {
    const priorityConfig = {
        emergency: { color: 'bg-red-50 text-red-700 border-red-200', label: 'Emergency' },
        urgent: { color: 'bg-orange-50 text-orange-700 border-orange-200', label: 'Urgent' },
        routine: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Routine' },
    };

    const config = priorityConfig[priority?.toLowerCase() as keyof typeof priorityConfig] || priorityConfig.routine;

    return (
        <Badge variant="outline" className={cn('px-2 py-0.5 text-xs font-medium', config.color)}>
            {config.label}
        </Badge>
    );
};

// Appointment Details Modal Component
interface AppointmentDetailsModalProps {
    appointment: Appointment | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: (data: any) => void;
}

function AppointmentDetailsModal({ appointment, isOpen, onClose, onUpdate }: AppointmentDetailsModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showFollowUp, setShowFollowUp] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        status: '',
        review_notes: '',
        notes: '',
        doctor_name: '',
        department: '',
        priority: '',
        duration_minutes: 30,
        reason: '',
        follow_up_needed: false,
        follow_up_date: '',
    });

    useEffect(() => {
        if (appointment) {
            setFormData({
                status: appointment.status || 'scheduled',
                review_notes: appointment.review_notes || '',
                notes: appointment.notes || '',
                doctor_name: appointment.doctor_name || '',
                department: appointment.department || '',
                priority: appointment.priority || 'routine',
                duration_minutes: appointment.duration_minutes || 30,
                reason: appointment.reason || '',
                follow_up_needed: appointment.follow_up_needed || false,
                follow_up_date: appointment.follow_up_date || '',
            });
            setShowFollowUp(appointment.follow_up_needed || false);
        }
    }, [appointment]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
            setIsSaving(false);
        }
    }, [isOpen]);

    if (!isOpen || !appointment) return null;

    const getStatusColor = (status: string) => {
        const colors = {
            scheduled: 'bg-blue-50 border-blue-200 text-blue-700',
            confirmed: 'bg-emerald-50 border-emerald-200 text-emerald-700',
            'in-progress': 'bg-amber-50 border-amber-200 text-amber-700',
            completed: 'bg-purple-50 border-purple-200 text-purple-700',
            cancelled: 'bg-red-50 border-red-200 text-red-700',
            'no-show': 'bg-orange-50 border-orange-200 text-orange-700',
        };
        return colors[status as keyof typeof colors] || colors.scheduled;
    };

    const handleStatusChange = (newStatus: string) => {
        setFormData(prev => ({ ...prev, status: newStatus }));
    };

    const handleSave = async () => {
        if (isSaving) return;

        setIsSaving(true);

        try {
            const updateData = {
                id: appointment.id,
                status: formData.status,
                review_notes: formData.review_notes,
                notes: formData.notes,
                doctor_name: formData.doctor_name,
                reason: formData.reason,
                follow_up_needed: showFollowUp,
                follow_up_date: showFollowUp ? formData.follow_up_date : null,
            };

            console.log('Saving appointment data:', updateData);

            if (onUpdate) {
                await onUpdate(updateData);
                Notiflix.Notify.success('Appointment updated successfully!');
                setIsEditing(false);
                onClose();
            } else {
                Notiflix.Notify.success('Appointment updated successfully!');
                setIsEditing(false);
                onClose();
            }
        } catch (error: any) {
            console.error('Error saving appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment. Please try again.';
            Notiflix.Notify.failure(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePatientShowUp = () => {
        handleStatusChange('completed');
        Notiflix.Notify.success('Patient marked as showed up. Status updated to Completed.');
    };

    const statusOptions = [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'no-show', label: 'No Show' },
    ];

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/50"
                onClick={() => { setIsEditing(false); onClose(); }}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header - Patient Details */}
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 rounded-t-lg flex-shrink-0">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <Avatar className="h-12 w-12 border border-slate-200 flex-shrink-0">
                                    <AvatarFallback className="bg-slate-200 text-slate-700 text-sm font-medium">
                                        {appointment.patient_initial || appointment.patient_name?.substring(0, 2).toUpperCase() || '??'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold text-slate-900 truncate">{appointment.patient_name}</h3>
                                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                                        {appointment.patient_nrc && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <UserCircle className="h-3 w-3" />
                                                {appointment.patient_nrc}
                                            </span>
                                        )}
                                        {appointment.patient_phone && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {appointment.patient_phone}
                                            </span>
                                        )}
                                        {appointment.patient_email && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1 truncate max-w-[150px]">
                                                <Mail className="h-3 w-3 flex-shrink-0" />
                                                <span className="truncate">{appointment.patient_email}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="h-8 px-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                                    disabled={isSaving}
                                >
                                    {isEditing ? (
                                        <X className="h-4 w-4" />
                                    ) : (
                                        <Pencil className="h-4 w-4" />
                                    )}
                                </Button>
                                <button
                                    onClick={() => { setIsEditing(false); onClose(); }}
                                    className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-500"
                                    disabled={isSaving}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-200">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Status:</span>
                                <Badge className={cn('px-2 py-0.5 text-xs font-medium border', getStatusColor(formData.status))}>
                                    {statusOptions.find(s => s.value === formData.status)?.label || formData.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Priority:</span>
                                <PriorityBadge priority={formData.priority} />
                            </div>
                            {appointment.department && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Dept:</span>
                                    <span className="text-xs text-slate-700 font-medium">{appointment.department}</span>
                                </div>
                            )}
                            {appointment.duration_minutes && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-slate-400" />
                                    <span className="text-xs text-slate-600">{appointment.duration_minutes}m</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Body - Two Column Layout */}
                    <div className="p-4 flex-1 overflow-y-auto">
                        {formData.status !== 'completed' && formData.status !== 'cancelled' && formData.status !== 'no-show' && (
                            <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    <span className="text-xs text-emerald-700 font-medium">Patient showed up?</span>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handlePatientShowUp}
                                    className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={isSaving}
                                >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark Showed Up
                                </Button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Activity className="h-3 w-3" />
                                        Appointment Status
                                    </label>
                                    {isEditing ? (
                                        <div className="mt-1 relative">
                                            <select
                                                value={formData.status}
                                                onChange={(e) => handleStatusChange(e.target.value)}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors appearance-none"
                                                disabled={isSaving}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    ) : (
                                        <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200">
                                            <p className="text-sm font-medium text-slate-900">
                                                {statusOptions.find(s => s.value === formData.status)?.label || formData.status}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Date
                                    </label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {appointment.date ? format(parseISO(appointment.date), 'EEE, MMM d, yyyy') : '—'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Time
                                    </label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{appointment.time || '—'}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Stethoscope className="h-3 w-3" />
                                        Appointment Type
                                    </label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{appointment.type || '—'}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        Doctor
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            value={formData.doctor_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, doctor_name: e.target.value }))}
                                            className="mt-1 text-sm h-8"
                                            placeholder="Doctor name"
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="mt-1 text-sm font-medium text-slate-900">{appointment.doctor_name || '—'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Facility
                                    </label>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{appointment.facility_name || '—'}</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <ClipboardCheck className="h-3 w-3" />
                                        Reason for Appointment
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            rows={2}
                                            value={formData.reason}
                                            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                            placeholder="Reason for the appointment..."
                                            className="mt-1 text-sm resize-none"
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200 min-h-[40px]">
                                            {formData.reason ? (
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{formData.reason}</p>
                                            ) : (
                                                <p className="text-sm text-slate-400 italic">No reason provided</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        Appointment Notes
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            rows={2}
                                            value={formData.notes}
                                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            placeholder="Add appointment notes..."
                                            className="mt-1 text-sm resize-none"
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200 min-h-[40px]">
                                            {formData.notes ? (
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{formData.notes}</p>
                                            ) : (
                                                <p className="text-sm text-slate-400 italic">No notes provided</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        Review Notes & Comments
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            rows={2}
                                            value={formData.review_notes}
                                            onChange={(e) => setFormData(prev => ({ ...prev, review_notes: e.target.value }))}
                                            placeholder="Add review notes, clinical observations..."
                                            className="mt-1 text-sm resize-none"
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200 min-h-[40px]">
                                            {formData.review_notes ? (
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{formData.review_notes}</p>
                                            ) : (
                                                <p className="text-sm text-slate-400 italic">No review notes provided</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-slate-200 pt-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <input
                                            type="checkbox"
                                            id="follow-up"
                                            checked={showFollowUp}
                                            onChange={(e) => {
                                                setShowFollowUp(e.target.checked);
                                                if (!e.target.checked) {
                                                    setFormData(prev => ({ ...prev, follow_up_date: '' }));
                                                }
                                            }}
                                            disabled={!isEditing || isSaving}
                                            className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-400 disabled:opacity-50"
                                        />
                                        <label htmlFor="follow-up" className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                            <CalendarPlus className="h-3.5 w-3.5" />
                                            Follow-up needed
                                        </label>
                                    </div>

                                    {showFollowUp && (
                                        <div>
                                            <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Next Follow-up Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.follow_up_date}
                                                onChange={(e) => setFormData(prev => ({ ...prev, follow_up_date: e.target.value }))}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="mt-0.5 w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                                disabled={!isEditing || isSaving}
                                            />
                                            {!isEditing && formData.follow_up_date && (
                                                <p className="text-xs text-slate-600 mt-1">
                                                    Scheduled for: {format(parseISO(formData.follow_up_date), 'MMM d, yyyy')}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-[10px] text-slate-500">
                            <span className="font-medium text-slate-600">Patient ID:</span> {appointment.patient_uuid}
                            {appointment.created_at && (
                                <>
                                    <span className="mx-2 text-slate-300">·</span>
                                    <span className="font-medium text-slate-600">Created:</span> {format(parseISO(appointment.created_at), 'MMM dd, yyyy')}
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {isEditing && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(false)}
                                        className="text-xs h-8"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        className="bg-slate-700 hover:bg-slate-800 text-white text-xs h-8"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-3 w-3 mr-1" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </>
                            )}
                            <Button
                                size="sm"
                                onClick={() => { setIsEditing(false); onClose(); }}
                                className="bg-slate-600 hover:bg-slate-700 text-white text-xs h-8"
                                disabled={isSaving}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Appointment Modal for creating new appointments
interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    patient: any;
    visitId?: number | null;
}

const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Screening',
    'Treatment',
    'Review',
    'Referral',
    'Emergency',
    'Other'
];

const departments = [
    'Gynecology',
    'Oncology',
    'Surgery',
    'Internal Medicine',
    'Pediatrics',
    'Dermatology',
    'Radiology',
    'Cardiology',
    'Neurology',
    'Urology'
];

const priorities = [
    'Routine',
    'Urgent',
    'Emergency'
];

const statuses = [
    'Scheduled',
    'Confirmed',
    'In Progress',
    'Completed',
    'Cancelled',
    'No Show'
];

export function AppointmentModal({ isOpen, onClose, onSubmit, patient, visitId }: AppointmentModalProps) {
    const { props } = usePage();
    const { auth } = props as any;
    const { sharedData } = props as any;

    const [formData, setFormData] = useState({
        appointment_date: '',
        appointment_time: '',
        appointment_type: 'Consultation',
        doctor_name: '',
        doctor_id: '',
        department: '',
        notes: '',
        priority: 'Routine',
        duration_minutes: 30,
        location: '',
        reason: '',
        appointment_status: 'Scheduled',
        visit_id: visitId || null,
        facility_id: null,
    });

    // Get facility_id from auth user
    const facilityId = auth?.user?.facility_id || null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.appointment_date || !formData.appointment_time || !formData.department) {
            Notiflix.Notify.failure('Please fill in all required fields');
            return;
        }

        const payload = {
            patient_id: patient?.id,
            visit_id: formData.visit_id,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            appointment_type: formData.appointment_type,
            appointment_status: formData.appointment_status.toLowerCase(),
            priority: formData.priority.toLowerCase(),
            department: formData.department,
            doctor_id: formData.doctor_id || null,
            doctor_name: formData.doctor_name || null,
            reason: formData.reason || null,
            notes: formData.notes || null,
            duration_minutes: formData.duration_minutes || 30,
            facility_id: facilityId, // From auth user
            provider_id: null,
            province_code: null,
            district_code: null,
            reminder_sent: false,
            sms_sent: false,
            email_sent: false,
        };

        try {
            onSubmit(payload);
            onClose();
            resetForm();
            Notiflix.Notify.success('Appointment scheduled successfully!');
        } catch (error) {
            console.error('Error submitting appointment:', error);
            Notiflix.Notify.failure('Failed to create appointment. Please try again.');
        }
    };

    const resetForm = () => {
        setFormData({
            appointment_date: '',
            appointment_time: '',
            appointment_type: 'Consultation',
            doctor_name: '',
            doctor_id: '',
            department: '',
            notes: '',
            priority: 'Routine',
            duration_minutes: 30,
            location: '',
            reason: '',
            appointment_status: 'Scheduled',
            visit_id: visitId || null,
            facility_id: facilityId,
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => { resetForm(); onClose(); }} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">Schedule Appointment</h2>
                                <p className="text-xs text-slate-500">Book a new appointment for the patient</p>
                            </div>
                        </div>
                        <button onClick={() => { resetForm(); onClose(); }} className="p-1.5 hover:bg-slate-200 rounded-md transition-colors">
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <form id="appointment-form" onSubmit={handleSubmit} className="space-y-4">
                            {/* Patient Summary */}
                            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Patient</p>
                                        <p className="text-sm font-medium text-slate-900 truncate">{patient?.full_name || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">ID</p>
                                        <p className="text-sm font-medium text-slate-900 truncate">{patient?.nrc_number || 'N/A'}</p>
                                    </div>
                                </div>
                                {visitId && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">Visit</p>
                                            <p className="text-sm font-medium text-slate-900">#{visitId}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Facility ID Display */}
                            {facilityId && (
                                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                    <Building className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs text-blue-700">Facility ID: {facilityId}</span>
                                </div>
                            )}

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.appointment_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, appointment_date: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.appointment_time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, appointment_time: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Type & Duration */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                                        Appointment Type *
                                    </label>
                                    <select
                                        required
                                        value={formData.appointment_type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, appointment_type: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        {appointmentTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        Duration (minutes)
                                    </label>
                                    <select
                                        value={formData.duration_minutes}
                                        onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        {[15, 30, 45, 60, 90, 120].map((mins) => (
                                            <option key={mins} value={mins}>{mins} minutes</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Department & Priority */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                                        Department *
                                    </label>
                                    <select
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        <option value="">Select department</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-slate-400" />
                                        Priority
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Doctor & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-slate-400" />
                                        Doctor
                                    </label>
                                    <select
                                        value={formData.doctor_id}
                                        onChange={(e) => {
                                            const doctorId = e.target.value ? parseInt(e.target.value) : '';
                                            const doctor = sharedData.users?.find((u: any) => u.id === doctorId);
                                            setFormData(prev => ({
                                                ...prev,
                                                doctor_id: doctorId,
                                                doctor_name: doctor?.name || ''
                                            }));
                                        }}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        <option value="">Select a doctor</option>
                                        {sharedData.users?.map((item: any) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                        Status
                                    </label>
                                    <select
                                        value={formData.appointment_status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, appointment_status: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Reason */}
                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <ClipboardCheck className="h-3.5 w-3.5 text-slate-400" />
                                    Reason for Appointment
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    placeholder="Brief description of the reason for this appointment..."
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                                    Appointment Notes
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Additional notes about the appointment..."
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-colors resize-none"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-xs text-slate-500 truncate">
                            <span className="font-medium text-slate-700">Patient:</span> {patient?.full_name || 'N/A'}
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-medium text-slate-700">ID:</span> {patient?.nrc_number || 'N/A'}
                            {visitId && (
                                <>
                                    <span className="mx-2 text-slate-300">·</span>
                                    <span className="font-medium text-slate-700">Visit:</span> #{visitId}
                                </>
                            )}
                            {facilityId && (
                                <>
                                    <span className="mx-2 text-slate-300">·</span>
                                    <span className="font-medium text-slate-700">Facility:</span> {facilityId}
                                </>
                            )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                className="px-4 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="appointment-form"
                                className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-800 text-white rounded-md transition-colors flex items-center gap-2"
                            >
                                <Calendar className="h-4 w-4" />
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Main Appointment Table Component
export default function AppointmentTable({ appointments = [] }: AppointmentTableProps) {
    const { props } = usePage();
    const { auth } = props as any;
    const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const itemsPerPage = 10;

    // Get facility_id from auth user
    const facilityId = auth?.user?.facility_id || null;

    // Filter appointments based on period and search
    const filteredAppointments = useMemo(() => {
        if (!appointments || !Array.isArray(appointments) || appointments.length === 0) {
            return [];
        }

        let filtered = [...appointments];

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

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(app =>
                app.patient_name?.toLowerCase().includes(term) ||
                app.type?.toLowerCase().includes(term) ||
                app.doctor_name?.toLowerCase().includes(term) ||
                app.facility_name?.toLowerCase().includes(term) ||
                app.patient_nrc?.toLowerCase().includes(term)
            );
        }

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
        setIsDetailsModalOpen(true);
    };

    const handleUpdateAppointment = async (data: any) => {
        try {
            const response = await axios.post(`/api/v1/appointments/${data.id}`, {
                ...data,
                _method: 'PUT'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                }
            });

            if (response.data.success) {
                Notiflix.Notify.success('Appointment updated successfully');
                window.location.reload();
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to update appointment');
            }
        } catch (error: any) {
            console.error('Error updating appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment. Please try again.';
            Notiflix.Notify.failure(errorMessage);
            throw error;
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterPeriod, searchTerm]);

    return (
        <div className="space-y-3 p-2 bg-slate-50 rounded-lg">
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
                        placeholder="Search patient, doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 h-7 text-xs"
                    />
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
            </div>

            {/* Facility ID Display */}
            {facilityId && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building className="h-3.5 w-3.5 text-slate-400" />
                    <span>Facility: {facilityId}</span>
                </div>
            )}

            {/* Results count */}
            <div className="text-xs text-slate-500">
                {filteredAppointments.length === 0 ? (
                    'No appointments found'
                ) : (
                    `${paginatedAppointments.length} of ${filteredAppointments.length} appointments`
                )}
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="w-[180px] text-xs font-medium text-slate-600">Patient</TableHead>
                                <TableHead className="w-[130px] text-xs font-medium text-slate-600">Date & Time</TableHead>
                                <TableHead className="w-[120px] text-xs font-medium text-slate-600">Type</TableHead>
                                <TableHead className="w-[100px] text-xs font-medium text-slate-600">Status</TableHead>
                                <TableHead className="w-[120px] text-xs font-medium text-slate-600">Doctor</TableHead>
                                <TableHead className="w-[80px] text-right text-xs font-medium text-slate-600">Actions</TableHead>
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
                                                    <AvatarFallback className="bg-slate-100 text-slate-700 text-[10px] font-medium">
                                                        {appointment.patient_initial || appointment.patient_name?.substring(0, 2).toUpperCase() || '??'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900 truncate max-w-[100px]">
                                                        {appointment.patient_name || 'Unknown'}
                                                    </span>
                                                    {appointment.patient_nrc && (
                                                        <span className="text-[10px] text-slate-400 truncate max-w-[100px]">
                                                            {appointment.patient_nrc}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-xs">
                                                    {appointment.date ? format(parseISO(appointment.date), 'MMM dd') : '—'}
                                                </span>
                                                <span className="text-[10px] text-slate-500">{appointment.time || '—'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs truncate block max-w-[100px]">{appointment.type || '—'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={appointment.status} />
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-slate-700 truncate block max-w-[100px]">
                                                {appointment.doctor_name || '—'}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-0.5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(appointment)}
                                                    className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
                                                    title="View/Edit Details"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
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
                    <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200 bg-slate-50">
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
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedAppointment(null);
                }}
                onUpdate={handleUpdateAppointment}
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

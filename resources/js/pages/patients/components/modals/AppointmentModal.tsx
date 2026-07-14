// pages/patients/components/modals/AppointmentModal.tsx
import { useState } from 'react';
import { Calendar, X, Clock, User, Stethoscope, MapPin, FileText } from 'lucide-react';
import Notiflix from 'notiflix';
import { usePage } from '@inertiajs/react';

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

export function AppointmentModal({ isOpen, onClose, onSubmit, patients, visitId }: AppointmentModalProps) {


    const  {sharedData,patient}  = usePage().props

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
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.appointment_date || !formData.appointment_time || !formData.department) {
            Notiflix.Notify.failure('Please fill in all required fields');
            return;
        }

        // Build payload matching the model exactly
        const payload = {
            patient_id: patient?.id,
            visit_id: formData.visit_id,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            appointment_type: formData.appointment_type,
            appointment_status: formData.appointment_status.toLowerCase(),
            priority: formData.priority.toLowerCase(),
            department: formData.department,
            doctor_id: formData.doctor_id,
            doctor_name: formData.doctor_name || null,
            reason: formData.reason || null,
            notes: formData.notes || null,
            duration_minutes: formData.duration_minutes || 30,
            facility_id: null,
            provider_id: null,
            province_code: null,
            district_code: null,
            reminder_sent: false,
            sms_sent: false,
            email_sent: false,
        };
console.log(payload)
        try {
            onSubmit(payload);
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Failed to create appointment. Please try again.');
        }
    };

    const resetForm = () => {
        setFormData({
            appointment_date: '',
            appointment_time: '',
            appointment_type: 'Consultation',
            doctor_name: '',
            doctor_id: '',
            patient_id: '',
            department: '',
            notes: '',
            priority: 'Routine',
            duration_minutes: 30,
            location: '',
            reason: '',
            appointment_status: 'Scheduled',
            visit_id: visitId || null,
        });
    };

    if (!isOpen) return null;


    const renderDoctors   =  () => {
        return <>
            <select
                value={formData.doctor_id}
                onChange={(e) => setFormData(prev => ({ ...prev, doctor_id: parseInt(e.target.value) }))}
                className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
            >
                <optgroup label={'Doctors | Coubsultation'}>
                    {sharedData.users.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </optgroup>
            </select>
        </>
    }
    return (
        <>
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => { resetForm(); onClose(); }} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 rounded-t-lg flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
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
                            {/*<div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <User className="h-4 w-4 text-slate-400" />*/}
                            {/*        <div>*/}
                            {/*            <p className="text-xs text-slate-500">Patient</p>*/}
                            {/*            <p className="text-sm font-medium text-slate-900">{patient?.full_name || 'N/A'}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <Stethoscope className="h-4 w-4 text-slate-400" />*/}
                            {/*        <div>*/}
                            {/*            <p className="text-xs text-slate-500">ID</p>*/}
                            {/*            <p className="text-sm font-medium text-slate-900">{patient?.nrc_number || 'N/A'}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    {visitId && (*/}
                            {/*        <div className="col-span-2 flex items-center gap-2">*/}
                            {/*            <Calendar className="h-4 w-4 text-slate-400" />*/}
                            {/*            <div>*/}
                            {/*                <p className="text-xs text-slate-500">Visit ID</p>*/}
                            {/*                <p className="text-sm font-medium text-slate-900">#{visitId}</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    )}*/}
                            {/*</div>*/}

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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    />
                                </div>
                            </div>

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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    >
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                        <option value={60}>60 minutes</option>
                                        <option value={90}>90 minutes</option>
                                        <option value={120}>120 minutes</option>
                                    </select>
                                </div>
                            </div>

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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
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
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-slate-400" />
                                        Doctor Name
                                    </label>
                                    {renderDoctors()}
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                        Status
                                    </label>
                                    <select
                                        value={formData.appointment_status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, appointment_status: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>



                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                                    Reason for Appointment
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    placeholder="Brief description of the reason for this appointment..."
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors resize-none"
                                />
                            </div>


                        </form>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Patient:</span> {patient?.full_name || 'N/A'}
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-medium text-slate-700">ID:</span> {patient?.nrc_number || 'N/A'}
                            {visitId && (
                                <>
                                    <span className="mx-2 text-slate-300">·</span>
                                    <span className="font-medium text-slate-700">Visit:</span> #{visitId}
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
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
                                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2"
                            >
                                <Calendar className="h-4 w-4" />
                                Schedule Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

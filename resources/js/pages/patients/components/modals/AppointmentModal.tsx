// pages/patients/components/modals/AppointmentModal.tsx
import { useState } from 'react';
import { Calendar, X, Clock, User, Stethoscope, MapPin, FileText, Phone, Mail } from 'lucide-react';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    patient: any;
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

const durations = [
    '15 minutes',
    '30 minutes',
    '45 minutes',
    '60 minutes',
    '90 minutes',
    '120 minutes'
];

export function AppointmentModal({ isOpen, onClose, onSubmit, patient }: AppointmentModalProps) {
    const [formData, setFormData] = useState({
        appointment_date: '',
        appointment_time: '',
        type: 'consultation',
        provider: '',
        department: '',
        notes: '',
        priority: 'Routine',
        duration: '30 minutes',
        location: '',
        reason: '',
        contact_number: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: crypto.randomUUID(),
            ...formData,
            status: 'scheduled',
            created_at: new Date().toISOString(),
        });
        onClose();
        setFormData({
            appointment_date: '',
            appointment_time: '',
            type: 'consultation',
            provider: '',
            department: '',
            notes: '',
            priority: 'Routine',
            duration: '30 minutes',
            location: '',
            reason: '',
            contact_number: '',
            email: '',
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    {/* Header - Fixed */}
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
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-slate-200 rounded-md transition-colors"
                        >
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Body - Scrollable */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <form id="appointment-form" onSubmit={handleSubmit} className="space-y-4">
                            {/* Patient Info Summary */}
                            {/*<div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <User className="h-4 w-4 text-slate-400" />*/}
                            {/*        <div>*/}
                            {/*            <p className="text-xs text-slate-500">Patient</p>*/}
                            {/*            <p className="text-sm font-medium text-slate-900">{patient?.full_name || 'N/A'}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <Phone className="h-4 w-4 text-slate-400" />*/}
                            {/*        <div>*/}
                            {/*            <p className="text-xs text-slate-500">Phone</p>*/}
                            {/*            <p className="text-sm font-medium text-slate-900">{patient?.phone_number || 'N/A'}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
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
                                        value={formData.type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    >
                                        {appointmentTypes.map((type) => (
                                            <option key={type} value={type.toLowerCase()}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
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
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        Duration
                                    </label>
                                    <select
                                        value={formData.duration}
                                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    >
                                        {durations.map((duration) => (
                                            <option key={duration} value={duration}>{duration}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                    Provider
                                </label>
                                <input
                                    type="text"
                                    value={formData.provider}
                                    onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
                                    placeholder="e.g., Dr. John Doe"
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                    Location / Room
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="e.g., Room 301, Main Building"
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                />
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

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.contact_number}
                                        onChange={(e) => setFormData(prev => ({ ...prev, contact_number: e.target.value }))}
                                        placeholder="e.g., 0977123456"
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="patient@email.com"
                                        className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                                    Additional Notes
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Any additional notes or special requirements..."
                                    className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors resize-none"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Footer - Fixed with all buttons */}
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex-shrink-0">
                        <div className="text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Patient:</span> {patient?.full_name || 'N/A'}
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-medium text-slate-700">ID:</span> {patient?.nrc_number || 'N/A'}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
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

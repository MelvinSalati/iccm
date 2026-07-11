import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
    Calendar,
    User,
    Clock,
    Eye,
    Paperclip,
    X,
    CheckCircle,
    AlertCircle,
    Clock as ClockIcon,
    UserCheck,
    Stethoscope,
    MapPin,
    Search,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Sun,
    Contrast,
    Maximize,
    Minimize,
    Move,
    Plus,
    Minus
} from 'lucide-react';
import { format } from 'date-fns';
import { usePage } from '@inertiajs/react';

// ============================================
// TYPES
// ============================================
interface ConsultationEvent {
    id: number;
    consultation_uuid: string;
    patient_name: string;
    patient_id: string;
    visit_id: number | null;
    cervical_cancer_image_url: string | null;
    sms_to_dr: boolean;
    assigned_to_user_id: number | null;
    assigned_to_name: string | null;
    patient_appointment: string | null;
    assigning_user_id: number;
    assigner_name: string;
    facility_id: number;
    facility_name: string;
    consultation_status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
    comment: string | null;
    created_at: string;
    updated_at: string;
}

// ============================================
// IMAGE VIEWER COMPONENT
// ============================================
function ImageViewer({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMagnifierActive, setIsMagnifierActive] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });

    const MIN_SCALE = 0.5;
    const MAX_SCALE = 5;
    const ZOOM_STEP = 0.1;

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + ZOOM_STEP, MAX_SCALE));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - ZOOM_STEP, MIN_SCALE));
    };

    const handleReset = () => {
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
        setBrightness(100);
        setContrast(100);
    };

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360);
    };

    const handleFitToScreen = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        setScale(prev => Math.max(MIN_SCALE, Math.min(prev + delta, MAX_SCALE)));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }

        if (isMagnifierActive && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMagnifierPos({ x, y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            setIsDragging(true);
            setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - startPos.x,
                y: touch.clientY - startPos.y
            });
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleMagnifier = () => {
        setIsMagnifierActive(!isMagnifierActive);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'r' || e.key === 'R') handleRotate();
            if (e.key === 'f' || e.key === 'F') toggleFullscreen();
            if (e.key === 'Escape') onClose();
            if (e.key === '=') handleZoomIn();
            if (e.key === '-') handleZoomOut();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black/80 z-[60]" onClick={onClose} />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
                    {/* Header */}
                    <div className="flex-shrink-0 px-4 py-3 bg-gray-800 rounded-t-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">🔬 Image Viewer</span>
                            <span className="text-xs text-gray-500">|</span>
                            <span className="text-xs text-gray-400">{Math.round(scale * 100)}%</span>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex-shrink-0 px-4 py-2.5 bg-gray-800 border-b border-gray-700 flex flex-wrap items-center gap-2">
                        <button
                            onClick={handleZoomIn}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Zoom In (Mouse wheel)"
                        >
                            <ZoomIn className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Zoom Out"
                        >
                            <ZoomOut className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors text-xs px-3"
                            title="Reset View"
                        >
                            Reset
                        </button>
                        <div className="w-px h-6 bg-gray-700 mx-1" />
                        <button
                            onClick={handleRotate}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Rotate 90° (R)"
                        >
                            <RotateCw className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleFitToScreen}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Fit to Screen"
                        >
                            <Maximize className="h-4 w-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-700 mx-1" />
                        <button
                            onClick={toggleMagnifier}
                            className={`p-1.5 rounded hover:bg-gray-700 transition-colors ${
                                isMagnifierActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                            }`}
                            title="Toggle Magnifier"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-700 mx-1" />
                        <button
                            onClick={toggleFullscreen}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Fullscreen (F)"
                        >
                            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </button>
                        <div className="w-px h-6 bg-gray-700 mx-1" />
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4 text-gray-400" />
                            <input
                                type="range"
                                min="30"
                                max="200"
                                value={brightness}
                                onChange={(e) => setBrightness(Number(e.target.value))}
                                className="w-20 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Contrast className="h-4 w-4 text-gray-400" />
                            <input
                                type="range"
                                min="30"
                                max="200"
                                value={contrast}
                                onChange={(e) => setContrast(Number(e.target.value))}
                                className="w-20 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div className="flex-1" />
                        <span className="text-xs text-gray-500">
                            R: Rotate | F: Fullscreen | +/-: Zoom
                        </span>
                    </div>

                    {/* Image Area */}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-hidden relative bg-gray-900 rounded-b-xl"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
                    >
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                            }}
                        >
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                alt="Cervical cancer image"
                                className="select-none"
                                style={{
                                    transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
                                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                                draggable={false}
                            />
                        </div>

                        {isMagnifierActive && (
                            <div
                                className="absolute pointer-events-none border-2 border-blue-400 rounded-full w-36 h-36 overflow-hidden bg-white shadow-lg"
                                style={{
                                    left: `calc(${magnifierPos.x}% - 72px)`,
                                    top: `calc(${magnifierPos.y}% - 72px)`,
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `url(${imageUrl})`,
                                        backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                                        backgroundSize: `${scale * 400}%`,
                                        backgroundRepeat: 'no-repeat',
                                        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                                        transform: `rotate(${rotation}deg)`,
                                    }}
                                />
                            </div>
                        )}

                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded">
                            {Math.round(scale * 100)}%
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ============================================
// VIEW/EDIT MODAL COMPONENT
// ============================================
function ConsultationModal({
                               consultation,
                               onClose,
                               onSave
                           }: {
    consultation: ConsultationEvent | null;
    onClose: () => void;
    onSave: (data: any) => void;
}) {
    const [status, setStatus] = useState(consultation?.consultation_status || 'Pending');
    const [comment, setComment] = useState(consultation?.comment || '');
    const [reviewRequired, setReviewRequired] = useState(false);
    const [nextAppointment, setNextAppointment] = useState('');
    const [showImageViewer, setShowImageViewer] = useState(false);

    if (!consultation) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            status,
            comment,
            reviewRequired,
            nextAppointment: reviewRequired ? nextAppointment : null
        });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">

                    {/* Header */}
                    <div className="flex-shrink-0 border-b px-5 py-3 bg-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Stethoscope className="h-5 w-5 text-blue-600" />
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">Consultation Review</h2>
                                    <p className="text-xs text-gray-500">{consultation.consultation_uuid}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                        <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Column 1 - Image */}
                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Paperclip className="h-4 w-4" />
                                        <span>Cervical Cancer Image</span>
                                        {consultation.cervical_cancer_image_url && (
                                            <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                                                Attached
                                            </span>
                                        )}
                                    </div>
                                    {consultation.cervical_cancer_image_url ? (
                                        <div className="relative group rounded border border-gray-200 bg-white overflow-hidden">
                                            <img
                                                src={consultation.cervical_cancer_image_url}
                                                alt="Cervical cancer image"
                                                className="w-full h-auto max-h-[220px] object-contain cursor-pointer"
                                                onClick={() => setShowImageViewer(true)}
                                            />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowImageViewer(true)}
                                                    className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded hover:bg-gray-100 flex items-center gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Full
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-24 bg-white rounded border-2 border-dashed border-gray-300">
                                            <div className="text-center">
                                                <Paperclip className="h-6 w-6 text-gray-300 mx-auto mb-1" />
                                                <p className="text-sm text-gray-400">No image attached</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{consultation.patient_name}</p>
                                                    <p className="text-xs text-gray-500">{consultation.patient_id}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Facility</p>
                                            <p className="text-sm text-gray-800">{consultation.facility_name}</p>
                                        </div>
                                        {consultation.patient_appointment && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase">Appointment</p>
                                                <p className="text-sm text-gray-800">
                                                    {format(new Date(consultation.patient_appointment), 'MMM d, h:mm a')}
                                                </p>
                                            </div>
                                        )}
                                        {consultation.assigned_to_name && (
                                            <div className="col-span-2">
                                                <p className="text-xs font-medium text-gray-500 uppercase">Assigned To</p>
                                                <p className="text-sm text-gray-800">{consultation.assigned_to_name}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Column 2 - Form Inputs */}
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Consultation Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Doctor's Comment
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Enter clinical notes..."
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>

                                <div className="flex items-start space-x-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="reviewRequired"
                                        checked={reviewRequired}
                                        onChange={(e) => setReviewRequired(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="reviewRequired" className="text-sm text-gray-700 cursor-pointer">
                                        Review Required
                                        <p className="text-xs text-gray-500">Check if follow-up consultation is needed</p>
                                    </label>
                                </div>

                                {reviewRequired && (
                                    <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Next Appointment Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={nextAppointment}
                                            onChange={(e) => setNextAppointment(e.target.value)}
                                            className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 border border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">SMS Notification</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-sm font-medium ${
                                        consultation.sms_to_dr
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {consultation.sms_to_dr ? (
                                            <>
                                                <CheckCircle className="h-4 w-4" />
                                                Sent
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4" />
                                                Not Sent
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="flex-shrink-0 border-t px-5 py-3 bg-gray-50 rounded-b-lg flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-9 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="h-9 px-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {showImageViewer && consultation.cervical_cancer_image_url && (
                <ImageViewer
                    imageUrl={consultation.cervical_cancer_image_url}
                    onClose={() => setShowImageViewer(false)}
                />
            )}
        </>
    );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Consultations() {
    const [selectedConsultation, setSelectedConsultation] = useState<ConsultationEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const itemsPerPage = 10;
    const {consultationEvents}  =  usePage().props;
    console.log(consultationEvents)
    const filteredData = useMemo(() => {
        return consultationEvents.filter(item => {
            const matchesSearch = item.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.patient_id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || item.consultation_status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter, consultationEvents]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusColor = (status: string) => {
        const colors = {
            'Pending': 'bg-yellow-500 text-white hover:bg-yellow-600',
            'In Progress': 'bg-blue-500 text-white hover:bg-blue-600',
            'Completed': 'bg-green-500 text-white hover:bg-green-600',
            'Cancelled': 'bg-red-500 text-white hover:bg-red-600'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500 text-white hover:bg-gray-600';
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            'Pending': <ClockIcon className="h-3 w-3" />,
            'In Progress': <AlertCircle className="h-3 w-3" />,
            'Completed': <CheckCircle className="h-3 w-3" />,
            'Cancelled': <X className="h-3 w-3" />
        };
        return icons[status as keyof typeof icons] || <ClockIcon className="h-3 w-3" />;
    };

    const handleView = (consultation: ConsultationEvent) => {
        setSelectedConsultation(consultation);
        setIsModalOpen(true);
    };

    const handleSave = (data: any) => {
        console.log('Saving consultation data:', data);
        setIsModalOpen(false);
        setSelectedConsultation(null);
    };

    const statusFilters = [
        { key: 'all', label: 'All', count: consultationEvents.length, color: 'bg-gray-500' },
        { key: 'Pending', label: 'Pending', count: consultationEvents.filter(c => c.consultation_status === 'Pending').length, color: 'bg-yellow-500' },
        { key: 'In Progress', label: 'In Progress', count: consultationEvents.filter(c => c.consultation_status === 'In Progress').length, color: 'bg-blue-500' },
        { key: 'Completed', label: 'Completed', count: consultationEvents.filter(c => c.consultation_status === 'Completed').length, color: 'bg-green-500' },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard() },
                { title: 'Consultations', href: '/consultations' }
            ]}
        >
            <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Consultations</h1>
                        <p className="text-sm text-gray-500">Manage patient consultation events</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                            {filteredData.length} Total
                        </span>
                    </div>
                </div>

                {/* Status Filters and Search */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex gap-1.5 flex-wrap">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => {
                                    setStatusFilter(filter.key);
                                    setCurrentPage(1);
                                }}
                                className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                                    statusFilter === filter.key
                                        ? `${filter.color} text-white shadow-sm`
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filter.label}
                                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] rounded ${
                                    statusFilter === filter.key
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patient..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full sm:w-56 h-9 pl-9 pr-3 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SMS</th>
                                <th className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No consultations found
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((consultation) => (
                                    <tr key={consultation.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-2.5">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{consultation.patient_name}</p>
                                                <p className="text-xs text-gray-500">{consultation.patient_id}</p>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2.5 text-sm text-gray-700">{consultation.facility_name}</td>
                                        <td className="px-3 py-2.5 text-sm text-gray-700">
                                            {consultation.patient_appointment ? (
                                                format(new Date(consultation.patient_appointment), 'MMM d, h:mm a')
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(consultation.consultation_status)}`}>
                                                    {getStatusIcon(consultation.consultation_status)}
                                                    {consultation.consultation_status}
                                                </span>
                                        </td>
                                        <td className="px-3 py-2.5">
                                            {consultation.cervical_cancer_image_url ? (
                                                <div className="flex items-center gap-1.5 text-blue-600" title="Has attachment">
                                                    <Paperclip className="h-4 w-4" />
                                                    <span className="text-sm">Yes</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">No</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2.5">
                                            {consultation.sms_to_dr ? (
                                                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                                        <CheckCircle className="h-3.5 w-3.5" />
                                                        Sent
                                                    </span>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2.5 text-right">
                                            <button
                                                onClick={() => handleView(consultation)}
                                                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="text-sm text-gray-500">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 flex items-center justify-center text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="text-sm text-gray-600 px-3">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 flex items-center justify-center text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConsultationModal
                consultation={selectedConsultation}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedConsultation(null);
                }}
                onSave={handleSave}
            />
        </AppLayout>
    );
}

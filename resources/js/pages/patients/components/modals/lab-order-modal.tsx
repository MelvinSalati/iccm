// pages/patients/components/modals/lab-order-modal.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { usePage } from '@inertiajs/react';
import {
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    TestTube,
    Clock,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

// Types aligned with laboratory_orders table
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

interface LabOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<any> | void;
    availableTests: LabTest[];
    patientName?: string;
    patientId?: number;
    facilityId?: number;
    userId?: number;
    visitId?: string;
    loading?: boolean;
}

export function LabOrderModal({
                                  isOpen,
                                  onClose,
                                  onSubmit,
                                  availableTests = [],
                                  patientName = 'Patient',
                                  patientId,
                                  facilityId: propFacilityId,
                                  userId: propUserId,
                                  visitId,
                                  loading = false
                              }: LabOrderModalProps) {
    const { props } = usePage();
    const { auth } = props as any;

    const [selectedTests, setSelectedTests] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [formData, setFormData] = useState({
        priority: 'routine' as 'routine' | 'urgent' | 'stat',
        notes: '',
        laboratory_uuid: '',
    });
    const [generatedUUID, setGeneratedUUID] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pageSize = 5;
    const categories = ['All', ...new Set(availableTests.map(t => t.test_category))];

    // Get facility_id and user_id from auth user
    const authUser = auth?.user;
    const facilityId = authUser?.facility_id || propFacilityId || null;
    const userId = authUser?.id || propUserId || null;
    const userDistrict = authUser?.district || null;
    const userProvince = authUser?.province || null;

    // Generate UUID for the order
    useEffect(() => {
        if (isOpen) {
            const uuid = `LAB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            setGeneratedUUID(uuid);
            setFormData(prev => ({ ...prev, laboratory_uuid: uuid }));
            setError(null);
        }
    }, [isOpen]);

    const filteredTests = availableTests.filter(test => {
        const matchesSearch = test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || test.test_category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const paginatedTests = filteredTests.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(filteredTests.length / pageSize);

    const getSelectedTestObjects = () => {
        return availableTests.filter(test => selectedTests.includes(test.id));
    };

    const toggleTest = (testId: string) => {
        setSelectedTests(prev =>
            prev.includes(testId)
                ? prev.filter(id => id !== testId)
                : [...prev, testId]
        );
        if (error) setError(null);
    };

    const handleSubmit = async () => {
        // Validate selections
        if (selectedTests.length === 0) {
            setError('Please select at least one test');
            Notiflix.Notify.warning('Please select at least one test');
            return;
        }

        if (!patientId) {
            setError('Patient ID is required');
            Notiflix.Notify.warning('Patient ID is required');
            return;
        }

        if (!facilityId) {
            setError('Facility ID is required. Please ensure you are logged in.');
            Notiflix.Notify.warning('Facility ID is required');
            return;
        }

        if (!userId) {
            setError('User ID is required');
            Notiflix.Notify.warning('User ID is required');
            return;
        }

        const selectedTestObjects = getSelectedTestObjects();

        // Prepare data - matches LaboratoryController expectations
        const orderData = {
            laboratory_uuid: generatedUUID,
            patient_id: patientId,
            facility_id: facilityId,
            ordered_by: userId,
            visit_id: visitId || null,
            test_ids: selectedTests,
            status: 'pending',
            comment: formData.notes || null,
            priority: formData.priority,
            test_count: selectedTests.length,
            test_names: selectedTestObjects.map(t => t.test_name).join(', '),
            // Include tests array for reference
            tests: selectedTestObjects
        };

        console.log('Submitting order data:', orderData);

        try {
            setIsSubmitting(true);
            setError(null);

            // Submit the order - backend will handle event dispatch
            const result = await onSubmit(orderData);

            // Check if the result indicates success
            if (result?.success === false) {
                throw new Error(result.message || 'Failed to create order');
            }

            Notiflix.Notify.success(`Lab order created successfully with ${selectedTests.length} test(s)`);
            onClose();
        } catch (err: any) {
            console.error('Order submission error:', err);
            const message = err.response?.data?.message || err.message || 'Failed to create order. Please try again.';
            setError(message);
            Notiflix.Notify.failure(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedTests([]);
            setSearchTerm('');
            setCurrentPage(1);
            setSelectedCategory('All');
            setFormData({ priority: 'routine', notes: '', laboratory_uuid: '' });
            setError(null);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center gap-1.5">
                            <TestTube className="h-3.5 w-3.5 text-slate-600" />
                            <h2 className="text-xs font-semibold text-slate-900">New Lab Order</h2>
                            <span className="text-[10px] text-slate-400">|</span>
                            <span className="text-[10px] text-slate-500">Patient: {patientName}</span>
                            {visitId && (
                                <>
                                    <span className="text-[10px] text-slate-400">|</span>
                                    <span className="text-[10px] text-slate-500">Visit: #{visitId}</span>
                                </>
                            )}
                            {facilityId && (
                                <>
                                    <span className="text-[10px] text-slate-400">|</span>
                                    <span className="text-[10px] text-slate-500">Facility: {facilityId}</span>
                                </>
                            )}
                        </div>
                        <button onClick={onClose} className="p-0.5 hover:bg-slate-200 rounded transition-colors">
                            <X className="h-3.5 w-3.5 text-slate-500" />
                        </button>
                    </div>

                    {/* UUID Display */}
                    <div className="px-3 py-1 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Order #:</span>
                        <span className="text-[10px] font-mono font-medium text-slate-700">{generatedUUID || 'Generating...'}</span>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="px-3 py-1 bg-red-50 border-b border-red-200">
                            <p className="text-[10px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {/* Left - Test Selection */}
                        <div className="p-2 bg-slate-50/50">
                            {/* Search & Filter */}
                            <div className="flex gap-1.5 mb-1.5">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                                    <input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-6 pr-2 py-1 text-xs border border-slate-200 rounded focus:border-slate-400 focus:ring-1 focus:ring-slate-400 bg-white outline-none"
                                    />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-1.5 py-1 text-xs border border-slate-200 rounded bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Selected count */}
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-slate-500">{filteredTests.length} available</span>
                                <span className="text-[10px] font-medium text-slate-700">{selectedTests.length} selected</span>
                            </div>

                            {/* Test List */}
                            <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
                                {paginatedTests.length === 0 ? (
                                    <div className="text-center py-3 text-xs text-slate-500">No tests found</div>
                                ) : (
                                    paginatedTests.map((test) => {
                                        const isSelected = selectedTests.includes(test.id);

                                        return (
                                            <div
                                                key={test.id}
                                                onClick={() => toggleTest(test.id)}
                                                className={cn(
                                                    "p-1.5 rounded border cursor-pointer transition-all",
                                                    isSelected
                                                        ? "border-slate-400 bg-slate-50"
                                                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                                                )}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-xs font-medium text-slate-900 truncate">
                                                                {test.test_name}
                                                            </span>
                                                            {test.requires_consent && (
                                                                <span className="text-[8px] px-1 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 flex-shrink-0">
                                                                    Consent
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                                            <span className="font-mono">{test.code}</span>
                                                            <span>•</span>
                                                            <span>{test.specimen_type}</span>
                                                            {test.turnaround_time && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span className="flex items-center gap-0.5">
                                                                        <Clock className="h-2.5 w-2.5" />
                                                                        {test.turnaround_time}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {isSelected && (
                                                        <CheckCircle className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-200">
                                    <span className="text-[10px] text-slate-500">
                                        {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, filteredTests.length)} of {filteredTests.length}
                                    </span>
                                    <div className="flex gap-0.5">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="p-0.5 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                                        >
                                            <ChevronLeft className="h-3 w-3" />
                                        </button>
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="p-0.5 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                                        >
                                            <ChevronRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right - Order Details */}
                        <div className="p-2 bg-white">
                            {selectedTests.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[180px] text-center">
                                    <TestTube className="h-8 w-8 text-slate-300 mb-1.5" />
                                    <p className="text-xs text-slate-500 font-medium">No tests selected</p>
                                    <p className="text-[10px] text-slate-400">Click a test to select</p>
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    {/* Selected Tests Summary */}
                                    <div className="pb-1 border-b border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                                Selected ({selectedTests.length})
                                            </h3>
                                            <button
                                                onClick={() => setSelectedTests([])}
                                                className="text-[10px] text-rose-600 hover:text-rose-700 hover:underline"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-0.5 mt-1">
                                            {getSelectedTestObjects().slice(0, 4).map(test => (
                                                <span key={test.id} className="inline-flex items-center gap-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] border border-slate-200">
                                                    {test.test_name}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); toggleTest(test.id); }}
                                                        className="text-slate-400 hover:text-rose-500 transition-colors"
                                                    >
                                                        <X className="h-2.5 w-2.5" />
                                                    </button>
                                                </span>
                                            ))}
                                            {getSelectedTestObjects().length > 4 && (
                                                <span className="text-[10px] text-slate-500">+{getSelectedTestObjects().length - 4} more</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Visit ID */}
                                    <div className="bg-slate-50 rounded px-2 py-1 border border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-slate-500">Visit ID</span>
                                            <span className="text-xs font-medium text-slate-800">{visitId || '—'}</span>
                                        </div>
                                    </div>

                                    {/* Facility ID */}
                                    <div className="bg-slate-50 rounded px-2 py-1 border border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-slate-500">Facility</span>
                                            <span className="text-xs font-medium text-slate-800">{facilityId || '—'}</span>
                                        </div>
                                    </div>

                                    {/* Priority */}
                                    <div>
                                        <Label className="text-[10px] text-slate-500 font-medium">Priority</Label>
                                        <div className="flex gap-0.5 mt-0.5">
                                            {(['routine', 'urgent', 'stat'] as const).map((priority) => (
                                                <button
                                                    key={priority}
                                                    onClick={() => setFormData(prev => ({ ...prev, priority }))}
                                                    className={cn(
                                                        "px-2 py-0.5 text-[10px] rounded border transition-colors capitalize",
                                                        formData.priority === priority
                                                            ? "border-slate-400 bg-slate-100 text-slate-800"
                                                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                    )}
                                                >
                                                    {priority}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <div>
                                        <Label className="text-[10px] text-slate-500 font-medium">Comment</Label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            placeholder="Add notes..."
                                            rows={2}
                                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-slate-50 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none resize-none mt-0.5"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            {selectedTests.length > 0 && (
                                <>
                                    <CheckCircle className="h-3 w-3 text-slate-600" />
                                    <span>{selectedTests.length} test{selectedTests.length > 1 ? 's' : ''}</span>
                                </>
                            )}
                            {generatedUUID && (
                                <>
                                    <span className="text-slate-300">|</span>
                                    <span className="font-mono text-[9px] text-slate-400 truncate max-w-[120px]">{generatedUUID}</span>
                                </>
                            )}
                            {visitId && (
                                <>
                                    <span className="text-slate-300">|</span>
                                    <span className="text-[9px] text-slate-400">Visit: {visitId}</span>
                                </>
                            )}
                            {facilityId && (
                                <>
                                    <span className="text-slate-300">|</span>
                                    <span className="text-[9px] text-slate-400">Facility: {facilityId}</span>
                                </>
                            )}
                        </div>
                        <div className="flex gap-1.5">
                            <button
                                onClick={onClose}
                                disabled={isSubmitting || loading}
                                className="px-2.5 py-1 text-xs border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={selectedTests.length === 0 || isSubmitting || loading}
                                className={cn(
                                    "px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1",
                                    selectedTests.length > 0 && !isSubmitting && !loading
                                        ? "bg-slate-800 hover:bg-slate-900 text-white"
                                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting || loading ? (
                                    <>
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Ordering...
                                    </>
                                ) : (
                                    <>
                                        <TestTube className="h-3 w-3" />
                                        Create
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

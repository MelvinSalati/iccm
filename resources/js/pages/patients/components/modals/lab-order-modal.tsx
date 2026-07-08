// pages/patients/components/modals/lab-order-modal.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    TestTube,
    Clock,
    AlertCircle,
    CheckCircle,
    Microscope,
    Syringe,
    Droplet,
    Activity,
    Pill,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
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
    onSubmit: (data: any) => void;
    availableTests: LabTest[];
    patientName?: string;
    loading?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
    'Cervical Cancer': 'bg-pink-50 text-pink-700 border-pink-200',
    'Infectious Diseases': 'bg-rose-50 text-rose-700 border-rose-200',
    'Hematology': 'bg-red-50 text-red-700 border-red-200',
    'Chemistry': 'bg-blue-50 text-blue-700 border-blue-200',
    'Microbiology': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function LabOrderModal({
                                  isOpen,
                                  onClose,
                                  onSubmit,
                                  availableTests = [],
                                  patientName = 'Patient',
                                  loading = false
                              }: LabOrderModalProps) {
    const [selectedTests, setSelectedTests] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [formData, setFormData] = useState({
        priority: 'routine' as 'routine' | 'urgent' | 'stat',
        notes: '',
    });
    const [showConsentWarning, setShowConsentWarning] = useState(false);

    const pageSize = 5;
    const categories = ['All', ...new Set(availableTests.map(t => t.test_category))];

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

    const requiresConsent = () => {
        return getSelectedTestObjects().some(test => test.requires_consent);
    };

    const toggleTest = (testId: string) => {
        setSelectedTests(prev =>
            prev.includes(testId)
                ? prev.filter(id => id !== testId)
                : [...prev, testId]
        );
        if (showConsentWarning) setShowConsentWarning(false);
    };

    const handleSubmit = () => {
        if (selectedTests.length === 0) return;
        if (requiresConsent()) {
            setShowConsentWarning(true);
            return;
        }
        onSubmit({
            tests: getSelectedTestObjects(),
            priority: formData.priority,
            notes: formData.notes,
        });
        onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedTests([]);
            setSearchTerm('');
            setCurrentPage(1);
            setSelectedCategory('All');
            setFormData({ priority: 'routine', notes: '' });
            setShowConsentWarning(false);
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
                <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    {/* Header - Compact */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center gap-1.5">
                            <TestTube className="h-3.5 w-3.5 text-blue-600" />
                            <h2 className="text-xs font-semibold text-slate-900">New Lab Order</h2>
                            <span className="text-[10px] text-slate-400">|</span>
                            <span className="text-[10px] text-slate-500">Patient: {patientName}</span>
                        </div>
                        <button onClick={onClose} className="p-0.5 hover:bg-slate-200 rounded transition-colors">
                            <X className="h-3.5 w-3.5 text-slate-500" />
                        </button>
                    </div>

                    {/* Body - Compact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {/* Left - Test Selection */}
                        <div className="p-2.5 bg-slate-50/50">
                            {/* Search & Filter - Compact */}
                            <div className="flex gap-1.5 mb-2">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                                    <input
                                        placeholder="Search tests..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-6 pr-2 py-1 text-xs border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-none"
                                    />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-1.5 py-1 text-xs border border-slate-200 rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Selected count - Compact */}
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] text-slate-500">{filteredTests.length} available</span>
                                <span className="text-[10px] font-medium text-blue-600">{selectedTests.length} selected</span>
                            </div>

                            {/* Test List - Compact */}
                            <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
                                {paginatedTests.length === 0 ? (
                                    <div className="text-center py-4 text-xs text-slate-500">No tests found</div>
                                ) : (
                                    paginatedTests.map((test) => {
                                        const isSelected = selectedTests.includes(test.id);
                                        const categoryColor = CATEGORY_COLORS[test.test_category] || 'bg-slate-50 text-slate-700 border-slate-200';

                                        return (
                                            <div
                                                key={test.id}
                                                onClick={() => toggleTest(test.id)}
                                                className={cn(
                                                    "p-1.5 rounded border cursor-pointer transition-all",
                                                    isSelected
                                                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/20"
                                                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                                                )}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleTest(test.id)}
                                                        className="mt-0.5 h-3 w-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1 flex-wrap">
                                                            <span className="text-xs font-medium text-slate-900 truncate">{test.test_name}</span>
                                                            <span className={cn("text-[8px] px-1 py-0.5 rounded border", categoryColor)}>
                                                                {test.test_category}
                                                            </span>
                                                            {test.requires_consent && (
                                                                <span className="text-[8px] px-1 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200">
                                                                    Consent
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[9px] text-slate-500 mt-0.5">
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
                                                        {test.preparation_instructions && (
                                                            <div className="mt-0.5 text-[8px] text-amber-600 flex items-center gap-0.5">
                                                                <AlertCircle className="h-2.5 w-2.5" />
                                                                {test.preparation_instructions}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Pagination - Compact */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-slate-200">
                                    <span className="text-[9px] text-slate-500">
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

                        {/* Right - Order Details - Compact */}
                        <div className="p-2.5 bg-white">
                            {selectedTests.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[280px] text-center">
                                    <TestTube className="h-8 w-8 text-slate-300 mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">No tests selected</p>
                                    <p className="text-[10px] text-slate-400">Select tests from the left panel</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[280px] overflow-y-auto">
                                    {/* Selected Tests Summary - Compact */}
                                    <div className="pb-1.5 border-b border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                                Selected ({selectedTests.length})
                                            </h3>
                                            <button
                                                onClick={() => setSelectedTests([])}
                                                className="text-[9px] text-rose-600 hover:text-rose-700 hover:underline"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-0.5 mt-1">
                                            {getSelectedTestObjects().map(test => (
                                                <span key={test.id} className="inline-flex items-center gap-0.5 rounded bg-blue-50 px-1 py-0.5 text-[9px] border border-blue-200">
                                                    {test.test_name}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); toggleTest(test.id); }}
                                                        className="text-slate-400 hover:text-rose-500 transition-colors"
                                                    >
                                                        <X className="h-2 w-2" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Consent Warning - Compact */}
                                    {requiresConsent() && (
                                        <div className="rounded-md bg-amber-50 border border-amber-200 p-1.5">
                                            <div className="flex items-start gap-1.5">
                                                <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5" />
                                                <div>
                                                    <p className="text-[10px] font-medium text-amber-800">Consent Required</p>
                                                    <p className="text-[9px] text-amber-700">Some tests require patient consent</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Details - Compact */}
                                    <div className="space-y-1.5">
                                        <div>
                                            <Label className="text-[9px] text-slate-500 font-medium">Priority</Label>
                                            <div className="flex gap-0.5 mt-0.5">
                                                {(['routine', 'urgent', 'stat'] as const).map((priority) => (
                                                    <button
                                                        key={priority}
                                                        onClick={() => setFormData(prev => ({ ...prev, priority }))}
                                                        className={cn(
                                                            "px-2 py-0.5 text-[10px] rounded border transition-colors capitalize",
                                                            formData.priority === priority
                                                                ? priority === 'stat'
                                                                    ? "bg-rose-50 border-rose-400 text-rose-700"
                                                                    : priority === 'urgent'
                                                                        ? "bg-amber-50 border-amber-400 text-amber-700"
                                                                        : "bg-blue-50 border-blue-400 text-blue-700"
                                                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                        )}
                                                    >
                                                        {priority}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-[9px] text-slate-500 font-medium">Notes</Label>
                                            <input
                                                type="text"
                                                value={formData.notes}
                                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                                placeholder="Add notes..."
                                                className="w-full px-1.5 py-0.5 text-xs border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer - Compact */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            {selectedTests.length > 0 && (
                                <>
                                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                                    <span>{selectedTests.length} test{selectedTests.length > 1 ? 's' : ''} ready</span>
                                </>
                            )}
                            {requiresConsent() && (
                                <>
                                    <span className="text-slate-300">|</span>
                                    <span className="text-amber-600">Consent required</span>
                                </>
                            )}
                        </div>
                        <div className="flex gap-1.5">
                            <button
                                onClick={onClose}
                                className="px-2.5 py-1 text-xs border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={selectedTests.length === 0 || loading}
                                className={cn(
                                    "px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1",
                                    selectedTests.length > 0 && !loading
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {loading ? (
                                    <>
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Ordering...
                                    </>
                                ) : (
                                    <>
                                        <TestTube className="h-3 w-3" />
                                        Order
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

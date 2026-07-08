// components/medications/medication-modal.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, ChevronLeft, ChevronRight, Pill, Clock, Calendar, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

enum RouteOfAdministration {
    ORAL = 'Oral',
    TOPICAL = 'Topical',
    INTRAMUSCULAR = 'Intramuscular',
    INTRAVENOUS = 'Intravenous',
    SUBCUTANEOUS = 'Subcutaneous',
}

enum DoseUnit {
    MG = 'mg',
    MCG = 'mcg',
    ML = 'ml',
    TABLET = 'tablet(s)',
    CAPSULE = 'capsule(s)',
}

type FrequencyCode = 'QD' | 'BID' | 'TID' | 'QID' | 'Q4H' | 'Q6H' | 'Q8H' | 'Q12H' | 'PRN' | 'PRN_PAIN';

interface DrugItem {
    id: string;
    name: string;
    genericName: string;
    category: string;
    strength: number;
    unit: DoseUnit;
    form: string;
}

interface MedicationFormData {
    medicationName: string;
    strength: number;
    strengthUnit: DoseUnit;
    quantityPerDose: number;
    route: RouteOfAdministration;
    frequency: FrequencyCode;
    timingNotes?: string;
    dispenseQuantity: number;
    quantityUnit: DoseUnit;
    refillsAllowed: number;
    durationDays: number;
}

interface MedicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const FREQUENCIES: { code: FrequencyCode; label: string }[] = [
    { code: 'QD', label: 'Once daily' },
    { code: 'BID', label: 'Twice daily' },
    { code: 'TID', label: 'Three times daily' },
    { code: 'QID', label: 'Four times daily' },
    { code: 'Q4H', label: 'Every 4 hours' },
    { code: 'Q6H', label: 'Every 6 hours' },
    { code: 'Q8H', label: 'Every 8 hours' },
    { code: 'Q12H', label: 'Every 12 hours' },
    { code: 'PRN', label: 'As needed' },
    { code: 'PRN_PAIN', label: 'As needed for pain' },
];

const MOCK_DRUGS: DrugItem[] = [
    { id: '1', name: 'Amoxicillin', genericName: 'Amoxicillin', category: 'Antibiotic', strength: 500, unit: DoseUnit.MG, form: 'Capsule' },
    { id: '2', name: 'Metformin', genericName: 'Metformin HCl', category: 'Antidiabetic', strength: 1000, unit: DoseUnit.MG, form: 'Tablet' },
    { id: '3', name: 'Lisinopril', genericName: 'Lisinopril', category: 'ACE Inhibitor', strength: 10, unit: DoseUnit.MG, form: 'Tablet' },
    { id: '4', name: 'Atorvastatin', genericName: 'Atorvastatin', category: 'Statin', strength: 20, unit: DoseUnit.MG, form: 'Tablet' },
    { id: '5', name: 'Omeprazole', genericName: 'Omeprazole', category: 'PPI', strength: 20, unit: DoseUnit.MG, form: 'Capsule' },
    { id: '6', name: 'Ibuprofen', genericName: 'Ibuprofen', category: 'NSAID', strength: 200, unit: DoseUnit.MG, form: 'Tablet' },
    { id: '7', name: 'Paracetamol', genericName: 'Acetaminophen', category: 'Analgesic', strength: 500, unit: DoseUnit.MG, form: 'Tablet' },
];

export function MedicationModal({ isOpen, onClose, onSubmit }: MedicationModalProps) {
    const [selectedDrug, setSelectedDrug] = useState<DrugItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState<MedicationFormData>({
        medicationName: '',
        strength: 0,
        strengthUnit: DoseUnit.MG,
        quantityPerDose: 1,
        route: RouteOfAdministration.ORAL,
        frequency: 'BID',
        dispenseQuantity: 30,
        quantityUnit: DoseUnit.TABLET,
        refillsAllowed: 0,
        durationDays: 10,
    });

    const pageSize = 4;
    const filteredDrugs = MOCK_DRUGS.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedDrugs = filteredDrugs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(filteredDrugs.length / pageSize);

    useEffect(() => {
        if (selectedDrug) {
            setFormData(prev => ({
                ...prev,
                medicationName: selectedDrug.name,
                strength: selectedDrug.strength,
                strengthUnit: selectedDrug.unit,
            }));
        }
    }, [selectedDrug]);

    useEffect(() => {
        if (!isOpen) {
            setSelectedDrug(null);
            setSearchTerm('');
            setCurrentPage(1);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit({
            id: crypto.randomUUID(),
            ...formData,
            medicationName: selectedDrug?.name || formData.medicationName,
            prescribedDate: new Date().toISOString(),
            status: 'active',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-blue-600" />
                            <h2 className="text-sm font-semibold text-slate-900">New Prescription</h2>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded">
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Body - Increased height */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {/* Left - Drug List */}
                        <div className="p-4 bg-slate-50/50">
                            <div className="relative mb-3">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input
                                    placeholder="Search drugs..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-none"
                                />
                            </div>

                            <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                                {paginatedDrugs.length === 0 ? (
                                    <div className="text-center py-6 text-sm text-slate-500">No medications found</div>
                                ) : (
                                    paginatedDrugs.map((drug) => (
                                        <div
                                            key={drug.id}
                                            onClick={() => setSelectedDrug(drug)}
                                            className={cn(
                                                "p-2.5 rounded border cursor-pointer transition-all",
                                                selectedDrug?.id === drug.id
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-slate-200 bg-white hover:border-blue-300"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-medium text-slate-900 truncate">{drug.name}</span>
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded whitespace-nowrap">{drug.category}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 truncate">{drug.genericName}</p>
                                                </div>
                                                <div className="text-xs text-slate-600 whitespace-nowrap ml-2">
                                                    {drug.strength}{drug.unit}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200">
                                    <span className="text-xs text-slate-500">
                                        {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, filteredDrugs.length)} of {filteredDrugs.length}
                                    </span>
                                    <div className="flex gap-1">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="p-1 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100"
                                        >
                                            <ChevronLeft className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="p-1 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100"
                                        >
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right - Form */}
                        <div className="p-4 bg-white">
                            {!selectedDrug ? (
                                <div className="flex flex-col items-center justify-center h-[340px] text-center">
                                    <Search className="h-8 w-8 text-slate-300 mb-2" />
                                    <p className="text-sm text-slate-500">Select a medication to prescribe</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[340px] overflow-y-auto">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900">{formData.medicationName}</h3>
                                            <p className="text-xs text-slate-500">{selectedDrug.genericName}</p>
                                        </div>
                                        <button onClick={() => setSelectedDrug(null)} className="text-xs text-blue-600 hover:underline">
                                            Change
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Dose</Label>
                                            <input
                                                type="number"
                                                min="0.5"
                                                step="0.5"
                                                value={formData.quantityPerDose}
                                                onChange={(e) => setFormData(prev => ({ ...prev, quantityPerDose: Number(e.target.value) }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Route</Label>
                                            <select
                                                value={formData.route}
                                                onChange={(e) => setFormData(prev => ({ ...prev, route: e.target.value as RouteOfAdministration }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                {Object.values(RouteOfAdministration).map((route) => (
                                                    <option key={route} value={route}>{route}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Frequency</Label>
                                            <select
                                                value={formData.frequency}
                                                onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as FrequencyCode }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                {FREQUENCIES.map((freq) => (
                                                    <option key={freq.code} value={freq.code}>{freq.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Duration (days)</Label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.durationDays}
                                                onChange={(e) => setFormData(prev => ({ ...prev, durationDays: Number(e.target.value) }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Dispense Qty</Label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.dispenseQuantity}
                                                onChange={(e) => setFormData(prev => ({ ...prev, dispenseQuantity: Number(e.target.value) }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] text-slate-500">Unit</Label>
                                            <select
                                                value={formData.quantityUnit}
                                                onChange={(e) => setFormData(prev => ({ ...prev, quantityUnit: e.target.value as DoseUnit }))}
                                                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                {Object.values(DoseUnit).map((unit) => (
                                                    <option key={unit} value={unit}>{unit}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-[10px] text-slate-500">Refills</Label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.refillsAllowed}
                                            onChange={(e) => setFormData(prev => ({ ...prev, refillsAllowed: Number(e.target.value) }))}
                                            className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer with Buttons */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200">
                        <div className="text-xs text-slate-500">
                            {selectedDrug ? `Prescribing: ${selectedDrug.name}` : 'No medication selected'}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-1.5 text-sm border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedDrug}
                                className={cn(
                                    "px-4 py-1.5 text-sm rounded transition-colors",
                                    selectedDrug
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                Prescribe Medication
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

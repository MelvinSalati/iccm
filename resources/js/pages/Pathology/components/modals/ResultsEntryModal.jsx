import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, QrCode, FileText, AlertCircle } from 'lucide-react';

export default function ResultsEntryModal({
                                              isOpen,
                                              onClose,
                                              handleSave,
                                              order,
                                              userId,
                                              patientId
                                          }) {
    const [formData, setFormData] = useState({
        order_id: '',
        patient_id: '',
        entered_by: userId || '',
        results: '',
        result_category: '',
        diagnosis: '',
        notes: '',
        status: 'completed'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cervical biopsy result categories
    const resultCategories = [
        { value: 'normal', label: 'Normal / Benign Findings' },
        { value: 'cin1', label: 'CIN 1 (Mild Dysplasia / Low-Grade SIL)' },
        { value: 'cin2', label: 'CIN 2 (Moderate Dysplasia / High-Grade SIL)' },
        { value: 'cin3', label: 'CIN 3 (Severe Dysplasia / High-Grade SIL)' },
        { value: 'ais', label: 'Adenocarcinoma in Situ (AIS)' },
        { value: 'invasive_squamous', label: 'Invasive Squamous Cell Carcinoma' },
        { value: 'invasive_adeno', label: 'Invasive Adenocarcinoma' },
        { value: 'other', label: 'Other Findings' }
    ];

    // Result templates based on category
    const resultTemplates = {
        normal: 'No abnormal or precancerous cells detected. Benign cervical tissue with no significant pathological changes.',
        cin1: 'Mild dysplasia (CIN 1) involving the lower one-third of the epithelial layer. Low-grade squamous intraepithelial lesion (LSIL).',
        cin2: 'Moderate dysplasia (CIN 2) involving the bottom two-thirds of the epithelial layer. High-grade squamous intraepithelial lesion (HSIL).',
        cin3: 'Severe dysplasia (CIN 3) spanning the full thickness of the epithelial layer. Carcinoma in situ. High-grade squamous intraepithelial lesion (HSIL).',
        ais: 'Adenocarcinoma in situ (AIS) - precancerous cells found in the glandular cells of the inner cervical canal.',
        invasive_squamous: 'Invasive squamous cell carcinoma - malignant cells have breached the basement membrane and invaded deeper tissues.',
        invasive_adeno: 'Invasive adenocarcinoma - malignant glandular cells have breached the basement membrane and invaded deeper tissues.',
        other: 'Other pathological findings detected. See diagnosis for details.'
    };

    useEffect(() => {
        if (isOpen && order) {
            setFormData({
                order_id: order.id || '',
                patient_id: patientId || order.patient_id || '',
                entered_by: userId || '',
                results: '',
                result_category: '',
                diagnosis: '',
                notes: '',
                status: 'completed'
            });
            setErrors({});
        }
    }, [isOpen, order, userId, patientId]);

    // Auto-fill results when category changes
    useEffect(() => {
        if (formData.result_category && resultTemplates[formData.result_category]) {
            setFormData(prev => ({
                ...prev,
                results: resultTemplates[formData.result_category]
            }));
        }
    }, [formData.result_category]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.results) {
            newErrors.results = 'Results are required';
        }
        if (!formData.result_category) {
            newErrors.result_category = 'Please select a result category';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await handleSave(formData);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const orderNumber = order?.laboratory_uuid || order?.id || `ORD-${Date.now()}`;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-3xl transform rounded-xl bg-white shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 sticky top-0 bg-white z-10 rounded-t-xl">
                        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            Enter Results - Cervical Biopsy
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 hover:bg-slate-100 transition-colors"
                        >
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 space-y-4">
                        {/* Order Info with QR Code */}
                        {order && (
                            <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2 rounded border">
                                        <QrCode className="h-10 w-10 text-slate-700" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Order Number</p>
                                        <p className="text-sm font-mono font-semibold text-slate-900">{orderNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Patient</p>
                                    <p className="text-sm font-medium text-slate-900">{order.patient_name || 'Unknown'}</p>
                                </div>
                            </div>
                        )}

                        {/* Result Category */}
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Result Category *</Label>
                            <select
                                name="result_category"
                                value={formData.result_category}
                                onChange={handleChange}
                                className={`mt-1.5 block w-full text-sm rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-10 ${
                                    errors.result_category ? 'border-red-500' : ''
                                }`}
                            >
                                <option value="">Select result category...</option>
                                {resultCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            {errors.result_category && (
                                <p className="mt-1 text-xs text-red-600">{errors.result_category}</p>
                            )}
                        </div>

                        {/* Results */}
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Results *</Label>
                            <textarea
                                name="results"
                                value={formData.results}
                                onChange={handleChange}
                                rows="4"
                                className={`mt-1.5 block w-full text-sm rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                    errors.results ? 'border-red-500' : ''
                                }`}
                                placeholder="Enter detailed histopathology results..."
                            />
                            {errors.results && (
                                <p className="mt-1 text-xs text-red-600">{errors.results}</p>
                            )}
                        </div>

                        {/* Diagnosis */}
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Diagnosis</Label>
                            <input
                                type="text"
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                className="mt-1.5 block w-full text-sm rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-10"
                                placeholder="Final diagnosis..."
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Additional Notes</Label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="2"
                                className="mt-1.5 block w-full text-sm rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Any additional comments or recommendations..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-medium text-blue-700">Histopathology Result Guidelines</p>
                                    <p className="text-xs text-blue-600 mt-0.5">
                                        Results should include: tissue adequacy, cellular changes, grade of dysplasia (if present),
                                        and presence of any invasive features. For CIN grading, specify the depth of epithelial involvement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="text-sm h-10 px-4"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm h-10 px-6"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Results'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, QrCode, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';

export default function SampleQualityAssessmentModal({
                                                         isOpen,
                                                         onClose,
                                                         handleSave,
                                                         order,
                                                         userId,
                                                         patientId
                                                     }) {
    const [formData, setFormData] = useState({
        laboratory_order_id: '',
        patient_id: '',
        assessed_by: '',
        sample_quality: 'adequate',
        quality_notes: '',
        assessment_status: 'assessed',
        tissue_adequacy: 'adequate',
        representative_sampling: 'yes',
        fixation_quality: 'good',
        fixation_medium: '10% neutral buffered formalin',
        fixative_ratio: '1:10',
        specimen_integrity: 'intact',
        identification_verified: false,
        container_leak_proof: false,
        crushing_artifacts: false,
        needs_special_handling: false,
        special_handling_details: '',
        rejection_reason: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && order) {
            setFormData({
                laboratory_order_id: order.id || '',
                patient_id: patientId || order.patient_id || '',
                assessed_by: userId || '',
                sample_quality: 'adequate',
                quality_notes: '',
                assessment_status: 'assessed',
                tissue_adequacy: 'adequate',
                representative_sampling: 'yes',
                fixation_quality: 'good',
                fixation_medium: '10% neutral buffered formalin',
                fixative_ratio: '1:10',
                specimen_integrity: 'intact',
                identification_verified: false,
                container_leak_proof: false,
                crushing_artifacts: false,
                needs_special_handling: false,
                special_handling_details: '',
                rejection_reason: ''
            });
            setErrors({});
        }
    }, [isOpen, order, userId, patientId]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.sample_quality) {
            newErrors.sample_quality = 'Required';
        }
        if (formData.sample_quality === 'unsatisfactory' && !formData.rejection_reason) {
            newErrors.rejection_reason = 'Required';
        }
        if (!formData.fixation_medium) {
            newErrors.fixation_medium = 'Required';
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
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-3">
                <div className="relative max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[92vh]">
                    {/* Header - Fixed */}
                    <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white rounded-t-xl">
                        <h3 className="text-[13px] font-semibold text-slate-900 flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Sample Quality Assessment
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 hover:bg-slate-100 transition-colors"
                        >
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Body - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-4 py-3">
                        {/* Order Info with QR Code - Compact */}
                        {order && (
                            <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-white p-1 rounded border">
                                        <QrCode className="h-7 w-7 text-slate-700" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-medium text-slate-500 uppercase tracking-wider">Order #</p>
                                        <p className="text-[11px] font-mono font-semibold text-slate-900">{orderNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-medium text-slate-500 uppercase tracking-wider">Patient</p>
                                    <p className="text-[11px] font-medium text-slate-900">{order.patient_name || 'Unknown'}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-2.5">
                            {/* Two-column layout */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Column 1 */}
                                <div className="space-y-2">
                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Overall Quality *</Label>
                                        <select
                                            name="sample_quality"
                                            value={formData.sample_quality}
                                            onChange={handleChange}
                                            className={`mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2 ${
                                                errors.sample_quality ? 'border-red-500' : ''
                                            }`}
                                        >
                                            <option value="adequate">Adequate - Accept</option>
                                            <option value="inadequate">Inadequate</option>
                                            <option value="unsatisfactory">Unsatisfactory - Reject</option>
                                        </select>
                                        {errors.sample_quality && (
                                            <p className="mt-0.5 text-[10px] text-red-600">{errors.sample_quality}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Tissue Adequacy</Label>
                                        <select
                                            name="tissue_adequacy"
                                            value={formData.tissue_adequacy}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="adequate">Adequate</option>
                                            <option value="inadequate">Inadequate</option>
                                            <option value="marginal">Marginal</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Representative Sampling</Label>
                                        <select
                                            name="representative_sampling"
                                            value={formData.representative_sampling}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                            <option value="uncertain">Uncertain</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Fixation Quality</Label>
                                        <select
                                            name="fixation_quality"
                                            value={formData.fixation_quality}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="good">Good</option>
                                            <option value="fair">Fair</option>
                                            <option value="poor">Poor</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Fixation Medium *</Label>
                                        <select
                                            name="fixation_medium"
                                            value={formData.fixation_medium}
                                            onChange={handleChange}
                                            className={`mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2 ${
                                                errors.fixation_medium ? 'border-red-500' : ''
                                            }`}
                                        >
                                            <option value="10% neutral buffered formalin">10% NBF</option>
                                            <option value="Michel's solution">Michel's Solution</option>
                                            <option value="Frozen section">Frozen Section</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.fixation_medium && (
                                            <p className="mt-0.5 text-[10px] text-red-600">{errors.fixation_medium}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Fixative:Tissue Ratio</Label>
                                        <select
                                            name="fixative_ratio"
                                            value={formData.fixative_ratio}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="1:10">1:10 (Optimal)</option>
                                            <option value="1:5">1:5</option>
                                            <option value="1:20">1:20</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-2">
                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Specimen Integrity</Label>
                                        <select
                                            name="specimen_integrity"
                                            value={formData.specimen_integrity}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="intact">Intact</option>
                                            <option value="compromised">Compromised</option>
                                            <option value="damaged">Damaged</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-[11px] font-medium text-slate-700">Assessment Status</Label>
                                        <select
                                            name="assessment_status"
                                            value={formData.assessment_status}
                                            onChange={handleChange}
                                            className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                        >
                                            <option value="assessed">Assessed</option>
                                            <option value="pending">Pending</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1 pt-0.5">
                                        <Label className="text-[11px] font-medium text-slate-700">Quality Checks</Label>
                                        <div className="grid grid-cols-2 gap-1">
                                            <label className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    name="identification_verified"
                                                    checked={formData.identification_verified}
                                                    onChange={handleChange}
                                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                ID Verified
                                            </label>
                                            <label className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    name="container_leak_proof"
                                                    checked={formData.container_leak_proof}
                                                    onChange={handleChange}
                                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                Leak-proof
                                            </label>
                                            <label className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    name="crushing_artifacts"
                                                    checked={formData.crushing_artifacts}
                                                    onChange={handleChange}
                                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                Crushing Artifacts
                                            </label>
                                            <label className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    name="needs_special_handling"
                                                    checked={formData.needs_special_handling}
                                                    onChange={handleChange}
                                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                Special Handling
                                            </label>
                                        </div>
                                    </div>

                                    {formData.needs_special_handling && (
                                        <div>
                                            <Label className="text-[11px] font-medium text-slate-700">Special Handling Details</Label>
                                            <input
                                                type="text"
                                                name="special_handling_details"
                                                value={formData.special_handling_details}
                                                onChange={handleChange}
                                                className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2"
                                                placeholder="Details..."
                                            />
                                        </div>
                                    )}

                                    {formData.sample_quality === 'unsatisfactory' && (
                                        <div>
                                            <Label className="text-[11px] font-medium text-slate-700">Rejection Reason *</Label>
                                            <input
                                                type="text"
                                                name="rejection_reason"
                                                value={formData.rejection_reason}
                                                onChange={handleChange}
                                                className={`mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-7 px-2 ${
                                                    errors.rejection_reason ? 'border-red-500' : ''
                                                }`}
                                                placeholder="Reason..."
                                            />
                                            {errors.rejection_reason && (
                                                <p className="mt-0.5 text-[10px] text-red-600">{errors.rejection_reason}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quality Notes - Full width */}
                            <div>
                                <Label className="text-[11px] font-medium text-slate-700">Quality Notes</Label>
                                <textarea
                                    name="quality_notes"
                                    value={formData.quality_notes}
                                    onChange={handleChange}
                                    rows="1"
                                    className="mt-0.5 block w-full text-[11px] rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-2 py-1"
                                    placeholder="Additional observations..."
                                />
                            </div>

                            {/* Sample Status Preview - Compact */}
                            <div className="bg-slate-50 rounded-md px-3 py-1.5 border border-slate-200">
                                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-wider">Sample Status</p>
                                <div className="mt-0.5">
                                    {formData.sample_quality === 'adequate' ? (
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-700">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            Accepted - Results entry enabled
                                        </span>
                                    ) : formData.sample_quality === 'unsatisfactory' ? (
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-700">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Rejected - Results entry disabled
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            Inadequate - Review required
                                        </span>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="flex-shrink-0 flex justify-end gap-2 px-4 py-2.5 border-t border-slate-200 bg-white rounded-b-xl">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="text-[11px] h-7 px-3"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 px-4"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Assessment'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

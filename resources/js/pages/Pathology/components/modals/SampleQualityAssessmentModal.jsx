import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

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
        is_hemolyzed: false,
        is_icteric: false,
        is_lipemic: false,
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
                is_hemolyzed: false,
                is_icteric: false,
                is_lipemic: false,
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

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Sample Quality Assessment
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded p-1 hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-4 space-y-3">
                        {/* Order Info - Compact */}
                        {order && (
                            <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                                <span><strong>Order:</strong> #{order.id}</span>
                                <span><strong>Patient:</strong> {order.patient_id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs font-medium text-gray-700">Quality *</Label>
                                <select
                                    name="sample_quality"
                                    value={formData.sample_quality}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                        errors.sample_quality ? 'border-red-500' : ''
                                    }`}
                                >
                                    <option value="adequate">Adequate</option>
                                    <option value="inadequate">Inadequate</option>
                                    <option value="unsatisfactory">Unsatisfactory</option>
                                </select>
                                {errors.sample_quality && (
                                    <p className="mt-0.5 text-xs text-red-600">{errors.sample_quality}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-xs font-medium text-gray-700">Status</Label>
                                <select
                                    name="assessment_status"
                                    value={formData.assessment_status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="assessed">Assessed</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs font-medium text-gray-700">Notes</Label>
                            <input
                                type="text"
                                name="quality_notes"
                                value={formData.quality_notes}
                                onChange={handleChange}
                                className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Brief notes..."
                            />
                        </div>

                        {/* Checkboxes - Compact Horizontal */}
                        <div className="flex gap-4 pt-1">
                            <label className="flex items-center gap-1.5 text-xs text-gray-700">
                                <input
                                    type="checkbox"
                                    name="is_hemolyzed"
                                    checked={formData.is_hemolyzed}
                                    onChange={handleChange}
                                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Hemolyzed
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-gray-700">
                                <input
                                    type="checkbox"
                                    name="is_icteric"
                                    checked={formData.is_icteric}
                                    onChange={handleChange}
                                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Icteric
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-gray-700">
                                <input
                                    type="checkbox"
                                    name="is_lipemic"
                                    checked={formData.is_lipemic}
                                    onChange={handleChange}
                                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Lipemic
                            </label>
                        </div>

                        {formData.sample_quality === 'unsatisfactory' && (
                            <div>
                                <Label className="text-xs font-medium text-gray-700">Rejection Reason *</Label>
                                <input
                                    type="text"
                                    name="rejection_reason"
                                    value={formData.rejection_reason}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                        errors.rejection_reason ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Reason for rejection..."
                                />
                                {errors.rejection_reason && (
                                    <p className="mt-0.5 text-xs text-red-600">{errors.rejection_reason}</p>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="text-xs"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

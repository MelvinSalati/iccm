import { useEffect } from 'react';
import { CommunityOutreachRecord } from '../../CommunityPage';

interface CommunityOutreachModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingRecord?: CommunityOutreachRecord | null;
}

export default function CommunityOutreachModal({
                                                   open,
                                                   onOpenChange,
                                                   editingRecord,
                                               }: CommunityOutreachModalProps) {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onOpenChange(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    // Handle body scroll lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (!open) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={() => onOpenChange(false)}
                aria-hidden="true"
            />

            {/* Modal container - centered */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Modal header - compact */}
                    <div className="border-b pb-3 px-6 pt-5 sticky top-0 bg-white rounded-t-lg z-10">
                        <div className="flex items-center justify-between">
                            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                                {editingRecord ? 'Edit Outreach Record' : 'New Community Outreach'}
                            </h2>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="rounded-md p-1.5 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Close modal"
                            >
                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {editingRecord ? 'Update existing outreach record' : 'Record new community outreach activity'}
                        </p>
                    </div>

                    {/* Modal content - compact form */}
                    <div className="px-6 pb-6 pt-4">
                        <CommunityOutreachForm
                            editingRecord={editingRecord}
                            onSuccess={() => onOpenChange(false)}
                            onCancel={() => onOpenChange(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// ScreeningModal.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

interface ScreeningModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'hpv' | 'via' | 'hiv' | 'breast_cancer' | 'all';
    title: string;
    facilityId?: string;
    data?: any; // Pass data from parent
}

export function ScreeningModal({ isOpen, onClose, type, title, facilityId, data }: ScreeningModalProps) {
    const [screenings, setScreenings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (data?.screenings) {
                // Use data from parent
                const screeningData = data.screenings;
                let items = [];

                if (type === 'all') {
                    // Show all screening types
                    items = [
                        { type: 'HPV', ...screeningData.by_type.hpv },
                        { type: 'VIA', ...screeningData.by_type.via },
                        { type: 'HIV', ...screeningData.by_type.hiv },
                        { type: 'Breast Cancer', ...screeningData.by_type.breast_cancer },
                    ];
                } else {
                    // Show specific type
                    const typeMap = {
                        hpv: 'HPV',
                        via: 'VIA',
                        hiv: 'HIV',
                        breast_cancer: 'Breast Cancer'
                    };
                    items = [{
                        type: typeMap[type] || type,
                        ...screeningData.by_type[type]
                    }];
                }
                setScreenings(items);
            } else {
                fetchScreenings();
            }
        }
    }, [isOpen, type, data]);

    const fetchScreenings = async () => {
        setLoading(true);
        try {
            const response = await Http.get('/admin/dashboard/screenings', {
                params: {
                    facility_id: facilityId || '',
                    period: 'month'
                }
            });

            if (response.data) {
                const screeningData = response.data;
                let items = [];

                if (type === 'all') {
                    items = [
                        { type: 'HPV', ...screeningData.by_type.hpv },
                        { type: 'VIA', ...screeningData.by_type.via },
                        { type: 'HIV', ...screeningData.by_type.hiv },
                        { type: 'Breast Cancer', ...screeningData.by_type.breast_cancer },
                    ];
                } else {
                    const typeMap = {
                        hpv: 'HPV',
                        via: 'VIA',
                        hiv: 'HIV',
                        breast_cancer: 'Breast Cancer'
                    };
                    items = [{
                        type: typeMap[type] || type,
                        ...screeningData.by_type[type]
                    }];
                }
                setScreenings(items);
            }
        } catch (error) {
            console.error('Error fetching screenings:', error);
            Notiflix.Notify.failure('Failed to load screening data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {screenings.length > 0 ? (
                                screenings.map((item: any, index: number) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-lg">{item.type}</span>
                                            <span className="text-sm text-gray-500">Total: {item.total || 0}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-green-100 rounded-lg p-3 text-center">
                                                <div className="text-sm text-gray-600">Negative</div>
                                                <div className="text-xl font-bold text-green-700">{item.negative || 0}</div>
                                            </div>
                                            <div className="bg-red-100 rounded-lg p-3 text-center">
                                                <div className="text-sm text-gray-600">Positive</div>
                                                <div className="text-xl font-bold text-red-700">{item.positive || 0}</div>
                                            </div>
                                        </div>
                                        {item.total > 0 && (
                                            <div className="mt-2 text-center text-sm text-gray-500">
                                                Positivity Rate: {Math.round((item.positive / item.total) * 100)}%
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No screening data available
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

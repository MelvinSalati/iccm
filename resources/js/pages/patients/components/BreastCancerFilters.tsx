// pages/breast-cancer/components/BreastCancerFilters.tsx

import React from 'react';
import { X } from 'lucide-react';

interface BreastCancerFiltersProps {
    filterResult: string;
    setFilterResult: (value: string) => void;
    filterStage: string;
    setFilterStage: (value: string) => void;
    filterDateFrom: string;
    setFilterDateFrom: (value: string) => void;
    filterDateTo: string;
    setFilterDateTo: (value: string) => void;
    onApply: () => void;
    onClear: () => void;
}

export default function BreastCancerFilters({
                                                filterResult,
                                                setFilterResult,
                                                filterStage,
                                                setFilterStage,
                                                filterDateFrom,
                                                setFilterDateFrom,
                                                filterDateTo,
                                                setFilterDateTo,
                                                onApply,
                                                onClear,
                                            }: BreastCancerFiltersProps) {
    return (
        <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label className="text-xs font-medium text-slate-700">Result</label>
                    <select
                        value={filterResult}
                        onChange={(e) => setFilterResult(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    >
                        <option value="">All Results</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="inconclusive">Inconclusive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-medium text-slate-700">Stage Group</label>
                    <select
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    >
                        <option value="">All Stages</option>
                        <option value="0">0</option>
                        <option value="IA">IA</option>
                        <option value="IB">IB</option>
                        <option value="IIA">IIA</option>
                        <option value="IIB">IIB</option>
                        <option value="IIIA">IIIA</option>
                        <option value="IIIB">IIIB</option>
                        <option value="IIIC">IIIC</option>
                        <option value="IV">IV</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-medium text-slate-700">Date From</label>
                    <input
                        type="date"
                        value={filterDateFrom}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-slate-700">Date To</label>
                    <input
                        type="date"
                        value={filterDateTo}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button
                    onClick={onClear}
                    className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <X className="h-3.5 w-3.5" />
                    Clear Filters
                </button>
                <button
                    onClick={onApply}
                    className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}

// resources/js/components/patient/interactions-table.tsx
// Compact, dense interaction history table. Data arrives fully via Inertia
// props (no server pagination) — filtering and paging both happen client-side.

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Inbox, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Interaction {
    id: string | number;
    interaction_name: string;
    interaction_type?: string;
    date: string; // ISO date string
    notes?: string;
    recorded_by?: string;
    [key: string]: unknown;
}

interface InteractionsTableProps {
    interactionHistory: Interaction[];
    onViewInteractionHistoryModal: (interaction: Interaction) => void;
    pageSize?: number;
}

const PAGE_SIZE_DEFAULT = 8;

/** "2026-06-05" -> "5th June 2026" */
function formatHumanDate(dateString: string): string {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'N/A';

    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    const suffix =
        day % 10 === 1 && day !== 11
            ? 'st'
            : day % 10 === 2 && day !== 12
                ? 'nd'
                : day % 10 === 3 && day !== 13
                    ? 'rd'
                    : 'th';

    return `${day}${suffix} ${month} ${year}`;
}

export function InteractionsTable({
                                      interactionHistory,
                                      onViewInteractionHistoryModal,
                                      pageSize = PAGE_SIZE_DEFAULT,
                                  }: InteractionsTableProps) {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        if (!query.trim()) return interactionHistory;
        const q = query.trim().toLowerCase();
        return interactionHistory.filter((row) =>
            row.interaction_name?.toLowerCase().includes(q),
        );
    }, [interactionHistory, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);

    const visibleRows = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, currentPage, pageSize]);

    const hasRows = visibleRows.length > 0;

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(1); // reset paging whenever the filter changes
    };

    return (
        <div className="rounded-md border">
            {/* Filter bar */}
            <div className="flex items-center gap-2 border-b px-2.5 py-2">
                <div className="relative max-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        placeholder="Filter by interaction..."
                        className="h-8 pl-7 text-[13px]"
                    />
                </div>
                <span className="ml-auto text-[11px] text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
                </span>
            </div>

            {/* Table / empty state */}
            {hasRows ? (
                <table className="w-full text-[13px]">
                    <thead>
                    <tr className="border-b bg-muted/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                        <th className="px-2.5 py-1.5 font-medium">Interaction</th>
                        <th className="px-2.5 py-1.5 font-medium">Date</th>
                        <th className="px-2.5 py-1.5 font-medium">Recorded By</th>
                        <th className="px-2.5 py-1.5 text-right font-medium">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleRows.map((row) => (
                        <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="px-2.5 py-2">
                                <div className="font-medium text-foreground">{row.interaction_name}</div>
                                {row.interaction_type && (
                                    <Badge className="mt-0.5 rounded-sm border-0 bg-blue-600/10 px-1.5 py-0 text-[10px] font-medium text-blue-700">
                                        {row.interaction_type}
                                    </Badge>
                                )}
                            </td>
                            <td className="whitespace-nowrap px-2.5 py-2 text-muted-foreground">
                                {formatHumanDate(row.date)}
                            </td>
                            <td className="whitespace-nowrap px-2.5 py-2 text-muted-foreground">
                                {row.recorded_by ?? 'N/A'}
                            </td>
                            <td className="px-2.5 py-2 text-right">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2.5 text-[12px]"
                                    onClick={() => onViewInteractionHistoryModal(row)}
                                >
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col items-center justify-center bg-blue-50 gap-1.5 px-4 py-8 text-center">
                    <Inbox className="h-5 w-5 text-muted-foreground" />
                    <p className="text-[13px] font-medium text-foreground text-semibold" >No interactions found</p>
                    <p className="text-[12px] text-muted-foreground">
                        {query.trim() ? 'Try a different search term.' : 'This patient has no recorded interactions yet.'}
                    </p>
                </div>
            )}

            {/* Pagination — hidden entirely when there's nothing to page through */}
            {hasRows && (
                <div className="flex items-center justify-between border-t px-2.5 py-1.5">
                    <span className="text-[11px] text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center gap-1">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            disabled={currentPage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            disabled={currentPage >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InteractionsTable;

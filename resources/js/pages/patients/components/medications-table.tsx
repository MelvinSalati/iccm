// components/medications/medications-table.tsx
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Medication {
    id: string;
    medicationName: string;
    strength: number;
    strengthUnit: string;
    route: string;
    frequency: string;
    dispenseQuantity: number;
    quantityUnit: string;
    refillsAllowed: number;
    durationDays: number;
    prescribedDate: string;
    dispensedDate: string;
    status: 'active' | 'completed' | 'discontinued';
}

interface MedicationsTableProps {
    medications: Medication[];
}

export function MedicationsTable({ medications }: MedicationsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Medication>('prescribedDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const filteredMedications = medications.filter(med =>
        med.medicationName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedMedications = [...filteredMedications].sort((a, b) => {
        const aVal = a[sortField]?.toString() || '';
        const bVal = b[sortField]?.toString() || '';
        return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
    });

    const handleSort = (field: keyof Medication) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusBadge = (status: Medication['status']) => {
        const styles = {
            active: 'bg-green-100 text-green-700',
            completed: 'bg-blue-100 text-blue-700',
            discontinued: 'bg-red-100 text-red-700',
        };
        return <Badge className={styles[status]}>{status}</Badge>;
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search medications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('medicationName')}
                            >
                                <div className="flex items-center gap-1">
                                    Medication
                                    {sortField === 'medicationName' && (
                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                    )}
                                </div>
                            </TableHead>
                            <TableHead>Strength</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Dispense</TableHead>
                            <TableHead>Refills</TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('prescribedDate')}
                            >
                                <div className="flex items-center gap-1">
                                    Prescribed
                                    {sortField === 'prescribedDate' && (
                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                    )}
                                </div>
                            </TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMedications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                                    No medications found
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedMedications.map((med) => (
                                <TableRow key={med.id} className="hover:bg-slate-50">
                                    <TableCell className="font-medium">{med.medicationName}</TableCell>
                                    <TableCell>{med.strength} {med.strengthUnit}</TableCell>
                                    <TableCell>{med.route}</TableCell>
                                    <TableCell>{med.frequency}</TableCell>
                                    <TableCell>{med.dispenseQuantity} {med.quantityUnit}</TableCell>
                                    <TableCell>{med.refillsAllowed}</TableCell>
                                    <TableCell>{new Date(med.prescribedDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{getStatusBadge(med.status)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

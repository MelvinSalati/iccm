// resources/js/pages/patients/components/AdvancedFilters.tsx

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { XIcon, FilterIcon } from 'lucide-react';

interface AdvancedFiltersProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply: (filters: any) => void;
    currentFilters: {
        gender: string;
        address: string;
        email: string;
        emergencyContact: string;
    };
}

export default function AdvancedFilters({
                                            open,
                                            onOpenChange,
                                            onApply,
                                            currentFilters
                                        }: AdvancedFiltersProps) {
    const [filters, setFilters] = useState({
        gender: '',
        address: '',
        email: '',
        emergencyContact: '',
    });

    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const handleApply = () => {
        onApply(filters);
        onOpenChange(false);
    };

    const handleClear = () => {
        setFilters({
            gender: '',
            address: '',
            email: '',
            emergencyContact: '',
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FilterIcon className="h-5 w-5" />
                        Advanced Filters
                    </DialogTitle>
                    <DialogDescription>
                        Apply multiple filters to refine your search results
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="filter-gender">Gender</Label>
                            <Select
                                value={filters.gender}
                                onValueChange={(value) => setFilters({ ...filters, gender: value })}
                            >
                                <SelectTrigger id="filter-gender">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="filter-email">Email</Label>
                            <Input
                                id="filter-email"
                                type="email"
                                placeholder="Enter email address"
                                value={filters.email}
                                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filter-address">Address</Label>
                        <Input
                            id="filter-address"
                            placeholder="Enter address"
                            value={filters.address}
                            onChange={(e) => setFilters({ ...filters, address: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filter-emergency">Emergency Contact</Label>
                        <Input
                            id="filter-emergency"
                            placeholder="Enter emergency contact number"
                            value={filters.emergencyContact}
                            onChange={(e) => setFilters({ ...filters, emergencyContact: e.target.value })}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClear}
                    >
                        <XIcon className="mr-2 h-4 w-4" />
                        Clear All
                    </Button>
                    <Button onClick={handleApply}>
                        Apply Filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

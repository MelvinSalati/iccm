// resources/js/components/patients/PatientSearch.tsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, X, Filter, User } from 'lucide-react';

interface PatientSearchProps {
    onSearch?: (term: string) => void;
    placeholder?: string;
    className?: string;
}

export default function PatientSearch({ onSearch, placeholder = 'Search patients by name, NRC, or phone...', className = '' }: PatientSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        if (onSearch) {
            onSearch(searchTerm);
        } else {
            router.get('/patients', { search: searchTerm }, { preserveState: true });
        }

        setIsSearching(false);
    };

    const handleClear = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        } else {
            router.get('/patients', {}, { preserveState: true });
        }
    };

    return (
        <form onSubmit={handleSearch} className={`relative ${className}`}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-20 h-10 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-12 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute inset-y-0 right-0 px-4 flex items-center text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isSearching ? '...' : 'Search'}
                </button>
            </div>
        </form>
    );
}

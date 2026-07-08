import { useState } from 'react';
import { Search, ArrowLeft, Eye, Phone, Mail, Calendar, Info, IdCard, UserSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import { router } from '@inertiajs/react';
import Create from '@/pages/patients/create';

type SearchType = 'nrc_number' | 'phone_number' | 'email_address';

interface SearchResult {
    id: string | number;
    patient_uuid?: string;
    nrc_number?: string;
    phone_number?: string;
    email_address?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    status?: string;
    [key: string]: any;
}

const searchOptions = [
    {
        id: 'nrc_number' as const,
        label: 'National Registration Card',
        icon: IdCard,
        placeholder: 'Enter NRC number (e.g., 123456/78/1)',
        description: 'NRC number',
    },
    {
        id: 'phone_number' as const,
        label: 'Mobile Phone Number',
        icon: Phone,
        placeholder: 'Enter phone number (e.g., 0977123456)',
        description: 'Registered mobile number',
    },
    {
        id: 'email_address' as const,
        label: 'Email Address',
        icon: Mail,
        placeholder: 'Enter email address',
        description: 'Registered email address',
    },
];

/** Status badge tint — same convention as the Active/Inactive badge on PatientOverview. */
const STATUS_TINTS: Record<string, string> = {
    active: 'bg-emerald-600/15 text-emerald-700',
    inactive: 'bg-muted text-muted-foreground',
    pending: 'bg-amber-600/15 text-amber-700',
    blocked: 'bg-red-600/15 text-red-700',
};

const getStatusTint = (status?: string) =>
    STATUS_TINTS[status?.toLowerCase() || ''] ?? 'bg-blue-600/15 text-blue-700';

const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
    nrc_number: 'NRC Number',
    phone_number: 'Phone Number',
    email_address: 'Email Address',
};

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-ZM', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
};

export default function SearchRegistry() {
    // Default to NRC search, since it's the primary identifier for this registry.
    const [searchType, setSearchType] = useState<SearchType>('nrc_number');
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);

    const selectedOption = searchOptions.find((opt) => opt.id === searchType);

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            Notiflix.Notify.warning('Please enter a search value');
            return;
        }

        setIsLoading(true);
        try {
            const response = await Http.post('/registry/search', {
                search_type: searchType,
                search_value: searchValue.trim(),
            });

            if (response.data && response.data.length > 0) {
                setSearchResults(response.data);
                setShowResults(true);
                Notiflix.Notify.success(`Found ${response.data.length} result(s)`);
            } else {
                setSearchResults([]);
                setShowResults(false);
                Notiflix.Notify.warning('No results found. Please try a different search term.');
            }
        } catch (error) {
            Notiflix.Notify.failure('Search failed. Please try again.');
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToSearch = () => {
        setShowResults(false);
        setSearchResults([]);
    };

    // Takes the identifier directly rather than a whole SearchResult object —
    // the previous version interpolated an object into the URL string.
    const handleViewDetails = (identifier: string | number) => {
        router.visit(`/patients/registry/${identifier}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between rounded-md border bg-background px-4 py-3">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600/10">
                            <UserSearch className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-base font-semibold leading-tight text-foreground">
                                {showResults ? 'Search Results' : 'Search Registry'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {showResults
                                    ? `${searchResults.length} record${searchResults.length !== 1 ? 's' : ''} found`
                                    : 'Find patients by registered identifier'}
                            </p>
                        </div>
                    </div>
                    {showResults && (
                        <Button size="sm" variant="outline" onClick={handleBackToSearch} className="h-9 gap-1.5 text-sm">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Search
                        </Button>
                    )}
                </div>

                {/* Main panel */}
                <div className="overflow-hidden rounded-md border bg-background">
                    <Create />
                    {!showResults ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Search type selector */}
                            <div className="border-b bg-muted/30 p-4 lg:col-span-1 lg:border-b-0 lg:border-r">
                                <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Search By
                                </h2>
                                <div className="space-y-1.5">
                                    {searchOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = searchType === option.id;

                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => {
                                                    setSearchType(option.id);
                                                    setSearchValue('');
                                                }}
                                                className={cn(
                                                    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                                                    isSelected
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-foreground hover:bg-muted',
                                                )}
                                            >
                                                <Icon
                                                    className={cn(
                                                        'h-5 w-5 shrink-0',
                                                        isSelected ? 'text-white' : 'text-muted-foreground',
                                                    )}
                                                />
                                                <div className="min-w-0">
                                                    <div className="text-sm font-medium leading-tight">
                                                        {option.label}
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            'text-xs leading-tight',
                                                            isSelected ? 'text-blue-100' : 'text-muted-foreground',
                                                        )}
                                                    >
                                                        {option.description}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Search input */}
                            <div className="p-5 lg:col-span-2">
                                <div className="mb-4 flex items-start gap-3 rounded-md border-l-2 border-blue-600 bg-blue-600/5 px-4 py-2.5">
                                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                    <p className="text-sm text-blue-700">
                                        Searching by <strong>{selectedOption?.label}</strong> — enter the{' '}
                                        {selectedOption?.description.toLowerCase()} below.
                                    </p>
                                </div>

                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Search value
                                </label>
                                <div
                                    className={cn(
                                        'relative flex items-center rounded-md border transition-colors',
                                        isFocused ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-input',
                                    )}
                                >
                                    <Search className="pointer-events-none absolute left-3 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder={selectedOption?.placeholder}
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onKeyDown={handleKeyPress}
                                        className="h-11 w-full rounded-md bg-transparent pl-10 pr-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                                        disabled={isLoading}
                                    />
                                    {searchValue && !isLoading && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchValue('')}
                                            className="absolute right-3 text-muted-foreground hover:text-foreground"
                                        >
                                            <span className="sr-only">Clear</span>
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                    {isLoading && (
                                        <div className="absolute right-3 h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                                    )}
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <Button
                                        size="default"
                                        onClick={handleSearch}
                                        disabled={isLoading}
                                        className="h-10 gap-2 bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Searching...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="h-4 w-4" />
                                                Search Registry
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="default"
                                        variant="outline"
                                        onClick={() => setSearchValue('')}
                                        disabled={isLoading || !searchValue}
                                        className="h-10 px-4 text-sm"
                                    >
                                        Clear
                                    </Button>
                                </div>

                                {/* Search tips */}
                                <div className="mt-5 rounded-md border bg-muted/30 px-4 py-3">
                                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Search Tips
                                    </h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li>• Enter the complete number or ID</li>
                                        <li>• For NRC, include slashes (e.g., 123456/78/1)</li>
                                        <li>• Phone numbers should start with the country code</li>
                                        <li>• Search is case-insensitive</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Results view
                        <div className="p-4">
                            <div className="mb-4 flex items-center justify-between rounded-md border-l-2 border-blue-600 bg-blue-600/5 px-4 py-2.5 text-sm">
                                <div className="flex items-center gap-2 text-blue-700">
                                    <Search className="h-4 w-4" />
                                    <span>
                                        {SEARCH_TYPE_LABELS[searchType]}: <span className="font-mono">{searchValue}</span>
                                    </span>
                                </div>
                                <span className="text-blue-700">
                                    <strong>{searchResults.length}</strong> result{searchResults.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {searchResults.length > 0 ? (
                                <div className="overflow-x-auto rounded-md border">
                                    <table className="w-full text-sm">
                                        <thead>
                                        <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                                            <th className="px-3 py-2 font-medium">#</th>
                                            <th className="px-3 py-2 font-medium">Name</th>
                                            <th className="px-3 py-2 font-medium">NRC</th>
                                            <th className="px-3 py-2 font-medium">Phone</th>
                                            <th className="px-3 py-2 font-medium">Email</th>
                                            <th className="px-3 py-2 font-medium">Status</th>
                                            <th className="px-3 py-2 text-right font-medium">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {searchResults.map((result, index) => (
                                            <tr key={result.id ?? index} className="border-b last:border-0 hover:bg-muted/30">
                                                <td className="px-3 py-2.5 text-muted-foreground">{index + 1}</td>
                                                <td className="px-3 py-2.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                                            {result.first_name?.[0] ?? ''}
                                                            {result.last_name?.[0] ?? ''}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="truncate font-medium text-foreground">
                                                                {result.first_name} {result.last_name}
                                                            </div>
                                                            {result.date_of_birth && (
                                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <Calendar className="h-3.5 w-3.5" />
                                                                    {formatDate(result.date_of_birth)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2.5">
                                                        <span className="rounded-sm bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
                                                            {result.nrc_number ?? 'N/A'}
                                                        </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone className="h-3.5 w-3.5" />
                                                        {result.phone_number ?? 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {result.email_address ?? 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2.5">
                                                        <span
                                                            className={cn(
                                                                'rounded-sm px-2 py-0.5 text-xs font-medium',
                                                                getStatusTint(result.status),
                                                            )}
                                                        >
                                                            {result.status ?? 'Active'}
                                                        </span>
                                                </td>
                                                <td className="px-3 py-2.5 text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 px-3 text-sm"
                                                        onClick={() =>
                                                            handleViewDetails(result.patient_uuid ?? result.id)
                                                        }
                                                    >
                                                        <Eye className="mr-1.5 h-4 w-4" />
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                                    <Search className="h-6 w-6 text-muted-foreground" />
                                    <h3 className="text-sm font-medium text-foreground">No results found</h3>
                                    <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    Secure search — all data is encrypted
                </div>
            </div>
        </div>
    );
}

SearchRegistry.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Patients', href: dashboard() },
        { title: 'Search', href: dashboard() },
    ],
};

// resources/js/pages/patients/search.tsx (Simplified Tabs Version)

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Search,
    User,
    Phone,
    Calendar,
    Hash,
    FileText,
    X,
    Filter,
    RefreshCw,
    Download,
    Printer,
    Clock,
    Users,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDebounce } from '@/hooks/useDebounce';
import SearchResults from './components/SearchResults';
import Http from '@/utils/Http';
import { router } from '@inertiajs/react';
import { dashboard } from '@/routes';

// ============================================================================
// Types
// ============================================================================

interface SearchResponse {
    success: boolean;
    data: {
        current_page: number;
        data: any[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: any[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

// ============================================================================
// Main Component
// ============================================================================

export default function PatientSearchPage() {
    // ============================================================================
    // State
    // ============================================================================

    const [activeTab, setActiveTab] = useState('nrc');
    const [searchResults, setSearchResults] = useState<SearchResponse['data'] | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Search fields
    const [nrc, setNrc] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [patientId, setPatientId] = useState('');

    // Advanced filters
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // ============================================================================
    // Tabs Configuration
    // ============================================================================

    const searchTabs = [
        { id: 'nrc', label: 'NRC', icon: <FileText size={16} /> },
        { id: 'name', label: 'Name', icon: <User size={16} /> },
        { id: 'phone', label: 'Phone', icon: <Phone size={16} /> },
        { id: 'date', label: 'Date', icon: <Calendar size={16} /> },
        { id: 'id', label: 'ID', icon: <Hash size={16} /> },
    ];

    // ============================================================================
    // Helper Functions
    // ============================================================================

    const buildSearchParams = useCallback(() => {
        const params: Record<string, any> = {
            page: currentPage,
            per_page: 10,
        };

        switch (activeTab) {
            case 'nrc':
                if (nrc) params.nrc = nrc;
                break;
            case 'name':
                if (firstName) params.first_name = firstName;
                if (lastName) params.last_name = lastName;
                if (age) params.age = age;
                break;
            case 'phone':
                if (phone) params.phone = phone;
                break;
            case 'date':
                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;
                break;
            case 'id':
                if (patientId) params.id = patientId;
                break;
        }

        // Advanced filters
        if (gender) params.gender = gender;
        if (email) params.email = email;
        if (address) params.address = address;

        return params;
    }, [activeTab, nrc, firstName, lastName, age, phone, startDate, endDate, patientId, gender, email, address, currentPage]);

    const getSearchQuery = useCallback(() => {
        const parts = [];
        switch (activeTab) {
            case 'nrc':
                if (nrc) parts.push(`NRC: ${nrc}`);
                break;
            case 'name':
                if (firstName) parts.push(`First: ${firstName}`);
                if (lastName) parts.push(`Last: ${lastName}`);
                if (age) parts.push(`Age: ${age}`);
                break;
            case 'phone':
                if (phone) parts.push(`Phone: ${phone}`);
                break;
            case 'date':
                if (startDate) parts.push(`From: ${startDate}`);
                if (endDate) parts.push(`To: ${endDate}`);
                break;
            case 'id':
                if (patientId) parts.push(`ID: ${patientId}`);
                break;
        }
        return parts.join(' ') || 'All patients';
    }, [activeTab, nrc, firstName, lastName, age, phone, startDate, endDate, patientId]);

    const isSearchDisabled = useMemo(() => {
        switch (activeTab) {
            case 'nrc': return !nrc.trim();
            case 'name': return !firstName.trim() && !lastName.trim() && !age.trim();
            case 'phone': return !phone.trim() || phone.length < 8;
            case 'date': return !startDate || !endDate;
            case 'id': return !patientId.trim();
            default: return true;
        }
    }, [activeTab, nrc, firstName, lastName, age, phone, startDate, endDate, patientId]);

    // ============================================================================
    // Search Handler
    // ============================================================================

    const handleSearch = useCallback(async (page = 1) => {
        const params = buildSearchParams();
        const hasSearchCriteria = Object.values(params).some(v => v && v !== page && v !== 10);

        if (!hasSearchCriteria) {
            setError('Please enter search criteria');
            return;
        }

        setError(null);
        setLoading(true);
        setCurrentPage(page);

        try {
            const response = await Http.get('/patients/search', { params });

            if (response?.data?.data) {
                setSearchResults(response.data.data);

                // Save to recent searches
                const query = getSearchQuery();
                if (query && query !== 'All patients') {
                    setRecentSearches(prev => {
                        const updated = [query, ...prev.filter(s => s !== query)].slice(0, 5);
                        return updated;
                    });
                }

                if (response.data.data.data.length === 0) {
                    setError('No patients found');
                }
            } else {
                setError('Failed to search patients');
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('An error occurred while searching');
        } finally {
            setLoading(false);
        }
    }, [buildSearchParams, getSearchQuery]);

    const debouncedSearch = useDebounce(handleSearch, 500);

    // ============================================================================
    // UI Handlers
    // ============================================================================

    const handleClearAll = useCallback(() => {
        setNrc('');
        setFirstName('');
        setLastName('');
        setAge('');
        setPhone('');
        setStartDate('');
        setEndDate('');
        setPatientId('');
        setGender('');
        setEmail('');
        setAddress('');
        setSearchResults(null);
        setError(null);
        setCurrentPage(1);
    }, []);

    const handleViewPatient = useCallback((patient: any) => {
        router.visit(`/patients/${patient.id}`);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        handleSearch(page);
    }, [handleSearch]);

    const handleQuickAction = (action: string) => {
        switch (action) {
            case 'refresh':
                if (searchResults) handleSearch(currentPage);
                break;
            case 'export':
                console.log('Exporting results...');
                break;
            case 'print':
                window.print();
                break;
            default:
                break;
        }
    };

    // ============================================================================
    // Render Search Fields
    // ============================================================================

    const renderSearchFields = () => {
        const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white";
        const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300";

        switch (activeTab) {
            case 'nrc':
                return (
                    <div className="space-y-2">
                        <Label className={labelClass}>NRC Number</Label>
                        <Input
                            placeholder="Enter NRC number (e.g., 123456/78/9)"
                            value={nrc}
                            onChange={(e) => {
                                setNrc(e.target.value);
                                debouncedSearch();
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className={inputClass}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Search by National Registration Card number
                        </p>
                    </div>
                );

            case 'name':
                return (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className={labelClass}>First Name</Label>
                            <Input
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    debouncedSearch();
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className={inputClass}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className={labelClass}>Last Name</Label>
                            <Input
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    debouncedSearch();
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className={inputClass}
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label className={labelClass}>Age (Optional)</Label>
                            <Input
                                type="number"
                                placeholder="Enter age"
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    debouncedSearch();
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className={inputClass}
                                min="0"
                                max="150"
                            />
                        </div>
                    </div>
                );

            case 'phone':
                return (
                    <div className="space-y-2">
                        <Label className={labelClass}>Phone Number</Label>
                        <Input
                            type="tel"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setPhone(value);
                                debouncedSearch();
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className={inputClass}
                            maxLength={15}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Enter phone number with country code if applicable
                        </p>
                    </div>
                );

            case 'date':
                return (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className={labelClass}>Start Date</Label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    debouncedSearch();
                                }}
                                className={inputClass}
                                max={endDate || undefined}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className={labelClass}>End Date</Label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    debouncedSearch();
                                }}
                                className={inputClass}
                                min={startDate || undefined}
                            />
                        </div>
                    </div>
                );

            case 'id':
                return (
                    <div className="space-y-2">
                        <Label className={labelClass}>Patient ID</Label>
                        <Input
                            placeholder="Enter patient ID"
                            value={patientId}
                            onChange={(e) => {
                                setPatientId(e.target.value);
                                debouncedSearch();
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className={inputClass}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Search by unique patient identifier
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    // ============================================================================
    // Render
    // ============================================================================

    return (
        <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900">
            {/* Header */}
            <div className="mx-auto max-w-7xl ">
                <div className="mb-6 flex items-center justify-between bg-blue-100 p-2 rounded-md">
                    <div className={"bg-blue-100"}>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Patient Search
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Find patients quickly using any search method
                        </p>
                    </div>
                </div>

                {/* Main Search Card */}
                <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="p-6">
                        {/* Search Tabs - Custom Implementation */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                                {searchTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            handleClearAll();
                                        }}
                                        className={`
                                            flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all
                                            ${activeTab === tab.id
                                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50'
                                        }
                                        `}
                                    >
                                        {tab.icon}
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4">
                                {renderSearchFields()}
                            </div>
                        </div>

                        {/* Advanced Filters Toggle */}
                        <div className="mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-slate-500 hover:text-slate-700 dark:text-slate-400"
                            >
                                <Filter className="mr-2 h-4 w-4" />
                                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
                            </Button>
                        </div>

                        {/* Advanced Filters */}
                        {showAdvanced && (
                            <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label className="text-sm">Gender</Label>
                                        <Select value={gender} onValueChange={setGender}>
                                            <SelectTrigger>
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
                                        <Label className="text-sm">Email</Label>
                                        <Input
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white dark:bg-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm">Address</Label>
                                        <Input
                                            placeholder="Enter address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="bg-white dark:bg-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => handleSearch(1)}
                                disabled={isSearchDisabled || loading}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {loading ? (
                                    <>
                                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Search
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={handleClearAll}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-100 dark:border-slate-600"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Clear
                            </Button>

                            {searchResults && (
                                <>
                                    <Button
                                        variant="outline"
                                        className="border-slate-300 hover:bg-slate-100 dark:border-slate-600"
                                        onClick={() => handleQuickAction('refresh')}
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-slate-300 hover:bg-slate-100 dark:border-slate-600"
                                        onClick={() => handleQuickAction('export')}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-slate-300 hover:bg-slate-100 dark:border-slate-600"
                                        onClick={() => handleQuickAction('print')}
                                    >
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Search Summary */}
                        {searchResults && (
                            <div className="mt-4 flex flex-wrap items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Sparkles className="h-4 w-4 text-blue-500" />
                                    <span>
                                        Found <strong className="text-slate-900 dark:text-white">{searchResults.total}</strong> results
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>Query: <strong className="text-slate-900 dark:text-white">{getSearchQuery()}</strong></span>
                                </div>
                                {searchResults.data.length > 0 && (
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Showing {searchResults.from} - {searchResults.to}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Recent Searches */}
                        {recentSearches.length > 0 && !searchResults && (
                            <div className="mt-4">
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <Clock className="h-4 w-4" />
                                    <span>Recent searches:</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {recentSearches.map((query, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                                            onClick={() => {
                                                // Could implement quick re-run here
                                                console.log('Quick search:', query);
                                            }}
                                        >
                                            {query}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Search Results */}
                {searchResults && (
                    <div className="mt-6">
                        <SearchResults
                            results={searchResults}
                            onViewPatient={handleViewPatient}
                            onPageChange={handlePageChange}
                            isLoading={loading}
                        />
                    </div>
                )}

                {/* Empty State */}
                {/*{!searchResults && !loading && !error && (*/}
                {/*    <Card className="mt-8 border-2 border-dashed border-slate-200 bg-transparent p-12 text-center dark:border-slate-700">*/}
                {/*        <div className="mx-auto flex max-w-md flex-col items-center">*/}
                {/*            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">*/}
                {/*                <Search className="h-8 w-8 text-slate-400 dark:text-slate-500" />*/}
                {/*            </div>*/}
                {/*            <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">*/}
                {/*                Start Searching*/}
                {/*            </h3>*/}
                {/*            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">*/}
                {/*                Select a search method above and enter the criteria to find patients*/}
                {/*            </p>*/}
                {/*            <div className="mt-4 flex flex-wrap justify-center gap-2">*/}
                {/*                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">*/}
                {/*                    <FileText className="mr-1 h-3 w-3" />*/}
                {/*                    NRC*/}
                {/*                </Badge>*/}
                {/*                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">*/}
                {/*                    <User className="mr-1 h-3 w-3" />*/}
                {/*                    Name*/}
                {/*                </Badge>*/}
                {/*                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">*/}
                {/*                    <Phone className="mr-1 h-3 w-3" />*/}
                {/*                    Phone*/}
                {/*                </Badge>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </Card>*/}
                {/*)}*/}
            </div>
        </div>
    );
}

PatientSearchPage.layout = {
    breadcrumbs: [
        {
            title: 'Registry',
            href: "/",
        },   {
            title: 'Search',
            href: "/",
        },
    ],
};

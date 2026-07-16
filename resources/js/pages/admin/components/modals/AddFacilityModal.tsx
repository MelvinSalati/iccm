import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import {
    Building,
    MapPin,
    Phone,
    Mail,
    X,
    Check,
    AlertCircle,
    Loader2,
    Search,
    FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Http from '@/utils/Http';

interface FacilityFormData {
    name: string;
    code: string;
    type: 'hospital' | 'clinic' | 'health_center' | 'district_hospital';
    province: string;
    district: string;
    address: string;
    phone: string;
    email: string;
    status: 'active' | 'inactive' | 'pending';
}

interface Province {
    id: number;
    name: string;
    code: string;
}

interface District {
    id: number;
    name: string;
    code: string;
    province_id: number;
}

interface FacilitySuggestion {
    id: number;
    name: string;
    code: string;
    type: string;
    phone: string;
    email: string;
    address: string;
    district_id: number;
    latitude: string | null;
    longitude: string | null;
    is_active: boolean;
}

interface AddFacilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FacilityFormData) => Promise<void>;
    facility?: FacilityFormData | null;
    loading?: boolean;
}

const facilityTypes = [
    { value: 'hospital', label: 'Hospital' },
    { value: 'district_hospital', label: 'District Hospital' },
    { value: 'urban_health_center', label: 'Urban Health Center' },
    { value: 'rural_health_center', label: 'Rural Health Center' },
];

export function AddFacilityModal({
                                     isOpen,
                                     onClose,
                                     onSubmit,
                                     facility = null,
                                     loading = false
                                 }: AddFacilityModalProps) {
    const [formData, setFormData] = useState<FacilityFormData>({
        name: '',
        code: '',
        type: 'health_center',
        province: '',
        district: '',
        address: '',
        phone: '',
        email: '',
        status: 'pending',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [facilitySuggestions, setFacilitySuggestions] = useState<FacilitySuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingFacilities, setLoadingFacilities] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isEditing = !!facility;

    // Fetch provinces on mount
    useEffect(() => {
        if (isOpen) {
            fetchProvinces();
        }
    }, [isOpen]);

    // Fetch districts when province changes
    useEffect(() => {
        if (formData.province) {
            fetchDistricts(formData.province);
            setFormData(prev => ({ ...prev, district: '' }));
            setFacilitySuggestions([]);
            setSearchQuery('');
        } else {
            setDistricts([]);
            setFacilitySuggestions([]);
        }
    }, [formData.province]);

    // Fetch facilities when district changes
    useEffect(() => {
        if (formData.district) {
            fetchFacilitiesByDistrict(formData.district);
        } else {
            setFacilitySuggestions([]);
            setShowSuggestions(false);
        }
    }, [formData.district]);

    // Populate form when editing
    useEffect(() => {
        if (facility && isOpen) {
            setFormData({
                name: facility.name || '',
                code: facility.code || '',
                type: facility.type || 'health_center',
                province: facility.province || '',
                district: facility.district || '',
                address: facility.address || '',
                phone: facility.phone || '',
                email: facility.email || '',
                status: facility.status || 'pending',
            });
            if (facility.province) {
                fetchDistricts(facility.province);
            }
        } else if (!isEditing && isOpen) {
            setFormData({
                name: '',
                code: '',
                type: 'health_center',
                province: '',
                district: '',
                address: '',
                phone: '',
                email: '',
                status: 'pending',
            });
            setFacilitySuggestions([]);
            setSearchQuery('');
        }
        setErrors({});
    }, [facility, isOpen, isEditing]);

    // Fetch provinces
    const fetchProvinces = async () => {
        setLoadingProvinces(true);
        try {
            const response = await Http.get('/locations/provinces');
            setProvinces(response.data || []);
        } catch (error) {
            console.error('Error fetching provinces:', error);
            Notiflix.Notify.failure('Failed to load provinces');
        } finally {
            setLoadingProvinces(false);
        }
    };

    // Fetch districts by province
    const fetchDistricts = async (provinceId: string) => {
        if (!provinceId) return;
        setLoadingDistricts(true);
        try {
            const response = await Http.get(`/locations/districts?province_id=${provinceId}`);
            setDistricts(response.data || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
            Notiflix.Notify.failure('Failed to load districts');
        } finally {
            setLoadingDistricts(false);
        }
    };

    // Fetch facilities by district
    const fetchFacilitiesByDistrict = async (districtId: string) => {
        if (!districtId) return;
        setLoadingFacilities(true);
        try {
            const response = await Http.get(`/locations/facilities?district_id=${districtId}`);
            // Ensure we always set an array
            const data = response.data || [];
            setFacilitySuggestions(Array.isArray(data) ? data : []);
            setShowSuggestions(data.length > 0);
        } catch (error) {
            console.error('Error fetching facilities:', error);
            setFacilitySuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoadingFacilities(false);
        }
    };

    // Handle selecting a facility from suggestions
    const handleSelectFacility = (selected: FacilitySuggestion) => {
        // Find the district name from the selected facility's district_id
        const district = districts.find(d => d.id === selected.district_id);

        setFormData(prev => ({
            ...prev,
            name: selected.name || '',
            code: selected.code || '',
            type: selected.type as any || 'health_center',
            address: selected.address || '',
            phone: selected.phone || '',
            email: selected.email || '',
            district: district ? String(district.id) : prev.district,
        }));
        setSearchQuery(selected.name || '');
        setShowSuggestions(false);
        Notiflix.Notify.success('Facility details loaded');
    };

    // Get province name by ID
    const getProvinceName = (provinceId: string) => {
        if (!provinceId) return '';
        const province = provinces.find(p => p.id === parseInt(provinceId));
        return province?.name || '';
    };

    // Get district name by ID
    const getDistrictName = (districtId: string) => {
        if (!districtId) return '';
        const district = districts.find(d => d.id === parseInt(districtId));
        return district?.name || '';
    };

    // Get province ID from district
    const getProvinceIdFromDistrict = (districtId: string) => {
        if (!districtId) return '';
        const district = districts.find(d => d.id === parseInt(districtId));
        return district?.province_id ? String(district.province_id) : '';
    };

    if (!isOpen) return null;

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Facility name is required';
        if (!formData.code.trim()) newErrors.code = 'Facility code is required';
        if (!formData.province) newErrors.province = 'Province is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.type) newErrors.type = 'Facility type is required';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            Notiflix.Notify.warning('Please fix all errors before submitting');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            Notiflix.Notify.success(isEditing ? 'Facility updated successfully!' : 'Facility added successfully!');
            onClose();
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to save facility. Please try again.';
            Notiflix.Notify.failure(message);
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FacilityFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-emerald-100 text-emerald-700',
            inactive: 'bg-slate-100 text-slate-700',
            pending: 'bg-amber-100 text-amber-700',
        };
        return styles[status] || styles.pending;
    };

    const isSubmittingOrLoading = loading || isSubmitting || loadingProvinces || loadingDistricts || loadingFacilities;

    // Filter suggestions - with null safety
    const filteredSuggestions = Array.isArray(facilitySuggestions)
        ? facilitySuggestions.filter(f => {
            if (!f) return false;
            const name = f.name?.toLowerCase() || '';
            const code = f.code?.toLowerCase() || '';
            const query = searchQuery.toLowerCase().trim();
            return name.includes(query) || code.includes(query);
        })
        : [];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-800">
                    {/* Header - Fixed */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-t-lg">
                        <div className="flex items-center gap-2.5">
                            <Building className="h-4 w-4 text-blue-600" />
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                {isEditing ? 'Edit Facility' : 'Add Facility'}
                            </h2>
                            {isEditing && (
                                <Badge className={cn('text-xs', getStatusBadge(formData.status))}>
                                    {formData.status}
                                </Badge>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-gray-700"
                            disabled={isSubmittingOrLoading}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Form Body - Scrollable */}
                    <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Location Selection - Step 1 */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                    Step 1: Select Location
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Province <span className="text-rose-500">*</span>
                                        </Label>
                                        <div className="relative mt-0.5">
                                            <MapPin className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                            <select
                                                value={formData.province}
                                                onChange={(e) => handleChange('province', e.target.value)}
                                                className={cn(
                                                    'h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                                                    errors.province && 'border-rose-500 focus-visible:ring-rose-500',
                                                    loadingProvinces && 'opacity-50'
                                                )}
                                                disabled={isSubmittingOrLoading || loadingProvinces}
                                            >
                                                <option value="">Select province</option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {loadingProvinces && (
                                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                                                </div>
                                            )}
                                        </div>
                                        {errors.province && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.province}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            District <span className="text-rose-500">*</span>
                                        </Label>
                                        <div className="relative mt-0.5">
                                            <MapPin className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                            <select
                                                value={formData.district}
                                                onChange={(e) => {
                                                    const districtId = e.target.value;
                                                    handleChange('district', districtId);
                                                    if (districtId) {
                                                        const provinceId = getProvinceIdFromDistrict(districtId);
                                                        if (provinceId && !formData.province) {
                                                            handleChange('province', provinceId);
                                                        }
                                                    }
                                                }}
                                                className={cn(
                                                    'h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                                                    errors.district && 'border-rose-500 focus-visible:ring-rose-500',
                                                    (!formData.province || loadingDistricts) && 'opacity-50'
                                                )}
                                                disabled={isSubmittingOrLoading || !formData.province || loadingDistricts}
                                            >
                                                <option value="">
                                                    {loadingDistricts ? 'Loading...' :
                                                        !formData.province ? 'Select province first' :
                                                            'Select district'}
                                                </option>
                                                {districts.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {loadingDistricts && (
                                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                                                </div>
                                            )}
                                        </div>
                                        {errors.district && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.district}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Selected Location Display */}
                                {formData.province && formData.district && (
                                    <div className="mt-1 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-1.5 dark:bg-gray-700/50">
                                        <FileText className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="text-xs text-slate-600 dark:text-gray-300">
                                            Selected: {getProvinceName(formData.province)} → {getDistrictName(formData.district)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Facility Lookup - Step 2 */}
                            {formData.district && (
                                <div className="space-y-3">
                                    <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                        Step 2: Search Existing Facility
                                    </h3>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                setShowSuggestions(true);
                                            }}
                                            onFocus={() => {
                                                if (facilitySuggestions.length > 0) {
                                                    setShowSuggestions(true);
                                                }
                                            }}
                                            className="h-8 pl-8 pr-8 text-sm"
                                            placeholder="Search existing facility by name or code..."
                                            disabled={isSubmittingOrLoading || loadingFacilities}
                                        />
                                        {loadingFacilities && (
                                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                                            </div>
                                        )}
                                        {showSuggestions && filteredSuggestions.length > 0 && (
                                            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                                                {filteredSuggestions.map((suggestion) => (
                                                    <button
                                                        key={suggestion.id}
                                                        type="button"
                                                        onClick={() => handleSelectFacility(suggestion)}
                                                        className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-gray-700"
                                                    >
                                                        <span className="text-sm font-medium text-slate-800 dark:text-white">
                                                            {suggestion.name || 'Unnamed'}
                                                        </span>
                                                        <span className="text-xs text-slate-500 dark:text-gray-400">
                                                            {suggestion.code || 'No code'} • {suggestion.type || 'Unknown'}
                                                            {suggestion.is_active === false && (
                                                                <span className="ml-2 text-amber-600 dark:text-amber-400">(Inactive)</span>
                                                            )}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {showSuggestions && filteredSuggestions.length === 0 && searchQuery && (
                                            <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-xs text-slate-500 shadow-lg dark:border-gray-600 dark:bg-gray-800">
                                                No matching facilities found. Enter details manually below.
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        {facilitySuggestions.length === 0 && !loadingFacilities
                                            ? 'No facilities registered in this district. Enter details manually below.'
                                            : 'Type to search for existing facilities in this district'}
                                    </p>
                                </div>
                            )}

                            {/* Basic Information - Step 3 */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                    Step 3: Facility Details
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Facility Name <span className="text-rose-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className={cn(
                                                'mt-0.5 h-8 text-sm',
                                                errors.name && 'border-rose-500 focus-visible:ring-rose-500'
                                            )}
                                            placeholder="Enter facility name"
                                            disabled={isSubmittingOrLoading}
                                        />
                                        {errors.name && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Facility Code <span className="text-rose-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => handleChange('code', e.target.value)}
                                            className={cn(
                                                'mt-0.5 h-8 font-mono text-sm',
                                                errors.code && 'border-rose-500 focus-visible:ring-rose-500'
                                            )}
                                            placeholder="e.g., HOSP-001"
                                            disabled={isSubmittingOrLoading || isEditing}
                                        />
                                        {errors.code && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.code}
                                            </p>
                                        )}
                                        {isEditing && (
                                            <p className="mt-0.5 text-xs text-slate-400">Code cannot be changed</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Facility Type <span className="text-rose-500">*</span>
                                        </Label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => handleChange('type', e.target.value)}
                                            className={cn(
                                                'mt-0.5 h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                                                errors.type && 'border-rose-500 focus-visible:ring-rose-500'
                                            )}
                                            disabled={isSubmittingOrLoading}
                                        >
                                            {facilityTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.type && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Status
                                        </Label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleChange('status', e.target.value as any)}
                                            className="mt-0.5 h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            disabled={isSubmittingOrLoading}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                        Address
                                    </Label>
                                    <Input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        className="mt-0.5 h-8 text-sm"
                                        placeholder="Enter street address"
                                        disabled={isSubmittingOrLoading}
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Phone
                                        </Label>
                                        <div className="relative mt-0.5">
                                            <Phone className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                className={cn(
                                                    'h-8 pl-8 text-sm',
                                                    errors.phone && 'border-rose-500 focus-visible:ring-rose-500'
                                                )}
                                                placeholder="+260 123 456 789"
                                                disabled={isSubmittingOrLoading}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Email
                                        </Label>
                                        <div className="relative mt-0.5">
                                            <Mail className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                className={cn(
                                                    'h-8 pl-8 text-sm',
                                                    errors.email && 'border-rose-500 focus-visible:ring-rose-500'
                                                )}
                                                placeholder="facility@example.com"
                                                disabled={isSubmittingOrLoading}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-b-lg">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmittingOrLoading}
                            className="h-8 px-4 text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmittingOrLoading}
                            className="flex h-8 items-center gap-1.5 bg-blue-600 px-4 text-xs hover:bg-blue-700"
                        >
                            {isSubmittingOrLoading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    {isEditing ? 'Updating...' : 'Adding...'}
                                </>
                            ) : (
                                <>
                                    <Check className="h-3.5 w-3.5" />
                                    {isEditing ? 'Update Facility' : 'Add Facility'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

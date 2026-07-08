import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Http from '@/utils/Http';

type Props = {
    passwordRules: string;
};

interface Province {
    id: number;
    name: string;
    code: string;
}

interface District {
    id: number;
    name: string;
    province_id: number;
    code: string;
}

interface Facility {
    id: number;
    name: string;
    type: string;
    district_id: number;
    code: string;
}

export default function Register({ passwordRules }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        nrc: '',
        username: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        province_code: '',
        district_code: '',
        facility_code: '',
        employee_id: '',
        job_title: '',
        terms: false,
    });

    // Location state
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false,
        facilities: false
    });

    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedFacility, setSelectedFacility] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('personal');

    // Fetch provinces on mount
    useEffect(() => {
        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find(p => p.code === selectedProvince);
            if (province) {
                fetchDistricts(province.id);
                setSelectedDistrict('');
                setSelectedFacility('');
                setData('district_code', '');
                setData('facility_code', '');
                setFacilities([]);
            }
        }
    }, [selectedProvince]);

    // Fetch facilities when district changes
    useEffect(() => {
        if (selectedDistrict) {
            const district = districts.find(d => d.code === selectedDistrict);
            if (district) {
                fetchFacilities(district.id);
                setSelectedFacility('');
                setData('facility_code', '');
            }
        }
    }, [selectedDistrict]);

    const fetchProvinces = async () => {
        setLoading(prev => ({ ...prev, provinces: true }));
        try {
            const response = await Http.get('/locations/provinces');
            setProvinces(response.data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        } finally {
            setLoading(prev => ({ ...prev, provinces: false }));
        }
    };

    const fetchDistricts = async (provinceId: number) => {
        setLoading(prev => ({ ...prev, districts: true }));
        try {
            const response = await Http.get(`/locations/districts?province_id=${provinceId}`);
            // Ensure districts have codes
            const districtsWithCode = response.data.map((d: any) => ({
                ...d,
                code: d.code || d.name.toLowerCase().replace(/\s+/g, '_')
            }));
            setDistricts(districtsWithCode);
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(prev => ({ ...prev, districts: false }));
        }
    };

    const fetchFacilities = async (districtId: number) => {
        setLoading(prev => ({ ...prev, facilities: true }));
        try {
            const response = await Http.get(`/locations/facilities?district_id=${districtId}`);
            // Ensure facilities have codes
            const facilitiesWithCode = response.data.map((f: any) => ({
                ...f,
                code: f.code || f.name.toLowerCase().replace(/\s+/g, '_')
            }));
            setFacilities(facilitiesWithCode);
        } catch (error) {
            console.error('Error fetching facilities:', error);
        } finally {
            setLoading(prev => ({ ...prev, facilities: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen">
                <div className="">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Create an Account
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Enter your details below to create your account
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-4">
                                    {/* Progress Indicator */}
                                    <div className="flex items-center justify-center gap-3">
                                        <Badge variant={activeTab === 'personal' ? 'default' : 'secondary'} className="px-4 py-1 text-xs">
                                            Step 1
                                        </Badge>
                                        <div className="h-0.5 w-20 bg-gray-300" />
                                        <Badge variant={activeTab === 'professional' ? 'default' : 'secondary'} className="px-4 py-1 text-xs">
                                            Step 2
                                        </Badge>
                                        <div className="h-0.5 w-20 bg-gray-300" />
                                        <Badge variant={activeTab === 'security' ? 'default' : 'secondary'} className="px-4 py-1 text-xs">
                                            Step 3
                                        </Badge>
                                    </div>

                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                        {/* Full-width Tabs with ONLY Bottom Border */}
                                        <TabsList className="w-full h-auto bg-transparent border-b border-gray-200 rounded-none p-0 space-x-0">
                                            <TabsTrigger
                                                value="personal"
                                                className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-none p-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent shadow-none hover:bg-transparent focus:bg-transparent focus:ring-0 focus-visible:ring-0 [&[data-state=active]]:bg-transparent [&[data-state=active]]:shadow-none"
                                            >
                                                Personal Info
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="professional"
                                                className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-none p-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent shadow-none hover:bg-transparent focus:bg-transparent focus:ring-0 focus-visible:ring-0 [&[data-state=active]]:bg-transparent [&[data-state=active]]:shadow-none"
                                            >
                                                Professional
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="security"
                                                className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-none p-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none bg-transparent shadow-none hover:bg-transparent focus:bg-transparent focus:ring-0 focus-visible:ring-0 [&[data-state=active]]:bg-transparent [&[data-state=active]]:shadow-none"
                                            >
                                                Security
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* TAB 1: PERSONAL INFORMATION - 3 Columns */}
                                        <TabsContent value="personal" className="mt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                                                        First Name <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="first_name"
                                                        type="text"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="given-name"
                                                        name="first_name"
                                                        placeholder="John"
                                                        value={data.first_name}
                                                        onChange={(e) => setData('first_name', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.first_name} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                                                        Last Name <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="last_name"
                                                        type="text"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="family-name"
                                                        name="last_name"
                                                        placeholder="Doe"
                                                        value={data.last_name}
                                                        onChange={(e) => setData('last_name', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.last_name} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                        Email <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        tabIndex={3}
                                                        autoComplete="email"
                                                        name="email"
                                                        placeholder="john@example.com"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.email} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
                                                        Phone <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="phone_number"
                                                        type="tel"
                                                        required
                                                        tabIndex={4}
                                                        autoComplete="tel"
                                                        name="phone_number"
                                                        placeholder="+260 977 123456"
                                                        value={data.phone_number}
                                                        onChange={(e) => setData('phone_number', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.phone_number} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">
                                                        Date of Birth
                                                    </Label>
                                                    <Input
                                                        id="date_of_birth"
                                                        type="date"
                                                        tabIndex={5}
                                                        name="date_of_birth"
                                                        value={data.date_of_birth}
                                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.date_of_birth} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                                                        Gender
                                                    </Label>
                                                    <Select
                                                        value={data.gender}
                                                        onValueChange={(value) => setData('gender', value)}
                                                    >
                                                        <SelectTrigger id="gender" tabIndex={6} className="h-9 text-sm">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.gender} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="nrc" className="text-sm font-medium text-gray-700">
                                                        NRC Number
                                                    </Label>
                                                    <Input
                                                        id="nrc"
                                                        type="text"
                                                        tabIndex={7}
                                                        name="nrc"
                                                        placeholder="123456/78/1"
                                                        value={data.nrc}
                                                        onChange={(e) => setData('nrc', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.nrc} className="text-xs" />
                                                    <p className="text-[10px] text-gray-400">Format: 123456/78/1</p>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        {/* TAB 2: PROFESSIONAL INFORMATION - 3 Columns */}
                                        <TabsContent value="professional" className="mt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor="role_id" className="text-sm font-medium text-gray-700">
                                                        Role <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select
                                                        value={data.role_id}
                                                        onValueChange={(value) => setData('role_id', value)}
                                                    >
                                                        <SelectTrigger id="role_id" tabIndex={8} className="h-9 text-sm">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Administrator</SelectItem>
                                                            <SelectItem value="2">CHW</SelectItem>
                                                            <SelectItem value="3">Nurse/Midwife</SelectItem>
                                                            <SelectItem value="4">Clinician</SelectItem>
                                                            <SelectItem value="5">Counsellor</SelectItem>
                                                            <SelectItem value="6">Ward Clerk</SelectItem>
                                                            <SelectItem value="7">Facility Manager</SelectItem>
                                                            <SelectItem value="8">DHO</SelectItem>
                                                            <SelectItem value="9">MEL Officer</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.role_id} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="employee_id" className="text-sm font-medium text-gray-700">
                                                        Employee ID
                                                    </Label>
                                                    <Input
                                                        id="employee_id"
                                                        type="text"
                                                        tabIndex={9}
                                                        name="employee_id"
                                                        placeholder="EMP-2026-001"
                                                        value={data.employee_id}
                                                        onChange={(e) => setData('employee_id', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.employee_id} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="job_title" className="text-sm font-medium text-gray-700">
                                                        Job Title
                                                    </Label>
                                                    <Input
                                                        id="job_title"
                                                        type="text"
                                                        tabIndex={10}
                                                        name="job_title"
                                                        placeholder="Senior Nurse"
                                                        value={data.job_title}
                                                        onChange={(e) => setData('job_title', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.job_title} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="province_code" className="text-sm font-medium text-gray-700">
                                                        Province <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select
                                                        value={selectedProvince}
                                                        onValueChange={(value) => {
                                                            setSelectedProvince(value);
                                                            setSelectedDistrict('');
                                                            setSelectedFacility('');
                                                            setData('province_code', value);
                                                            setData('district_code', '');
                                                            setData('facility_code', '');
                                                            setFacilities([]);
                                                        }}
                                                        disabled={loading.provinces}
                                                    >
                                                        <SelectTrigger id="province_code" tabIndex={11} className="h-9 text-sm">
                                                            <SelectValue placeholder={loading.provinces ? "Loading..." : "Select province"} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {provinces.map((province) => (
                                                                <SelectItem key={province.code} value={province.code}>
                                                                    {province.name} ({province.code})
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.province_code} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="district_code" className="text-sm font-medium text-gray-700">
                                                        District <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select
                                                        value={selectedDistrict}
                                                        onValueChange={(value) => {
                                                            setSelectedDistrict(value);
                                                            setSelectedFacility('');
                                                            setData('district_code', value);
                                                            setData('facility_code', '');
                                                            setFacilities([]);
                                                        }}
                                                        disabled={!selectedProvince || loading.districts}
                                                    >
                                                        <SelectTrigger id="district_code" tabIndex={12} className="h-9 text-sm">
                                                            <SelectValue placeholder={
                                                                !selectedProvince ? "Select province first" :
                                                                    loading.districts ? "Loading..." :
                                                                        "Select district"
                                                            } />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {districts.map((district) => (
                                                                <SelectItem key={district.code} value={district.code}>
                                                                    {district.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.district_code} className="text-xs" />
                                                    {selectedProvince && districts.length === 0 && !loading.districts && (
                                                        <p className="text-xs text-amber-600 mt-1">No districts found for this province</p>
                                                    )}
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="facility_code" className="text-sm font-medium text-gray-700">
                                                        Facility <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select
                                                        value={selectedFacility}
                                                        onValueChange={(value) => {
                                                            setSelectedFacility(value);
                                                            setData('facility_code', value);
                                                        }}
                                                        disabled={!selectedDistrict || loading.facilities}
                                                    >
                                                        <SelectTrigger id="facility_code" tabIndex={13} className="h-9 text-sm">
                                                            <SelectValue placeholder={
                                                                !selectedDistrict ? "Select district first" :
                                                                    loading.facilities ? "Loading..." :
                                                                        "Select facility"
                                                            } />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {facilities.map((facility) => (
                                                                <SelectItem key={facility.code} value={facility.code}>
                                                                    {facility.name} ({facility.type})
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.facility_code} className="text-xs" />
                                                    {selectedDistrict && facilities.length === 0 && !loading.facilities && (
                                                        <p className="text-xs text-amber-600 mt-1">No facilities found for this district</p>
                                                    )}
                                                </div>
                                            </div>
                                        </TabsContent>

                                        {/* TAB 3: SECURITY - 2 Columns */}
                                        <TabsContent value="security" className="mt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                                                        Username <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        type="text"
                                                        required
                                                        tabIndex={14}
                                                        autoComplete="username"
                                                        name="username"
                                                        placeholder="johndoe"
                                                        value={data.username}
                                                        onChange={(e) => setData('username', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.username} className="text-xs" />
                                                    <p className="text-[10px] text-gray-400">Min 3 characters, unique</p>
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                        Password <span className="text-red-500">*</span>
                                                    </Label>
                                                    <PasswordInput
                                                        id="password"
                                                        required
                                                        tabIndex={15}
                                                        autoComplete="new-password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        passwordrules={passwordRules}
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.password} className="text-xs" />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                                        Confirm Password <span className="text-red-500">*</span>
                                                    </Label>
                                                    <PasswordInput
                                                        id="password_confirmation"
                                                        required
                                                        tabIndex={16}
                                                        autoComplete="new-password"
                                                        name="password_confirmation"
                                                        placeholder="Confirm password"
                                                        passwordrules={passwordRules}
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        className="h-9 text-sm"
                                                    />
                                                    <InputError message={errors.password_confirmation} className="text-xs" />
                                                </div>

                                                <div className="col-span-1 md:col-span-2">
                                                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                        <input
                                                            type="checkbox"
                                                            id="terms"
                                                            tabIndex={17}
                                                            checked={data.terms}
                                                            onChange={(e) => setData('terms', e.target.checked)}
                                                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0 cursor-pointer"
                                                        />
                                                        <Label htmlFor="terms" className="text-sm cursor-pointer text-gray-700">
                                                            I agree to the{' '}
                                                            <a href="/terms" className="text-blue-600 hover:underline font-medium" target="_blank">
                                                                Terms of Service
                                                            </a>{' '}
                                                            and{' '}
                                                            <a href="/privacy" className="text-blue-600 hover:underline font-medium" target="_blank">
                                                                Privacy Policy
                                                            </a>
                                                            <span className="text-red-500">*</span>
                                                        </Label>
                                                    </div>
                                                    {errors.terms && (
                                                        <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between items-center gap-4 mt-4">
                                        {activeTab !== 'personal' && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const tabs = ['personal', 'professional', 'security'];
                                                    const currentIndex = tabs.indexOf(activeTab);
                                                    if (currentIndex > 0) {
                                                        setActiveTab(tabs[currentIndex - 1]);
                                                    }
                                                }}
                                                tabIndex={18}
                                                className="px-6 py-1.5 h-9 text-sm"
                                            >
                                                ← Previous
                                            </Button>
                                        )}

                                        <div className={activeTab === 'personal' ? 'ml-auto' : ''}>
                                            {activeTab !== 'security' ? (
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const tabs = ['personal', 'professional', 'security'];
                                                        const currentIndex = tabs.indexOf(activeTab);
                                                        if (currentIndex < tabs.length - 1) {
                                                            setActiveTab(tabs[currentIndex + 1]);
                                                        }
                                                    }}
                                                    tabIndex={19}
                                                    className="px-6 py-1.5 h-9 text-sm"
                                                >
                                                    Next →
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    tabIndex={20}
                                                    data-test="register-user-button"
                                                    disabled={processing}
                                                    className="px-8 py-1.5 h-9 text-sm min-w-[140px]"
                                                >
                                                    {processing && <Spinner />}
                                                    Create Account
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center text-sm text-gray-500 mt-4 pt-3 border-t border-gray-200">
                                        Already have an account?{' '}
                                        <TextLink href={login()} tabIndex={21} className="font-medium text-blue-600 hover:underline">
                                            Log in
                                        </TextLink>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

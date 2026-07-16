import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    User, Phone, MapPin, Heart, ShieldCheck, X, Plus, Trash2,
    ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Loader2,
    Home, Building2, Activity, Stethoscope, ClipboardList
} from 'lucide-react';
import Http from '@/utils/Http';
import { Notify } from 'notiflix';

// ============================================
// TYPES
// ============================================

interface Contact {
    system: 'phone' | 'mobile' | 'email' | 'whatsapp';
    value: string;
    use: 'home' | 'work' | 'mobile' | 'emergency' | 'temporary';
    rank?: number;
}

interface AddressDetails {
    province: string;
    district: string;
    chiefdom: string;
    village: string;
    ward: string;
    compound: string;
    landmark: string;
    postalCode: string;
}

interface RiskAssessment {
    numberOfPregnancies: string;
    numberOfDeliveries: string;
    hivStatus: 'positive' | 'negative' | 'unknown' | '';
    artStatus: 'active' | 'defaulted' | 'never' | '';
    viralLoadStatus: 'suppressed' | 'detectable' | 'unknown' | '';
    smokingHistory: 'yes' | 'no' | '';
    smokingType: '' | 'shisha' | 'cigarettes' | 'sniffing' | 'vape';
    alcoholUse: 'yes' | 'no' | '';
    familyHistoryOfCancer: 'yes' | 'no' | '';
    previousVIAPositive: 'yes' | 'no' | '';
    previousHPVPositive: 'yes' | 'no' | '';
    previousCINDiagnosis: 'yes' | 'no' | '';
    previousCervicalCancer: 'yes' | 'no' | '';
}

interface PatientFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | 'unknown' | '';
    maritalStatus?: string;
    nrcNumber?: string;
    phoneNumber: string;
    address: AddressDetails;
    facility: string;
    riskAssessment: RiskAssessment;
    riskFlags: string[];
}

// API Location Types
interface Province {
    id: number;
    name: string;
    code?: string;
}

interface District {
    id: number;
    name: string;
    province_id: number;
    code?: string;
}

interface Facility {
    id: number;
    facility_uuid?: string | null;
    name: string;
    code: string;
    type: string;
    district: string;
    province: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    status: string;
    created_by?: number | null;
    updated_by?: number | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

const normalizePhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.startsWith('+260')) return cleaned;
    if (cleaned.startsWith('0') && cleaned.length === 10) return `+260${cleaned.slice(1)}`;
    return cleaned;
};

// ============================================
// SIMPLE COMPONENTS
// ============================================

const SimpleButton: React.FC<{
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}> = ({
          onClick,
          type = 'button',
          variant = 'primary',
          size = 'md',
          disabled = false,
          className = '',
          children,
      }) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-black hover:text-white',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
        ghost: 'text-slate-700 hover:bg-slate-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

// Custom New Patient Button
const NewPatientButton: React.FC<{
    onClick: () => void;
}> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
                inline-flex items-center justify-center
                px-4 py-2 text-sm font-medium
                transition-colors duration-200 rounded-md
                bg-blue-600 text-white
                hover:bg-black hover:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
        >
            <Plus className="w-4 h-4 mr-2" />
            New Patient
        </button>
    );
};

const SimpleInput: React.FC<{
    id?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}> = ({
          id,
          type = 'text',
          value,
          onChange,
          placeholder,
          className = '',
          disabled = false,
          required = false,
      }) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`w-full h-8 px-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        />
    );
};

const SimpleSelect: React.FC<{
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}> = ({
          id,
          value,
          onChange,
          options,
          placeholder = 'Select an option',
          className = '',
          disabled = false,
          required = false,
      }) => {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`w-full h-8 px-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

const SimpleLabel: React.FC<{
    htmlFor?: string;
    className?: string;
    children: React.ReactNode;
}> = ({ htmlFor, className = '', children }) => {
    return (
        <label htmlFor={htmlFor} className={`text-xs font-medium text-slate-700 ${className}`}>
            {children}
        </label>
    );
};

const SimpleBadge: React.FC<{
    variant?: 'default' | 'outline' | 'success' | 'danger';
    className?: string;
    children: React.ReactNode;
}> = ({ variant = 'default', className = '', children }) => {
    const variants = {
        default: 'bg-blue-100 text-blue-800',
        outline: 'border border-slate-300 text-slate-700',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

// ============================================
// RISK ASSESSMENT RADIO GROUP
// ============================================

const RadioGroup: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options?: { value: string; label: string }[];
    required?: boolean;
    className?: string;
}> = ({
          label,
          name,
          value,
          onChange,
          options = [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
          ],
          required = false,
          className = '',
      }) => {
    return (
        <div className={`space-y-0.5 ${className}`}>
            <SimpleLabel htmlFor={name} className="text-xs font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </SimpleLabel>
            <div className="flex gap-4">
                {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={`${name}-${opt.value}`}
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="h-3.5 w-3.5 border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <SimpleLabel htmlFor={`${name}-${opt.value}`} className="text-sm font-normal">
                            {opt.label}
                        </SimpleLabel>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============================================
// CONTACTS TABLE COMPONENT
// ============================================

const ContactsTable: React.FC<{
    contacts: Contact[];
    onContactChange: (index: number, field: keyof Contact, value: any) => void;
    onAddContact: () => void;
    onRemoveContact: (index: number) => void;
}> = ({
          contacts,
          onContactChange,
          onAddContact,
          onRemoveContact,
      }) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <SimpleLabel>Additional Contacts</SimpleLabel>
                <SimpleButton variant="outline" size="sm" onClick={onAddContact}>
                    <Plus className="w-3 h-3 mr-1" /> Add Contact
                </SimpleButton>
            </div>

            <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-slate-50 p-2 border-b">
                    <div className="col-span-3 text-xs font-medium text-slate-700">Type</div>
                    <div className="col-span-5 text-xs font-medium text-slate-700">Value</div>
                    <div className="col-span-3 text-xs font-medium text-slate-700">Use</div>
                    <div className="col-span-1 text-xs font-medium text-slate-700"></div>
                </div>

                {contacts.map((contact, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-2 border-b last:border-b-0 items-center">
                        <div className="col-span-3">
                            <select
                                value={contact.system}
                                onChange={(e) => onContactChange(index, 'system', e.target.value as any)}
                                className="w-full h-7 text-xs border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                            >
                                <option value="phone">Phone</option>
                                <option value="mobile">Mobile</option>
                                <option value="email">Email</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>
                        <div className="col-span-5">
                            <SimpleInput
                                value={contact.value}
                                onChange={(e) => onContactChange(index, 'value', e.target.value)}
                                placeholder={contact.system === 'email' ? 'user@email.com' : '+26097XXXXXXX'}
                                className="h-7 border-0 p-0 focus-visible:ring-0"
                            />
                        </div>
                        <div className="col-span-3">
                            <select
                                value={contact.use}
                                onChange={(e) => onContactChange(index, 'use', e.target.value as any)}
                                className="w-full h-7 text-xs border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                            >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="mobile">Mobile</option>
                                <option value="emergency">Emergency</option>
                                <option value="temporary">Temporary</option>
                            </select>
                        </div>
                        <div className="col-span-1 flex justify-center">
                            {contacts.length > 1 && (
                                <SimpleButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveContact(index)}
                                    className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </SimpleButton>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============================================
// MAIN CREATE PAGE COMPONENT
// ============================================

interface CreateProps {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            facility_id: number;
        };
    };
}

export default function Create() {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('demographics');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Location data from API
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false,
        facilities: false
    });

    // User facility
    const [userFacility, setUserFacility] = useState<Facility | null>(null);

    // Form state - with default "no" for radio buttons
    const [formData, setFormData] = useState<PatientFormData>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        nrcNumber: '',
        phoneNumber: '',
        address: {
            province: '',
            district: '',
            chiefdom: '',
            village: '',
            ward: '',
            compound: '',
            landmark: '',
            postalCode: '',
        },
        facility: '',
        riskAssessment: {
            numberOfPregnancies: '',
            numberOfDeliveries: '',
            hivStatus: '',
            artStatus: '',
            viralLoadStatus: '',
            smokingHistory: 'no',
            smokingType: '',
            alcoholUse: 'no',
            familyHistoryOfCancer: 'no',
            previousVIAPositive: 'no',
            previousHPVPositive: 'no',
            previousCINDiagnosis: 'no',
            previousCervicalCancer: 'no',
        },
        riskFlags: [],
    });

    // Contacts
    const [contacts, setContacts] = useState<Contact[]>([
        { system: 'mobile', value: '', use: 'mobile', rank: 1 }
    ]);

    // ============================================
    // API FUNCTIONS for Location Data
    // ============================================

    const fetchProvinces = async () => {
        setLoading(prev => ({ ...prev, provinces: true }));
        try {
            const response = await Http.get('/locations/provinces');
            const provincesWithCode = response.data.map((province: any) => ({
                ...province,
                code: province.code || `province_${province.id}`
            }));
            setProvinces(provincesWithCode);
        } catch (error) {
            console.error('Error fetching provinces:', error);
            Notify.failure('Failed to load provinces.', {
                position: 'right-top',
                timeout: 5000,
            });
        } finally {
            setLoading(prev => ({ ...prev, provinces: false }));
        }
    };

    const fetchDistricts = async (provinceId: number) => {
        setLoading(prev => ({ ...prev, districts: true }));
        try {
            const response = await Http.get(`/locations/districts?province_id=${provinceId}`);
            const districtsWithCode = response.data.map((district: any) => ({
                ...district,
                code: district.code || `district_${district.id}`
            }));
            setDistricts(districtsWithCode);
        } catch (error) {
            console.error('Error fetching districts:', error);
            Notify.failure('Failed to load districts.', {
                position: 'right-top',
                timeout: 5000,
            });
            setDistricts([]);
        } finally {
            setLoading(prev => ({ ...prev, districts: false }));
        }
    };

    const fetchUserFacility = async (facilityId: number) => {
        setLoading(prev => ({ ...prev, facilities: true }));
        try {
            const response = await Http.get(`/locations/facilities/${facilityId}`);
            if (response.data) {
                const facilityData = response.data;
                setUserFacility(facilityData);
                setFacilities([facilityData]);
                // Set the facility in form data
                setFormData(prev => ({
                    ...prev,
                    facility: String(facilityData.id)
                }));
            }
        } catch (error) {
            console.error('Error fetching user facility:', error);
            Notify.failure('Failed to load your facility information.', {
                position: 'right-top',
                timeout: 5000,
            });
        } finally {
            setLoading(prev => ({ ...prev, facilities: false }));
        }
    };

    // ============================================
    // EFFECTS for Cascading Dropdowns
    // ============================================

    useEffect(() => {
        fetchProvinces();

        // Set facility from logged-in user
        if (auth?.user?.facility_id) {
            fetchUserFacility(auth.user.facility_id);
        }
    }, [auth?.user?.facility_id]);

    useEffect(() => {
        if (formData.address.province) {
            const selectedProvince = provinces.find(p => p.code === formData.address.province);
            if (selectedProvince) {
                fetchDistricts(selectedProvince.id);
                setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, district: '' }
                }));
                // Reset facility to user's facility if district changes
                if (auth?.user?.facility_id) {
                    setFormData(prev => ({
                        ...prev,
                        facility: String(auth.user?.facility_id || '')
                    }));
                }
            }
        } else {
            setDistricts([]);
        }
    }, [formData.address.province]);

    // Ensure facility stays as user's facility
    useEffect(() => {
        if (formData.address.district) {
            if (auth?.user?.facility_id) {
                setFormData(prev => ({
                    ...prev,
                    facility: String(auth.user?.facility_id || '')
                }));
            }
        }
    }, [formData.address.district]);

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            maritalStatus: '',
            nrcNumber: '',
            phoneNumber: '',
            address: {
                province: '',
                district: '',
                chiefdom: '',
                village: '',
                ward: '',
                compound: '',
                landmark: '',
                postalCode: '',
            },
            facility: auth?.user?.facility_id ? String(auth.user.facility_id) : '',
            riskAssessment: {
                numberOfPregnancies: '',
                numberOfDeliveries: '',
                hivStatus: '',
                artStatus: '',
                viralLoadStatus: '',
                smokingHistory: 'no',
                smokingType: '',
                alcoholUse: 'no',
                familyHistoryOfCancer: 'no',
                previousVIAPositive: 'no',
                previousHPVPositive: 'no',
                previousCINDiagnosis: 'no',
                previousCervicalCancer: 'no',
            },
            riskFlags: [],
        });
        setContacts([{ system: 'mobile', value: '', use: 'mobile', rank: 1 }]);
        setActiveTab('demographics');
        setError(null);
        setFormErrors({});
        setDistricts([]);
        // Don't clear facilities - keep user facility
        if (auth?.user?.facility_id && userFacility) {
            setFacilities([userFacility]);
        }
    };

    const handleChange = (field: keyof PatientFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleAddressChange = (field: keyof AddressDetails, value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    const handleRiskChange = (field: keyof RiskAssessment, value: string) => {
        setFormData(prev => ({
            ...prev,
            riskAssessment: { ...prev.riskAssessment, [field]: value }
        }));
    };

    const handleContactChange = (index: number, field: keyof Contact, value: any) => {
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], [field]: value };
        setContacts(newContacts);
    };

    const addContact = () => {
        setContacts([...contacts, { system: 'mobile', value: '', use: 'mobile', rank: contacts.length + 1 }]);
    };

    const removeContact = (index: number) => {
        if (contacts.length > 1) {
            setContacts(contacts.filter((_, i) => i !== index));
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.address.province) errors['address.province'] = 'Province is required';
        if (!formData.address.district) errors['address.district'] = 'District is required';
        if (!formData.facility) errors.facility = 'Facility is required';

        const pregnancies = parseInt(formData.riskAssessment.numberOfPregnancies);
        const deliveries = parseInt(formData.riskAssessment.numberOfDeliveries);
        if (pregnancies > 0 && deliveries > 0 && deliveries > pregnancies) {
            errors['riskAssessment.numberOfDeliveries'] = 'Deliveries cannot exceed pregnancies';
        }

        if (formData.phoneNumber) {
            const normalized = normalizePhoneNumber(formData.phoneNumber);
            const phoneRegex = /^\+260[0-9]{9}$/;
            if (!phoneRegex.test(normalized)) {
                errors.phoneNumber = 'Invalid phone number format (e.g., +26097XXXXXXX)';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const showSuccessNotification = (message: string) => {
        Notify.success(message, {
            position: 'right-top',
            timeout: 4000,
            cssAnimationStyle: 'fade',
            showOnlyTheLastOne: true,
            clickToClose: true,
            borderRadius: '8px',
            fontSize: '14px',
            success: {
                background: '#10B981',
                textColor: '#FFFFFF',
                notiflixIconColor: '#FFFFFF',
            },
        });
    };

    const showErrorNotification = (message: string) => {
        Notify.failure(message, {
            position: 'right-top',
            timeout: 5000,
            cssAnimationStyle: 'fade',
            showOnlyTheLastOne: true,
            clickToClose: true,
            borderRadius: '8px',
            fontSize: '14px',
            failure: {
                background: '#EF4444',
                textColor: '#FFFFFF',
                notiflixIconColor: '#FFFFFF',
            },
        });
    };

    const showWarningNotification = (message: string) => {
        Notify.warning(message, {
            position: 'right-top',
            timeout: 3000,
            cssAnimationStyle: 'fade',
            showOnlyTheLastOne: true,
            clickToClose: true,
        });
    };

    const showInfoNotification = (message: string) => {
        Notify.info(message, {
            position: 'right-top',
            timeout: 2000,
            cssAnimationStyle: 'fade',
            showOnlyTheLastOne: true,
            clickToClose: true,
        });
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            const errorKeys = Object.keys(formErrors);
            if (errorKeys.length > 0) {
                const firstError = errorKeys[0];
                if (['firstName', 'lastName', 'dateOfBirth', 'gender', 'maritalStatus', 'nrcNumber'].includes(firstError)) {
                    setActiveTab('demographics');
                } else if (['phoneNumber', 'email'].includes(firstError)) {
                    setActiveTab('contact');
                } else if (firstError.includes('address') || firstError === 'facility' || firstError.includes('province') || firstError.includes('district')) {
                    setActiveTab('address');
                } else if (firstError.includes('riskAssessment')) {
                    setActiveTab('risk');
                } else {
                    setActiveTab('demographics');
                }
                showWarningNotification('Please fix the highlighted fields');
            }
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Prepare submission data with facility_id
        const submissionData = {
            ...formData,
            telecom: contacts.map(contact => ({
                ...contact,
                value: contact.system === 'phone' || contact.system === 'mobile' || contact.system === 'whatsapp'
                    ? normalizePhoneNumber(contact.value)
                    : contact.value,
            })),
            user_id: auth?.user?.id,
            facility_id: Number(formData.facility), // Convert to number and append to payload
        };

        showInfoNotification('Saving patient...');

        try {
            const response = await Http.post('/patients/register', submissionData);

            if (response.data?.success || response.status === 200 || response.status === 201) {
                const successMessage = response.data?.message || '✅ Patient registered successfully!';
                showSuccessNotification(successMessage);
                setIsModalOpen(false);
                resetForm();
                router.reload({
                    only: ['patients'],
                    preserveState: true,
                    preserveScroll: true,
                });
            } else {
                showWarningNotification('Unexpected response from server');
            }
        } catch (error: any) {
            console.error('❌ Error:', error);
            if (error.response) {
                const responseData = error.response.data;
                if (responseData?.errors) {
                    const errorMessages = Object.values(responseData.errors).flat();
                    const errorMessage = errorMessages.join(', ') || 'Validation failed';
                    showErrorNotification(errorMessage);
                    setError(errorMessage);
                } else if (responseData?.message) {
                    showErrorNotification(responseData.message);
                    setError(responseData.message);
                } else {
                    showErrorNotification(error.response.statusText || 'Server error occurred');
                    setError('Server error occurred');
                }
            } else if (error.request) {
                showErrorNotification('No response from server. Please check your connection.');
                setError('Network error - no response from server');
            } else {
                showErrorNotification(error.message || 'An unexpected error occurred');
                setError(error.message || 'An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = [
        { id: 'demographics', label: 'Demographics', icon: User },
        { id: 'contact', label: 'Contact', icon: Phone },
        { id: 'address', label: 'Address', icon: MapPin },
        { id: 'facility', label: 'Facility', icon: Building2 },
        { id: 'risk', label: 'Risk Assessment', icon: Activity },
        { id: 'review', label: 'Review', icon: ShieldCheck },
    ];

    const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
    const totalTabs = tabs.length;

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    const renderDemographics = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
            <div className="space-y-1">
                <SimpleLabel htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleInput
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={formErrors.firstName ? 'border-red-500' : ''}
                    placeholder="John"
                />
                {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleInput
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={formErrors.lastName ? 'border-red-500' : ''}
                    placeholder="Doe"
                />
                {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleInput
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={formErrors.dateOfBirth ? 'border-red-500' : ''}
                />
                {formErrors.dateOfBirth && <p className="text-xs text-red-500">{formErrors.dateOfBirth}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleSelect
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                        { value: 'unknown', label: 'Unknown' },
                    ]}
                    placeholder="Select gender"
                    className={formErrors.gender ? 'border-red-500' : ''}
                />
                {formErrors.gender && <p className="text-xs text-red-500">{formErrors.gender}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="maritalStatus">Marital Status</SimpleLabel>
                <SimpleSelect
                    id="maritalStatus"
                    value={formData.maritalStatus || ''}
                    onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    options={[
                        { value: 'single', label: 'Single' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                        { value: 'separated', label: 'Separated' },
                    ]}
                    placeholder="Select status"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="nrcNumber">NRC Number</SimpleLabel>
                <SimpleInput
                    id="nrcNumber"
                    value={formData.nrcNumber}
                    onChange={(e) => handleChange('nrcNumber', e.target.value)}
                    placeholder="123456/78/1"
                />
            </div>
        </div>
    );

    const renderContact = () => (
        <div className="space-y-3">
            <div className="space-y-1">
                <SimpleLabel htmlFor="phoneNumber">Primary Phone Number</SimpleLabel>
                <SimpleInput
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className={formErrors.phoneNumber ? 'border-red-500' : ''}
                    placeholder="+26097XXXXXXX"
                />
                {formErrors.phoneNumber && <p className="text-xs text-red-500">{formErrors.phoneNumber}</p>}
            </div>

            <ContactsTable
                contacts={contacts}
                onContactChange={handleContactChange}
                onAddContact={addContact}
                onRemoveContact={removeContact}
            />
        </div>
    );

    const renderAddress = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
                <SimpleLabel htmlFor="province">
                    Province <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleSelect
                    id="province"
                    value={formData.address.province}
                    onChange={(e) => handleAddressChange('province', e.target.value)}
                    options={provinces.map(p => ({ value: p.code || String(p.id), label: p.name }))}
                    placeholder={loading.provinces ? "Loading provinces..." : "Select province"}
                    disabled={loading.provinces}
                    className={formErrors['address.province'] ? 'border-red-500' : ''}
                />
                {formErrors['address.province'] && <p className="text-xs text-red-500">{formErrors['address.province']}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="district">
                    District <span className="text-red-500">*</span>
                </SimpleLabel>
                <SimpleSelect
                    id="district"
                    value={formData.address.district}
                    onChange={(e) => handleAddressChange('district', e.target.value)}
                    options={districts.map(d => ({ value: d.code || String(d.id), label: d.name }))}
                    placeholder={!formData.address.province ? "Select province first" : loading.districts ? "Loading districts..." : "Select district"}
                    disabled={!formData.address.province || loading.districts}
                    className={formErrors['address.district'] ? 'border-red-500' : ''}
                />
                {formErrors['address.district'] && <p className="text-xs text-red-500">{formErrors['address.district']}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="chiefdom">Chiefdom</SimpleLabel>
                <SimpleInput
                    id="chiefdom"
                    value={formData.address.chiefdom}
                    onChange={(e) => handleAddressChange('chiefdom', e.target.value)}
                    placeholder="Enter chiefdom name"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="village">Village</SimpleLabel>
                <SimpleInput
                    id="village"
                    value={formData.address.village}
                    onChange={(e) => handleAddressChange('village', e.target.value)}
                    placeholder="Enter village name"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="ward">Ward</SimpleLabel>
                <SimpleInput
                    id="ward"
                    value={formData.address.ward}
                    onChange={(e) => handleAddressChange('ward', e.target.value)}
                    placeholder="Enter ward name"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="compound">Compound/Area</SimpleLabel>
                <SimpleInput
                    id="compound"
                    value={formData.address.compound}
                    onChange={(e) => handleAddressChange('compound', e.target.value)}
                    placeholder="Enter compound or area"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="landmark">Landmark</SimpleLabel>
                <SimpleInput
                    id="landmark"
                    value={formData.address.landmark}
                    onChange={(e) => handleAddressChange('landmark', e.target.value)}
                    placeholder="Nearby landmark"
                />
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="postalCode">Postal Code</SimpleLabel>
                <SimpleInput
                    id="postalCode"
                    value={formData.address.postalCode}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    placeholder="Enter postal code"
                />
            </div>
        </div>
    );

    const renderFacility = () => {
        // Get the facility name from userFacility
        const facilityName = userFacility?.name ||
            facilities.find(f => f.id === Number(formData.facility))?.name ||
            'Loading facility...';
        const facilityCode = userFacility?.code || '';
        const facilityType = userFacility?.type || '';
        const facilityStatus = userFacility?.status || '';

        return (
            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                        <Building2 className="w-4 h-4 inline mr-1" />
                        Patient will be assigned to your facility: <strong>{facilityName}</strong>
                        {facilityCode && (
                            <span className="ml-2 text-blue-600 font-mono">(Code: {facilityCode})</span>
                        )}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <SimpleLabel htmlFor="facility">
                            Facility Name <span className="text-red-500">*</span>
                        </SimpleLabel>
                        <div className="w-full h-8 px-3 text-sm border border-slate-300 rounded-md bg-slate-50 flex items-center text-slate-700">
                            {loading.facilities ? 'Loading facility...' : facilityName}
                        </div>
                        <input
                            type="hidden"
                            name="facility"
                            value={formData.facility}
                        />
                        {formErrors.facility && <p className="text-xs text-red-500">{formErrors.facility}</p>}
                    </div>

                    {facilityCode && (
                        <div className="space-y-1">
                            <SimpleLabel htmlFor="facilityCode">Facility Code</SimpleLabel>
                            <div className="w-full h-8 px-3 text-sm border border-slate-300 rounded-md bg-slate-50 flex items-center text-slate-700">
                                {facilityCode}
                            </div>
                        </div>
                    )}
                </div>

                {(facilityType || facilityStatus) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {facilityType && (
                            <div className="space-y-1">
                                <SimpleLabel htmlFor="facilityType">Facility Type</SimpleLabel>
                                <div className="w-full h-8 px-3 text-sm border border-slate-300 rounded-md bg-slate-50 flex items-center text-slate-700 capitalize">
                                    {facilityType.replace('_', ' ')}
                                </div>
                            </div>
                        )}
                        {facilityStatus && (
                            <div className="space-y-1">
                                <SimpleLabel htmlFor="facilityStatus">Status</SimpleLabel>
                                <div className="w-full h-8 px-3 text-sm border border-slate-300 rounded-md bg-slate-50 flex items-center text-slate-700 capitalize">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                        facilityStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                                    }`}></span>
                                    {facilityStatus}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {formData.address.province && formData.address.district && formData.facility && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-green-800">Location Selected</p>
                                <p className="text-xs text-green-700">
                                    {provinces.find(p => p.code === formData.address.province)?.name || formData.address.province} →
                                    {districts.find(d => d.code === formData.address.district)?.name || formData.address.district} →
                                    {facilityName}
                                </p>
                                {facilityCode && (
                                    <p className="text-xs text-green-600 mt-1">
                                        Code: {facilityCode} | Type: {facilityType || 'N/A'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderRiskAssessment = () => {
        const risk = formData.riskAssessment;
        const isHivPositive = risk.hivStatus === 'positive';
        const isSmoking = risk.smokingHistory === 'yes';

        const riskFlags: string[] = [];
        if (risk.hivStatus === 'positive') riskFlags.push('HIV Positive');
        if (risk.smokingHistory === 'yes') riskFlags.push('Smoker');
        if (risk.alcoholUse === 'yes') riskFlags.push('Alcohol Use');
        if (risk.familyHistoryOfCancer === 'yes') riskFlags.push('Family History of Cancer');
        if (risk.previousVIAPositive === 'yes') riskFlags.push('Previous VIA Positive');
        if (risk.previousHPVPositive === 'yes') riskFlags.push('Previous HPV Positive');
        if (risk.previousCINDiagnosis === 'yes') riskFlags.push('Previous CIN Diagnosis');
        if (risk.previousCervicalCancer === 'yes') riskFlags.push('Previous Cervical Cancer');

        const pregnancies = parseInt(risk.numberOfPregnancies);
        const deliveries = parseInt(risk.numberOfDeliveries);
        const hasDeliveryError = pregnancies > 0 && deliveries > 0 && deliveries > pregnancies;

        return (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {/* Reproductive Factors - Compact */}
                <div className="border rounded-lg p-2 bg-white">
                    <h4 className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> Reproductive Factors
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                            <SimpleLabel htmlFor="pregnancies" className="text-[10px]">Pregnancies</SimpleLabel>
                            <SimpleInput
                                id="pregnancies"
                                type="number"
                                min="0"
                                value={risk.numberOfPregnancies}
                                onChange={(e) => handleRiskChange('numberOfPregnancies', e.target.value)}
                                placeholder="0"
                                className="h-7 text-xs"
                            />
                        </div>
                        <div className="space-y-0.5">
                            <SimpleLabel htmlFor="deliveries" className="text-[10px]">Deliveries</SimpleLabel>
                            <SimpleInput
                                id="deliveries"
                                type="number"
                                min="0"
                                value={risk.numberOfDeliveries}
                                onChange={(e) => handleRiskChange('numberOfDeliveries', e.target.value)}
                                placeholder="0"
                                className={`h-7 text-xs ${hasDeliveryError ? 'border-red-500' : ''}`}
                            />
                            {hasDeliveryError && (
                                <p className="text-[10px] text-red-500">Deliveries cannot exceed pregnancies</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* HIV Status - Compact */}
                <div className="border rounded-lg p-2 bg-white">
                    <h4 className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" /> HIV Status
                    </h4>
                    <RadioGroup
                        label="HIV Status"
                        name="hivStatus"
                        value={risk.hivStatus}
                        onChange={(val) => handleRiskChange('hivStatus', val)}
                        options={[
                            { value: 'positive', label: 'Positive' },
                            { value: 'negative', label: 'Negative' },
                            { value: 'unknown', label: 'Unknown' },
                        ]}
                        className="space-y-0.5"
                    />

                    {isHivPositive && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                            <div className="grid grid-cols-2 gap-2">
                                <RadioGroup
                                    label="ART Status"
                                    name="artStatus"
                                    value={risk.artStatus}
                                    onChange={(val) => handleRiskChange('artStatus', val)}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'defaulted', label: 'Defaulted' },
                                        { value: 'never', label: 'Never' },
                                    ]}
                                    className="space-y-0.5"
                                />
                                <RadioGroup
                                    label="Viral Load"
                                    name="viralLoad"
                                    value={risk.viralLoadStatus}
                                    onChange={(val) => handleRiskChange('viralLoadStatus', val)}
                                    options={[
                                        { value: 'suppressed', label: 'Suppressed' },
                                        { value: 'detectable', label: 'Detectable' },
                                        { value: 'unknown', label: 'Unknown' },
                                    ]}
                                    className="space-y-0.5"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Lifestyle Factors - Compact */}
                <div className="border rounded-lg p-2 bg-white">
                    <h4 className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                        <ClipboardList className="w-3.5 h-3.5" /> Lifestyle
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <RadioGroup
                                label="Smoking"
                                name="smoking"
                                value={risk.smokingHistory}
                                onChange={(val) => handleRiskChange('smokingHistory', val)}
                                className="space-y-0.5"
                            />
                            {isSmoking && (
                                <div className="mt-1">
                                    <SimpleSelect
                                        id="smokingType"
                                        value={risk.smokingType || ''}
                                        onChange={(e) => handleRiskChange('smokingType', e.target.value)}
                                        options={[
                                            { value: 'shisha', label: 'Shisha' },
                                            { value: 'cigarettes', label: 'Cigarettes' },
                                            { value: 'sniffing', label: 'Sniffing' },
                                            { value: 'vape', label: 'Vape' },
                                        ]}
                                        placeholder="Type"
                                        className="h-7 text-xs"
                                    />
                                </div>
                            )}
                        </div>
                        <RadioGroup
                            label="Alcohol"
                            name="alcohol"
                            value={risk.alcoholUse}
                            onChange={(val) => handleRiskChange('alcoholUse', val)}
                            className="space-y-0.5"
                        />
                    </div>
                    <div className="mt-1">
                        <RadioGroup
                            label="Family Cancer History"
                            name="familyCancer"
                            value={risk.familyHistoryOfCancer}
                            onChange={(val) => handleRiskChange('familyHistoryOfCancer', val)}
                            className="space-y-0.5"
                        />
                    </div>
                </div>

                {/* Previous History - Compact */}
                <div className="border rounded-lg p-2 bg-white">
                    <h4 className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                        <Stethoscope className="w-3.5 h-3.5" /> Previous History
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                        <RadioGroup
                            label="Previous VIA+"
                            name="viaPositive"
                            value={risk.previousVIAPositive}
                            onChange={(val) => handleRiskChange('previousVIAPositive', val)}
                            className="space-y-0.5"
                        />
                        <RadioGroup
                            label="Previous HPV+"
                            name="hpvPositive"
                            value={risk.previousHPVPositive}
                            onChange={(val) => handleRiskChange('previousHPVPositive', val)}
                            className="space-y-0.5"
                        />
                        <RadioGroup
                            label="Previous CIN"
                            name="cinDiagnosis"
                            value={risk.previousCINDiagnosis}
                            onChange={(val) => handleRiskChange('previousCINDiagnosis', val)}
                            className="space-y-0.5"
                        />
                        <RadioGroup
                            label="Previous Cervical Cancer"
                            name="cervicalCancer"
                            value={risk.previousCervicalCancer}
                            onChange={(val) => handleRiskChange('previousCervicalCancer', val)}
                            className="space-y-0.5"
                        />
                    </div>
                </div>

                {riskFlags.length > 0 && (
                    <div className="border-2 border-red-200 rounded-lg p-2 bg-red-50">
                        <h4 className="text-xs font-semibold text-red-700 mb-1">Risk Flags</h4>
                        <div className="flex flex-wrap gap-1">
                            {riskFlags.map((flag) => (
                                <SimpleBadge key={flag} variant="danger" className="text-[10px]">{flag}</SimpleBadge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderReview = () => {
        const facilityName = userFacility?.name ||
            facilities.find(f => f.id === Number(formData.facility))?.name ||
            'Not selected';
        const facilityCode = userFacility?.code || '';
        const facilityType = userFacility?.type || '';

        return (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Demographics</h4>
                    <dl className="grid grid-cols-2 gap-1 text-xs">
                        <dt className="text-slate-500">Name:</dt>
                        <dd>{formData.firstName} {formData.lastName}</dd>
                        <dt className="text-slate-500">DOB:</dt>
                        <dd>{formData.dateOfBirth}</dd>
                        <dt className="text-slate-500">Gender:</dt>
                        <dd>{formData.gender || 'N/A'}</dd>
                        <dt className="text-slate-500">NRC:</dt>
                        <dd>{formData.nrcNumber || 'N/A'}</dd>
                    </dl>
                </div>

                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Contact</h4>
                    <div className="text-xs">Phone: {formData.phoneNumber || 'N/A'}</div>
                    {contacts.filter(c => c.value).map((c, i) => (
                        <div key={i} className="text-xs flex gap-2 mt-1">
                            <span className="text-slate-500">{c.system}:</span>
                            <span>{c.value}</span>
                            <SimpleBadge variant="outline">{c.use}</SimpleBadge>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Address</h4>
                    <dl className="grid grid-cols-2 gap-1 text-xs">
                        <dt className="text-slate-500">Province:</dt>
                        <dd>{provinces.find(p => p.code === formData.address.province)?.name || formData.address.province || 'N/A'}</dd>
                        <dt className="text-slate-500">District:</dt>
                        <dd>{districts.find(d => d.code === formData.address.district)?.name || formData.address.district || 'N/A'}</dd>
                        <dt className="text-slate-500">Chiefdom:</dt>
                        <dd>{formData.address.chiefdom || 'N/A'}</dd>
                        <dt className="text-slate-500">Village:</dt>
                        <dd>{formData.address.village || 'N/A'}</dd>
                        <dt className="text-slate-500">Compound:</dt>
                        <dd>{formData.address.compound || 'N/A'}</dd>
                    </dl>
                </div>

                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Facility</h4>
                    <div className="text-xs font-medium text-blue-600">
                        {facilityName}
                        {facilityCode && (
                            <span className="ml-2 text-blue-400 font-mono">(Code: {facilityCode})</span>
                        )}
                    </div>
                    {facilityType && (
                        <div className="text-xs text-slate-500 mt-1">
                            Type: {facilityType}
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Risk Assessment</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        <dt className="text-slate-500">Pregnancies:</dt>
                        <dd>{formData.riskAssessment.numberOfPregnancies || '0'}</dd>
                        <dt className="text-slate-500">Deliveries:</dt>
                        <dd>{formData.riskAssessment.numberOfDeliveries || '0'}</dd>
                        <dt className="text-slate-500">HIV Status:</dt>
                        <dd>{formData.riskAssessment.hivStatus || 'N/A'}</dd>
                        <dt className="text-slate-500">Smoking:</dt>
                        <dd>{formData.riskAssessment.smokingHistory || 'N/A'}</dd>
                        {formData.riskAssessment.smokingHistory === 'yes' && (
                            <>
                                <dt className="text-slate-500">Smoking Type:</dt>
                                <dd>{formData.riskAssessment.smokingType || 'N/A'}</dd>
                            </>
                        )}
                        <dt className="text-slate-500">Alcohol:</dt>
                        <dd>{formData.riskAssessment.alcoholUse || 'N/A'}</dd>
                        <dt className="text-slate-500">Family Cancer History:</dt>
                        <dd>{formData.riskAssessment.familyHistoryOfCancer || 'N/A'}</dd>
                    </div>
                </div>
            </div>
        );
    };

    // ============================================
    // MAIN RENDER
    // ============================================

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Patient Registration</h1>
                    <p className="text-sm text-slate-500">Create a new patient profile with risk assessment</p>
                </div>
                <NewPatientButton onClick={() => setIsModalOpen(true)} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-5xl max-h-[95vh] flex flex-col">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Patient Registration</h3>
                                    <p className="text-xs text-slate-500">Complete patient profile with risk assessment</p>
                                </div>
                            </div>
                            <SimpleButton
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                disabled={isSubmitting}
                                className="h-7 w-7 p-0"
                            >
                                <X className="w-4 h-4" />
                            </SimpleButton>
                        </div>

                        {error && (
                            <div className="mx-5 mt-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 flex-shrink-0">
                                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-red-700">{error}</p>
                                <SimpleButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setError(null)}
                                    className="ml-auto h-5 w-5 p-0"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </SimpleButton>
                            </div>
                        )}

                        <div className="px-5 pt-3 flex-shrink-0 overflow-x-auto">
                            <div className="grid grid-cols-6 gap-1 bg-slate-100 p-0.5 rounded-lg min-w-[600px]">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`text-xs py-1.5 px-2 rounded-md transition-all flex items-center justify-center whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'bg-white shadow-sm text-slate-900'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        <tab.icon className="w-3 h-3 mr-1.5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-3 min-h-[400px] max-h-[55vh]">
                            {activeTab === 'demographics' && renderDemographics()}
                            {activeTab === 'contact' && renderContact()}
                            {activeTab === 'address' && renderAddress()}
                            {activeTab === 'facility' && renderFacility()}
                            {activeTab === 'risk' && renderRiskAssessment()}
                            {activeTab === 'review' && renderReview()}
                        </div>

                        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50/50 rounded-b-xl flex-shrink-0">
                            <div className="text-xs text-slate-500">
                                Step {currentTabIndex + 1} of {totalTabs}
                            </div>
                            <div className="flex items-center gap-2">
                                <SimpleButton
                                    variant="outline"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        resetForm();
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </SimpleButton>

                                {currentTabIndex > 0 && (
                                    <SimpleButton
                                        variant="outline"
                                        onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
                                        disabled={isSubmitting}
                                    >
                                        <ChevronLeft className="w-3 h-3 mr-1" /> Previous
                                    </SimpleButton>
                                )}

                                {currentTabIndex < totalTabs - 1 ? (
                                    <SimpleButton
                                        variant="primary"
                                        onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
                                    >
                                        Next <ChevronRight className="w-3 h-3 ml-1" />
                                    </SimpleButton>
                                ) : (
                                    <SimpleButton
                                        variant="success"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Saving...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-3 h-3 mr-1" /> Save Patient
                                            </>
                                        )}
                                    </SimpleButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

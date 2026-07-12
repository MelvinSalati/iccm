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
    // Reproductive Factors
    numberOfPregnancies: string;
    numberOfDeliveries: string;
    longTermContraceptiveUse: 'yes' | 'no' | '';

    // HIV/ART
    hivStatus: 'positive' | 'negative' | 'unknown' | '';
    artStatus: 'active' | 'defaulted' | 'never' | '';
    viralLoadStatus: 'suppressed' | 'detectable' | 'unknown' | '';
    hpvStatus: 'positive' | 'negative' | 'unknown' | '';

    // Lifestyle
    smokingHistory: 'yes' | 'no' | '';
    alcoholUse: 'yes' | 'no' | '';
    familyHistoryOfCancer: 'yes' | 'no' | '';

    // Previous History
    previousVIAPositive: 'yes' | 'no' | '';
    previousHPVPositive: 'yes' | 'no' | '';
    previousCINDiagnosis: 'yes' | 'no' | '';
    previousCervicalCancer: 'yes' | 'no' | '';

    // Other
    immunosuppression: 'yes' | 'no' | '';
    longTermContraceptive: 'yes' | 'no' | '';
}

interface PatientFormData {
    // Demographics
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | 'unknown' | '';
    maritalStatus?: string;
    nrcNumber?: string;
    phoneNumber: string;

    // Address
    address: AddressDetails;

    // Facility
    facility: string;

    // Risk Assessment
    riskAssessment: RiskAssessment;

    // Risk Flags (for quick view)
    riskFlags: string[];
}

// ============================================
// MOCK DATA
// ============================================

const PROVINCES = [
    'Lusaka', 'Central', 'Copperbelt', 'Eastern', 'Southern',
    'Western', 'Muchinga', 'Northern', 'Luapula', 'North-Western'
];

const DISTRICTS: Record<string, string[]> = {
    Eastern: ['Chipata', 'Lundazi', 'Katete', 'Petauke'],
    Lusaka: ['Lusaka', 'Chilanga', 'Chongwe', 'Kafue'],
    Central: ['Kabwe', 'Mkushi', 'Serenje', 'Chibombo'],
    Copperbelt: ['Ndola', 'Kitwe', 'Chingola', 'Mufulira', 'Luanshya'],
    Southern: ['Choma', 'Livingstone', 'Mazabuka', 'Monze'],
    Western: ['Mongu', 'Kaoma', 'Senanga', 'Sesheke'],
    Muchinga: ['Chinsali', 'Isoka', 'Mpika', 'Nakonde'],
    Northern: ['Kasama', 'Mbala', 'Mporokoso', 'Senga Hill'],
    Luapula: ['Mansa', 'Samfya', 'Kawambwa', 'Nchelenge'],
    'North-Western': ['Solwezi', 'Kasempa', 'Mwinilunga', 'Zambezi'],
};

const CHIEFDOMS: Record<string, string[]> = {
    Chipata: ['Mshawa', 'Mkanda', 'Kapatamoyo', 'Champhira'],
    Lundazi: ['Zulu', 'Mwase', 'Kampoko', 'Chikomeni'],
    Lusaka: ['Mukamambo', 'Chilulu', 'Mwembeshi', 'Chongo'],
};

const FACILITIES: Record<string, string[]> = {
    Chipata: ['Chipata Central Hospital', 'Kapata Urban Clinic', 'Nabvutika Health Centre', 'Msekera Rural Health Centre'],
    Lundazi: ['Lundazi District Hospital', 'Mkandawire Clinic'],
    Katete: ['Katete District Hospital', 'Kakumbi Clinic'],
    Lusaka: ['University Teaching Hospital', 'Levy Mwanawasa Hospital', 'Kanyama Clinic', 'Chawama Clinic'],
    Ndola: ['Ndola Central Hospital', 'Arthur Davison Hospital', 'Itawa Clinic'],
    Kitwe: ['Kitwe Teaching Hospital', 'Wusakile Clinic', 'Mindolo Clinic'],
};

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
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
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
        <div className={`space-y-1 ${className}`}>
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
                            className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
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
        };
    };
}

export default function Create() {
    const  {auth} = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('demographics');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Form state
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
            longTermContraceptiveUse: '',
            hivStatus: '',
            artStatus: '',
            viralLoadStatus: '',
            hpvStatus: '',
            smokingHistory: '',
            alcoholUse: '',
            familyHistoryOfCancer: '',
            previousVIAPositive: '',
            previousHPVPositive: '',
            previousCINDiagnosis: '',
            previousCervicalCancer: '',
            immunosuppression: '',
            longTermContraceptive: '',
        },
        riskFlags: [],
    });

    // Contacts
    const [contacts, setContacts] = useState<Contact[]>([
        { system: 'mobile', value: '', use: 'mobile', rank: 1 }
    ]);

    // Cascading dropdowns
    const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
    const [availableChiefdoms, setAvailableChiefdoms] = useState<string[]>([]);
    const [availableFacilities, setAvailableFacilities] = useState<string[]>([]);

    // Update districts when province changes
    useEffect(() => {
        if (formData.address.province && DISTRICTS[formData.address.province]) {
            setAvailableDistricts(DISTRICTS[formData.address.province]);
            setFormData(prev => ({
                ...prev,
                address: { ...prev.address, district: '', chiefdom: '' },
                facility: ''
            }));
            setAvailableChiefdoms([]);
            setAvailableFacilities([]);
        } else {
            setAvailableDistricts([]);
        }
    }, [formData.address.province]);

    // Update chiefdoms when district changes
    useEffect(() => {
        if (formData.address.district && CHIEFDOMS[formData.address.district]) {
            setAvailableChiefdoms(CHIEFDOMS[formData.address.district]);
            setFormData(prev => ({
                ...prev,
                address: { ...prev.address, chiefdom: '' }
            }));
        } else {
            setAvailableChiefdoms([]);
        }
    }, [formData.address.district]);

    // Update facilities when district changes
    useEffect(() => {
        if (formData.address.district && FACILITIES[formData.address.district]) {
            setAvailableFacilities(FACILITIES[formData.address.district]);
            setFormData(prev => ({ ...prev, facility: '' }));
        } else {
            setAvailableFacilities([]);
        }
    }, [formData.address.district]);

    // Reset form when modal closes
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
            facility: '',
            riskAssessment: {
                numberOfPregnancies: '',
                numberOfDeliveries: '',
                longTermContraceptiveUse: '',
                hivStatus: '',
                artStatus: '',
                viralLoadStatus: '',
                hpvStatus: '',
                smokingHistory: '',
                alcoholUse: '',
                familyHistoryOfCancer: '',
                previousVIAPositive: '',
                previousHPVPositive: '',
                previousCINDiagnosis: '',
                previousCervicalCancer: '',
                immunosuppression: '',
                longTermContraceptive: '',
            },
            riskFlags: [],
        });
        setContacts([{ system: 'mobile', value: '', use: 'mobile', rank: 1 }]);
        setActiveTab('demographics');
        setError(null);
        setFormErrors({});
        setAvailableDistricts([]);
        setAvailableChiefdoms([]);
        setAvailableFacilities([]);
    };

    // Handle form field changes
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

    // Handle address changes
    const handleAddressChange = (field: keyof AddressDetails, value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    // Handle risk assessment changes
    const handleRiskChange = (field: keyof RiskAssessment, value: string) => {
        setFormData(prev => ({
            ...prev,
            riskAssessment: { ...prev.riskAssessment, [field]: value }
        }));
    };

    // Handle contact changes
    const handleContactChange = (index: number, field: keyof Contact, value: any) => {
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], [field]: value };
        setContacts(newContacts);
    };

    // Add contact
    const addContact = () => {
        setContacts([...contacts, { system: 'mobile', value: '', use: 'mobile', rank: contacts.length + 1 }]);
    };

    // Remove contact
    const removeContact = (index: number) => {
        if (contacts.length > 1) {
            setContacts(contacts.filter((_, i) => i !== index));
        }
    };

    // Validate form
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.address.province) errors['address.province'] = 'Province is required';
        if (!formData.address.district) errors['address.district'] = 'District is required';
        if (!formData.facility) errors.facility = 'Facility is required';

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

    // Submit form using Inertia router

    const handleSubmit = async () => {
        // 1. Validate form
        if (!validateForm()) {
            const errorKeys = Object.keys(formErrors);
            if (errorKeys.length > 0) {
                const firstError = errorKeys[0];

                // Map error fields to tabs
                if (['firstName', 'lastName', 'dateOfBirth', 'gender', 'maritalStatus', 'nrcNumber'].includes(firstError)) {
                    setActiveTab('demographics');
                } else if (['phoneNumber', 'email'].includes(firstError)) {
                    setActiveTab('contact');
                } else if (firstError.includes('address') || firstError === 'facility' || firstError.includes('province') || firstError.includes('district')) {
                    setActiveTab('address');
                } else {
                    setActiveTab('demographics');
                }

                // Show validation error notification
                Notify.warning('Please fix the highlighted fields');
            }
            return;
        }

        // 2. Set loading state
        setIsSubmitting(true);
        setError(null);

        // 3. Prepare submission data
        const submissionData = {
            ...formData,
            telecom: contacts.map(contact => ({
                ...contact,
                value: contact.system === 'phone' || contact.system === 'mobile' || contact.system === 'whatsapp'
                    ? normalizePhoneNumber(contact.value)
                    : contact.value,
            })),
            user_id: auth?.user?.id,
        };

        console.log('📤 Submitting patient data:', submissionData);

        // 4. Show loading notification
        Notify.info('Saving patient...', {
            timeout: 2000,
        });

        try {
            // 5. Submit with Http.post
            const response = await Http.post('/patients/register', submissionData);

            console.log('✅ Response:', response.data);

            // Check if request was successful
            if (response.data?.success || response.status === 200 || response.status === 201) {
                // Show success notification
                Notify.success(response.data?.message || 'Patient created successfully!', {
                    position: 'right-top',
                    timeout: 3000,
                });

                // Close modal and reset form
                setIsModalOpen(false);
                resetForm();

                // Optional: reload page to show updated list
                router.reload({
                    only: ['patients'],
                    preserveState: true,
                    preserveScroll: true,
                });
            } else {
                // Handle unexpected response
                Notify.warning('Unexpected response from server', {
                    position: 'right-top',
                    timeout: 3000,
                });
            }
        } catch (error: any) {
            console.error('❌ Error:', error);

            // Handle different error types
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const responseData = error.response.data;

                if (responseData?.errors) {
                    // Validation errors from Laravel
                    const errorMessages = Object.values(responseData.errors).flat();
                    const errorMessage = errorMessages.join(', ') || 'Validation failed';

                    Notify.failure(errorMessage, {
                        position: 'right-top',
                        timeout: 5000,
                    });

                    setError(errorMessage);

                    // Focus on first error field
                    const firstErrorField = Object.keys(responseData.errors)[0];
                    if (firstErrorField) {
                        const fieldTabMap: Record<string, string> = {
                            'firstName': 'demographics',
                            'lastName': 'demographics',
                            'dateOfBirth': 'demographics',
                            'gender': 'demographics',
                            'maritalStatus': 'demographics',
                            'nrcNumber': 'demographics',
                            'phoneNumber': 'contact',
                            'email': 'contact',
                            'address.province': 'address',
                            'address.district': 'address',
                            'address.city': 'address',
                            'address.address_line1': 'address',
                            'facility': 'address',
                        };

                        for (const [field, tab] of Object.entries(fieldTabMap)) {
                            if (firstErrorField.includes(field) || firstErrorField === field) {
                                setActiveTab(tab);
                                break;
                            }
                        }
                    }
                } else if (responseData?.message) {
                    // Custom error message from backend
                    Notify.failure(responseData.message, {
                        position: 'right-top',
                        timeout: 5000,
                    });
                    setError(responseData.message);
                } else {
                    // Generic server error
                    Notify.failure(error.response.statusText || 'Server error occurred', {
                        position: 'right-top',
                        timeout: 5000,
                    });
                    setError('Server error occurred');
                }
            } else if (error.request) {
                // The request was made but no response was received
                Notify.failure('No response from server. Please check your connection.', {
                    position: 'right-top',
                    timeout: 5000,
                });
                setError('Network error - no response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                Notify.failure(error.message || 'An unexpected error occurred', {
                    position: 'right-top',
                    timeout: 5000,
                });
                setError(error.message || 'An unexpected error occurred');
            }
        } finally {
            // Always reset loading state
            setIsSubmitting(false);
        }
    };

    // Tab navigation
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
                    options={PROVINCES.map(p => ({ value: p, label: p }))}
                    placeholder="Select province"
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
                    options={availableDistricts.map(d => ({ value: d, label: d }))}
                    placeholder="Select district"
                    disabled={!availableDistricts.length}
                    className={formErrors['address.district'] ? 'border-red-500' : ''}
                />
                {formErrors['address.district'] && <p className="text-xs text-red-500">{formErrors['address.district']}</p>}
            </div>

            <div className="space-y-1">
                <SimpleLabel htmlFor="chiefdom">Chiefdom</SimpleLabel>
                <SimpleSelect
                    id="chiefdom"
                    value={formData.address.chiefdom}
                    onChange={(e) => handleAddressChange('chiefdom', e.target.value)}
                    options={availableChiefdoms.map(c => ({ value: c, label: c }))}
                    placeholder="Select chiefdom"
                    disabled={!availableChiefdoms.length}
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

    const renderFacility = () => (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Select the facility where this patient belongs for aggregation purposes
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <SimpleLabel htmlFor="facility">
                        Facility <span className="text-red-500">*</span>
                    </SimpleLabel>
                    <SimpleSelect
                        id="facility"
                        value={formData.facility}
                        onChange={(e) => handleChange('facility', e.target.value)}
                        options={availableFacilities.map(f => ({ value: f, label: f }))}
                        placeholder="Select facility"
                        disabled={!availableFacilities.length}
                        className={formErrors.facility ? 'border-red-500' : ''}
                    />
                    {formErrors.facility && <p className="text-xs text-red-500">{formErrors.facility}</p>}
                </div>

                <div className="space-y-1">
                    <SimpleLabel htmlFor="facilityType">Facility Type</SimpleLabel>
                    <SimpleSelect
                        id="facilityType"
                        value=""
                        onChange={() => {}}
                        options={[
                            { value: 'hospital', label: 'Hospital' },
                            { value: 'clinic', label: 'Clinic' },
                            { value: 'health_centre', label: 'Health Centre' },
                            { value: 'rural_health_centre', label: 'Rural Health Centre' },
                        ]}
                        placeholder="Select facility type"
                    />
                </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Selected Location</h4>
                <dl className="grid grid-cols-2 gap-1 text-xs">
                    <dt className="text-slate-500">Province:</dt>
                    <dd>{formData.address.province || 'Not selected'}</dd>
                    <dt className="text-slate-500">District:</dt>
                    <dd>{formData.address.district || 'Not selected'}</dd>
                    <dt className="text-slate-500">Chiefdom:</dt>
                    <dd>{formData.address.chiefdom || 'Not selected'}</dd>
                    <dt className="text-slate-500">Facility:</dt>
                    <dd className="font-medium text-blue-600">{formData.facility || 'Not selected'}</dd>
                </dl>
            </div>
        </div>
    );

    const renderRiskAssessment = () => {
        const risk = formData.riskAssessment;

        // Count risk flags based on "yes" answers
        const riskFlags: string[] = [];
        if (risk.hivStatus === 'positive') riskFlags.push('HIV Positive');
        if (risk.hpvStatus === 'positive') riskFlags.push('HPV Positive');
        if (risk.smokingHistory === 'yes') riskFlags.push('Smoker');
        if (risk.alcoholUse === 'yes') riskFlags.push('Alcohol Use');
        if (risk.familyHistoryOfCancer === 'yes') riskFlags.push('Family History of Cancer');
        if (risk.previousVIAPositive === 'yes') riskFlags.push('Previous VIA Positive');
        if (risk.previousHPVPositive === 'yes') riskFlags.push('Previous HPV Positive');
        if (risk.previousCINDiagnosis === 'yes') riskFlags.push('Previous CIN Diagnosis');
        if (risk.previousCervicalCancer === 'yes') riskFlags.push('Previous Cervical Cancer');
        if (risk.immunosuppression === 'yes') riskFlags.push('Immunosuppression');
        if (risk.longTermContraceptive === 'yes') riskFlags.push('Long-Term Contraceptive Use');

        return (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {/* Reproductive Factors */}
                <div className="border rounded-lg p-3 bg-white">
                    <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4" /> Reproductive Factors
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <SimpleLabel htmlFor="pregnancies">Number of Pregnancies</SimpleLabel>
                            <SimpleInput
                                id="pregnancies"
                                type="number"
                                value={risk.numberOfPregnancies}
                                onChange={(e) => handleRiskChange('numberOfPregnancies', e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-1">
                            <SimpleLabel htmlFor="deliveries">Number of Deliveries</SimpleLabel>
                            <SimpleInput
                                id="deliveries"
                                type="number"
                                value={risk.numberOfDeliveries}
                                onChange={(e) => handleRiskChange('numberOfDeliveries', e.target.value)}
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            label="Long-Term Oral Contraceptive Use (>5 years)"
                            name="contraceptiveUse"
                            value={risk.longTermContraceptiveUse}
                            onChange={(val) => handleRiskChange('longTermContraceptiveUse', val)}
                        />
                    </div>
                </div>

                {/* HIV/ART Status */}
                <div className="border rounded-lg p-3 bg-white">
                    <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> HIV & ART Status
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        />
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
                        />
                        <RadioGroup
                            label="Viral Load Status"
                            name="viralLoad"
                            value={risk.viralLoadStatus}
                            onChange={(val) => handleRiskChange('viralLoadStatus', val)}
                            options={[
                                { value: 'suppressed', label: 'Suppressed' },
                                { value: 'detectable', label: 'Detectable' },
                                { value: 'unknown', label: 'Unknown' },
                            ]}
                        />
                        <RadioGroup
                            label="HPV Status"
                            name="hpvStatus"
                            value={risk.hpvStatus}
                            onChange={(val) => handleRiskChange('hpvStatus', val)}
                            options={[
                                { value: 'positive', label: 'Positive' },
                                { value: 'negative', label: 'Negative' },
                                { value: 'unknown', label: 'Unknown' },
                            ]}
                        />
                    </div>
                </div>

                {/* Lifestyle Factors */}
                <div className="border rounded-lg p-3 bg-white">
                    <h4 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <ClipboardList className="w-4 h-4" /> Lifestyle Factors
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RadioGroup
                            label="Smoking History"
                            name="smoking"
                            value={risk.smokingHistory}
                            onChange={(val) => handleRiskChange('smokingHistory', val)}
                        />
                        <RadioGroup
                            label="Alcohol Use"
                            name="alcohol"
                            value={risk.alcoholUse}
                            onChange={(val) => handleRiskChange('alcoholUse', val)}
                        />
                        <RadioGroup
                            label="Family History of Cancer"
                            name="familyCancer"
                            value={risk.familyHistoryOfCancer}
                            onChange={(val) => handleRiskChange('familyHistoryOfCancer', val)}
                        />
                    </div>
                </div>

                {/* Previous History */}
                <div className="border rounded-lg p-3 bg-white">
                    <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" /> Previous History
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RadioGroup
                            label="Previous VIA Positive"
                            name="viaPositive"
                            value={risk.previousVIAPositive}
                            onChange={(val) => handleRiskChange('previousVIAPositive', val)}
                        />
                        <RadioGroup
                            label="Previous HPV Positive"
                            name="hpvPositive"
                            value={risk.previousHPVPositive}
                            onChange={(val) => handleRiskChange('previousHPVPositive', val)}
                        />
                        <RadioGroup
                            label="Previous CIN Diagnosis"
                            name="cinDiagnosis"
                            value={risk.previousCINDiagnosis}
                            onChange={(val) => handleRiskChange('previousCINDiagnosis', val)}
                        />
                        <RadioGroup
                            label="Previous Cervical Cancer"
                            name="cervicalCancer"
                            value={risk.previousCervicalCancer}
                            onChange={(val) => handleRiskChange('previousCervicalCancer', val)}
                        />
                    </div>
                </div>

                {/* Other Factors */}
                <div className="border rounded-lg p-3 bg-white">
                    <h4 className="text-sm font-semibold text-teal-700 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Other Factors
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RadioGroup
                            label="Immunosuppression"
                            name="immunosuppression"
                            value={risk.immunosuppression}
                            onChange={(val) => handleRiskChange('immunosuppression', val)}
                        />
                        <RadioGroup
                            label="Long-Term Contraceptive Use"
                            name="longTermContraceptive"
                            value={risk.longTermContraceptive}
                            onChange={(val) => handleRiskChange('longTermContraceptive', val)}
                        />
                    </div>
                </div>

                {/* Risk Flags Summary */}
                {riskFlags.length > 0 && (
                    <div className="border-2 border-red-200 rounded-lg p-3 bg-red-50">
                        <h4 className="text-sm font-semibold text-red-700 mb-2">Risk Flags Detected</h4>
                        <div className="flex flex-wrap gap-2">
                            {riskFlags.map((flag) => (
                                <SimpleBadge key={flag} variant="danger">{flag}</SimpleBadge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderReview = () => (
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
                    <dd>{formData.address.province}</dd>
                    <dt className="text-slate-500">District:</dt>
                    <dd>{formData.address.district}</dd>
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
                <div className="text-xs font-medium text-blue-600">{formData.facility || 'Not selected'}</div>
            </div>

            {/* Risk Assessment Summary */}
            <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Risk Assessment</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                    <dt className="text-slate-500">HIV Status:</dt>
                    <dd>{formData.riskAssessment.hivStatus || 'N/A'}</dd>
                    <dt className="text-slate-500">HPV Status:</dt>
                    <dd>{formData.riskAssessment.hpvStatus || 'N/A'}</dd>
                    <dt className="text-slate-500">Smoking:</dt>
                    <dd>{formData.riskAssessment.smokingHistory || 'N/A'}</dd>
                    <dt className="text-slate-500">Alcohol:</dt>
                    <dd>{formData.riskAssessment.alcoholUse || 'N/A'}</dd>
                    <dt className="text-slate-500">Family Cancer History:</dt>
                    <dd>{formData.riskAssessment.familyHistoryOfCancer || 'N/A'}</dd>
                </div>
            </div>
        </div>
    );

    // ============================================
    // MAIN RENDER
    // ============================================

    return (
        <div className="space-y-4 p-4">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Patient Registration</h1>
                    <p className="text-sm text-slate-500">Create a new patient profile with risk assessment</p>
                </div>
                <SimpleButton
                    variant="ghost"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Patient
                </SimpleButton>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl  max-w-5xl max-h-[95vh] flex flex-col">
                        {/* Header */}
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

                        {/* Error Banner */}
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

                        {/* Tabs Navigation */}
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

                        {/* Content - Fixed height with scroll */}
                        <div className="flex-1 overflow-y-auto px-5 py-3 min-h-[400px] max-h-[55vh]">
                            {activeTab === 'demographics' && renderDemographics()}
                            {activeTab === 'contact' && renderContact()}
                            {activeTab === 'address' && renderAddress()}
                            {activeTab === 'facility' && renderFacility()}
                            {activeTab === 'risk' && renderRiskAssessment()}
                            {activeTab === 'review' && renderReview()}
                        </div>

                        {/* Footer */}
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

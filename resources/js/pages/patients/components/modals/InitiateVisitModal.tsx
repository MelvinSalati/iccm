// components/InitiateVisitModal.tsx

import React, { useState, useEffect } from 'react';
import { X, Activity, User, ArrowRight, MapPin, Hospital, Check } from 'lucide-react';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';

interface InitiateVisitModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    patientData: any;
    userId: string;
    onVisitCreated: (visitUuid: string) => void;
}

interface VisitFormData {
    visit_type: string;
    reason_for_visit: string;
    location_type: 'facility' | 'outreach' | 'home_visit';
    facility: string;
    outreach_location: string;
    department: string;
    priority: 'routine' | 'urgent' | 'emergency' | 'critical';
    is_referral: boolean;
    referral_source: string;
    referral_reason: string;
    visit_mode: 'physical' | 'virtual' | 'hybrid';
    province_code: string;
    district_code: string;
    facility_code: string;
}

interface Province {
    id: number;
    name: string;
    code: string;
}

interface District {
    id: number;
    name: string;
    province_id: number;
    code?: string;
}

interface Facility {
    id: number;
    name: string;
    type: string;
    district_id: number;
    code?: string;
}

export const InitiateVisitModal: React.FC<InitiateVisitModalProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          patientId,
                                                                          patientData,
                                                                          userId,
                                                                          onVisitCreated,
                                                                      }) => {
    const [formData, setFormData] = useState<VisitFormData>({
        visit_type: 'cervical_cancer_screening',
        reason_for_visit: '',
        location_type: 'facility',
        facility: '',
        outreach_location: '',
        department: 'gynecology',
        priority: 'routine',
        is_referral: false,
        referral_source: '',
        referral_reason: '',
        visit_mode: 'physical',
        province_code: '',
        district_code: '',
        facility_code: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showReferralFields, setShowReferralFields] = useState(false);

    // Location data
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [locationLoading, setLocationLoading] = useState({
        provinces: false,
        districts: false,
        facilities: false
    });

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                visit_type: 'cervical_cancer_screening',
                reason_for_visit: '',
                location_type: 'facility',
                facility: '',
                outreach_location: '',
                department: 'gynecology',
                priority: 'routine',
                is_referral: false,
                referral_source: '',
                referral_reason: '',
                visit_mode: 'physical',
                province_code: '',
                district_code: '',
                facility_code: '',
            });
            setErrors({});
            setShowReferralFields(false);
            setDistricts([]);
            setFacilities([]);
            fetchProvinces();
        }
    }, [isOpen]);

    // Fetch districts when province changes
    useEffect(() => {
        if (formData.province_code && formData.location_type === 'outreach') {
            const selectedProvince = provinces.find(p => p.code === formData.province_code);
            if (selectedProvince) {
                fetchDistricts(selectedProvince.id);
                setFormData(prev => ({ ...prev, district_code: '', facility_code: '' }));
                setFacilities([]);
            }
        }
    }, [formData.province_code]);

    // Fetch facilities when district changes
    useEffect(() => {
        if (formData.district_code && formData.location_type === 'outreach') {
            const selectedDistrict = districts.find(d => d.code === formData.district_code);
            if (selectedDistrict) {
                fetchFacilities(selectedDistrict.id);
                setFormData(prev => ({ ...prev, facility_code: '' }));
            }
        }
    }, [formData.district_code]);

    const fetchProvinces = async () => {
        setLocationLoading(prev => ({ ...prev, provinces: true }));
        try {
            const response = await Http.get('/locations/provinces');
            console.log('Provinces response:', response.data);

            // Handle different response formats
            let provincesData = response.data;
            if (response.data.data) {
                provincesData = response.data.data;
            }

            setProvinces(provincesData);
        } catch (error: any) {
            console.error('Error fetching provinces:', error);
            // Don't show error notification for this, just log it
            // Use fallback data if needed
        } finally {
            setLocationLoading(prev => ({ ...prev, provinces: false }));
        }
    };

    const fetchDistricts = async (provinceId: number) => {
        setLocationLoading(prev => ({ ...prev, districts: true }));
        try {
            // Try different parameter formats
            let response;
            try {
                response = await Http.get(`/locations/districts?province_id=${provinceId}`);
            } catch (error) {
                // Fallback to different parameter format
                response = await Http.get(`/locations/districts/${provinceId}`);
            }

            console.log('Districts response:', response.data);

            let districtsData = response.data;
            if (response.data.data) {
                districtsData = response.data.data;
            }

            const districtsWithCode = districtsData.map((d: any) => ({
                ...d,
                code: d.code || `district_${d.id}`
            }));
            setDistricts(districtsWithCode);
        } catch (error: any) {
            console.error('Error fetching districts:', error);
            // Handle error silently
        } finally {
            setLocationLoading(prev => ({ ...prev, districts: false }));
        }
    };

    const fetchFacilities = async (districtId: number) => {
        setLocationLoading(prev => ({ ...prev, facilities: true }));
        try {
            // Try different parameter formats
            let response;
            try {
                response = await Http.get(`/locations/facilities?district_id=${districtId}`);
            } catch (error) {
                // Fallback to different parameter format
                response = await Http.get(`/locations/facilities/${districtId}`);
            }

            console.log('Facilities response:', response.data);

            let facilitiesData = response.data;
            if (response.data.data) {
                facilitiesData = response.data.data;
            }

            const facilitiesWithCode = facilitiesData.map((f: any) => ({
                ...f,
                code: f.code || `facility_${f.id}`
            }));
            setFacilities(facilitiesWithCode);
        } catch (error: any) {
            console.error('Error fetching facilities:', error);
            // Handle error silently
        } finally {
            setLocationLoading(prev => ({ ...prev, facilities: false }));
        }
    };

    const visitTypes = [
        { value: 'cervical_cancer_screening', label: 'Cervical Cancer Screening' },
        { value: 'colposcopy', label: 'Colposcopy' },
        { value: 'biopsy', label: 'Biopsy' },
        { value: 'hpv_testing', label: 'HPV Testing' },
        { value: 'pap_smear', label: 'Pap Smear' },
        { value: 'treatment', label: 'Treatment' },
        { value: 'follow_up', label: 'Follow-up' },
        { value: 'post_treatment_surveillance', label: 'Post-Treatment Surveillance' },
        { value: 'palliative_care', label: 'Palliative Care' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'radiation_therapy', label: 'Radiation Therapy' },
        { value: 'chemotherapy', label: 'Chemotherapy' },
        { value: 'surgery', label: 'Surgery' },
        { value: 'pre_treatment_assessment', label: 'Pre-Treatment Assessment' },
        { value: 'counseling', label: 'Counseling' },
        { value: 'health_education', label: 'Health Education' },
        { value: 'community_outreach', label: 'Community Outreach' },
        { value: 'teleconsultation', label: 'Teleconsultation' },
        { value: 'home_based_care', label: 'Home-Based Care' },
    ];

    const departments = [
        { value: 'gynecology', label: 'Gynecology' },
        { value: 'oncology', label: 'Oncology' },
        { value: 'radiation_oncology', label: 'Radiation Oncology' },
        { value: 'surgical_oncology', label: 'Surgical Oncology' },
        { value: 'palliative_care', label: 'Palliative Care' },
        { value: 'community_health', label: 'Community Health' },
    ];

    const priorities = [
        { value: 'routine', label: 'Routine', color: 'bg-sky-50 text-sky-700 ring-sky-200' },
        { value: 'urgent', label: 'Urgent', color: 'bg-amber-50 text-amber-700 ring-amber-200' },
        { value: 'emergency', label: 'Emergency', color: 'bg-orange-50 text-orange-700 ring-orange-200' },
        { value: 'critical', label: 'Critical', color: 'bg-rose-50 text-rose-700 ring-rose-200' },
    ];

    const handleInputChange = (field: keyof VisitFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.visit_type) {
            newErrors.visit_type = 'Visit type is required';
        }
        if (!formData.reason_for_visit || formData.reason_for_visit.trim().length < 5) {
            newErrors.reason_for_visit = 'Please provide a valid reason for visit (min 5 characters)';
        }

        if (formData.location_type === 'facility' && !formData.facility) {
            newErrors.facility = 'Facility is required';
        }
        if (formData.location_type === 'outreach') {
            if (!formData.province_code) {
                newErrors.province_code = 'Province is required';
            }
            if (!formData.district_code) {
                newErrors.district_code = 'District is required';
            }
            if (!formData.facility_code) {
                newErrors.facility_code = 'Facility is required';
            }
        }
        if (formData.location_type === 'home_visit' && !formData.outreach_location) {
            newErrors.outreach_location = 'Home visit address is required';
        }
        if (formData.is_referral && !formData.referral_source) {
            newErrors.referral_source = 'Referral source is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            let facilityName = '';
            let locationDetails = {};

            if (formData.location_type === 'facility') {
                facilityName = formData.facility;
            } else if (formData.location_type === 'outreach') {
                const selectedFacility = facilities.find(f => f.code === formData.facility_code);
                const selectedDistrict = districts.find(d => d.code === formData.district_code);
                const selectedProvince = provinces.find(p => p.code === formData.province_code);

                facilityName = selectedFacility?.name || '';
                locationDetails = {
                    province: selectedProvince?.name || '',
                    province_code: formData.province_code,
                    province_id: selectedProvince?.id || null,
                    district: selectedDistrict?.name || '',
                    district_code: formData.district_code,
                    district_id: selectedDistrict?.id || null,
                    facility_code: formData.facility_code,
                    facility_id: selectedFacility?.id || null,
                    facility_type: selectedFacility?.type || '',
                };
            } else if (formData.location_type === 'home_visit') {
                facilityName = formData.outreach_location;
                locationDetails = {
                    address: formData.outreach_location,
                    visit_type: 'home_visit'
                };
            }

            const payload = {
                patient_id: patientId,
                created_by: userId,
                visit_type: formData.visit_type,
                visit_mode: formData.visit_mode,
                presenting_complaint: formData.reason_for_visit,
                priority: formData.priority,
                facility: facilityName,
                department: formData.department,
                is_referral: formData.is_referral,
                referral_source: formData.is_referral ? formData.referral_source : null,
                referral_reason: formData.is_referral ? formData.referral_reason : null,
                visit_status: 'checked_in',
                check_in_time: new Date().toISOString(),
                metadata: {
                    location_type: formData.location_type,
                    initiated_by: userId,
                    initiated_at: new Date().toISOString(),
                    ...locationDetails,
                },
            };

            console.log('Submitting payload:', payload);

            const response = await Http.post(`/patients/${patientId}/visit`, payload);
            console.log('Response:', response);

            if (response.status === 201) {
                Notiflix.Notify.success(response.data.message || 'Visit initiated successfully');
                const visitUuid = response.data.data?.id || response.data.id;
                if (visitUuid) {
                    onVisitCreated(visitUuid);
                }
                onClose();
            } else {
                Notiflix.Notify.warning(response.data.message || 'Failed to initiate visit');
                onClose();
            }
        } catch (error: any) {
            console.error('Error initiating visit:', error);
            const errorMessage = error.response?.data?.message || 'Failed to initiate visit. Please try again.';
            Notiflix.Notify.failure(errorMessage);
            setErrors({
                submit: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const getProvinceName = (code: string) => {
        const province = provinces.find(p => p.code === code);
        return province?.name || code;
    };

    const getDistrictName = (code: string) => {
        const district = districts.find(d => d.code === code);
        return district?.name || code;
    };

    const getFacilityName = (code: string) => {
        const facility = facilities.find(f => f.code === code);
        return facility?.name || code;
    };

    const isOutreachLocationComplete = () => {
        return formData.location_type === 'outreach' &&
            formData.province_code &&
            formData.district_code &&
            formData.facility_code;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            <Activity className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">Initiate patient visit</h3>
                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                <User className="h-3 w-3" />
                                <span>{patientData?.first_name} {patientData?.last_name}</span>
                                {patientData?.patient_number && (
                                    <>
                                        <span className="text-slate-300">·</span>
                                        <span>ID {patientData.patient_number}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
                    {errors.submit && (
                        <div className="mb-3.5 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700 ring-1 ring-inset ring-rose-200">
                            {errors.submit}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-3.5">
                            {/* Visit Type */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Visit type *
                                </label>
                                <select
                                    value={formData.visit_type}
                                    onChange={(e) => handleInputChange('visit_type', e.target.value)}
                                    className={`mt-1 w-full rounded-md border ${errors.visit_type ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                >
                                    {visitTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.visit_type && (
                                    <p className="mt-1 text-[11px] text-rose-500">{errors.visit_type}</p>
                                )}
                            </div>

                            {/* Reason for Visit */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Reason for visit *
                                </label>
                                <textarea
                                    value={formData.reason_for_visit}
                                    onChange={(e) => handleInputChange('reason_for_visit', e.target.value)}
                                    rows={2}
                                    className={`mt-1 w-full rounded-md border ${errors.reason_for_visit ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    placeholder="e.g., Routine cervical cancer screening, abnormal bleeding"
                                />
                                {errors.reason_for_visit && (
                                    <p className="mt-1 text-[11px] text-rose-500">{errors.reason_for_visit}</p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Department
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    {departments.map((dept) => (
                                        <option key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Visit Mode */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Visit mode
                                </label>
                                <div className="mt-1 grid grid-cols-3 gap-1.5">
                                    {['physical', 'virtual', 'hybrid'].map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => handleInputChange('visit_mode', mode as any)}
                                            className={`rounded-md border px-2.5 py-1.5 text-xs capitalize transition-colors ${
                                                formData.visit_mode === mode
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3.5">
                            {/* Location Type */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Location type
                                </label>
                                <div className="mt-1 grid grid-cols-3 gap-1.5">
                                    {[
                                        { value: 'facility', label: 'Facility' },
                                        { value: 'outreach', label: 'Outreach' },
                                        { value: 'home_visit', label: 'Home visit' },
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => {
                                                handleInputChange('location_type', type.value as any);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    province_code: '',
                                                    district_code: '',
                                                    facility_code: '',
                                                    facility: '',
                                                    outreach_location: '',
                                                }));
                                                setDistricts([]);
                                                setFacilities([]);
                                            }}
                                            className={`rounded-md border px-2 py-1.5 text-xs transition-colors ${
                                                formData.location_type === type.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Location fields based on type */}
                            {formData.location_type === 'facility' && (
                                <div>
                                    <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                        Facility *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.facility}
                                        onChange={(e) => handleInputChange('facility', e.target.value)}
                                        className={`mt-1 w-full rounded-md border ${errors.facility ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="e.g., Central Hospital"
                                    />
                                    {errors.facility && (
                                        <p className="mt-1 text-[11px] text-rose-500">{errors.facility}</p>
                                    )}
                                </div>
                            )}

                            {formData.location_type === 'outreach' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Province *
                                        </label>
                                        <select
                                            value={formData.province_code}
                                            onChange={(e) => handleInputChange('province_code', e.target.value)}
                                            className={`mt-1 w-full rounded-md border ${errors.province_code ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            disabled={locationLoading.provinces}
                                        >
                                            <option value="">Select province</option>
                                            {provinces.map((province) => (
                                                <option key={province.code} value={province.code}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        {locationLoading.provinces && (
                                            <p className="mt-1 text-[11px] text-slate-400">Loading provinces...</p>
                                        )}
                                        {errors.province_code && (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.province_code}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            District *
                                        </label>
                                        <select
                                            value={formData.district_code}
                                            onChange={(e) => handleInputChange('district_code', e.target.value)}
                                            className={`mt-1 w-full rounded-md border ${errors.district_code ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            disabled={!formData.province_code || locationLoading.districts}
                                        >
                                            <option value="">Select district</option>
                                            {districts.map((district) => (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                        {locationLoading.districts && (
                                            <p className="mt-1 text-[11px] text-slate-400">Loading districts...</p>
                                        )}
                                        {formData.province_code && districts.length === 0 && !locationLoading.districts && (
                                            <p className="mt-1 text-[11px] text-amber-600">No districts found for this province</p>
                                        )}
                                        {errors.district_code && (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.district_code}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Facility *
                                        </label>
                                        <select
                                            value={formData.facility_code}
                                            onChange={(e) => handleInputChange('facility_code', e.target.value)}
                                            className={`mt-1 w-full rounded-md border ${errors.facility_code ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            disabled={!formData.district_code || locationLoading.facilities}
                                        >
                                            <option value="">Select facility</option>
                                            {facilities.map((facility) => (
                                                <option key={facility.code} value={facility.code}>
                                                    {facility.name} ({facility.type})
                                                </option>
                                            ))}
                                        </select>
                                        {locationLoading.facilities && (
                                            <p className="mt-1 text-[11px] text-slate-400">Loading facilities...</p>
                                        )}
                                        {formData.district_code && facilities.length === 0 && !locationLoading.facilities && (
                                            <p className="mt-1 text-[11px] text-amber-600">No facilities found for this district</p>
                                        )}
                                        {errors.facility_code && (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.facility_code}</p>
                                        )}
                                    </div>

                                    {isOutreachLocationComplete() && (
                                        <div className="p-2.5 bg-green-50 border border-green-200 rounded-md">
                                            <div className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-medium text-green-800">Location Selected</p>
                                                    <p className="text-[11px] text-green-700">
                                                        {getProvinceName(formData.province_code)} →
                                                        {getDistrictName(formData.district_code)} →
                                                        {getFacilityName(formData.facility_code)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {formData.location_type === 'home_visit' && (
                                <div>
                                    <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                        Home visit address *
                                    </label>
                                    <textarea
                                        value={formData.outreach_location}
                                        onChange={(e) => handleInputChange('outreach_location', e.target.value)}
                                        rows={2}
                                        className={`mt-1 w-full rounded-md border ${errors.outreach_location ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="e.g., 123 Main St, Village B, District"
                                    />
                                    {errors.outreach_location && (
                                        <p className="mt-1 text-[11px] text-rose-500">{errors.outreach_location}</p>
                                    )}
                                </div>
                            )}

                            {/* Priority */}
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Priority
                                </label>
                                <div className="mt-1 grid grid-cols-2 gap-1.5">
                                    {priorities.map((priority) => (
                                        <button
                                            key={priority.value}
                                            type="button"
                                            onClick={() => handleInputChange('priority', priority.value)}
                                            className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                                                formData.priority === priority.value
                                                    ? `${priority.color} border-current ring-1 ring-inset`
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {priority.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Referral Toggle */}
                            <div>
                                <label className="flex items-center gap-2 text-xs text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_referral}
                                        onChange={(e) => {
                                            handleInputChange('is_referral', e.target.checked);
                                            setShowReferralFields(e.target.checked);
                                            if (!e.target.checked) {
                                                handleInputChange('referral_source', '');
                                                handleInputChange('referral_reason', '');
                                            }
                                        }}
                                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    This is a referral visit
                                </label>
                            </div>

                            {/* Referral Fields (Conditional) */}
                            {formData.is_referral && (
                                <div className="space-y-2.5 rounded-md bg-slate-50 p-3">
                                    <div>
                                        <label className="text-[11px] font-medium text-slate-500">
                                            Referral source *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.referral_source}
                                            onChange={(e) => handleInputChange('referral_source', e.target.value)}
                                            className={`mt-1 w-full rounded-md border ${errors.referral_source ? 'border-rose-300' : 'border-slate-200'} bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            placeholder="e.g., Rural Health Center, Dr. Smith"
                                        />
                                        {errors.referral_source && (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.referral_source}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-medium text-slate-500">
                                            Referral reason
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.referral_reason}
                                            onChange={(e) => handleInputChange('referral_reason', e.target.value)}
                                            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="e.g., Suspicious lesion on VIA"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                    <div className="text-xs text-slate-500">
                        <span className="font-medium text-slate-700">Patient:</span> {patientData?.first_name} {patientData?.last_name}
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span className="font-medium text-slate-700">ID:</span> {patientData?.patient_number || 'N/A'}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Initiating…
                                </>
                            ) : (
                                <>
                                    Initiate visit
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

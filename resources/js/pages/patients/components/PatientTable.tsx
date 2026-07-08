// resources/js/components/patients/PatientTable.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Eye, Edit, AlertCircle, User, Calendar, Phone } from 'lucide-react';

interface Patient {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    marital_status: string | null;
    nrc_number: string | null;
    phone_number: string | null;
    is_active: boolean;
    registered_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    full_name: string;
    age: number;
    is_high_risk: boolean;
    latest_risk_assessment: {
        id: number;
        risk_level: string;
        risk_score: number;
        assessment_date: string;
        hiv_status_label: string;
        hpv_status_label: string;
        risk_level_badge: string;
    } | null;
    latest_risk_factor: any;
    risk_flags: any[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: Patient[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PatientTableProps {
    patients?: PaginationData;
    onEdit?: (patient: Patient) => void;
    onView?: (patient: Patient) => void;
}

// Default empty pagination data
const defaultPagination: PaginationData = {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 15,
    prev_page_url: null,
    to: 0,
    total: 0
};

export default function PatientTable({ patients = defaultPagination, onEdit, onView }: PatientTableProps) {
    // Ensure we have valid data
    const patientData = patients?.data || [];
    const total = patients?.total || 0;
    const from = patients?.from || 0;
    const to = patients?.to || 0;
    const links = patients?.links || [];
    const prevPageUrl = patients?.prev_page_url || null;
    const nextPageUrl = patients?.next_page_url || null;

    const getRiskLevelBadge = (riskLevel: string) => {
        const colors: Record<string, string> = {
            low: 'bg-green-100 text-green-700',
            moderate: 'bg-yellow-100 text-yellow-700',
            high: 'bg-red-100 text-red-700',
            critical: 'bg-purple-100 text-purple-700',
        };
        return colors[riskLevel] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (error) {
            return 'N/A';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            NRC
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            DOB
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Gender
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Risk
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Score
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {patientData.length === 0 ? (
                        <tr>
                            <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <User className="h-8 w-8 text-gray-400 mb-1" />
                                    <p className="text-xs">No patients found</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        patientData.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-7 w-7">
                                            <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="h-3.5 w-3.5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <div className="text-xs font-medium text-gray-900">
                                                {patient.full_name || 'Unknown'}
                                            </div>
                                            <div className="text-[10px] text-gray-500">
                                                ID: {patient.id}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    {patient.nrc_number || '—'}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    {patient.phone_number ? (
                                        <div className="flex items-center">
                                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                                            {patient.phone_number}
                                        </div>
                                    ) : '—'}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                                        {formatDate(patient.date_of_birth)}
                                    </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 capitalize">
                                    {patient.gender || '—'}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                        <span className={`px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full ${
                                            patient.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {patient.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {patient.latest_risk_assessment ? (
                                        <span className={`px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full ${getRiskLevelBadge(patient.latest_risk_assessment.risk_level)}`}>
                                                {patient.latest_risk_assessment.risk_level.charAt(0).toUpperCase() + patient.latest_risk_assessment.risk_level.slice(1)}
                                            </span>
                                    ) : (
                                        <span className="px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-gray-100 text-gray-700">
                                                N/A
                                            </span>
                                    )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                    {patient.latest_risk_assessment?.risk_score ?? '—'}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium">
                                    <div className="flex items-center justify-end space-x-1.5">
                                        <button
                                            onClick={() => onView?.(patient)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded"
                                            title="View Patient"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            onClick={() => onEdit?.(patient)}
                                            className="text-indigo-600 hover:text-indigo-800 transition-colors p-1 hover:bg-indigo-50 rounded"
                                            title="Edit Patient"
                                        >
                                            <Edit className="h-3.5 w-3.5" />
                                        </button>
                                        {patient.is_high_risk && (
                                            <span className="text-red-600" title="High Risk Patient">
                                                    <AlertCircle className="h-3.5 w-3.5" />
                                                </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Compact Pagination */}
            {total > 0 && (
                <div className="bg-white px-3 py-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-[11px] text-gray-600">
                            Showing <span className="font-medium">{from}</span> to{' '}
                            <span className="font-medium">{to}</span> of{' '}
                            <span className="font-medium">{total}</span>
                        </div>
                        <div className="flex space-x-1">
                            <Link
                                href={prevPageUrl || '#'}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded ${
                                    !prevPageUrl
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                preserveState
                            >
                                «
                            </Link>
                            {links.map((link, index) => {
                                if (link.label === '« Previous' || link.label === 'Next »') return null;
                                return (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-2.5 py-1 text-[11px] font-medium rounded ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        preserveState
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                            <Link
                                href={nextPageUrl || '#'}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded ${
                                    !nextPageUrl
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                preserveState
                            >
                                »
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

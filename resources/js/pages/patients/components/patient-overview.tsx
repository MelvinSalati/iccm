// resources/js/components/patient/patient-overview.tsx

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Patient {
    id?: number | string;
    first_name: string;
    last_name: string;
    full_name?: string;
    gender?: string;
    age?: number;
    date_of_birth?: string;
    is_active?: boolean;
    patient_uuid?: string;

    phone_number?: string;
    email?: string;
    nrc_number?: string;
}

interface Props {
    patient: Patient;
}

/** Single label/value pair rendered in the dense info grid. */
const Field = ({
                   label,
                   value,
                   mono = false,
               }: {
    label: string;
    value: string;
    mono?: boolean;
}) => (
    <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {label}
        </p>
        <p className={`truncate text-[13px] font-medium text-foreground ${mono ? 'font-mono' : ''}`}>
            {value}
        </p>
    </div>
);

export default function PatientOverview({ patient }: Props) {
    const initials = `${patient.first_name?.[0] ?? ''}${patient.last_name?.[0] ?? ''}`.toUpperCase();
    const fullName = patient.full_name ?? `${patient.first_name} ${patient.last_name}`;

    return (
        <div className="rounded-md border bg-background px-3 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                {/* Identity — always the leftmost, unmissable block */}
                <div className="flex items-center gap-3 sm:min-w-[200px]">

                    <Avatar className="h-12 w-12 shrink-0">
                        <AvatarFallback className="bg-blue-600 text-sm font-semibold text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <div className="truncate text-[15px] font-semibold leading-tight text-foreground">
                            {fullName}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                            {patient.gender && <span className="capitalize">{patient.gender}</span>}
                            {patient.gender && patient.age !== undefined && <span>·</span>}
                            {patient.age !== undefined && <span>{patient.age} yrs</span>}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            {patient.id !== undefined && (
                                <Badge className="rounded-sm border-0 bg-blue-600/15 px-1.5 py-0.5 text-[10px] font-mono font-medium text-blue-700">
                                    MRN {patient.id}
                                </Badge>
                            )}
                            {typeof patient.is_active !== 'undefined' && (
                                <Badge
                                    className={`rounded-sm border-0 px-1.5 py-0.5 text-[10px] font-medium ${
                                        patient.is_active
                                            ? 'bg-emerald-600/15 text-emerald-700'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    {patient.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Demographics — separated by a left border only, no boxed panel */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-l pl-4 sm:grid-cols-2">
                    <Field label="NRC" value={patient.nrc_number ?? 'N/A'} />
                    <Field label="DOB" value={patient.date_of_birth ?? 'N/A'} />
                    <Field label="UUID" value={patient.patient_uuid?.slice(0, 8).toUpperCase() ?? 'N/A'} mono />
                    <Field label="Age" value={patient.age !== undefined ? String(patient.age) : 'N/A'} />
                </div>

                {/* Contact — same left-border treatment, kept visually distinct from demographics */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-l pl-4 sm:grid-cols-1">
                    <Field label="Phone" value={patient.phone_number ?? 'N/A'} />
                    <Field label="Email" value={patient.email ?? 'N/A'} />
                </div>
            </div>
        </div>
    );
}

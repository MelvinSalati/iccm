// patient-details.tsx
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Heart,
    Activity,
    Edit,
    Download,
    History,
    FileText,
    MessageCircle,
    AlertCircle,
    Pill,
    ClipboardList,
    Stethoscope,
    ShieldCheck,
    CalendarClock,
    ArrowLeft
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

// Mock patient data - replace with actual data from your API/props
const patientData = {
    id: 12345,
    patient_uuid: '550e8400-e29b-41d4-a716-446655440000',
    first_name: 'Sarah',
    last_name: 'Johnson',
    age: 34,
    gender: 'female',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    nrc: '123456/78/9',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Dust', 'Latex'],
    emergencyContact: {
        name: 'Michael Johnson',
        relationship: 'Spouse',
        phone: '(555) 987-6543'
    },
    status: 'Active',
    lastVisit: '2024-12-15',
    nextAppointment: '2025-01-20',
    medicalHistory: [
        { date: '2024-10-10', diagnosis: 'Hypertension', doctor: 'Dr. Smith' },
        { date: '2024-08-05', diagnosis: 'Type 2 Diabetes', doctor: 'Dr. Jones' },
    ],
    recentVitals: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '68 kg',
        height: '165 cm'
    }
};

// Define the props that will come from the page
interface PatientDetailsProps {
    patient?: typeof patientData;
}

export default function PatientDetails({ patient = patientData }: PatientDetailsProps) {
    const { auth } = usePage().props;
    const userRoleId = auth?.user?.role_id;

    // Helper function to get full name
    const getFullName = (patient: typeof patientData) => {
        return `${patient.first_name || ''} ${patient.last_name || ''}`.trim();
    };

    // Helper to get initials
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    // If no patient data, show a message
    if (!patient) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No Patient Selected</h2>
                            <p className="text-muted-foreground mb-4">Please select a patient to view their details.</p>
                            <Link href="/patients/search">
                                <Button>
                                    <Users className="h-4 w-4 mr-2" />
                                    Browse Patients
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Back Button - Mobile Only */}
            <div className="lg:hidden">
                <Link href="/patients/search">
                    <Button variant="ghost" size="sm" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Patients
                    </Button>
                </Link>
            </div>

            {/* Header Section */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName(patient))}&size=80`} />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                            {getInitials(patient.first_name || '', patient.last_name || '')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 flex-wrap">
                            {getFullName(patient)}
                            <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                                {patient.status}
                            </Badge>
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'N/A'}, {patient.age || 'N/A'} years
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Patient ID: {patient.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Activity className="h-4 w-4" />
                                Blood Type: {patient.bloodType || 'N/A'}
                            </span>
                            {patient.nrc && (
                                <span className="flex items-center gap-1">
                                    <Badge variant="outline" className="font-mono text-xs">
                                        NRC: {patient.nrc}
                                    </Badge>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Phone</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{patient.phone || 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">Emergency: {patient.emergencyContact?.phone || 'N/A'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Email</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold truncate">{patient.email || 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">Primary email</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{patient.nextAppointment || 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit || 'N/A'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Address</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-semibold truncate">{patient.address || 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">Emergency Contact: {patient.emergencyContact?.name || 'N/A'}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                {/* Left Column - Patient Info */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Allergies & Conditions */}
                    {patient.allergies && patient.allergies.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    Allergies & Conditions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((allergy) => (
                                        <Badge key={allergy} variant="destructive">
                                            {allergy}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Medical History */}
                    {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-5 w-5" />
                                    Medical History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {patient.medicalHistory.map((record, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                                            <div>
                                                <p className="font-semibold">{record.diagnosis}</p>
                                                <p className="text-sm text-muted-foreground">{record.doctor}</p>
                                            </div>
                                            <Badge variant="outline">{record.date}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recent Vitals */}
                    {patient.recentVitals && Object.keys(patient.recentVitals).length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-red-500" />
                                    Recent Vitals
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(patient.recentVitals).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <p className="text-sm font-medium capitalize text-muted-foreground">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </p>
                                            <p className="text-xl font-bold">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column - Quick Actions & Info */}
                <div className="space-y-4">
                    {/* Emergency Contact */}
                    {patient.emergencyContact && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Emergency Contact
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-semibold">{patient.emergencyContact.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Relationship</p>
                                        <p className="font-semibold">{patient.emergencyContact.relationship}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Phone</p>
                                        <p className="font-semibold">{patient.emergencyContact.phone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full" variant="default">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Start Screening
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Stethoscope className="h-4 w-4 mr-2" />
                                Create Treatment Plan
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Pill className="h-4 w-4 mr-2" />
                                Prescribe Medication
                            </Button>
                            <Button className="w-full" variant="outline">
                                <CalendarClock className="h-4 w-4 mr-2" />
                                Schedule Appointment
                            </Button>
                            <Button className="w-full" variant="outline">
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Risk Assessment
                            </Button>
                            <Button className="w-full" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                Add Clinical Note
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Additional Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Patient Since</p>
                                    <p className="font-semibold">January 2023</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Insurance</p>
                                    <p className="font-semibold">BlueCross BlueShield</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Primary Care Provider</p>
                                    <p className="font-semibold">Dr. Emily Williams</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// This is the critical part - passing the patient data to the AppLayout
PatientDetails.layout = (page) => {
    // Extract patient data from the page props
    const patient = page.props.patient || page.props.initialPatient || null;

    return (
        <AppLayout
            children={page}
            breadcrumbs={[
                {
                    title: 'Dashboard',
                    href: dashboard(),
                },
                {
                    title: 'Patient Registry',
                    href: '/patients/search',
                },
                {
                    title: patient ? `${patient.first_name || ''} ${patient.last_name || ''}`.trim() : 'Patient Details',
                    href: '#',
                },
            ]}
            // Pass patient data to AppLayout to enable patient sidebar
            patient={patient}
            isPatientView={!!patient}
        />
    );
};

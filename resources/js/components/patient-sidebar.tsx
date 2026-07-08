// components/patient-sidebar.tsx
import { Link, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarSeparator,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import {
    User,
    LayoutDashboard,
    ClipboardList,
    Stethoscope,
    Pill,
    CalendarClock,
    ShieldCheck,
    FileText,
    MessageCircle,
    Heart,
    Activity,
    Users,
    FileHeart,
    Syringe,
    Scissors,
    Brain,
    Microscope,
    Ambulance,
    Hospital,
    Clock,
    TrendingUp,
    Printer,
    Share2,
    BookOpen,
    FileSpreadsheet,
    Camera,
    Phone,
    Mail,
    Calendar,
    Gift,
    HelpCircle,
    Settings,
    Download,
    Plus,
    Home,
    AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// All patient navigation items - organized by category
const patientNavItems = {
    overview: [
        {
            title: 'Patient Overview',
            href: '#overview',
            icon: LayoutDashboard,
            description: 'View patient summary and key information',
        },
    ],
    clinical: [
        {
            title: 'Medical History',
            href: '#medical-history',
            icon: BookOpen,
            description: 'Complete medical history',
        },
        {
            title: 'Screening Records',
            href: '#screening',
            icon: ClipboardList,
            description: 'All screening results',
        },
        {
            title: 'Treatment Plan',
            href: '#treatment',
            icon: Stethoscope,
            description: 'Current treatment plan',
        },
        {
            title: 'Medications',
            href: '#medications',
            icon: Pill,
            description: 'Prescribed medications',
        },
        {
            title: 'Dispense History',
            href: '#dispense',
            icon: Gift,
            description: 'Medication dispense records',
        },
        {
            title: 'Immunizations',
            href: '#immunizations',
            icon: Syringe,
            description: 'Vaccination history',
        },
    ],
    specialties: [
        {
            title: 'Surgeries',
            href: '#surgeries',
            icon: Scissors,
            description: 'Surgical history',
        },
        {
            title: 'Mental Health',
            href: '#mental-health',
            icon: Brain,
            description: 'Psychosocial assessment',
        },
        {
            title: 'Lab Results',
            href: '#labs',
            icon: Microscope,
            description: 'Laboratory findings',
        },
        {
            title: 'Vital Signs',
            href: '#vitals',
            icon: Heart,
            description: 'Vital signs history',
        },
        {
            title: 'NCD Management',
            href: '#ncd',
            icon: Activity,
            description: 'Non-communicable diseases',
        },
    ],
    visits: [
        {
            title: 'Appointments',
            href: '#appointments',
            icon: CalendarClock,
            description: 'Appointment schedule',
        },
        {
            title: 'Follow-up Visits',
            href: '#follow-up',
            icon: Clock,
            description: 'Follow-up schedule',
        },
        {
            title: 'Admissions',
            href: '#admissions',
            icon: Hospital,
            description: 'Admission history',
        },
        {
            title: 'Discharges',
            href: '#discharges',
            icon: FileHeart,
            description: 'Discharge records',
        },
        {
            title: 'Referrals',
            href: '#referrals',
            icon: Ambulance,
            description: 'Referral history',
        },
    ],
    monitoring: [
        {
            title: 'Risk Assessment',
            href: '#risk-assessment',
            icon: ShieldCheck,
            description: 'Risk factors and scores',
        },
        {
            title: 'Health Metrics',
            href: '#metrics',
            icon: TrendingUp,
            description: 'Health trends',
        },
    ],
    documentation: [
        {
            title: 'Clinical Notes',
            href: '#notes',
            icon: FileText,
            description: 'Doctor and nurse notes',
        },
        {
            title: 'Messages',
            href: '#messages',
            icon: MessageCircle,
            description: 'Communication history',
        },
        {
            title: 'Documents',
            href: '#documents',
            icon: FileSpreadsheet,
            description: 'Medical documents',
        },
        {
            title: 'Photos & Imaging',
            href: '#imaging',
            icon: Camera,
            description: 'Medical images',
        },
    ],
    reports: [
        {
            title: 'Reports',
            href: '#reports',
            icon: Printer,
            description: 'Print patient reports',
        },
        {
            title: 'Export Records',
            href: '#export',
            icon: Download,
            description: 'Export patient data',
        },
    ],
};

// Quick action items
const quickActionItems = [
    {
        title: 'New Screening',
        href: '#new-screening',
        icon: ClipboardList,
        variant: 'default' as const,
    },
    {
        title: 'Add Vitals',
        href: '#add-vitals',
        icon: Heart,
        variant: 'outline' as const,
    },
    {
        title: 'Prescribe',
        href: '#prescribe',
        icon: Pill,
        variant: 'outline' as const,
    },
    {
        title: 'Dispense',
        href: '#dispense',
        icon: Gift,
        variant: 'outline' as const,
    },
    {
        title: 'Schedule',
        href: '#schedule',
        icon: Calendar,
        variant: 'outline' as const,
    },
    {
        title: 'Refer',
        href: '#refer',
        icon: Ambulance,
        variant: 'outline' as const,
    },
];

// Navigation sections
const navSections = [
    { key: 'overview', label: 'Overview' },
    { key: 'clinical', label: 'Clinical Records' },
    { key: 'specialties', label: 'Specialties' },
    { key: 'visits', label: 'Appointments & Visits' },
    { key: 'monitoring', label: 'Risk & Monitoring' },
    { key: 'documentation', label: 'Documentation' },
    { key: 'reports', label: 'Reports' },
];

interface PatientSidebarProps {
    patient: {
        id: number | string;
        uuid?: string;
        first_name: string;
        last_name: string;
        nrc?: string | null;
        phone?: string | null;
        email?: string | null;
        date_of_birth?: string | null;
        gender?: string | null;
        status?: string;
        avatar?: string | null;
        [key: string]: unknown;
    };
    className?: string;
}

export function PatientSidebar({ patient, className }: PatientSidebarProps) {
    const [activeItem, setActiveItem] = useState<string>('Patient Overview');

    // Get initials from patient name
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    const fullName = `${patient.first_name || ''} ${patient.last_name || ''}`.trim();
    const initials = getInitials(patient.first_name || '', patient.last_name || '');

    // Generate avatar color based on patient ID
    const getAvatarColor = (id: number | string) => {
        const colors = [
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
            'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
            'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        ];
        const index = typeof id === 'string' ? id.length : Number(id);
        return colors[index % colors.length];
    };

    const avatarColor = getAvatarColor(patient.id);

    // Calculate age from date of birth
    const getAge = (dob: string | null | undefined) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = getAge(patient.date_of_birth as string);

    // Get patient status color
    const getStatusColor = (status: string | undefined) => {
        if (!status) return 'default';
        const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            'Active': 'default',
            'Inactive': 'secondary',
            'Critical': 'destructive',
            'Discharged': 'outline',
        };
        return statusMap[status] || 'default';
    };

    // Handle navigation item click
    const handleNavClick = (title: string) => {
        setActiveItem(title);
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className={cn(
                "border-r bg-background",
                className
            )}
        >
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <AppLogo />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto">
                {/* Patient Profile Card */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="px-3 py-4">
                            {/* Avatar and Name */}
                            <div className="flex items-start gap-3">
                                <Avatar className="h-14 w-14 ring-2 ring-primary/10">
                                    {patient.avatar ? (
                                        <AvatarImage src={patient.avatar} alt={fullName} />
                                    ) : (
                                        <AvatarFallback className={`text-lg font-semibold ${avatarColor}`}>
                                            {initials}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-base truncate">
                                        {fullName}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <Badge variant="outline" className="text-xs font-mono">
                                            ID: {patient.id}
                                        </Badge>
                                        {patient.status && (
                                            <Badge variant={getStatusColor(patient.status as string)}>
                                                {patient.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        {patient.gender && (
                                            <span>{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</span>
                                        )}
                                        {age !== null && age !== undefined && (
                                            <>
                                                <span>•</span>
                                                <span>{age} years</span>
                                            </>
                                        )}
                                        {patient.nrc && (
                                            <>
                                                <span>•</span>
                                                <span className="font-mono">{patient.nrc}</span>
                                            </>
                                        )}
                                    </div>
                                    {/* Quick Contact Info */}
                                    <div className="mt-2 space-y-0.5">
                                        {patient.phone && (
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span className="font-medium truncate">{patient.phone}</span>
                                            </div>
                                        )}
                                        {patient.email && (
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <span className="font-medium truncate">{patient.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-3 grid grid-cols-2 gap-1.5">
                                {quickActionItems.map((action) => (
                                    <TooltipProvider key={action.title}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={action.variant}
                                                    size="sm"
                                                    className="h-8 text-xs w-full"
                                                    asChild
                                                >
                                                    <Link href={action.href}>
                                                        <action.icon className="h-3 w-3 mr-1" />
                                                        <span className="truncate">{action.title}</span>
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{action.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Navigation Sections */}
                {navSections.map((section) => {
                    const items = patientNavItems[section.key as keyof typeof patientNavItems];
                    if (!items || items.length === 0) return null;

                    return (
                        <SidebarGroup key={section.key}>
                            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <SidebarMenuButton
                                                            asChild
                                                            tooltip={item.description}
                                                            isActive={activeItem === item.title}
                                                            onClick={() => handleNavClick(item.title)}
                                                        >
                                                            <Link href={item.href}>
                                                                <item.icon className="h-4 w-4" />
                                                                <span>{item.title}</span>
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right">
                                                        <p>{item.description}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    );
                })}

                <SidebarSeparator />

                {/* Navigation Links */}
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Back to Patient Registry">
                                    <Link href="/patients">
                                        <Users className="h-4 w-4" />
                                        <span>All Patients</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Back to Dashboard">
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                {/* Quick Help & Settings */}
                <div className="px-3 py-2 space-y-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs"
                        asChild
                    >
                        <Link href="#help">
                            <HelpCircle className="h-3 w-3 mr-2" />
                            Help & Support
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs"
                        asChild
                    >
                        <Link href="#settings">
                            <Settings className="h-3 w-3 mr-2" />
                            Settings
                        </Link>
                    </Button>
                </div>
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export default PatientSidebar;

// app-sidebar.tsx - Fixed with auth.user.facility_id for consultancy
import { Link, usePage } from '@inertiajs/react';
import {encryptId} from '@/utils/helpers'
import { useState, useEffect } from 'react';

import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';

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
} from '@/components/ui/sidebar';

import type { NavItem, SharedData } from '@/types';
import { cn } from '@/lib/utils';

import {
    LayoutGrid,
    Users,
    ClipboardList,
    HeartPulse,
    Activity,
    Stethoscope,
    Building2,
    ArrowRightLeft,
    Bed,
    FileHeart,
    Skull,
    ChartBarStacked,
    MapPinned,
    UserCog,
    Settings,
    ShieldCheck,
    Hospital,
    CalendarClock,
    BellRing,
    User,
    FileText,
    Pill,
    MessageCircle,
    ChevronRight, UserPlus, MicroscopeIcon, StethoscopeIcon, ChartBarIcon, BarChart2Icon
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Role IDs based on your database
const ROLE_IDS = {
    CHW: 1,
    NURSE: 2,
    CLINICIAN: 3,
    COUNSELLOR: 4,
    WARD_CLERK: 5,
    FACILITY_MANAGER: 6,
    DHO: 7,
    MEL_OFFICER: 8,
    ADMINISTRATOR: 9,
} as const;

// Consistent styling constants for the entire sidebar
const SIDEBAR_STYLES = {
    background: 'bg-white',
    border: 'border-r border-slate-200',
    iconSize: 'h-5 w-5',
    iconSizeSmall: 'h-4 w-4',
    textSize: 'text-sm',
    textSizeSmall: 'text-xs',
    spacing: {
        padding: 'px-3 py-2.5',
        paddingLarge: 'px-4 py-3',
        margin: 'my-0.5',
        gap: 'gap-2.5',
    },
    hover: 'rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700',
    active: 'bg-blue-50 text-blue-700 font-medium',
    focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white',
};

const navButtonBaseStyles =
    `${SIDEBAR_STYLES.hover} ${SIDEBAR_STYLES.textSize} ${SIDEBAR_STYLES.spacing.padding} ${SIDEBAR_STYLES.focus}`;

const navButtonActiveStyles = SIDEBAR_STYLES.active;

// Navigation items with dynamic consultancy href
const getNavigationItems = (facilityId: number | null): NavItem[] => {
    // Default to 1 if facility_id is null or undefined
    const consultancyId = facilityId || 1;

    return [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.MEL_OFFICER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.WARD_CLERK,
                ROLE_IDS.CHW,
            ],
        },
        {
            title: 'Pathology',
            href: '/laboratory/orders',
            icon: MicroscopeIcon,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.MEL_OFFICER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.WARD_CLERK,
                ROLE_IDS.CHW,
            ],
        },
        {
            title: 'Consultancy',
            href: `/consultancy/${encryptId(consultancyId)}`,
            icon: StethoscopeIcon,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.MEL_OFFICER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.WARD_CLERK,
                ROLE_IDS.CHW,
            ],
        },
        {
            title: 'Patient Registry',
            href: '/patients/search',
            icon: Users,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.CHW,
            ],
        },
        {
            title: 'Community Outreach',
            href: '/community',
            icon: Users,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.CHW,
            ],
        },
        {
            title: 'Community Outreach',
            href: '/outreach',
            icon: Users,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.CHW,
                ROLE_IDS.NURSE,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.DHO,
            ],
        },
        {
            title: 'Appointments',
            href: '/appointments',
            icon: CalendarClock,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.FACILITY_MANAGER,
            ],
        },
        {
            title: 'Reports',
            href: '/',
            icon: BarChart2Icon,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.NURSE,
                ROLE_IDS.COUNSELLOR,
                ROLE_IDS.CHW,
            ],
        },
        // {
        //     title: 'Follow Up',
        //     href: '/follow-up',
        //     icon: BellRing,
        // },
        // {
        //     title: 'Psychosocial Care',
        //     href: '/mental-health',
        //     icon: HeartPulse,
        //     roles: [
        //         ROLE_IDS.ADMINISTRATOR,
        //         ROLE_IDS.COUNSELLOR,
        //         ROLE_IDS.CLINICIAN,
        //         ROLE_IDS.FACILITY_MANAGER,
        //     ],
        // },
        // {
        //     title: 'NCD Management',
        //     href: '/ncd',
        //     icon: Activity,
        // },
        // {
        //     title: 'Referrals',
        //     href: '/referrals',
        //     icon: ArrowRightLeft,
        //     roles: [
        //         ROLE_IDS.ADMINISTRATOR,
        //         ROLE_IDS.CHW,
        //         ROLE_IDS.CLINICIAN,
        //         ROLE_IDS.NURSE,
        //         ROLE_IDS.FACILITY_MANAGER,
        //     ],
        // },
        // {
        //     title: 'Admissions',
        //     href: '/admissions',
        //     icon: Bed,
        //     roles: [
        //         ROLE_IDS.ADMINISTRATOR,
        //         ROLE_IDS.WARD_CLERK,
        //         ROLE_IDS.CLINICIAN,
        //         ROLE_IDS.NURSE,
        //     ],
        // },
        // {
        //     title: 'Discharges',
        //     href: '/discharges',
        //     icon: FileHeart,
        //     roles: [
        //         ROLE_IDS.ADMINISTRATOR,
        //         ROLE_IDS.WARD_CLERK,
        //         ROLE_IDS.CLINICIAN,
        //         ROLE_IDS.NURSE,
        //     ],
        // },
        {
            title: 'Reports',
            href: '/',
            icon: ChartBarIcon,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.CLINICIAN,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.DHO,
                ROLE_IDS.MEL_OFFICER,
            ],
        },
        {
            title: 'Facilities',
            href: '/facilities',
            icon: Hospital,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
            ],
        },
        {
            title: 'Reports & MEL',
            href: '/reports',
            icon: ChartBarStacked,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.MEL_OFFICER,
                ROLE_IDS.FACILITY_MANAGER,
                ROLE_IDS.DHO,
            ],
        },
        {
            title: 'Users & Roles',
            href: '/users',
            icon: UserCog,
            roles: [ROLE_IDS.ADMINISTRATOR],
        },
        {
            title: 'Permissions',
            href: '/permissions',
            icon: ShieldCheck,
            roles: [ROLE_IDS.ADMINISTRATOR],
        },
        {
            title: 'System Settings',
            href: '/settings',
            icon: Settings,
            roles: [ROLE_IDS.ADMINISTRATOR],
        },
        {
            title: 'Facilities Management',
            href: '/facility-management',
            icon: Building2,
            roles: [
                ROLE_IDS.ADMINISTRATOR,
                ROLE_IDS.DHO,
            ],
        },
    ];
};

// Function to create patient navigation items with the patient UUID
const getPatientNavItems = (patientUuid: string): NavItem[] => [
    {
        title: 'Patient Overview',
        href: `/patients/registry/${patientUuid}`,
        icon: User,
        description: 'View patient summary',
    },
    {
        title: 'Referral Management',
        href: `/patients/${patientUuid}/referrals`,
        icon: ClipboardList,
        description: 'Referral Patient',
    },
    {
        title: 'Laboratory',
        href: `/patients/${patientUuid}/lab`,
        icon: MicroscopeIcon,
        description: 'Order laboratory tests',
    },
    {
        title: 'Medications',
        href: `/patients/${patientUuid}/medications`,
        icon: Pill,
        description: 'Prescribed medications',
    },
    {
        title: 'Appointments',
        href: `/patients/${patientUuid}/appointments`,
        icon: CalendarClock,
        description: 'Upcoming appointments',
    },
    {
        title: 'Risk Assessment',
        href: `/patients/${patientUuid}/risk-assessment`,
        icon: ShieldCheck,
        description: 'Risk evaluation',
    },
    {
        title: 'Risk Assessment',
        href: `/patients/${patientUuid}/risk-assessment`,
        icon: ShieldCheck,
        description: 'Risk evaluation',
    },
];

interface AppSidebarProps {
    patient?: {
        id: number | string;
        patient_uuid?: string;
        first_name: string;
        last_name: string;
        nrc?: string | null;
        phone?: string | null;
        email?: string | null;
        date_of_birth?: string | null;
        gender?: string | null;
        [key: string]: unknown;
    } | null;
    isPatientView?: boolean;
}

// Navigation item renderer with consistent styles
const NavItemRenderer = ({
                             item,
                             isActive,
                             onClick
                         }: {
    item: NavItem;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className={cn(
                    navButtonBaseStyles,
                    isActive && navButtonActiveStyles,
                    "group w-full justify-start",
                    "min-h-[44px]"
                )}
            >
                <Link
                    href={item.href}
                    className="relative flex items-center w-full"
                    onClick={onClick}
                >
                    {item.icon && (
                        <item.icon className={cn(
                            SIDEBAR_STYLES.iconSize,
                            "flex-shrink-0",
                            "transition-transform duration-200",
                            "group-hover:scale-110",
                            isActive ? "text-blue-700" : "text-slate-600"
                        )} />
                    )}
                    <div className="flex-1 min-w-0 text-left">
                        <span className={cn(
                            "block",
                            SIDEBAR_STYLES.textSize,
                            isActive ? "text-blue-700" : "text-slate-700"
                        )}>
                            {item.title}
                        </span>
                        {item.description && (
                            <span className="block text-xs text-slate-500 truncate">
                                {item.description}
                            </span>
                        )}
                    </div>
                    {isActive && (
                        <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0 ml-1" />
                    )}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export function AppSidebar({ patient, isPatientView }: AppSidebarProps) {
    // Get the current URL from window.location as fallback
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    // Try to get from Inertia page props, but use fallback
    let pageUrl = '';
    let authData: any = {};
    let userRoleId: number | undefined = undefined;
    let facilityId: number | null = null;

    try {
        const page = usePage<SharedData>();
        // @ts-ignore - url might not be in the type definition
        pageUrl = page.props?.url || page.url || currentPath;
        authData = page.props?.auth || {};
        userRoleId = authData?.user?.role_id;
        // Get facility_id from authenticated user
        facilityId = authData?.user?.facility_id ?? null;
    } catch (error) {
        console.error('Error loading auth data:', error);
        pageUrl = currentPath;
    }

    const url = pageUrl || currentPath;

    // Generate navigation items with the user's facility_id
    const navigationItems = getNavigationItems(facilityId);

    // Filter navigation items based on user's role_id
    const visibleItems = navigationItems.filter((item) => {
        if (!item.roles || item.roles.length === 0) return true;
        if (!userRoleId) return false;
        return item.roles.includes(userRoleId);
    });

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName && !lastName) return '?';
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    // Safe access to patient properties
    const firstName = patient?.first_name || '';
    const lastName = patient?.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const patientUuid = patient?.patient_uuid || patient?.id?.toString() || '';

    // Only show patient view if we have a patient and isPatientView is true
    const showPatientView = Boolean(isPatientView && patient && patientUuid);

    // Create patient navigation items with the UUID
    const patientNavItems = getPatientNavItems(patientUuid);

    // For main navigation, determine active state based on current URL
    const isMainNavActive = (href: string) => {
        if (!href || !url) return false;

        if (href === '/dashboard') {
            return url === '/dashboard' || url === '/';
        }

        if (href === '/') {
            return url === '/';
        }

        if (url === href) return true;
        if (url.startsWith(href + '/')) return true;

        return false;
    };

    // For patient navigation, use state to track active item
    const [activePatientHref, setActivePatientHref] = useState<string>('');

    // Set initial active patient nav item only when patient view is shown
    useEffect(() => {
        if (showPatientView && !activePatientHref) {
            setActivePatientHref('');
        }
    }, [showPatientView]);

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className={cn(
                "border-r border-slate-200",
                "bg-white",
                "shadow-sm",
                "transition-all duration-300"
            )}
        >
            <SidebarHeader className="border-b border-slate-200 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className={cn(
                                navButtonBaseStyles,
                                SIDEBAR_STYLES.spacing.paddingLarge,
                                "min-h-[56px]"
                            )}
                        >
                            <Link href="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="py-2">
                {showPatientView ? (
                    // Patient-scoped navigation
                    <SidebarGroup>
                        {/* Patient info header */}
                        {patient && (
                            <div className="px-3 py-2 mb-3 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-blue-200">
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                                            {getInitials(firstName, lastName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {fullName || 'Unknown Patient'}
                                        </p>
                                        {patient.nrc && (
                                            <p className="text-xs text-slate-500 truncate">
                                                NRC: {patient.nrc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5">
                                {patientNavItems.map((item) => {
                                    const isActive = activePatientHref === item.href;
                                    return (
                                        <NavItemRenderer
                                            key={item.title}
                                            item={item}
                                            isActive={isActive}
                                            onClick={() => setActivePatientHref(item.href)}
                                        />
                                    );
                                })}test_orders
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : (
                    // Main navigation
                    <SidebarGroup>

                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5">
                                {visibleItems.map((item) => {
                                    const isActive = isMainNavActive(item.href);
                                    return (
                                        <NavItemRenderer
                                            key={item.title}
                                            item={item}
                                            isActive={isActive}
                                            onClick={() => {}}
                                        />
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            {!showPatientView && (
                <SidebarFooter className="border-t border-slate-200 pt-3 mt-2">
                    <div className="px-2">
                        <NavUser />
                    </div>
                </SidebarFooter>
            )}
        </Sidebar>
    );
}

export default AppSidebar;

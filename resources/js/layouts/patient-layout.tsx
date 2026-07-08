// layouts/patient-layout.tsx
import { PropsWithChildren, useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import { PatientSidebar } from '@/components/patient-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

interface Patient {
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
    [key: string]: unknown;
}

interface PatientLayoutProps extends PropsWithChildren {
    patient?: Patient | null;
    breadcrumbs?: Array<{ title: string; href: string }>;
    className?: string;
}

export default function PatientLayout({
                                          children,
                                          patient: propPatient,
                                          breadcrumbs = [],
                                          className = ''
                                      }: PatientLayoutProps) {
    const { props } = usePage();

    // Get patient from props or use propPatient
    const patient = propPatient || props.patient || props.initialPatient || null;

    // Build patient name for breadcrumbs
    const patientName = useMemo(() => {
        if (!patient) return 'Patient Details';
        return `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || 'Patient Details';
    }, [patient]);

    // Default breadcrumbs if none provided
    const defaultBreadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Patient Registry', href: '/patients' },
        { title: patientName, href: '#' },
    ];

    const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

    // If no patient data, show loading state or fallback
    if (!patient) {
        return (
            <SidebarProvider>
                <div className="flex flex-1 items-center justify-center p-8 min-h-screen">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Loading patient data...</p>
                    </div>
                </div>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider>
            <PatientSidebar patient={patient} />
            <SidebarInset className={cn(
                "flex flex-1 flex-col min-h-screen",
                className
            )}>
                {/* Breadcrumbs */}
                <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                    <div className="py-3 px-4 md:px-6">
                        <Breadcrumbs items={finalBreadcrumbs} />
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t mt-auto bg-muted/30">
                    <div className="container py-4 px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
                            <span>
                                © {new Date().getFullYear()} Healthcare System. All rights reserved.
                            </span>
                            <div className="flex items-center gap-4">
                                <span>v1.0.0</span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                    System Online
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Toast Notifications */}
                <Toaster position="top-right" richColors closeButton />
            </SidebarInset>
        </SidebarProvider>
    );
}

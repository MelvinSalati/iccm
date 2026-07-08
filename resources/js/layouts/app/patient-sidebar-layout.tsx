// patient-sidebar-layout.tsx
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { PatientSidebar } from '@/components/patient-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

interface PatientSidebarLayoutProps extends AppLayoutProps {
    patient: {
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
    };
    activeTab?: string;
}

export default function PatientSidebarLayout({
                                                 children,
                                                 breadcrumbs = [],
                                                 patient,
                                                 activeTab = 'overview'
                                             }: PatientSidebarLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <PatientSidebar patient={patient} activeTab={activeTab} />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                {/*<AppSidebarHeader breadcrumbs={breadcrumbs} />*/}
                {children}
            </AppContent>
        </AppShell>
    );
}

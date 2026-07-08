import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import  AppSidebar  from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    patient,
    notifications,
    isPatientView
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar  patient={patient} isPatientView={isPatientView}/>
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs}  notifications={{notifications}}/>
                {children}
            </AppContent>
        </AppShell>
    );
}

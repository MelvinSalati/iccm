import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import React from 'react';

export default function AppLayout({

                                      breadcrumbs = [],
                                      children,
                                      notifications,
                                      isPatientView,
                                      patient
                                  }: {
    breadcrumbs?: BreadcrumbItem[],
    children: React.ReactNode,
    isPatientView?: boolean,
    patient?: unknown
}) {

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} patient={patient} isPatientView={isPatientView} notifications={notifications}>
            {children}
        </AppLayoutTemplate>
    );
}

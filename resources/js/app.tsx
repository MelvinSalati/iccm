import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import UserRegistrationLayout from '@/layouts/UserRegistrationLayout'; // ← ADD THIS
import SettingsLayout from '@/layouts/settings/layout';
import PatientLayout from '@/layouts/patient-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name === 'auth/register':  // ← USE THE NEW LAYOUT
                return UserRegistrationLayout;
            case name === 'patients/create':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'dashboard':  // ← USE THE NEW LAYOUT
                return AppLayout;
            case name === 'patients/medications':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/labs':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/riskassessment':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/referral':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/laboratory':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/appointments':  // ← USE THE NEW LAYOUT
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            // case name.startsWith('patients/'):
            //     return AppLayout;
            case name === 'patients/interaction-details':  // ← USE THE NEW LAYOUT
                return null;
            case name === 'patients/patient-details':  // ← USE THE NEW LAYOUT
                return null;
                case name === 'patients/search':  // ← USE THE NEW LAYOUT
                return AppLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();

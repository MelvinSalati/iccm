import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import UserRegistrationLayout from '@/layouts/UserRegistrationLayout';
import SettingsLayout from '@/layouts/settings/layout';
import PatientLayout from '@/layouts/patient-layout';

// Check if we're in demo/staging mode
const isDemo = import.meta.env.VITE_DEMO_MODE === 'true' ||
    import.meta.env.APP_ENV === 'staging';

// Global error handler with user-friendly messages
window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason;
    const message = error?.message || error?.toString() || '';

    // Check if it's a network error
    if (message.includes('Network error') ||
        message.includes('ERR_INTERNET_DISCONNECTED') ||
        message.includes('No Listener') ||
        message.includes('Mapify') ||
        message.includes('FetchError')) {

        event.preventDefault();

        // Only show friendly message in demo mode
        if (isDemo) {
            // Option 1: Show a toast notification (if you have toast setup)
            // toast.error('Network issue detected. Please check your connection.');

            // Option 2: Show a subtle console message (not visible to most users)
            console.log('ℹ️ Network issue detected (demo mode)');

            // Option 3: Update a global state that shows a friendly message
            // window.dispatchEvent(new CustomEvent('network-error', {
            //     detail: { message: 'Connection issue. Please refresh.' }
            // }));
        }
        return false;
    }
});

// Suppress console errors in demo mode
if (isDemo) {
    const originalError = console.error;
    const originalWarn = console.warn;

    const suppressed = ['Network error', 'ERR_INTERNET_DISCONNECTED', 'No Listener', 'Mapify', 'Element not found'];

    console.error = function(...args) {
        if (suppressed.some(p => args.join(' ').includes(p))) {
            // Silently suppress in demo mode
            return;
        }
        originalError.apply(console, args);
    };

    console.warn = function(...args) {
        if (suppressed.some(p => args.join(' ').includes(p))) {
            return;
        }
        originalWarn.apply(console, args);
    };
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name === 'auth/register':
                return UserRegistrationLayout;
            case name === 'patients/create':
                return null;
            case name === 'dashboard':
                return AppLayout;
            case name === 'patients/medications':
                return null;
            case name === 'patients/labs':
                return null;
            case name === 'patients/riskassessment':
                return null;
            case name === 'patients/referral':
                return null;
            case name === 'patients/laboratory':
                return null;
            case name === 'patients/appointments':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name === 'patients/interaction-details':
                return null;
            case name === 'patients/patient-details':
                return null;
            case name === 'patients/search':
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

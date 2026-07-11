import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

export default function Admission() {
    return (
        <>
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900">
                        Admission Module
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        This module is currently under development.
                        We're working hard to bring you a comprehensive admission management system.
                    </p>

                    {/* Status Badge */}
                    <div className="flex justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                            Coming Soon
                        </span>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Patient Registration</h3>
                            <p className="text-xs text-gray-500 mt-1">Register new patients quickly</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Bed Management</h3>
                            <p className="text-xs text-gray-500 mt-1">Track bed availability in real-time</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Discharge Planning</h3>
                            <p className="text-xs text-gray-500 mt-1">Streamline discharge process</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto mt-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Development Progress</span>
                            <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>

                    {/* Estimated Launch */}
                    <p className="text-xs text-gray-400 mt-4">
                        🚀 Estimated Launch: Q3 2026
                    </p>
                </div>
            </div>
        </>
    );
}

// Optional: Add layout configuration
Admission.layout = (page: React.ReactNode) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Dashboard',
                href: dashboard()
            },
            {
                title: 'Admission',
                href: '/admission'
            }
        ]}
    >
        {page}
    </AppLayout>
);

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    Home,
    Calendar,
    Users,
    FileText,
    Clock,
    ArrowUpRight,
    CheckCircle,
    UserCheck,
    Bed
} from 'lucide-react';

export default function Discharges() {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard() },
                { title: 'Discharges', href: '/discharges' }
            ]}
        >
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="text-center space-y-8 max-w-3xl mx-auto">
                    {/* Main Icon */}
                    <div className="flex justify-center">
                        <div className="w-28 h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                            <Home className="w-14 h-14 text-green-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Patient Discharges
                        </h1>
                        <p className="text-lg text-gray-600">
                            Streamlined patient discharge management and follow-up system
                        </p>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="flex justify-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                            <span className="w-2.5 h-2.5 bg-white rounded-full mr-2 animate-pulse"></span>
                            Coming Soon
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We're developing a comprehensive discharge management system to ensure
                        smooth patient transitions from hospital to home with proper follow-up care.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <FileText className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Discharge Planning</h3>
                            <p className="text-xs text-gray-500 mt-1">Comprehensive discharge summaries</p>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Follow-up Scheduling</h3>
                            <p className="text-xs text-gray-500 mt-1">Automated appointment reminders</p>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Care Coordination</h3>
                            <p className="text-xs text-gray-500 mt-1">Multi-disciplinary team collaboration</p>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="max-w-md mx-auto mt-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Development Progress</span>
                            <span>70%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all duration-1000"
                                style={{ width: '70%' }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Expected Launch: Q3 2026
                        </p>
                    </div>

                    {/* Key Features Preview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>Auto-discharge</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <UserCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>Patient education</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Bed className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>Bed availability</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>Real-time tracking</span>
                        </div>
                    </div>

                    {/* Learn More Link */}
                    <div className="pt-4">
                        <button className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1 group">
                            Learn More About Discharge Management
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

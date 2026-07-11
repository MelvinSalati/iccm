import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Heart, Brain, Activity, Clock, ArrowUpRight, ClipboardCheck } from 'lucide-react';

export default function MentalHealthAssessments() {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard() },
                { title: 'Mental Health Assessments', href: '/mental-health-assessments' }
            ]}
        >
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="text-center space-y-8 max-w-3xl mx-auto">
                    {/* Main Icon */}
                    <div className="flex justify-center">
                        <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
                            <Brain className="w-14 h-14 text-blue-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Mental Health Assessments
                        </h1>
                        <p className="text-lg text-gray-600">
                            Comprehensive mental health evaluation and tracking system
                        </p>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="flex justify-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                            <span className="w-2.5 h-2.5 bg-white rounded-full mr-2 animate-pulse"></span>
                            Coming Soon
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We're developing a comprehensive mental health assessment module to help
                        healthcare providers evaluate, track, and improve patient mental health outcomes.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <ClipboardCheck className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Standardized Assessments</h3>
                            <p className="text-xs text-gray-500 mt-1">PHQ-9, GAD-7, and more</p>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <Activity className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Progress Tracking</h3>
                            <p className="text-xs text-gray-500 mt-1">Monitor patient improvement</p>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center mb-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Clock className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Automated Reminders</h3>
                            <p className="text-xs text-gray-500 mt-1">Follow-up scheduling</p>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="max-w-md mx-auto mt-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Development Progress</span>
                            <span>85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-1000"
                                style={{ width: '85%' }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Expected Launch: Q2 2026
                        </p>
                    </div>

                    {/* Learn More Link */}
                    <div className="pt-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group">
                            Learn More About This Module
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

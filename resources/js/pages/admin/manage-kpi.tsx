import AppLayout from '@/layouts/app-layout';
import IndicatorsTable from './components/IndicatorsTable';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function KeyPerformanceIndicators({ indicators, facilityId, facilityName }) {
    const [selectedFacility, setSelectedFacility] = useState(facilityId);
    const [period, setPeriod] = useState('monthly');

    return (
        <AppLayout>
            <Head title="Key Performance Indicators" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Key Performance Indicators (KPIs)
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {facilityName ? `Facility: ${facilityName}` : 'All Facilities'} - Monitoring performance against targets
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Facility
                                </label>
                                <select
                                    value={selectedFacility}
                                    onChange={(e) => setSelectedFacility(e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value={facilityId}>{facilityName}</option>
                                    <option value="all">All Facilities</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Period
                                </label>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annual">Annual</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* KPI Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                            <p className="text-sm text-gray-600 dark:text-gray-400">On Track</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {indicators?.filter(i => i.performance?.status === 'on_track').length || 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                            <p className="text-sm text-gray-600 dark:text-gray-400">At Risk</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {indicators?.filter(i => i.performance?.status === 'at_risk').length || 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Behind Target</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {indicators?.filter(i => i.performance?.status === 'behind' || i.performance?.status === 'critical').length || 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total KPIs</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {indicators?.length || 0}
                            </p>
                        </div>
                    </div>

                    {/* Indicators Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <IndicatorsTable
                            indicators={indicators}
                            period={period}
                            facilityId={selectedFacility}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

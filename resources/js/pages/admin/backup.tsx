import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Http from '@/utils/Http';
import Notiflix from 'notiflix';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    DoughnutChart,
    HorizontalBarChart,
    VerticalBarChart
} from './components/charts';
import { AppointmentsModal } from './components/modals/AppointmentsModal';
import { ScreeningModal } from './components/modals/ScreeningModal';

// Clickable Stat Card Component
const ClickableStatCard = ({
                               title,
                               subtitle,
                               value,
                               icon,
                               bgColor,
                               onClick,
                               loading
                           }: {
    title: string;
    subtitle: string;
    value: number | string;
    icon?: string;
    bgColor: string;
    onClick: () => void;
    loading?: boolean;
}) => {
    return (
        <div
            className={`${bgColor} rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105`}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center text-2xl">
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                        <span className="text-xl font-bold text-gray-800">
                            {loading ? '...' : value}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

// Facility Table Component
const FacilityTable = ({ facilities, loading }: { facilities: any[]; loading?: boolean }) => {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Facility Performance</CardTitle>
                    <p className="text-sm text-gray-500">Loading facility data...</p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!facilities || facilities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Facility Performance</CardTitle>
                    <p className="text-sm text-gray-500">No facility data available</p>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500">
                        No facilities found
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Facility Performance</CardTitle>
                <p className="text-sm text-gray-500">Appointments and screening data by facility</p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Facility
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Appointments
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                HPV
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                VIA
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                HIV
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Positives
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {facilities.map((facility, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {facility.name}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {facility.appointments || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-600">
                                    {facility.hpv || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                                    {facility.via || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-600">
                                    {facility.hiv || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                                    {facility.positive || 0}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

// Main Dashboard Component
export default function AdminDashboard() {
    const { props } = usePage();
    const { facilityId } = props?.auth?.user || {};

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        summary: {
            total_events: 0,
            appointments: 0,
            screenings: 0,
            positive_results: 0,
        },
        screenings: {
            hpv: { total: 0, positive: 0, negative: 0 },
            via: { total: 0, positive: 0, negative: 0 },
            hiv: { total: 0, positive: 0, negative: 0 },
            breast_cancer: { total: 0, positive: 0, negative: 0 },
        },
        monthly_trends: [],
        facility_performance: [],
        indicators: [],
        kpis: [],
    });

    // Modal states
    const [appointmentsModalOpen, setAppointmentsModalOpen] = useState(false);
    const [screeningModalOpen, setScreeningModalOpen] = useState(false);
    const [screeningType, setScreeningType] = useState<'hpv' | 'via' | 'hiv'>('hpv');
    const [screeningTitle, setScreeningTitle] = useState('');

    useEffect(() => {
        if (facilityId) {
            fetchDashboardData();
        }
    }, [facilityId]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch dashboard statistics from event_data
            const statsResponse = await Http.get(`/v1/admin/dashboard/summary?facility_id=${facilityId}`);

            // Fetch screening statistics
            const screeningResponse = await Http.get(`/v1/admin/dashboard/screenings?facility_id=${facilityId}`);

            // Fetch monthly trends
            const trendsResponse = await Http.get(`/v1/admin/dashboard/trends?facility_id=${facilityId}`);

            // Fetch indicator performance
            const indicatorsResponse = await Http.get(`/v1/admin/indicators/dashboard?facility_id=${facilityId}`);

            // Fetch KPI data
            const kpiResponse = await Http.get(`/v1/admin/indicators?facility_id=${facilityId}&is_kpi=1`);

            // Process the data
            const summary = statsResponse.data || {};
            const screenings = screeningResponse.data || {};
            const trends = trendsResponse.data || [];
            const indicators = indicatorsResponse.data || [];
            const kpis = kpiResponse.data || [];

            // Process facility performance from event_data
            const facilityPerformance = await fetchFacilityPerformance();

            setDashboardData({
                summary: {
                    total_events: summary.total_events || 0,
                    appointments: summary.appointments || 0,
                    screenings: summary.screenings || 0,
                    positive_results: summary.positive_results || 0,
                },
                screenings: {
                    hpv: screenings.hpv || { total: 0, positive: 0, negative: 0 },
                    via: screenings.via || { total: 0, positive: 0, negative: 0 },
                    hiv: screenings.hiv || { total: 0, positive: 0, negative: 0 },
                    breast_cancer: screenings.breast_cancer || { total: 0, positive: 0, negative: 0 },
                },
                monthly_trends: trends,
                facility_performance: facilityPerformance,
                indicators: indicators,
                kpis: kpis,
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            Notiflix.Notify.failure('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const fetchFacilityPerformance = async () => {
        try {
            const response = await Http.get(`/v1/admin/dashboard/geographic?facility_id=${facilityId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching facility performance:', error);
            return [];
        }
    };

    // Prepare data for charts
    const viaData = {
        positive: dashboardData.screenings.via.positive,
        negative: dashboardData.screenings.via.negative,
    };

    const hivData = {
        positive: dashboardData.screenings.hiv.positive,
        negative: dashboardData.screenings.hiv.negative,
    };

    const hpvData = {
        positive: dashboardData.screenings.hpv.positive,
        negative: dashboardData.screenings.hpv.negative,
    };

    // Monthly trends chart data
    const monthlyChartData = dashboardData.monthly_trends.map((item: any) => ({
        name: item.month || item.label || '',
        'HPV Screening': item.hpv || 0,
        'VIA Screening': item.via || 0,
        'HIV Screening': item.hiv || 0,
        'Breast Cancer': item.breast_cancer || 0,
    }));

    // Unique background colors for cards
    const cardColors = {
        appointments: 'bg-blue-50 hover:bg-blue-100',
        hpv: 'bg-purple-50 hover:bg-purple-100',
        via: 'bg-green-50 hover:bg-green-100',
        hiv: 'bg-amber-50 hover:bg-amber-100',
        breast: 'bg-pink-50 hover:bg-pink-100',
        positive: 'bg-red-50 hover:bg-red-100',
    };

    const handleScreeningClick = (type: 'hpv' | 'via' | 'hiv', title: string) => {
        setScreeningType(type);
        setScreeningTitle(title);
        setScreeningModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Admin', href: '/' },
            { title: 'Dashboard', href: '/' }
        ]}>
            <div className="p-4 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ClickableStatCard
                        title="Appointments"
                        subtitle="Total scheduled appointments"
                        value={dashboardData.summary.appointments}
                        icon="📅"
                        bgColor={cardColors.appointments}
                        onClick={() => setAppointmentsModalOpen(true)}
                        loading={loading}
                    />
                    <ClickableStatCard
                        title="HPV Screening"
                        subtitle="Total HPV screenings"
                        value={dashboardData.screenings.hpv.total}
                        icon="🔬"
                        bgColor={cardColors.hpv}
                        onClick={() => handleScreeningClick('hpv', 'HPV Screening Results')}
                        loading={loading}
                    />
                    <ClickableStatCard
                        title="VIA Screening"
                        subtitle="Total VIA screenings"
                        value={dashboardData.screenings.via.total}
                        icon="🩺"
                        bgColor={cardColors.via}
                        onClick={() => handleScreeningClick('via', 'VIA Screening Results')}
                        loading={loading}
                    />
                    <ClickableStatCard
                        title="Positive Results"
                        subtitle="Total positive screenings"
                        value={dashboardData.summary.positive_results}
                        icon="⚠️"
                        bgColor={cardColors.positive}
                        onClick={() => setScreeningModalOpen(true)}
                        loading={loading}
                    />
                </div>

                {/* Charts Section - Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DoughnutChart
                        data={viaData}
                        title="VIA Screening Results"
                        description="Positive vs Negative cases"
                        colors={{ positive: '#ef4444', negative: '#22c55e' }}
                        loading={loading}
                    />
                    <DoughnutChart
                        data={hivData}
                        title="HIV Screening Results"
                        description="Positive vs Negative cases"
                        colors={{ positive: '#f59e0b', negative: '#3b82f6' }}
                        loading={loading}
                    />
                    <HorizontalBarChart
                        data={hpvData}
                        title="HPV Screening Results"
                        description="Positive vs Negative cases"
                        colors={{ positive: '#8b5cf6', negative: '#94a3b8' }}
                        loading={loading}
                    />
                </div>

                {/* Charts Section - Row 2 */}
                <div className="grid grid-cols-1 gap-6">
                    <VerticalBarChart
                        data={monthlyChartData}
                        title="Monthly Screening Trends"
                        description="Screening trends over the last 6 months"
                        bars={[
                            { dataKey: 'HPV Screening', fill: '#8b5cf6' },
                            { dataKey: 'VIA Screening', fill: '#22c55e' },
                            { dataKey: 'HIV Screening', fill: '#f59e0b' },
                            { dataKey: 'Breast Cancer', fill: '#ec4899' },
                        ]}
                        loading={loading}
                    />
                </div>

                {/* KPI Cards */}
                {dashboardData.kpis.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dashboardData.kpis.slice(0, 4).map((kpi: any) => (
                            <Card key={kpi.id} className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        {kpi.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">
                                                {kpi.performance?.actual_value || 0}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Target: {kpi.target_value || 0}
                                            </p>
                                        </div>
                                        <div className={`text-sm font-medium ${
                                            (kpi.performance?.percentage_achieved || 0) >= 80
                                                ? 'text-green-600'
                                                : (kpi.performance?.percentage_achieved || 0) >= 60
                                                    ? 'text-amber-600'
                                                    : 'text-red-600'
                                        }`}>
                                            {kpi.performance?.percentage_achieved?.toFixed(1) || 0}%
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                (kpi.performance?.percentage_achieved || 0) >= 80
                                                    ? 'bg-green-500'
                                                    : (kpi.performance?.percentage_achieved || 0) >= 60
                                                        ? 'bg-amber-500'
                                                        : 'bg-red-500'
                                            }`}
                                            style={{
                                                width: `${Math.min(kpi.performance?.percentage_achieved || 0, 100)}%`
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Facility Table */}
                <div className="mt-6">
                    <FacilityTable
                        facilities={dashboardData.facility_performance}
                        loading={loading}
                    />
                </div>

                {/* Modals */}
                <AppointmentsModal
                    isOpen={appointmentsModalOpen}
                    onClose={() => setAppointmentsModalOpen(false)}
                    facilityId={facilityId}
                />

                <ScreeningModal
                    isOpen={screeningModalOpen}
                    onClose={() => setScreeningModalOpen(false)}
                    type={screeningType}
                    title={screeningTitle}
                    facilityId={facilityId}
                />
            </div>
        </AppLayout>
    );
}

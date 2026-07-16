import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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

// Types for the shared data
interface DashboardData {
    kpis: KPI[];
    weeklyTrends: WeeklyTrend[];
    monthlyTrends: MonthlyTrend[];
    screeningTrends: ScreeningTrend;
    hivDisaggregation: DisaggregationItem[];
    genderDistribution: DisaggregationItem[];
    riskFactors: DisaggregationItem[];
    ageGroups: AgeGroup[];
    geographicDistribution: GeographicData;
    facilityStats: FacilityStats;
    appointments: AppointmentStats;
    laboratory: LaboratoryStats;
    registrations: RegistrationStats;
    aggregates: Aggregates;
    metadata: Metadata;
}

interface KPI {
    id: string;
    title: string;
    value: number;
    icon: string;
    trend: number;
    trendDirection: 'up' | 'down';
    color: string;
    sparklineData: number[];
    comparison: string;
    formattedValue: string;
    subtitle: string;
}

interface WeeklyTrend {
    date: string;
    day: string;
    registrations: number;
    screenings: number;
    appointments: number;
    lab_orders: number;
    hpv_positive: number;
    via_positive: number;
}

interface MonthlyTrend {
    month: string;
    monthKey: string;
    registrations: number;
    screenings: number;
    appointments: number;
    lab_orders: number;
    positive_screenings: number;
}

interface ScreeningTrend {
    hpv: {
        total: number;
        positive: number;
        negative: number;
        positiveRate: number;
    };
    via: {
        total: number;
        positive: number;
        negative: number;
        positiveRate: number;
    };
}

interface DisaggregationItem {
    name: string;
    value: number;
    color: string;
}

interface AgeGroup {
    name: string;
    value: number;
    color: string;
}

interface GeographicData {
    by_province: Array<{
        province: string;
        total: number;
        screenings: number;
        registrations: number;
    }>;
    by_district: Array<{
        district: string;
        total: number;
        screenings: number;
    }>;
}

interface FacilityStats {
    total_facilities: number;
    total_districts: number;
    performance: Array<{
        facility_id: number;
        total_events: number;
        registrations: number;
        screenings: number;
        appointments: number;
        lab_orders: number;
    }>;
}

interface AppointmentStats {
    total: number;
    scheduled: number;
    completed: number;
    missed: number;
    cancelled: number;
    completionRate: number;
}

interface LaboratoryStats {
    total: number;
    pending: number;
    completed: number;
    withTests: number;
}

interface RegistrationStats {
    total: number;
    unique: number;
}

interface Aggregates {
    total_registrations: number;
    unique_patients: number;
    total_screenings: number;
    hpv_positive: number;
    hpv_negative: number;
    hpv_total: number;
    via_positive: number;
    via_negative: number;
    via_total: number;
    hiv_positive: number;
    hiv_negative: number;
    hiv_unknown: number;
    smoking: number;
    alcohol: number;
    family_history: number;
    disability: number;
    male: number;
    female: number;
}

interface Metadata {
    lastSync: string;
    dataSource: string;
    reportingPeriod: string;
    activeFacilities: number;
    activeDistricts: number;
    totalRecords: number;
    facilityId: number | null;
}

// Clickable Stat Card Component
const ClickableStatCard = ({
                               title,
                               subtitle,
                               value,
                               icon,
                               bgColor,
                               onClick,
                               loading,
                               trend,
                               trendDirection
                           }: {
    title: string;
    subtitle: string;
    value: number | string;
    icon?: string;
    bgColor: string;
    onClick: () => void;
    loading?: boolean;
    trend?: number;
    trendDirection?: 'up' | 'down';
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
                        <div className="flex items-center gap-2">
                            {trend !== undefined && (
                                <span className={`text-xs font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {trendDirection === 'up' ? '↑' : '↓'} {Math.abs(trend)}%
                                </span>
                            )}
                            <span className="text-xl font-bold text-gray-800">
                                {loading ? '...' : value}
                            </span>
                        </div>
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
                <p className="text-sm text-gray-500">Events by facility</p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Facility ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Events
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Registrations
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Screenings
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Appointments
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lab Orders
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {facilities.map((facility, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {facility.facility_id || 'N/A'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {facility.total_events || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                                    {facility.registrations || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-600">
                                    {facility.screenings || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-600">
                                    {facility.appointments || 0}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-emerald-600">
                                    {facility.lab_orders || 0}
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

    // Get shared data from middleware
    const sharedData = props?.sharedData?.dashboard as DashboardData || null;
    const dashboardData = sharedData || {
        kpis: [],
        weeklyTrends: [],
        monthlyTrends: [],
        screeningTrends: { hpv: { total: 0, positive: 0, negative: 0, positiveRate: 0 }, via: { total: 0, positive: 0, negative: 0, positiveRate: 0 } },
        hivDisaggregation: [],
        genderDistribution: [],
        riskFactors: [],
        ageGroups: [],
        geographicDistribution: { by_province: [], by_district: [] },
        facilityStats: { total_facilities: 0, total_districts: 0, performance: [] },
        appointments: { total: 0, scheduled: 0, completed: 0, missed: 0, cancelled: 0, completionRate: 0 },
        laboratory: { total: 0, pending: 0, completed: 0, withTests: 0 },
        registrations: { total: 0, unique: 0 },
        aggregates: {
            total_registrations: 0,
            unique_patients: 0,
            total_screenings: 0,
            hpv_positive: 0,
            hpv_negative: 0,
            hpv_total: 0,
            via_positive: 0,
            via_negative: 0,
            via_total: 0,
            hiv_positive: 0,
            hiv_negative: 0,
            hiv_unknown: 0,
            smoking: 0,
            alcohol: 0,
            family_history: 0,
            disability: 0,
            male: 0,
            female: 0,
        },
        metadata: {
            lastSync: '',
            dataSource: 'Event Data System',
            reportingPeriod: 'Last 7 Days',
            activeFacilities: 0,
            activeDistricts: 0,
            totalRecords: 0,
            facilityId: null,
        }
    };

    const [loading] = useState(false);

    // Modal states
    const [appointmentsModalOpen, setAppointmentsModalOpen] = useState(false);
    const [screeningModalOpen, setScreeningModalOpen] = useState(false);
    const [screeningType, setScreeningType] = useState<'hpv' | 'via' | 'hiv'>('hpv');
    const [screeningTitle, setScreeningTitle] = useState('');

    // Prepare chart data from shared props
    const viaData = {
        positive: dashboardData.aggregates.via_positive,
        negative: dashboardData.aggregates.via_negative,
    };

    const hpvData = {
        positive: dashboardData.aggregates.hpv_positive,
        negative: dashboardData.aggregates.hpv_negative,
    };

    // HIV data from disaggregation
    const hivData = {
        positive: dashboardData.aggregates.hiv_positive,
        negative: dashboardData.aggregates.hiv_negative,
    };

    // Prepare weekly trends for chart
    const weeklyChartData = dashboardData.weeklyTrends.map((item: WeeklyTrend) => ({
        name: item.day || item.date,
        'Registrations': item.registrations || 0,
        'Screenings': item.screenings || 0,
        'Appointments': item.appointments || 0,
        'Lab Orders': item.lab_orders || 0,
        'HPV Positive': item.hpv_positive || 0,
        'VIA Positive': item.via_positive || 0,
    }));

    // Prepare monthly trends for chart
    const monthlyChartData = dashboardData.monthlyTrends.map((item: MonthlyTrend) => ({
        name: item.month || item.monthKey,
        'Registrations': item.registrations || 0,
        'Screenings': item.screenings || 0,
        'Appointments': item.appointments || 0,
        'Lab Orders': item.lab_orders || 0,
        'Positive Screenings': item.positive_screenings || 0,
    }));

    // Prepare risk factors for chart
    const riskFactorsData = dashboardData.riskFactors.map((item: DisaggregationItem) => ({
        name: item.name,
        value: item.value,
        color: item.color,
    }));

    const handleScreeningClick = (type: 'hpv' | 'via' | 'hiv', title: string) => {
        setScreeningType(type);
        setScreeningTitle(title);
        setScreeningModalOpen(true);
    };

    // Get KPI values
    const kpis = dashboardData.kpis || [];

    return (
        <AppLayout breadcrumbs={[
            { title: 'Admin', href: '/' },
            { title: 'Dashboard', href: '/' }
        ]}>
            <div className="p-4 space-y-6">
                {/* Metadata Banner */}
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-2">
                    <span>
                        📊 <strong>Data Source:</strong> {dashboardData.metadata.dataSource || 'Event Data System'}
                    </span>
                    <span>
                        📅 <strong>Period:</strong> {dashboardData.metadata.reportingPeriod || 'Last 7 Days'}
                    </span>
                    <span>
                        🏥 <strong>Facilities:</strong> {dashboardData.metadata.activeFacilities || 0}
                    </span>
                    <span>
                        📍 <strong>Districts:</strong> {dashboardData.metadata.activeDistricts || 0}
                    </span>
                    <span>
                        📝 <strong>Total Records:</strong> {dashboardData.metadata.totalRecords || 0}
                    </span>
                    <span className="text-xs text-gray-400">
                        Synced: {dashboardData.metadata.lastSync ? new Date(dashboardData.metadata.lastSync).toLocaleString() : 'N/A'}
                    </span>
                </div>

                {/* Stats Cards - Using KPI data from shared props */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.slice(0, 4).map((kpi: KPI) => (
                        <ClickableStatCard
                            key={kpi.id}
                            title={kpi.title}
                            subtitle={kpi.subtitle || kpi.comparison || 'Total count'}
                            value={kpi.formattedValue || kpi.value}
                            icon={getIconForKPI(kpi.icon)}
                            bgColor={getColorForKPI(kpi.id)}
                            onClick={() => {
                                if (kpi.id === '1') setScreeningModalOpen(true);
                                else if (kpi.id === '2') setScreeningModalOpen(true);
                                else if (kpi.id === '3') handleScreeningClick('hpv', 'HPV Screening Results');
                                else if (kpi.id === '4') handleScreeningClick('via', 'VIA Screening Results');
                                else if (kpi.id === '5') setAppointmentsModalOpen(true);
                                else if (kpi.id === '6') setScreeningModalOpen(true);
                                else if (kpi.id === '7') setScreeningModalOpen(true);
                            }}
                            loading={loading}
                            trend={kpi.trend}
                            trendDirection={kpi.trendDirection}
                        />
                    ))}
                </div>

                {/* Additional Stats Cards - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.slice(4, 7).map((kpi: KPI) => (
                        <ClickableStatCard
                            key={kpi.id}
                            title={kpi.title}
                            subtitle={kpi.subtitle || kpi.comparison || 'Total count'}
                            value={kpi.formattedValue || kpi.value}
                            icon={getIconForKPI(kpi.icon)}
                            bgColor={getColorForKPI(kpi.id)}
                            onClick={() => {
                                if (kpi.id === '5') setAppointmentsModalOpen(true);
                                else if (kpi.id === '6') setScreeningModalOpen(true);
                                else if (kpi.id === '7') setScreeningModalOpen(true);
                            }}
                            loading={loading}
                            trend={kpi.trend}
                            trendDirection={kpi.trendDirection}
                        />
                    ))}
                </div>

                {/* Charts Section - Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* VIA Doughnut Chart */}
                    <DoughnutChart
                        data={viaData}
                        title="VIA Screening Results"
                        description={`${dashboardData.screeningTrends.via?.positiveRate || 0}% positivity rate`}
                        colors={{ positive: '#ef4444', negative: '#22c55e' }}
                        loading={loading}
                    />

                    {/* HIV Doughnut Chart */}
                    <DoughnutChart
                        data={hivData}
                        title="HIV Status Distribution"
                        description="From registrations"
                        colors={{ positive: '#ef4444', negative: '#22c55e' }}
                        loading={loading}
                    />

                    {/* HPV Horizontal Bar Chart */}
                    <HorizontalBarChart
                        data={hpvData}
                        title="HPV Screening Results"
                        description={`${dashboardData.screeningTrends.hpv?.positiveRate || 0}% positivity rate`}
                        colors={{ positive: '#8b5cf6', negative: '#94a3b8' }}
                        loading={loading}
                    />
                </div>

                {/* Charts Section - Row 2 - Weekly Trends */}
                <div className="grid grid-cols-1 gap-6">
                    <VerticalBarChart
                        data={weeklyChartData}
                        title="Weekly Activity Trends"
                        description="Daily events over the last 7 days"
                        bars={[
                            { dataKey: 'Registrations', fill: '#2563EB' },
                            { dataKey: 'Screenings', fill: '#8b5cf6' },
                            { dataKey: 'Appointments', fill: '#f59e0b' },
                            { dataKey: 'Lab Orders', fill: '#10B981' },
                            { dataKey: 'HPV Positive', fill: '#ef4444' },
                            { dataKey: 'VIA Positive', fill: '#f59e0b' },
                        ]}
                        loading={loading}
                    />
                </div>

                {/* Charts Section - Row 3 - Monthly Trends */}
                <div className="grid grid-cols-1 gap-6">
                    <VerticalBarChart
                        data={monthlyChartData}
                        title="Monthly Activity Trends"
                        description="Monthly events over the last 12 months"
                        bars={[
                            { dataKey: 'Registrations', fill: '#2563EB' },
                            { dataKey: 'Screenings', fill: '#8b5cf6' },
                            { dataKey: 'Appointments', fill: '#f59e0b' },
                            { dataKey: 'Lab Orders', fill: '#10B981' },
                            { dataKey: 'Positive Screenings', fill: '#ef4444' },
                        ]}
                        loading={loading}
                    />
                </div>

                {/* Demographics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age Groups */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Age Group Distribution</CardTitle>
                            <p className="text-sm text-gray-500">Patients by age group</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dashboardData.ageGroups.map((group: AgeGroup) => (
                                    <div key={group.name} className="flex items-center gap-3">
                                        <div className="w-20 text-sm font-medium text-gray-600">{group.name}</div>
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${dashboardData.aggregates.total_registrations > 0 ? (group.value / dashboardData.aggregates.total_registrations) * 100 : 0}%`,
                                                    backgroundColor: group.color
                                                }}
                                            />
                                        </div>
                                        <div className="w-16 text-sm text-right font-medium">{group.value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gender Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Gender Distribution</CardTitle>
                            <p className="text-sm text-gray-500">Patients by gender</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dashboardData.genderDistribution.map((item: DisaggregationItem) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-20 text-sm font-medium text-gray-600">{item.name}</div>
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${dashboardData.aggregates.total_registrations > 0 ? (item.value / dashboardData.aggregates.total_registrations) * 100 : 0}%`,
                                                    backgroundColor: item.color
                                                }}
                                            />
                                        </div>
                                        <div className="w-16 text-sm text-right font-medium">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Risk Factors Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Risk Factors</CardTitle>
                            <p className="text-sm text-gray-500">Patient risk factors from registrations</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dashboardData.riskFactors.map((item: DisaggregationItem) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-28 text-sm font-medium text-gray-600">{item.name}</div>
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${dashboardData.aggregates.total_registrations > 0 ? (item.value / dashboardData.aggregates.total_registrations) * 100 : 0}%`,
                                                    backgroundColor: item.color
                                                }}
                                            />
                                        </div>
                                        <div className="w-16 text-sm text-right font-medium">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* HIV Disaggregation */}
                    <Card>
                        <CardHeader>
                            <CardTitle>HIV Status</CardTitle>
                            <p className="text-sm text-gray-500">HIV status from registrations</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dashboardData.hivDisaggregation.map((item: DisaggregationItem) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-28 text-sm font-medium text-gray-600">{item.name}</div>
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${dashboardData.aggregates.hiv_positive + dashboardData.aggregates.hiv_negative + dashboardData.aggregates.hiv_unknown > 0 ? (item.value / (dashboardData.aggregates.hiv_positive + dashboardData.aggregates.hiv_negative + dashboardData.aggregates.hiv_unknown)) * 100 : 0}%`,
                                                    backgroundColor: item.color
                                                }}
                                            />
                                        </div>
                                        <div className="w-16 text-sm text-right font-medium">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Geographic Distribution */}
                {dashboardData.geographicDistribution.by_province.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Province Distribution</CardTitle>
                                <p className="text-sm text-gray-500">Events by province</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {dashboardData.geographicDistribution.by_province.map((item: any) => (
                                        <div key={item.province} className="flex items-center gap-3">
                                            <div className="w-24 text-sm font-medium text-gray-600">{item.province}</div>
                                            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${dashboardData.metadata.totalRecords > 0 ? (item.total / dashboardData.metadata.totalRecords) * 100 : 0}%`
                                                    }}
                                                />
                                            </div>
                                            <div className="w-16 text-sm text-right font-medium">{item.total}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Summary Statistics</CardTitle>
                                <p className="text-sm text-gray-500">Quick overview</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Total Registrations</span>
                                        <span className="font-medium">{dashboardData.aggregates.total_registrations}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Unique Patients</span>
                                        <span className="font-medium">{dashboardData.aggregates.unique_patients}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Total Screenings</span>
                                        <span className="font-medium">{dashboardData.aggregates.total_screenings}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Appointments</span>
                                        <span className="font-medium">{dashboardData.appointments.total}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Appointment Completion Rate</span>
                                        <span className="font-medium">{dashboardData.appointments.completionRate}%</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Lab Orders</span>
                                        <span className="font-medium">{dashboardData.laboratory.total}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-gray-600">Active Facilities</span>
                                        <span className="font-medium">{dashboardData.metadata.activeFacilities}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Facility Table */}
                {dashboardData.facilityStats.performance && dashboardData.facilityStats.performance.length > 0 && (
                    <div className="mt-6">
                        <FacilityTable
                            facilities={dashboardData.facilityStats.performance}
                            loading={loading}
                        />
                    </div>
                )}

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

// Helper functions
function getIconForKPI(icon: string): string {
    const icons: Record<string, string> = {
        'users': '👩‍⚕️',
        'microscope': '🔬',
        'eye': '👁️',
        'alert-triangle': '⚠️',
        'calendar': '📅',
        'flask': '🧪',
        'heart-pulse': '❤️',
        'check-circle': '✅',
        'arrow-right-left': '🔄',
        'skull': '⚠️',
        'default': '📊'
    };
    return icons[icon] || icons.default;
}

function getColorForKPI(id: string): string {
    const colors: Record<string, string> = {
        '1': 'bg-blue-50 hover:bg-blue-100',
        '2': 'bg-purple-50 hover:bg-purple-100',
        '3': 'bg-red-50 hover:bg-red-100',
        '4': 'bg-amber-50 hover:bg-amber-100',
        '5': 'bg-violet-50 hover:bg-violet-100',
        '6': 'bg-emerald-50 hover:bg-emerald-100',
        '7': 'bg-rose-50 hover:bg-rose-100',
        'default': 'bg-gray-50 hover:bg-gray-100'
    };
    return colors[id] || colors.default;
}

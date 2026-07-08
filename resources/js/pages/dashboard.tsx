// resources/js/pages/dashboard/index.tsx

import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { format, subDays } from 'date-fns';
import {
    RefreshCw,
    TrendingUp,
    TrendingDown,
    Minus,
    Users,
    Eye,
    Microscope,
    CheckCircle,
    ArrowRightLeft,
    Skull,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';

// ============================================================================
// Types
// ============================================================================

interface KPI {
    id: string;
    title: string;
    value: number | string;
    icon: React.ReactNode;
    trend: number;
    trendDirection: 'up' | 'down' | 'neutral';
    color: string;
    sparklineData: number[];
    comparison: string;
    formattedValue?: string;
}

interface TrendData {
    date: string;
    day: string;
    screened: number;
    viaPositive: number;
    hpvPositive: number;
    treated: number;
    followUpCompleted: number;
}

interface ChartData {
    name: string;
    value: number;
    percentage?: number;
    color?: string;
}

interface DashboardProps {
    kpis?: KPI[];
    weeklyTrends?: TrendData[];
    hivDisaggregation?: ChartData[];
    disabilityDisaggregation?: ChartData[];
    ageGroups?: ChartData[];
    metadata?: {
        lastSync: string;
        dataSource: string;
        reportingPeriod: string;
        activeFacilities: number;
        activeDistricts: number;
        totalRecords: number;
    };
}

// ============================================================================
// Default Data (Last 7 Days)
// ============================================================================

const today = new Date();
const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    return {
        date: format(date, 'yyyy-MM-dd'),
        day: format(date, 'EEE'),
        screened: Math.floor(Math.random() * 100) + 50,
        viaPositive: Math.floor(Math.random() * 30) + 10,
        hpvPositive: Math.floor(Math.random() * 40) + 15,
        treated: Math.floor(Math.random() * 35) + 10,
        followUpCompleted: Math.floor(Math.random() * 30) + 8
    };
});

const defaultKPIs: KPI[] = [
    {
        id: '1',
        title: 'Women Screened',
        value: 12480,
        icon: <Users className="h-4 w-4 text-blue-600" />,
        trend: 12.5,
        trendDirection: 'up',
        color: '#2563EB',
        sparklineData: last7Days.map(d => d.screened),
        comparison: '+234 vs last week'
    },
    {
        id: '2',
        title: 'HPV Positivity Rate',
        value: '23.4%',
        icon: <Microscope className="h-4 w-4 text-purple-600" />,
        trend: 8.2,
        trendDirection: 'up',
        color: '#7C3AED',
        sparklineData: last7Days.map(d => d.hpvPositive),
        comparison: '+1.2% vs last week'
    },
    {
        id: '3',
        title: 'VIA Positivity Rate',
        value: '18.7%',
        icon: <Eye className="h-4 w-4 text-amber-600" />,
        trend: 5.6,
        trendDirection: 'down',
        color: '#F59E0B',
        sparklineData: last7Days.map(d => d.viaPositive),
        comparison: '-1.4% vs last week'
    },
    {
        id: '4',
        title: 'Treatment Completion',
        value: '76.3%',
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        trend: 4.8,
        trendDirection: 'up',
        color: '#10B981',
        sparklineData: last7Days.map(d => d.treated),
        comparison: '+2.1% vs last week'
    },
    {
        id: '5',
        title: 'Referral Completion',
        value: '82.1%',
        icon: <ArrowRightLeft className="h-4 w-4 text-blue-600" />,
        trend: 3.2,
        trendDirection: 'up',
        color: '#2563EB',
        sparklineData: last7Days.map(() => Math.floor(Math.random() * 20) + 70),
        comparison: '+1.8% vs last week'
    },
    {
        id: '6',
        title: 'Mortality Rate',
        value: '2.1‰',
        icon: <Skull className="h-4 w-4 text-red-600" />,
        trend: 6.7,
        trendDirection: 'down',
        color: '#EF4444',
        sparklineData: last7Days.map(() => Math.floor(Math.random() * 5) + 1),
        comparison: '-0.3‰ vs last week'
    },
];

const defaultChartData: ChartData[] = [
    { name: 'HIV Positive', value: 6540, color: '#7C3AED' },
    { name: 'HIV Negative', value: 7890, color: '#10B981' },
    { name: 'Unknown', value: 990, color: '#94A3B8' },
];

const defaultDisabilityData: ChartData[] = [
    { name: 'With Disability', value: 2340, color: '#2563EB' },
    { name: 'Without Disability', value: 12480, color: '#F59E0B' },
    { name: 'Not Recorded', value: 600, color: '#94A3B8' },
];

const defaultAgeGroups: ChartData[] = [
    { name: '15-24', value: 2340, color: '#2563EB' },
    { name: '25-34', value: 4560, color: '#3B82F6' },
    { name: '35-44', value: 3890, color: '#7C3AED' },
    { name: '45-54', value: 2100, color: '#F59E0B' },
    { name: '55-64', value: 890, color: '#10B981' },
    { name: '65+', value: 320, color: '#EF4444' },
];

// ============================================================================
// Chart Components (Compact)
// ============================================================================

// Bar Chart Component
const BarChart: React.FC<{
    data: TrendData[];
    height?: number;
}> = ({ data, height = 120 }) => {
    const maxValue = Math.max(...data.map(d => d.screened));

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <div className="flex h-full items-end gap-1.5">
                {data.map((item, index) => {
                    const heightPercent = (item.screened / maxValue) * 100;
                    return (
                        <div key={index} className="flex flex-1 flex-col items-center gap-1">
                            <div className="relative w-full group">
                                <div
                                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{
                                        height: `${Math.max(4, heightPercent)}%`,
                                        backgroundColor: '#2563EB',
                                        minHeight: '4px'
                                    }}
                                />
                            </div>
                            <span className="text-[7px] font-medium text-slate-500 dark:text-slate-400">
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Area Chart Component (Sparkline)
const AreaChart: React.FC<{
    data: number[];
    color?: string;
    height?: number;
}> = ({ data, color = '#2563EB', height = 35 }) => {
    const max = Math.max(...data, 1);
    const points = data.map((value, index) => ({
        x: (index / (data.length - 1)) * 100,
        y: 100 - (value / max) * 100
    }));

    const pathD = points.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        return `${acc} L ${point.x} ${point.y}`;
    }, '');

    const areaD = points.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} 100 L ${point.x} ${point.y}`;
        return `${acc} L ${point.x} ${point.y}`;
    }, '') + ` L 100 100 Z`;

    return (
        <div className="relative" style={{ height: `${height}px` }}>
            <svg className="h-full w-full overflow-visible">
                <defs>
                    <linearGradient id={`area-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <path
                    d={areaD}
                    fill={`url(#area-gradient-${color})`}
                    className="transition-all"
                />
                <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    className="transition-all"
                />
                {points.map((point, i) => (
                    <circle
                        key={i}
                        cx={`${point.x}%`}
                        cy={`${point.y}%`}
                        r="2"
                        fill={color}
                        className="transition-all"
                    />
                ))}
            </svg>
        </div>
    );
};

// Horizontal Bar Chart for Age Groups
const HorizontalBarChart: React.FC<{
    data: ChartData[];
    height?: number;
}> = ({ data, height = 150 }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <div className="space-y-1.5">
                {data.map((item, index) => {
                    const widthPercent = (item.value / maxValue) * 100;
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-10 text-right">
                                <span className="text-[8px] font-medium text-slate-500 dark:text-slate-400">
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="relative h-4 w-full rounded bg-slate-100 dark:bg-slate-700">
                                    <div
                                        className="absolute left-0 top-0 h-full rounded transition-all duration-500"
                                        style={{
                                            width: `${Math.max(2, widthPercent)}%`,
                                            backgroundColor: item.color,
                                        }}
                                    >
                                        <span className="absolute right-1 top-0.5 text-[7px] text-white font-medium">
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-8 text-right">
                                <span className="text-[7px] text-slate-400">
                                    {((item.value / maxValue) * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Donut/Pie Chart Component (Compact)
const DonutChart: React.FC<{
    data: ChartData[];
    size?: number;
}> = ({ data, size = 100 }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {data.map((item, index) => {
                        const percentage = (item.value / total) * 100;
                        const angle = (percentage / 100) * 360;
                        const startAngle = currentAngle;
                        const endAngle = startAngle + angle;
                        currentAngle = endAngle;

                        const x1 = size / 2 + (size / 2 - 6) * Math.cos((startAngle - 90) * Math.PI / 180);
                        const y1 = size / 2 + (size / 2 - 6) * Math.sin((startAngle - 90) * Math.PI / 180);
                        const x2 = size / 2 + (size / 2 - 6) * Math.cos((endAngle - 90) * Math.PI / 180);
                        const y2 = size / 2 + (size / 2 - 6) * Math.sin((endAngle - 90) * Math.PI / 180);
                        const largeArc = angle > 180 ? 1 : 0;

                        return (
                            <path
                                key={index}
                                d={`M ${size/2} ${size/2} L ${x1} ${y1} A ${size/2 - 6} ${size/2 - 6} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={item.color || '#94A3B8'}
                                stroke="white"
                                strokeWidth="1.5"
                                className="transition-opacity hover:opacity-80 cursor-pointer"
                            />
                        );
                    })}
                    <circle cx={size/2} cy={size/2} r={size/2 - 14} fill="white" className="dark:fill-slate-800" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                            {total.toLocaleString()}
                        </div>
                        <div className="text-[6px] text-slate-500 dark:text-slate-400">Total</div>
                    </div>
                </div>
            </div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-0.5">
                        <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[7px] text-slate-600 dark:text-slate-300">
                            {item.name}
                        </span>
                        <span className="text-[7px] font-medium">
                            {((item.value / total) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============================================================================
// KPI Card Component (Compact)
// ============================================================================

const KPICard: React.FC<{ kpi: KPI }> = ({ kpi }) => {
    const trendIcon = {
        up: <TrendingUp className="h-3 w-3 text-green-500" />,
        down: <TrendingDown className="h-3 w-3 text-red-500" />,
        neutral: <Minus className="h-3 w-3 text-slate-500" />,
    };

    return (
        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            <CardContent className="p-2.5">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-medium text-slate-500 dark:text-slate-400 truncate">
                            {kpi.title}
                        </p>
                        <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                            {kpi.formattedValue || kpi.value}
                        </p>
                    </div>
                    <div className={`rounded-full p-1.5 shrink-0 ml-1`} style={{ backgroundColor: `${kpi.color}15` }}>
                        {kpi.icon}
                    </div>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                        {trendIcon[kpi.trendDirection]}
                        <span className={`text-[8px] font-medium ${
                            kpi.trendDirection === 'up' ? 'text-green-600 dark:text-green-400' :
                                kpi.trendDirection === 'down' ? 'text-red-600 dark:text-red-400' :
                                    'text-slate-500 dark:text-slate-400'
                        }`}>
                            {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                        </span>
                        <span className="text-[6px] text-slate-400">vs prev</span>
                    </div>
                    <span className="text-[7px] font-medium text-slate-500 dark:text-slate-400">
                        {kpi.comparison}
                    </span>
                </div>

                <div className="mt-1.5">
                    <AreaChart
                        data={kpi.sparklineData}
                        color={kpi.color}
                        height={28}
                    />
                </div>

                <div className="mt-0.5 flex justify-end">
                    <Badge variant="outline" className="text-[6px] px-1 py-0 h-3 text-slate-400">
                        7d
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

// ============================================================================
// Main Dashboard Component
// ============================================================================

export default function Dashboard() {
    const { props } = usePage();
    const dashboardData = props as DashboardProps;
   console.log(props);
    const kpis = dashboardData?.kpis || defaultKPIs;
    const weeklyTrends = dashboardData?.weeklyTrends || last7Days;
    const hivData = dashboardData?.hivDisaggregation || defaultChartData;
    const disabilityData = dashboardData?.disabilityDisaggregation || defaultDisabilityData;
    const ageGroups = dashboardData?.ageGroups || defaultAgeGroups;
    const metadata = dashboardData?.metadata || {
        lastSync: new Date().toISOString(),
        dataSource: 'System',
        reportingPeriod: 'Last 7 Days',
        activeFacilities: 45,
        activeDistricts: 12,
        totalRecords: 15420
    };

    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    const weekTotal = weeklyTrends.reduce((sum, d) => sum + d.screened, 0);

    return (
        <>
            <Head title="Weekly Dashboard | National Health Intelligence" />

            <div className="min-h-screen bg-slate-50 p-3 dark:bg-slate-900">
                <div className="mx-auto max-w-full">
                    {/* Header - Compact */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h1 className="text-base font-bold text-slate-900 dark:text-white">
                                Weekly Analytics Dashboard
                            </h1>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {format(subDays(new Date(), 6), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px]" onClick={handleRefresh}>
                            <RefreshCw className={`mr-1.5 h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    {/* KPI Grid - 6 columns */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-3">
                        {kpis.map((kpi) => (
                            <div key={kpi.id} className="w-full">
                                <KPICard kpi={kpi} />
                            </div>
                        ))}
                    </div>

                    {/* Charts Section - Compact */}
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 mb-3">
                        {/* Bar Chart - Daily Trends (takes 2 columns) */}
                        <div className="lg:col-span-2">
                            <Card className="h-full border border-slate-200 dark:border-slate-700">
                                <CardHeader className="p-2.5 pb-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-[10px] font-semibold">Daily Screening Trends</CardTitle>
                                            <CardDescription className="text-[8px]">Last 7 days</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="text-[6px] px-1">
                                            Total: {weekTotal.toLocaleString()}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-2.5 pt-1">
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-1">
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                            <span className="text-[6px] text-slate-600 dark:text-slate-300">Screened</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                            <span className="text-[6px] text-slate-600 dark:text-slate-300">VIA+</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                                            <span className="text-[6px] text-slate-600 dark:text-slate-300">HPV+</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span className="text-[6px] text-slate-600 dark:text-slate-300">Treated</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                            <span className="text-[6px] text-slate-600 dark:text-slate-300">Follow-ups</span>
                                        </div>
                                    </div>
                                    <BarChart data={weeklyTrends} height={110} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* HIV Status Pie (takes 1 column) */}
                        <div className="lg:col-span-1">
                            <Card className="h-full border border-slate-200 dark:border-slate-700">
                                <CardHeader className="p-2.5 pb-1">
                                    <CardTitle className="text-[10px] font-semibold">HIV Status</CardTitle>
                                    <CardDescription className="text-[8px]">Distribution</CardDescription>
                                </CardHeader>
                                <CardContent className="p-2.5 pt-1 flex items-center justify-center">
                                    <DonutChart data={hivData} size={90} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Disability Pie (takes 1 column) */}
                        <div className="lg:col-span-1">
                            <Card className="h-full border border-slate-200 dark:border-slate-700">
                                <CardHeader className="p-2.5 pb-1">
                                    <CardTitle className="text-[10px] font-semibold">Disability</CardTitle>
                                    <CardDescription className="text-[8px]">Status</CardDescription>
                                </CardHeader>
                                <CardContent className="p-2.5 pt-1 flex items-center justify-center">
                                    <DonutChart data={disabilityData} size={90} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Horizontal Bar Chart - Age Groups (Full Width) */}
                    <div className="mb-3">
                        <Card className="border border-slate-200 dark:border-slate-700">
                            <CardHeader className="p-2.5 pb-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-[10px] font-semibold">Age Group Distribution</CardTitle>
                                        <CardDescription className="text-[8px]">Screening by age group</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-[6px] px-1">
                                        Total: {ageGroups.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-2.5 pt-1">
                                <HorizontalBarChart data={ageGroups} height={130} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Footer - Compact */}
                    <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[7px] text-slate-500 dark:text-slate-400">
                            <div className="flex flex-wrap items-center gap-2">
                                <span>Sync: {format(new Date(metadata.lastSync), 'MMM d, HH:mm')}</span>
                                <span className="text-slate-300">|</span>
                                <span>Source: {metadata.dataSource}</span>
                                <span className="text-slate-300">|</span>
                                <span>Period: {metadata.reportingPeriod}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span>Facilities: <strong className="text-slate-700 dark:text-slate-300">{metadata.activeFacilities}</strong></span>
                                <span>Districts: <strong className="text-slate-700 dark:text-slate-300">{metadata.activeDistricts}</strong></span>
                                <span>Records: <strong className="text-slate-700 dark:text-slate-300">{metadata.totalRecords.toLocaleString()}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ============================================================================
// Page Layout Configuration
// ============================================================================

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

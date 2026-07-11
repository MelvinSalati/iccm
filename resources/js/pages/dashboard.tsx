// resources/js/pages/dashboard/index.tsx

import React, { useState, useMemo, useEffect } from 'react';
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
    Activity,
    Clock,
    ChevronRight,
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
    icon: string;
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
    aggregates?: any[];
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
// Skeleton Components
// ============================================================================

// KPI Card Skeleton
const KPICardSkeleton: React.FC = () => {
    return (
        <Card className="overflow-hidden h-full border border-slate-200 dark:border-slate-700 animate-pulse">
            <CardContent className="p-2.5">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="mt-1 h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="mt-2">
                    <div className="h-7 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="mt-1 flex justify-end">
                    <div className="h-2 w-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
            </CardContent>
        </Card>
    );
};

// Bar Chart Skeleton
const BarChartSkeleton: React.FC<{ height?: number }> = ({ height = 110 }) => {
    const bars = Array.from({ length: 7 }, () => ({
        height: 20 + Math.random() * 60
    }));

    return (
        <div className="w-full animate-pulse" style={{ height: `${height}px` }}>
            <div className="flex h-full items-end gap-1.5">
                {bars.map((bar, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-1">
                        <div
                            className="w-full rounded-t bg-slate-200 dark:bg-slate-700"
                            style={{ height: `${bar.height}%`, minHeight: '4px' }}
                        />
                        <div className="h-2 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Donut Chart Skeleton
const DonutChartSkeleton: React.FC<{ size?: number }> = ({ size = 90 }) => {
    return (
        <div className="flex flex-col items-center animate-pulse">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle cx={size/2} cy={size/2} r={size/2 - 6} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle cx={size/2} cy={size/2} r={size/2 - 14} fill="white" className="dark:fill-slate-800" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
                        <div className="h-2 w-6 bg-slate-200 dark:bg-slate-700 rounded mx-auto mt-0.5"></div>
                    </div>
                </div>
            </div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-2 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Horizontal Bar Chart Skeleton
const HorizontalBarChartSkeleton: React.FC<{ height?: number }> = ({ height = 130 }) => {
    const bars = Array.from({ length: 6 }, () => ({
        width: 30 + Math.random() * 60
    }));

    return (
        <div className="w-full animate-pulse" style={{ height: `${height}px` }}>
            <div className="space-y-1.5">
                {bars.map((bar, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-10 text-right">
                            <div className="h-2 w-8 bg-slate-200 dark:bg-slate-700 rounded ml-auto"></div>
                        </div>
                        <div className="flex-1">
                            <div className="relative h-4 w-full rounded bg-slate-100 dark:bg-slate-700">
                                <div
                                    className="absolute left-0 top-0 h-full rounded bg-slate-200 dark:bg-slate-600"
                                    style={{ width: `${bar.width}%` }}
                                />
                            </div>
                        </div>
                        <div className="w-8 text-right">
                            <div className="h-2 w-6 bg-slate-200 dark:bg-slate-700 rounded ml-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============================================================================
// Icon mapping
// ============================================================================

const getIcon = (iconName: string, className: string = "h-4 w-4 text-blue-600") => {
    const icons: Record<string, React.ReactNode> = {
        'users': <Users className={className} />,
        'microscope': <Microscope className={className} />,
        'eye': <Eye className={className} />,
        'check-circle': <CheckCircle className={className} />,
        'arrow-right-left': <ArrowRightLeft className={className} />,
        'skull': <Skull className={className} />,
    };
    return icons[iconName] || <Users className={className} />;
};

// ============================================================================
// Chart Components
// ============================================================================

const BarChart: React.FC<{
    data: TrendData[];
    height?: number;
}> = ({ data, height = 120 }) => {
    if (!data || data.length === 0) {
        return <BarChartSkeleton height={height} />;
    }

    const maxValue = Math.max(...data.map(d => d.screened), 1);

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <div className="flex h-full items-end gap-1.5">
                {data.map((item, index) => {
                    const heightPercent = (item.screened / maxValue) * 100;
                    return (
                        <div key={index} className="flex flex-1 flex-col items-center gap-1">
                            <div
                                className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                                style={{
                                    height: `${Math.max(4, heightPercent)}%`,
                                    backgroundColor: '#2563EB',
                                    minHeight: '4px'
                                }}
                            />
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

const AreaChart: React.FC<{
    data: number[];
    color?: string;
    height?: number;
}> = ({ data, color = '#2563EB', height = 35 }) => {
    if (!data || data.length === 0 || data.every(v => v === 0)) {
        return (
            <div className="relative animate-pulse" style={{ height: `${height}px` }}>
                <div className="h-full w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
        );
    }

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

const HorizontalBarChart: React.FC<{
    data: ChartData[];
    height?: number;
}> = ({ data, height = 150 }) => {
    if (!data || data.length === 0) {
        return <HorizontalBarChartSkeleton height={height} />;
    }

    const maxValue = Math.max(...data.map(d => d.value), 1);

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
                                            backgroundColor: item.color || '#94A3B8',
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

const DonutChart: React.FC<{
    data: ChartData[];
    size?: number;
}> = ({ data, size = 100 }) => {
    if (!data || data.length === 0) {
        return <DonutChartSkeleton size={size} />;
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    if (total === 0) {
        return <DonutChartSkeleton size={size} />;
    }

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
                            style={{ backgroundColor: item.color || '#94A3B8' }}
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
// KPI Card Component
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
                        {getIcon(kpi.icon || 'users', "h-4 w-4")}
                    </div>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                        {trendIcon[kpi.trendDirection || 'neutral']}
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
                        {kpi.comparison || '0 vs last week'}
                    </span>
                </div>

                <div className="mt-1.5">
                    <AreaChart
                        data={kpi.sparklineData || [0,0,0,0,0,0,0]}
                        color={kpi.color || '#2563EB'}
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

    const [loading, setLoading] = useState(true);
    const [showAllData, setShowAllData] = useState(false);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Use data from controller or fallback to defaults
    const kpis = dashboardData?.kpis || [];
    const weeklyTrends = dashboardData?.weeklyTrends || [];
    const hivData = dashboardData?.hivDisaggregation || [];
    const disabilityData = dashboardData?.disabilityDisaggregation || [];
    const ageGroups = dashboardData?.ageGroups || [];
    const metadata = dashboardData?.metadata || {
        lastSync: new Date().toISOString(),
        dataSource: 'System',
        reportingPeriod: 'Last 7 Days',
        activeFacilities: 0,
        activeDistricts: 0,
        totalRecords: 0
    };

    // Check if we have data - if not, show skeletons
    const hasData = kpis.length > 0 && weeklyTrends.length > 0;
    const weekTotal = weeklyTrends.reduce((sum, d) => sum + (d.screened || 0), 0);

    // Show skeletons while loading OR if no data
    if (loading || !hasData) {
        return (
            <>
                <Head title="Dashboard | Loading..." />
                <div className="min-h-screen bg-slate-50 p-3 dark:bg-slate-900">
                    <div className="mx-auto max-w-full">
                        {/* Header */}
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                                    Community Health Dashboard
                                </h1>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {format(subDays(new Date(), 6), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}
                                </p>
                                <p className="text-[8px] text-slate-400 mt-0.5">
                                    Loading data...
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px]" onClick={() => window.location.reload()}>
                                <RefreshCw className="mr-1.5 h-3 w-3" />
                                Refresh
                            </Button>
                        </div>

                        {/* System Status Bar - Skeleton */}
                        <div className="mb-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 flex items-center justify-between animate-pulse">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                <div className="h-2 w-20 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                <div className="h-2 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                <div className="h-2 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
                            </div>
                            <div className="h-4 w-20 bg-slate-300 dark:bg-slate-600 rounded"></div>
                        </div>

                        {/* KPI Grid Skeletons */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="w-full">
                                    <KPICardSkeleton />
                                </div>
                            ))}
                        </div>

                        {/* Charts Skeletons */}
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 mb-3">
                            <div className="lg:col-span-2">
                                <Card className="h-full border border-slate-200 dark:border-slate-700">
                                    <CardHeader className="p-2.5 pb-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                                <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mt-1 animate-pulse"></div>
                                            </div>
                                            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-2.5 pt-1">
                                        <div className="flex flex-wrap justify-center gap-1.5 mb-1">
                                            {[1,2,3,4,5].map((i) => (
                                                <div key={i} className="flex items-center gap-0.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                                    <div className="h-2 w-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                        <BarChartSkeleton height={110} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-1">
                                <Card className="h-full border border-slate-200 dark:border-slate-700">
                                    <CardHeader className="p-2.5 pb-1">
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded mt-1 animate-pulse"></div>
                                    </CardHeader>
                                    <CardContent className="p-2.5 pt-1 flex items-center justify-center">
                                        <DonutChartSkeleton size={90} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-1">
                                <Card className="h-full border border-slate-200 dark:border-slate-700">
                                    <CardHeader className="p-2.5 pb-1">
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded mt-1 animate-pulse"></div>
                                    </CardHeader>
                                    <CardContent className="p-2.5 pt-1 flex items-center justify-center">
                                        <DonutChartSkeleton size={90} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Age Groups Skeleton */}
                        <div className="mb-3">
                            <Card className="border border-slate-200 dark:border-slate-700">
                                <CardHeader className="p-2.5 pb-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                            <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mt-1 animate-pulse"></div>
                                        </div>
                                        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-2.5 pt-1">
                                    <HorizontalBarChartSkeleton height={130} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Footer Skeleton */}
                        <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-pulse">
                            <div className="flex flex-wrap items-center justify-between gap-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* "Continue using the system" message */}
                        <div className="mt-4 text-center">
                            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                                <Activity className="h-3 w-3" />
                                <span>Loading data from the system...</span>
                                <span className="text-slate-300 mx-1">|</span>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-blue-500">Continue using the system</span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // If data exists, show the full dashboard
    return (
        <>
            <Head title="Weekly Dashboard | National Health Intelligence" />

            <div className="min-h-screen bg-slate-50 p-3 dark:bg-slate-900">
                <div className="mx-auto max-w-full">
                    {/* Header */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h1 className="text-base font-bold text-slate-900 dark:text-white">
                                Community Health Dashboard
                            </h1>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {format(subDays(new Date(), 6), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}
                            </p>
                            {metadata.totalRecords > 0 && (
                                <p className="text-[8px] text-slate-400 mt-0.5">
                                    {metadata.totalRecords} records from {metadata.activeFacilities} facilities
                                </p>
                            )}
                        </div>
                        <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px]" onClick={() => window.location.reload()}>
                            <RefreshCw className="mr-1.5 h-3 w-3" />
                            Refresh
                        </Button>
                    </div>

                    {/* System Status Bar */}
                    <div className="mb-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-blue-700 dark:text-blue-300">
                            <Activity className="h-3 w-3" />
                            <span>System active</span>
                            <span className="text-blue-300 dark:text-blue-700">|</span>
                            <span>{metadata.totalRecords} records loaded</span>
                            <span className="text-blue-300 dark:text-blue-700">|</span>
                            <span>Last sync: {format(new Date(metadata.lastSync), 'HH:mm')}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-5 text-[9px] text-blue-600 hover:text-blue-700 hover:bg-blue-100/50">
                            View All Data
                            <ChevronRight className="h-3 w-3 ml-0.5" />
                        </Button>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-3">
                        {kpis.map((kpi) => (
                            <div key={kpi.id} className="w-full">
                                <KPICard kpi={kpi} />
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 mb-3">
                        <div className="lg:col-span-2">
                            <Card className="h-full border border-slate-200 dark:border-slate-700">
                                <CardHeader className="p-2.5 pb-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-[10px] font-semibold">Daily Screening Trends</CardTitle>
                                            <CardDescription className="text-[8px]">Last 7 days</CardDescription>
                                        </div>
                                        {weekTotal > 0 && (
                                            <Badge variant="outline" className="text-[6px] px-1">
                                                Total: {weekTotal.toLocaleString()}
                                            </Badge>
                                        )}
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

                    {/* Age Groups */}
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

                    {/* Footer */}
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

                    {/* "Continue using the system" message */}
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>System is active and ready</span>
                            <span className="text-slate-300 mx-1">|</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-blue-500">Continue using the system</span>
                        </p>
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

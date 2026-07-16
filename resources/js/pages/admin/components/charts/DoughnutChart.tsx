import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    PieChart,
    Pie,
    Cell,
} from 'recharts';

interface DoughnutChartProps {
    data: {
        positive: number;  // Changed from 'positives' to 'positive'
        negative: number;  // Changed from 'negatives' to 'negative'
    };
    title: string;
    description?: string;
    colors?: {
        positive: string;
        negative: string;
    };
    loading?: boolean;
}

export function DoughnutChart({
                                  data,
                                  title,
                                  description,
                                  colors = { positive: '#838ff6', negative: '#22c55e' },
                                  loading = false
                              }: DoughnutChartProps) {
    // Handle loading state
    if (loading) {
        return (
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl shadow-lg border border-gray-100/50 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                        {description && (
                            <p className="text-[10px] text-gray-500">{description}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-[180px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
                </div>
            </div>
        );
    }

    // Handle empty data
    if (!data || (data.positive === 0 && data.negative === 0)) {
        return (
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl shadow-lg border border-gray-100/50 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                        {description && (
                            <p className="text-[10px] text-gray-500">{description}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center h-[180px]">
                    <p className="text-gray-400 text-sm">No data available</p>
                </div>
            </div>
        );
    }

    const chartData = [
        {
            name: 'Positive',
            value: data.positive,  // Changed from 'positives' to 'positive'
            fill: colors.positive
        },
        {
            name: 'Negative',
            value: data.negative,  // Changed from 'negatives' to 'negative'
            fill: colors.negative
        },
    ];

    const chartConfig = {
        Positive: {
            label: 'Positive',
            color: colors.positive,
        },
        Negative: {
            label: 'Negative',
            color: colors.negative,
        },
    } satisfies ChartConfig;

    const total = data.positive + data.negative;
    const positivityRate = total > 0 ? Math.round((data.positive / total) * 100) : 0;

    return (
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 backdrop-blur-sm">
            <div className="p-4">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                        {description && (
                            <p className="text-[10px] text-gray-500">{description}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                            {total} total
                        </span>
                    </div>
                </div>

                {/* Compact Chart */}
                <div className="relative">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[180px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                strokeWidth={3}
                                stroke="#fff"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>

                {/* Compact Legend */}
                <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full shadow-sm"
                            style={{ backgroundColor: colors.positive }}
                        />
                        <span className="text-[10px] font-medium text-gray-700">
                            Pos: {data.positive}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full shadow-sm"
                            style={{ backgroundColor: colors.negative }}
                        />
                        <span className="text-[10px] font-medium text-gray-700">
                            Neg: {data.negative}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-gray-400">
                            Rate: {positivityRate}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

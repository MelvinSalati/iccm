import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
} from '@/components/ui/chart';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    Tooltip,
} from 'recharts';

interface HorizontalBarChartProps {
    data: {
        positives: number;
        negatives: number;
    };
    title: string;
    description?: string;
    colors?: {
        positive: string;
        negative: string;
    };
}

export function HorizontalBarChart({
                                       data,
                                       title,
                                       description,
                                       colors = { positive: '#ef4444', negative: '#22c55e' }
                                   }: HorizontalBarChartProps) {
    const chartData = [
        { name: 'Positive', value: data.positives, fill: colors.positive },
        { name: 'Negative', value: data.negatives, fill: colors.negative },
    ];

    const chartConfig = {
        positive: {
            label: 'Positive',
            color: colors.positive,
        },
        negative: {
            label: 'Negative',
            color: colors.negative,
        },
    } satisfies ChartConfig;

    const total = data.positives + data.negatives;
    const positiveRate = total > 0 ? Math.round((data.positives / total) * 100) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            width={70}
                        />
                        <Tooltip
                            formatter={(value: number) => [`${value} cases`, '']}
                            contentStyle={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                padding: '8px 12px'
                            }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.positive }} />
                        <span className="text-muted-foreground">Positive: {data.positives}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.negative }} />
                        <span className="text-muted-foreground">Negative: {data.negatives}</span>
                    </div>
                </div>
                <div className="text-sm font-medium">
                    {positiveRate}% positive
                </div>
            </CardFooter>
        </Card>
    );
}

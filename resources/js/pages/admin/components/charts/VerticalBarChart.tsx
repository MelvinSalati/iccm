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
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

interface VerticalBarChartProps {
    data: Array<{
        name: string;
        [key: string]: any;
    }>;
    title: string;
    description?: string;
    bars: Array<{
        dataKey: string;
        fill: string;
        name?: string;
    }>;
}

// This is a named export - matches your index.ts
export function VerticalBarChart({
                                     data,
                                     title,
                                     description,
                                     bars
                                 }: VerticalBarChartProps) {
    const chartConfig = bars.reduce((acc, bar) => ({
        ...acc,
        [bar.dataKey]: {
            label: bar.name || bar.dataKey,
            color: bar.fill,
        }
    }), {} as ChartConfig);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                >
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />
                        {bars.map((bar, index) => (
                            <Bar
                                key={index}
                                dataKey={bar.dataKey}
                                fill={bar.fill}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

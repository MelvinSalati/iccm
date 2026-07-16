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
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

interface LineChartProps {
    data: Array<{
        name: string;
        [key: string]: any;
    }>;
    title: string;
    description?: string;
    lines: Array<{
        dataKey: string;
        color: string;
        name?: string;
    }>;
}

// This is a named export - matches your index.ts
export function LineChart({
                              data,
                              title,
                              description,
                              lines
                          }: LineChartProps) {
    const chartConfig = lines.reduce((acc, line) => ({
        ...acc,
        [line.dataKey]: {
            label: line.name || line.dataKey,
            color: line.color,
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
                    <RechartsLineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />
                        {lines.map((line, index) => (
                            <Line
                                key={index}
                                type="monotone"
                                dataKey={line.dataKey}
                                stroke={line.color}
                                strokeWidth={2}
                                dot={{ fill: line.color }}
                            />
                        ))}
                    </RechartsLineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

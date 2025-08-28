import { useEffect, useRef } from 'preact/hooks';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { cn } from '@/utils';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface ChartDataPoint {
    x: string | Date;
    y: number;
}

interface StockChartProps {
    data: ChartDataPoint[];
    title: string;
    className?: string;
}

export function StockChart({ data, title, className }: StockChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !data.length) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart
        chartRef.current = new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: data.map(point => point.x),
                datasets: [
                    {
                        label: title,
                        data: data.map(point => point.y),
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.1,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#374151',
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#e5e7eb',
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#6b7280',
                        },
                    },
                    y: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#e5e7eb',
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#6b7280',
                            callback: function (value) {
                                return '$' + Number(value).toFixed(2);
                            },
                        },
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, title]);

    if (!data.length) {
        return (
            <div className={cn(
                'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-64',
                'flex items-center justify-center',
                'border border-gray-200 dark:border-gray-700',
                className
            )}>
                <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
            </div>
        );
    }

    return (
        <div className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
            'border border-gray-200 dark:border-gray-700',
            className
        )}>
            <div className="h-64">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}

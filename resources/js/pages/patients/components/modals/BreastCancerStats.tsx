
import React from 'react';
import {
    Heart,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock,
    AlertCircle,
} from 'lucide-react';

interface BreastCancerStatsProps {
    stats: {
        total: number;
        positive: number;
        negative: number;
        pending: number;
        by_stage: Record<string, number>;
        monthly_trends: Array<{ month: string; total: number; positive: number }>;
    };
}

// ✅ Default export
export default function BreastCancerStats({ stats }: BreastCancerStatsProps) {
    if (!stats) return null;

    // ... rest of component
}

export default function IndicatorCard({ indicator }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'on_track': return 'border-green-500';
            case 'at_risk': return 'border-yellow-500';
            case 'behind': return 'border-orange-500';
            case 'critical': return 'border-red-500';
            case 'exceeded': return 'border-blue-500';
            default: return 'border-gray-300';
        }
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        if (percentage >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 ${getStatusColor(indicator.performance?.status)}`}>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{indicator.code}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{indicator.name}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.performance?.status)}`}>
                    {indicator.performance?.status?.replace('_', ' ').toUpperCase() || 'Pending'}
                </span>
            </div>

            <div className="mt-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Target: {indicator.target_value || '—'}</span>
                    <span className="text-gray-600 dark:text-gray-400">Actual: {indicator.performance?.actual_value || '—'}</span>
                </div>
                {indicator.performance?.percentage_achieved !== null && (
                    <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Achieved</span>
                            <span className="font-medium">{indicator.performance.percentage_achieved.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${getProgressColor(indicator.performance.percentage_achieved)}`}
                                style={{ width: `${Math.min(indicator.performance.percentage_achieved, 100)}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

export default function IndicatorsTable({ indicators = [], period = 'monthly', facilityId }) {
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Get categories from indicators
    const categories = ['all', ...new Set(indicators.map(i => i.category).filter(Boolean))];

    // Sort and filter indicators
    const filteredIndicators = indicators
        .filter(indicator => {
            if (filterCategory !== 'all' && indicator.category !== filterCategory) return false;
            if (searchTerm && !indicator.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            let aVal = a[sortField] || '';
            let bVal = b[sortField] || '';

            if (sortField === 'performance') {
                aVal = a.performance?.actual_value || 0;
                bVal = b.performance?.actual_value || 0;
            }

            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'on_track': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'at_risk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'behind': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
            case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'exceeded': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'on_track': return '✅';
            case 'at_risk': return '⚠️';
            case 'behind': return '📉';
            case 'critical': return '🚨';
            case 'exceeded': return '🌟';
            default: return '⏳';
        }
    };

    const formatValue = (value, type = 'number') => {
        if (value === null || value === undefined) return '—';
        if (type === 'percentage') return `${value.toFixed(1)}%`;
        if (type === 'currency') return `$${value.toFixed(2)}`;
        if (type === 'number') return value.toLocaleString();
        return value;
    };

    return (
        <div>
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat.replace('_', ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search indicators..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 md:w-64 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <button
                        onClick={() => window.location.reload()}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                        <th
                            onClick={() => handleSort('code')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Code {sortField === 'code' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => handleSort('name')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Indicator {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => handleSort('category')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => handleSort('performance')}
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Target {sortField === 'performance' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actual
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            % Achieved
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Trend
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredIndicators.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                No indicators found
                            </td>
                        </tr>
                    ) : (
                        filteredIndicators.map((indicator) => (
                            <tr key={indicator.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-400">
                                    {indicator.code}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium">{indicator.name}</div>
                                    {indicator.description && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {indicator.description}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                            {indicator.category?.replace('_', ' ').toUpperCase() || '—'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 dark:text-white">
                                    {indicator.target_value !== null ? (
                                        <span className="font-medium">
                                                {formatValue(indicator.target_value)}
                                            {indicator.calculation_type === 'percentage' ? '%' : ''}
                                            </span>
                                    ) : '—'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    {indicator.performance?.actual_value !== null ? (
                                        <span className={
                                            indicator.performance?.status === 'on_track' ? 'text-green-600 dark:text-green-400' :
                                                indicator.performance?.status === 'at_risk' ? 'text-yellow-600 dark:text-yellow-400' :
                                                    indicator.performance?.status === 'behind' ? 'text-orange-600 dark:text-orange-400' :
                                                        indicator.performance?.status === 'critical' ? 'text-red-600 dark:text-red-400' :
                                                            'text-gray-600 dark:text-gray-400'
                                        }>
                                                {formatValue(indicator.performance.actual_value)}
                                            </span>
                                    ) : '—'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {indicator.performance?.percentage_achieved !== null ? (
                                        <div className="flex items-center justify-center gap-2">
                                                <span className={`font-medium ${
                                                    indicator.performance.percentage_achieved >= 80 ? 'text-green-600 dark:text-green-400' :
                                                        indicator.performance.percentage_achieved >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                                                            'text-red-600 dark:text-red-400'
                                                }`}>
                                                    {indicator.performance.percentage_achieved.toFixed(1)}%
                                                </span>
                                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${
                                                        indicator.performance.percentage_achieved >= 80 ? 'bg-green-500' :
                                                            indicator.performance.percentage_achieved >= 60 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                    }`}
                                                    style={{ width: `${Math.min(indicator.performance.percentage_achieved, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : '—'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {indicator.performance?.status ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.performance.status)}`}>
                                                {getStatusIcon(indicator.performance.status)} {indicator.performance.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                ⏳ Not calculated
                                            </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => window.location.href = `/admin/indicators/${indicator.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                                    >
                                        View Details →
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredIndicators.length} of {indicators.length} indicators
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Period: {period.charAt(0).toUpperCase() + period.slice(1)}
                </span>
            </div>
        </div>
    );
}

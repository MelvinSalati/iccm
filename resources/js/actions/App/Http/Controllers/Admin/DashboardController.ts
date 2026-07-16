import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
export const getDashboardData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboardData.url(options),
    method: 'get',
})

getDashboardData.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
getDashboardData.url = (options?: RouteQueryOptions) => {
    return getDashboardData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
getDashboardData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboardData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
getDashboardData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDashboardData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
    const getDashboardDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDashboardData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
        getDashboardDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDashboardData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getDashboardData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
        getDashboardDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDashboardData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getDashboardData.form = getDashboardDataForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
const getSummary05d9f424d2c256276298ab19e8bf5497 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSummary05d9f424d2c256276298ab19e8bf5497.url(options),
    method: 'get',
})

getSummary05d9f424d2c256276298ab19e8bf5497.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
getSummary05d9f424d2c256276298ab19e8bf5497.url = (options?: RouteQueryOptions) => {
    return getSummary05d9f424d2c256276298ab19e8bf5497.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
getSummary05d9f424d2c256276298ab19e8bf5497.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSummary05d9f424d2c256276298ab19e8bf5497.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
getSummary05d9f424d2c256276298ab19e8bf5497.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSummary05d9f424d2c256276298ab19e8bf5497.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
    const getSummary05d9f424d2c256276298ab19e8bf5497Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSummary05d9f424d2c256276298ab19e8bf5497.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
        getSummary05d9f424d2c256276298ab19e8bf5497Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSummary05d9f424d2c256276298ab19e8bf5497.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
        getSummary05d9f424d2c256276298ab19e8bf5497Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSummary05d9f424d2c256276298ab19e8bf5497.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSummary05d9f424d2c256276298ab19e8bf5497.form = getSummary05d9f424d2c256276298ab19e8bf5497Form
    /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
const getSummary72aa75704d95525e350b726b7ca4a503 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSummary72aa75704d95525e350b726b7ca4a503.url(options),
    method: 'get',
})

getSummary72aa75704d95525e350b726b7ca4a503.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
getSummary72aa75704d95525e350b726b7ca4a503.url = (options?: RouteQueryOptions) => {
    return getSummary72aa75704d95525e350b726b7ca4a503.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
getSummary72aa75704d95525e350b726b7ca4a503.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSummary72aa75704d95525e350b726b7ca4a503.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
getSummary72aa75704d95525e350b726b7ca4a503.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSummary72aa75704d95525e350b726b7ca4a503.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
    const getSummary72aa75704d95525e350b726b7ca4a503Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSummary72aa75704d95525e350b726b7ca4a503.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
        getSummary72aa75704d95525e350b726b7ca4a503Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSummary72aa75704d95525e350b726b7ca4a503.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getSummary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/summary'
 */
        getSummary72aa75704d95525e350b726b7ca4a503Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSummary72aa75704d95525e350b726b7ca4a503.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSummary72aa75704d95525e350b726b7ca4a503.form = getSummary72aa75704d95525e350b726b7ca4a503Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\DashboardController::getSummary, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `getSummary['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const getSummary = {
    '/api/v1/admin/dashboard/summary': getSummary05d9f424d2c256276298ab19e8bf5497,
    '/v1/admin/dashboard/summary': getSummary72aa75704d95525e350b726b7ca4a503,
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
const getTrendsfbef48101a0cc5ba50fc8cc0c399a356 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url(options),
    method: 'get',
})

getTrendsfbef48101a0cc5ba50fc8cc0c399a356.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/trends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url = (options?: RouteQueryOptions) => {
    return getTrendsfbef48101a0cc5ba50fc8cc0c399a356.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
getTrendsfbef48101a0cc5ba50fc8cc0c399a356.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
getTrendsfbef48101a0cc5ba50fc8cc0c399a356.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
    const getTrendsfbef48101a0cc5ba50fc8cc0c399a356Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
        getTrendsfbef48101a0cc5ba50fc8cc0c399a356Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
        getTrendsfbef48101a0cc5ba50fc8cc0c399a356Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTrendsfbef48101a0cc5ba50fc8cc0c399a356.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getTrendsfbef48101a0cc5ba50fc8cc0c399a356.form = getTrendsfbef48101a0cc5ba50fc8cc0c399a356Form
    /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
const getTrendsf8a539cec728ac2d5d24aea00969bf7c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url(options),
    method: 'get',
})

getTrendsf8a539cec728ac2d5d24aea00969bf7c.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/trends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
getTrendsf8a539cec728ac2d5d24aea00969bf7c.url = (options?: RouteQueryOptions) => {
    return getTrendsf8a539cec728ac2d5d24aea00969bf7c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
getTrendsf8a539cec728ac2d5d24aea00969bf7c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
getTrendsf8a539cec728ac2d5d24aea00969bf7c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
    const getTrendsf8a539cec728ac2d5d24aea00969bf7cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
        getTrendsf8a539cec728ac2d5d24aea00969bf7cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getTrends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/trends'
 */
        getTrendsf8a539cec728ac2d5d24aea00969bf7cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTrendsf8a539cec728ac2d5d24aea00969bf7c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getTrendsf8a539cec728ac2d5d24aea00969bf7c.form = getTrendsf8a539cec728ac2d5d24aea00969bf7cForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\DashboardController::getTrends, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `getTrends['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const getTrends = {
    '/api/v1/admin/dashboard/trends': getTrendsfbef48101a0cc5ba50fc8cc0c399a356,
    '/v1/admin/dashboard/trends': getTrendsf8a539cec728ac2d5d24aea00969bf7c,
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
export const getScreeningStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningStats.url(options),
    method: 'get',
})

getScreeningStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/screenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
getScreeningStats.url = (options?: RouteQueryOptions) => {
    return getScreeningStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
getScreeningStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
getScreeningStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getScreeningStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
    const getScreeningStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getScreeningStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
        getScreeningStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
        getScreeningStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getScreeningStats.form = getScreeningStatsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
export const getPerformanceStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPerformanceStats.url(options),
    method: 'get',
})

getPerformanceStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
getPerformanceStats.url = (options?: RouteQueryOptions) => {
    return getPerformanceStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
getPerformanceStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPerformanceStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
getPerformanceStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPerformanceStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
    const getPerformanceStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getPerformanceStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
        getPerformanceStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPerformanceStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getPerformanceStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
        getPerformanceStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPerformanceStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getPerformanceStats.form = getPerformanceStatsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
export const getGeographicStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeographicStats.url(options),
    method: 'get',
})

getGeographicStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/geographic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
getGeographicStats.url = (options?: RouteQueryOptions) => {
    return getGeographicStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
getGeographicStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeographicStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
getGeographicStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getGeographicStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
    const getGeographicStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getGeographicStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
        getGeographicStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGeographicStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicStats
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
        getGeographicStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGeographicStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getGeographicStats.form = getGeographicStatsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
export const exportData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})

exportData.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportData.url = (options?: RouteQueryOptions) => {
    return exportData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
    const exportDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
        exportDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
        exportDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportData.form = exportDataForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
export const getMonthlyReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMonthlyReport.url(options),
    method: 'get',
})

getMonthlyReport.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/monthly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
getMonthlyReport.url = (options?: RouteQueryOptions) => {
    return getMonthlyReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
getMonthlyReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMonthlyReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
getMonthlyReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMonthlyReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
    const getMonthlyReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getMonthlyReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
        getMonthlyReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMonthlyReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getMonthlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
        getMonthlyReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMonthlyReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getMonthlyReport.form = getMonthlyReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
export const getQuarterlyReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQuarterlyReport.url(options),
    method: 'get',
})

getQuarterlyReport.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/quarterly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
getQuarterlyReport.url = (options?: RouteQueryOptions) => {
    return getQuarterlyReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
getQuarterlyReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getQuarterlyReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
getQuarterlyReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getQuarterlyReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
    const getQuarterlyReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getQuarterlyReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
        getQuarterlyReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getQuarterlyReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getQuarterlyReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
        getQuarterlyReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getQuarterlyReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getQuarterlyReport.form = getQuarterlyReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
export const getAnnualReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnnualReport.url(options),
    method: 'get',
})

getAnnualReport.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/annual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
getAnnualReport.url = (options?: RouteQueryOptions) => {
    return getAnnualReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
getAnnualReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnnualReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
getAnnualReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAnnualReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
    const getAnnualReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAnnualReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
        getAnnualReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAnnualReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getAnnualReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
        getAnnualReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAnnualReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAnnualReport.form = getAnnualReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
export const getScreeningReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningReport.url(options),
    method: 'get',
})

getScreeningReport.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/screening-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
getScreeningReport.url = (options?: RouteQueryOptions) => {
    return getScreeningReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
getScreeningReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
getScreeningReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getScreeningReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
    const getScreeningReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getScreeningReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
        getScreeningReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
        getScreeningReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getScreeningReport.form = getScreeningReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
export const getIndicatorReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIndicatorReport.url(options),
    method: 'get',
})

getIndicatorReport.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/indicator-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
getIndicatorReport.url = (options?: RouteQueryOptions) => {
    return getIndicatorReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
getIndicatorReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIndicatorReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
getIndicatorReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getIndicatorReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
    const getIndicatorReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getIndicatorReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
        getIndicatorReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getIndicatorReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicatorReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
        getIndicatorReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getIndicatorReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getIndicatorReport.form = getIndicatorReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::generateReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
export const generateReport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReport.url(options),
    method: 'post',
})

generateReport.definition = {
    methods: ["post"],
    url: '/api/v1/admin/reports/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::generateReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
generateReport.url = (options?: RouteQueryOptions) => {
    return generateReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::generateReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
generateReport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::generateReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
    const generateReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateReport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::generateReport
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
        generateReportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateReport.url(options),
            method: 'post',
        })
    
    generateReport.form = generateReportForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
export const exportEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportEvents.url(options),
    method: 'get',
})

exportEvents.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
exportEvents.url = (options?: RouteQueryOptions) => {
    return exportEvents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
exportEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportEvents.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
exportEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportEvents.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
    const exportEventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportEvents.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
        exportEventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportEvents.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
        exportEventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportEvents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportEvents.form = exportEventsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
export const exportScreenings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportScreenings.url(options),
    method: 'get',
})

exportScreenings.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/screenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
exportScreenings.url = (options?: RouteQueryOptions) => {
    return exportScreenings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
exportScreenings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportScreenings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
exportScreenings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportScreenings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
    const exportScreeningsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportScreenings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
        exportScreeningsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportScreenings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
        exportScreeningsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportScreenings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportScreenings.form = exportScreeningsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
export const exportIndicators = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportIndicators.url(options),
    method: 'get',
})

exportIndicators.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
exportIndicators.url = (options?: RouteQueryOptions) => {
    return exportIndicators.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
exportIndicators.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportIndicators.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
exportIndicators.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportIndicators.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
    const exportIndicatorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportIndicators.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
        exportIndicatorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportIndicators.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
        exportIndicatorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportIndicators.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportIndicators.form = exportIndicatorsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
export const exportPatients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPatients.url(options),
    method: 'get',
})

exportPatients.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
exportPatients.url = (options?: RouteQueryOptions) => {
    return exportPatients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
exportPatients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPatients.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
exportPatients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPatients.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
    const exportPatientsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPatients.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
        exportPatientsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPatients.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportPatients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
        exportPatientsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPatients.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPatients.form = exportPatientsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
export const getScreeningTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningTypes.url(options),
    method: 'get',
})

getScreeningTypes.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/screening-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
getScreeningTypes.url = (options?: RouteQueryOptions) => {
    return getScreeningTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
getScreeningTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningTypes.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
getScreeningTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getScreeningTypes.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
    const getScreeningTypesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getScreeningTypes.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
        getScreeningTypesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningTypes.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
        getScreeningTypesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningTypes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getScreeningTypes.form = getScreeningTypesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
export const getEventTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEventTypes.url(options),
    method: 'get',
})

getEventTypes.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/event-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
getEventTypes.url = (options?: RouteQueryOptions) => {
    return getEventTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
getEventTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEventTypes.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
getEventTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEventTypes.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
    const getEventTypesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getEventTypes.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
        getEventTypesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getEventTypes.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getEventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
        getEventTypesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getEventTypes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getEventTypes.form = getEventTypesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
export const getCategories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCategories.url(options),
    method: 'get',
})

getCategories.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
getCategories.url = (options?: RouteQueryOptions) => {
    return getCategories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
getCategories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCategories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
getCategories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCategories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
    const getCategoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getCategories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
        getCategoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getCategories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getCategories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
        getCategoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getCategories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getCategories.form = getCategoriesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
export const getDistricts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDistricts.url(options),
    method: 'get',
})

getDistricts.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
getDistricts.url = (options?: RouteQueryOptions) => {
    return getDistricts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
getDistricts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDistricts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
getDistricts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDistricts.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
    const getDistrictsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDistricts.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
        getDistrictsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDistricts.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getDistricts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
        getDistrictsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDistricts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getDistricts.form = getDistrictsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
export const getProvinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})

getProvinces.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
getProvinces.url = (options?: RouteQueryOptions) => {
    return getProvinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
getProvinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
getProvinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvinces.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
    const getProvincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getProvinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
        getProvincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getProvinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
        getProvincesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinces.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getProvinces.form = getProvincesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
export const viewFacilities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewFacilities.url(options),
    method: 'get',
})

viewFacilities.definition = {
    methods: ["get","head"],
    url: '/admin/manage-facility',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
viewFacilities.url = (options?: RouteQueryOptions) => {
    return viewFacilities.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
viewFacilities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewFacilities.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
viewFacilities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewFacilities.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
    const viewFacilitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewFacilities.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
        viewFacilitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewFacilities.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::viewFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/manage-facility'
 */
        viewFacilitiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewFacilities.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewFacilities.form = viewFacilitiesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
export const indicators = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicators.url(options),
    method: 'get',
})

indicators.definition = {
    methods: ["get","head"],
    url: '/admin/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
indicators.url = (options?: RouteQueryOptions) => {
    return indicators.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
indicators.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicators.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
indicators.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indicators.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
    const indicatorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indicators.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
        indicatorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indicators.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/indicators'
 */
        indicatorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indicators.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indicators.form = indicatorsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
export const kpi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kpi.url(options),
    method: 'get',
})

kpi.definition = {
    methods: ["get","head"],
    url: '/admin/kpi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
kpi.url = (options?: RouteQueryOptions) => {
    return kpi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
kpi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kpi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
kpi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kpi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
    const kpiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: kpi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
        kpiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kpi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::kpi
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/kpi'
 */
        kpiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kpi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    kpi.form = kpiForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
    const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: events.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
        eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/events'
 */
        eventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    events.form = eventsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::reports
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/admin/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
export const getScreenings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreenings.url(options),
    method: 'get',
})

getScreenings.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/screenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
getScreenings.url = (options?: RouteQueryOptions) => {
    return getScreenings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
getScreenings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreenings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
getScreenings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getScreenings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
    const getScreeningsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getScreenings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
        getScreeningsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreenings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screenings'
 */
        getScreeningsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreenings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getScreenings.form = getScreeningsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
export const getGeographicData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeographicData.url(options),
    method: 'get',
})

getGeographicData.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/geographic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
getGeographicData.url = (options?: RouteQueryOptions) => {
    return getGeographicData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
getGeographicData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeographicData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
getGeographicData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getGeographicData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
    const getGeographicDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getGeographicData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
        getGeographicDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGeographicData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getGeographicData
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/geographic'
 */
        getGeographicDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGeographicData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getGeographicData.form = getGeographicDataForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
export const getAppointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointments.url(options),
    method: 'get',
})

getAppointments.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
getAppointments.url = (options?: RouteQueryOptions) => {
    return getAppointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
getAppointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
getAppointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAppointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
    const getAppointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAppointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
        getAppointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getAppointments
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/appointments'
 */
        getAppointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAppointments.form = getAppointmentsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
export const getScreeningDetails = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningDetails.url(options),
    method: 'get',
})

getScreeningDetails.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/screening-details',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
getScreeningDetails.url = (options?: RouteQueryOptions) => {
    return getScreeningDetails.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
getScreeningDetails.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getScreeningDetails.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
getScreeningDetails.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getScreeningDetails.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
    const getScreeningDetailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getScreeningDetails.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
        getScreeningDetailsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningDetails.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getScreeningDetails
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/screening-details'
 */
        getScreeningDetailsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getScreeningDetails.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getScreeningDetails.form = getScreeningDetailsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
export const getFacilities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilities.url(options),
    method: 'get',
})

getFacilities.definition = {
    methods: ["get","head"],
    url: '/v1/admin/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
getFacilities.url = (options?: RouteQueryOptions) => {
    return getFacilities.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
getFacilities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilities.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
getFacilities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFacilities.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
    const getFacilitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getFacilities.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
        getFacilitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFacilities.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getFacilities
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/facilities'
 */
        getFacilitiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFacilities.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getFacilities.form = getFacilitiesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/v1/admin/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
export const getLaboratory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLaboratory.url(options),
    method: 'get',
})

getLaboratory.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/laboratory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
getLaboratory.url = (options?: RouteQueryOptions) => {
    return getLaboratory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
getLaboratory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLaboratory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
getLaboratory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLaboratory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
    const getLaboratoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getLaboratory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
        getLaboratoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLaboratory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getLaboratory
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/laboratory'
 */
        getLaboratoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLaboratory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getLaboratory.form = getLaboratoryForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
export const getReferrals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferrals.url(options),
    method: 'get',
})

getReferrals.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
getReferrals.url = (options?: RouteQueryOptions) => {
    return getReferrals.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
getReferrals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferrals.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
getReferrals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferrals.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
    const getReferralsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getReferrals.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
        getReferralsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferrals.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getReferrals
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/referrals'
 */
        getReferralsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferrals.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getReferrals.form = getReferralsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
export const getIndicators = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIndicators.url(options),
    method: 'get',
})

getIndicators.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
getIndicators.url = (options?: RouteQueryOptions) => {
    return getIndicators.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
getIndicators.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIndicators.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
getIndicators.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getIndicators.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
    const getIndicatorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getIndicators.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
        getIndicatorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getIndicators.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getIndicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/indicators'
 */
        getIndicatorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getIndicators.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getIndicators.form = getIndicatorsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
export const getRecentEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecentEvents.url(options),
    method: 'get',
})

getRecentEvents.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/recent-events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
getRecentEvents.url = (options?: RouteQueryOptions) => {
    return getRecentEvents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
getRecentEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecentEvents.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
getRecentEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRecentEvents.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
    const getRecentEventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRecentEvents.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
        getRecentEventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRecentEvents.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::getRecentEvents
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/recent-events'
 */
        getRecentEventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRecentEvents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRecentEvents.form = getRecentEventsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
export const debugScreenings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debugScreenings.url(options),
    method: 'get',
})

debugScreenings.definition = {
    methods: ["get","head"],
    url: '/v1/admin/dashboard/debug',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
debugScreenings.url = (options?: RouteQueryOptions) => {
    return debugScreenings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
debugScreenings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debugScreenings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
debugScreenings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: debugScreenings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
    const debugScreeningsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: debugScreenings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
        debugScreeningsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debugScreenings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::debugScreenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/v1/admin/dashboard/debug'
 */
        debugScreeningsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debugScreenings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    debugScreenings.form = debugScreeningsForm
const DashboardController = { getDashboardData, getSummary, getTrends, getScreeningStats, getPerformanceStats, getGeographicStats, exportData, getMonthlyReport, getQuarterlyReport, getAnnualReport, getScreeningReport, getIndicatorReport, generateReport, exportEvents, exportScreenings, exportIndicators, exportPatients, getScreeningTypes, getEventTypes, getCategories, getDistricts, getProvinces, dashboard, viewFacilities, indicators, kpi, events, reports, getScreenings, getGeographicData, getAppointments, getScreeningDetails, getFacilities, index, getLaboratory, getReferrals, getIndicators, getRecentEvents, debugScreenings }

export default DashboardController
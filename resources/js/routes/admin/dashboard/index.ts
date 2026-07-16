import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
    const dataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: data.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
        dataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::data
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard'
 */
        dataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    data.form = dataForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
export const summary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(options),
    method: 'get',
})

summary.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
summary.url = (options?: RouteQueryOptions) => {
    return summary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
summary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
summary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: summary.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
    const summaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: summary.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
        summaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: summary.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::summary
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/summary'
 */
        summaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: summary.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    summary.form = summaryForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
export const trends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trends.url(options),
    method: 'get',
})

trends.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/trends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
trends.url = (options?: RouteQueryOptions) => {
    return trends.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
trends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trends.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
trends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trends.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
    const trendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trends.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
        trendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trends.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::trends
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/trends'
 */
        trendsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trends.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    trends.form = trendsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
export const screenings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(options),
    method: 'get',
})

screenings.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/screenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
screenings.url = (options?: RouteQueryOptions) => {
    return screenings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
screenings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
screenings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: screenings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
    const screeningsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: screenings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
        screeningsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screenings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/screenings'
 */
        screeningsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screenings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    screenings.form = screeningsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
export const performance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(options),
    method: 'get',
})

performance.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
performance.url = (options?: RouteQueryOptions) => {
    return performance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
performance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
performance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
    const performanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: performance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
        performanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::performance
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/performance'
 */
        performanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    performance.form = performanceForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
export const geographic = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geographic.url(options),
    method: 'get',
})

geographic.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/geographic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
geographic.url = (options?: RouteQueryOptions) => {
    return geographic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
geographic.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geographic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
geographic.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: geographic.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
    const geographicForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: geographic.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
        geographicForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: geographic.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::geographic
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/geographic'
 */
        geographicForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: geographic.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    geographic.form = geographicForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::exportMethod
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/dashboard/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
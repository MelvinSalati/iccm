import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
export const monthly = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthly.url(options),
    method: 'get',
})

monthly.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/monthly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
monthly.url = (options?: RouteQueryOptions) => {
    return monthly.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
monthly.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthly.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
monthly.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monthly.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
    const monthlyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: monthly.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
        monthlyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monthly.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::monthly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/monthly'
 */
        monthlyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monthly.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    monthly.form = monthlyForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
export const quarterly = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quarterly.url(options),
    method: 'get',
})

quarterly.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/quarterly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
quarterly.url = (options?: RouteQueryOptions) => {
    return quarterly.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
quarterly.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quarterly.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
quarterly.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: quarterly.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
    const quarterlyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: quarterly.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
        quarterlyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: quarterly.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::quarterly
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/quarterly'
 */
        quarterlyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: quarterly.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    quarterly.form = quarterlyForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
export const annual = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: annual.url(options),
    method: 'get',
})

annual.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/annual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
annual.url = (options?: RouteQueryOptions) => {
    return annual.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
annual.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: annual.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
annual.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: annual.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
    const annualForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: annual.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
        annualForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: annual.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::annual
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/annual'
 */
        annualForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: annual.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    annual.form = annualForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
export const screening = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screening.url(options),
    method: 'get',
})

screening.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/screening-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
screening.url = (options?: RouteQueryOptions) => {
    return screening.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
screening.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screening.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
screening.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: screening.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
    const screeningForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: screening.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
        screeningForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screening.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::screening
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/screening-report'
 */
        screeningForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screening.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    screening.form = screeningForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
export const indicator = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicator.url(options),
    method: 'get',
})

indicator.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/indicator-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
indicator.url = (options?: RouteQueryOptions) => {
    return indicator.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
indicator.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicator.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
indicator.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indicator.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
    const indicatorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indicator.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
        indicatorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indicator.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicator
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/indicator-report'
 */
        indicatorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indicator.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indicator.form = indicatorForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::generate
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/api/v1/admin/reports/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::generate
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::generate
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::generate
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::generate
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/reports/generate'
 */
        generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(options),
            method: 'post',
        })
    
    generate.form = generateForm
const reports = {
    monthly: Object.assign(monthly, monthly),
quarterly: Object.assign(quarterly, quarterly),
annual: Object.assign(annual, annual),
screening: Object.assign(screening, screening),
indicator: Object.assign(indicator, indicator),
generate: Object.assign(generate, generate),
}

export default reports
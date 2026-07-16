import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
    const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: events.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
 */
        eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::events
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/events'
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
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
export const screenings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(options),
    method: 'get',
})

screenings.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/screenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
screenings.url = (options?: RouteQueryOptions) => {
    return screenings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
screenings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
screenings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: screenings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
    const screeningsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: screenings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
 */
        screeningsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screenings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::screenings
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/screenings'
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
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
export const indicators = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicators.url(options),
    method: 'get',
})

indicators.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
indicators.url = (options?: RouteQueryOptions) => {
    return indicators.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
indicators.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indicators.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
indicators.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indicators.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
    const indicatorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indicators.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
 */
        indicatorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indicators.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::indicators
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/indicators'
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
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
export const patients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patients.url(options),
    method: 'get',
})

patients.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/export/patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
patients.url = (options?: RouteQueryOptions) => {
    return patients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
patients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patients.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
patients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patients.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
    const patientsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patients.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
        patientsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patients.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::patients
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/export/patients'
 */
        patientsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patients.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patients.form = patientsForm
const exportMethod = {
    events: Object.assign(events, events),
screenings: Object.assign(screenings, screenings),
indicators: Object.assign(indicators, indicators),
patients: Object.assign(patients, patients),
}

export default exportMethod
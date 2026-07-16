import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
export const screeningTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screeningTypes.url(options),
    method: 'get',
})

screeningTypes.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/screening-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
screeningTypes.url = (options?: RouteQueryOptions) => {
    return screeningTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
screeningTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screeningTypes.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
screeningTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: screeningTypes.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
    const screeningTypesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: screeningTypes.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
        screeningTypesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screeningTypes.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::screeningTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/screening-types'
 */
        screeningTypesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screeningTypes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    screeningTypes.form = screeningTypesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
export const eventTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventTypes.url(options),
    method: 'get',
})

eventTypes.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/event-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
eventTypes.url = (options?: RouteQueryOptions) => {
    return eventTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
eventTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventTypes.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
eventTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventTypes.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
    const eventTypesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: eventTypes.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
        eventTypesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventTypes.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::eventTypes
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/event-types'
 */
        eventTypesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventTypes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    eventTypes.form = eventTypesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::categories
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/categories'
 */
        categoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categories.form = categoriesForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
export const districts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(options),
    method: 'get',
})

districts.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
districts.url = (options?: RouteQueryOptions) => {
    return districts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
districts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
districts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districts.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
    const districtsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: districts.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
        districtsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: districts.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::districts
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/districts'
 */
        districtsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: districts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    districts.form = districtsForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
export const provinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/settings/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
provinces.url = (options?: RouteQueryOptions) => {
    return provinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
provinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
provinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
    const provincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: provinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
        provincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::provinces
 * @see app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/api/v1/admin/settings/provinces'
 */
        provincesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    provinces.form = provincesForm
const settings = {
    screeningTypes: Object.assign(screeningTypes, screeningTypes),
eventTypes: Object.assign(eventTypes, eventTypes),
categories: Object.assign(categories, categories),
districts: Object.assign(districts, districts),
provinces: Object.assign(provinces, provinces),
}

export default settings
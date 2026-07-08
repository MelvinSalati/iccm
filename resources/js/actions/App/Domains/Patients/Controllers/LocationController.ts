import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
export const getProvinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})

getProvinces.definition = {
    methods: ["get","head"],
    url: '/api/v1/locations/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
getProvinces.url = (options?: RouteQueryOptions) => {
    return getProvinces.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
getProvinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
getProvinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvinces.url(options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
    const getProvincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getProvinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
 */
        getProvincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\LocationController::getProvinces
 * @see app/Domains/Patients/Controllers/LocationController.php:13
 * @route '/api/v1/locations/provinces'
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
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
export const getDistricts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDistricts.url(options),
    method: 'get',
})

getDistricts.definition = {
    methods: ["get","head"],
    url: '/api/v1/locations/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
getDistricts.url = (options?: RouteQueryOptions) => {
    return getDistricts.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
getDistricts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDistricts.url(options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
getDistricts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDistricts.url(options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
    const getDistrictsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDistricts.url(options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
 */
        getDistrictsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDistricts.url(options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\LocationController::getDistricts
 * @see app/Domains/Patients/Controllers/LocationController.php:20
 * @route '/api/v1/locations/districts'
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
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
export const getFacilities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilities.url(options),
    method: 'get',
})

getFacilities.definition = {
    methods: ["get","head"],
    url: '/api/v1/locations/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
getFacilities.url = (options?: RouteQueryOptions) => {
    return getFacilities.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
getFacilities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilities.url(options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
getFacilities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFacilities.url(options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
    const getFacilitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getFacilities.url(options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
 */
        getFacilitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFacilities.url(options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\LocationController::getFacilities
 * @see app/Domains/Patients/Controllers/LocationController.php:35
 * @route '/api/v1/locations/facilities'
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
const LocationController = { getProvinces, getDistricts, getFacilities }

export default LocationController
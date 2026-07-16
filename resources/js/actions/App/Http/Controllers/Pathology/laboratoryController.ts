import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/patients/{patientUuid}/lab-orders'
 */
const createOrder07887101495b9b0685dd8ce63b1564e0 = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder07887101495b9b0685dd8ce63b1564e0.url(args, options),
    method: 'post',
})

createOrder07887101495b9b0685dd8ce63b1564e0.definition = {
    methods: ["post"],
    url: '/api/v1/patients/{patientUuid}/lab-orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/patients/{patientUuid}/lab-orders'
 */
createOrder07887101495b9b0685dd8ce63b1564e0.url = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientUuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientUuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientUuid: args.patientUuid,
                }

    return createOrder07887101495b9b0685dd8ce63b1564e0.definition.url
            .replace('{patientUuid}', parsedArgs.patientUuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/patients/{patientUuid}/lab-orders'
 */
createOrder07887101495b9b0685dd8ce63b1564e0.post = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder07887101495b9b0685dd8ce63b1564e0.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/patients/{patientUuid}/lab-orders'
 */
    const createOrder07887101495b9b0685dd8ce63b1564e0Form = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createOrder07887101495b9b0685dd8ce63b1564e0.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/patients/{patientUuid}/lab-orders'
 */
        createOrder07887101495b9b0685dd8ce63b1564e0Form.post = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createOrder07887101495b9b0685dd8ce63b1564e0.url(args, options),
            method: 'post',
        })
    
    createOrder07887101495b9b0685dd8ce63b1564e0.form = createOrder07887101495b9b0685dd8ce63b1564e0Form
    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/laboratory/orders'
 */
const createOrderfbb132c8db162d4a838be8b0f54971a4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrderfbb132c8db162d4a838be8b0f54971a4.url(options),
    method: 'post',
})

createOrderfbb132c8db162d4a838be8b0f54971a4.definition = {
    methods: ["post"],
    url: '/api/v1/laboratory/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/laboratory/orders'
 */
createOrderfbb132c8db162d4a838be8b0f54971a4.url = (options?: RouteQueryOptions) => {
    return createOrderfbb132c8db162d4a838be8b0f54971a4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/laboratory/orders'
 */
createOrderfbb132c8db162d4a838be8b0f54971a4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrderfbb132c8db162d4a838be8b0f54971a4.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/laboratory/orders'
 */
    const createOrderfbb132c8db162d4a838be8b0f54971a4Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createOrderfbb132c8db162d4a838be8b0f54971a4.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:97
 * @route '/api/v1/laboratory/orders'
 */
        createOrderfbb132c8db162d4a838be8b0f54971a4Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createOrderfbb132c8db162d4a838be8b0f54971a4.url(options),
            method: 'post',
        })
    
    createOrderfbb132c8db162d4a838be8b0f54971a4.form = createOrderfbb132c8db162d4a838be8b0f54971a4Form

/**
* Multiple routes resolve to \App\Http\Controllers\Pathology\LaboratoryController::createOrder, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `createOrder['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const createOrder = {
    '/api/v1/patients/{patientUuid}/lab-orders': createOrder07887101495b9b0685dd8ce63b1564e0,
    '/api/v1/laboratory/orders': createOrderfbb132c8db162d4a838be8b0f54971a4,
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:358
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
export const sampleAssessment = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sampleAssessment.url(args, options),
    method: 'post',
})

sampleAssessment.definition = {
    methods: ["post"],
    url: '/api/v1/laboratory/orders/{orderId}/sample-assessment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:358
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
sampleAssessment.url = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { orderId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    orderId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        orderId: args.orderId,
                }

    return sampleAssessment.definition.url
            .replace('{orderId}', parsedArgs.orderId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:358
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
sampleAssessment.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sampleAssessment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:358
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
    const sampleAssessmentForm = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sampleAssessment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:358
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
        sampleAssessmentForm.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sampleAssessment.url(args, options),
            method: 'post',
        })
    
    sampleAssessment.form = sampleAssessmentForm
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:513
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
export const enterResults = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enterResults.url(args, options),
    method: 'post',
})

enterResults.definition = {
    methods: ["post"],
    url: '/api/v1/laboratory/orders/{orderId}/results',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:513
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
enterResults.url = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { orderId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    orderId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        orderId: args.orderId,
                }

    return enterResults.definition.url
            .replace('{orderId}', parsedArgs.orderId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:513
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
enterResults.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enterResults.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:513
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
    const enterResultsForm = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enterResults.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:513
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
        enterResultsForm.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enterResults.url(args, options),
            method: 'post',
        })
    
    enterResults.form = enterResultsForm
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
export const viewLaboratoryOrders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'get',
})

viewLaboratoryOrders.definition = {
    methods: ["get","head"],
    url: '/laboratory/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.url = (options?: RouteQueryOptions) => {
    return viewLaboratoryOrders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
    const viewLaboratoryOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewLaboratoryOrders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
        viewLaboratoryOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewLaboratoryOrders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:21
 * @route '/laboratory/orders'
 */
        viewLaboratoryOrdersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewLaboratoryOrders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewLaboratoryOrders.form = viewLaboratoryOrdersForm
const LaboratoryController = { createOrder, sampleAssessment, enterResults, viewLaboratoryOrders }

export default LaboratoryController
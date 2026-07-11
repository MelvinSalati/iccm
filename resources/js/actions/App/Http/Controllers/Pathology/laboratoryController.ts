import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pathology\laboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/laboratoryController.php:14
 * @route '/api/v1/laboratory/orders'
 */
export const createOrder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder.url(options),
    method: 'post',
})

createOrder.definition = {
    methods: ["post"],
    url: '/api/v1/laboratory/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pathology\laboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/laboratoryController.php:14
 * @route '/api/v1/laboratory/orders'
 */
createOrder.url = (options?: RouteQueryOptions) => {
    return createOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\laboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/laboratoryController.php:14
 * @route '/api/v1/laboratory/orders'
 */
createOrder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\laboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/laboratoryController.php:14
 * @route '/api/v1/laboratory/orders'
 */
    const createOrderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createOrder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\laboratoryController::createOrder
 * @see app/Http/Controllers/Pathology/laboratoryController.php:14
 * @route '/api/v1/laboratory/orders'
 */
        createOrderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createOrder.url(options),
            method: 'post',
        })
    
    createOrder.form = createOrderForm
/**
* @see \App\Http\Controllers\Pathology\laboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/laboratoryController.php:43
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
* @see \App\Http\Controllers\Pathology\laboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/laboratoryController.php:43
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
* @see \App\Http\Controllers\Pathology\laboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/laboratoryController.php:43
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
sampleAssessment.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sampleAssessment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\laboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/laboratoryController.php:43
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
    const sampleAssessmentForm = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sampleAssessment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\laboratoryController::sampleAssessment
 * @see app/Http/Controllers/Pathology/laboratoryController.php:43
 * @route '/api/v1/laboratory/orders/{orderId}/sample-assessment'
 */
        sampleAssessmentForm.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sampleAssessment.url(args, options),
            method: 'post',
        })
    
    sampleAssessment.form = sampleAssessmentForm
/**
* @see \App\Http\Controllers\Pathology\laboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/laboratoryController.php:104
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
* @see \App\Http\Controllers\Pathology\laboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/laboratoryController.php:104
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
* @see \App\Http\Controllers\Pathology\laboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/laboratoryController.php:104
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
enterResults.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enterResults.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Pathology\laboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/laboratoryController.php:104
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
    const enterResultsForm = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enterResults.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Pathology\laboratoryController::enterResults
 * @see app/Http/Controllers/Pathology/laboratoryController.php:104
 * @route '/api/v1/laboratory/orders/{orderId}/results'
 */
        enterResultsForm.post = (args: { orderId: string | number } | [orderId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enterResults.url(args, options),
            method: 'post',
        })
    
    enterResults.form = enterResultsForm
/**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
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
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.url = (options?: RouteQueryOptions) => {
    return viewLaboratoryOrders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
 * @route '/laboratory/orders'
 */
    const viewLaboratoryOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewLaboratoryOrders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
 * @route '/laboratory/orders'
 */
        viewLaboratoryOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewLaboratoryOrders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Pathology\laboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:81
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
const laboratoryController = { createOrder, sampleAssessment, enterResults, viewLaboratoryOrders }

export default laboratoryController
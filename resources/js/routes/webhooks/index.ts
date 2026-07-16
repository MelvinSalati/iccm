import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \EventDataController::eventReceived
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
export const eventReceived = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: eventReceived.url(options),
    method: 'post',
})

eventReceived.definition = {
    methods: ["post"],
    url: '/api/webhooks/event-received',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::eventReceived
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
eventReceived.url = (options?: RouteQueryOptions) => {
    return eventReceived.definition.url + queryParams(options)
}

/**
* @see \EventDataController::eventReceived
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
eventReceived.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: eventReceived.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::eventReceived
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
    const eventReceivedForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: eventReceived.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::eventReceived
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
        eventReceivedForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: eventReceived.url(options),
            method: 'post',
        })
    
    eventReceived.form = eventReceivedForm
/**
* @see \EventDataController::labResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
export const labResult = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: labResult.url(options),
    method: 'post',
})

labResult.definition = {
    methods: ["post"],
    url: '/api/webhooks/lab-result',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::labResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
labResult.url = (options?: RouteQueryOptions) => {
    return labResult.definition.url + queryParams(options)
}

/**
* @see \EventDataController::labResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
labResult.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: labResult.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::labResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
    const labResultForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: labResult.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::labResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
        labResultForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: labResult.url(options),
            method: 'post',
        })
    
    labResult.form = labResultForm
/**
* @see \EventDataController::ehr
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
export const ehr = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ehr.url(options),
    method: 'post',
})

ehr.definition = {
    methods: ["post"],
    url: '/api/webhooks/ehr-integration',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::ehr
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
ehr.url = (options?: RouteQueryOptions) => {
    return ehr.definition.url + queryParams(options)
}

/**
* @see \EventDataController::ehr
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
ehr.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ehr.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::ehr
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
    const ehrForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ehr.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::ehr
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
        ehrForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ehr.url(options),
            method: 'post',
        })
    
    ehr.form = ehrForm
const webhooks = {
    eventReceived: Object.assign(eventReceived, eventReceived),
labResult: Object.assign(labResult, labResult),
ehr: Object.assign(ehr, ehr),
}

export default webhooks
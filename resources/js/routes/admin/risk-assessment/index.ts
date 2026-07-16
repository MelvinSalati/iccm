import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/risk-assessment',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
export const highRisk = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: highRisk.url(options),
    method: 'get',
})

highRisk.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/high-risk-patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
highRisk.url = (options?: RouteQueryOptions) => {
    return highRisk.definition.url + queryParams(options)
}

/**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
highRisk.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: highRisk.url(options),
    method: 'get',
})
/**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
highRisk.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: highRisk.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
    const highRiskForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: highRisk.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
        highRiskForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: highRisk.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::highRisk
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
        highRiskForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: highRisk.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    highRisk.form = highRiskForm
/**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
export const factors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: factors.url(options),
    method: 'get',
})

factors.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/risk-factors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
factors.url = (options?: RouteQueryOptions) => {
    return factors.definition.url + queryParams(options)
}

/**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
factors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: factors.url(options),
    method: 'get',
})
/**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
factors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: factors.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
    const factorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: factors.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
        factorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: factors.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::factors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
        factorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: factors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    factors.form = factorsForm
const riskAssessment = {
    store: Object.assign(store, store),
stats: Object.assign(stats, stats),
highRisk: Object.assign(highRisk, highRisk),
factors: Object.assign(factors, factors),
}

export default riskAssessment
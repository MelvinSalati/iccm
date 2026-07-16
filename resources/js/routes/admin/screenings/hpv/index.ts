import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/screenings/hpv/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
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
const hpv = {
    stats: Object.assign(stats, stats),
}

export default hpv
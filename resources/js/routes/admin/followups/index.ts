import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

today.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options)
}

/**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})
/**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
    const todayForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: today.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
        todayForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::today
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
        todayForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    today.form = todayForm
/**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})
/**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
    const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pending.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
        pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::pending
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
        pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pending.form = pendingForm
/**
* @see \EventDataController::complete
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
export const complete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

complete.definition = {
    methods: ["put"],
    url: '/api/v1/admin/follow-ups/{id}/complete',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::complete
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
complete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return complete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::complete
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
complete.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::complete
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
    const completeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::complete
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
        completeForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
export const reschedule = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reschedule.url(args, options),
    method: 'put',
})

reschedule.definition = {
    methods: ["put"],
    url: '/api/v1/admin/follow-ups/{id}/reschedule',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
reschedule.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return reschedule.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
reschedule.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reschedule.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
    const rescheduleForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reschedule.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
        rescheduleForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reschedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reschedule.form = rescheduleForm
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
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
const followups = {
    today: Object.assign(today, today),
pending: Object.assign(pending, pending),
complete: Object.assign(complete, complete),
reschedule: Object.assign(reschedule, reschedule),
stats: Object.assign(stats, stats),
}

export default followups
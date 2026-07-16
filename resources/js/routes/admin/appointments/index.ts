import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \EventDataController::checkin
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
export const checkin = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkin.url(args, options),
    method: 'put',
})

checkin.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/checkin',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::checkin
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
checkin.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return checkin.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::checkin
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
checkin.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkin.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::checkin
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
    const checkinForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkin.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::checkin
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
        checkinForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkin.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    checkin.form = checkinForm
/**
* @see \EventDataController::cancel
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
export const cancel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancel.url(args, options),
    method: 'put',
})

cancel.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/cancel',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::cancel
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
cancel.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::cancel
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
cancel.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancel.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::cancel
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
    const cancelForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::cancel
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
        cancelForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
export const reschedule = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reschedule.url(args, options),
    method: 'put',
})

reschedule.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/reschedule',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
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
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
reschedule.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reschedule.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::reschedule
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
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
 * @route '/api/v1/admin/appointments/{id}/reschedule'
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
 * @route '/api/v1/admin/appointments/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/appointments/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
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
const appointments = {
    store: Object.assign(store, store),
index: Object.assign(index, index),
checkin: Object.assign(checkin, checkin),
cancel: Object.assign(cancel, cancel),
reschedule: Object.assign(reschedule, reschedule),
stats: Object.assign(stats, stats),
}

export default appointments
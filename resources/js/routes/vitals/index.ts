import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
export const current = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(args, options),
    method: 'get',
})

current.definition = {
    methods: ["get","head"],
    url: '/api/v1/patients/{patientuuid}/vitals/current',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
current.url = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientuuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                }

    return current.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
current.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
current.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: current.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
    const currentForm = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: current.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
        currentForm.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: current.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VitalsController::current
 * @see app/Http/Controllers/VitalsController.php:143
 * @route '/api/v1/patients/{patientuuid}/vitals/current'
 */
        currentForm.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: current.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    current.form = currentForm
/**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
export const history = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/api/v1/patients/{patientuuid}/vitals/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
history.url = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientuuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                }

    return history.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
history.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
history.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
    const historyForm = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
        historyForm.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VitalsController::history
 * @see app/Http/Controllers/VitalsController.php:215
 * @route '/api/v1/patients/{patientuuid}/vitals/history'
 */
        historyForm.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
export const stats = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/patients/{patientuuid}/vitals/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
stats.url = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientuuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                }

    return stats.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
stats.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
stats.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
    const statsForm = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
        statsForm.get = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VitalsController::stats
 * @see app/Http/Controllers/VitalsController.php:350
 * @route '/api/v1/patients/{patientuuid}/vitals/stats'
 */
        statsForm.head = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
export const forVisit = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forVisit.url(args, options),
    method: 'get',
})

forVisit.definition = {
    methods: ["get","head"],
    url: '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
forVisit.url = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                    visitId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                                visitId: args.visitId,
                }

    return forVisit.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace('{visitId}', parsedArgs.visitId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
forVisit.get = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forVisit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
forVisit.head = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forVisit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
    const forVisitForm = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: forVisit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
        forVisitForm.get = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forVisit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VitalsController::forVisit
 * @see app/Http/Controllers/VitalsController.php:181
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
        forVisitForm.head = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forVisit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    forVisit.form = forVisitForm
/**
* @see \App\Http\Controllers\VitalsController::store
 * @see app/Http/Controllers/VitalsController.php:20
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
export const store = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VitalsController::store
 * @see app/Http/Controllers/VitalsController.php:20
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
store.url = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                    visitId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                                visitId: args.visitId,
                }

    return store.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace('{visitId}', parsedArgs.visitId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::store
 * @see app/Http/Controllers/VitalsController.php:20
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
store.post = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VitalsController::store
 * @see app/Http/Controllers/VitalsController.php:20
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
    const storeForm = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VitalsController::store
 * @see app/Http/Controllers/VitalsController.php:20
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/vitals'
 */
        storeForm.post = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\VitalsController::update
 * @see app/Http/Controllers/VitalsController.php:264
 * @route '/api/v1/patients/{patientuuid}/vitals/{vitalId}'
 */
export const update = (args: { patientuuid: string | number, vitalId: string | number } | [patientuuid: string | number, vitalId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/patients/{patientuuid}/vitals/{vitalId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\VitalsController::update
 * @see app/Http/Controllers/VitalsController.php:264
 * @route '/api/v1/patients/{patientuuid}/vitals/{vitalId}'
 */
update.url = (args: { patientuuid: string | number, vitalId: string | number } | [patientuuid: string | number, vitalId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                    vitalId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                                vitalId: args.vitalId,
                }

    return update.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace('{vitalId}', parsedArgs.vitalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VitalsController::update
 * @see app/Http/Controllers/VitalsController.php:264
 * @route '/api/v1/patients/{patientuuid}/vitals/{vitalId}'
 */
update.put = (args: { patientuuid: string | number, vitalId: string | number } | [patientuuid: string | number, vitalId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\VitalsController::update
 * @see app/Http/Controllers/VitalsController.php:264
 * @route '/api/v1/patients/{patientuuid}/vitals/{vitalId}'
 */
    const updateForm = (args: { patientuuid: string | number, vitalId: string | number } | [patientuuid: string | number, vitalId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VitalsController::update
 * @see app/Http/Controllers/VitalsController.php:264
 * @route '/api/v1/patients/{patientuuid}/vitals/{vitalId}'
 */
        updateForm.put = (args: { patientuuid: string | number, vitalId: string | number } | [patientuuid: string | number, vitalId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const vitals = {
    current: Object.assign(current, current),
history: Object.assign(history, history),
stats: Object.assign(stats, stats),
forVisit: Object.assign(forVisit, forVisit),
store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default vitals
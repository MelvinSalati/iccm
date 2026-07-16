import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
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
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \EventDataController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/admin/events/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \EventDataController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/events/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \EventDataController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \EventDataController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \EventDataController::updateResult
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/result'
 */
export const updateResult = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateResult.url(args, options),
    method: 'put',
})

updateResult.definition = {
    methods: ["put"],
    url: '/api/v1/admin/events/{id}/result',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::updateResult
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/result'
 */
updateResult.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateResult.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::updateResult
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/result'
 */
updateResult.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateResult.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::updateResult
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/result'
 */
    const updateResultForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateResult.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::updateResult
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/result'
 */
        updateResultForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateResult.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateResult.form = updateResultForm
/**
* @see \EventDataController::updateStatus
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/api/v1/admin/events/{id}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::updateStatus
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::updateStatus
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/status'
 */
updateStatus.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::updateStatus
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::updateStatus
 * @see [unknown]:0
 * @route '/api/v1/admin/events/{id}/status'
 */
        updateStatusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
const patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440 = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, options),
    method: 'get',
})

patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events/patient/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
    const patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440Form = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
        patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440Form.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
        patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440Form.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440.form = patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440Form
    /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
const patientHistoryc06a975a23cba7764f89adbd720d27a8 = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, options),
    method: 'get',
})

patientHistoryc06a975a23cba7764f89adbd720d27a8.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/history/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
patientHistoryc06a975a23cba7764f89adbd720d27a8.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return patientHistoryc06a975a23cba7764f89adbd720d27a8.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
patientHistoryc06a975a23cba7764f89adbd720d27a8.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
patientHistoryc06a975a23cba7764f89adbd720d27a8.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
    const patientHistoryc06a975a23cba7764f89adbd720d27a8Form = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
        patientHistoryc06a975a23cba7764f89adbd720d27a8Form.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
        patientHistoryc06a975a23cba7764f89adbd720d27a8Form.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistoryc06a975a23cba7764f89adbd720d27a8.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientHistoryc06a975a23cba7764f89adbd720d27a8.form = patientHistoryc06a975a23cba7764f89adbd720d27a8Form

/**
* Multiple routes resolve to \EventDataController::patientHistory, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `patientHistory['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const patientHistory = {
    '/api/v1/admin/events/patient/{patientId}': patientHistory4e2b7d0cdcfa06c6c8fdf2770be45440,
    '/api/v1/admin/patients/history/{patientId}': patientHistoryc06a975a23cba7764f89adbd720d27a8,
}

/**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
export const dailySchedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailySchedule.url(options),
    method: 'get',
})

dailySchedule.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events/daily-schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
dailySchedule.url = (options?: RouteQueryOptions) => {
    return dailySchedule.definition.url + queryParams(options)
}

/**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
dailySchedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailySchedule.url(options),
    method: 'get',
})
/**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
dailySchedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dailySchedule.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
    const dailyScheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dailySchedule.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
        dailyScheduleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dailySchedule.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::dailySchedule
 * @see [unknown]:0
 * @route '/api/v1/admin/events/daily-schedule'
 */
        dailyScheduleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dailySchedule.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dailySchedule.form = dailyScheduleForm
/**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
    const statisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statistics.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
        statisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistics.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::statistics
 * @see [unknown]:0
 * @route '/api/v1/admin/events/statistics'
 */
        statisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statistics.form = statisticsForm
/**
* @see \EventDataController::recordHPV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
export const recordHPV = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordHPV.url(options),
    method: 'post',
})

recordHPV.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/hpv',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordHPV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
recordHPV.url = (options?: RouteQueryOptions) => {
    return recordHPV.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordHPV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
recordHPV.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordHPV.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordHPV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
    const recordHPVForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordHPV.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordHPV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
        recordHPVForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordHPV.url(options),
            method: 'post',
        })
    
    recordHPV.form = recordHPVForm
/**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
export const getHPVStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHPVStats.url(options),
    method: 'get',
})

getHPVStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/screenings/hpv/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
getHPVStats.url = (options?: RouteQueryOptions) => {
    return getHPVStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
getHPVStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHPVStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
getHPVStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHPVStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
    const getHPVStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getHPVStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
        getHPVStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHPVStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getHPVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv/stats'
 */
        getHPVStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHPVStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getHPVStats.form = getHPVStatsForm
/**
* @see \EventDataController::recordVIA
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
export const recordVIA = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordVIA.url(options),
    method: 'post',
})

recordVIA.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/via',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordVIA
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
recordVIA.url = (options?: RouteQueryOptions) => {
    return recordVIA.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordVIA
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
recordVIA.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordVIA.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordVIA
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
    const recordVIAForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordVIA.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordVIA
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
        recordVIAForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordVIA.url(options),
            method: 'post',
        })
    
    recordVIA.form = recordVIAForm
/**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
export const getVIAStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVIAStats.url(options),
    method: 'get',
})

getVIAStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/screenings/via/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
getVIAStats.url = (options?: RouteQueryOptions) => {
    return getVIAStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
getVIAStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVIAStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
getVIAStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVIAStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
    const getVIAStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getVIAStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
        getVIAStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getVIAStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getVIAStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via/stats'
 */
        getVIAStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getVIAStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getVIAStats.form = getVIAStatsForm
/**
* @see \EventDataController::recordHIV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
export const recordHIV = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordHIV.url(options),
    method: 'post',
})

recordHIV.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/hiv',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordHIV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
recordHIV.url = (options?: RouteQueryOptions) => {
    return recordHIV.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordHIV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
recordHIV.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordHIV.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordHIV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
    const recordHIVForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordHIV.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordHIV
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
        recordHIVForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordHIV.url(options),
            method: 'post',
        })
    
    recordHIV.form = recordHIVForm
/**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
export const getHIVStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHIVStats.url(options),
    method: 'get',
})

getHIVStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/screenings/hiv/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
getHIVStats.url = (options?: RouteQueryOptions) => {
    return getHIVStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
getHIVStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHIVStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
getHIVStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHIVStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
    const getHIVStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getHIVStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
        getHIVStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHIVStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getHIVStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv/stats'
 */
        getHIVStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHIVStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getHIVStats.form = getHIVStatsForm
/**
* @see \EventDataController::recordBreastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
export const recordBreastCancer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordBreastCancer.url(options),
    method: 'post',
})

recordBreastCancer.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/breast-cancer',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordBreastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
recordBreastCancer.url = (options?: RouteQueryOptions) => {
    return recordBreastCancer.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordBreastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
recordBreastCancer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordBreastCancer.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordBreastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
    const recordBreastCancerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordBreastCancer.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordBreastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
        recordBreastCancerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordBreastCancer.url(options),
            method: 'post',
        })
    
    recordBreastCancer.form = recordBreastCancerForm
/**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
export const getBreastCancerStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBreastCancerStats.url(options),
    method: 'get',
})

getBreastCancerStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/screenings/breast-cancer/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
getBreastCancerStats.url = (options?: RouteQueryOptions) => {
    return getBreastCancerStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
getBreastCancerStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBreastCancerStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
getBreastCancerStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getBreastCancerStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
    const getBreastCancerStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getBreastCancerStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
        getBreastCancerStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getBreastCancerStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getBreastCancerStats
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer/stats'
 */
        getBreastCancerStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getBreastCancerStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getBreastCancerStats.form = getBreastCancerStatsForm
/**
* @see \EventDataController::recordLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test'
 */
export const recordLabTest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordLabTest.url(options),
    method: 'post',
})

recordLabTest.definition = {
    methods: ["post"],
    url: '/api/v1/admin/laboratory/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test'
 */
recordLabTest.url = (options?: RouteQueryOptions) => {
    return recordLabTest.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test'
 */
recordLabTest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordLabTest.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test'
 */
    const recordLabTestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordLabTest.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test'
 */
        recordLabTestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordLabTest.url(options),
            method: 'post',
        })
    
    recordLabTest.form = recordLabTestForm
/**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
export const getLabTests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTests.url(options),
    method: 'get',
})

getLabTests.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/laboratory/tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
getLabTests.url = (options?: RouteQueryOptions) => {
    return getLabTests.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
getLabTests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTests.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
getLabTests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLabTests.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
    const getLabTestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getLabTests.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
        getLabTestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabTests.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getLabTests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
        getLabTestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabTests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getLabTests.form = getLabTestsForm
/**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
export const getLabTest = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTest.url(args, options),
    method: 'get',
})

getLabTest.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/laboratory/test/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
getLabTest.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getLabTest.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
getLabTest.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabTest.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
getLabTest.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLabTest.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
    const getLabTestForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getLabTest.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
        getLabTestForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabTest.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::getLabTest
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}'
 */
        getLabTestForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabTest.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getLabTest.form = getLabTestForm
/**
* @see \EventDataController::updateLabResult
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}/result'
 */
export const updateLabResult = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLabResult.url(args, options),
    method: 'put',
})

updateLabResult.definition = {
    methods: ["put"],
    url: '/api/v1/admin/laboratory/test/{id}/result',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::updateLabResult
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}/result'
 */
updateLabResult.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateLabResult.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::updateLabResult
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}/result'
 */
updateLabResult.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLabResult.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::updateLabResult
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}/result'
 */
    const updateLabResultForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateLabResult.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::updateLabResult
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/test/{id}/result'
 */
        updateLabResultForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateLabResult.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateLabResult.form = updateLabResultForm
/**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
export const getLabStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabStats.url(options),
    method: 'get',
})

getLabStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/laboratory/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
getLabStats.url = (options?: RouteQueryOptions) => {
    return getLabStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
getLabStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLabStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
getLabStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLabStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
    const getLabStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getLabStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
        getLabStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getLabStats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
        getLabStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getLabStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getLabStats.form = getLabStatsForm
/**
* @see \EventDataController::recordReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
export const recordReferral = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordReferral.url(options),
    method: 'post',
})

recordReferral.definition = {
    methods: ["post"],
    url: '/api/v1/admin/referrals',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
recordReferral.url = (options?: RouteQueryOptions) => {
    return recordReferral.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
recordReferral.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordReferral.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
    const recordReferralForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordReferral.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
        recordReferralForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordReferral.url(options),
            method: 'post',
        })
    
    recordReferral.form = recordReferralForm
/**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
export const getReferrals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferrals.url(options),
    method: 'get',
})

getReferrals.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
getReferrals.url = (options?: RouteQueryOptions) => {
    return getReferrals.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
getReferrals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferrals.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
getReferrals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferrals.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
    const getReferralsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getReferrals.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
        getReferralsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferrals.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getReferrals
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals'
 */
        getReferralsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferrals.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getReferrals.form = getReferralsForm
/**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
export const getReferralStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferralStats.url(options),
    method: 'get',
})

getReferralStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/referrals/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
getReferralStats.url = (options?: RouteQueryOptions) => {
    return getReferralStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
getReferralStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReferralStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
getReferralStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReferralStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
    const getReferralStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getReferralStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
        getReferralStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferralStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getReferralStats
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/stats'
 */
        getReferralStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getReferralStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getReferralStats.form = getReferralStatsForm
/**
* @see \EventDataController::completeReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/{id}/complete'
 */
export const completeReferral = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: completeReferral.url(args, options),
    method: 'put',
})

completeReferral.definition = {
    methods: ["put"],
    url: '/api/v1/admin/referrals/{id}/complete',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::completeReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/{id}/complete'
 */
completeReferral.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeReferral.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::completeReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/{id}/complete'
 */
completeReferral.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: completeReferral.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::completeReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/{id}/complete'
 */
    const completeReferralForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeReferral.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::completeReferral
 * @see [unknown]:0
 * @route '/api/v1/admin/referrals/{id}/complete'
 */
        completeReferralForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeReferral.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    completeReferral.form = completeReferralForm
/**
* @see \EventDataController::recordAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
export const recordAppointment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordAppointment.url(options),
    method: 'post',
})

recordAppointment.definition = {
    methods: ["post"],
    url: '/api/v1/admin/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
recordAppointment.url = (options?: RouteQueryOptions) => {
    return recordAppointment.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
recordAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordAppointment.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
    const recordAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordAppointment.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        recordAppointmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordAppointment.url(options),
            method: 'post',
        })
    
    recordAppointment.form = recordAppointmentForm
/**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
export const getAppointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointments.url(options),
    method: 'get',
})

getAppointments.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
getAppointments.url = (options?: RouteQueryOptions) => {
    return getAppointments.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
getAppointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointments.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
getAppointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAppointments.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
    const getAppointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAppointments.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        getAppointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointments.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getAppointments
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments'
 */
        getAppointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAppointments.form = getAppointmentsForm
/**
* @see \EventDataController::checkInAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
export const checkInAppointment = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkInAppointment.url(args, options),
    method: 'put',
})

checkInAppointment.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/checkin',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::checkInAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
checkInAppointment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return checkInAppointment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::checkInAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
checkInAppointment.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: checkInAppointment.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::checkInAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
    const checkInAppointmentForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkInAppointment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::checkInAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/checkin'
 */
        checkInAppointmentForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkInAppointment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    checkInAppointment.form = checkInAppointmentForm
/**
* @see \EventDataController::cancelAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
export const cancelAppointment = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancelAppointment.url(args, options),
    method: 'put',
})

cancelAppointment.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/cancel',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::cancelAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
cancelAppointment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancelAppointment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::cancelAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
cancelAppointment.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancelAppointment.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::cancelAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
    const cancelAppointmentForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelAppointment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::cancelAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/cancel'
 */
        cancelAppointmentForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelAppointment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancelAppointment.form = cancelAppointmentForm
/**
* @see \EventDataController::rescheduleAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
export const rescheduleAppointment = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rescheduleAppointment.url(args, options),
    method: 'put',
})

rescheduleAppointment.definition = {
    methods: ["put"],
    url: '/api/v1/admin/appointments/{id}/reschedule',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::rescheduleAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
rescheduleAppointment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rescheduleAppointment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::rescheduleAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
rescheduleAppointment.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rescheduleAppointment.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::rescheduleAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
    const rescheduleAppointmentForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rescheduleAppointment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::rescheduleAppointment
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/{id}/reschedule'
 */
        rescheduleAppointmentForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rescheduleAppointment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    rescheduleAppointment.form = rescheduleAppointmentForm
/**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
export const getAppointmentStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointmentStats.url(options),
    method: 'get',
})

getAppointmentStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/appointments/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
getAppointmentStats.url = (options?: RouteQueryOptions) => {
    return getAppointmentStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
getAppointmentStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAppointmentStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
getAppointmentStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAppointmentStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
    const getAppointmentStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAppointmentStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
        getAppointmentStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointmentStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getAppointmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/appointments/stats'
 */
        getAppointmentStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAppointmentStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAppointmentStats.form = getAppointmentStatsForm
/**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
export const patientSummary = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientSummary.url(args, options),
    method: 'get',
})

patientSummary.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/summary/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
patientSummary.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return patientSummary.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
patientSummary.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientSummary.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
patientSummary.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientSummary.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
    const patientSummaryForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientSummary.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
        patientSummaryForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientSummary.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientSummary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
        patientSummaryForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientSummary.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientSummary.form = patientSummaryForm
/**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
export const patientScreenings = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientScreenings.url(args, options),
    method: 'get',
})

patientScreenings.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/screenings/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
patientScreenings.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return patientScreenings.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
patientScreenings.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientScreenings.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
patientScreenings.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientScreenings.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
    const patientScreeningsForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientScreenings.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
        patientScreeningsForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientScreenings.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientScreenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
        patientScreeningsForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientScreenings.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientScreenings.form = patientScreeningsForm
/**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
export const patientFollowUps = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientFollowUps.url(args, options),
    method: 'get',
})

patientFollowUps.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/follow-ups/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
patientFollowUps.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return patientFollowUps.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
patientFollowUps.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientFollowUps.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
patientFollowUps.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientFollowUps.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
    const patientFollowUpsForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientFollowUps.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
        patientFollowUpsForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientFollowUps.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
        patientFollowUpsForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientFollowUps.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientFollowUps.form = patientFollowUpsForm
/**
* @see \EventDataController::recordRiskAssessment
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
export const recordRiskAssessment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordRiskAssessment.url(options),
    method: 'post',
})

recordRiskAssessment.definition = {
    methods: ["post"],
    url: '/api/v1/admin/risk-assessment',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::recordRiskAssessment
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
recordRiskAssessment.url = (options?: RouteQueryOptions) => {
    return recordRiskAssessment.definition.url + queryParams(options)
}

/**
* @see \EventDataController::recordRiskAssessment
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
recordRiskAssessment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordRiskAssessment.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::recordRiskAssessment
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
    const recordRiskAssessmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordRiskAssessment.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::recordRiskAssessment
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment'
 */
        recordRiskAssessmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordRiskAssessment.url(options),
            method: 'post',
        })
    
    recordRiskAssessment.form = recordRiskAssessmentForm
/**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
export const getRiskAssessmentStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiskAssessmentStats.url(options),
    method: 'get',
})

getRiskAssessmentStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
getRiskAssessmentStats.url = (options?: RouteQueryOptions) => {
    return getRiskAssessmentStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
getRiskAssessmentStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiskAssessmentStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
getRiskAssessmentStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiskAssessmentStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
    const getRiskAssessmentStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRiskAssessmentStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
        getRiskAssessmentStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRiskAssessmentStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getRiskAssessmentStats
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/stats'
 */
        getRiskAssessmentStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRiskAssessmentStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRiskAssessmentStats.form = getRiskAssessmentStatsForm
/**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
export const getHighRiskPatients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHighRiskPatients.url(options),
    method: 'get',
})

getHighRiskPatients.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/high-risk-patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
getHighRiskPatients.url = (options?: RouteQueryOptions) => {
    return getHighRiskPatients.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
getHighRiskPatients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHighRiskPatients.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
getHighRiskPatients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHighRiskPatients.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
    const getHighRiskPatientsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getHighRiskPatients.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
        getHighRiskPatientsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHighRiskPatients.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getHighRiskPatients
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/high-risk-patients'
 */
        getHighRiskPatientsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHighRiskPatients.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getHighRiskPatients.form = getHighRiskPatientsForm
/**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
export const getRiskFactors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiskFactors.url(options),
    method: 'get',
})

getRiskFactors.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/risk-assessment/risk-factors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
getRiskFactors.url = (options?: RouteQueryOptions) => {
    return getRiskFactors.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
getRiskFactors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiskFactors.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
getRiskFactors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiskFactors.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
    const getRiskFactorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRiskFactors.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
        getRiskFactorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRiskFactors.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getRiskFactors
 * @see [unknown]:0
 * @route '/api/v1/admin/risk-assessment/risk-factors'
 */
        getRiskFactorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRiskFactors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRiskFactors.form = getRiskFactorsForm
/**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
export const getTodayFollowUps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTodayFollowUps.url(options),
    method: 'get',
})

getTodayFollowUps.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
getTodayFollowUps.url = (options?: RouteQueryOptions) => {
    return getTodayFollowUps.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
getTodayFollowUps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTodayFollowUps.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
getTodayFollowUps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTodayFollowUps.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
    const getTodayFollowUpsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getTodayFollowUps.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
        getTodayFollowUpsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTodayFollowUps.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getTodayFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/today'
 */
        getTodayFollowUpsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTodayFollowUps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getTodayFollowUps.form = getTodayFollowUpsForm
/**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
export const getPendingFollowUps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendingFollowUps.url(options),
    method: 'get',
})

getPendingFollowUps.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
getPendingFollowUps.url = (options?: RouteQueryOptions) => {
    return getPendingFollowUps.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
getPendingFollowUps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendingFollowUps.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
getPendingFollowUps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPendingFollowUps.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
    const getPendingFollowUpsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getPendingFollowUps.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
        getPendingFollowUpsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPendingFollowUps.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getPendingFollowUps
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/pending'
 */
        getPendingFollowUpsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPendingFollowUps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getPendingFollowUps.form = getPendingFollowUpsForm
/**
* @see \EventDataController::completeFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
export const completeFollowUp = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: completeFollowUp.url(args, options),
    method: 'put',
})

completeFollowUp.definition = {
    methods: ["put"],
    url: '/api/v1/admin/follow-ups/{id}/complete',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::completeFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
completeFollowUp.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeFollowUp.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::completeFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
completeFollowUp.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: completeFollowUp.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::completeFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
    const completeFollowUpForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeFollowUp.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::completeFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/complete'
 */
        completeFollowUpForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeFollowUp.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    completeFollowUp.form = completeFollowUpForm
/**
* @see \EventDataController::rescheduleFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
export const rescheduleFollowUp = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rescheduleFollowUp.url(args, options),
    method: 'put',
})

rescheduleFollowUp.definition = {
    methods: ["put"],
    url: '/api/v1/admin/follow-ups/{id}/reschedule',
} satisfies RouteDefinition<["put"]>

/**
* @see \EventDataController::rescheduleFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
rescheduleFollowUp.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rescheduleFollowUp.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::rescheduleFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
rescheduleFollowUp.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rescheduleFollowUp.url(args, options),
    method: 'put',
})

    /**
* @see \EventDataController::rescheduleFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
    const rescheduleFollowUpForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rescheduleFollowUp.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \EventDataController::rescheduleFollowUp
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/{id}/reschedule'
 */
        rescheduleFollowUpForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rescheduleFollowUp.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    rescheduleFollowUp.form = rescheduleFollowUpForm
/**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
export const getFollowUpStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFollowUpStats.url(options),
    method: 'get',
})

getFollowUpStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/follow-ups/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
getFollowUpStats.url = (options?: RouteQueryOptions) => {
    return getFollowUpStats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
getFollowUpStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFollowUpStats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
getFollowUpStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFollowUpStats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
    const getFollowUpStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getFollowUpStats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
        getFollowUpStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFollowUpStats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::getFollowUpStats
 * @see [unknown]:0
 * @route '/api/v1/admin/follow-ups/stats'
 */
        getFollowUpStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFollowUpStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getFollowUpStats.form = getFollowUpStatsForm
/**
* @see \EventDataController::webhookReceive
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
export const webhookReceive = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookReceive.url(options),
    method: 'post',
})

webhookReceive.definition = {
    methods: ["post"],
    url: '/api/webhooks/event-received',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::webhookReceive
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
webhookReceive.url = (options?: RouteQueryOptions) => {
    return webhookReceive.definition.url + queryParams(options)
}

/**
* @see \EventDataController::webhookReceive
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
webhookReceive.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookReceive.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::webhookReceive
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
    const webhookReceiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhookReceive.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::webhookReceive
 * @see [unknown]:0
 * @route '/api/webhooks/event-received'
 */
        webhookReceiveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhookReceive.url(options),
            method: 'post',
        })
    
    webhookReceive.form = webhookReceiveForm
/**
* @see \EventDataController::webhookLabResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
export const webhookLabResult = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookLabResult.url(options),
    method: 'post',
})

webhookLabResult.definition = {
    methods: ["post"],
    url: '/api/webhooks/lab-result',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::webhookLabResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
webhookLabResult.url = (options?: RouteQueryOptions) => {
    return webhookLabResult.definition.url + queryParams(options)
}

/**
* @see \EventDataController::webhookLabResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
webhookLabResult.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookLabResult.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::webhookLabResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
    const webhookLabResultForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhookLabResult.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::webhookLabResult
 * @see [unknown]:0
 * @route '/api/webhooks/lab-result'
 */
        webhookLabResultForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhookLabResult.url(options),
            method: 'post',
        })
    
    webhookLabResult.form = webhookLabResultForm
/**
* @see \EventDataController::webhookEHR
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
export const webhookEHR = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookEHR.url(options),
    method: 'post',
})

webhookEHR.definition = {
    methods: ["post"],
    url: '/api/webhooks/ehr-integration',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::webhookEHR
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
webhookEHR.url = (options?: RouteQueryOptions) => {
    return webhookEHR.definition.url + queryParams(options)
}

/**
* @see \EventDataController::webhookEHR
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
webhookEHR.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookEHR.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::webhookEHR
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
    const webhookEHRForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhookEHR.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::webhookEHR
 * @see [unknown]:0
 * @route '/api/webhooks/ehr-integration'
 */
        webhookEHRForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhookEHR.url(options),
            method: 'post',
        })
    
    webhookEHR.form = webhookEHRForm
const EventDataController = { index, store, show, update, destroy, updateResult, updateStatus, patientHistory, dailySchedule, statistics, recordHPV, getHPVStats, recordVIA, getVIAStats, recordHIV, getHIVStats, recordBreastCancer, getBreastCancerStats, recordLabTest, getLabTests, getLabTest, updateLabResult, getLabStats, recordReferral, getReferrals, getReferralStats, completeReferral, recordAppointment, getAppointments, checkInAppointment, cancelAppointment, rescheduleAppointment, getAppointmentStats, patientSummary, patientScreenings, patientFollowUps, recordRiskAssessment, getRiskAssessmentStats, getHighRiskPatients, getRiskFactors, getTodayFollowUps, getPendingFollowUps, completeFollowUp, rescheduleFollowUp, getFollowUpStats, webhookReceive, webhookLabResult, webhookEHR }

export default EventDataController
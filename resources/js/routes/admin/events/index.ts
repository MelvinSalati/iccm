import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
export const patientHistory = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})

patientHistory.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/events/patient/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return patientHistory.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
patientHistory.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientHistory.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
    const patientHistoryForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
        patientHistoryForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::patientHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/events/patient/{patientId}'
 */
        patientHistoryForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientHistory.form = patientHistoryForm
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
const events = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
updateResult: Object.assign(updateResult, updateResult),
updateStatus: Object.assign(updateStatus, updateStatus),
patientHistory: Object.assign(patientHistory, patientHistory),
dailySchedule: Object.assign(dailySchedule, dailySchedule),
statistics: Object.assign(statistics, statistics),
}

export default events
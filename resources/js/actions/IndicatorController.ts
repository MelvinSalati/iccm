import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \IndicatorController::index
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
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
* @see \IndicatorController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/indicators',
} satisfies RouteDefinition<["post"]>

/**
* @see \IndicatorController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \IndicatorController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \IndicatorController::store
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \IndicatorController::show
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/admin/indicators/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \IndicatorController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \IndicatorController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::update
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/indicators/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \IndicatorController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \IndicatorController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::destroy
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/{id}'
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
* @see \IndicatorController::calculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/calculate'
 */
export const calculate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(options),
    method: 'post',
})

calculate.definition = {
    methods: ["post"],
    url: '/api/v1/admin/indicators/calculate',
} satisfies RouteDefinition<["post"]>

/**
* @see \IndicatorController::calculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/calculate'
 */
calculate.url = (options?: RouteQueryOptions) => {
    return calculate.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::calculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/calculate'
 */
calculate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(options),
    method: 'post',
})

    /**
* @see \IndicatorController::calculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/calculate'
 */
    const calculateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: calculate.url(options),
        method: 'post',
    })

            /**
* @see \IndicatorController::calculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/calculate'
 */
        calculateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: calculate.url(options),
            method: 'post',
        })
    
    calculate.form = calculateForm
/**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
export const performanceHistory = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceHistory.url(args, options),
    method: 'get',
})

performanceHistory.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/performance/{indicatorId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performanceHistory.url = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { indicatorId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    indicatorId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        indicatorId: args.indicatorId,
                }

    return performanceHistory.definition.url
            .replace('{indicatorId}', parsedArgs.indicatorId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performanceHistory.get = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceHistory.url(args, options),
    method: 'get',
})
/**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performanceHistory.head = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceHistory.url(args, options),
    method: 'head',
})

    /**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
    const performanceHistoryForm = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: performanceHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
        performanceHistoryForm.get = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performanceHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \IndicatorController::performanceHistory
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
        performanceHistoryForm.head = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performanceHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    performanceHistory.form = performanceHistoryForm
/**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \IndicatorController::dashboard
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
export const getCategories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCategories.url(options),
    method: 'get',
})

getCategories.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
getCategories.url = (options?: RouteQueryOptions) => {
    return getCategories.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
getCategories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCategories.url(options),
    method: 'get',
})
/**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
getCategories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCategories.url(options),
    method: 'head',
})

    /**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
    const getCategoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getCategories.url(options),
        method: 'get',
    })

            /**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
        getCategoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getCategories.url(options),
            method: 'get',
        })
            /**
* @see \IndicatorController::getCategories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
        getCategoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getCategories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getCategories.form = getCategoriesForm
/**
* @see \IndicatorController::bulkCalculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/bulk-calculate'
 */
export const bulkCalculate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkCalculate.url(options),
    method: 'post',
})

bulkCalculate.definition = {
    methods: ["post"],
    url: '/api/v1/admin/indicators/bulk-calculate',
} satisfies RouteDefinition<["post"]>

/**
* @see \IndicatorController::bulkCalculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/bulk-calculate'
 */
bulkCalculate.url = (options?: RouteQueryOptions) => {
    return bulkCalculate.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::bulkCalculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/bulk-calculate'
 */
bulkCalculate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkCalculate.url(options),
    method: 'post',
})

    /**
* @see \IndicatorController::bulkCalculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/bulk-calculate'
 */
    const bulkCalculateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkCalculate.url(options),
        method: 'post',
    })

            /**
* @see \IndicatorController::bulkCalculate
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/bulk-calculate'
 */
        bulkCalculateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkCalculate.url(options),
            method: 'post',
        })
    
    bulkCalculate.form = bulkCalculateForm
/**
* @see \IndicatorController::resetIndicator
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
export const resetIndicator = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetIndicator.url(options),
    method: 'post',
})

resetIndicator.definition = {
    methods: ["post"],
    url: '/api/v1/admin/indicators/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \IndicatorController::resetIndicator
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
resetIndicator.url = (options?: RouteQueryOptions) => {
    return resetIndicator.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::resetIndicator
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
resetIndicator.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetIndicator.url(options),
    method: 'post',
})

    /**
* @see \IndicatorController::resetIndicator
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
    const resetIndicatorForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resetIndicator.url(options),
        method: 'post',
    })

            /**
* @see \IndicatorController::resetIndicator
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
        resetIndicatorForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resetIndicator.url(options),
            method: 'post',
        })
    
    resetIndicator.form = resetIndicatorForm
/**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
export const publicIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})

publicIndex.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/indicators',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
publicIndex.url = (options?: RouteQueryOptions) => {
    return publicIndex.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
publicIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})
/**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
publicIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicIndex.url(options),
    method: 'head',
})

    /**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
    const publicIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicIndex.url(options),
        method: 'get',
    })

            /**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
        publicIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url(options),
            method: 'get',
        })
            /**
* @see \IndicatorController::publicIndex
 * @see [unknown]:0
 * @route '/api/v1/public/indicators'
 */
        publicIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicIndex.form = publicIndexForm
/**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
export const publicShow = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})

publicShow.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/indicators/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
publicShow.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return publicShow.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
publicShow.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})
/**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
publicShow.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicShow.url(args, options),
    method: 'head',
})

    /**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
    const publicShowForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicShow.url(args, options),
        method: 'get',
    })

            /**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
        publicShowForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicShow.url(args, options),
            method: 'get',
        })
            /**
* @see \IndicatorController::publicShow
 * @see [unknown]:0
 * @route '/api/v1/public/indicators/{id}'
 */
        publicShowForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicShow.form = publicShowForm
const IndicatorController = { index, store, show, update, destroy, calculate, performanceHistory, dashboard, getCategories, bulkCalculate, resetIndicator, publicIndex, publicShow }

export default IndicatorController
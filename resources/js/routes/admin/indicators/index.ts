import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
export const performance = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

performance.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/performance/{indicatorId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performance.url = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performance.definition.url
            .replace('{indicatorId}', parsedArgs.indicatorId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performance.get = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})
/**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
performance.head = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performance.url(args, options),
    method: 'head',
})

    /**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
    const performanceForm = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: performance.url(args, options),
        method: 'get',
    })

            /**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
        performanceForm.get = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performance.url(args, options),
            method: 'get',
        })
            /**
* @see \IndicatorController::performance
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/performance/{indicatorId}'
 */
        performanceForm.head = (args: { indicatorId: string | number } | [indicatorId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: performance.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    performance.form = performanceForm
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
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/indicators/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \IndicatorController::categories
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/categories'
 */
        categoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categories.form = categoriesForm
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
* @see \IndicatorController::reset
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/api/v1/admin/indicators/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \IndicatorController::reset
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \IndicatorController::reset
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

    /**
* @see \IndicatorController::reset
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
    const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reset.url(options),
        method: 'post',
    })

            /**
* @see \IndicatorController::reset
 * @see [unknown]:0
 * @route '/api/v1/admin/indicators/reset'
 */
        resetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reset.url(options),
            method: 'post',
        })
    
    reset.form = resetForm
const indicators = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
calculate: Object.assign(calculate, calculate),
performance: Object.assign(performance, performance),
dashboard: Object.assign(dashboard, dashboard),
categories: Object.assign(categories, categories),
bulkCalculate: Object.assign(bulkCalculate, bulkCalculate),
reset: Object.assign(reset, reset),
}

export default indicators
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::store
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:34
 * @route '/api/v1/admin/facilities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/facilities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::store
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:34
 * @route '/api/v1/admin/facilities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::store
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:34
 * @route '/api/v1/admin/facilities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::store
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:34
 * @route '/api/v1/admin/facilities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::store
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:34
 * @route '/api/v1/admin/facilities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/facilities/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::show
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:59
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::update
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:68
 * @route '/api/v1/admin/facilities/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/admin/facilities/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::update
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:68
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::update
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:68
 * @route '/api/v1/admin/facilities/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::update
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:68
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::update
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:68
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::destroy
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:95
 * @route '/api/v1/admin/facilities/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/facilities/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::destroy
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:95
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::destroy
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:95
 * @route '/api/v1/admin/facilities/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::destroy
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:95
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::destroy
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:95
 * @route '/api/v1/admin/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
export const stats = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/facilities/{id}/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
stats.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return stats.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
stats.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
stats.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
    const statsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
        statsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::stats
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:115
 * @route '/api/v1/admin/facilities/{id}/stats'
 */
        statsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
const facilities = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
stats: Object.assign(stats, stats),
}

export default facilities
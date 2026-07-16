import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
const indexf8be9a0968dd75d021de85cc93a10a76 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf8be9a0968dd75d021de85cc93a10a76.url(options),
    method: 'get',
})

indexf8be9a0968dd75d021de85cc93a10a76.definition = {
    methods: ["get","head"],
    url: '/api/v1/locations/enrolled-facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
indexf8be9a0968dd75d021de85cc93a10a76.url = (options?: RouteQueryOptions) => {
    return indexf8be9a0968dd75d021de85cc93a10a76.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
indexf8be9a0968dd75d021de85cc93a10a76.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf8be9a0968dd75d021de85cc93a10a76.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
indexf8be9a0968dd75d021de85cc93a10a76.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf8be9a0968dd75d021de85cc93a10a76.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
    const indexf8be9a0968dd75d021de85cc93a10a76Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexf8be9a0968dd75d021de85cc93a10a76.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
        indexf8be9a0968dd75d021de85cc93a10a76Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf8be9a0968dd75d021de85cc93a10a76.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/locations/enrolled-facilities'
 */
        indexf8be9a0968dd75d021de85cc93a10a76Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf8be9a0968dd75d021de85cc93a10a76.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexf8be9a0968dd75d021de85cc93a10a76.form = indexf8be9a0968dd75d021de85cc93a10a76Form
    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
const index047f7b50949e4d053fffe61da96c0fbe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index047f7b50949e4d053fffe61da96c0fbe.url(options),
    method: 'get',
})

index047f7b50949e4d053fffe61da96c0fbe.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index047f7b50949e4d053fffe61da96c0fbe.url = (options?: RouteQueryOptions) => {
    return index047f7b50949e4d053fffe61da96c0fbe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index047f7b50949e4d053fffe61da96c0fbe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index047f7b50949e4d053fffe61da96c0fbe.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
index047f7b50949e4d053fffe61da96c0fbe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index047f7b50949e4d053fffe61da96c0fbe.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
    const index047f7b50949e4d053fffe61da96c0fbeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index047f7b50949e4d053fffe61da96c0fbe.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
        index047f7b50949e4d053fffe61da96c0fbeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index047f7b50949e4d053fffe61da96c0fbe.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::index
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:16
 * @route '/api/v1/admin/facilities'
 */
        index047f7b50949e4d053fffe61da96c0fbeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index047f7b50949e4d053fffe61da96c0fbe.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index047f7b50949e4d053fffe61da96c0fbe.form = index047f7b50949e4d053fffe61da96c0fbeForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\EnrolledFacilityController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/v1/locations/enrolled-facilities': indexf8be9a0968dd75d021de85cc93a10a76,
    '/api/v1/admin/facilities': index047f7b50949e4d053fffe61da96c0fbe,
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
export const getFacilityById = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilityById.url(args, options),
    method: 'get',
})

getFacilityById.definition = {
    methods: ["get","head"],
    url: '/api/v1/locations/facilities/{facilityId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
getFacilityById.url = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facilityId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    facilityId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facilityId: args.facilityId,
                }

    return getFacilityById.definition.url
            .replace('{facilityId}', parsedArgs.facilityId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
getFacilityById.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFacilityById.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
getFacilityById.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFacilityById.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
    const getFacilityByIdForm = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getFacilityById.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
        getFacilityByIdForm.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFacilityById.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::getFacilityById
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:22
 * @route '/api/v1/locations/facilities/{facilityId}'
 */
        getFacilityByIdForm.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFacilityById.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getFacilityById.form = getFacilityByIdForm
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
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
export const publicIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})

publicIndex.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
publicIndex.url = (options?: RouteQueryOptions) => {
    return publicIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
publicIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
publicIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
    const publicIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
 */
        publicIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicIndex
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
 */
export const publicShow = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})

publicShow.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/facilities/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
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
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
 */
publicShow.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
 */
publicShow.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
 */
    const publicShowForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
 */
        publicShowForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrolledFacilityController::publicShow
 * @see app/Http/Controllers/Admin/EnrolledFacilityController.php:0
 * @route '/api/v1/public/facilities/{id}'
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
const EnrolledFacilityController = { index, getFacilityById, store, show, update, destroy, stats, publicIndex, publicShow }

export default EnrolledFacilityController
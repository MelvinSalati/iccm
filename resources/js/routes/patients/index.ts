import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/patients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::index
 * @see app/Domains/Patients/Controllers/PatientController.php:23
 * @route '/patients'
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
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/patients/search',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/patients/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/patients/create',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/patients/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/patients/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
export const show = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
show.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return show.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
show.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
show.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
    const showForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
        showForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::show
 * @see app/Domains/Patients/Controllers/PatientController.php:102
 * @route '/patients/{uuid}'
 */
        showForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Domains\Patients\Controllers\PatientController::update
 * @see app/Domains/Patients/Controllers/PatientController.php:123
 * @route '/patients/{uuid}'
 */
export const update = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/patients/{uuid}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::update
 * @see app/Domains/Patients/Controllers/PatientController.php:123
 * @route '/patients/{uuid}'
 */
update.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return update.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::update
 * @see app/Domains/Patients/Controllers/PatientController.php:123
 * @route '/patients/{uuid}'
 */
update.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::update
 * @see app/Domains/Patients/Controllers/PatientController.php:123
 * @route '/patients/{uuid}'
 */
    const updateForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::update
 * @see app/Domains/Patients/Controllers/PatientController.php:123
 * @route '/patients/{uuid}'
 */
        updateForm.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Domains\Patients\Controllers\PatientController::destroy
 * @see app/Domains/Patients/Controllers/PatientController.php:161
 * @route '/patients/{uuid}'
 */
export const destroy = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/patients/{uuid}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::destroy
 * @see app/Domains/Patients/Controllers/PatientController.php:161
 * @route '/patients/{uuid}'
 */
destroy.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return destroy.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::destroy
 * @see app/Domains/Patients/Controllers/PatientController.php:161
 * @route '/patients/{uuid}'
 */
destroy.delete = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::destroy
 * @see app/Domains/Patients/Controllers/PatientController.php:161
 * @route '/patients/{uuid}'
 */
    const destroyForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::destroy
 * @see app/Domains/Patients/Controllers/PatientController.php:161
 * @route '/patients/{uuid}'
 */
        destroyForm.delete = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
export const registry = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: registry.url(args, options),
    method: 'get',
})

registry.definition = {
    methods: ["get","head"],
    url: '/patients/registry/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
registry.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return registry.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
registry.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: registry.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
registry.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: registry.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
    const registryForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: registry.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
        registryForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: registry.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::registry
 * @see app/Domains/Patients/Controllers/PatientController.php:36
 * @route '/patients/registry/{uuid}'
 */
        registryForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: registry.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    registry.form = registryForm
const patients = {
    index: Object.assign(index, index),
search: Object.assign(search, search),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
registry: Object.assign(registry, registry),
}

export default patients
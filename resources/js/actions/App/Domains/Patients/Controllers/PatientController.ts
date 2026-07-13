import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Domains\Patients\Controllers\PatientController::search
 * @see app/Domains/Patients/Controllers/PatientController.php:51
 * @route '/api/v1/registry/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

search.definition = {
    methods: ["post"],
    url: '/api/v1/registry/search',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::search
 * @see app/Domains/Patients/Controllers/PatientController.php:51
 * @route '/api/v1/registry/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::search
 * @see app/Domains/Patients/Controllers/PatientController.php:51
 * @route '/api/v1/registry/search'
 */
search.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::search
 * @see app/Domains/Patients/Controllers/PatientController.php:51
 * @route '/api/v1/registry/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: search.url(options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::search
 * @see app/Domains/Patients/Controllers/PatientController.php:51
 * @route '/api/v1/registry/search'
 */
        searchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: search.url(options),
            method: 'post',
        })
    
    search.form = searchForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/api/v1/patients/register'
 */
const store43f0a69b84528ef159d55856528d893a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store43f0a69b84528ef159d55856528d893a.url(options),
    method: 'post',
})

store43f0a69b84528ef159d55856528d893a.definition = {
    methods: ["post"],
    url: '/api/v1/patients/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/api/v1/patients/register'
 */
store43f0a69b84528ef159d55856528d893a.url = (options?: RouteQueryOptions) => {
    return store43f0a69b84528ef159d55856528d893a.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/api/v1/patients/register'
 */
store43f0a69b84528ef159d55856528d893a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store43f0a69b84528ef159d55856528d893a.url(options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/api/v1/patients/register'
 */
    const store43f0a69b84528ef159d55856528d893aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store43f0a69b84528ef159d55856528d893a.url(options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/api/v1/patients/register'
 */
        store43f0a69b84528ef159d55856528d893aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store43f0a69b84528ef159d55856528d893a.url(options),
            method: 'post',
        })
    
    store43f0a69b84528ef159d55856528d893a.form = store43f0a69b84528ef159d55856528d893aForm
    /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
const store9ea114102a8c17d48369746e3d413da3 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9ea114102a8c17d48369746e3d413da3.url(options),
    method: 'post',
})

store9ea114102a8c17d48369746e3d413da3.definition = {
    methods: ["post"],
    url: '/patients/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
store9ea114102a8c17d48369746e3d413da3.url = (options?: RouteQueryOptions) => {
    return store9ea114102a8c17d48369746e3d413da3.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
store9ea114102a8c17d48369746e3d413da3.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9ea114102a8c17d48369746e3d413da3.url(options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
    const store9ea114102a8c17d48369746e3d413da3Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store9ea114102a8c17d48369746e3d413da3.url(options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::store
 * @see app/Domains/Patients/Controllers/PatientController.php:66
 * @route '/patients/register'
 */
        store9ea114102a8c17d48369746e3d413da3Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store9ea114102a8c17d48369746e3d413da3.url(options),
            method: 'post',
        })
    
    store9ea114102a8c17d48369746e3d413da3.form = store9ea114102a8c17d48369746e3d413da3Form

/**
* Multiple routes resolve to \App\Domains\Patients\Controllers\PatientController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/v1/patients/register': store43f0a69b84528ef159d55856528d893a,
    '/patients/register': store9ea114102a8c17d48369746e3d413da3,
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::manageClientTransfer
 * @see app/Domains/Patients/Controllers/PatientController.php:304
 * @route '/api/v1/patients/{patientuuid}/referral'
 */
export const manageClientTransfer = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manageClientTransfer.url(args, options),
    method: 'post',
})

manageClientTransfer.definition = {
    methods: ["post"],
    url: '/api/v1/patients/{patientuuid}/referral',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::manageClientTransfer
 * @see app/Domains/Patients/Controllers/PatientController.php:304
 * @route '/api/v1/patients/{patientuuid}/referral'
 */
manageClientTransfer.url = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return manageClientTransfer.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::manageClientTransfer
 * @see app/Domains/Patients/Controllers/PatientController.php:304
 * @route '/api/v1/patients/{patientuuid}/referral'
 */
manageClientTransfer.post = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manageClientTransfer.url(args, options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::manageClientTransfer
 * @see app/Domains/Patients/Controllers/PatientController.php:304
 * @route '/api/v1/patients/{patientuuid}/referral'
 */
    const manageClientTransferForm = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: manageClientTransfer.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::manageClientTransfer
 * @see app/Domains/Patients/Controllers/PatientController.php:304
 * @route '/api/v1/patients/{patientuuid}/referral'
 */
        manageClientTransferForm.post = (args: { patientuuid: string | number } | [patientuuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: manageClientTransfer.url(args, options),
            method: 'post',
        })
    
    manageClientTransfer.form = manageClientTransferForm
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
/**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
export const visitInteractions = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visitInteractions.url(args, options),
    method: 'get',
})

visitInteractions.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/visit/{visitId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
visitInteractions.url = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                    visitId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                                visitId: args.visitId,
                }

    return visitInteractions.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace('{visitId}', parsedArgs.visitId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
visitInteractions.get = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visitInteractions.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
visitInteractions.head = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: visitInteractions.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
    const visitInteractionsForm = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: visitInteractions.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
        visitInteractionsForm.get = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: visitInteractions.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::visitInteractions
 * @see app/Domains/Patients/Controllers/PatientController.php:374
 * @route '/patients/{uuid}/visit/{visitId}'
 */
        visitInteractionsForm.head = (args: { uuid: string | number, visitId: string | number } | [uuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: visitInteractions.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    visitInteractions.form = visitInteractionsForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/patients/registry/new',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::create
 * @see app/Domains/Patients/Controllers/PatientController.php:488
 * @route '/patients/registry/new'
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
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
export const medications = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medications.url(args, options),
    method: 'get',
})

medications.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/medications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
medications.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return medications.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
medications.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medications.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
medications.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medications.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
    const medicationsForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: medications.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
        medicationsForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medications.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::medications
 * @see app/Domains/Patients/Controllers/PatientController.php:496
 * @route '/patients/{uuid}/medications'
 */
        medicationsForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medications.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    medications.form = medicationsForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
export const appointments = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(args, options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
appointments.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return appointments.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
appointments.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
appointments.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
    const appointmentsForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
        appointmentsForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::appointments
 * @see app/Domains/Patients/Controllers/PatientController.php:509
 * @route '/patients/{uuid}/appointments'
 */
        appointmentsForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
export const referral = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referral.url(args, options),
    method: 'get',
})

referral.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
referral.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return referral.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
referral.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referral.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
referral.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: referral.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
    const referralForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: referral.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
        referralForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referral.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::referral
 * @see app/Domains/Patients/Controllers/PatientController.php:559
 * @route '/patients/{uuid}/referrals'
 */
        referralForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referral.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    referral.form = referralForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
export const riskAssessment = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riskAssessment.url(args, options),
    method: 'get',
})

riskAssessment.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/risk-assessment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
riskAssessment.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return riskAssessment.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
riskAssessment.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riskAssessment.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
riskAssessment.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riskAssessment.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
    const riskAssessmentForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: riskAssessment.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
        riskAssessmentForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: riskAssessment.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::riskAssessment
 * @see app/Domains/Patients/Controllers/PatientController.php:549
 * @route '/patients/{uuid}/risk-assessment'
 */
        riskAssessmentForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: riskAssessment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    riskAssessment.form = riskAssessmentForm
/**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
export const labs = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labs.url(args, options),
    method: 'get',
})

labs.definition = {
    methods: ["get","head"],
    url: '/patients/{uuid}/lab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
labs.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return labs.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
labs.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labs.url(args, options),
    method: 'get',
})
/**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
labs.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: labs.url(args, options),
    method: 'head',
})

    /**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
    const labsForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: labs.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
        labsForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: labs.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Domains\Patients\Controllers\PatientController::labs
 * @see app/Domains/Patients/Controllers/PatientController.php:582
 * @route '/patients/{uuid}/lab'
 */
        labsForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: labs.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    labs.form = labsForm
const PatientController = { search, store, manageClientTransfer, index, show, update, destroy, registry, visitInteractions, create, medications, appointments, referral, riskAssessment, labs }

export default PatientController
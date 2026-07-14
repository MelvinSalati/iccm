import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/breast-cancer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::index
 * @see app/Http/Controllers/BreastCancerController.php:13
 * @route '/breast-cancer'
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
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/new',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
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
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:63
 * @route '/breast-cancer/screening'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/breast-cancer/screening',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:63
 * @route '/breast-cancer/screening'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:63
 * @route '/breast-cancer/screening'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:63
 * @route '/breast-cancer/screening'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:63
 * @route '/breast-cancer/screening'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::show
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::edit
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\BreastCancerController::update
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/breast-cancer/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\BreastCancerController::update
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::update
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::update
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::update
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::destroy
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/breast-cancer/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BreastCancerController::destroy
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::destroy
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::destroy
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::destroy
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/{id}'
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
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::exportMethod
 * @see app/Http/Controllers/BreastCancerController.php:108
 * @route '/breast-cancer/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const BreastCancerController = { index, create, store, show, edit, update, destroy, exportMethod, export: exportMethod }

export default BreastCancerController
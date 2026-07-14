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
 * @route '/breast-cancer/create'
 */
const create91c0d8983b37a54fb05c5502ab50a180 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create91c0d8983b37a54fb05c5502ab50a180.url(options),
    method: 'get',
})

create91c0d8983b37a54fb05c5502ab50a180.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
create91c0d8983b37a54fb05c5502ab50a180.url = (options?: RouteQueryOptions) => {
    return create91c0d8983b37a54fb05c5502ab50a180.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
create91c0d8983b37a54fb05c5502ab50a180.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create91c0d8983b37a54fb05c5502ab50a180.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
create91c0d8983b37a54fb05c5502ab50a180.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create91c0d8983b37a54fb05c5502ab50a180.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
    const create91c0d8983b37a54fb05c5502ab50a180Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create91c0d8983b37a54fb05c5502ab50a180.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
        create91c0d8983b37a54fb05c5502ab50a180Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create91c0d8983b37a54fb05c5502ab50a180.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/create'
 */
        create91c0d8983b37a54fb05c5502ab50a180Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create91c0d8983b37a54fb05c5502ab50a180.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create91c0d8983b37a54fb05c5502ab50a180.form = create91c0d8983b37a54fb05c5502ab50a180Form
    /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
const createbeaa900fe338a1af212e720d479f1b2f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createbeaa900fe338a1af212e720d479f1b2f.url(options),
    method: 'get',
})

createbeaa900fe338a1af212e720d479f1b2f.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/new',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
createbeaa900fe338a1af212e720d479f1b2f.url = (options?: RouteQueryOptions) => {
    return createbeaa900fe338a1af212e720d479f1b2f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
createbeaa900fe338a1af212e720d479f1b2f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createbeaa900fe338a1af212e720d479f1b2f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
createbeaa900fe338a1af212e720d479f1b2f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createbeaa900fe338a1af212e720d479f1b2f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
    const createbeaa900fe338a1af212e720d479f1b2fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createbeaa900fe338a1af212e720d479f1b2f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
        createbeaa900fe338a1af212e720d479f1b2fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createbeaa900fe338a1af212e720d479f1b2f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::create
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/new'
 */
        createbeaa900fe338a1af212e720d479f1b2fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createbeaa900fe338a1af212e720d479f1b2f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createbeaa900fe338a1af212e720d479f1b2f.form = createbeaa900fe338a1af212e720d479f1b2fForm

/**
* Multiple routes resolve to \App\Http\Controllers\BreastCancerController::create, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `create['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const create = {
    '/breast-cancer/create': create91c0d8983b37a54fb05c5502ab50a180,
    '/breast-cancer/new': createbeaa900fe338a1af212e720d479f1b2f,
}

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
/**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/breast-cancer/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BreastCancerController::stats
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/breast-cancer/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\BreastCancerController::storeForPatient
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
export const storeForPatient = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForPatient.url(args, options),
    method: 'post',
})

storeForPatient.definition = {
    methods: ["post"],
    url: '/patients/{uuid}/breast-cancer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BreastCancerController::storeForPatient
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
storeForPatient.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeForPatient.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::storeForPatient
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
storeForPatient.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForPatient.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::storeForPatient
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
    const storeForPatientForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeForPatient.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::storeForPatient
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
        storeForPatientForm.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeForPatient.url(args, options),
            method: 'post',
        })
    
    storeForPatient.form = storeForPatientForm
const BreastCancerController = { index, create, store, show, edit, update, destroy, exportMethod, stats, storeForPatient, export: exportMethod }

export default BreastCancerController
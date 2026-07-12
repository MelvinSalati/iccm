import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/community-outreach',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
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
* @see \App\Http\Controllers\CommunityOutreachController::store
 * @see app/Http/Controllers/CommunityOutreachController.php:40
 * @route '/community-outreach'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/community-outreach',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::store
 * @see app/Http/Controllers/CommunityOutreachController.php:40
 * @route '/community-outreach'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::store
 * @see app/Http/Controllers/CommunityOutreachController.php:40
 * @route '/community-outreach'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::store
 * @see app/Http/Controllers/CommunityOutreachController.php:40
 * @route '/community-outreach'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::store
 * @see app/Http/Controllers/CommunityOutreachController.php:40
 * @route '/community-outreach'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
export const show = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { community_outreach: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    community_outreach: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        community_outreach: args.community_outreach,
                }

    return show.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show.get = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show.head = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
    const showForm = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
        showForm.get = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
        showForm.head = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
export const update = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { community_outreach: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    community_outreach: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        community_outreach: args.community_outreach,
                }

    return update.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update.put = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update.patch = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
    const updateForm = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
        updateForm.put = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
        updateForm.patch = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
export const destroy = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
destroy.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { community_outreach: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    community_outreach: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        community_outreach: args.community_outreach,
                }

    return destroy.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
destroy.delete = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
    const destroyForm = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
        destroyForm.delete = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const communityOutreach = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default communityOutreach
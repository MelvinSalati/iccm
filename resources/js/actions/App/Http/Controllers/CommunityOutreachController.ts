import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
const index47bbf18f8a4baeca4996c5352bed7d0b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index47bbf18f8a4baeca4996c5352bed7d0b.url(options),
    method: 'get',
})

index47bbf18f8a4baeca4996c5352bed7d0b.definition = {
    methods: ["get","head"],
    url: '/api/v1/community-outreach',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
index47bbf18f8a4baeca4996c5352bed7d0b.url = (options?: RouteQueryOptions) => {
    return index47bbf18f8a4baeca4996c5352bed7d0b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
index47bbf18f8a4baeca4996c5352bed7d0b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index47bbf18f8a4baeca4996c5352bed7d0b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
index47bbf18f8a4baeca4996c5352bed7d0b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index47bbf18f8a4baeca4996c5352bed7d0b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
    const index47bbf18f8a4baeca4996c5352bed7d0bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index47bbf18f8a4baeca4996c5352bed7d0b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
        index47bbf18f8a4baeca4996c5352bed7d0bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index47bbf18f8a4baeca4996c5352bed7d0b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/api/v1/community-outreach'
 */
        index47bbf18f8a4baeca4996c5352bed7d0bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index47bbf18f8a4baeca4996c5352bed7d0b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index47bbf18f8a4baeca4996c5352bed7d0b.form = index47bbf18f8a4baeca4996c5352bed7d0bForm
    /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
const index76d92a4fd742b0eaa8656b46e95b674b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index76d92a4fd742b0eaa8656b46e95b674b.url(options),
    method: 'get',
})

index76d92a4fd742b0eaa8656b46e95b674b.definition = {
    methods: ["get","head"],
    url: '/community-outreach',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index76d92a4fd742b0eaa8656b46e95b674b.url = (options?: RouteQueryOptions) => {
    return index76d92a4fd742b0eaa8656b46e95b674b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index76d92a4fd742b0eaa8656b46e95b674b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index76d92a4fd742b0eaa8656b46e95b674b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
index76d92a4fd742b0eaa8656b46e95b674b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index76d92a4fd742b0eaa8656b46e95b674b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
    const index76d92a4fd742b0eaa8656b46e95b674bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index76d92a4fd742b0eaa8656b46e95b674b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
        index76d92a4fd742b0eaa8656b46e95b674bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index76d92a4fd742b0eaa8656b46e95b674b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::index
 * @see app/Http/Controllers/CommunityOutreachController.php:13
 * @route '/community-outreach'
 */
        index76d92a4fd742b0eaa8656b46e95b674bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index76d92a4fd742b0eaa8656b46e95b674b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index76d92a4fd742b0eaa8656b46e95b674b.form = index76d92a4fd742b0eaa8656b46e95b674bForm

/**
* Multiple routes resolve to \App\Http\Controllers\CommunityOutreachController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/v1/community-outreach': index47bbf18f8a4baeca4996c5352bed7d0b,
    '/community-outreach': index76d92a4fd742b0eaa8656b46e95b674b,
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/api/v1/community-outreach/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
    const statisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statistics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
 */
        statisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::statistics
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/statistics'
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
/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
const show0aefcb1bd6cc9ffa251a8fe76004eda0 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'get',
})

show0aefcb1bd6cc9ffa251a8fe76004eda0.definition = {
    methods: ["get","head"],
    url: '/api/v1/community-outreach/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
show0aefcb1bd6cc9ffa251a8fe76004eda0.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show0aefcb1bd6cc9ffa251a8fe76004eda0.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
show0aefcb1bd6cc9ffa251a8fe76004eda0.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
show0aefcb1bd6cc9ffa251a8fe76004eda0.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
    const show0aefcb1bd6cc9ffa251a8fe76004eda0Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
        show0aefcb1bd6cc9ffa251a8fe76004eda0Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
        show0aefcb1bd6cc9ffa251a8fe76004eda0Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show0aefcb1bd6cc9ffa251a8fe76004eda0.form = show0aefcb1bd6cc9ffa251a8fe76004eda0Form
    /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
const show48e25c0f703244e76b841344dc3bc2c0 = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'get',
})

show48e25c0f703244e76b841344dc3bc2c0.definition = {
    methods: ["get","head"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show48e25c0f703244e76b841344dc3bc2c0.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show48e25c0f703244e76b841344dc3bc2c0.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show48e25c0f703244e76b841344dc3bc2c0.get = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
show48e25c0f703244e76b841344dc3bc2c0.head = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
    const show48e25c0f703244e76b841344dc3bc2c0Form = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show48e25c0f703244e76b841344dc3bc2c0.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
        show48e25c0f703244e76b841344dc3bc2c0Form.get = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show48e25c0f703244e76b841344dc3bc2c0.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommunityOutreachController::show
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
        show48e25c0f703244e76b841344dc3bc2c0Form.head = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show48e25c0f703244e76b841344dc3bc2c0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show48e25c0f703244e76b841344dc3bc2c0.form = show48e25c0f703244e76b841344dc3bc2c0Form

/**
* Multiple routes resolve to \App\Http\Controllers\CommunityOutreachController::show, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `show['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const show = {
    '/api/v1/community-outreach/{id}': show0aefcb1bd6cc9ffa251a8fe76004eda0,
    '/community-outreach/{community_outreach}': show48e25c0f703244e76b841344dc3bc2c0,
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/api/v1/community-outreach/{id}'
 */
const update0aefcb1bd6cc9ffa251a8fe76004eda0 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'put',
})

update0aefcb1bd6cc9ffa251a8fe76004eda0.definition = {
    methods: ["put"],
    url: '/api/v1/community-outreach/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/api/v1/community-outreach/{id}'
 */
update0aefcb1bd6cc9ffa251a8fe76004eda0.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update0aefcb1bd6cc9ffa251a8fe76004eda0.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/api/v1/community-outreach/{id}'
 */
update0aefcb1bd6cc9ffa251a8fe76004eda0.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/api/v1/community-outreach/{id}'
 */
    const update0aefcb1bd6cc9ffa251a8fe76004eda0Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, {
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
 * @route '/api/v1/community-outreach/{id}'
 */
        update0aefcb1bd6cc9ffa251a8fe76004eda0Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update0aefcb1bd6cc9ffa251a8fe76004eda0.form = update0aefcb1bd6cc9ffa251a8fe76004eda0Form
    /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
const update48e25c0f703244e76b841344dc3bc2c0 = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'put',
})

update48e25c0f703244e76b841344dc3bc2c0.definition = {
    methods: ["put","patch"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update48e25c0f703244e76b841344dc3bc2c0.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update48e25c0f703244e76b841344dc3bc2c0.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update48e25c0f703244e76b841344dc3bc2c0.put = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
update48e25c0f703244e76b841344dc3bc2c0.patch = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::update
 * @see app/Http/Controllers/CommunityOutreachController.php:157
 * @route '/community-outreach/{community_outreach}'
 */
    const update48e25c0f703244e76b841344dc3bc2c0Form = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update48e25c0f703244e76b841344dc3bc2c0.url(args, {
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
        update48e25c0f703244e76b841344dc3bc2c0Form.put = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update48e25c0f703244e76b841344dc3bc2c0.url(args, {
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
        update48e25c0f703244e76b841344dc3bc2c0Form.patch = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update48e25c0f703244e76b841344dc3bc2c0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update48e25c0f703244e76b841344dc3bc2c0.form = update48e25c0f703244e76b841344dc3bc2c0Form

/**
* Multiple routes resolve to \App\Http\Controllers\CommunityOutreachController::update, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `update['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const update = {
    '/api/v1/community-outreach/{id}': update0aefcb1bd6cc9ffa251a8fe76004eda0,
    '/community-outreach/{community_outreach}': update48e25c0f703244e76b841344dc3bc2c0,
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
const destroy0aefcb1bd6cc9ffa251a8fe76004eda0 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'delete',
})

destroy0aefcb1bd6cc9ffa251a8fe76004eda0.definition = {
    methods: ["delete"],
    url: '/api/v1/community-outreach/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
destroy0aefcb1bd6cc9ffa251a8fe76004eda0.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy0aefcb1bd6cc9ffa251a8fe76004eda0.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
destroy0aefcb1bd6cc9ffa251a8fe76004eda0.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/api/v1/community-outreach/{id}'
 */
    const destroy0aefcb1bd6cc9ffa251a8fe76004eda0Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, {
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
 * @route '/api/v1/community-outreach/{id}'
 */
        destroy0aefcb1bd6cc9ffa251a8fe76004eda0Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy0aefcb1bd6cc9ffa251a8fe76004eda0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy0aefcb1bd6cc9ffa251a8fe76004eda0.form = destroy0aefcb1bd6cc9ffa251a8fe76004eda0Form
    /**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
const destroy48e25c0f703244e76b841344dc3bc2c0 = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'delete',
})

destroy48e25c0f703244e76b841344dc3bc2c0.definition = {
    methods: ["delete"],
    url: '/community-outreach/{community_outreach}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
destroy48e25c0f703244e76b841344dc3bc2c0.url = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy48e25c0f703244e76b841344dc3bc2c0.definition.url
            .replace('{community_outreach}', parsedArgs.community_outreach.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
destroy48e25c0f703244e76b841344dc3bc2c0.delete = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy48e25c0f703244e76b841344dc3bc2c0.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommunityOutreachController::destroy
 * @see app/Http/Controllers/CommunityOutreachController.php:0
 * @route '/community-outreach/{community_outreach}'
 */
    const destroy48e25c0f703244e76b841344dc3bc2c0Form = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy48e25c0f703244e76b841344dc3bc2c0.url(args, {
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
        destroy48e25c0f703244e76b841344dc3bc2c0Form.delete = (args: { community_outreach: string | number } | [community_outreach: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy48e25c0f703244e76b841344dc3bc2c0.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy48e25c0f703244e76b841344dc3bc2c0.form = destroy48e25c0f703244e76b841344dc3bc2c0Form

/**
* Multiple routes resolve to \App\Http\Controllers\CommunityOutreachController::destroy, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `destroy['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const destroy = {
    '/api/v1/community-outreach/{id}': destroy0aefcb1bd6cc9ffa251a8fe76004eda0,
    '/community-outreach/{community_outreach}': destroy48e25c0f703244e76b841344dc3bc2c0,
}

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
const CommunityOutreachController = { index, statistics, show, update, destroy, store }

export default CommunityOutreachController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
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
 * @see [serialized-closure]:2
 * @route '/community'
 */
export const community = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: community.url(options),
    method: 'get',
})

community.definition = {
    methods: ["get","head"],
    url: '/community',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/community'
 */
community.url = (options?: RouteQueryOptions) => {
    return community.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/community'
 */
community.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: community.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/community'
 */
community.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: community.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/community'
 */
    const communityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: community.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/community'
 */
        communityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: community.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/community'
 */
        communityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: community.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    community.form = communityForm
/**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
export const referrals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referrals.url(options),
    method: 'get',
})

referrals.definition = {
    methods: ["get","head"],
    url: '/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
referrals.url = (options?: RouteQueryOptions) => {
    return referrals.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
referrals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referrals.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
referrals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: referrals.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
    const referralsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: referrals.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
        referralsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referrals.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/referrals'
 */
        referralsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: referrals.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    referrals.form = referralsForm
/**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
export const mentalHealth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentalHealth.url(options),
    method: 'get',
})

mentalHealth.definition = {
    methods: ["get","head"],
    url: '/mental-health',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
mentalHealth.url = (options?: RouteQueryOptions) => {
    return mentalHealth.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
mentalHealth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentalHealth.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
mentalHealth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mentalHealth.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
    const mentalHealthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: mentalHealth.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
        mentalHealthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mentalHealth.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/mental-health'
 */
        mentalHealthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mentalHealth.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    mentalHealth.form = mentalHealthForm
/**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
export const mortality = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mortality.url(options),
    method: 'get',
})

mortality.definition = {
    methods: ["get","head"],
    url: '/mortality',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
mortality.url = (options?: RouteQueryOptions) => {
    return mortality.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
mortality.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mortality.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
mortality.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mortality.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
    const mortalityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: mortality.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
        mortalityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mortality.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/mortality'
 */
        mortalityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mortality.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    mortality.form = mortalityForm
/**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
export const admissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admissions.url(options),
    method: 'get',
})

admissions.definition = {
    methods: ["get","head"],
    url: '/admissions',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
admissions.url = (options?: RouteQueryOptions) => {
    return admissions.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
admissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admissions.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
admissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admissions.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
    const admissionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: admissions.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
        admissionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admissions.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/admissions'
 */
        admissionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admissions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    admissions.form = admissionsForm
/**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
export const discharges = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: discharges.url(options),
    method: 'get',
})

discharges.definition = {
    methods: ["get","head"],
    url: '/discharges',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
discharges.url = (options?: RouteQueryOptions) => {
    return discharges.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
discharges.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: discharges.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
discharges.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: discharges.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
    const dischargesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: discharges.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
        dischargesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: discharges.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/discharges'
 */
        dischargesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: discharges.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    discharges.form = dischargesForm
/**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/appointments'
 */
        appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:18
 * @route '/api/v1/appointments/create'
 */
export const createAppointment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAppointment.url(options),
    method: 'post',
})

createAppointment.definition = {
    methods: ["post"],
    url: '/api/v1/appointments/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:18
 * @route '/api/v1/appointments/create'
 */
createAppointment.url = (options?: RouteQueryOptions) => {
    return createAppointment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:18
 * @route '/api/v1/appointments/create'
 */
createAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAppointment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:18
 * @route '/api/v1/appointments/create'
 */
    const createAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createAppointment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:18
 * @route '/api/v1/appointments/create'
 */
        createAppointmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createAppointment.url(options),
            method: 'post',
        })
    
    createAppointment.form = createAppointmentForm
/**
* @see \App\Http\Controllers\Appointments\AppointmentController::updateAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:93
 * @route '/api/v1/appointments/{id}'
 */
export const updateAppointment = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAppointment.url(args, options),
    method: 'put',
})

updateAppointment.definition = {
    methods: ["put"],
    url: '/api/v1/appointments/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::updateAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:93
 * @route '/api/v1/appointments/{id}'
 */
updateAppointment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateAppointment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::updateAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:93
 * @route '/api/v1/appointments/{id}'
 */
updateAppointment.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAppointment.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Appointments\AppointmentController::updateAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:93
 * @route '/api/v1/appointments/{id}'
 */
    const updateAppointmentForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAppointment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Appointments\AppointmentController::updateAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:93
 * @route '/api/v1/appointments/{id}'
 */
        updateAppointmentForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAppointment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateAppointment.form = updateAppointmentForm
/**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
export const viewAppointment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewAppointment.url(options),
    method: 'get',
})

viewAppointment.definition = {
    methods: ["get","head"],
    url: '/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
viewAppointment.url = (options?: RouteQueryOptions) => {
    return viewAppointment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
viewAppointment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewAppointment.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
viewAppointment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewAppointment.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
    const viewAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewAppointment.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
        viewAppointmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewAppointment.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Appointments\AppointmentController::viewAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:65
 * @route '/appointments'
 */
        viewAppointmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewAppointment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewAppointment.form = viewAppointmentForm
const AppointmentController = { createAppointment, updateAppointment, viewAppointment }

export default AppointmentController
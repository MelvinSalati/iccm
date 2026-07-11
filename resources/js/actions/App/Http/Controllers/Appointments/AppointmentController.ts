import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:13
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
 * @see app/Http/Controllers/Appointments/AppointmentController.php:13
 * @route '/api/v1/appointments/create'
 */
createAppointment.url = (options?: RouteQueryOptions) => {
    return createAppointment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:13
 * @route '/api/v1/appointments/create'
 */
createAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAppointment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:13
 * @route '/api/v1/appointments/create'
 */
    const createAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createAppointment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Appointments\AppointmentController::createAppointment
 * @see app/Http/Controllers/Appointments/AppointmentController.php:13
 * @route '/api/v1/appointments/create'
 */
        createAppointmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createAppointment.url(options),
            method: 'post',
        })
    
    createAppointment.form = createAppointmentForm
const AppointmentController = { createAppointment }

export default AppointmentController
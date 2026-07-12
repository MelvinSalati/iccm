import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/patient/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Patients\CreateController::create
 * @see app/Http/Controllers/Patients/CreateController.php:14
 * @route '/patient/create'
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
const patient = {
    create: Object.assign(create, create),
}

export default patient
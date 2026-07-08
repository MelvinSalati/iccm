import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IntegratedScreeningController::store
 * @see app/Http/Controllers/IntegratedScreeningController.php:14
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated'
 */
export const store = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IntegratedScreeningController::store
 * @see app/Http/Controllers/IntegratedScreeningController.php:14
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated'
 */
store.url = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    patientuuid: args[0],
                    visitId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientuuid: args.patientuuid,
                                visitId: args.visitId,
                }

    return store.definition.url
            .replace('{patientuuid}', parsedArgs.patientuuid.toString())
            .replace('{visitId}', parsedArgs.visitId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IntegratedScreeningController::store
 * @see app/Http/Controllers/IntegratedScreeningController.php:14
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated'
 */
store.post = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IntegratedScreeningController::store
 * @see app/Http/Controllers/IntegratedScreeningController.php:14
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated'
 */
    const storeForm = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IntegratedScreeningController::store
 * @see app/Http/Controllers/IntegratedScreeningController.php:14
 * @route '/api/v1/patients/{patientuuid}/visit/{visitId}/screening/integrated'
 */
        storeForm.post = (args: { patientuuid: string | number, visitId: string | number } | [patientuuid: string | number, visitId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const IntegratedScreeningController = { store }

export default IntegratedScreeningController
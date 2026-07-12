import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
export const index = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/consultancy/{facilityId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
index.url = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facilityId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    facilityId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facilityId: args.facilityId,
                }

    return index.definition.url
            .replace('{facilityId}', parsedArgs.facilityId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
index.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
index.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
    const indexForm = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
        indexForm.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::index
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:17
 * @route '/consultancy/{facilityId}'
 */
        indexForm.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const consultancy = {
    index: Object.assign(index, index),
}

export default consultancy
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
export const viewConsultancy = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewConsultancy.url(args, options),
    method: 'get',
})

viewConsultancy.definition = {
    methods: ["get","head"],
    url: '/consultancy/{facilityId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
viewConsultancy.url = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return viewConsultancy.definition.url
            .replace('{facilityId}', parsedArgs.facilityId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
viewConsultancy.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewConsultancy.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
viewConsultancy.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewConsultancy.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
    const viewConsultancyForm = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewConsultancy.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
        viewConsultancyForm.get = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewConsultancy.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Consultancies\ConsultancyController::viewConsultancy
 * @see app/Http/Controllers/Consultancies/ConsultancyController.php:18
 * @route '/consultancy/{facilityId}'
 */
        viewConsultancyForm.head = (args: { facilityId: string | number } | [facilityId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewConsultancy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewConsultancy.form = viewConsultancyForm
const ConsultancyController = { viewConsultancy }

export default ConsultancyController
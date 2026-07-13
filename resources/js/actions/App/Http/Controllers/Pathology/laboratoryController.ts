import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
export const viewLaboratoryOrders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'get',
})

viewLaboratoryOrders.definition = {
    methods: ["get","head"],
    url: '/laboratory/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.url = (options?: RouteQueryOptions) => {
    return viewLaboratoryOrders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
viewLaboratoryOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewLaboratoryOrders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
    const viewLaboratoryOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewLaboratoryOrders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
        viewLaboratoryOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewLaboratoryOrders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::viewLaboratoryOrders
 * @see app/Http/Controllers/Pathology/laboratoryController.php:17
 * @route '/laboratory/orders'
 */
        viewLaboratoryOrdersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewLaboratoryOrders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewLaboratoryOrders.form = viewLaboratoryOrdersForm
const LaboratoryController = { viewLaboratoryOrders }

export default LaboratoryController
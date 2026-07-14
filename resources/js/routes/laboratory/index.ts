import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/laboratory/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Pathology\LaboratoryController::orders
 * @see app/Http/Controllers/Pathology/LaboratoryController.php:19
 * @route '/laboratory/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
const laboratory = {
    orders: Object.assign(orders, orders),
}

export default laboratory
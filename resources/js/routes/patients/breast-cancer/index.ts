import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
export const store = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/patients/{uuid}/breast-cancer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
store.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return store.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
store.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
    const storeForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BreastCancerController::store
 * @see app/Http/Controllers/BreastCancerController.php:0
 * @route '/patients/{uuid}/breast-cancer'
 */
        storeForm.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const breastCancer = {
    store: Object.assign(store, store),
}

export default breastCancer
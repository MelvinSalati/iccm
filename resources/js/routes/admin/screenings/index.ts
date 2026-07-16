import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import hpv3146f5 from './hpv'
import via72ff86 from './via'
import hivDf780f from './hiv'
import breastCancer17ef88 from './breast-cancer'
/**
* @see \EventDataController::hpv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
export const hpv = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hpv.url(options),
    method: 'post',
})

hpv.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/hpv',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::hpv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
hpv.url = (options?: RouteQueryOptions) => {
    return hpv.definition.url + queryParams(options)
}

/**
* @see \EventDataController::hpv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
hpv.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hpv.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::hpv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
    const hpvForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hpv.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::hpv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hpv'
 */
        hpvForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hpv.url(options),
            method: 'post',
        })
    
    hpv.form = hpvForm
/**
* @see \EventDataController::via
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
export const via = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: via.url(options),
    method: 'post',
})

via.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/via',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::via
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
via.url = (options?: RouteQueryOptions) => {
    return via.definition.url + queryParams(options)
}

/**
* @see \EventDataController::via
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
via.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: via.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::via
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
    const viaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: via.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::via
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/via'
 */
        viaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: via.url(options),
            method: 'post',
        })
    
    via.form = viaForm
/**
* @see \EventDataController::hiv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
export const hiv = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hiv.url(options),
    method: 'post',
})

hiv.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/hiv',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::hiv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
hiv.url = (options?: RouteQueryOptions) => {
    return hiv.definition.url + queryParams(options)
}

/**
* @see \EventDataController::hiv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
hiv.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hiv.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::hiv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
    const hivForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hiv.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::hiv
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/hiv'
 */
        hivForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hiv.url(options),
            method: 'post',
        })
    
    hiv.form = hivForm
/**
* @see \EventDataController::breastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
export const breastCancer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: breastCancer.url(options),
    method: 'post',
})

breastCancer.definition = {
    methods: ["post"],
    url: '/api/v1/admin/screenings/breast-cancer',
} satisfies RouteDefinition<["post"]>

/**
* @see \EventDataController::breastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
breastCancer.url = (options?: RouteQueryOptions) => {
    return breastCancer.definition.url + queryParams(options)
}

/**
* @see \EventDataController::breastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
breastCancer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: breastCancer.url(options),
    method: 'post',
})

    /**
* @see \EventDataController::breastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
    const breastCancerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: breastCancer.url(options),
        method: 'post',
    })

            /**
* @see \EventDataController::breastCancer
 * @see [unknown]:0
 * @route '/api/v1/admin/screenings/breast-cancer'
 */
        breastCancerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: breastCancer.url(options),
            method: 'post',
        })
    
    breastCancer.form = breastCancerForm
const screenings = {
    hpv: Object.assign(hpv, hpv3146f5),
via: Object.assign(via, via72ff86),
hiv: Object.assign(hiv, hivDf780f),
breastCancer: Object.assign(breastCancer, breastCancer17ef88),
}

export default screenings
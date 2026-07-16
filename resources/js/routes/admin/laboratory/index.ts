import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import test from './test'
/**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
export const tests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tests.url(options),
    method: 'get',
})

tests.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/laboratory/tests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
tests.url = (options?: RouteQueryOptions) => {
    return tests.definition.url + queryParams(options)
}

/**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
tests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tests.url(options),
    method: 'get',
})
/**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
tests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tests.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
    const testsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tests.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
        testsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tests.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::tests
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/tests'
 */
        testsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tests.form = testsForm
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/laboratory/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \EventDataController::stats
 * @see [unknown]:0
 * @route '/api/v1/admin/laboratory/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
const laboratory = {
    test: Object.assign(test, test),
tests: Object.assign(tests, tests),
stats: Object.assign(stats, stats),
}

export default laboratory
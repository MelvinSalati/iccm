import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
export const history = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/history/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
history.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return history.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
history.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
history.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
    const historyForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
        historyForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::history
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/history/{patientId}'
 */
        historyForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
export const summary = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(args, options),
    method: 'get',
})

summary.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/summary/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
summary.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return summary.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
summary.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
summary.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: summary.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
    const summaryForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: summary.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
        summaryForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: summary.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::summary
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/summary/{patientId}'
 */
        summaryForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: summary.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    summary.form = summaryForm
/**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
export const screenings = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(args, options),
    method: 'get',
})

screenings.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/screenings/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
screenings.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return screenings.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
screenings.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: screenings.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
screenings.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: screenings.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
    const screeningsForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: screenings.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
        screeningsForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screenings.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::screenings
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/screenings/{patientId}'
 */
        screeningsForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: screenings.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    screenings.form = screeningsForm
/**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
export const followups = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: followups.url(args, options),
    method: 'get',
})

followups.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/patients/follow-ups/{patientId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
followups.url = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientId: args.patientId,
                }

    return followups.definition.url
            .replace('{patientId}', parsedArgs.patientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
followups.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: followups.url(args, options),
    method: 'get',
})
/**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
followups.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: followups.url(args, options),
    method: 'head',
})

    /**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
    const followupsForm = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: followups.url(args, options),
        method: 'get',
    })

            /**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
        followupsForm.get = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: followups.url(args, options),
            method: 'get',
        })
            /**
* @see \EventDataController::followups
 * @see [unknown]:0
 * @route '/api/v1/admin/patients/follow-ups/{patientId}'
 */
        followupsForm.head = (args: { patientId: string | number } | [patientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: followups.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    followups.form = followupsForm
const patients = {
    history: Object.assign(history, history),
summary: Object.assign(summary, summary),
screenings: Object.assign(screenings, screenings),
followups: Object.assign(followups, followups),
}

export default patients
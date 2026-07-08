import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Domains\Patients\Actions\CreateVisitAction::execute
 * @see app/Domains/Patients/Actions/CreateVisitAction.php:27
 * @route '/api/v1/patients/{patientUuid}/visit'
 */
export const execute = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(args, options),
    method: 'post',
})

execute.definition = {
    methods: ["post"],
    url: '/api/v1/patients/{patientUuid}/visit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Domains\Patients\Actions\CreateVisitAction::execute
 * @see app/Domains/Patients/Actions/CreateVisitAction.php:27
 * @route '/api/v1/patients/{patientUuid}/visit'
 */
execute.url = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patientUuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    patientUuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patientUuid: args.patientUuid,
                }

    return execute.definition.url
            .replace('{patientUuid}', parsedArgs.patientUuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Domains\Patients\Actions\CreateVisitAction::execute
 * @see app/Domains/Patients/Actions/CreateVisitAction.php:27
 * @route '/api/v1/patients/{patientUuid}/visit'
 */
execute.post = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(args, options),
    method: 'post',
})

    /**
* @see \App\Domains\Patients\Actions\CreateVisitAction::execute
 * @see app/Domains/Patients/Actions/CreateVisitAction.php:27
 * @route '/api/v1/patients/{patientUuid}/visit'
 */
    const executeForm = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: execute.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Domains\Patients\Actions\CreateVisitAction::execute
 * @see app/Domains/Patients/Actions/CreateVisitAction.php:27
 * @route '/api/v1/patients/{patientUuid}/visit'
 */
        executeForm.post = (args: { patientUuid: string | number } | [patientUuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: execute.url(args, options),
            method: 'post',
        })
    
    execute.form = executeForm
const CreateVisitAction = { execute }

export default CreateVisitAction
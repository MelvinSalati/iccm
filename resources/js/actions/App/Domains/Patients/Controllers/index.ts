import PatientController from './PatientController'
import LocationController from './LocationController'
const Controllers = {
    PatientController: Object.assign(PatientController, PatientController),
LocationController: Object.assign(LocationController, LocationController),
}

export default Controllers
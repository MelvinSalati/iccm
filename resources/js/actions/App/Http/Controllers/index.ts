import IntegratedScreeningController from './IntegratedScreeningController'
import VitalsController from './VitalsController'
import Patients from './Patients'
import Settings from './Settings'
const Controllers = {
    IntegratedScreeningController: Object.assign(IntegratedScreeningController, IntegratedScreeningController),
VitalsController: Object.assign(VitalsController, VitalsController),
Patients: Object.assign(Patients, Patients),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
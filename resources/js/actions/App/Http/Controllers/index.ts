import IntegratedScreeningController from './IntegratedScreeningController'
import VitalsController from './VitalsController'
import Appointments from './Appointments'
import Pathology from './Pathology'
import CommunityEngagement from './CommunityEngagement'
import Patients from './Patients'
import Consultancies from './Consultancies'
import Settings from './Settings'
const Controllers = {
    IntegratedScreeningController: Object.assign(IntegratedScreeningController, IntegratedScreeningController),
VitalsController: Object.assign(VitalsController, VitalsController),
Appointments: Object.assign(Appointments, Appointments),
Pathology: Object.assign(Pathology, Pathology),
CommunityEngagement: Object.assign(CommunityEngagement, CommunityEngagement),
Patients: Object.assign(Patients, Patients),
Consultancies: Object.assign(Consultancies, Consultancies),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
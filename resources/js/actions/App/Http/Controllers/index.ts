import Pathology from './Pathology'
import IntegratedScreeningController from './IntegratedScreeningController'
import VitalsController from './VitalsController'
import CommunityOutreachController from './CommunityOutreachController'
import CommunityEngagement from './CommunityEngagement'
import Appointments from './Appointments'
import Patients from './Patients'
import Consultancies from './Consultancies'
import BreastCancerController from './BreastCancerController'
import Settings from './Settings'
const Controllers = {
    Pathology: Object.assign(Pathology, Pathology),
IntegratedScreeningController: Object.assign(IntegratedScreeningController, IntegratedScreeningController),
VitalsController: Object.assign(VitalsController, VitalsController),
CommunityOutreachController: Object.assign(CommunityOutreachController, CommunityOutreachController),
CommunityEngagement: Object.assign(CommunityEngagement, CommunityEngagement),
Appointments: Object.assign(Appointments, Appointments),
Patients: Object.assign(Patients, Patients),
Consultancies: Object.assign(Consultancies, Consultancies),
BreastCancerController: Object.assign(BreastCancerController, BreastCancerController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
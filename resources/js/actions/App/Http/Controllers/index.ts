import Pathology from './Pathology'
import IntegratedScreeningController from './IntegratedScreeningController'
import VitalsController from './VitalsController'
import CommunityOutreachController from './CommunityOutreachController'
import CommunityEngagement from './CommunityEngagement'
import Appointments from './Appointments'
import ImageController from './ImageController'
import Patients from './Patients'
import Consultancies from './Consultancies'
import Settings from './Settings'
import BreastCancerController from './BreastCancerController'
const Controllers = {
    Pathology: Object.assign(Pathology, Pathology),
IntegratedScreeningController: Object.assign(IntegratedScreeningController, IntegratedScreeningController),
VitalsController: Object.assign(VitalsController, VitalsController),
CommunityOutreachController: Object.assign(CommunityOutreachController, CommunityOutreachController),
CommunityEngagement: Object.assign(CommunityEngagement, CommunityEngagement),
Appointments: Object.assign(Appointments, Appointments),
ImageController: Object.assign(ImageController, ImageController),
Patients: Object.assign(Patients, Patients),
Consultancies: Object.assign(Consultancies, Consultancies),
Settings: Object.assign(Settings, Settings),
BreastCancerController: Object.assign(BreastCancerController, BreastCancerController),
}

export default Controllers
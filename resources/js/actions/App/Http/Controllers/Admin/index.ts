import EnrolledFacilityController from './EnrolledFacilityController'
import DashboardController from './DashboardController'
const Admin = {
    EnrolledFacilityController: Object.assign(EnrolledFacilityController, EnrolledFacilityController),
DashboardController: Object.assign(DashboardController, DashboardController),
}

export default Admin
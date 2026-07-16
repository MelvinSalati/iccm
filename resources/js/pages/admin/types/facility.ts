export interface Facility {
    id: string
    name: string
    code: string
    type: 'hospital' | 'clinic' | 'health_center' | 'district_hospital'
    district: string
    province: string
    address: string
    phone: string
    email: string
    status: 'active' | 'inactive'
    admins: FacilityAdmin[]
    createdAt: string
    updatedAt: string
}

export interface FacilityAdmin {
    id: string
    userId: string
    name: string
    email: string
    role: 'admin' | 'manager' | 'viewer'
    assignedAt: string
}

export interface FacilityFormData {
    name: string
    code: string
    type: 'hospital' | 'clinic' | 'health_center' | 'district_hospital'
    district: string
    province: string
    address: string
    phone: string
    email: string
    admins: {
        name: string
        email: string
        role: 'admin' | 'manager' | 'viewer'
    }[]
}

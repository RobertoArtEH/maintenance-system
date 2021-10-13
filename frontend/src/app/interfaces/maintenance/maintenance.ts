import { MaintenanceItem } from "./maintenance-item";

export interface Maintenance {
    id: number,
    serviceTypeId: number,
    responsibleId: number,
    maintenanceStatusId: number,
    serviceDate: string
    items: MaintenanceItem[]
}

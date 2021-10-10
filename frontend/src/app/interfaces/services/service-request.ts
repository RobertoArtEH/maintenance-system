import { DatePipe } from "@angular/common";
import { ServiceRequestItem } from "./service-request-item";

export interface ServiceRequest {
    id: number,
    folio: number,
    comments: string,
    serviceDate: string
    service_status_id: number,
    area_id: string,
    responsible_id: string,
    items: ServiceRequestItem[]
}

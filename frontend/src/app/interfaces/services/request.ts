import { ServiceRequestService } from "src/app/services/serviceRequest/service-request.service";
import { Area } from "../area/area";
import { Responsible } from "../responsible/responsible";
import { ServiceRequestItem } from "./service-request-item";
import { Status } from "./status";

export interface Request {
    id: number,
    folio: string,
    comments: string,
    service_status_id: number,
    area_id: number,
    responsible_id: number,
    service_date: string,
    status: Status,
    area: Area,
    responsible: Responsible,
    items: ServiceRequestItem[]
}

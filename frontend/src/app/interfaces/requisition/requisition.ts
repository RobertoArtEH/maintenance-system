import { RequisitionItem } from "./requisition-item";

export interface Requisition {
    id: number,
    dependency: string,
    elaboration_date: string,
    check_in_date: string,
    justification: string,
    contact: string,
    responsible_id:  number,
    authorized_user_id: 1,
    items: RequisitionItem[],
    requisitionStatusId: number,
}

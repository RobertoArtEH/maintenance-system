import { User } from "../user/user";
import { Laboratory } from "./laboratory";

export interface LaboratoryCalendarItem {
    laboratoryCalendarId: number,
    responsibleId: number,
    laboratoryId: number,
    laboratoryDate: string
    responsible: User
    laboratory: Laboratory
}

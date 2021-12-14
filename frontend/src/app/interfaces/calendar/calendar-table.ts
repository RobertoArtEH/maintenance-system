import { Laboratory } from "../Laboratories/laboratory";
import { User } from "../user/user";

export interface CalendarTable {
    responsible: User
    scheduledDate: string
    laboratory?: Laboratory
}

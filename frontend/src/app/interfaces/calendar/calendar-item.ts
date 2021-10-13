import { User } from "../user/user";

export interface CalendarItem {
    calendarId: number,
    responsibleId: number,
    scheduledDate: string
    responsible: User
}

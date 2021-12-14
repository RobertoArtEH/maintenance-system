// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LaboratoryCalendar from "App/Models/LaboratoryCalendar"
import LaboratoryCalendarItem from "App/Models/LaboratoryCalendarItem"

export default class LaboratoryCalendarsController {
    public async index ({ response }) {
        try {
          const calendars = await LaboratoryCalendar.query().preload('items', (itemsQuery) => {
            itemsQuery.preload('responsible', (commentsQuery) => {
              commentsQuery.select('*')
            })
          })
    
          return response.ok({ status: true, data: calendars })
        } catch (error) {
          console.log(error.message)
          return response.badRequest({ status: false, message: 'Ocurrió un error al consultar los calendarios.' })
        }
      }
    
      public async save ({ request, response }) {
        try {
          const data = request.all()
          const calendar = await LaboratoryCalendar.updateOrCreate({ id: data.id ?? null }, data)

          for (const item of data.items) {
            // eslint-disable-next-line max-len
            await LaboratoryCalendarItem.updateOrCreate({ id : item.id ?? null}, {laboratoryCalendarId : calendar.id, ...item})
          }

          return response.ok({ status: true, data: calendar, message: 'El calendario se guardó con éxito.' })
        } catch (error) {
          console.log(error.message)
    
          return response.badRequest({ status: false, message: 'Ocurrió un error al guardar el calendario.'})
        }
      }
}

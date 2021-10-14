// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Calendar from 'App/Models/Calendar'
import CalendarItem from 'App/Models/CalendarItem'

export default class CalendarsController {
  public async index ({ response }) {
    try {
      const calendars = await Calendar.query().preload('items', (itemsQuery) => {
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
      const calendar = await Calendar.updateOrCreate({ id: data.id ?? null }, data)
      console.log(calendar.id)
      for (const item of data.items) {
        // eslint-disable-next-line max-len
        await CalendarItem.updateOrCreate({ id : item.id ?? null}, {calendarId : calendar.id, ...item})
      }

      return response.ok({ status: true, data: calendar, message: 'El calendario se guardó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al guardar el calendario.'})
    }
  }
}


import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class CalendarItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public calendarId: number

  @column()
  public responsibleId: number

  @column.dateTime()
  public scheduledDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

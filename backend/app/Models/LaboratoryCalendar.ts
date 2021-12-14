import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import LaboratoryCalendarItem from './LaboratoryCalendarItem'

export default class LaboratoryCalendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quarter: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => LaboratoryCalendarItem)
  public items: HasMany<typeof LaboratoryCalendarItem>
}

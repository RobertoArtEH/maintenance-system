import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import CalendarItem from './CalendarItem'

export default class Calendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => CalendarItem)
  public items: HasMany<typeof CalendarItem>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

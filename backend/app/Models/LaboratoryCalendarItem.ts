import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Laboratory from './Laboratory'

export default class LaboratoryCalendarItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public calendarId: number

  @column()
  public responsibleId: number

  @column()
  public laboratoryId: number

  @column.dateTime()
  public laboratoryDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'responsibleId',
    foreignKey: 'id',
  })
  public responsible: HasOne<typeof User>

  @hasOne(() => Laboratory, {
    localKey: 'laboratoryId',
    foreignKey: 'id',
  })
  public laboratory: HasOne<typeof Laboratory>
}

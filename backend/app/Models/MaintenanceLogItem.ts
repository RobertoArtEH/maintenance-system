import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MaintenanceLogItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public maintenanceLogId: number

  @column()
  public stringName: string

  @column()
  public quantity: number

  @column()
  public description: string

  @column()
  public suggestions: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServiceRequestItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public serviceRequestId: number

  @column()
  public itemName: string

  @column()
  public description: string

  @column()
  public generalUbication: string

  @column()
  public specificUbication: string

  @column()
  public serviceDetails: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}

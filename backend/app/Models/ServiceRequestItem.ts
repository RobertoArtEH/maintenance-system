import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServiceRequestItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ isPrimary: true })
  public serviceRequestId: number

  @column({ isPrimary: true })
  public itemName: string

  @column({ isPrimary: true })
  public description: string

  @column({ isPrimary: true })
  public generalUbication: string

  @column({ isPrimary: true })
  public specificUbication: string

  @column({ isPrimary: true })
  public serviceDetails: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceRequestItem from './ServiceRequestItem'

export default class ServiceRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public folio: string

  @column()
  public comments: string

  @column()
  public serviceStatusId: string

  @column()
  public areaId: string

  @column()
  public responsibleId: string

  @column.dateTime()
  public serviceDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @hasMany(() => ServiceRequestItem, {
    localKey: 'id',
    foreignKey: 'serviceRequestId',
  })
  public items: HasMany<typeof ServiceRequestItem>
}

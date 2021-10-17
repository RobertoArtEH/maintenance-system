import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import MaintenanceLogItem from './MaintenanceLogItem'
import User from './User'
import Status from './Status'
import ServiceRequest from './ServiceRequest'

export default class MaintenanceLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public folio: string

  @column()
  public serviceRequestId: number

  @column()
  public serviceTypeId: number

  @column()
  public responsibleId: number

  @column()
  public maintenanceStatusId: number

  @column.dateTime()
  public serviceDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Status, {
    localKey: 'maintenanceStatusId',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>

  @belongsTo(() => ServiceRequest)
  public serviceRequest: BelongsTo<typeof ServiceRequest>

  @hasMany(() => MaintenanceLogItem, {
    localKey: 'id',
    foreignKey: 'maintenanceLogId',
  })
  public items: HasMany<typeof MaintenanceLogItem>

  @hasOne(() => User, {
    localKey: 'responsibleId',
    foreignKey: 'id',
  })
  public responsible: HasOne<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column, HasMany, hasMany, HasOne, hasOne, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import ServiceRequestItem from './ServiceRequestItem'
import { Constants } from '../../constants'
import Status from './Status'
import Area from './Area'
import User from './User'

export default class ServiceRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public folio: string

  @column()
  public comments: string

  @column()
  public serviceStatusId: number

  @column()
  public areaId: number

  @column()
  public responsibleId: number

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

  @hasOne(() => Status, {
    localKey: 'serviceStatusId',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>

  @hasOne(() => Area, {
    localKey: 'areaId',
    foreignKey: 'id',
  })
  public area: HasOne<typeof Area>

  @hasOne(() => User, {
    localKey: 'responsibleId',
    foreignKey: 'id',
  })
  public responsible: HasOne<typeof User>

  @beforeFetch()
  @beforeFind()
  public static fetchItems (query: ModelQueryBuilderContract<typeof ServiceRequest>) {
    query.preload('items', (query) => {
      query.where('item_status_id', '!=', Constants.STATUS_CANCEL)
    })
  }
}

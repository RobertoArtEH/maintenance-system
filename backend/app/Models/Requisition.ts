import { DateTime } from 'luxon'
import { Constants } from '../../constants'
import { BaseModel, beforeFetch, beforeFind, column, HasMany, hasMany, HasOne, hasOne, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import RequisitionItem from './RequisitionItem'
import Status from './Status'
import User from './User'

export default class Requisition extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dependency: string
  
  @column.dateTime()
  public elaborationDate: DateTime

  @column.dateTime()
  public checkInDate: DateTime

  @column()
  public justification: string

  @column()
  public contact: string

  @column()
  public requisitionStatusId: number

  @column()
  public responsibleId: number

  @column()
  public authorizedUserId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => RequisitionItem, {
    localKey: 'id',
    foreignKey: 'requisitionId',
  })
  public items: HasMany<typeof RequisitionItem>

  @hasOne(() => Status, {
    localKey: 'requisitionStatusId',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>

  @hasOne(() => User, {
    localKey: 'responsibleId',
    foreignKey: 'id',
  })
  public responsible: HasOne<typeof User>

  @hasOne(() => User, {
    localKey: 'authorizedUserId',
    foreignKey: 'id',
  })
  public authorizedUser: HasOne<typeof User>

  @beforeFetch()
  @beforeFind()
  public static fetchItems (query: ModelQueryBuilderContract<typeof Requisition>) {
    query.preload('items', (query) => {
      query.where('item_status_id', '!=', Constants.STATUS_CANCEL)
    })
  }
}

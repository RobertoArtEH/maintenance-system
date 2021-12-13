import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RequisitionItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public quantity: number

  @column()
  public unit: string

  @column()
  public unitPrice: number

  @column()
  public description: string

  @column()
  public totalPrice: number

  @column()
  public taxTransfer: number

  @column()
  public taxWithheld: number

  @column()
  public subtotal: number

  @column()
  public total: number

  @column()
  public itemStatusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

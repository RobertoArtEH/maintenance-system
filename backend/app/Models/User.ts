import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'

import Role from './Role'
import Area from './Area'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastName: string

  @column()
  public roleId: number

  @column()
  public careerId: number

  @column()
  public shiftId: number

  @column()
  public email: string

  @column()
  public isAdmin: number

  @column()
  public isActive: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Role, {
    localKey: 'roleId',
    foreignKey: 'id',
  })
  public role: HasOne<typeof Role>

  @hasOne(() => Area, {
    localKey: 'careerId',
    foreignKey: 'id',
  })
  public area: HasOne<typeof Area>
}

import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  beforeFetch,
  beforeFind,
  ModelQueryBuilderContract,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import RolePageFaculty from './RolePageFaculty'
import Role from './Role'
import Area from './Area'
import Database from '@ioc:Adonis/Lucid/Database'

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

  @hasMany(() => RolePageFaculty, {
    localKey: 'roleId',
    foreignKey: 'roleId',
  })
  public pageFaculties: HasMany<typeof RolePageFaculty>

  @beforeFetch()
  @beforeFind()
  public static fetchItems (query: ModelQueryBuilderContract<typeof User>) {
    query
      .preload('role')
      .preload('area')
      .preload('pageFaculties', (pageQuery) => {
        // pageQuery.groupBy('page_id')
      })
  }
}

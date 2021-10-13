import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column, HasOne, hasOne, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Faculty from './Faculty'
import Page from './Page'

export default class RolePageFaculty extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

  @column()
  public pageId: number

  @column()
  public facultyId: number

  @hasOne(() => Role, {
    localKey: 'roleId',
    foreignKey: 'id',
  })
  public role: HasOne<typeof Role>

  @hasOne(() => Page, {
    localKey: 'pageId',
    foreignKey: 'id',
  })
  public page: HasOne<typeof Page>

  @hasOne(() => Faculty, {
    localKey: 'facultyId',
    foreignKey: 'id',
  })
  public faculty: HasOne<typeof Faculty>

  @beforeFetch()
  @beforeFind()
  public static fetchItems (query: ModelQueryBuilderContract<typeof RolePageFaculty>) {
    query
      .preload('role')
      .preload('page')
      .preload('faculty')
  }
}

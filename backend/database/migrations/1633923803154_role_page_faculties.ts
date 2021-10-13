import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolePageFaculties extends BaseSchema {
  protected tableName = 'role_page_faculties'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id')
      table.integer('page_id')
      table.integer('faculty_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

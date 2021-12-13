import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Laboratories extends BaseSchema {
  protected tableName = 'laboratories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

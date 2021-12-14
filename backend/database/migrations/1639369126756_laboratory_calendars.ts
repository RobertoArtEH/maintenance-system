import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LaboratoryCalendars extends BaseSchema {
  protected tableName = 'laboratory_calendars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quarter')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogItems extends BaseSchema {
  protected tableName = 'maintenance_log_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('status').notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}

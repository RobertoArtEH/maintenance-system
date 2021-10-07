import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogs extends BaseSchema {
  protected tableName = 'maintenance_logs'

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

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogItems extends BaseSchema {
  protected tableName = 'maintenance_log_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}

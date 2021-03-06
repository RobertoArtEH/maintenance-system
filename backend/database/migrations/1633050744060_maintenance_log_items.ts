import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogItems extends BaseSchema {
  protected tableName = 'maintenance_log_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('maintenance_log_id')
      table.string('item_name')
      table.integer('quantity')
      table.text('description')
      table.text('suggetions')
      table.integer('item_status_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

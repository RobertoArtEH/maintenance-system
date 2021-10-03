import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogItems extends BaseSchema {
  protected tableName = 'maintenance_log_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('item_name')
      table.integer('quantity')
      table.text('description')
      table.text('suggetions')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

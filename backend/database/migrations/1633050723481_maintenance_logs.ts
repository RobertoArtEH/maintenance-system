import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MaintenanceLogs extends BaseSchema {
  protected tableName = 'maintenance_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('folio')
      table.integer('service_request_id')
      table.integer('service_type_id')
      table.integer('responsible_id')
      table.integer('maintenance_status_id')
      table.dateTime('service_date', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

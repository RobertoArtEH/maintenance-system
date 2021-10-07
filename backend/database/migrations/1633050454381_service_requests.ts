import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceRequests extends BaseSchema {
  protected tableName = 'service_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('folio')
      table.text('comments')
      table.integer('service_status_id')
      table.integer('area_id')
      table.integer('responsible_id')
      table.integer('status_id')
      table.dateTime('service_date', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('deleted_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

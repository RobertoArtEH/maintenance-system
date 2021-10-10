import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceRequestItems extends BaseSchema {
  protected tableName = 'service_request_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_request_id')
      table.string('item_name')
      table.string('description')
      table.string('general_ubication')
      table.string('specific_ubication')
      table.string('service_details')
      table.integer('item_status_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('deleted_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

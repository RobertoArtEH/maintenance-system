import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceRequestsItems extends BaseSchema {
  protected tableName = 'service_requests_items'

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

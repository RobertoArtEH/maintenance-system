import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceRequests extends BaseSchema {
  protected tableName = 'service_requests'

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

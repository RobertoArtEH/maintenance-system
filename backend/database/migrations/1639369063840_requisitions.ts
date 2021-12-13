import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Requisitions extends BaseSchema {
  protected tableName = 'requisitions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('dependency')
      table.dateTime('elaboration_date')
      table.dateTime('check_in_date')
      table.string('justification')
      table.string('contact')
      table.integer('responsible_id')
      table.integer('requisition_status_id')
      table.integer('authorized_user_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

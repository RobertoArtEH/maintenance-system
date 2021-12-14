import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LaboratoryCalendarItems extends BaseSchema {
  protected tableName = 'laboratory_calendar_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('laboratory_calendar_id')
      table.integer('laboratory_id')
      table.integer('responsible_id')
      table.dateTime('laboratory_date')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

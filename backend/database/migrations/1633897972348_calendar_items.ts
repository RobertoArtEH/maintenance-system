import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CalendarItems extends BaseSchema {
  protected tableName = 'calendar_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('calendar_id')
      table.integer('responsible_id')
      table.dateTime('scheduled_date')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

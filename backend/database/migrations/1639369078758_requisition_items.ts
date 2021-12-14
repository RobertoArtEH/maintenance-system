import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RequisitionItems extends BaseSchema {
  protected tableName = 'requisition_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requisition_id')
      table.string('code')
      table.integer('quantity')
      table.string('unit')
      table.float('unit_price')
      table.string('description')
      table.float('total_price')
      table.float('tax_transfer')
      table.float('tax_withheld')
      table.float('subtotal')
      table.float('total')
      table.integer('item_status_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

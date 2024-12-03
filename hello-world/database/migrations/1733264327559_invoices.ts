import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Invoices extends BaseSchema {
  public async up() {
    this.schema.createTable('invoices', (table) => {
      table.increments('id');
      table.string('recipient').notNullable();
      table.decimal('total_ht', 10, 2).notNullable();
      table.decimal('total_ttc', 10, 2).notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable('invoices');
  }
}

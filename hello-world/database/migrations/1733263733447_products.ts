import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Products extends BaseSchema {
  public async up() {
    this.schema.createTable('products', (table) => {
      table.increments('id');
      table.string('code').notNullable();
      table.string('name').notNullable();
      table.decimal('price_ht', 10, 2).notNullable();
      table.decimal('price_ttc', 10, 2).notNullable();
      table.integer('supplier_id').unsigned().references('id').inTable('suppliers');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable('products');
  }
}

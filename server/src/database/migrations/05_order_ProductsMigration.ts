import Knex from "knex";

export function up(knex: Knex) {
  return knex.schema.createTable("order_products", (table) => {
    table.increments("id").primary();

    table
      .integer("order_id")
      .notNullable()
      .references("id")
      .inTable("orders");

    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products");
  });
}
export function down(knex: Knex) {
  return knex.schema.dropTable("purchase_products");
}

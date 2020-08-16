import Knex from "knex";

export function up(knex: Knex) {
  return knex.schema.createTable("purchase_products", (table) => {
    table.increments("id").primary();

    table
      .integer("purchase_id")
      .notNullable()
      .references("id")
      .inTable("purchases");

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

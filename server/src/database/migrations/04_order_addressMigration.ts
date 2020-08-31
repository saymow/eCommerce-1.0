import Knex from "knex";

export function up(knex: Knex) {
  return knex.schema.createTable("order_address", (table) => {
    table.increments("id").primary();
    table.string("state", 2).notNullable();
    table.string("city").notNullable();
    table.string("neighborhood").notNullable();
    table.string("street").notNullable();
    table.integer("number", 4).notNullable();
    table.string("postalCode", 9).notNullable(); //format 99999-999
  });
}

export function down(knex: Knex) {
  return knex.schema.dropSchema("orders_address");
}

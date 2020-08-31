import Knex from "knex";

export function up(knex: Knex) {
  return knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary();
    table.string("state", 2).notNullable();
    table.string("city").notNullable();
    table.string("neighborhood").notNullable();
    table.string("street").notNullable();
    table.integer("number", 4).notNullable();
    table.string("postalCode", 9).notNullable(); //format 99999-999

    table.integer("user_id").notNullable().references("id").inTable("users");
  });
}

export function down(knex: Knex) {
  return knex.schema.dropSchema("address");
}

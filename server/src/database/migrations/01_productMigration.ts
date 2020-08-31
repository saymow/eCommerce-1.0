import Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").notNullable();
    table.integer("price").notNullable();
    table.integer("qntd").notNullable();
    table.string("image").notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("products");
};

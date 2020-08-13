import Knex from "knex";

export function Up(knex: Knex) {
  return knex.schema.createTable("addreess", (table) => {
    
  });
}

export function Down(knex: Knex) {
  return knex.schema.dropSchema("addreess");
}

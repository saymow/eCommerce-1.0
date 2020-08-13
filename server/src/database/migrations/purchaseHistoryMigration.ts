import Knex from "knex";

export function Up(knex: Knex) {
  return knex.schema.createTable("purchase_history", (table) => {
    
  });
}

export function Down(knex: Knex) {
  return knex.schema.dropSchema("purchase_history");
}

import Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.date("birth_date").notNullable();
    table.specificType("password", "char(32)").notNullable();
    table.specificType("cpf", "char(11)").notNullable(); //99999999 99 format
    table.boolean("confirmed").defaultTo(false).notNullable();
    table.boolean("adminPermission").defaultTo(false).notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("users");
};

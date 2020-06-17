import Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.specificType("password", "char(60)").notNullable();
    table.specificType("cpf", "char(11)").notNullable(); //99999999 99 format
    table.specificType("cep", "char(9)").notNullable(); // 99999-999 format
    table.boolean("confirmed").defaultTo(false).notNullable();
    table.boolean("adminPermission").defaultTo(false).notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("users");
};

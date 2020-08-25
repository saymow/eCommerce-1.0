import Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("avatar");
    table.date("birth_date").notNullable();
    table.enum("sex", [0, 1, 2, 9]).notNullable();
    table.string("password", 32).notNullable();
    table.specificType("telephone", "cha(14)"); //031 99999-9999
    table.specificType("cpf", "char(11)").notNullable(); //99999999 99 format
    table.boolean("confirmed").defaultTo(false).notNullable();
    table.boolean("adminPermission").defaultTo(false).notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("users");
};

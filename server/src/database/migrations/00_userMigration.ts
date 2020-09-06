import Knex from "knex";

export const up = (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("avatar");
    table.date("birth_date").notNullable();
    table.enum("sex", [0, 1, 2, 9]).notNullable();
    table.string("password", 60).notNullable();
    table.specificType("telephone", "char(14)"); //031 99999-9999
    table.specificType("cpf", "char(14)").notNullable(); //999.999.999-99
    table.boolean("confirmed").defaultTo(false).notNullable();
    table.boolean("email_signed").defaultTo(false).notNullable();
    table.boolean("adminPermission").defaultTo(false).notNullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable("users");
};

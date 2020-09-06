import Knex from "knex";

export function up(knex: Knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments().primary();
    table.integer("user_id").notNullable();
    table.string("status").notNullable();
    table.integer("raw_price").notNullable();
    table.integer("shipment_price").notNullable();
    table.timestamp("delivered_at");
    
    table
      .integer("address_id")
      .notNullable()
      .references("id")
      .inTable("order_address");

    table
      .timestamp("created_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable();
  });
}

export function down(knex: Knex) {
  return knex.schema.dropSchema("purchases");
}

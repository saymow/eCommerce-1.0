import knex from "knex";

const connection = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION,
})

export default connection;
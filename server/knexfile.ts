import path from "path";

module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION,
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true,
};

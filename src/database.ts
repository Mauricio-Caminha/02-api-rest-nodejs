import { knex as knexConfig, Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === "sqlite3"
      ? {
          filename: env.DATABASE_FILENAME,
        }
      : env.DATABASE_CLIENT,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations/",
  },
};

export const knex = knexConfig(config);

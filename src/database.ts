import { knex as knexConfig, Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_FILENAME,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations/",
  },
};

export const knex = knexConfig(config);

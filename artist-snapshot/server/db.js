// import Pool from "pg";
import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "john-paul",
  password: "Singyy90!@",
  host: "localhost",
  port: 8080,
  database: "webdatadb",
});

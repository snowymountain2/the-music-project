import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

// import Pool from "pg";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "john-paul",
  password: "Singyy90!@",
  host: "localhost",
  port: 5432,
  database: "webdatadb",
});

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

// import pg from "pg";
// const { Client } = pg;

// export const config = new Client({
//   user: "john-paul",
//   password: "Singyy90!@",
//   host: "localhost",
//   port: 5432,
//   database: "webdatadb",
// });

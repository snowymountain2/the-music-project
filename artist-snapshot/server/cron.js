import cron from "node-cron";
import { pool } from "./db.js";
import cors from "cors";

// cron.schedule("* * * * * *", () => {
//   console.log("running a task every minute");
// });

// run scraper every 1 minute
// insert scraped data into database

async function example() {
  await pool.query("INSERT INTO webdatadb (popularTopics) VALUES($1)", [
    ["1", "2"],
  ]);
}

example();

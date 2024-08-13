import cron from "node-cron";

const task = cron.schedule("58 * * * * *", () => {
  console.log("You will see this message every second");
});

task.start();

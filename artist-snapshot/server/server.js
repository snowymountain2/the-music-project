import express from "express";
import puppeteer from "puppeteer-extra";
import cors from "cors";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const app = express();

app.use(cors());

async function run() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.billboard.com/c/music/music-news/");

  const links = await page.evaluate(() => {
    Array.from(document.querySelectorAll("a"), (e) => e.href);
  });

  console.log(links);

  await browser.close();
}

run();

app.listen(8080);

// let values = [{}];

// async function getData() {
//   const response = await fetch(
//     "https://api.spotify.com/v1/albums?ids=4j7Y3vNhgBBRAujJl85UDk&market=US",
//     {
//       headers: {
//         Authorization:
//           "Bearer " +
//           "BQBN8Io0plsX34AkDDy3Ih07MuayY64wS4rBzoQTAPuSfxiYvfVN47cZvnIW0pT9Ers6hUao5JKSp7Y145uGJjBWLiI0XJQctS69OCOv9DQr7cDPWjc",
//       },
//     }
//   );
//   const data = await response.json();
//   values = data;
// }

// getData();

// const items = [{ sample: "jjjj" }];

// app.use((req, res) => {
//   // const test = await getData();
//   // // const item = getData();
//   res.send(values);
// });

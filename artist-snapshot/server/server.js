import express from "express";
import puppeteer from "puppeteer-extra";
// import puppeteer from "puppeteer";
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

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h3"), (e) => e.innerText)
  );

  // const links = await page.evaluate(() => {
  //   Array.from(document.querySelectorAll("a"), (e) => e.href);
  // });

  //console.log(links);

  await browser.close();
  return links;
}

// run();
// const hi = [2, 3, 4];

const test = run();

app.use(async (req, res) => {
  const test = await run();
  console.log("hiiiii", test);
  res.send(test);
});

app.listen(8080);

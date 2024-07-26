import express from "express";
import puppeteer from "puppeteer-extra";
// import puppeteer from "puppeteer";
import cors from "cors";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const app = express();

app.use(cors());

async function retrievePopularTopics() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.billboard.com/c/music/music-news/");

  const popularTopicsData = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h3"), (e) => e.innerText)
  );
  await browser.close();
  return popularTopicsData;
}

async function retrievePopularSongs() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://acharts.co/us_singles_top_100");

  const popularSongsData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("td.cPrinciple > a > span"),
      (e) => e.innerText
    )
  );
  await browser.close();
  return popularSongsData;
}

// async function retrievePopularSongs() {
//   puppeteer.use(StealthPlugin());
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto(
//     "https://music.apple.com/us/playlist/top-100-usa/pl.606afcbb70264d2eb2b51d8dbcfa6a12"
//   );

//   const popularSongsData = await page.evaluate(() =>
//     Array.from(
//       document.querySelectorAll(".songs-list-row__song-name"),
//       (e) => e.innerText
//     )
//   );
//   await browser.close();
//   return popularSongsData;
// }

app.use(async (req, res) => {
  const popularTopicsDataFromScraper = await retrievePopularTopics();
  const popularSongsDataFromScraper = await retrievePopularSongs();
  const scrapedData = [
    {
      popularTopics: [...popularTopicsDataFromScraper],
      popularSongsData: [...popularSongsDataFromScraper],
    },
  ];
  console.log(scrapedData);
  res.send(scrapedData);
});

app.listen(8080);

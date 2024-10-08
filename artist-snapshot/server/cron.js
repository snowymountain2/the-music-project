import cron from "node-cron";
import * as db from "./db.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import "dotenv/config";

console.log(process.env.USER);

const task = cron.schedule("40 * * * * *", async () => {
  await sendScrapedDataToDatabase();
});

task.start();

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

async function retrievePopularAlbums() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://acharts.co/us_albums_top_100");

  const popularAlbumsData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".cImg img"), (e) => e.src)
  );

  await browser.close();
  return popularAlbumsData;
}

async function retrievePopularVideos() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl");

  const popularVideoData = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h3"), (e) => e.innerHTML)
  );

  // extracts only youtube videos that contain music video in them from trending list of vids that contain a wide assortment of stuff
  const listFilteredToMusicVideos = popularVideoData.filter((e) =>
    e.includes("Music Video")
  );

  // extracts the youtube vid id from string of each videos html
  const getMusicVideoYouTubeIds = listFilteredToMusicVideos.map((e) => {
    const youtubeVideoIds = e.slice(
      e.indexOf("?v=") + 3,
      e.indexOf(">", e.indexOf("?v=")) - 1
    );
    return youtubeVideoIds;
  });

  await browser.close();
  return getMusicVideoYouTubeIds;
}

async function sendScrapedDataToDatabase() {
  const popularTopicsDataFromScraper = await retrievePopularTopics();
  const popularSongsDataFromScraper = await retrievePopularSongs();
  const popularVideosFromScraper = await retrievePopularVideos();
  const popularAlbumsFromScraper = await retrievePopularAlbums();

  const addAllMusicdataToDB = await db.query(
    "INSERT INTO scrapeddata(popularTopics, popularSongsData, popularVideosData, popularAlbumData) VALUES($1, $2, $3, $4)",
    [
      popularTopicsDataFromScraper,
      popularSongsDataFromScraper,
      popularVideosFromScraper,
      popularAlbumsFromScraper,
    ]
  );
}

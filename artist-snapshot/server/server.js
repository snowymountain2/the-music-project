import express from "express";
import puppeteer from "puppeteer-extra";
import cors from "cors";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import { config } from "./db.js";
import * as db from "./db.js";

const app = express();

app.use(cors());

// async function retrievePopularTopics() {
//   puppeteer.use(StealthPlugin());
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto("https://www.billboard.com/c/music/music-news/");

//   const popularTopicsData = await page.evaluate(() =>
//     Array.from(document.querySelectorAll("h3"), (e) => e.innerText)
//   );
//   await browser.close();
//   return popularTopicsData;
// }

// async function retrievePopularSongs() {
//   puppeteer.use(StealthPlugin());
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto("https://acharts.co/us_singles_top_100");

//   const popularSongsData = await page.evaluate(() =>
//     Array.from(
//       document.querySelectorAll("td.cPrinciple > a > span"),
//       (e) => e.innerText
//     )
//   );
//   await browser.close();
//   return popularSongsData;
// }

// async function retrievePopularAlbums() {
//   puppeteer.use(StealthPlugin());
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto("https://acharts.co/us_albums_top_100");

//   const popularAlbumsData = await page.evaluate(() =>
//     Array.from(document.querySelectorAll(".cImg img"), (e) => e.src)
//   );
//   await browser.close();
//   return popularAlbumsData;
// }

// async function retrievePopularVideos() {
//   puppeteer.use(StealthPlugin());
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto("https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl");

//   const popularVideoData = await page.evaluate(() =>
//     Array.from(document.querySelectorAll("h3"), (e) => e.innerHTML)
//   );

//   // extracts only youtube videos that contain music video in them from trending list of vids that contain a wide assortment of stuff
//   const listFilteredToMusicVideos = popularVideoData.filter((e) =>
//     e.includes("Music Video")
//   );

//   // extracts the youtube vid id from string of each videos html
//   const getMusicVideoYouTubeIds = listFilteredToMusicVideos.map((e) => {
//     const youtubeVideoIds = e.slice(
//       e.indexOf("?v=") + 3,
//       e.indexOf(">", e.indexOf("?v=")) - 1
//     );
//     return youtubeVideoIds;
//   });

//   const result = await db.query("INSERT INTO webdata (test) VALUEs($1)", [
//     getMusicVideoYouTubeIds,
//   ]);

//   await browser.close();
//   return getMusicVideoYouTubeIds;
// }

async function retrieveConcertData(cityTrimmed, stateTrimmed) {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [`--window-size=2400,1200`], // new option
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    `https://www.bandsintown.com/c/${cityTrimmed}-${stateTrimmed}`
  );

  const concertImageData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".TCef80WG0jxzHaDCaEak div img"),
      (e) => e.src
    )
  );
  const concertDateData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".n5yOOfnMDiOdg8lDW0Zz .RsL1vEQL3esgvcWITgg2 + div"
      ),
      (e) => e.innerText
    )
  );
  const concertNameData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".V5CnK8MdMT0lQKXIxViO"),
      (e) => e.innerText
    )
  );
  const concertLocationData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".nfmyI8S7dEImslMTJtrU"),
      (e) => e.innerText
    )
  );

  const concertDataObject = {
    concertImageURLs: concertImageData,
    concertDate: concertDateData,
    ConcertName: concertNameData,
    ConcertLocation: concertLocationData,
  };

  await browser.close();
  return concertDataObject;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api", async (req, res) => {
  const { desc } = req.body;
  console.log(desc);
  // const additionToDataBase = await db.query(
  //   "INSERT INTO webdata (ex) VALUE($1)",
  //   [desc]
  // );
  const result = await db.query("INSERT INTO webdata (test) VALUEs($1)", [
    ["deddddddsc"],
  ]);
  // console.log(result.rows[0]);
  // res.send(result.rows[0]);
});

app.post("/location", async (req, res) => {
  const formDataFromClient = req.body;
  const [city, state] = formDataFromClient.city.split(",");
  const cityTrimmed = city.trim();
  const stateTrimmed = state.trim();
  const concertData = await retrieveConcertData(cityTrimmed, stateTrimmed);
  res.send(concertData);
});

app.use(async (req, res) => {
  const popularTopicsDataFromScraper = await retrievePopularTopics();
  const popularSongsDataFromScraper = await retrievePopularSongs();
  const popularVideosFromScraper = await retrievePopularVideos();
  const popularAlbumsFromScraper = await retrievePopularAlbums();
  const scrapedData = [
    {
      popularTopics: [...popularTopicsDataFromScraper],
      popularSongsData: [...popularSongsDataFromScraper],
      popularVideosData: [...popularVideosFromScraper],
      popularAlbumData: [...popularAlbumsFromScraper],
    },
  ];
  // console.log(scrapedData[0].popularVideosData);
  res.send(scrapedData);
});

app.listen(8080);

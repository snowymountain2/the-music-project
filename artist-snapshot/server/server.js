import express from "express";
import puppeteer from "puppeteer-extra";
import cors from "cors";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import { config } from "./db.js";
import * as db from "./db.js";

const app = express();

app.use(cors());

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

app.post("/location", async (req, res) => {
  const formDataFromClient = req.body;
  const [city, state] = formDataFromClient.city.split(",");
  const cityTrimmed = city.trim();
  const stateTrimmed = state.trim();
  const concertData = await retrieveConcertData(cityTrimmed, stateTrimmed);
  res.send(concertData);
});

app.use(async (req, res) => {
  const addAllMusicdataToDB = await db.query(
    "select * from scrapeddata order by id desc limit 1"
  );

  // const test = addAllMusicdataToDB.rows[0];
  // const example = [...test.popularvideosdata];
  // // const ex = [typeof addAllMusicdataToDB.rows[0].popularalsongsdata];
  // console.log(example[0]);

  const scrapedData = await [
    {
      popularTopics: [...addAllMusicdataToDB.rows[0].populartopics],
      popularSongsData: [...addAllMusicdataToDB.rows[0].popularsongsdata],
      popularVideosData: [...addAllMusicdataToDB.rows[0].popularvideosdata],
      popularAlbumData: [...addAllMusicdataToDB.rows[0].popularalbumdata],
    },
  ];
  res.send(scrapedData);
});

console.log("hi");

app.listen(8080);

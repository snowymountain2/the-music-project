import React from "react";
import { useEffect, useState } from "react";
import { TopVideos } from "./TopVideos";
import { TopAlbums } from "./TopAlbums";
import { LocationModal } from "./LocationModal";
import { ConcertList } from "./ConcertList";
import { TopSongs } from "./TopSongs";

export interface nonLocationScrapedDataType {
  popularTopics: string[];
  popularSongsData: string[];
  popularVideosData: string[];
  popularAlbumData: string[];
}
export interface locationScrapedDataType {
  concertImageURLs: string[];
  concertDate: string[];
  ConcertName: string[];
  ConcertLocation: string[];
}

export function HomepageSection() {
  const [popularTopics, setPopularTopics] = useState<
    nonLocationScrapedDataType[]
  >([{}]);
  const [concertData, setConcertData] = useState<locationScrapedDataType[]>([
    {},
  ]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/example");
      const formattedData: scrapedDataType[] = await response.json();
      setPopularTopics(formattedData);
    }

    getData();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">The Artist Snapshot</div>
        <LocationModal
          concertData={concertData}
          setConcertData={setConcertData}
        />
        <div className="search-div">
          <form action="" method="POST" className="form">
            <label htmlFor="artist-search"></label>
            <input
              type="search"
              className="search-field"
              name="search-field"
              value="Search Artist"
              id="artist-search"
            ></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
      <div className="main-container-first-row">
        <div className="top-songs">
          <p>
            <h3>Top Songs</h3>
            <TopSongs popularTopics={popularTopics} />
          </p>
        </div>
        <div className="top-videos">
          <h3>Top Videos</h3>
          <div className="top-videos-items">
            <TopVideos YouTubeVideoIDs={popularTopics} />
          </div>
        </div>
        <div className="container-three">
          <div className="main-container-second-row">
            <ConcertList concertData={concertData} />
          </div>
          <div className="trending-topics">
            <h3>Trending Music Topics</h3>
            <p>
              <ol>
                {popularTopics[0].popularTopics === undefined
                  ? "<li>1</li>"
                  : [...Array(10)].map((e, index) => {
                      return (
                        <li key={index} className="list-item">
                          {popularTopics[0].popularTopics[index]}
                        </li>
                      );
                    })}
              </ol>
            </p>
          </div>
          <div className="top-albums">
            <div className="blue-header"></div>
            <h3>Trending Albums</h3>
            <div className="album-container">
              <TopAlbums scrapedData={popularTopics} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="main-container-second-row">
        <ConcertList concertData={concertData} />
      </div> */}
    </>
  );
}

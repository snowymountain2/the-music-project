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
  >([
    {
      popularTopics: [],
      popularSongsData: [],
      popularVideosData: [],
      popularAlbumData: [],
    },
  ]);
  const [concertData, setConcertData] = useState<locationScrapedDataType[]>([
    {
      concertImageURLs: [],
      concertDate: [],
      ConcertName: [],
      ConcertLocation: [],
    },
  ]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/example");
      const formattedData = await response.json();
      setPopularTopics(formattedData);
    }

    getData();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">Today in Music</div>
        <LocationModal setConcertData={setConcertData} />
      </div>
      <div className="main-container">
        <div className="grid-container">
          <div className="main-container-first-row">
            <div className="top-videos">
              <h3>Top Videos</h3>
              <div className="top-videos-items">
                <TopVideos YouTubeVideoIDs={popularTopics} />
              </div>
            </div>
          </div>
          <div className="row-two">
            <div className="top-songs">
              <TopSongs popularTopics={popularTopics} />
            </div>

            <div className="trending-topics">
              <h3>Trending Music Topics</h3>
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
            </div>
            <div className="top-albums">
              <div className="blue-header"></div>
              <h3>Trending Albums</h3>
              <div className="album-container">
                <TopAlbums scrapedData={popularTopics} />
              </div>
            </div>
          </div>
          <div className="row-three">
            <div className="concert-list-row">
              <ConcertList concertData={concertData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useEffect, useState } from "react";

export function HomepageSection() {
  const [popularTopics, setPopularTopics] = useState([{}]);

  useEffect(() => {
    async function getData() {
      let response = await fetch("http://localhost:8080/example");
      let datas = await response.json();
      setPopularTopics(datas);
    }
    console.log("befre", popularTopics.length);

    getData();
    console.log("after", popularTopics.length);
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo"></div>
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
      <div className="main-container">
        <div className="top-songs">
          <p>
            <h2>Top Songs</h2>
            <ol>
              {popularTopics[0].popularSongsData === undefined
                ? "<li>1</li>"
                : [...Array(10)].map((e, index) => {
                    return (
                      <li key={index}>
                        {popularTopics[0].popularSongsData[index]}
                      </li>
                    );
                  })}
            </ol>
          </p>
        </div>
        <div className="top-videos">
          <p>
            <h2> Top Videos </h2>
            <div className="top-videos-items">
              <div className="placeholder"></div>
              <div className="placeholder"></div>
              <div className="placeholder"></div>
              <div className="placeholder"></div>
              <div className="placeholder"></div>
              <div className="placeholder"></div>
            </div>
          </p>
        </div>
        <div className="container-three">
          <div className="trending-topics">
            <h2>Trending Music Topics</h2>
            <p>
              <ol>
                {popularTopics[0].popularTopics === undefined
                  ? "<li>1</li>"
                  : [...Array(10)].map((e, index) => {
                      return (
                        <li key={index}>
                          {popularTopics[0].popularTopics[index]}
                        </li>
                      );
                    })}
                {/* {[...Array(10)].map((element, index) => {
                  return (
                    <li key={index}>{popularTopics.popularTopics[index]}</li>
                  );
                })} */}
              </ol>
            </p>
          </div>
          <div className="top-albums">
            <h2>Trending Albums</h2>
            <div className="album-container">
              <div className="albums"></div>
              <div className="albums"></div>
              <div className="albums"></div>
              <div className="albums"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

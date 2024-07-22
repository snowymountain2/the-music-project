import React from "react";
import { useEffect, useState } from "react";

export function HomepageSection() {
  const [backend, setBackend] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:8080/example")
      .then((response) => response.json())
      .then((data) => console.log(data));
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
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
              <li>asdfsafasdfsf</li>
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
              <ul>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
                <li>sdfasdffddsfddfsddfsfdfdssdf</li>
              </ul>
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

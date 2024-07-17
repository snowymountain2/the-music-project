export function HomepageSection() {
  return (
    <>
      <div className="header">
        <div className="logo">TheArtistSnapshot</div>
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
            </div>
          </p>
        </div>
        <div className="trending-topics">
          <p>
            ply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typese
          </p>
        </div>
        <div className="top-albums">
          <p>
            ply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typese
          </p>
        </div>
      </div>
    </>
  );
}

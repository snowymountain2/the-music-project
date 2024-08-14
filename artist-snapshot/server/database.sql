CREATE DATABASE webdataDB;

CREATE TABLE scrapeddata(
    id SERIAL PRIMARY KEY,
    popularTopics VARCHAR(65000)[],
    popularSongsData VARCHAR(65000)[],
    popularVideosData VARCHAR(65000)[],
    popularAlbumData VARCHAR(65000)[]
);

  
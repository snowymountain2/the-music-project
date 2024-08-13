CREATE DATABASE webdataDB;

CREATE TABLE webdata(
    id SERIAL PRIMARY KEY,
    popularTopics text[],
    popularSongsData text[],
    popularVideosData text[],
    popularAlbumData text[],
);

  
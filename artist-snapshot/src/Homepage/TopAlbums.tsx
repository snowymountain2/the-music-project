import React from "react";

export function TopAlbums({ scrapedData }) {
  return (
    <>
      {scrapedData[0].popularAlbumData === undefined
        ? "<p>sdfJ</p>"
        : [...Array(5)].map((e, i) => {
            return (
              <img
                key={i}
                src={scrapedData[0].popularAlbumData[i]}
                className="album-cover"
              />
            );
          })}
    </>
  );
}

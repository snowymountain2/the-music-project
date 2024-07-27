import React from "react";

export function TopAlbums({ scrapedData }) {
  return (
    <>
      {scrapedData[0].popularAlbumData === undefined
        ? "<p>sdfJ</p>"
        : [...Array(4)].map((e, i) => {
            return (
              <li key={i}>
                <img
                  src={scrapedData[0].popularAlbumData[i]}
                  alt="React Image"
                />
              </li>
            );
          })}
    </>
  );
}

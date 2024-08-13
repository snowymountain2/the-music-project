import React from "react";

export function TopSongs({ popularTopics }) {
  return (
    <>
      <h3>Top Songs</h3>
      <ol>
        {popularTopics[0].popularSongsData === undefined
          ? "<li>1</li>"
          : [...Array(15)].map((e, index) => {
              return (
                <li key={index} className="list-item">
                  {popularTopics[0].popularSongsData[index]}
                </li>
              );
            })}
      </ol>
    </>
  );
}

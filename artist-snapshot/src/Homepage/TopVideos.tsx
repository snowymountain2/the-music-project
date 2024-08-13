import React from "react";
import YouTube from "react-youtube";
import { scrapedDataType } from "./HomepageSection";

// export interface scrapedDataType {
//   popularTopics: string[];
//   popularSongsData: string[];
//   popularVideosData: string[];
//   popularAlbumData: string[];
// }

export function TopVideos({
  YouTubeVideoIDs,
}: {
  YouTubeVideoIDs: scrapedDataType[];
}) {
  const opts = {
    height: "168",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <>
      {YouTubeVideoIDs[0].popularVideosData === undefined
        ? "<p>sdfJ</p>"
        : [...Array(3)].map((e, i) => {
            return (
              <YouTube
                videoId={YouTubeVideoIDs[0].popularVideosData[i]}
                opts={opts}
                className="single-video"
              />
            );
          })}
    </>
  );
}

import YouTube from "react-youtube";

export function TopVideos({ YouTubeVideoIDs }) {
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

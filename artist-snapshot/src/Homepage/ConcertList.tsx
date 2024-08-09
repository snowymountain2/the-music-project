import React from "react";
import { ConcertItem } from "./ConcertItem";
import { locationScrapedDataType } from "./HomepageSection";

export function ConcertList({ concertData }: locationScrapedDataType[]) {
  //   console.log("teeeest", concertData.concertImageURLs);
  return (
    <>
      {concertData.concertImageURLs === undefined
        ? "<p>ddddddd</p>"
        : [...Array(4)].map((e, i) => {
            return (
              <ConcertItem
                key={i}
                concertImageURLs={concertData.concertImageURLs[i]}
                concertDate={concertData.concertDate[i]}
                ConcertName={concertData.ConcertName[i]}
                ConcertLocation={concertData.ConcertLocation[i]}
              />
            );
          })}
    </>
  );
}

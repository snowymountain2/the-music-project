import { ConcertItem } from "./ConcertItem";

export function ConcertList({ concertData }) {
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

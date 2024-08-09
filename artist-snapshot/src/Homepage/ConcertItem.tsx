import React from "react";

export function ConcertItem({
  concertImageURLs,
  concertDate,
  ConcertName,
  ConcertLocation,
}) {
  return (
    <div className="concert-item">
      <img src={concertImageURLs} className="concert-cover" />
      <p>{ConcertName}</p>
    </div>
  );
}

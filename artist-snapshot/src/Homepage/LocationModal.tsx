import React from "react";
import { useState } from "react";

export function LocationModal() {
  const [locationBTNWasClicked, setLocationBTNWasClicked] =
    useState<boolean>(false);
  const [divWasClicked, setDivWasClicked] = useState<boolean>(true);

  function handleLocationBtnClick() {
    setLocationBTNWasClicked(!locationBTNWasClicked);
  }
  function handleDivWasClicked() {
    setDivWasClicked(!divWasClicked);
  }
  return (
    <>
      <button className="concert-btn" onClick={handleLocationBtnClick}>
        Concert Location
      </button>

      <div
        className={
          locationBTNWasClicked && divWasClicked
            ? "modal-container"
            : "modal-hide"
        }
        onClick={handleLocationBtnClick}
      >
        <div
          className={locationBTNWasClicked ? "modal-show" : "modal-hide"}
        ></div>
      </div>
    </>
  );
}

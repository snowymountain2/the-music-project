import React from "react";
import { useState } from "react";

export function LocationModal() {
  const [wasClicked, setWasClicked] = useState<boolean>(false);

  function handleClick() {
    setWasClicked(!wasClicked);
  }
  return (
    <>
      <button className="concert-btn" onClick={handleClick}>
        Concert Location
      </button>
      <div className="modal-container">
        <div className={wasClicked ? "modal-show" : "modal-hide"}></div>
      </div>
    </>
  );
}

import React from "react";
import { useState, useEffect } from "react";

export function LocationModal() {
  const [locationBTNWasClicked, setLocationBTNWasClicked] =
    useState<boolean>(false);
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState<boolean>(false);

  useEffect(() => {
    //     var form = document.getElementById('form');
    // form.addEventListener('submit', function(e){
    //   e.preventDefault();
    //   var formData = new FormData(this);
    //   var data = new URLSearchParams(formData);
    //   fetch('',{
    //     method: 'POST',
    //     body: data
    //   });
  }, []);

  function handleLocationBtnClick() {
    setLocationBTNWasClicked(!locationBTNWasClicked);
    setIsBackgroundDimmed(!isBackgroundDimmed);
  }
  function handleDimmedBackgroundWasClicked() {
    setIsBackgroundDimmed(!isBackgroundDimmed);
    setLocationBTNWasClicked(!locationBTNWasClicked);
  }
  return (
    <>
      <button className="concert-btn btn" onClick={handleLocationBtnClick}>
        Concert Location
      </button>

      <div
        className={
          locationBTNWasClicked && isBackgroundDimmed
            ? "modal-container"
            : "modal-hide"
        }
        onClick={handleDimmedBackgroundWasClicked}
      ></div>
      <div className={locationBTNWasClicked ? "modal-show" : "modal-hide"}>
        <h3>Where to search for concerts?</h3>
        <form
          action="http://localhost:8080/location"
          // encType="multipart/form-data"
          method="post"
        >
          <label htmlFor="name">Location </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Houston, TX"
            required
          />
          <input type="submit" className="location-submit btn" />
          {/* <button className="location-submit btn">Submit</button> */}
        </form>
      </div>
    </>
  );
}

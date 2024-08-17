import { useState } from "react";

export function LocationModal({ setConcertData }) {
  const [locationBTNWasClicked, setLocationBTNWasClicked] =
    useState<boolean>(false);
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState<boolean>(false);

  interface FormData {
    city: string;
  }

  async function handleLocationFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const locationData = data.get("name") as string;
    const example: FormData = {
      city: locationData,
    };
    const raw = await fetch("http://localhost:8080/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(example),
    });
    const newData = await raw.json();
    setConcertData(() => newData);
  }

  function handleLocationBtnClick() {
    setLocationBTNWasClicked(!locationBTNWasClicked);
    setIsBackgroundDimmed(!isBackgroundDimmed);
  }
  function handleDimmedBackgroundWasClicked() {
    setIsBackgroundDimmed(!isBackgroundDimmed);
    setLocationBTNWasClicked(!locationBTNWasClicked);
  }

  function handleFormSubmitButtonClick() {
    setLocationBTNWasClicked(!locationBTNWasClicked);
    setIsBackgroundDimmed(!isBackgroundDimmed);
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
          // action="http://localhost:8080/location"
          // encType="multipart/form-data"
          method="post"
          // onSubmit={handleFormSubmit}
          id="locationform"
          onSubmit={handleLocationFormSubmit}
        >
          <label htmlFor="name">Location </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Houston, TX"
            required
          />
          {/* <input type="submit" className="location-submit btn" /> */}
          <button
            className="location-submit btn"
            type="submit"
            onClick={handleFormSubmitButtonClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

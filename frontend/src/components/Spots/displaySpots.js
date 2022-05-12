import React from "react";
import CustomButtonSpots from "./CustomButtonSpots";

const DisplaySpots = ({ spotList, setHidden, setSingleSpot, singleSpot }) => {
  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="postlist">
      {spotList
        .map((spot, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(spot);
                  setSingleSpot(spot);
                }}
              >
                {" "}
                <div className="name-container">{spot.name}</div>
                <br />
                <p className="post">Address:</p>
                <div className="body-container">{spot.address}</div>
              </button>

              <CustomButtonSpots singleSpot={spot} />
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySpots;
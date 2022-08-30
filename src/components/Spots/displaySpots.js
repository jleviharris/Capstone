import React from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import AxiosUsers from "../../Routes/userRoutes";

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
                <div className="attributesAndAddress">
                  <div className="attributes">
                    Vert: {spot.vert}
                    <br />
                    Street: {spot.street}
                    <br />
                  </div>
                  <div className="body-container">{spot.address}</div>
                </div>
              </button>

              {/* <CustomButtonSpots singleSpot={singleSpot} /> */}
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySpots;

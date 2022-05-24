import React from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import AxiosUsers from "../../Routes/userRoutes";

const DisplaySpots = ({ spotList, setHidden, setSingleSpot }) => {
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
                <div className="nameAndLike">
                  <div className="name-container">{spot.name}</div>
                  <CustomButtonSpots singleSpot={spot} />
                </div>
                <br />
                <p className="post">Address:</p>
                <div className="body-container">{spot.address}</div>
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySpots;

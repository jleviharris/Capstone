import React from "react";


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
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySpots;

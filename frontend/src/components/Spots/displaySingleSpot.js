import "../Posts/MyPost.css";

import AxiosSpots from "../../Routes/spotsRoutes";
import React from "react";
import CustomButtonSpots from "./CustomButtonSpots";

const DisplaySingleSpot = ({ singleSpot, setHidden, handleClick, userId }) => {
 
  

  return (
    <div>
    <div className="delete-post">
      {singleSpot && singleSpot.name} <br />
      {singleSpot.address}
      {console.log(singleSpot.name)}
    </div>
    <div>
      <CustomButtonSpots singleSpot={singleSpot}/>
    </div>
    </div>
  );
};

export default DisplaySingleSpot;
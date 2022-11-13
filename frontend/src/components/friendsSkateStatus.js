import "../components/Posts/MyPost.css";
import "../components/Friends/friends.css";

import React, { useState, useEffect } from "react";

const FriendSkateStatus = ({ friend }) => {
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");

  useEffect(() => {
    setButtons();
  }, []);

  function setButtons() {
    if (friend.skateStatus === "Active") {
      setSkateActive("activeOn");
      setSkateInactive("inactiveOff");
    } else if (friend.skateStatus === "Inactive") {
      setSkateActive("activeOff");
      setSkateInactive("inactiveOn");
    }
  }

  function displaySkateLocation() {
    if (friend.currentPark.length > 2) {
      return (
        <div className="friendStatus">
          {" "}
          <div id="friendSkateButton" className={skateActive}>
            <i
              id="active"
              className="material-symbols-outlined"
              style={{ curser: "default" }}
            >
              skateboarding
            </i>
          </div>
          <div className="friendCheckIn">
            {friend.checkInTime} {friend.name} checked in to{" "}
            {friend.currentPark} for {friend.skateTime}{" "}
          </div>
        </div>
      );
    } else
      return (
        <div className="friendStatus">
          {" "}
          <div id="friendSkateButton" className={skateInactive}>
            <i
              id="inactive"
              className="fa-solid fa-skull-crossbones"
              style={{ curser: "default" }}
            ></i>
          </div>
          <div className="friendCheckIn"> Not Active</div>
        </div>
      );
  }

  return <div>{displaySkateLocation()}</div>;
};
export default FriendSkateStatus;

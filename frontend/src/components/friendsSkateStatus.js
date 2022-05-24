import "../components/Posts/MyPost.css";

import React, { useState, useEffect } from "react";

const FriendSkateStatus = ({ friend }) => {
  const [update, setUpdate] = useState(false);
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");

  // const { user } = useContext(AuthContext);
  // const userId = user._id || null;
  // console.log(user.skateStatus);

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
      return <div>Skating at {friend.currentPark}</div>;
    } else return <div> Not Active</div>;
  }

  return (
    <div>
      <p>Skate Status</p>
      <div id="friendSkateButton" className={skateActive}>
        <i
          id="active"
          className="material-symbols-outlined"
          style={{ curser: "default" }}
        >
          skateboarding
        </i>
      </div>
      <div id="friendSkateButton" className={skateInactive}>
        <i
          id="inactive"
          className="fa-solid fa-skull-crossbones"
          style={{ curser: "default" }}
        ></i>
      </div>
      {displaySkateLocation()}
    </div>
  );
};
export default FriendSkateStatus;

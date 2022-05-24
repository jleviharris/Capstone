import "../components/Posts/MyPost.css";

import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import AxiosUsers from "../Routes/userRoutes";
import AuthContext from "../context/AuthContext";
import AxiosSkateStatus from "../Routes/skateStatusRoutes";
import DisplaySingleSpot from "./Spots/displaySingleSpot";

const SetSkateStatus = ({ userId, freshUser, singleSpot, user }) => {
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");
  const [update, setUpdate] = useState(false);

  // const { user } = useContext(AuthContext);
  // const userId = user._id || null;
  // console.log(user.skateStatus);
  console.log(user);

  async function setUsersSkateStatus(userId, obj) {
    await AxiosSkateStatus.updateSkateStatus(userId, obj);
  }
  async function updateCurrentPark(userId, obj) {
    await AxiosSkateStatus.updateCurrentPark(userId, obj);
  }

  useEffect(() => {
    setButtons();
  }, []);

  function setButtons() {
    if (freshUser.skateStatus === "Active") {
      setSkateActive("activeOn");
      setSkateInactive("inactiveOff");
    } else if (freshUser.skateStatus === "Inactive") {
      setSkateActive("activeOff");
      setSkateInactive("inactiveOn");
    }
  }

  function handleClick(event) {
    if (event.target.id === "active") {
      if (skateActive === "activeOn") {
        setSkateActive("activeOff");
        setUsersSkateStatus(userId, { skateStatus: "Inactive" });
        updateCurrentPark(userId, { currentPark: singleSpot.blankName });
        setSkateInactive("inactiveOn");
      } else if (skateActive === "activeOff") {
        setSkateActive("activeOn");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        updateCurrentPark(userId, { currentPark: singleSpot.name });
        setSkateInactive("inactiveOff");
      }
    } else if (event.target.id === "inactive") {
      if (skateInactive === "inactiveOn") {
        setSkateInactive("inactiveOff");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        updateCurrentPark(userId, { currentPark: singleSpot.name });
        setSkateActive("activeOn");
      } else if (skateInactive === "inactiveOff") {
        setSkateInactive("inactiveOn");
        setUsersSkateStatus(userId, { skateStatus: "Inactive" });
        updateCurrentPark(userId, { currentPark: singleSpot.blankName });
        setSkateActive("activeOff");
      }
    }
  }
  function displaySkateLocation() {
    if (
      freshUser.currentPark.length > 2 &&
      freshUser.currentPark != singleSpot.name
    ) {
      return (
        <div>
          Currently checked in at {freshUser.currentPark}, to check in to{" "}
          {singleSpot.name} please recheck the skate icon
        </div>
      );
    } else if (
      freshUser.currentPark.length > 2 &&
      freshUser.currentPark === singleSpot.name
    ) {
      return <div>Checked in to {freshUser.currentPark}</div>;
    } else return <div> Not Active</div>;
  }

  return (
    <div className="spotSkateStatus">
      <p>Skate Status</p>
      <button
        className={skateActive}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <i id="active" className="material-symbols-outlined">
          skateboarding
        </i>
      </button>
      <button
        className={skateInactive}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <i id="inactive" className="fa-solid fa-skull-crossbones"></i>
      </button>
      {displaySkateLocation()}
    </div>
  );
};
export default SetSkateStatus;

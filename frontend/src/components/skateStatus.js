import "../components/Posts/MyPost.css";

import React, { useState, useContext, useEffect } from "react";
import AxiosUsers from "../Routes/userRoutes";
import AuthContext from "../context/AuthContext";
import AxiosSkateStatus from "../Routes/skateStatusRoutes";

const SetSkateStatus = ({
  user,
  userId,
  skateInactive,
  setSkateInactive,
  skateActive,
  setSkateActive,
}) => {
  // const [skateActive, setSkateActive] = useState("");
  // const [skateInactive, setSkateInactive] = useState("");
  // const { user } = useContext(AuthContext);
  // const userId = user._id || null;

  useEffect(() => {
    if (user.skateStatus === "Active") {
      setSkateActive("activeOn");
      setSkateInactive("inactiveOff");
    } else if (user.skateStatus === "Inactive") {
      setSkateActive("activeOff");
      setSkateInactive("inactiveOn");
    }
  }, []);

  async function setUsersSkateStatus(userId, obj) {
    await AxiosSkateStatus.updateSkateStatus(userId, obj);
  }
  function handleClick(event) {
    if (event.target.id === "active") {
      if (skateActive === "activeOn") {
        setSkateActive("activeOff");
        setUsersSkateStatus(userId, { skateStatus: "Inactive" });
        setSkateInactive("inactiveOn");
      } else if (skateActive === "activeOff") {
        setSkateActive("activeOn");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        setSkateInactive("inactiveOff");
      }
    } else if (event.target.id === "inactive") {
      if (skateInactive === "inactiveOn") {
        setSkateInactive("inactiveOff");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        setSkateActive("activeOn");
      } else if (skateInactive === "inactiveOff") {
        setSkateInactive("inactiveOn");
        setUsersSkateStatus(userId, { skateStatus: "Inactive" });
        setSkateActive("activeOff");
      }
    }
  }

  return (
    <div>
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
    </div>
  );
};
export default SetSkateStatus;

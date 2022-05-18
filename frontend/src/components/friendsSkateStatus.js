import "../components/Posts/MyPost.css";

import React, { useState, useContext, useEffect } from "react";
// import AxiosUsers from "../Routes/userRoutes";
// import AuthContext from "../context/AuthContext";

const FriendsSkateStatus = ({
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

  function handleClick(event) {
    //   async function setSkateStatusActive(userId, body) {
    //     await AxiosUsers.updateUser(userId, body);
    //     return body;
    //   }
    //   async function setSkateStatusInactive(userId, body) {
    //     await AxiosUsers.updateUser(userId, body);
    //     return body;
    //   }

    if (event.target.id === "active") {
      if (skateActive === "activeOn") {
        setSkateActive("activeOff");
        //  setSkateStatusInactive();
        setSkateInactive("inactiveOn");
      } else if (skateActive === "activeOff") {
        setSkateActive("activeOn");
        // setSkateStatusActive();
        setSkateInactive("inactiveOff");
      }
    } else if (event.target.id === "inactive") {
      if (skateInactive === "inactiveOn") {
        setSkateInactive("inactiveOff");
        //  setSkateStatusActive();
        setSkateActive("activeOn");
      } else if (skateInactive === "inactiveOff") {
        setSkateInactive("inactiveOn");
        // setSkateStatusInactive();
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
export default FriendsSkateStatus;

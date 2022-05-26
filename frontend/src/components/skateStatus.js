import "../components/Posts/MyPost.css";

import React, { useState, useEffect } from "react";
import bootstrap from "bootstrap";
import AxiosSkateStatus from "../Routes/skateStatusRoutes";
import AxiosUsers from "../Routes/userRoutes";

// Blank Slate
// click like button to active
// set like button to green
// take current time save as check in time
// update check in time
// create radio button with 30 min incriments
// take user input save as checkout time
// update Checkout time
// take checkout - current time = Skate Time
// update Skate Time

// done
// Start from click inactive
// set red to black
// set check in time to null
// set checkout time to null
// set skatetime to null or zero

const SetSkateStatus = ({ userId, freshUser, singleSpot }) => {
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");
  const [checkInTime, setCheckInTime] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [skateTime, setSkateTime] = useState("");
  const [hidden, setHidden] = useState(false);
  const [title, setTitle] = useState("Set Skate Time");
  const [checkInTitle, setCheckInTitle] = useState("Check In");
  const [checkOutTitle, setCheckOutTitle] = useState("Check Out");

  // const currentTime = Date.now();
  // const currentTimestamp = currentTime.valueOf();
  // console.log(currentTime);
  // console.log(currentTimestamp);
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}
   at ${padTo2Digits(current.getHours())}:${padTo2Digits(
    current.getMinutes()
  )}`;

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  function handleHiddenTrue() {
    setHidden(true);
  }
  function handleHiddenFalse() {
    setHidden(false);
  }
  function refreshPage() {
    window.location.reload(false);
  }

  async function setUsersSkateStatus(userId, obj) {
    await AxiosSkateStatus.updateSkateStatus(userId, obj);
  }
  async function updateCurrentPark(userId, obj) {
    await AxiosSkateStatus.updateCurrentPark(userId, obj);
  }
  async function updateCheckInTime(userId, obj) {
    await AxiosUsers.updateCheckInTime(userId, obj);
  }
  async function updateCheckOutTime(userId, obj) {
    await AxiosUsers.updateCheckOutTime(userId, obj);
  }
  async function updateSkateTime(userId, obj) {
    await AxiosUsers.updateSkateTime(userId, obj);
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
        // updateCheckInTime(userId, {checkInTime: ""});
        // updateCheckOutTime(userId, {checkOutTime: ""});
        // updateSkateTime(userId, {skateTime: ""});
        setSkateInactive("inactiveOn");
      } else if (skateActive === "activeOff") {
        setSkateActive("activeOn");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        updateCurrentPark(userId, { currentPark: singleSpot.name });
        updateCheckInTime(userId, { checkInTime: date });
        console.log(freshUser);
        // updateCheckOutTime(userId, {checkOutTime: });
        // updateSkateTime(userId, {skateTime: });
        setSkateInactive("inactiveOff");
      }
    } else if (event.target.id === "inactive") {
      if (skateInactive === "inactiveOn") {
        setSkateInactive("inactiveOff");
        setUsersSkateStatus(userId, { skateStatus: "Active" });
        updateCurrentPark(userId, { currentPark: singleSpot.name });
        updateCheckInTime(userId, { checkInTime: date });
        console.log(freshUser.checkInTime);
        // updateCheckOutTime(userId, {checkOutTime: });
        // updateSkateTime(userId, {skateTime: });
        setSkateActive("activeOn");
      } else if (skateInactive === "inactiveOff") {
        setSkateInactive("inactiveOn");
        setUsersSkateStatus(userId, { skateStatus: "Inactive" });
        updateCurrentPark(userId, { currentPark: singleSpot.blankName });
        updateCheckInTime(userId, { checkInTime: date });
        // updateCheckOutTime(userId, { checkOutTime: "" });
        // updateSkateTime(userId, { skateTime: "" });
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
          Currently checked in at {freshUser.currentPark} <br />
          <br />
          If you would like to check in to {singleSpot.name} please recheck in.
        </div>
      );
    } else if (
      freshUser.currentPark.length > 2 &&
      freshUser.currentPark === singleSpot.name
    ) {
      return (
        <div>
          Checked in to {freshUser.currentPark} on {freshUser.checkInTime}
          <br /> Skating for {freshUser.skateTime}
        </div>
      );
    } else return <div> Not Active</div>;
  }
  // function submitForm() {
  //   let tempSelectInput = document.getElementById("skateTimeDropdown").value;
  //   let selectedInput = tempSelectInput.value;
  //   console.log(selectedInput);
  // }

  return (
    <div className="spotSkateStatus">
      {!hidden && <p>Set Skate Status</p>}
      <div>
        {hidden && (
          <div className="dropdown">
            <button
              className="btn btn-secondary btn-danger dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {title}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button
                  onClick={() => {
                    setTitle("30 Minutes");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "30 Minutes" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  30 Minutes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTitle("1 Hour");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "1 Hour" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  1 Hour
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTitle("2 Hours");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "2 Hours" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  2 Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTitle("4 Hours");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "4 Hours" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  4 Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTitle("6 Hours");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "6 Hours" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  6 Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTitle("All Day");
                    handleHiddenFalse();
                    updateSkateTime(userId, { skateTime: "All Day" });
                    refreshPage();
                  }}
                  className="dropdown-item"
                  type="button"
                >
                  All Day
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        {!hidden && (
          <div className="setStatusButtons">
            <div>
              <button
                className={skateActive}
                onClick={(event) => {
                  if (freshUser.skateTime === "null") {
                    alert("Please select your skate time");
                  } else {
                    handleClick(event);
                    handleHiddenTrue();
                  }
                  // handleUpdate(event);
                }}
              >
                <i id="active" className="material-symbols-outlined">
                  skateboarding
                </i>
              </button>
              {checkInTitle}
            </div>
            <div>
              <button
                className={skateInactive}
                onClick={(event) => {
                  handleClick(event);

                  // handleUpdate(event);
                }}
              >
                <i id="inactive" className="fa-solid fa-skull-crossbones"></i>
              </button>
              {checkOutTitle}
            </div>

            {displaySkateLocation()}
          </div>
        )}
      </div>
    </div>
  );
};
export default SetSkateStatus;

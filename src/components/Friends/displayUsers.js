import "../Posts/MyPost.css";

import React, { useState } from "react";
import AxiosUsers from "../../Routes/userRoutes";
import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const DisplayUsers = ({
  userList,
  setHidden,
  setSingleUser,
  userId,
  handleClick,
  userFriendRequestList,
  userSentFriendRequestList,
  userFriendsList,
}) => {
  const { user } = useContext(AuthContext);
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [arrow, setArrow] = useState("arrow_downward");
  const [checkedUsers, setCheckedUsers] = useState(false);

  let allLists = [userId];
  allLists.push.apply(allLists, userFriendsList);
  allLists.push.apply(allLists, userFriendRequestList);
  allLists.push.apply(allLists, userSentFriendRequestList);

  async function sendFriendRequest(userId, obj) {
    await AxiosUsers.updateUsersFriendRequests(userId, obj);
    console.log(userId);
    console.log(obj);
  }
  async function addToPendingFriends(userId, obj) {
    await AxiosUsers.addToPendingFriends(userId, obj);
    console.log(userId);
    console.log(obj);
  }

  async function filterUsers(users) {
    let newList = [];
    for (let i = 0; i < users.length; i++) {
      if (userId !== users[i]._id) {
        if (!allLists.includes(users[i]._id)) {
          newList.push(users[i]);
        }
      }
    }

    setUpdatedUsers(newList);
  }

  function handleClickHidden() {
    setHidden(true);
  }
  function handleCheckedUsers() {
    if (checkedUsers) {
      setCheckedUsers(false);
    } else if (!checkedUsers) {
      setCheckedUsers(true);
    }
  }
  function handleArrow() {
    if (arrow === "arrow_upward") {
      setArrow("arrow_downward");
    } else if (arrow === "arrow_downward") {
      setArrow("arrow_upward");
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="friendList">
      <div className="friendListHead">
        <div>Add Friends</div>
        <button
          onClick={() => {
            filterUsers(userList);
            handleCheckedUsers();
            handleArrow();
          }}
        >
          <span className="material-symbols-outlined">{arrow}</span>
        </button>
      </div>
      {checkedUsers && (
        <div className="friendMapList">
          {updatedUsers
            .map((user, index) => {
              return (
                <div key={index} className="friendBody">
                  {/* <button
                    className="addFriendButtonLink"
                    onClick={() => {
                      handleClickHidden();
                      setSingleUser(user);
                    }}
                  > */}
                  <div className="friendBody">
                    {" "}
                    <div className="nameAndButton">
                      <button
                        onClick={() => {
                          // The user logged in "userId"
                          // The user being sent a friend request "user._id"
                          sendFriendRequest(user._id, {
                            friendRequests: userId,
                          });
                          addToPendingFriends(userId, {
                            pendingFriends: user._id,
                          });
                          handleClick();
                          alert(`Friend request sent`);
                          refreshPage();
                        }}
                      >
                        Send Request
                      </button>{" "}
                      <div className="name-container">{user.name}</div>
                    </div>
                    <p className="titles">About:</p>
                    <div className="name-container">{user.aboutMe}</div>
                    <p className="titles">Stance:</p>
                    <div className="name-container">{user.stance}</div>
                    {/* </button> */}
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;

import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React from "react";
import { useState } from "react";

const DisplayFriendRequests = ({
  userFriendRequestList,
  setHidden,
  setSingleUser,
  usersFriendRequest,
  setUsersFriendRequest,
  userId,
}) => {
  const [arrow, setArrow] = useState("arrow_downward");
  const [checkedUsers, setCheckedUsers] = useState(false);
  const [friendObjList, setFriendObjList] = useState([]);
  async function acceptFriendRequest(userId, obj) {
    await AxiosUsers.acceptFriendRequests(userId, obj);
  }
  async function removeFromFriendRequests(userId, obj) {
    await AxiosUsers.removeFromFriendRequests(userId, obj);
  }
  async function removeFromPendingFriends(userId, obj) {
    await AxiosUsers.removeFromPendingFriends(userId, obj);
  }

  function handleClick() {
    setHidden(true);
  }
  async function getFriendById(user) {
    let friend = await AxiosUsers.getUser(user);
    if (friend) {
      return friend;
    }
  }

  async function convertFriendsListToObjects(users) {
    let newList = [];
    for (let i = 0; i < users.length; i++) {
      let newObj = await getFriendById(users[i]);
      newList.push(newObj);
    }
    setFriendObjList(newList);
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
        <div>Friend Requests</div>
        <button
          onClick={() => {
            convertFriendsListToObjects(userFriendRequestList);
            handleCheckedUsers();
            handleArrow();
          }}
        >
          <span className="material-symbols-outlined">{arrow}</span>
        </button>
      </div>
      {checkedUsers && (
        <div className="friendMapList">
          {friendObjList
            .map((theUser, index) => {
              return (
                <div key={index} className="friendBody">
                  <button
                    className="my-friend-button"
                    onClick={() => {
                      handleClick(theUser);
                      setSingleUser(theUser);
                    }}
                  >
                    {" "}
                    <div className="nameAndButton">
                      <button
                        onClick={() => {
                          // the user logged in "userId"
                          // the user that originally sent the friend request "theUser"
                          acceptFriendRequest(userId, {
                            friendsList: theUser._id,
                          });
                          acceptFriendRequest(theUser._id, {
                            friendsList: userId,
                          });
                          removeFromFriendRequests(userId, {
                            friendRequests: theUser._id,
                          });
                          removeFromPendingFriends(theUser._id, {
                            pendingFriends: userId,
                          });
                          refreshPage();
                        }}
                      >
                        Accept Friend Request
                      </button>

                      <div className="name-container">{theUser.name}</div>
                    </div>
                    <p className="titles">About:</p>
                    <div className="name-container">{theUser.aboutMe}</div>
                    <p className="titles">Stance:</p>
                    <div className="name-container">{theUser.stance}</div>
                  </button>
                </div>
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
};

export default DisplayFriendRequests;

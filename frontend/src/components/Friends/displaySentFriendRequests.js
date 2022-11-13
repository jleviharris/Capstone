import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplaySentFriendRequests = ({
  userSentFriendRequestList,
  setHidden,
  userId,
}) => {
  const [friendObjList, setFriendObjList] = useState([]);
  const [usersFriend, setUsersFriend] = useState("");
  const [arrow, setArrow] = useState("arrow_downward");
  const [checkedUsers, setCheckedUsers] = useState(false);
 
 
  async function removeFromFriendRequests(userId, obj) {
    await AxiosUsers.removeFromFriendRequests(userId, obj);
  }
  async function removeFromPendingFriends(userId, obj) {
    await AxiosUsers.removeFromPendingFriends(userId, obj);
  }

  async function getFriendById(user) {
    let friend = await AxiosUsers.getUser(user);
    if (friend) {
      setUsersFriend(friend.name);
    }
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
        <div>Pending Friends</div>
        <button
          onClick={() => {
            convertFriendsListToObjects(userSentFriendRequestList);
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
            .map((user, index) => {
              return (
                <div key={index} className="friendBody">
                  <button
                    onClick={() => {
                      // the user logged in "userId"
                      // the user that originally sent the friend request "theUser"
                      removeFromFriendRequests(user._id, {
                        friendRequests: userId,
                      });
                      removeFromPendingFriends(userId, {
                        pendingFriends: user._id,
                      });
                      alert("Friend Request Canceled");
                      refreshPage();
                    }}
                  >
                    Cancel Friend Request
                  </button>

                  <div className="friendBody">
                    {" "}
                    <div className="name-container">{user.name}</div>
                    <p className="titles">About:</p>
                    <div className="name-container">{user.aboutMe}</div>
                    <p className="titles">Stance:</p>
                    <div className="name-container">{user.stance}</div>
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

export default DisplaySentFriendRequests;

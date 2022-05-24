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
  return (
    <div className="postlist">
      <div className="postlistHead">
        <div>Friend Requests</div>
        <button
          onClick={() => {
            convertFriendsListToObjects(userFriendRequestList);
          }}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
      </div>

      {friendObjList
        .map((theUser, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(theUser);
                  setSingleUser(theUser);
                }}
              >
                {" "}
                <div className="name-container">{theUser.name}</div>
              </button>
              <button
                onClick={() => {
                  // the user logged in "userId"
                  // the user that originally sent the friend request "theUser"
                  acceptFriendRequest(userId, { friendsList: theUser._id });
                  acceptFriendRequest(theUser._id, { friendsList: userId });
                  removeFromFriendRequests(userId, {
                    friendRequests: theUser._id,
                  });
                  removeFromPendingFriends(theUser._id, {
                    pendingFriends: userId,
                  });
                }}
              >
                Accept Friend Request
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayFriendRequests;

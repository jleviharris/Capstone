import "../Posts/MyPost.css";

import React from "react";
import AxiosUsers from "../../Routes/userRoutes";

const DisplayUsers = ({ userList, setHidden, setSingleUser, userId }) => {
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

  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="postlist">
      <div>Users</div>
      {userList
        .map((user, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(user);
                  setSingleUser(user);
                }}
              >
                {" "}
                <div className="name-container">{user.name}</div>
              </button>

              <button
                onClick={() => {
                  // The user logged in "userId"
                  // The user being sent a friend request "user._id"
                  sendFriendRequest(user._id, { friendRequests: userId });
                  addToPendingFriends(userId, { pendingFriends: user._id });
                }}
              >
                Send Request
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayUsers;

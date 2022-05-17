import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React from "react";

const DisplayFriendRequests = ({
  userFriendRequestList,
  setHidden,
  setSingleUser,
  usersFriendRequest,
  setUsersFriendRequest,
  userId,
}) => {
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
      setUsersFriendRequest(friend.name);
    }
  }
  return (
    <div className="postlist">
      <div>Friend Requests</div>
      {userFriendRequestList
        .map((theUser, index) => {
          getFriendById(theUser);
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
                <div className="name-container">{usersFriendRequest}</div>
              </button>
              <button
                onClick={() => {
                  // the user logged in "userId"
                  // the user that originally sent the friend request "theUser"
                  acceptFriendRequest(userId, { friendsList: theUser });
                  acceptFriendRequest(theUser, { friendsList: userId });
                  removeFromFriendRequests(userId, { friendRequests: theUser });
                  removeFromPendingFriends(theUser, { pendingFriends: userId });
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

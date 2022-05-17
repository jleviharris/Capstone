import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplayCurrentFriends = ({
  userFriendsList,
  setHidden,
  setSingleUser,
  userId,
}) => {
  const [usersFriend, setUsersFriend] = useState("");

  async function removeFriend(userId, obj) {
    await AxiosUsers.removeFriend(userId, obj);
  }

  function handleClick() {
    setHidden(true);
  }

  async function getFriendById(user) {
    let friend = await AxiosUsers.getUser(user);
    if (friend) {
      setUsersFriend(friend.name);
    }
  }
  return (
    <div className="postlist">
      <div>Friends</div>
      {userFriendsList
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
                <div className="name-container">{usersFriend}</div>
              </button>
              <button
                onClick={() => {
                  //logged in user "userId"
                  // logged out user "theUser"
                  removeFriend(userId, { friendsList: theUser });
                  removeFriend(theUser, { friendsList: userId });

                  console.log(theUser);
                }}
              >
                Unfollow
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayCurrentFriends;

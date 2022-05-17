import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplaySentFriendRequests = ({
  userSentFriendRequestList,
  setHidden,
  setSingleUser,
}) => {
  const [usersFriend, setUsersFriend] = useState("");
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
      <div>Pending Friends</div>
      {userSentFriendRequestList
        .map((user, index) => {
          getFriendById(user);
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
                <div className="name-container">{usersFriend}</div>
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySentFriendRequests;

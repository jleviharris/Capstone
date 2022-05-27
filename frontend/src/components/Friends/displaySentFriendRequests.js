import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplaySentFriendRequests = ({
  userSentFriendRequestList,
  setHidden,
  setSingleUser,
}) => {
  const [friendObjList, setFriendObjList] = useState([]);
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
    <div className="friendList">
      <div className="friendListHead">
        <div>Pending Friends</div>
        <button
          onClick={() => {
            convertFriendsListToObjects(userSentFriendRequestList);
          }}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
      </div>
      {friendObjList
        .map((user, index) => {
          return (
            <div key={index} className="friendBody">
              <button
                className="my-friend-button"
                onClick={() => {
                  handleClick(user);
                  setSingleUser(user);
                }}
              >
                {" "}
                <div className="friendName-container">{user.name}</div>
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplaySentFriendRequests;

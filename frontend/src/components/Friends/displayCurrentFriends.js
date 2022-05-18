import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState, useContext, useEffect } from "react";
import SetSkateStatus from "../skateStatus";
import AuthContext from "../../context/AuthContext";

const DisplayCurrentFriends = ({
  userFriendsList,
  setHidden,
  setSingleUser,
  userId,
}) => {
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");
  const [friendObjList, setFriendObjList] = useState([]);
  const { user } = useContext(AuthContext);

  async function removeFriend(userId, obj) {
    await AxiosUsers.removeFriend(userId, obj);
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
      <div>Your Friends</div>
      <button
        onClick={() => {
          convertFriendsListToObjects(userFriendsList);
        }}
      >
        <span className="material-symbols-outlined">arrow_downward</span>
      </button>
      {friendObjList
        .map((friend, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(friend._id);
                  setSingleUser(friend._id);
                }}
              >
                {" "}
                <div className="name-container">{friend.name}</div>
                <p className="post">About:</p>
                <div className="name-container">{friend.aboutMe}</div>
                <p className="post">Stance:</p>
                <div className="name-container">{friend.stance}</div>
              </button>
              <SetSkateStatus
                user={user}
                userId={userId}
                skateInactive={skateInactive}
                setSkateInactive={setSkateInactive}
                skateActive={skateActive}
                setSkateActive={setSkateActive}
              />
              <button
                onClick={() => {
                  //logged in user "userId"
                  // logged out user "theUser"
                  removeFriend(userId, { friendsList: friend._id });
                  removeFriend(friend._id, { friendsList: userId });

                  console.log(friend);
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

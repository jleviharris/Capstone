import "../Friends/friends.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState, useContext, useEffect } from "react";
import FriendSkateStatus from "../friendsSkateStatus";
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
  const [checkedFriends, setCheckedFriends] = useState(false);
  const [arrow, setArrow] = useState("arrow_downward");
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
  function handleCheckedFriends() {
    if (checkedFriends) {
      setCheckedFriends(false);
    } else if (!checkedFriends) {
      setCheckedFriends(true);
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
        <div>Your Friends</div>
        <button
          onClick={() => {
            convertFriendsListToObjects(userFriendsList);
            handleCheckedFriends();
            handleArrow();
          }}
        >
          <span className="material-symbols-outlined">{arrow}</span>
        </button>
      </div>
      {checkedFriends && (
        <div className="friendMapList">
          {friendObjList
            .map((friend, index) => {
              return (
                <div key={index} className="friendBody">
                  <div>
                    <div className="friendButtons">
                      <button
                        className="my-friend-button"
                        onClick={() => {
                          handleClick(friend._id);
                          setSingleUser(friend._id);
                        }}
                      >
                        {" "}
                        <div className="friendName-container">
                          {friend.name}
                        </div>
                        {/* <p className="post">About:</p>
                <div className="name-container">{friend.aboutMe}</div>
                <p className="post">Stance:</p>
                <div className="name-container">{friend.stance}</div> */}
                      </button>{" "}
                      <button
                        onClick={() => {
                          //logged in user "userId"
                          // logged out user "theUser"
                          removeFriend(userId, { friendsList: friend._id });
                          removeFriend(friend._id, { friendsList: userId });
                          refreshPage();
                          alert(`${friend.name} unfollowed`);
                          console.log(friend);
                        }}
                      >
                        Unfollow
                      </button>
                    </div>
                    <FriendSkateStatus friend={friend} />
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

export default DisplayCurrentFriends;

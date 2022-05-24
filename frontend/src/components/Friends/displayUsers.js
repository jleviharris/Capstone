import "../Posts/MyPost.css";

import React, { useState } from "react";
import AxiosUsers from "../../Routes/userRoutes";
import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const DisplayUsers = ({
  userList,
  setHidden,
  setSingleUser,
  userId,
  handleClick,
  userFriendRequestList,
  userSentFriendRequestList,
  userFriendsList,
}) => {
  const { user } = useContext(AuthContext);
  const [updatedUsers, setUpdatedUsers] = useState([]);

  let allLists = [userId];
  allLists.push.apply(allLists, userFriendsList);
  allLists.push.apply(allLists, userFriendRequestList);
  allLists.push.apply(allLists, userSentFriendRequestList);

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

  // async function filterUsers(users) {
  //   let newList = [];
  //   console.log(users);
  //   for (let i = 0; i < users.length; i++) {
  //     if (userId !== users[i]._id) {
  //       if (user.friendsList.length > 0) {
  //         for (let k = 0; k < user.friendsList.length; k++) {
  //           if (users[i]._id !== user.friendsList[k]) {
  //             newList.push(users[i]);
  //             console.log(newList);
  //           } else if (user.pendingFriends.length > 0) {
  //             for (let j = 0; j < user.pendingFriends.length; j++) {
  //               if (users[i]._id !== user.pendingFriends[j]) {
  //                 newList.push(users[i]);
  //                 console.log(newList);
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         newList.push(users[i]);
  //       }
  //     }
  //   }
  //   setUpdatedUsers(newList);
  //   console.log(updatedUsers);
  // }
  async function filterUsers(users) {
    let newList = [];
    for (let i = 0; i < users.length; i++) {
      if (userId !== users[i]._id) {
        if (!allLists.includes(users[i]._id)) {
          newList.push(users[i]);
        }
      }
    }

    setUpdatedUsers(newList);
  }

  function handleClickHidden() {
    setHidden(true);
  }

  return (
    <div className="postlist">
      <div className="postlistHead">
        <div>Add Friends</div>
        <button
          onClick={() => {
            filterUsers(userList);
          }}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
      </div>
      {updatedUsers
        .map((user, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClickHidden();
                  setSingleUser(user);
                }}
              >
                {" "}
                <div className="name-container">{user.name}</div>
                <p className="post">About:</p>
                <div className="name-container">{user.aboutMe}</div>
                <p className="post">Stance:</p>
                <div className="name-container">{user.stance}</div>
              </button>

              <button
                onClick={() => {
                  // The user logged in "userId"
                  // The user being sent a friend request "user._id"
                  sendFriendRequest(user._id, { friendRequests: userId });
                  addToPendingFriends(userId, { pendingFriends: user._id });
                  handleClick();
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

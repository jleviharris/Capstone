import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplayFriendRequests = ({ userFriendRequestList, setHidden, setSingleUser }) => {
    const [usersFriendRequest, setUsersFriendRequest]= useState('');
  function handleClick() {
    setHidden(true);
  }
  
 async function getFriendById(user){
     let friend = await AxiosUsers.getUser(user)
     if (friend) {setUsersFriendRequest(friend.name)}
 }
  return (
    <div className="postlist">
      <div>Friend Requests</div>
      {userFriendRequestList
        .map((user, index) => {
            getFriendById(user)
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
                <div className="name-container">{usersFriendRequest}</div>
                {/* <div className="body-container">{post.body}</div> */}
              </button>

          
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayFriendRequests;
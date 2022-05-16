import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React, { useState } from "react";

const DisplayCurrentFriends = ({ userFriendsList, setHidden, setSingleUser }) => {
    const [usersFriend, setUsersFriend]= useState('');
  function handleClick() {
    setHidden(true);
  }
  
 async function getFriendById(user){
     let friend = await AxiosUsers.getUser(user)
     if (friend) {setUsersFriend(friend.name)}
 }
  return (
    <div className="postlist">
      <div>Friends</div>
      {userFriendsList
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
                <div className="name-container">{usersFriend}</div>
                {/* <div className="body-container">{post.body}</div> */}
              </button>

          
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayCurrentFriends;
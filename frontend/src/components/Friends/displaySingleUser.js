import "../Posts/MyPost.css";
import AxiosUsers from "../../Routes/userRoutes";
import React from "react";
import { useEffect } from "react";

const DisplaySingleUser = ({ singleUser, setHidden, handleClick, userId, setUserList, userList }) => {
 

//   useEffect(() => {
//     getPosts(userId);
//   }, []);

//   async function getPosts(spotId) {
//     let posts = await AxiosPosts.getAPostBySpotId(spotId);
//     if (posts) {
//       setPostList(posts);
//     } else setPostList({ Object: "No Posts" });
//   }

//   async function deleteAPost(postId) {
//     await AxiosPosts.deletePost(postId);
//     setHidden(false);
//     let click = () => {
//       handleClick();
//     };
//     click();
//     return postId;
//   }
  function setHiddenFalse(){
    setHidden(false);
  }
  function sendFriendRequest(){
   
  }

  return (
    <div className="delete-post">
      {singleUser.name} <br />
      <button onClick={()=> {sendFriendRequest()}}>Send friend request</button>
      <button onClick={()=> {setHiddenFalse()}}>X</button>
    </div>
  );
};

export default DisplaySingleUser;
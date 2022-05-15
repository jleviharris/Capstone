import "../Posts/MyPost.css";

import AxiosPosts from "../../Routes/postRoutes";
import React from "react";
import { useEffect } from "react";

const DisplaySinglePost = ({ singlePost, setHidden, handleClick, userId, setPostList, postList }) => {
 

  useEffect(() => {
    getPosts(userId);
  }, []);

  async function getPosts(spotId) {
    let posts = await AxiosPosts.getAPostBySpotId(spotId);
    if (posts) {
      setPostList(posts);
    } else setPostList({ Object: "No Posts" });
  }

  async function deleteAPost(postId) {
    await AxiosPosts.deletePost(postId);
    setHidden(false);
    let click = () => {
      handleClick();
    };
    click();
    return postId;
  }
  function setHiddenFalse(){
    setHidden(false);
  }

  return (
    <div className="delete-post">
      {singlePost && singlePost.name} <br />
      {singlePost.body}
      {console.log(singlePost.name)}
      <button
        className="my-post-button"
        onClick={() => {
          if (singlePost.userId === userId) {
            deleteAPost(singlePost._id);
          } else alert("Not authorized to delete post");
        }}
      >
        Delete Post
      </button>
      <button onClick={()=> {setHiddenFalse()}}>X</button>
    </div>
  );
};

export default DisplaySinglePost;

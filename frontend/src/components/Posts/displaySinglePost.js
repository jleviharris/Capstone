import "../Posts/MyPost.css";

import AxiosPosts from "../../Routes/postRoutes";
import React from "react";
import { useEffect } from "react";

const DisplaySinglePost = ({
  singlePost,
  setHidden,
  handleClick,
  userId,
  setPostList,
  postList,
}) => {
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
  function setHiddenFalse() {
    setHidden(false);
  }

  return (
    <div className="delete-post-fullPage">
      <div className="delete-post">
        <button
          className="delete-post-button"
          onClick={() => {
            if (singlePost.userId === userId) {
              deleteAPost(singlePost._id);
            } else alert("Not authorized to delete post");
          }}
        >
          Delete Review
        </button>
        <div className="delete-body"> {singlePost.body}</div>

        <button
          onClick={() => {
            setHiddenFalse();
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DisplaySinglePost;

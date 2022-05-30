import "../Posts/MyPost.css";
import AxiosPosts from "../../Routes/postRoutes";
import { useEffect, useState } from "react";

import React from "react";

const DisplayPostsSpot = ({
  spotId,
  update,
  setUpdate,
  singlePost,
  setSinglePost,
  // postList,
  // setPostList,
  hidden,
  setHidden,
  singleSpot,
}) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, [postList]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getAllPosts() {
    let posts = await AxiosPosts.getAllPosts();
    if (posts) {
      let tempList = [];
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].spotPost === spotId) {
          tempList.push(posts[i]);
        }
      }
      setPostList(tempList);
    }
  }

  return (
    <div className="allReviewsList">
      {postList
        .map((post, index) => {
          return (
            <div key={index} className="allReviewsBody">
              <button
                className="all-reviews-button"
                onClick={() => {
                  handleClick();
                  setSinglePost(post);
                  setHidden(true);
                }}
              >
                {" "}
                <div className="name-container-posts">{post.name}</div>
                <div className="name-container-posts">{post.time}</div>
                <br />
                <div className="postBody-container">{post.body}</div>
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPostsSpot;

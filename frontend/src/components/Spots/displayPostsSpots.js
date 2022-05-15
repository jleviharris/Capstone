import "../Posts/MyPost.css";
import AxiosPosts from "../../Routes/postRoutes";
import { useEffect, useState } from "react";

import React from "react";

const DisplayPostsSpot = ({ spotId, update, setUpdate, singlePost, setSinglePost, postList, setPostList, hidden, setHidden }) => {


  useEffect(() => {
    getAllPosts();
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getAllPosts() {
    let posts = await AxiosPosts.getAllPosts();
    if (posts) {
      let newList = [];
      for (let i = 0; i < posts.length; i++) {
          if (posts[i].spotId === spotId) {
            newList.push(posts[i]);
        }
      }
      setPostList(newList);
    } else setPostList({ Object: "No Posts" });
  }


  return (
    <div className="postlist">
      {postList
        .map((post, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(post);
                  setSinglePost(post);
                  setHidden(true);
                }}
              >
                {" "}
                <div className="name-container">{post.name}</div>
                <br />
                <p className="post">Post:</p>
                <div className="body-container">{post.body}</div>
              </button>

           
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPostsSpot;
import "../Posts/MyPost.css";

import CustomButton from "./likeButton";
import React from "react";
import { useState } from "react";
import AxiosSpots from "../../Routes/spotsRoutes";

const DisplayPosts = ({ postList, setHidden, setSinglePost }) => {
  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="reviewsList">
      {postList
        .map((post, index) => {
          // getReviewSpotName(post);
          return (
            <div key={index} className="postbody">
              <button
                className="my-review-button"
                onClick={() => {
                  handleClick(post);
                  setSinglePost(post);
                }}
              >
                {" "}
                {/* <div className="name-container-reviews">{post.name}</div>
                <br /> */}
                <p className="post">Post:</p>
                <div className="body-container-reviews">{post.body}</div>
                <p className="post">Spot:</p>
                <div className="spotinfo-container-reviews">{post.spotId}</div>
                <p className="post">Posted:</p>
                <div className="spotinfo-container-reviews">{post.time}</div>
              </button>

              {/* <CustomButton post={post} /> */}
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPosts;

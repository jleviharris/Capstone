import "../Posts/MyPost.css";

import CustomButton from "./likeButton";
import React from "react";
import { useState } from "react";
import AxiosSpots from "../../Routes/spotsRoutes";

const DisplayPosts = ({ postList, setHidden, setSinglePost }) => {
  // const [postsSpot, setPostsSpot] = useState("");

  // async function getSpotFromPost(post) {
  //   let id = post.spotId;
  //   let spot = await AxiosSpots.getASpot(id);
  //   if (spot) {
  //     setPostsSpot(spot.name);
  //   } else setPostsSpot("N/A");
  // }
  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="postlist">
      {postList
        .map((post, index) => {
          // console.log(post);
          // getSpotFromPost(post);
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(post);
                  setSinglePost(post);
                }}
              >
                {" "}
                <div className="name-container">{post.name}</div>
                <br />
                <p className="post">Post:</p>
                <div className="body-container">{post.body}</div>
                <p className="post">Spot:</p>
                {/* <div className="body-container">{postsSpot}</div> */}
              </button>

              <CustomButton post={post} />
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPosts;

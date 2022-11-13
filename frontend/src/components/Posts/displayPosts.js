import React from "react";
import "../Posts/MyPost.css";

const DisplayPosts = ({ postList, setHidden, setSinglePost }) => {
  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="reviewsList">
      {postList
        .map((post, index) => {
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
                <div className="spotInfoHeader">
                  <div className="spotinfo-container-reviews">
                    {post.spotId}
                  </div>
                  <div className="spotinfo-container-reviews">{post.time}</div>
                </div>
                <div className="body-container-reviews">{post.body}</div>
              </button>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPosts;

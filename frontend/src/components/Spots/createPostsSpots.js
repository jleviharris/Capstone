import "../Posts/MyPost.css";

import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import AxiosPosts from "../../Routes/postRoutes";

const CreatePostSpot = ({ userId, handleClick, spotId, singleSpot }) => {
  const [value, setValue] = useState("");
  const { user } = useContext(AuthContext);
  const name = user.name;

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}
   at ${padTo2Digits(current.getHours())}:${padTo2Digits(
    current.getMinutes()
  )}`;

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  function handlePost(event) {
    event.preventDefault();

    let newPost = {
      body: value,
      userId: userId,
      name: name,
      spotId: singleSpot.name,
      spotPost: spotId,
      time: date,
    };
    createNewPost(newPost);
    setValue("");
    let click = () => {
      handleClick();
    };
    click();
  }
  async function createNewPost(obj) {
    await AxiosPosts.updatePosts(obj);
    return obj;
  }

  return (
    <form className="postContainer" onSubmit={handlePost}>
      <div className="textAreaAndBttn">
        <textarea
          type="text"
          placeholder="Write a review"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handlePost(event);
            }
          }}
        />
        <button type="submit" className="postButton">
          Post
        </button>
      </div>
    </form>
  );
};
export default CreatePostSpot;

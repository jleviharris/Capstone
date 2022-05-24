import "../Posts/MyPost.css";

import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import AxiosPosts from "../../Routes/postRoutes";

const CreatePostSpot = ({ userId, handleClick, spotId }) => {
  const [value, setValue] = useState("");
  const { user } = useContext(AuthContext);
  const name = user.name;

  function handlePost(event) {
    event.preventDefault();

    let newPost = {
      body: value,
      userId: userId,
      name: name,
      spotId: spotId,
      spotPost: spotId,
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
      <div>
        <textarea
          type="text"
          placeholder="Place a review"
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

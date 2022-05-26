import AuthContext from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import "../../App.css";
import AxiosPosts from "../../Routes/postRoutes";

const CustomButton = ({ post }) => {
  const [buttonClass, setButtonClass] = useState("likeButton");
  const [buttonClass2, setButtonClass2] = useState("dislikeButton");
  const [numOfLikes, setNumOfLikes] = useState(null);
  const [numOfDislikes, setNumOfDislikes] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;

  useEffect(() => {
    setNumOfLikes(post.likes.length);
    setNumOfDislikes(post.dislikes.length);
    if (post.dislikes.includes(userId)) {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButtonActive");
    } else if (post.likes.includes(userId)) {
      setButtonClass("likeButtonActive");
      setButtonClass2("dislikeButton");
    } else {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButton");
    }
  }, []);

  function handleClick(event) {
    async function updateTheLikeList(postId, obj) {
      await AxiosPosts.updatePostsLikes(postId, obj);
      return obj;
    }
    async function updateTheDislikeList(postId, obj) {
      await AxiosPosts.updatePostsDislikes(postId, obj);
      return obj;
    }
    async function updateTheLikeListRemove(postId, obj) {
      await AxiosPosts.updatePostsLikesRemove(postId, obj);
      return obj;
    }
    async function updateTheDislikeListRemove(postId, obj) {
      await AxiosPosts.updatePostsDislikesRemove(postId, obj);
      return obj;
    }

    let likes = "likes";
    let dislikes = "dislikes";
    if (event.target.id === "like") {
      if (buttonClass === "likeButton") {
        setButtonClass("likeButtonActive");
        updateTheLikeList(post._id, { likes: userId });
        updateTheDislikeListRemove(post._id, { dislikes: userId });
        setButtonClass2("dislikeButton");
      } else {
        setButtonClass("likeButton");
      }
    } else if (event.target.id === "dislike") {
      if (buttonClass2 === "dislikeButton") {
        setButtonClass2("dislikeButtonActive");
        updateTheLikeListRemove(post._id, { likes: userId });
        updateTheDislikeList(post._id, { dislikes: userId });
        setButtonClass("likeButton");
      } else {
        setButtonClass2("dislikeButton");
      }
    }
  }
  return (
    <div className="likeAndDislike">
      <button
        className={buttonClass}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <div>{numOfLikes}</div>
        <i id="like">
          <span class="material-symbols-outlined">favorite</span>
        </i>
      </button>
      <button
        className={buttonClass2}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <div>{numOfDislikes}</div>
        <i id="dislike">
          <span class="material-symbols-outlined">heart_broken</span>
        </i>
      </button>
    </div>
  );
};

export default CustomButton;

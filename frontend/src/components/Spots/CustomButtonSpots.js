import AuthContext from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import "../../App.css";
import AxiosSpots from "../../Routes/spotsRoutes";

const CustomButtonSpots = ({ singleSpot }) => {
  const [buttonClass, setButtonClass] = useState("likeButton");
  const [buttonClass2, setButtonClass2] = useState("dislikeButton");
  const [numOfLikes, setNumOfLikes] = useState(null);
  const [numOfDislikes, setNumOfDislikes] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const spotId = singleSpot._id || null;

  
  useEffect(() => {
   
    setNumOfLikes(singleSpot.likes.length);
    setNumOfDislikes(singleSpot.dislikes.length);
    if (singleSpot.dislikes.includes(userId)) {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButtonActive");
    } else if (singleSpot.likes.includes(userId)) {
      setButtonClass("likeButtonActive");
      setButtonClass2("dislikeButton");
    } else {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButton");
    }
    
  }, []);
 
 
 

  function handleClick(event) {


   

    async function updateTheLikeList(spotId, obj) {
      await AxiosSpots.updateSpotsLikes(spotId, obj);
      return obj;
    }
    async function updateTheDislikeList(spotId, obj) {
      await AxiosSpots.updateSpotsDislikes(spotId, obj);
      return obj;
    }
    async function updateTheLikeListRemove(spotId, obj) {
      await AxiosSpots.updateSpotsLikesRemove(spotId, obj);
      return obj;
    }
    async function updateTheDislikeListRemove(spotId, obj) {
      await AxiosSpots.updateSpotsDislikesRemove(spotId, obj);
      return obj;
    }
   


    let likes="likes";
    let dislikes="dislikes";
    if (event.target.id === "like") {
      if (buttonClass === "likeButton") {
        setButtonClass("likeButtonActive");
        updateTheLikeList(singleSpot._id, { likes: userId });
        updateTheDislikeListRemove(singleSpot._id,  {dislikes: userId});
        setButtonClass2("dislikeButton");  
      } else {
        setButtonClass("likeButton");
      }
    } else if (event.target.id === "dislike") {
      if (buttonClass2 === "dislikeButton") {
        setButtonClass2("dislikeButtonActive");
        updateTheLikeListRemove(singleSpot._id, { likes: userId });
        updateTheDislikeList(singleSpot._id, {dislikes: userId});
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
        <i id="like" className="fa fa-thumbs-up"></i>
      </button>
      <button
        className={buttonClass2}
        onClick={(event) => {
      
          handleClick(event);
        
        }}
      >
        <div>{numOfDislikes}</div>
        <i id="dislike" className="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
};

export default CustomButtonSpots;
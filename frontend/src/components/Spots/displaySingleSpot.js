import "../Posts/MyPost.css";

import React, { useState } from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import CreatePostSpot from "./createPostsSpots";
import DisplayPostsSpot from "./displayPostsSpots";
import ErrorBoundary from "../../pages/ErrorBoundary";
import DisplaySinglePost from "../Posts/displaySinglePost";

const DisplaySingleSpot = ({ singleSpot, handleClick, userId, setPostList, postList }) => {
const spotId=singleSpot._id;
const [update, setUpdate] = useState(false);
const [singlePost, setSinglePost] = useState();
const [hidden, setHidden] = useState(false);


  return (
    <div>
    <div className="delete-post">
      {singleSpot && singleSpot.name} <br />
      {singleSpot.address}
      {console.log(singleSpot.name)}
    </div>
    <div>
      <CustomButtonSpots singleSpot={singleSpot}/>
    </div>
    <div>
      <CreatePostSpot spot={singleSpot} userId={userId} spotId={spotId} handleClick={handleClick}/>
      </div>


      <div>
    {hidden === false && (
      <div>
        <ErrorBoundary>
        <DisplayPostsSpot spotId={spotId} setPostList={setPostList} postList={postList} singlePost={singlePost} setSinglePost={setSinglePost} update={update} setUpdate={setUpdate} hidden={hidden} setHidden={setHidden}/>
        </ErrorBoundary>
      </div>
    )}
    {hidden && (
      <DisplaySinglePost
        singlePost={singlePost}
        setHidden={setHidden}
        handleClick={handleClick}
        userId={userId}
      />
    )}
  </div>




   
   
   
   
   
   
   
   
   
   
    </div>
  );
};


export default DisplaySingleSpot;
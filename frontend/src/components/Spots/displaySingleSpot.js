import "../Posts/MyPost.css";
import React, { useState } from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import CreatePostSpot from "./createPostsSpots";
import DisplayPostsSpot from "./displayPostsSpots";
import ErrorBoundary from "../../pages/ErrorBoundary";
import DisplaySinglePost from "../Posts/displaySinglePost";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const DisplaySingleSpot = ({
  singleSpot,
  handleClick,
  userId,
  setPostList,
  postList,
}) => {
  const spotId = singleSpot._id;
  const [update, setUpdate] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const [hidden, setHidden] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Error</div>;
  }

  const defaultProps = {
    center: {
      lat: 44,
      lng: -80,
    },
    zoom: 10,
  };

  return (
    <div>
      <div className="delete-post">
        {singleSpot && singleSpot.name} <br />
        {singleSpot.address}
        {console.log(singleSpot.name)}
      </div>
      <div>
        <CustomButtonSpots singleSpot={singleSpot} />
      </div>
      <div>
        <CreatePostSpot
          spot={singleSpot}
          userId={userId}
          spotId={spotId}
          handleClick={handleClick}
        />
      </div>

      <div>
        {hidden === false && (
          <div>
            <ErrorBoundary>
              <DisplayPostsSpot
                spotId={spotId}
                setPostList={setPostList}
                postList={postList}
                singlePost={singlePost}
                setSinglePost={setSinglePost}
                update={update}
                setUpdate={setUpdate}
                hidden={hidden}
                setHidden={setHidden}
              />
            </ErrorBoundary>
            <div style={{ height: "90vh", width: "90vw" }}>
              <GoogleMap
                Center={defaultProps.center}
                Zoom={defaultProps.zoom}
                mapContainerStyle={{ width: "100vh", height: "100vh" }}
              />
            </div>
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

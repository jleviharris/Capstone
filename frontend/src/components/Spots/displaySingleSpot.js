import "../Posts/MyPost.css";
import React, { useState, useCallback, useEffect } from "react";
import CreatePostSpot from "./createPostsSpots";
import DisplayPostsSpot from "./displayPostsSpots";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SetSkateStatus from "../skateStatus";
import API_KEY from "../../config/default";

const DisplaySingleSpot = ({
  singleSpot,
  handleClick,
  userId,
  freshUser,
  user,
  setHidden,
  hidden,
}) => {
  const spotId = singleSpot._id;
  const [update, setUpdate] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const [postList, setPostList] = useState([]);
  const [latitude, setLatitude] = useState(parseFloat(singleSpot.lat));
  const [longitude, setLongitude] = useState(parseFloat(singleSpot.lng));

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  function MyComponent() {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: API_KEY,
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
      setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
      setMap(null);
    }, []);

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        mapTypeId={"satellite"}
        onLoad={onLoad}
        onUnmount={onUnmount}
        tilt={45}
        labels={true}
      >
        <Marker position={center} />
        <></>
      </GoogleMap>
    ) : (
      <></>
    );
  }

  return (
    <div className="singleSpotFull">
      <div className="singleSpot">
        <div className="singleSpotName">
          {singleSpot.name}{" "}
          <button className="closeButton" onClick={() => setHidden(false)}>
            X
          </button>
        </div>
        <br />
        <div className="parkAttributes">
          Vert: {singleSpot.vert}
          <br />
          Street: {singleSpot.street}
          <br />
          <br />
        </div>
        <div className="singleSpotAddress"> {singleSpot.address}</div>

      </div>
      <div className="singleSpotSkateStatus">
        <SetSkateStatus
          singleSpot={singleSpot}
          freshUser={freshUser}
          user={user}
          userId={userId}
        />
      </div>
      <div>{MyComponent()}</div>
      <div className="reviews">
        <h3>Reviews</h3>
        <div>
          <CreatePostSpot
            singleSpot={singleSpot}
            userId={userId}
            spotId={spotId}
            handleClick={handleClick}
          />
        </div>
      </div>

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
    </div>
  );
};

export default DisplaySingleSpot;

import "../Posts/MyPost.css";
import React, { useState, useCallback, useEffect } from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import CreatePostSpot from "./createPostsSpots";
import DisplayPostsSpot from "./displayPostsSpots";
import ErrorBoundary from "../../pages/ErrorBoundary";
import DisplaySinglePost from "../Posts/displaySinglePost";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import SetSkateStatus from "../skateStatus";
import AxiosUsers from "../../Routes/userRoutes";
import API_KEY from "../../config/default";

const DisplaySingleSpot = ({
  singleSpot,
  handleClick,
  userId,
  setPostList,
  postList,
  freshUser,
  user,
  setHidden,
  hidden,
}) => {
  const spotId = singleSpot._id;
  const [update, setUpdate] = useState(false);
  const [singlePost, setSinglePost] = useState();

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
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
      setMap(null);
    }, []);

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
        <></>
      </GoogleMap>
    ) : (
      <></>
    );
  }

  return (
    <div>
      <div className="singleSpot">
        <button onClick={() => setHidden(false)}>X</button>
        {singleSpot.name} <br />
        {singleSpot.address}
        <CustomButtonSpots singleSpot={singleSpot} />
      </div>
      <div>
        <SetSkateStatus
          singleSpot={singleSpot}
          freshUser={freshUser}
          user={user}
          userId={userId}
        />
      </div>
      <div>{MyComponent()}</div>
      <h3>Reviews</h3>
      <div>
        <CreatePostSpot
          spot={singleSpot}
          userId={userId}
          spotId={spotId}
          handleClick={handleClick}
        />
      </div>
      {/* <DisplayPostsSpot /> */}

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

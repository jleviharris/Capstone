import "../Posts/MyPost.css";
import React, { useState, useCallback } from "react";
import CustomButtonSpots from "./CustomButtonSpots";
import CreatePostSpot from "./createPostsSpots";
import DisplayPostsSpot from "./displayPostsSpots";
import ErrorBoundary from "../../pages/ErrorBoundary";
import DisplaySinglePost from "../Posts/displaySinglePost";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

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
  console.log(center);

  function MyComponent() {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyBJBWiGfUWj4aso1nNFAU_7z - arIr3_tn4",
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
        zoom={15}
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
            <div>{MyComponent()}</div>
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

// import React from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import { useState, useCallback, memo } from "react";

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
//   });

//   const [map, setMap] = useState(null);

//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default memo(MyComponent);

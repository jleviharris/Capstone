import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";



const FriendsPage = () => {
  const [spotList, setSpotList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singleSpot, setSingleSpot] = useState();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getAllSpots();
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getAllSpots() {
    let spots = await AxiosSpots.getAllSpots();
    if (spots) {
      setSpotList(spots);
    } else setSpotList({ Object: "No Spots" });
  }

  return (
    <div>
      {hidden === false && (
        <div>
          <ErrorBoundary>
            <DisplaySpots
              spotList={spotList}
              setHidden={setHidden}
              setSingleSpot={setSingleSpot}
            />
          </ErrorBoundary>
        </div>
      )}
      {hidden && (
        <DisplaySingleSpot
          singleSpot={singleSpot}
          setHidden={setHidden}
          handleClick={handleClick}
          userId={userId}
          singleSpot={singleSpot}
          setPostList={setPostList}
          postList={postList}
        />
      )}
    </div>
  );
};

export default SpotsPage;
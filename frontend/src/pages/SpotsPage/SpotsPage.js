import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import AxiosSpots from "../../Routes/spotsRoutes";
import DisplaySpots from "../../components/Spots/displaySpots";
import DisplaySingleSpot from "../../components/Spots/displaySingleSpot";
import AxiosUsers from "../../Routes/userRoutes";

const SpotsPage = () => {
  
  const [spotList, setSpotList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singleSpot, setSingleSpot] = useState();

  const [freshUser, setFreshUser] = useState();

  async function setUser(userId) {
    let tempUser = await AxiosUsers.getUser(userId);
    setFreshUser(tempUser);
  }
  useEffect(() => {
    getAllSpots();
    setUser(userId);
  }, [!update]);

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
    <div className="spotsPageBackground">
      {hidden === false && (
        <div>
          <div className="parksHeader">Select a park! </div>
          <div>
            <ErrorBoundary>
              <DisplaySpots
                spotList={spotList}
                setHidden={setHidden}
                setSingleSpot={setSingleSpot}
                hidden={hidden}
                singleSpot={singleSpot}
              />
            </ErrorBoundary>
          </div>
        </div>
      )}
      {hidden && (
        <DisplaySingleSpot
          singleSpot={singleSpot}
          setHidden={setHidden}
          handleClick={handleClick}
          userId={userId}
          freshUser={freshUser}
          user={user}
        />
      )}
    </div>
  );
};

export default SpotsPage;

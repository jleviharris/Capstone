import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import AxiosSpots from "../../Routes/spotsRoutes";
import DisplaySpots from "../../components/Spots/displaySpots";
import DisplaySingleSpot from "../../components/Spots/displaySingleSpot";

const SpotsPage = () => {
  const [spotList, setSpotList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singleSpot, setSingleSpot] = useState();

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
        />
      )}
    </div>
  );
};

export default SpotsPage;
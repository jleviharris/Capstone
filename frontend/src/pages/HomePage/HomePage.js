import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="HP-Header">Welcome, {user.name}! </div>

      <ul className="HP-ul">
        <li className="home-page-park">
          {user && (
            <button
              className="HP-button"
              onClick={() => {
                navigate("/spots");
              }}
            >
              Check into a Park
            </button>
          )}
        </li>
        <li className="home-page-friends">
          {user && (
            <button
              className="HP-button"
              onClick={() => {
                navigate("/friendsPage");
              }}
            >
              See friends
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HomePage;

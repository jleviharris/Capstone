import "./ProfilePage.css";


import React, { useContext } from "react";
import Name from "../../components/Name/Name";
import AboutMe from "../../components/AboutMe/AboutMe";
import Stance from "../../components/Stance/Stance";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profilePageBackground">
      <h1 className="profile-name">Profile for {user.name}</h1>

      <div className="profile">
            <Name />
            <AboutMe />
            <Stance /> 
      </div>
    </div>
  );
};

export default ProfilePage;

import "./ProfilePage.css";

import { Col, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Name from "../../components/Name/Name";
import AboutMe from "../../components/AboutMe/AboutMe";
import Stance from "../../components/Stance/Stance";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="profile-name">Profile for {user.name}</h1>

      <div className="profile">
        <Row className="body">
          <Col>
            <Name />
          </Col>

          <Col>
            <AboutMe />
          </Col>

          <Col>
            <Stance />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;

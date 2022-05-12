import "./ProfilePage.css";

import { Col, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";

import AboutMe from "../../components/AboutMe/AboutMe";
import AuthContext from "../../context/AuthContext";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState();
  const [photAlt, setPhotoAlt] = useState();

  useEffect(() => {
    if (user.image !== "") {
      setPhoto(`http://localhost:3007/uploads/images/${user.image}`);
      setPhotoAlt(user.name);
    } else {
      setPhoto(
        "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
      );
      setPhotoAlt("Default Image Placeholder");
    }
  }, [user]);

  return (
    <div>
      <h1 className="profile-name">Profile for {user.name}</h1>
      {!user || !user.image ? (
        <ImageUpload />
      ) : (
        <div className="big-profile-img">
          <img
            src={photo}
            alt={photAlt}
            style={{ marginLeft: "5em", width: "100px", height: "100px" }}
          />
        </div>
      )}
      <div className="profile">
        <Row className="body">
          <Col></Col>

          <Col>
            <AboutMe />
          </Col>

          <Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;

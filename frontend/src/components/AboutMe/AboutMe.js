import "../../pages/ProfilePage/ProfilePage.css";
import "../AboutMe/AboutMe.css";

import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";

const AboutMe = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [aboutMe, setAboutMe] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!aboutMe) setAboutMe(user.aboutMe);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updatedUser = await AxiosUsers.updateUser(user._id, {
        update: { property: "aboutMe", value: aboutMe },
      });
      console.log(updatedUser);
      setAboutMe(updatedUser.aboutMe);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="aboutme-container">
        <h3>About Me</h3>
        <br />
        <p style={{ paddingLeft: "2em" }}>{aboutMe && aboutMe}</p>
        <br />
        <div className="aboutme-buttons">
          <Button className="aboutme-button" type="button" onClick={handleShow}>
            Edit
          </Button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>
            EDIT: About Me (must be at least 5 characters long!
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group>
            <br />
            <div className="form-container">
              <Form.Control
                className="textArea"
                type="textArea"
                value={aboutMe}
                onChange={(event) => {
                  setAboutMe(event.target.value);
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter") handleSubmit(event);
                }}
              />
              <br />
              <div className="aboutme-form-buttons">
                <Button
                  type="btn"
                  style={{ margin: "0px 1em 1em 0px" }}
                  className="button primary"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  style={{ marginBottom: "1em" }}
                  variant="secondary"
                  className="close"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutMe;

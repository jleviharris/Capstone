import "../../components/Stance/Stance.css";
import "../../pages/ProfilePage/ProfilePage.css";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";

const Stance = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [stance, setStance] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!stance) {
      setStance(user.stance);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updatedUser = await AxiosUsers.updateUser(user._id, {
        update: { property: "stance", value: stance },
      });
      console.log(updatedUser);
      setStance(updatedUser.stance);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="stance-container">
        <h3>Stance</h3>
        <br />
        <p style={{ paddingLeft: "2em" }}>{stance && stance}</p>
        <br />
        <div className="aboutme-buttons">
          <Button className="stance-button" type="button" onClick={handleShow}>
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
          <Modal.Title>EDIT: Stance (Regular or Goofy)</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group>
            <br />
            <div className="form-container">
              <Form.Control
                className="textArea"
                type="textArea"
                value={stance}
                onChange={(event) => {
                  setStance(event.target.value);
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter") handleSubmit(event);
                }}
              />
              <br />
              <div className="stance-form-buttons">
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

export default Stance;

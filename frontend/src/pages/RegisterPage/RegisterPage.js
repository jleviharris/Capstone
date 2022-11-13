import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate, Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="loginFullPage">
      <div className="container-0">
        <div className="loginForm">
          <form className="form" onSubmit={handleSubmit}>
            <label className="nameLabel">
              Name:{" "}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:{" "}
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:{" "}
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                width: "20%",
              }}
            >
              Admin:{" "}
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleInputChange}
              />
            </label>
            <button className="registerBttn" onClick={handleSubmit}>
              Register
            </button>
            <div className="loginLink">
              Have and account already? <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

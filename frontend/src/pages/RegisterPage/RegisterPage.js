import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";

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
            <button
              className="closeRegister"
              onClick={() => {
                navigate("/login");
              }}
            >
              X
            </button>
            <label>
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
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

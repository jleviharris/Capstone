import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const [passwordType, setPasswordType] = useState("password");
  const defaultValues = { email: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="loginFullPage">
      <div className="container-0">
        <div className="loginForm">
          <form className="form" onSubmit={handleSubmit}>
            <label className="emailLabel">
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
                type={passwordType}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <button className="passwordBttn" type="button" onClick={togglePassword}>
              {" "}
              {passwordType === "password" ? (
                <p>Show password</p>
              ) : (
                <p>Hide password</p>
              )}
            </button>
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}

            <button className="loginButton">Login</button>
            <div className="registerLink">
              Dont have an account? <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

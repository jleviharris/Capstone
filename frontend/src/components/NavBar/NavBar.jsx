import "./NavBar.css";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import React from "react";
import { useContext } from "react";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <p className="brand">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          <b>
            Skate <span style={{ color: "steelblue" }}>Status</span>
          </b>
        </Link>
      </p>
      <ul>
        <li>{user && <button onClick={() => navigate("/")}>Home</button>}</li>
        <li>{user && <button onClick={() => navigate("/spots")}>Spots</button>}</li>
        <li>
          {user && (
            <button onClick={() => navigate("/myPosts")}>My Posts</button>
          )}
        </li>
        <li>
          {user && (
            <button onClick={() => navigate("/feedPage")}>Friends Feed</button>
          )}
        </li>
        <li>
          {user && (
            <button onClick={() => navigate("/profile")}>Profile</button>
          )}
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

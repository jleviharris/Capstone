import "./NavBar.css";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [menuHidden, setMenuHidden] = useState(false);
 
  const navigate = useNavigate();
 
  function handleClickTrue() {
    setMenuHidden(true);
  }
  
  function handleClickFalse() {
    setMenuHidden(false);
  }
  function logoutTheUser(){
    handleClickFalse();
    logoutUser();
  }
  
  
 
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
            Skate <span style={{ color: "#f709a0" }}>Status</span>
          </b>
        </Link>
      </p>
    
        <div>{user && <button onClick={() => {
          if (menuHidden === false){
                  handleClickTrue();  
                  ;} else if (menuHidden) {handleClickFalse();  
                    ;} 
                }}><span className="material-symbols-outlined">
menu
</span></button>}</div>
{menuHidden && (

  <ul>
       
         <li>{user && <button onClick={() => {navigate("/spots");handleClickFalse()}}>Spots</button>}</li>
         <li>
           {user && (
             <button onClick={() => {navigate("/friendsPage");handleClickFalse()}}>Friends</button>
           )}
         </li>
         <li>
           {user && (
             <button onClick={() => {navigate("/myPosts");handleClickFalse()}}>My Reviews</button>
           )}
         </li>
         
         <li>
           {user && (
             <button onClick={() => {navigate("/feedPage");handleClickFalse()}}>Friends Feed</button>
           )}
         </li>
         <li>
           {user && (
             <button onClick={() => {navigate("/profile");handleClickFalse()}}>Profile</button>
           )}
         </li>
       
         <li>
           {user ? (
             <button onClick={logoutTheUser}>Logout</button>
           ) : (
             <button onClick={() => {handleClickFalse();navigate("/login")}}>Login</button>
           )}
         </li>
         </ul>
      )}
       
      
    </div>
  );
};

export default Navbar;

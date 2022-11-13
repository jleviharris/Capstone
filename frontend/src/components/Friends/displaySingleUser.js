import "../Posts/MyPost.css";
import React from "react";


const DisplaySingleUser = ({ singleUser, setHidden }) => {
  
  function setHiddenFalse() {
    setHidden(false);
  }

  return (
    <div className="delete-post">
      Name: {singleUser.name} <br />
      Stance: {singleUser.stance} <br />
      <button
        onClick={() => {
          setHiddenFalse();
        }}
      >
        X
      </button>
    </div>
  );
};

export default DisplaySingleUser;

import "../Posts/MyPost.css";

import React from "react";

const DisplayUsers = ({ userList, setHidden, setSingleUser }) => {
  function handleClick() {
    setHidden(true);
  }

  return (
    <div className="postlist">
      <div>Users</div>
      {userList
        .map((user, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="my-post-button"
                onClick={() => {
                  handleClick(user);
                  setSingleUser(user);
                }}
              >
                {" "}
                <div className="name-container">{user.name}</div>
              </button>

          
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayUsers;
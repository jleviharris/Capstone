import "../../pages/ProfilePage/ProfilePage.css";

import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosOnlineStatus from "../../Routes/status";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [online, setOnline] = useState();
  const [onlineFriends, setOnlineFriends] = useState();
  const [onlinePendingFriends, setOnlinePendingFriends] = useState();
  const [onlineFriendRequests, setOnlineFriendRequests] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (user) {
      getOnlineUsers();
    }
    if (user !== null) {
      if (user.image !== null) {
        if (user.image !== "") {
          setPhoto(`http:localhost:3007/${user.image}`);
        }
      }
    }
  }, []);

  async function getOnlineUsers() {
    try {
      let onlineUsers = await AxiosOnlineStatus.onlineUser();

      if (onlineUsers) setOnline(onlineUsers);
      else
        console.log("Error getting list of online users, return was undefined");
    } catch (error) {
      console.log("Error getting list of online users: " + error);
    }
  }

  function loadData() {
    setTimeout(() => {
      if (user !== null) {
        if (user.friendsList !== null) {
          if (Array.isArray(user.friendsList)) {
            if (online && Array.isArray(online)) {
              let tempUsers = online.filter((userId) =>
                user.friendsList.includes(userId)
              );
              setOnlineFriends(tempUsers);
            }
          }
        }
        if (user.pendingFriends !== null) {
          if (Array.isArray(user.pendingFriends)) {
            if (Array.isArray(online)) {
              let tempUsers = online.filter((userId) =>
                user.pendingFriends.includes(userId)
              );
              setOnlinePendingFriends(tempUsers);
            }
          }
        }
        if (user.friendRequests !== null) {
          if (Array.isArray(user.friendRequests)) {
            if (Array.isArray(online)) {
              let tempUsers = online.filter((userId) =>
                user.friendRequests.includes(userId)
              );
              setOnlineFriendRequests(tempUsers);
            }
          }
        }
        if (user.image !== "") {
          if (user.image !== null) {
            setPhoto();
          } else {
            setPhoto(
              "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
            );
          }
        }
      }
    }, 300);
  }

  loadData();
  if (user)
    return (
      <div
        style={{
          display: "flex",
          width: "60px",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "-32px",
          position: "absolute",
          fontSize: "2em",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="rgb(51, 59, 65)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <img
                src={`http://localhost:3007/uploads/images/${user.image}`}
                alt="default"
                className="profile-sidebar-img"
                style={{
                  width: "100px",
                  height: "auto",
                  margin: "0em 0em 1em 2em",
                }}
              />
              <h4
                style={{
                  textAlign: "center",
                  fontSize: "1em",
                  margin: "0em 0em 0em 1em",
                  paddingBottom: "0em",
                }}
              >
                {user.name}
              </h4>
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenuItem icon="user" style={{ fontSize: "1rem" }}>
            {online && online.length} Users online
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon="user" style={{ fontSize: "1rem" }}>
            Friends ({(onlineFriends && onlineFriends.length) || "0"})
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon="user" style={{ fontSize: "1rem" }}>
            Pending Friends (
            {(onlinePendingFriends && onlinePendingFriends.length) || "0"})
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user" style={{ fontSize: "1rem" }}>
            Friend Requests (
            {(onlineFriendRequests && onlineFriendRequests.length) || "0"})
          </CDBSidebarMenuItem>
        </CDBSidebar>
      </div>
    );
  else return <div></div>;
};

export default SideBar;

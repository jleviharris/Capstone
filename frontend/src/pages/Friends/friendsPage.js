import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";
import DisplayUsers from "../../components/Friends/displayUsers";
import DisplaySingleUser from "../../components/Friends/displaySingleUser";
import ErrorBoundary from "../ErrorBoundary";
import DisplayCurrentFriends from "../../components/Friends/displayCurrentFriends";
import DisplayFriendRequests from "../../components/Friends/displayFriendRequests";
import DisplaySentFriendRequests from "../../components/Friends/displaySentFriendRequests";
import("../../components/Friends/friends.css");
const FriendsPage = () => {
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [userList, setUserList] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [userFriendsList, setUserFriendsList] = useState([]);
  const [usersFriendRequest, setUsersFriendRequest] = useState("");
  const [userFriendRequestList, setUserFriendRequestList] = useState([]);
  const [userSentFriendRequestList, setUserSentFriendRequestList] = useState(
    []
  );

  useEffect(() => {
    getAllUsers();
    getCurrentFriends();
    getFriendRequests();
    getSentFriendRequests();
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getAllUsers() {
    let users = await AxiosUsers.getAllUsers();
    if (users) {
      setUserList(users);
    } else setUserList({ Object: "No Users" });
  }

  async function getCurrentFriends() {
    let users = await AxiosUsers.getAllFriends(userId);
    if (users) {
      setUserFriendsList(users);
    } else setUserFriendsList({ Object: "No Users" });
  }
  async function getFriendRequests() {
    let users = await AxiosUsers.getAllFriendRequests(userId);
    if (users) {
      setUserFriendRequestList(users);
    } else setUserFriendRequestList({ Object: "No Users" });
  }
  async function getSentFriendRequests() {
    let users = await AxiosUsers.getAllSentFriendRequests(userId);
    if (users) {
      setUserSentFriendRequestList(users);
    } else setUserSentFriendRequestList({ Object: "No Users" });
  }

  return (
    <div>
      {hidden === false && (
        <div className="friendsFullPage">
          <ErrorBoundary>
            <DisplayCurrentFriends
              userFriendsList={userFriendsList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
              userId={userId}
              setUserList={setUserList}
              handleClick={handleClick}
              update={update}
            />
            <DisplayUsers
              userList={userList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
              userId={userId}
              handleClick={handleClick}
              userFriendRequestList={userFriendRequestList}
              userSentFriendRequestList={userSentFriendRequestList}
              userFriendsList={userFriendsList}
            />
            <DisplayFriendRequests
              userFriendRequestList={userFriendRequestList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
              userId={userId}
              usersFriendRequest={usersFriendRequest}
              setUsersFriendRequest={setUsersFriendRequest}
              handleClick={handleClick}
            />
            <DisplaySentFriendRequests
              userSentFriendRequestList={userSentFriendRequestList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
              handleClick={handleClick}
            />
          </ErrorBoundary>
        </div>
      )}
      {hidden && (
        <DisplaySingleUser singleUser={singleUser} setHidden={setHidden} />
      )}
    </div>
  );
};

export default FriendsPage;

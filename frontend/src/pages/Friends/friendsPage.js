import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";
import DisplayUsers from "../../components/Friends/displayUsers";
import DisplaySingleUser from "../../components/Friends/displaySingleUser";
import ErrorBoundary from "../ErrorBoundary";
import DisplayCurrentFriends from "../../components/Friends/displayCurrentFriends";
import DisplayFriendRequests from "../../components/Friends/displayFriendRequests";



const FriendsPage = () => {
  
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [userList, setUserList] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [userFriendsList, setUserFriendsList]= useState([]);
  const [userFriendRequestList, setUserFriendRequestList]= useState([]);

  useEffect(() => {
    getAllUsers();
    getCurrentFriends();
    getFriendRequests();
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

  return (
    <div>
      {hidden === false && (
        <div>
          <ErrorBoundary>
            <DisplayCurrentFriends userFriendsList={userFriendsList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}/>
            <DisplayUsers
              userList={userList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
            />
            <DisplayFriendRequests
              userFriendRequestList={userFriendRequestList}
              setHidden={setHidden}
              setSingleUser={setSingleUser}
            />
          </ErrorBoundary>
        </div>
      )}
      {hidden && (
        <DisplaySingleUser
          singleUser={singleUser}
          setHidden={setHidden}
          handleClick={handleClick}
          userId={userId}
          singleUser={singleUser}
          setUserList={setUserList}
          userList={userList}
        />
      )}
    </div>
  );
};

export default FriendsPage;
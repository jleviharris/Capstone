// import React, { useContext, useEffect, useState } from "react";
// import CreatePost from "../../components/Posts/createPosts";
// import DisplayPosts from "../../components/Posts/displayPosts";
// import AxiosPosts from "../../Routes/postRoutes";
// import AuthContext from "../../context/AuthContext";
// import ErrorBoundary from "../ErrorBoundary";
// import DisplaySinglePost from "../../components/Posts/displaySinglePost";
// import SetSkateStatus from "../../components/skateStatus";
// import AxiosUsers from "../../Routes/userRoutes";
// import DisplayCurrentFriendsHP from "../../components/Friends/displayCurrentFriendsHP";

// const HomePage = () => {
//   const [postList, setPostList] = useState([]);
//   const { user } = useContext(AuthContext);
//   const userId = user._id || null;
//   const name = user.name || null;
//   const [update, setUpdate] = useState(false);
//   const [hidden, setHidden] = useState(false);
//   const [singlePost, setSinglePost] = useState();
//   const [userFriendsList, setUserFriendsList] = useState([]);
//   const [singleUser, setSingleUser] = useState();
//   const [friendObjList, setFriendObjList] = useState([]);

//   useEffect(() => {
//     getCurrentFriends();
//     convertFriendsListToObjects(userFriendsList);
//   }, [update]);

//   function handleClick() {
//     setUpdate(!update);
//   }

//   async function getCurrentFriends() {
//     let users = await AxiosUsers.getAllFriends(userId);
//     if (users) {
//       setUserFriendsList(users);
//     } else setUserFriendsList({ Object: "No Users" });
//   }
//   async function getFriendById(user) {
//     let friend = await AxiosUsers.getUser(user);
//     if (friend) {
//       return friend;
//     }
//   }
//   async function convertFriendsListToObjects(users) {
//     let newList = [];
//     for (let i = 0; i < users.length; i++) {
//       let newObj = await getFriendById(users[i]);
//       newList.push(newObj);
//     }
//     setFriendObjList(newList);
//   }

//   return (
//     <div>
//       <h1 className="container-0">Home Page for {user.name}!</h1>;
//       {hidden === false && (
//         <div>
//           <ErrorBoundary>
//             <DisplayCurrentFriendsHP
//               userFriendsList={userFriendsList}
//               setHidden={setHidden}
//               setSingleUser={setSingleUser}
//               userId={userId}
//               handleClick={handleClick}
//               update={update}
//               friendObjList={friendObjList}
//             />
//           </ErrorBoundary>
//         </div>
//       )}
//       {hidden && <div></div>}
//     </div>
//   );
// };

// export default HomePage;

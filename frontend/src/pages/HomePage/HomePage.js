import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/Posts/createPosts";
import DisplayPosts from "../../components/Posts/displayPosts";
import AxiosPosts from "../../Routes/postRoutes";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import DisplaySinglePost from "../../components/Posts/displaySinglePost";
import SetSkateStatus from "../../components/skateStatus";
import AxiosUsers from "../../Routes/userRoutes";

const HomePage = () => {
  const [postList, setPostList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const name = user.name || null;
  const [skateActive, setSkateActive] = useState("");
  const [skateInactive, setSkateInactive] = useState("");
  const [freshUser, setFreshUser] = useState();

  useEffect(() => {
    getAllPosts();
    setUser(userId);
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function setUser(userId) {
    let tempUser = await AxiosUsers.getUser(userId);
    setFreshUser(tempUser);
  }

  async function getAllPosts() {
    let posts = await AxiosPosts.getAllPosts();
    if (posts) {
      let newList = [];
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].spotPost.length === 0) {
          newList.push(posts[i]);
        }
      }
      setPostList(newList);
    } else setPostList({ Object: "No Posts" });
  }

  return (
    <div>
      <h1 className="container-0">Home Page for {user.name}!</h1>;
      {hidden === false && (
        <div>
          <SetSkateStatus
            user={user}
            userId={userId}
            skateInactive={skateInactive}
            setSkateInactive={setSkateInactive}
            skateActive={skateActive}
            setSkateActive={setSkateActive}
            freshUser={freshUser}
            setFreshUser={setFreshUser}
          />
          <CreatePost userId={userId} handleClick={handleClick} name={name} />
          <ErrorBoundary>
            <DisplayPosts
              postList={postList}
              setHidden={setHidden}
              setSinglePost={setSinglePost}
            />
          </ErrorBoundary>
        </div>
      )}
      {hidden && (
        <DisplaySinglePost
          singlePost={singlePost}
          setHidden={setHidden}
          handleClick={handleClick}
          userId={userId}
        />
      )}
    </div>
  );
};

export default HomePage;

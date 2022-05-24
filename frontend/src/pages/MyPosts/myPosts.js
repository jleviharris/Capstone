import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/Posts/createPosts";
import DisplayPosts from "../../components/Posts/displayPosts";
import AxiosPosts from "../../Routes/postRoutes";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import DisplaySinglePost from "../../components/Posts/displaySinglePost";

const MyPosts = () => {
  const [postList, setPostList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const name = user.name || null;

  useEffect(() => {
    getPosts(userId);
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getPosts(userId) {
    let posts = await AxiosPosts.getPosts(userId);
    if (posts) {
      setPostList(posts);
    } else setPostList({ Object: "No Posts" });
  }

  return (
    <div>
      {hidden === false && (
        <div>
          {/* <CreatePost userId={userId} handleClick={handleClick} name={name} /> */}
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

export default MyPosts;

import React, { useContext, useEffect, useState } from "react";
import DisplayPosts from "../../components/Posts/displayPosts";
import AxiosPosts from "../../Routes/postRoutes";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import DisplaySinglePost from "../../components/Posts/displaySinglePost";

const FeedPage = () => {
  const [postList, setPostList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singlePost, setSinglePost] = useState();

  useEffect(() => {
    getAllPosts();
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getAllPosts() {
    let posts = await AxiosPosts.getAllPosts();
    if (posts) {
      let newList = [];
      for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < user.friendsList.length; j++) {
          if (user.friendsList[j] === posts[i].userId && posts[i].spotPost.length > 0) {
            newList.push(posts[i]);
          }
        }
      }
      setPostList(newList);
    } else setPostList({ Object: "No Posts" });
  }

  return (
    <div>
      {hidden === false && (
        <div>
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

export default FeedPage;

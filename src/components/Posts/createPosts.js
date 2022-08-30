// import "../Posts/MyPost.css";

// import React, { useState } from "react";

// import AxiosPosts from "../../Routes/postRoutes";

// const CreatePost = ({ userId, handleClick, name }) => {
//   const [value, setValue] = useState("");
//   const current = new Date();
//   const date = `${current.getHours()}:${current.getMinutes()}`;
//   console.log(date);

//   function handlePost(event) {
//     event.preventDefault();

//     let newPost = {
//       body: value,
//       userId: userId,
//       name: name,
//       time: date,
//       spotId: spot.name,
//     };
//     createNewPost(newPost);
//     setValue("");
//     let click = () => {
//       handleClick();
//     };
//     click();
//   }
//   async function createNewPost(obj) {
//     await AxiosPosts.updatePosts(obj);
//     return obj;
//   }

//   return (
//     <form className="postContainer" onSubmit={handlePost}>
//       <div>
//         <textarea
//           type="text"
//           placeholder="Enter Post Here"
//           value={value}
//           onChange={(event) => setValue(event.target.value)}
//           onKeyUp={(event) => {
//             if (event.key === "Enter") {
//               handlePost(event);
//             }
//           }}
//         />
//         <button type="submit" className="postButton">
//           Post
//         </button>
//       </div>
//     </form>
//   );
// };
// export default CreatePost;

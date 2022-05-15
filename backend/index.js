require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const spotsRouter = require("./routes/spots");
const friendsRouter = require("./routes/friends");
const express = require("express");
const cors = require("cors");
const app = express();



connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(`/api/users`, usersRouter);
app.use(`/api/posts`, postsRouter);
app.use(`/api/spots`, spotsRouter);
app.use(`/api/friends`, friendsRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

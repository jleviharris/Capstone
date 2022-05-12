const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

//ADD METHODS

// POST a Friend Current
// http://localhost:3007/api/friends
router.put("/add/current", async (req, res) => {
  try {
    const friends = await User.updateOne(
      { _id: req.body._id },
      { $addToSet: { friendsLists: req.body.friendsList } }
    );
    if (friends)
      return res
        .status(201)
        .send(`Friend with ID of ${req.body.friendsList} added`);
    return res.status(400).send(`Error adding friend`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// POST a Friend Pending
// http://localhost:3007/api/friends
router.put("/add/pending", async (req, res) => {
  try {
    const friends = await User.updateOne(
      { _id: req.body._id },
      { $addToSet: { pendingFriends: req.body.pendingFriends } }
    );
    if (friends)
      return res
        .status(201)
        .send(`Friend with ID of ${req.body.pendingFriends} added`);
    return res.status(400).send(`Error adding friend`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// POST a Friend Request
// http://localhost:3007/api/friends
router.put("/add/requests", async (req, res) => {
  try {
    const friends = await User.updateOne(
      { _id: req.body._id },
      { $addToSet: { friendRequests: req.body.friendRequests } }
    );
    if (friends)
      return res
        .status(201)
        .send(`Friend with ID of ${req.body.friendRequests} added`);
    return res.status(400).send(`Error adding friend`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//REMOVE METHODS

//Remove a current friend
// http://localhost:3007/api/friends
router.put("/remove/current", async (req, res) => {
  try {
    const friend = await User.findByIdAndUpdate(
      { _id: req.body._id },
      { $pull: { friendsList: req.body.friendsList } }
    );
    if (friend) return res.status(201).send(`${friend}`);
    return res.status(400).send(`Error removing friend`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
//Remove a pending friend
// http://localhost:3007/api/friends
router.put("/remove/pending", async (req, res) => {
  try {
    const friend = await User.findByIdAndUpdate(
      { _id: req.body._id },
      { $pull: { pendingFriends: req.body.pendingFriends } }
    );
    if (friend) return res.status(201).send(`${friend}`);
    return res.status(400).send(`Error removing pending friend`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
//Remove a friendRequest
// http://localhost:3007/api/friends
router.put("/remove/requests", async (req, res) => {
  try {
    const friend = await User.findByIdAndUpdate(
      { _id: req.body._id },
      { $pull: { friendRequests: req.body.friendRequests } }
    );
    if (friend) return res.status(201).send(`${friend}`);
    return res.status(400).send(`Error removing friend request`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//GET Methods

// Get all current friends
// http://localhost:3007/api/friends
router.get("/current", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    const friends = user.friendsList;
    if (friends.length === 0)
      return res.send(`No friends to show!`);
    return res.send(friends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all pending friends
// http://localhost:3007/api/friends
router.get("/pending", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    const friends = user.pendingFriends;
    if (friends.length === 0)
      return res.send(`No pending friends to show!`);
    return res.send(friends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all friend request
// http://localhost:3007/api/friends
router.get("/requests", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    const friends = user.friendRequests;
    if (friends.length === 0)
      return res.send(`No friend requests to show!`);
    return res.send(friends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;

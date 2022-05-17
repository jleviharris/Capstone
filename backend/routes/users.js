const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//* POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get current friends of user
router.get("/currentFriends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user.friendsList);
    } else {
      return res.status(400).send("Error getting friends");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get friend requests of user
router.get("/friendRequests/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user.friendRequests);
    } else {
      return res.status(400).send("Error getting friends");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get sent friend requests of user
router.get("/sentFriendRequests/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user.pendingFriends);
    } else {
      return res.status(400).send("Error getting friends");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get user by userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user);
    } else {
      return res.status(400).send("Error getting user");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Update property of user
router.put("/update", async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(
      { _id: req.body.id },
      req.body.body,
      { new: true }
    );

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Add user to friendRequest list of a chosen user
// http://localhost:3007/api/users/friendRequests/:userId
router.put("/friendRequests/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { friendRequests: req.body.friendRequests } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.friendRequests);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// after sending friend request, add the new pending friend into the pendingFriends list
// http://localhost:3007/api/users/addToPendingFriends/:userId
router.put("/addToPendingFriends/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { pendingFriends: req.body.pendingFriends } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.pendingFriends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// after accepting friend request, remove the new user from the original users pendingFriends list
// http://localhost:3007/api/users/removeFromPendingFriends/:userId
router.put("/removeFromPendingFriends/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { pendingFriends: req.body.pendingFriends } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.pendingFriends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// after accepting friend request, remove the new friend from the friendsRequest
// http://localhost:3007/api/users/removeFromFriendRequests/:userId
router.put("/removeFromFriendRequests/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { friendRequests: req.body.friendRequests } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.pendingFriends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// remove friend from the friendsList
// http://localhost:3007/api/users/removeFriend/:userId
router.put("/removeFriend/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { friendsList: req.body.friendsList } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.friendsList);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Accept friend request
// http://localhost:3007/api/users/acceptFriendRequests/:userId
router.put("/acceptFriendRequests/:userId", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { friendsList: req.body.friendsList } },
      { new: true }
    );
    if (!user) return res.status(400).send(`No user to show!`);
    return res.send(user.friendsList);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Status } = require("../models/status");

// POST a Friend Request
// http://localhost:3007/api/friends
router.put("/online/:statusId", async (req, res) => {
  try {
    const online = await Status.updateOne(
      { _id: req.params.statusId },
      { $addToSet: { online: req.body.userId } }
    );
    if (online) return res.status(201).send(`User: ${req.body.userId} is online`);
    return res
      .status(400)
      .send(`Error updating online status for user: ${req.body.userId} ` + error);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//REMOVE METHODS

//Remove a current friend
// http://localhost:3007/api/friends
router.put("/offline/:statusId", async (req, res) => {
  try {
    const offline = await Status.updateOne(
      { _id: req.params.statusId },
      { $pull: { online: req.body.userId } }
    );
    if (offline) return res.status(201).send(`User: ${req.body.userId} is offline`);
    return res
      .status(400)
      .send(`Error updating offline status for uesr: ${userId}`);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const onlineUsers = await Status.find()
    if(onlineUsers){
    console.log(onlineUsers.online)
    return res.status(200).send(onlineUsers)
    }
    else return res.status(400).send('Error getting online users')
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
})
module.exports = router;

const { Spot, validateSpot } = require("../models/spot");
const express = require("express");
const router = express.Router();

// POST a spot
// http://localhost:3007/api/spots
router.post("/", async (req, res) => {
  try {
    const { error } = validateSpot(req.body);
    if (error) return res.status(400).send(error);
    let newSpot = await new Spot(req.body);
    await newSpot.save();
    return res.status(201).send(newSpot);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all spots
// http://localhost:3007/api/spots
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find();
    if (!spots) return res.status(400).send(`No spots to show!`);
    return res.send(spots);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get spot by spotId
router.get("/:spotId", async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.spotId);
    if (spot) {
      return res.send(spot);
    } else {
      return res.status(400).send("Error getting spot");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});


// PUT an existing spot add like
// http://localhost:3007/api/spot/like/:postId
router.put("/like/:spotId", async (req, res) => {
  try {
    const spot = await Spot.updateOne(
      { _id: req.params.spotId },
      { $addToSet: { likes: req.body.likes } },
      { new: true }
    );
    if (!spot) return res.status(400).send(`No spot to show!`);
    return res.send(spot.likes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing spot remove likes
// http://localhost:3007/api/spot/like/:spotId
router.put("/like/remove/:spotId", async (req, res) => {
  try {
    const spot = await Spot.updateOne(
      { _id: req.params.spotId },
      { $pull: { likes: req.body.likes } },
      { new: true }
    );
    if (!spot) return res.status(400).send(`No likes to show!`);
    return res.send(spot.likes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing spot add dislikes
// http://localhost:3007/api/spots/dislike/:spotId
router.put("/dislike/:spotId", async (req, res) => {
  try {
    const spot = await Spot.updateOne(
      { _id: req.params.spotId },
      { $addToSet: { dislikes: req.body.dislikes } },
      { new: true }
    );
    if (!spot) return res.status(400).send(`No dislikes to show!`);
    return res.send(spot.dislikes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing spot remove dislikes
// http://localhost:3007/api/spots/dislike/:spotId
router.put("/dislike/remove/:spotId", async (req, res) => {
  try {
    const spot = await Spot.updateOne(
      { _id: req.params.spotId },
      { $pull: { dislikes: req.body.dislikes } },
      { new: true }
    );
    if (!spot) return res.status(400).send(`No dislikes to show!`);
    return res.send(spot.dislikes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single spot from the database
// http://localhost:3007/api/:spotId
router.delete("/:spotId", async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.spotId);
    if (!spot)
      return res
        .status(400)
        .send(`Spot with id ${req.params.spotId} does not exist!`);
    await spot.remove();
    return res.send(spot);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;

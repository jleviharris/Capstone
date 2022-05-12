const mongoose = require("mongoose");
const Joi = require("joi");

const spotSchema = mongoose.Schema({
    name: { type: String, required: true },
    currentSkaters: {type: Array, default: []},
    likes: { type: Array, default: [] },
    dislikes: { type: Array, default: [] },
    vert: {type: Boolean, required: true, default: false},
    street: {type: Boolean, required: true, default: false},
    address: {type: String, required: true, default: " "},
    dateAdded: { type: Date, default: Date.now() },
});

const validateSpot = (spot) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    vert: Joi.boolean().required(),
    street: Joi.boolean().required(),
    address: Joi.string().required(),
  });
  return schema.validate(spot);
};

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);
module.exports.Spot = Spot;
module.exports.spotSchema = spotSchema;
module.exports.validateSpot = validateSpot;
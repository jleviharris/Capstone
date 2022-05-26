const mongoose = require("mongoose");
const Joi = require("joi");

const spotSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  currentSkaters: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  dislikes: { type: Array, default: [] },
  vert: { type: String, required: true, default: "no" },
  street: { type: String, required: true, default: "no" },
  address: { type: String, required: true, default: " " },
  lat: { type: String, required: true, default: "" },
  lng: { type: String, required: true, default: "" },
  dateAdded: { type: Date, default: Date.now() },
  blankName: { type: String, default: "na" },
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

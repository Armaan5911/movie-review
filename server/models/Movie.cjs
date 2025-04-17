const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model("Review", reviewSchema);

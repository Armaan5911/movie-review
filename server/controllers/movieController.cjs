const Review = require("../models/Movie.cjs");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}, "movieName review rating");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

exports.addReview = async (req, res) => {
  const { movieName, review, rating } = req.body;

  if (!movieName || !review || !rating) {
    return res.status(400).json({ error: "Movie name, review, and rating are required" });
  }

  try {
    const newReview = new Review({ movieName, review, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const express = require("express");
const { getReviews, addReview } = require("../controllers/movieController.cjs");

const router = express.Router();
router.get("/", getReviews); // Use getReviews for GET requests
router.post("/", addReview); // Use addReview for POST requests

module.exports = router;

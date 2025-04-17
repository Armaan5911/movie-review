import React, { useState, useEffect } from "react";

function App() {
  const [reviews, setReviews] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Could not load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const newReview = {
      movieName: movieName.trim(),
      review: review.trim(),
      rating,
    };

    if (!newReview.movieName || !newReview.review || !newReview.rating) return;

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add review");
      }

      const addedReview = await response.json();
      setReviews((prev) => [...prev, addedReview]);
      setMovieName("");
      setReview("");
      setRating(1);
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Failed to add review");
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Movie Reviews</h1>

      <form onSubmit={addReview} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Add Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          style={{ marginLeft: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          style={{ marginLeft: "0.5rem" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Add Review
        </button>
      </form>

      {loading && <p>Loading reviews...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && reviews.length === 0 && <p>No reviews available.</p>}

      <ul>
        {reviews.map((review) => (
          <li key={review._id || `${review.movieName}-${review.rating}`}>
            <strong>{review.movieName}</strong> - Rating: {review.rating}
            <p>{review.review}</p> {/* Display the review */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

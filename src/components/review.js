import React, { useState } from 'react';
import './ReviewCard.css';
import { FaStar, FaStore, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const reviewers = [
  { id: 1, name: 'Nefertiti' },
  { id: 2, name: 'Tut Ankh Amun' },
  { id: 3, name: 'Ramses II' },
  { id: 4, name: 'Cleopatra' },
  { id: 5, name: 'Khafre' },
  { id: 6, name: 'Menkaure' },
  { id: 7, name: 'Mentuhotep' },
  { id: 8, name: 'Akhenaten' },
];

const ReviewCard = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState(null);

  const handleRating = (id, rating) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  const handleSubmit = async () => {
    const reviews = reviewers
      .filter(r => ratings[r.id])
      .map(r => ({
        name: r.name,
        rating: ratings[r.id],
        description: `Review for ${r.name}`
      }));

    if (reviews.length === 0) {
      setError("Please rate at least one item.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/back/items/reviews', // ✅ Correct backend endpoint
        { reviews },
        { headers: { 'Content-Type': 'application/json' } } // ✅ Ensure JSON is sent
      );
      console.log('Submitted reviews:', response.data);
      navigate('/recommendations');
    } catch (err) {
      console.error('Submit error:', err.response?.data || err);
      setError('Failed to submit. Please try again later.');
    }
  };

  return (
    <div className="review-container">
      <div className="review-box">
        <h2 className="review-header">Review</h2>

        {reviewers.map((reviewer, index) => (
          <div key={reviewer.id} className="review-item">
            <div className="user-info">
              <div className="badge">{index + 1}</div>
              <FaStore className="icon" />
              <span className="username">{reviewer.name}</span>
            </div>

            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={ratings[reviewer.id] >= star ? 'star active' : 'star'}
                  onClick={() => handleRating(reviewer.id, star)}
                />
              ))}
            </div>
          </div>
        ))}

        {error && <p className="error">{error}</p>}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;

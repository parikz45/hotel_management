import { useState } from "react";
import axios from "axios";

export const useReview = (userId) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const openReviewModal = (bookingId) => {
    setReviewBookingId(bookingId);
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setReviewBookingId(null);
    setRating(5);
    setComment("");
  };

  const submitReview = async (bookings) => {
    if (!reviewBookingId) return;
    try {
      const booking = bookings.find((b) => (b._id || b.id) === reviewBookingId);
      await axios.post(`http://localhost:8000/api/reviews`, {
        user: userId,
        room: booking.room._id,
        rating,
        comment,
      });
      closeReviewModal();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return {
    showReviewModal,
    rating,
    setRating,
    comment,
    setComment,
    openReviewModal,
    closeReviewModal,
    submitReview,
  };
};
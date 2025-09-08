import { useState, useEffect } from "react";
import axios from "axios";

export const useBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/user/${userId}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => (b._id || b.id) !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return { bookings, loading, cancelBooking, setBookings };
};
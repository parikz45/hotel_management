import { useEffect, useState } from "react";
import axios from "axios";

export const useBookingDetails = (bookingid) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${api}/api/bookings/${bookingid}`,
          { withCredentials: true }
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [bookingid]);

  return { booking, loading };
};
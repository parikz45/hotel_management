import { useState } from "react";
import axios from "axios";

export const usePaymentHandler = (bookingid, selectedMethod) => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = import.meta.env.VITE_API_URL || "http://localhost:8000"

  const handlePayment = (amount) => {
    setIsLoading(true);
    setMessage(null);

    setTimeout(async () => {
      setIsLoading(false);

      try {
        const response = await axios.post(
          `${api}/api/bookingFlow/bookRoom`,
          { bookingId: bookingid, paymentMethod: selectedMethod },
          { withCredentials: true }
        );

        if (selectedMethod === "cash") {
          setMessage({
            isSuccess: true,
            title: "Booking Confirmed!",
            text: "Please pay at the front desk upon check-in.",
          });
        } else if (selectedMethod === "upi" || selectedMethod === "net_banking") {
          setMessage({
            isSuccess: true,
            title: "Payment Successful!",
            text: "You’ll get an email with booking details shortly.",
          });
        } else {
          setMessage({
            isSuccess: response.status === 200,
            title: response.status === 200 ? "Payment Successful!" : "Payment Failed!",
            text: response.data.message || "There was an issue processing your payment.",
          });
        }
      } catch (err) {
        setMessage({
          isSuccess: false,
          title: "Payment Failed!",
          text: "Please try again or use a different method.",
        });
        console.error("Payment error:", err);
      }
    }, 2000);
  };

  return { handlePayment, message, setMessage, isLoading };
};
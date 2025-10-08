import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const api = import.meta.env.VITE_API_URL || "http://localhost:8000"
// Reusable toast function
function showToast(message, type = "info") {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      break;
    default:
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  }
}

function IndividualRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const { user } = useAuthContext();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${api}/api/rooms/${id}`);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
        showToast("Failed to fetch room data", "error");
      }
    };
    fetchRoomData();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${api}/api/reviews/room/${id}`);
        const reviews = response.data;
        if (reviews.length > 0) {
          const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
          setRoomData((prev) => ({ ...prev, rating: avgRating }));
        } else {
          setRoomData((prev) => ({ ...prev, rating: null }));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  if (!roomData) {
    return <h2 className="text-center text-red-600 mt-20">Room not found!</h2>;
  }

  const images = Array.isArray(roomData.images)
    ? roomData.images.filter((img) => typeof img === "string" && img.trim() !== "")
      .map((img) => (img.startsWith("http") ? img : "/" + img))
    : roomData.images && typeof roomData.images === "string"
      ? [roomData.images.startsWith("http") ? roomData.images : "/" + roomData.images]
      : [];

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleProceed = async () => {
    if (!checkInDate || !checkOutDate) {
      showToast("Please select both check-in and check-out dates", "error");
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      showToast("Check-out date must be after check-in date", "error");
      return;
    }
    if (new Date(checkInDate) < new Date()) {
      showToast("Check-in date must be in the future", "error");
      return;
    }

    if (!user || !user._id) {
      showToast("You need to log in before booking", "error");
      return;
    }

    try {
      const checkResponse = await axios.get(
        `${api}/api/rooms/available/${id}`,
        { params: { checkin: checkInDate, checkout: checkOutDate } }
      );
      if (!checkResponse.data) {
        showToast("Room is already booked for the selected dates", "error");
        return;
      }

      const response = await axios.post(
        `${api}/api/bookings`,
        {
          room: id,
          checkinDate: checkInDate,
          checkoutDate: checkOutDate,
          amount: roomData.rate,
          status: "pending",
          user: user._id
        },
        { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true }
      );

      const booking = response.data;
      showToast("Booking created! Proceeding to payment...", "success");

      navigate(`/payments/${booking._id}`, {
        state: { ...roomData, checkInDate, checkOutDate },
      });
    } catch (error) {
      console.error("Error creating booking before payment:", error);
      showToast("Failed to create booking", "error");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<Star key={i} className="w-6 h-6 text-yellow-400" style={{ fill: "url(#half-grad)" }} />);
      else stars.push(<Star key={i} className="w-6 h-6 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)] text-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Carousel */}
          <div className="lg:w-1/2 relative">
            <img src={images[currentIndex]} className="w-full h-96 object-cover rounded-xl shadow-md" />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute top-[40%] left-3 bg-black/50 text-white px-3 py-1 rounded-full">{`<`}</button>
                <button onClick={nextImage} className="absolute top-[40%] right-3 bg-black/50 text-white px-3 py-1 rounded-full">{`>`}</button>
                <div className="flex justify-center mt-3">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${currentIndex === idx ? "bg-blue-600" : "bg-gray-400"}`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Room Details */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{roomData.title}</h1>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="half-grad">
                  <stop offset="50%" stopColor="rgb(250 204 21)" />
                  <stop offset="50%" stopColor="rgb(209 213 219)" />
                </linearGradient>
              </defs>
            </svg>
            {roomData.rating ? <div className="flex items-center gap-2 mb-4">{renderStars(roomData.rating)}</div> : <p className="text-gray-500 mb-4">No ratings yet</p>}
            {console.log(roomData)}
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{roomData && roomData.type.charAt(0).toUpperCase() + roomData.type.slice(1)} Room</h1>
            <p className="text-gray-600 mb-2 text-lg">Capacity: {roomData.capacity}</p>
            <p className="text-gray-600 font-bold mb-4 text-lg">Price: ₹{roomData.rate}/night</p>
            <p className="text-gray-700 mb-6">{roomData.desc}</p>

            {/* Amenities, Features, Policies */}
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Amenities</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">{roomData.amenities.map((a, i) => <li key={i}>{a}</li>)}</ul>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Room Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">{roomData.RoomFeatures.map((f, i) => <li key={i}>{f}</li>)}</ul>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Policies</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">{roomData.RoomPolicies.map((p, i) => <li key={i}>{p}</li>)}</ul>

            {/* Dates */}
            <div className="flex gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500" />
              </div>
            </div>

            <button onClick={handleProceed} className="mt-8 py-3 bg-blue-700 text-white cursor-pointer font-semibold rounded-lg hover:bg-blue-800 transition">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default IndividualRoom;

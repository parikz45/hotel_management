import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Star } from "lucide-react";

function IndividualRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const { user } = useAuthContext();

  // state for dates
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // state for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rooms/${id}`);
        console.log(response.data);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchRoomData();
  }, [id]);

  // fetch reviews and calculate average rating for each room
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reviews/room/${id}`);
        const reviews = response.data;
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviews.length;
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

  // prepare images safely
  const images = Array.isArray(roomData.images)
    ? roomData.images.map((img) =>
      img.startsWith("http") ? img : "/" + img
    )
    : [roomData.images.startsWith("http") ? roomData.images : "/" + roomData.images];


  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // handle proceed
  const handleProceed = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (!user || !user._id) {
      alert("You need to log in before booking.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        {
          room: id,
          checkinDate: checkInDate,
          checkoutDate: checkOutDate,
          amount: roomData.rate,
          status: "pending",
          user: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          withCredentials: true
        }
      );

      const booking = response.data;
      setBookingData(booking);

      navigate(`/payments/${booking._id}`, {
        state: { ...roomData, checkInDate, checkOutDate },
      });
    } catch (error) {
      console.error("Error creating booking before payment:", error);
    }
  };

  // ⭐ fractional star renderer
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <Star
            key={i}
            className="w-6 h-6 text-yellow-400"
            style={{ fill: "url(#half-grad)" }}
          />
        );
      } else {
        stars.push(<Star key={i} className="w-6 h-6 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)] text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Room Image Carousel */}
          <div className="lg:w-1/2 relative">
            <img
              src={images[currentIndex]}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer top-[40%] left-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {"<"}
                </button>
                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer top-[40%] right-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {">"}
                </button>
                <div className="flex justify-center mt-3">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${currentIndex === index ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Room Details */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              {roomData.title}
            </h1>

            {/* ⭐ Rating Display */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="half-grad">
                  <stop offset="50%" stopColor="rgb(250 204 21)" />
                  <stop offset="50%" stopColor="rgb(209 213 219)" />
                </linearGradient>
              </defs>
            </svg>
            {roomData.rating ? (
              <div className="flex items-center gap-2 mb-4">
                {renderStars(roomData.rating)}
               
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No ratings yet</p>
            )}

            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                {roomData.type.charAt(0).toUpperCase() + roomData.type.slice(1)} Room
              </h1>
              <p className="text-gray-600 mb-2 text-lg">Capacity: {roomData.capacity}</p>
              <p className="text-gray-600 font-bold mb-4 text-lg">Price: ₹{roomData.rate}/night</p>
              <p className="text-gray-700 mb-6">{roomData.desc}</p>

              {/* Amenities */}
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Amenities</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {roomData.amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Features */}
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Room Features</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {roomData.RoomFeatures.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Policies */}
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Policies</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {roomData.RoomPolicies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* checkin and checkout date pickers */}
              <div className="flex gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    required
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    required
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleProceed}
              className="mt-8 py-3 bg-blue-700 text-white cursor-pointer font-semibold rounded-lg hover:bg-blue-800 transition"
            >
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

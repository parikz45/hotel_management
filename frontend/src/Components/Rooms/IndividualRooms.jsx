import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

function IndividualRoom() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);


  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rooms/${id}`);
        console.log(response.data);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }
    fetchRoomData();
  }, [id]);

  // state for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!roomData) {
    return <h2 className="text-center text-red-600 mt-20">Room not found!</h2>;
  }

  const images = Array.isArray(roomData.images)
    ? roomData.images.map(img => '/' + img)
    : ['/' + roomData.images];


  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
              // alt={roomData.title}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />

            {/* Prev Button */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer top-[40%] left-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {"<"}
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer top-[40%] right-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {">"}
                </button>

                {/* Dots */}
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
              <ul className="list-disc list-inside text-gray-600">
                {roomData.RoomPolicies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => navigate("/payments", { state: roomData })}
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

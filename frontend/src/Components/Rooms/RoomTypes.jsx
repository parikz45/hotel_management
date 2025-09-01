import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function RoomTypes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-10 bg-gradient-to-b from-[#0d2e4f] to-[#163c5f] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Title */}
      <div className="text-center mt-12">
        <h1 className="text-5xl font-bold mb-18">Available Rooms</h1>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-25 px-8 max-w-5xl mx-auto">
          {/* Room Card 1 */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img
              src="room1.jpeg"
              alt="Deluxe Room"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Deluxe Room
              </h2>
              <p className="text-gray-600">Capacity: 2 people</p>
              <p className="text-gray-600 mb-4">₹2000/night</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Room Card 2 */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img
              src="room2.jpg"
              alt="Family Suite"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Family Suite
              </h2>
              <p className="text-gray-600">Capacity: 3 people</p>
              <p className="text-gray-600 mb-4">₹3000/night</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Room Card 3 */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img
              src="room3.jpg"
              alt="Executive Room"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Executive Room
              </h2>
              <p className="text-gray-600">Capacity: 3 people</p>
              <p className="text-gray-600 mb-4">₹4000/night</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Room Card 4 */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img
              src="room3.jpg"
              alt="Presidential Suite"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Presidential Suite
              </h2>
              <p className="text-gray-600">Capacity: 5 people</p>
              <p className="text-gray-600 mb-4">₹7000/night</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomTypes;

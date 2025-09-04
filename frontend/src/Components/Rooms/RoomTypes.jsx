import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function RoomTypes() {
  const navigate = useNavigate();

  const rooms = [
    { id: 1, title: "Deluxe Room", image: "room1.jpg", capacity: "2 people", price: 2000 },
    { id: 2, title: "Family Suite", image: "room2.jpg", capacity: "3 people", price: 3000 },
    { id: 3, title: "Executive Room", image: "room3.jpg", capacity: "3 people", price: 4000 },
    { id: 4, title: "Presidential Suite", image: "room3.jpg", capacity: "5 people", price: 7000 },
  ];

  const handleBookNow = (room) => {
    const isLoggedIn = localStorage.getItem("user"); 
    if (isLoggedIn) {
      navigate(`/rooms/${room.id}`, { state: room });
    } else {
      navigate("/login", { state: { from: `/rooms/${room.id}`, room } });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)] text-white">
      <Navbar />

      <div className="text-center mt-12">
        <h1 className="text-5xl font-bold mb-12">Available Rooms</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 max-w-5xl mx-auto">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img src={room.image} alt={room.title} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{room.title}</h2>
                <p className="text-gray-600">Capacity: {room.capacity}</p>
                <p className="text-gray-600 mb-4">₹{room.price}/night</p>
                <button
                  onClick={() => handleBookNow(room)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomTypes;

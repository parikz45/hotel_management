import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function IndividualRoom() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state;

  // Extended Room Data
  const rooms = [
    {
      id: 1,
      title: "Deluxe Room",
      image: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
      capacity: "2 people",
      price: 2000,
      desc: "A cozy and modern room with all amenities for couples or solo travelers.",
      amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "24/7 Room Service"],
      features: ["King-size bed", "Attached balcony with garden view", "Work desk"],
      policies: ["Check-in: 12:00 PM", "Check-out: 11:00 AM", "No pets allowed"]
    },
    {
      id: 2,
      title: "Family Suite",
      image: ["/room2.jpg"],
      capacity: "3 people",
      price: 3000,
      desc: "Spacious suite perfect for families, with extra living space and comfort.",
      amenities: ["Free Wi-Fi", "2 Double Beds", "Air Conditioning", "Refrigerator", "Complimentary Breakfast"],
      features: ["Living area with sofa", "City view", "Large bathroom with bathtub"],
      policies: ["Check-in: 1:00 PM", "Check-out: 12:00 PM", "Pets allowed on request"]
    },
    {
      id: 3,
      title: "Executive Room",
      image: ["/room3.jpg"],
      capacity: "3 people",
      price: 4000,
      desc: "Premium room designed for business executives with luxury interiors.",
      amenities: ["High-speed Wi-Fi", "Smart TV", "Coffee Maker", "Work Desk", "Airport Pickup Service"],
      features: ["Large King Bed", "Panoramic city view", "Conference table for meetings"],
      policies: ["Check-in: 12:00 PM", "Check-out: 11:00 AM", "Business visitors allowed"]
    },
    {
      id: 4,
      title: "Presidential Suite",
      image: ["/room3.jpg"],
      capacity: "5 people",
      price: 7000,
      desc: "The most luxurious suite with top-class facilities and breathtaking views.",
      amenities: ["Private Jacuzzi", "Home Theater", "Butler Service", "Luxury Dining Area", "Free Mini Bar"],
      features: ["2 Bedrooms + Living Room", "Private Balcony with Ocean View", "Personalized Concierge"],
      policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM", "VIP guests only"]
    },
  ];

  const roomData = room || rooms.find((r) => r.id === parseInt(id));

  // state for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!roomData) {
    return <h2 className="text-center text-red-600 mt-20">Room not found!</h2>;
  }

  const images = Array.isArray(roomData.image) ? roomData.image : [roomData.image];

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
              alt={roomData.title}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />

            {/* Prev Button */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer top-[30%] left-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {"<"}
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer top-[30%] right-3 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
                >
                  {">"}
                </button>

                {/* Dots */}
                <div className="flex justify-center mt-3">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                        currentIndex === index ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Room Details */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                {roomData.title}
              </h1>
              <p className="text-gray-600 mb-2 text-lg">Capacity: {roomData.capacity}</p>
              <p className="text-gray-600 mb-4 text-lg">Price: ₹{roomData.price}/night</p>
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
                {roomData.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Policies */}
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Policies</h2>
              <ul className="list-disc list-inside text-gray-600">
                {roomData.policies.map((item, index) => (
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

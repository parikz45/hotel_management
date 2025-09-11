import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Star } from "lucide-react";

function RoomTypes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [capacityFilter, setCapacityFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(10000);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleBookNow = (room) => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate(`/rooms/${room._id}`, { state: room });
    } else {
      navigate("/login", { state: { from: `/rooms/${room._id}`, room } });
    }
  };

  const toggleFilter = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.type
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCapacity =
      capacityFilter.length === 0 || capacityFilter.includes(room.capacity);

    const matchesType =
      typeFilter.length === 0 || typeFilter.includes(room.type.toLowerCase());

    const matchesAmenities =
      amenitiesFilter.length === 0 ||
      amenitiesFilter.every((amenity) => room.amenities?.includes(amenity));

    const matchesPrice = room.rate <= priceFilter;

    return (
      matchesSearch &&
      matchesCapacity &&
      matchesType &&
      matchesAmenities &&
      matchesPrice
    );
  });

  // fetch all rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rooms");
        console.log(response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);
  

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)] text-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Available Rooms
        </h1>

        {/* Sidebar toggle button for small screens */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
          >
            {sidebarOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={`w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md space-y-4
            ${sidebarOpen ? "block" : "hidden"} lg:block`}
          >
            <h2 className="font-semibold text-lg">Filter Options</h2>

            <div>
              <input
                type="text"
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Capacity</h3>
              {[2, 3, 5].map((cap) => (
                <label key={cap} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={capacityFilter.includes(cap)}
                    onChange={() => toggleFilter(setCapacityFilter, cap)}
                  />
                  <span>{cap} people</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-medium mb-2">Room Type</h3>
              {["standard", "suite", "deluxe", "family"].map((type) => (
                <label key={type} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes(type)}
                    onChange={() => toggleFilter(setTypeFilter, type)}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-medium mb-2">Amenities</h3>
              {["Wifi", "TV", "Kitchen", "Air Conditioning", "Jacuzzi"].map(
                (amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={amenitiesFilter.includes(amenity)}
                      onChange={() => toggleFilter(setAmenitiesFilter, amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                )
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                Up to ₹{priceFilter}
              </div>
            </div>
          </div>

          {/* Room Listings */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <img
                    src={
                      room.images && room.images.length > 0
                        ? room.images[0]
                        : "room1.jpg"
                    }
                    alt={room.type}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Capacity: {room.capacity} people
                    </p>
                    <p className="text-gray-600 mb-1">
                      Amenities: {room.amenities?.join(", ")}
                    </p>                    

                    <p className="text-gray-600 mb-1">
                      Policies: {room.RoomPolicies?.join(", ")}
                    </p>
                    <p className="text-black font-semibold text-[17px] mb-4">₹{room.rate}/night</p>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-200">
                No rooms match the search criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomTypes;

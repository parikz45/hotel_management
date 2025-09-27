import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRoomContext } from '../hooks/useRoomContext';
import { useAuthContext } from '../hooks/useAuthContext';


const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const MiniCloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// --- Reusable Components ---

// 1. Room Card Component with Image Carousel
const RoomCard = ({ room, onEdit, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation(); // Prevent card click event
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? room.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const isLastImage = currentIndex === room.images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        <img src={
          room.images[currentIndex].startsWith("http")
            ? room.images[currentIndex] // full URL
            : `/${room.images[currentIndex]}`
        }
          className="h-full w-full object-cover transition-opacity duration-300"
        />
        {room.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-opacity-60">
              <ChevronLeftIcon />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-opacity-60">
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-gray-800">{room.type}</h3>
        <p className="text-sm text-gray-500">{room.capacity} Guests</p>
        <p className="mt-1 text-sm font-semibold text-gray-700">₹{room.rate}/night</p>
        <div className="mt-auto pt-4">
          <div className="flex justify-end space-x-2">
            <button onClick={() => onEdit(room)} className="rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600">Edit</button>
            <button onClick={() => onDelete(room._id)} className="rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// 2. Add/Edit Room Modal Component
// 2. Add/Edit Room Modal Component
const AddEditRoomModal = ({ isOpen, onClose, onSave, roomData }) => {
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  React.useEffect(() => {
    if (roomData) {
      // Pre-fill form if editing
      setFormData({
        roomType: roomData.type || 'standard',
        capacity: roomData.capacity || '',
        nightlyRate: roomData.rate || '',
        isReserved: roomData.isReserved || false,
        amenities: roomData.amenities?.join(", ") || "",
        RoomFeatures: roomData.RoomFeatures?.join(", ") || "",
        RoomPolicies: roomData.RoomPolicies?.join(", ") || "",
      });
      setImagePreviews(roomData.images || []);
    } else {
      // Reset for new room
      setFormData({
        roomType: 'standard',
        capacity: '',
        nightlyRate: '',
        isReserved: false,
        amenities: "",
        RoomFeatures: "",
        RoomPolicies: "",
      });
      setImagePreviews([]);
    }
  }, [roomData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const imageUrl = imagePreviews[indexToRemove];
    if (imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      capacity: Number(formData.capacity),
      nightlyRate: Number(formData.nightlyRate),
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : [],
      RoomFeatures: formData.RoomFeatures
        ? formData.RoomFeatures.split(",").map((f) => f.trim())
        : [],
      RoomPolicies: formData.RoomPolicies
        ? formData.RoomPolicies.split(",").map((p) => p.trim())
        : [],
      images: imagePreviews,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-auto items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>
        <h2 className="mb-6 pt-[20px] text-2xl font-bold text-gray-800">
          {roomData ? "Edit Room" : "Add Room"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType || "standard"}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="family">Family</option>
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity || ""}
              onChange={handleChange}
              required
              placeholder="e.g., 2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Nightly Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nightly Rate (₹)
            </label>
            <input
              type="number"
              name="nightlyRate"
              value={formData.nightlyRate || ""}
              onChange={handleChange}
              required
              placeholder="e.g., 150"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amenities (comma-separated)
            </label>
            <textarea
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Air Conditioning, TV"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Room Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Features (comma-separated)
            </label>
            <textarea
              name="RoomFeatures"
              value={formData.RoomFeatures}
              onChange={handleChange}
              placeholder="Sea View, Balcony, King-size bed"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Room Policies */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Policies (comma-separated)
            </label>
            <textarea
              name="RoomPolicies"
              value={formData.RoomPolicies}
              onChange={handleChange}
              placeholder="No smoking, No pets"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Add More Images
            </label>
            <input
              type="file"
              name="imageFiles"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 rounded-lg border p-2">
              {imagePreviews.map((src, index) => (
                <div key={src + index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                  >
                    <MiniCloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Is Reserved */}
          <div className="flex items-center">
            <input
              id="isReserved"
              name="isReserved"
              type="checkbox"
              checked={formData.isReserved || false}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="isReserved"
              className="ml-2 block text-sm text-gray-900"
            >
              Is Reserved
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



// --- Main Page Component ---
const Rooms = () => {
  const { rooms, dispatch } = useRoomContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const { user } = useAuthContext();


  useEffect(() => {
    const fetchAllRooms = async () => {
      const response = await axios.get('https://hotelmanagement-5ymkn.sevalla.app/api/rooms', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        withCredentials: true
      });
      const data = response.data;
      if (response.status === 200) {
        console.log("Fetched rooms:", data);
        dispatch({ type: 'SET_ROOMS', payload: data });
      }
    };
    fetchAllRooms();
  }, [dispatch]);

  const handleOpenModal = () => {
    setCurrentRoom(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRoom(null);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`https://hotelmanagement-5ymkn.sevalla.app/api/rooms/${roomId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        dispatch({ type: 'DELETE_ROOM', payload: roomId });
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  const handleSaveRoom = async (savedData) => {
    const roomPayload = {
      type: savedData.roomType.toLowerCase(),
      capacity: parseInt(savedData.capacity),
      rate: parseInt(savedData.nightlyRate),
      isReserved: savedData.isReserved || false,
      images: savedData.images.length > 0
        ? savedData.images
        : [`https://placehold.co/600x400/EEE/31343C?text=No+Image`],
    };
    console.log('Saving room with data:', roomPayload);
    try {
      if (currentRoom) {
        const response = await axios.patch(`https://hotelmanagement-5ymkn.sevalla.app/api/rooms/${currentRoom._id}`, roomPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        dispatch({
          type: 'UPDATE_ROOM',
          payload: response.data
        });

      } else {
        // Create new room
        const response = await axios.post('https://hotelmanagement-5ymkn.sevalla.app/api/rooms', roomPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        dispatch({
          type: 'ADD_ROOM',
          payload: response.data
        });
      }

      handleCloseModal();

    } catch (err) {
      console.error('Failed to save room:', err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Room Management Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Return to Home
            </Link>
            <button
              onClick={handleOpenModal}
              className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Add New Room
            </button>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms && rooms.map(room => (
              <RoomCard key={room._id} room={room} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </main>
      </div>

      <AddEditRoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRoom}
        roomData={currentRoom}
      />
    </div>
  );
};

export default Rooms;


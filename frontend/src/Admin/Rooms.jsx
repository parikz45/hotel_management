import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Helper Data & Icons ---
// In a real app, you would fetch this from an API.
const initialRooms = [
  { id: 1, name: 'Deluxe Double', guests: 2, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Deluxe+Double' },
  { id: 2, name: 'Executive Suite', guests: 2, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Executive+Suite' },
  { id: 3, name: 'Executive Suite', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Executive+Suite' },
  { id: 4, name: 'Standard Twin', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+Twin' },
  { id: 5, name: 'Deluxe King', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Deluxe+King' },
  { id: 6, name: 'Standard Queen', guests: 2, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+Queen' },
  { id: 7, name: 'Standard Twin', guests: 2, price: 280, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+Twin' },
  { id: 8, name: 'Standard King', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+King' },
  { id: 9, name: 'Deluxe Twin', guests: 2, price: 150, image: 'https://placehold.co/600x400/EEE/31343C?text=Deluxe+Twin' },
  { id: 10, name: 'Standard Queen', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+Queen' },
  { id: 11, name: 'Deluxe Suite', guests: 4, price: null, image: 'https://placehold.co/600x400/EEE/31343C?text=Deluxe+Suite' },
  { id: 12, name: 'Standard Double', guests: 2, price: 150, image: 'https://placehold.co/600x400/EEE/31343C?text=Standard+Double' },
];

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// --- Reusable Components ---

// 1. Room Card Component
const RoomCard = ({ room, onEdit, onDelete }) => (
  <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
    <img src={room.image} alt={room.name} className="h-40 w-full object-cover" />
    <div className="flex flex-1 flex-col p-4">
      <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
      <p className="text-sm text-gray-500">{room.guests} Guests</p>
      {room.price && <p className="mt-1 text-sm font-semibold text-gray-700">${room.price}/night</p>}
      <div className="mt-auto pt-4">
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(room)} className="rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600">Edit</button>
          <button onClick={() => onDelete(room.id)} className="rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
);


// 2. Add/Edit Room Modal Component
const AddEditRoomModal = ({ isOpen, onClose, onSave, roomData }) => {
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    // Pre-fill form if editing, otherwise reset
    setFormData(roomData || {
      roomType: 'Standard',
      capacity: '',
      nightlyRate: '',
      amenities: 'Wifi',
      features: '',
      policies: '',
      isReserved: false
    });
  }, [roomData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <CloseIcon />
        </button>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">{roomData ? 'Edit Room' : 'Add Room'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g., 2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nightly Rate ($)</label>
            <input type="number" name="nightlyRate" value={formData.nightlyRate} onChange={handleChange} placeholder="e.g., 150" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="e.g., Wifi, Minibar" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="e.g., Balcony" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          
          <div className="flex items-center">
            <input id="isReserved" name="isReserved" type="checkbox" checked={formData.isReserved} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="isReserved" className="ml-2 block text-sm text-gray-900">Is Reserved</label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const Rooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null); // Used for editing

  const handleOpenModal = () => {
    setCurrentRoom(null); // Clear previous edit data
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
  
  const handleDelete = (roomId) => {
    // Add a confirmation dialog for a better user experience
    if (window.confirm('Are you sure you want to delete this room?')) {
        setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  const handleSaveRoom = (formData) => {
    if (currentRoom) {
      // Editing existing room
      setRooms(rooms.map(room => room.id === currentRoom.id ? { ...room, ...formData, name: formData.roomType, guests: formData.capacity, price: formData.nightlyRate } : room));
    } else {
      // Adding new room
      const newRoom = { 
          id: Date.now(), // Simple unique ID
          ...formData,
          name: formData.roomType, 
          guests: formData.capacity, 
          price: formData.nightlyRate,
          image: `https://placehold.co/600x400/EEE/31343C?text=${formData.roomType.replace(' ','+')}` 
        };
      setRooms([...rooms, newRoom]);
    }
    handleCloseModal();
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Room Management Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
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

        {/* Rooms Grid */}
        <main>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </main>
      </div>

      {/* Modal for Adding/Editing Rooms */}
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


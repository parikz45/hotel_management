import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [confirmCancelId, setConfirmCancelId] = useState(null); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/bookings/user/${user._id}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [user._id]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => (booking._id || booking.id) !== bookingId));
      setConfirmCancelId(null); // reset confirmation state
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-300 text-yellow-900';
      case 'booked': return 'bg-green-300 text-green-900';
      case 'failed': return 'bg-red-300 text-red-900';
      case 'cancelled': return 'bg-gray-400 text-gray-700';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-3 min-h-screen" style={{ backgroundColor: '#0f2441', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main className="max-w-4xl mx-auto">
        <div className="my-10 text-center">
          <h2 className="text-3xl font-bold mb-2">My Profile</h2>
          <p className="text-gray-400 text-sm">User ID: {user._id}</p>
        </div>

        <div className="space-y-6">
          {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              return (
                <div
                  key={bookingId}
                  className="bg-white text-gray-800 rounded-2xl p-8 mb-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center"
                >
                  <img
                    src={`/${booking.room.images[0]}`}
                    alt={`${booking.room.type} room`}
                    className="rounded-xl w-full sm:w-56 h-40 object-cover mb-6 sm:mb-0 sm:mr-8"
                  />
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4">{booking.room.type}</h3>
                    <div className="grid grid-cols-2 gap-6 sm:flex sm:space-x-10 text-gray-700">
                      <div>
                        <span className="text-sm font-medium">Check-in:</span>
                        <span className="font-bold block text-lg">
                          {new Date(booking.checkinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Check-out:</span>
                        <span className="font-bold block text-lg">
                          {new Date(booking.checkoutDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Amount:</span>
                        <span className="font-bold block text-lg">${booking.amount}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded-full capitalize ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                      {(booking.status === "pending" || booking.status === "booked") && (
                        <>
                          {confirmCancelId === bookingId ? (
                            <div className="ml-4 flex space-x-2">
                              <button
                                onClick={() => cancelBooking(bookingId)}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                              >
                                Yes, Cancel
                              </button>
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmCancelId(bookingId)}
                              className="ml-4 px-4 py-2 cursor-pointer text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No bookings found.</p>
          )}
        </div>
      </main>
      
    </div>
  );
};

export default Profile;

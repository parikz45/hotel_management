import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- Helper Components & Icons ---

const Spinner = () => (
    <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600"></div>
    </div>
);

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
    const statusClasses = {
        booked: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        cancelled: "bg-gray-200 text-gray-800",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

// --- New Booking Card Component ---
const BookingCard = ({ booking }) => {
    // CORRECTED: Use `booking.room.type` instead of `booking.room.name` to match the Room model.
    const roomName = booking.room?.type || 'N/A';
    const roomImage = booking.room?.images?.[0] || 'https://placehold.co/600x400/E5E7EB/374151?text=No+Image';
    const userName = booking.user?.name || booking.user?.username || 'N/A';

    return (
        <div className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <img 
                src={roomImage} 
                alt={`Image of ${roomName} room`}
                className="h-40 w-full sm:w-48 rounded-lg object-cover"
            />
            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 capitalize">{roomName} Room</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                    <div>
                        <p className="font-semibold text-gray-500">Booked By</p>
                        <p className="text-gray-800">{userName}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Check-in</p>
                        <p className="text-gray-800">{new Date(booking.checkinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Check-out</p>
                        <p className="text-gray-800">{new Date(booking.checkoutDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Amount</p>
                        <p className="text-gray-800">${booking.amount.toFixed(2)}</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-start gap-4">
                    <p className="text-sm text-gray-500">Status:</p>
                    <StatusBadge status={booking.status} />
                </div>
            </div>
        </div>
    );
};


// --- Main Userbookings Page Component ---
const Userbookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Now only one API call is needed as the backend populates all required data.
                const response = await axios.get('http://localhost:8000/api/bookings');
                setBookings(response.data);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
                setError("Failed to load booking data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        All User Bookings
                    </h1>
                    <p className="mt-2 text-gray-600">A complete overview of all reservations.</p>
                </header>

                <main className="space-y-6">
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="p-8 text-center text-red-600 rounded-lg bg-white shadow-md">{error}</div>
                    ) : bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))
                    ) : (
                       <div className="p-8 text-center text-gray-500 rounded-lg bg-white shadow-md">
                           No bookings found.
                       </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Userbookings;


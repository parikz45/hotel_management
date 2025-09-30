import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// --- Helper Components & Icons ---
const api = process.env.REACT_APP_PUBLIC_KEY || "http://localhost:8000"
const Spinner = () => (
    <div className="flex h-32 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600"></div>
    </div>
);

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        completed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};


// --- Main Allpayments Page Component ---
const Allpayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                // API call to your backend endpoint
                const response = await axios.get(`${api}/api/payments`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                    withCredentials: true
                });
                setPayments(response.data);
            } catch (err) {
                console.error("Failed to fetch payments:", err);
                setError("Failed to load payment data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Payment Management
                    </h1>
                    <Link
                        to="/" // Assuming you have a route back to the main admin dashboard or homepage
                        className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        Return to Home
                    </Link>
                </header>

                <main className="overflow-hidden rounded-xl bg-white shadow-lg">
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="p-8 text-center text-red-600">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Payment ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">User ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Booking ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Method</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {payments.map((payment) => (
                                        <tr key={payment._id} className="transition-colors hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-500">{payment._id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-500">{payment.user}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-500">{payment.booking}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">&#8377;{payment.amount.toFixed(2)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{payment.method.replace('_', ' ')}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                <StatusBadge status={payment.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Allpayments;

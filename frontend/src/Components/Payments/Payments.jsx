import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function Payments() {
    const { bookingid } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [selectedMethod, setSelectedMethod] = useState('credit_card');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [amount, setAmount] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const [nights, setNights] = useState(0);


    const paymentMethods = {
        'credit_card': { text: 'Card Details', isForm: true, icon: 'https://img.icons8.com/color/48/000000/visa.png' },
        'debit_card': { text: 'Card Details', isForm: true, icon: 'https://img.icons8.com/color/48/000000/mastercard.png' },
        'upi': {
            text: 'Your UPI app will open for payment. After successful payment, the page will update automatically.',
            isForm: false,
            icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png"
        },
        'net_banking': { text: 'You will be redirected to your bank\'s website to complete the payment.', isForm: false, icon: 'https://img.icons8.com/fluency/48/bank.png' },
        'cash': { text: 'Please pay at the front desk upon check-in.', isForm: false, icon: 'https://img.icons8.com/color/48/000000/cash-in-hand.png' }
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Simulating a delay for payment processing
        setTimeout(async () => {
            setIsLoading(false);

            try {
                // Call backend to complete booking/payment
                const response = await axios.post(
                    'https://hotelmanagement-5ymkn.sevalla.app/api/bookingFlow/bookRoom',
                    {
                        bookingId: bookingid,
                        paymentMethod: selectedMethod
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        },
                        withCredentials: true
                    }
                );
                console.log('Response from bookingFlow:', response.data);

                if (selectedMethod === 'cash') {
                    setMessage({
                        isSuccess: true,
                        title: 'Booking Confirmed!',
                        text: 'Your booking has been confirmed. Please pay at the front desk upon check-in.'
                    });

                    // Automatically navigate after 3 seconds
                    setTimeout(() => {
                        navigate(`/profile/${user._id}`, {
                            state: { paymentComplete: true },
                            replace: true // Replace current entry in history
                        });
                    }, 3000);
                }
                else if (selectedMethod === 'upi' || selectedMethod === 'net_banking') {
                    setMessage({
                        title: "Payment Successful!",
                        text: "Your booking has been confirmed. You will receive an email with your booking details shortly.",
                        isSuccess: true,
                    });

                    // Automatically navigate after 3 seconds
                    setTimeout(() => {
                        navigate(`/profile/${user._id}`, {
                            state: { paymentComplete: true },
                            replace: true // Replace current entry in history
                        });
                    }, 3000);
                }
                else {
                    if (response.status === 200) {
                        setMessage({
                            title: "Payment Successful!",
                            text: response.data.message || "Your booking has been confirmed.",
                            isSuccess: true,
                        });

                        // Automatically navigate after 3 seconds
                        setTimeout(() => {
                            navigate(`/profile/${user._id}`, {
                                state: { paymentComplete: true },
                                replace: true // Replace current entry in history
                            });
                        }, 3000);
                    } else {
                        setMessage({
                            title: "Payment Failed!",
                            text: response.data.error || "There was an issue processing your payment.",
                            isSuccess: false,
                        });
                    }
                }


                console.log('Booking & payment response:', response.data);
            } catch (err) {
                setMessage({
                    isSuccess: false,
                    title: 'Payment Failed!',
                    text: 'There was an issue processing your payment. Please try again or use a different method.'
                });
                console.error('Payment error:', err);
            }

        }, 2000);
    };


    const getButtonText = () => {
        if (selectedMethod === 'cash') {
            return 'Confirm Booking';
        }
        return `Pay ₹${amount} `;
    };

    const showForm = paymentMethods[selectedMethod]?.isForm;

    // format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    // fetch booking details
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`https://hotelmanagement-5ymkn.sevalla.app/api/bookings/${bookingid}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: true
                });
                if (response.data && response.data.amount) {
                    setAmount(response.data.amount);

                    const checkin = new Date(response.data.checkinDate);
                    const checkout = new Date(response.data.checkoutDate);

                    setCheckinDate(formatDate(checkin));
                    setCheckoutDate(formatDate(checkout));

                    // calculate no of nights
                    const diffTime = checkout.getTime() - checkin.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    setNights(diffDays);

                }
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };
        fetchBookingDetails();
    }, [bookingid]);


    return (
        <div className="bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)] min-h-screen text-[#E0E0E0] font-inter">
            <style jsx="true">
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                .loader {
                    border-top: 4px solid #3b82f6;
                    border-right: 4px solid transparent;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>

            {/* Navbar */}
            <Navbar />

            <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-white text-gray-800 w-full max-w-2xl p-8 rounded-xl shadow-lg space-y-8">
                    {/* Booking Summary Section */}
                    <div className="border-b border-gray-300 pb-4">
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Booking Summary</h2>
                        <div className="flex justify-between items-center font-semibold lg:mt-[20px] text-gray-600">
                            <span>Room Type</span>
                            <span className="text-gray-900 font-medium">Deluxe Suite</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 mt-2">
                            <span>Check-in Date</span>
                            <span className="text-gray-900 font-medium">{checkinDate} </span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 mt-2">
                            <span>Check-out Date</span>
                            <span className="text-gray-900 font-medium">{checkoutDate} </span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 mt-2">
                            <span>Nights</span>
                            <span className="text-gray-900 font-medium">{nights} </span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-xl mt-4 text-gray-900">
                            <span>Total Amount</span>
                            <span>Rs {amount} </span>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Select Payment Method</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.keys(paymentMethods).map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setSelectedMethod(method)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${selectedMethod === method ? 'border-blue-500' : 'border-transparent hover:border-blue-500'}`}
                                >
                                    <img src={paymentMethods[method].icon} alt={method} className="h-10 w-10 mb-2" />
                                    <span className="text-sm capitalize text-gray-800">{method.replace('_', ' ')}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Form (conditionally rendered) */}
                    {showForm ? (
                        <form className="space-y-4">
                            <h3 className="text-xl font-semibold">Payment Details</h3>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                                <input required type="text" id="cardNumber" className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="xxxx xxxx xxxx xxxx" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                                    <input required type="text" id="expiry" className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                                    <input required type="text" id="cvv" className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="xxx" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={handlePayment}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-md"
                            >
                                {getButtonText()}
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-gray-800">
                                <p className="text-sm text-center">{paymentMethods[selectedMethod]?.text}</p>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-md"
                            >
                                {getButtonText()}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Message Box (conditionally rendered) */}
            {message && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-gray-300">
                        {message.isSuccess ? (
                            <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">{message.title}</h2>
                        <p className="text-sm text-gray-600 mb-4">{message.text}</p>
                        <button
                            onClick={() => {
                                setMessage(null);
                                if (message.isSuccess) {
                                    // Navigate to profile with state indicating payment is complete
                                    navigate(`/profile/${user._id}`, {
                                        state: { paymentComplete: true },
                                        replace: true // This replaces the current page in history
                                    });
                                }
                            }}
                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {message.isSuccess ? 'Go to Profile' : 'OK'}
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Indicator (conditionally rendered) */}
            {isLoading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        <p className="text-white text-lg font-semibold">Processing payment...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payments;

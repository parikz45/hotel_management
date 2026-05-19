import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (msg, type = "info") => {
    toast[type](msg, { position: "top-right", autoClose: 3000 });
};

// PDF Styles 
const pdfStyles = StyleSheet.create({
    page: { backgroundColor: "#f5f5f5", padding: 20 },
    container: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 20 },
    heading: { fontSize: 20, marginBottom: 10, textAlign: "center", color: "#1D4ED8", fontWeight: "bold" },
    section: { marginBottom: 10 },
    label: { fontWeight: "bold" },
    value: {},
    grid: { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    gridItem: { width: "48%", marginBottom: 5 },
    paymentSummary: { marginTop: 10, padding: 10, backgroundColor: "#DBEAFE", border: "1px solid #BFDBFE" },
    total: { fontSize: 18, fontWeight: "bold", marginTop: 10, textAlign: "right" },
});

const PDFReceipt = ({ receipt }) => (
    <Document>
        <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.container}>
                <Text style={pdfStyles.heading}>✅ Booking Confirmation & Receipt</Text>

                <View style={pdfStyles.grid}>
                    <View style={pdfStyles.gridItem}>
                        <Text><Text style={pdfStyles.label}>Receipt ID:</Text> {receipt.receiptId}</Text>
                    </View>
                    <View style={pdfStyles.gridItem}>
                        <Text><Text style={pdfStyles.label}>Booking ID:</Text> {receipt.bookingId}</Text>
                    </View>
                </View>

                <View style={pdfStyles.container}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Customer Information</Text>
                    <Text><Text style={pdfStyles.label}>Name:</Text> {receipt.user?.name || "N/A"}</Text>
                    <Text><Text style={pdfStyles.label}>Email:</Text> {receipt.user?.email || "N/A"}</Text>
                </View>

                <View style={pdfStyles.container}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Stay Details</Text>
                    <Text><Text style={pdfStyles.label}>Check-in:</Text> {new Date(receipt.checkinDate).toLocaleDateString()}</Text>
                    <Text><Text style={pdfStyles.label}>Check-out:</Text> {new Date(receipt.checkoutDate).toLocaleDateString()}</Text>
                    <Text><Text style={pdfStyles.label}>Room ID:</Text> {receipt.roomId}</Text>
                    <Text><Text style={pdfStyles.label}>Status:</Text> {receipt.bookingStatus}</Text>
                </View>

                <View style={pdfStyles.paymentSummary}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Payment Summary</Text>
                    <Text><Text style={pdfStyles.label}>Method:</Text> {receipt.method.replace("_", " ")}</Text>
                    <Text><Text style={pdfStyles.label}>Transaction Date:</Text> {new Date(receipt.paymentDate).toLocaleString()}</Text>
                    <Text><Text style={pdfStyles.label}>Payment Status:</Text> {receipt.status}</Text>
                    <Text style={pdfStyles.total}>Total Paid: ₹{receipt.amount}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

function PaymentReceipt() {
    const { bookingid } = useParams();

    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!bookingid) {
            setLoading(false);
            setError("No booking ID found in URL.");
            return;
        }

        const fetchReceipt = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/payments/${bookingid}`, { withCredentials: true });
                setReceipt(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load receipt. Please check your booking.");
                setLoading(false);
            }
        };

        fetchReceipt();
    }, [bookingid]);

    if (loading) return <p className="text-center text-gray-500 my-10">Loading booking receipt...</p>;
    if (error) return <p className="text-center text-red-600 my-10 font-medium">{error}</p>;
    if (!receipt) return <p className="text-center text-gray-500 my-10">No receipt found for this booking ID.</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Receipt Content */}
                <div className="p-6 md:p-10 border border-gray-200 rounded-2xl shadow-xl bg-white mb-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-6 border-b-4 border-blue-100 pb-3">
                        ✅ Booking Confirmation & Receipt
                    </h2>

                    {/* Receipt & Booking IDs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
                        <p className="p-3 bg-gray-50 rounded-lg">
                            <span className="font-bold text-gray-800">Receipt ID:</span> {receipt.receiptId}
                        </p>
                        <p className="p-3 bg-gray-50 rounded-lg">
                            <span className="font-bold text-gray-800">Booking ID:</span> {receipt.bookingId}
                        </p>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-8 p-5 border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-3">Customer Information</h3>
                        <p className="text-gray-600 mb-1"><span className="font-medium text-gray-900">Name:</span> {receipt.user?.name || "N/A"}</p>
                        <p className="text-gray-600"><span className="font-medium text-gray-900">Email:</span> {receipt.user?.email || "N/A"}</p>
                    </div>

                    {/* Stay Details */}
                    <div className="mb-8 p-5 border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-3">Stay Details</h3>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-600">
                            <p><span className="font-medium text-gray-900">Check-in:</span> {new Date(receipt.checkinDate).toLocaleDateString()}</p>
                            <p><span className="font-medium text-gray-900">Check-out:</span> {new Date(receipt.checkoutDate).toLocaleDateString()}</p>
                            <p><span className="font-medium text-gray-900">Room ID:</span> {receipt.roomId}</p>
                            <p><span className="font-medium text-gray-900">Status:</span>
                                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold capitalize ${receipt.bookingStatus === "booked" ? "bg-green-100 text-green-700" :
                                    receipt.bookingStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                                    }`}>
                                    {receipt.bookingStatus}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-xl">
                        <h3 className="text-2xl font-extrabold text-blue-700 border-b border-blue-200 pb-3 mb-4">Payment Summary</h3>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-medium text-gray-800">
                            <p className="font-bold">Method:</p>
                            <p className="text-right capitalize font-bold">{receipt.method.replace('_', ' ')}</p>

                            <p className="font-bold">Transaction Date:</p>
                            <p className="text-right">{new Date(receipt.paymentDate).toLocaleString()}</p>

                            <p className="font-bold">Payment Status:</p>
                            <p className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${receipt.status === "completed" ? "bg-green-200 text-green-800" :
                                    receipt.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                                        "bg-red-200 text-red-800"
                                    }`}>
                                    {receipt.status}
                                </span>
                            </p>

                            <p className="text-2xl font-extrabold text-blue-700 pt-4 border-t border-blue-200">Total Amount Paid:</p>
                            <p className="text-right font-extrabold text-3xl text-blue-700 pt-4 border-t border-blue-200">₹{receipt.amount}</p>
                        </div>
                    </div>
                </div>

                {/* PDF Download Button */}
                <div className="text-center mt-6">
                    <PDFDownloadLink
                        document={<PDFReceipt receipt={receipt} />}
                        fileName={`Booking_Receipt_${receipt.bookingId}.pdf`}
                        style={{
                            backgroundColor: "#7C3AED",
                            color: "#fff",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                    >
                        {({ loading }) => (loading ? "Preparing PDF..." : "Download Receipt as PDF")}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    );
}

export default PaymentReceipt;

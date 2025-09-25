import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, BedDouble, CreditCard, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Rooms",
      description: "Add, edit, or delete hotel rooms.",
      icon: <BedDouble className="w-10 h-10 text-blue-600" />,
      route: "/admin/rooms",
      bg: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "View Bookings",
      description: "See all user bookings and their status.",
      icon: <ClipboardList className="w-10 h-10 text-green-600" />,
      route: "/admin/bookings",
      bg: "bg-green-50 hover:bg-green-100",
    },
    {
      title: "View Payments",
      description: "Check all user payment records.",
      icon: <CreditCard className="w-10 h-10 text-purple-600" />,
      route: "/admin/payments",
      bg: "bg-purple-50 hover:bg-purple-100",
    },
    {
      title: "Manage Users",
      description: "View and manage registered users.",
      icon: <Users className="w-10 h-10 text-orange-600" />,
      route: "/admin/users",
      bg: "bg-orange-50 hover:bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer ${card.bg} rounded-2xl p-6 lg:p-15 shadow-md transition transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              {card.title}
            </h2>
            <p className="text-center text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

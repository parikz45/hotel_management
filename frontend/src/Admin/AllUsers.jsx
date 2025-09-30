import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_PUBLIC_KEY

function AdminUsers() {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") return;

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${api}/api/auth/users`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user]);

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h2 className="text-2xl font-semibold text-red-600">
                    Access Denied: Admins only
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Top Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
                <button
                    onClick={() => navigate("/admin")}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
                >
                    Return to Home
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm uppercase">
                            <th className="px-6 py-3">USER ID</th>
                            <th className="px-6 py-3">USERNAME</th>
                            <th className="px-6 py-3">EMAIL</th>
                            <th className="px-6 py-3">NAME</th>
                            <th className="px-6 py-3">PHONE</th>
                            <th className="px-6 py-3">ROLE</th>
                            <th className="px-6 py-3">CREATED AT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{u._id}</td>
                                    <td className="px-6 py-4 text-sm ">
                                        {u.username}
                                    </td>
                                    <td className="px-6 py-4 text-sm">{u.email}</td>
                                    <td className="px-6 py-4 text-sm">{u.name || "-"}</td>
                                    <td className="px-6 py-4 text-sm">{u.phone || "-"}</td>
                                    <td
                                        className={`px-6 py-4 text-sm font-semibold ${u.role === "admin"
                                            ? "text-red-600"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {u.role}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-4 text-center text-gray-500 italic"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUsers;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { Menu, X } from "lucide-react"; // icons

function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [isOpen, setIsOpen] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const navLinks = (
        <>
            <a
                onClick={() => navigate("/")}
                className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
            >
                Home
            </a>
            <a
                onClick={() => navigate("/rooms")}
                className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
            >
                Rooms
            </a>
            <a
                onClick={() => navigate("/about")}
                className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
            >
                About
            </a>
            {user ? (
                <>
                    <a
                        onClick={() => navigate(`/profile/${user._id}`)}
                        className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
                    >
                        Profile
                    </a>
                    <span
                        onClick={()=> setLogoutPopup(true)}
                        className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
                    >
                        Logout
                    </span>
                </>
            ) : (
                <a
                    onClick={() => navigate("/login")}
                    className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white"
                >
                    Login
                </a>
            )}
        </>
    );

    return (
        <nav className="px-4 lg:px-12 py-3 flex items-center justify-between">
            {/* Logo */}
            <span className="text-[20px] lg:text-[32px] font-bold text-white">
                DeepSea
            </span>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-8">{navLinks}</div>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#0f2441] shadow-lg flex flex-col gap-4 p-4 lg:hidden z-50">
                    {navLinks}
                </div>
            )}

            {/* Logout Confirmation Popup */}
            {logoutPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-xl p-10 w-[400px] shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                            Confirm Logout
                        </h3>
                        <p className="mb-4 text-gray-600">
                            Are you sure you want to logout?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setLogoutPopup(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    logout();
                                    setLogoutPopup(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

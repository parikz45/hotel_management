import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="flex items-center lg:justify-between px-5 lg:px-15 py-6 ">
            <span className="text-[20px] lg:text-[28px] font-bold text-white">DeepSea</span>

            {/* Nav Links */}
            <div className="flex ml-18 lg:ml-0 gap-4 lg:gap-10">
                <a onClick={() => navigate("/")} className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white">Home</a>
                <a onClick={() => navigate("/rooms")} className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white">Rooms</a>
                <a onClick={() => navigate("/about")} className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white">About</a>
                <a onClick={() => navigate("/login")} className="text-white/90 text-[14px] lg:text-[16px] cursor-pointer hover:text-white">Login</a>
            </div>
        </nav>
    )
}

export default Navbar

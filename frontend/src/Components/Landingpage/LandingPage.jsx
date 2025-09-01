import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/homebg.jpg';
import Navbar from '../Navbar/Navbar';

const Landingpage = () => {
  const navigate=useNavigate();
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex h-full flex-col text-white">
        {/* navbar */}
        <Navbar/>

        {/* Hero Content */}
        <main className="flex flex-grow flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold md:text-7xl">
            Welcome to DeepSea
          </h2>
          <p className="mt-4 px-[20px] text-xl">
            Your comfort, our priority. Manage your hotel with ease.
          </p>
          <button className="mt-8 rounded-md cursor-pointer bg-blue-600 px-6 lg:px-10 py-2 lg:py-3 text-lg font-semibold transition hover:bg-blue-700">
            Book Now
          </button>
        </main>
      </div>
    </div>
  );
};

export default Landingpage;

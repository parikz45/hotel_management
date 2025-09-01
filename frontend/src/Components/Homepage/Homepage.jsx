import React from 'react';
import { Link } from "react-router-dom";
import backgroundImage from '../../assets/homebg.jpg';

const Homepage = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex h-full flex-col text-white">
        {/* Navigation Bar */}
        <header className="p-8">
          <nav className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Hotel</h1>
            </div>
            <ul className="flex items-center space-x-8 text-lg">
              <li>
                {/* <a href="#" className="transition hover:text-gray-300">
                  Home
                </a> */}
                <Link to="/" className="transition hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="transition hover:text-gray-300">Rooms</Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-gray-300">About</Link>
              </li>
              <li>
                <Link to="/login" className="transition hover:text-gray-300">Login</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Content */}
        <main className="flex flex-grow flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold md:text-7xl">
            Welcome to DeepSea
          </h2>
          <p className="mt-4 text-xl">
            Your comfort, our priority. Manage your hotel with ease.
          </p>
          <button className="mt-8 rounded-md bg-blue-600 px-10 py-3 text-lg font-semibold transition hover:bg-blue-700">
            Book Now
          </button>
        </main>
      </div>
    </div>
  );
};

export default Homepage;

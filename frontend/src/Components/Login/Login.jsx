import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[30%] h-[40%] p-8 border border-blue-200/30 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl text-center">
        {/* Hotel Logo / Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Hotel DeepSea</h1>
        <p className="text-sm text-gray-600 mb-6">Welcome back! Please login to continue</p>

        {/* Login Heading */}
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Login</h2>

        {/* Form */}
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            className="my-2 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="my-2 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black-50"
          />

          {/* Button */}
          <button
            type="submit"
            className="mt-5 py-3 bg-blue-700 text-white font-semibold rounded-md text-base hover:bg-blue-800 transition shadow-md"
          >
            Login
          </button>
        </form>

        

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Signup Link */}
        <p className="text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-700 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

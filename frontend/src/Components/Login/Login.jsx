import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  // Get 'from' and 'room' from location state if available
  const from = location.state?.from || "/";
  const room = location.state?.room || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      if (room) {
        // If room info exists, navigate to that room's page after login
        navigate(from, { state: room });
      } else {
        // Otherwise, go to the homepage or default page
        navigate("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[85%] h-[80%] lg:w-[30%] lg:h-[40%] p-8 border border-blue-200/30 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Hotel DeepSea</h1>
        <p className="text-sm text-gray-600 mb-6">Welcome back! Please login to continue</p>

        {/* Login Heading */}
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Login</h2>

        {/* Form */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="my-2 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="my-2 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black-50"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 py-3 bg-blue-700 text-white font-semibold rounded-md text-base hover:bg-blue-800 transition shadow-md"
          >
            Login
          </button>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
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

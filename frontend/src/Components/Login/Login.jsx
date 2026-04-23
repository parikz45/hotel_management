import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";
  const room = location.state?.room || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      toast.success("Logged in successfully!");

      setTimeout(() => {
        if (room) {
          navigate(from, { state: room });
        } else {
          navigate("/");
        }
      }, 800);
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020d18]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left panel */}
      <div className="hidden md:flex flex-1 flex-col justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a4a] via-[#051525] to-[#020d18]" />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="glw" cx="40%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#1a6fa0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020d18" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#glw)" />
          <ellipse cx="200" cy="200" rx="300" ry="300" fill="none" stroke="#1a4a6a" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="200" cy="200" rx="200" ry="200" fill="none" stroke="#1a5a80" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="200" cy="200" rx="100" ry="100" fill="none" stroke="#2080b0" strokeWidth="0.8" opacity="0.6" />
          <path d="M0 420 Q200 370 400 420 Q600 470 800 420 L800 600 L0 600 Z" fill="#0a2540" opacity="0.5" />
          <path d="M0 460 Q200 420 400 460 Q600 500 800 460 L800 600 L0 600 Z" fill="#040f1e" opacity="0.9" />
        </svg>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7ec8e3]" />
            <span className="text-[11px] tracking-widest uppercase text-[#7ec8e3] font-medium">Luxury Collection</span>
          </div>
          <h2 className="text-4xl font-light text-[#e8f4f8] leading-snug mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Where the ocean<br />meets <em className="italic text-[#7ec8e3]">elegance</em>
          </h2>
          <p className="text-sm text-[#4a7a96] font-light max-w-[220px] leading-relaxed">
            An exclusive retreat crafted for those who seek the extraordinary.
          </p>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#1a3a52]/20 to-transparent" />

      {/* Right panel */}
      <div className="flex flex-1 flex-col justify-center px-10 py-12 bg-[#04111f]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17.5" stroke="#1a4a6a" strokeWidth="0.5" />
            <path d="M18 6 C18 6 10 12 10 20 C10 25 13.5 29 18 29 C22.5 29 26 25 26 20 C26 12 18 6 18 6Z" fill="#0e3a5c" stroke="#2d7aaa" strokeWidth="0.5" />
            <path d="M11 22 Q14 19 18 21 Q22 23 25 20" stroke="#5aade0" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[#c8e6f0] tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
            Hotel DeepSea
          </span>
        </div>

        <h1 className="text-3xl font-light text-[#e8f4f8] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Welcome back</h1>
        <p className="text-sm text-[#3d6880] font-light mb-8">Sign in to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-[11px] tracking-widest uppercase text-[#4a7a96] font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#071c2e] border border-[#1a3a52] rounded-md px-4 py-3 text-sm text-[#d0e8f2] placeholder-[#2a4f6a] focus:outline-none focus:border-[#2d7aaa] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] tracking-widest uppercase text-[#4a7a96] font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#071c2e] border border-[#1a3a52] rounded-md px-4 py-3 text-sm text-[#d0e8f2] placeholder-[#2a4f6a] focus:outline-none focus:border-[#2d7aaa] transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-800/30 text-[#e07070] px-4 py-3 rounded-md text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#0e4d7a] hover:bg-[#145f93] text-[#c8e8f8] text-sm font-medium tracking-wider rounded-md transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in…
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#0f2a3d]" />
          <span className="text-[11px] tracking-widest uppercase text-[#2a4f6a]">or</span>
          <div className="flex-1 h-px bg-[#0f2a3d]" />
        </div>

        <p className="text-center text-sm text-[#3d6880]">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#5aade0] hover:text-[#7ec8e3] font-medium transition">Create Account</a>
        </p>

        <p className="text-center text-[11px] text-[#1e3d52] tracking-wider mt-10">
          © 2025 Hotel DeepSea. All rights reserved.
        </p>
      </div>
    </div>
  );
}


export default Login;
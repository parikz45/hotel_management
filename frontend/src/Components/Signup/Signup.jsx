import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

function showToast() {
  toast.error("Passwords do not match!");
}

function Signup() {
  const { signup, error, isLoading } = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await signup(formData);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Account created successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a2a4a] via-[#051525] to-[#020d18]">
      <Navbar />
      <div className="flex min-h-screen " style={{ fontFamily: "'DM Sans', sans-serif" }}>

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
        <div className="flex flex-1 flex-col justify-center px-10 py-10 bg-transparent">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-7">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17.5" stroke="#1a4a6a" strokeWidth="0.5" />
              <path d="M18 6 C18 6 10 12 10 20 C10 25 13.5 29 18 29 C22.5 29 26 25 26 20 C26 12 18 6 18 6Z" fill="#0e3a5c" stroke="#2d7aaa" strokeWidth="0.5" />
              <path d="M11 22 Q14 19 18 21 Q22 23 25 20" stroke="#5aade0" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-[#c8e6f0] tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
              Hotel DeepSea
            </span>
          </div>

          <h1 className="text-3xl font-light text-[#e8f4f8] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Create an Account
          </h1>
          <p className="text-xs text-[#3d6880] font-light mb-6">Join us to experience luxury hospitality</p>

          <form onSubmit={handleSubmit}>
            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Username", name: "username", type: "text", placeholder: "Choose a username" },
                { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
                { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "10-digit phone number", maxLength: "10", pattern: "[0-9]{10}" },
                { label: "Password", name: "password", type: "password", placeholder: "Create a password" },
                { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Re-enter your password" },
              ].map(({ label, name, type, placeholder, maxLength, pattern }) => (
                <div key={name}>
                  <label className="block text-[10px] tracking-widest uppercase text-[#4a7a96] font-medium mb-1.5">{label}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                    maxLength={maxLength}
                    pattern={pattern}
                    className="w-full bg-[#071c2e] border border-[#1a3a52] rounded-md px-3.5 py-2.5 text-sm text-[#d0e8f2] placeholder-[#2a4f6a] focus:outline-none focus:border-[#2d7aaa] transition"
                  />
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-900/20 border border-red-800/30 text-[#e07070] px-4 py-3 rounded-md text-xs mb-4">
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
                  Creating Account…
                </span>
              ) : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#0f2a3d]" />
            <span className="text-[10px] tracking-widest uppercase text-[#2a4f6a]">or</span>
            <div className="flex-1 h-px bg-[#0f2a3d]" />
          </div>

          <p className="text-center text-sm text-[#3d6880]">
            Already have an account?{" "}
            <a href="/login" className="text-[#5aade0] hover:text-[#7ec8e3] font-medium transition">Sign In</a>
          </p>

          <p className="text-center text-[11px] text-[#1e3d52] tracking-wider mt-7">
            © 2025 Hotel DeepSea. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-bold text-[#1E3A8A]">
            MediCare<span className="text-[#3B82F6]">+</span>
          </h1>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-[#1E3A8A] transition">
            Home
          </Link>

          {currentUser && (
            <Link to="/dashboard" className="hover:text-[#1E3A8A] transition">
              Dashboard
            </Link>
          )}

          <Link to="/profile" className="flex items-center gap-2">
            {currentUser ? (
              <img
                src={currentUser.userDetails.profilePicture}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#3B82F6]"
              />
            ) : (
              <span className="hover:text-[#1E3A8A]">Login</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
        Smart Medical Assistant
      </h1>

      <p className="text-gray-600 max-w-xl mb-6">
        Analyze your First-aid Box usage, get insights, and make better health decisions with our intelligent system.
      </p>

      <button
        onClick={() => navigate(currentUser ? "/dashboard" : "/signin")}
        className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl hover:bg-[#3B82F6] transition"
      >
        {currentUser ? "View Analytics" : "Get Started"}
      </button>

    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E0ECFF] flex items-center px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E3A8A] mb-4">
            Smart Medical Assistant
          </h1>

          <p className="text-gray-600 max-w-xl mb-6 text-lg">
            Analyze your First-aid Box usage, get insights, and make better health decisions with our intelligent IoT-powered system.
          </p>

          <button
            onClick={() => navigate(currentUser ? "/dashboard" : "/signin")}
            className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl hover:bg-[#3B82F6] transition shadow-lg"
          >
            {currentUser ? "View Analytics" : "Get Started"}
          </button>
        </div>

        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Medical prescription-amico.png"
            alt="Medical AI"
            className="w-[90%] max-w-md drop-shadow-xl"
          />
        </div>

      </div>
    </div>
  );
}
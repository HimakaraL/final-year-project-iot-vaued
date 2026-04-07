import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          /* 2. Changed inset-y-0 to top-0 and h-full for mobile */
          /* 3. On desktop (md), we use top-auto because it lives inside the flex container */
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg p-6
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:h-full 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-2xl p-2 rounded-md bg-gray-100"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium mt-10 md:mt-0">
          {["Overview", "Add a floor", "System Notifications"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="p-3 rounded-lg hover:bg-[#3B82F6] hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        {!sidebarOpen && (
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#1E3A8A] text-2xl p-2 rounded-md bg-white shadow-sm border"
            >
              <HiOutlineMenu />
            </button>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A]">
            Floors Overview
          </h1>
        </div>

        <div className="flex justify-between items-center gap-6 px-12">
          {/* 2 parts */}
          <div className="border-4 h-[40vh] rounded-lg flex-1 flex items-center justify-center text-xl font-semibold text-gray-500"></div>

          {/* 1 part */}
          <div className="border-4 h-[40vh] rounded-lg flex-1 flex items-center justify-center text-xl font-semibold text-gray-500"></div>
        </div>

        <div className="flex justify-between items-center gap-6 px-12 mt-1">
          <div className="border-4 h-[60vh] rounded-lg flex-1 flex items-center justify-center text-xl font-semibold text-gray-500"></div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

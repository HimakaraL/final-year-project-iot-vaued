import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import {
  MdDashboard,
  MdAddHomeWork,
  MdNotifications,
} from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      name: "Floor Management",
      path: "/dashboard/add-floor",
      icon: <MdAddHomeWork />,
    },
    {
      name: "System Notifications",
      path: "/dashboard/notifications",
      icon: <MdNotifications />,
    },
  ];

  const getPageName = () => {
    if (location.pathname.includes("add-floor")) return "Add a floor";
    if (location.pathname.includes("notifications"))
      return "System Notifications";
    return "Overview";
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg p-6
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:h-full 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-2xl p-2 rounded-md bg-gray-100"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium mt-10 md:mt-0">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/dashboard" &&
                location.pathname === "/dashboard");

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#3B82F6] text-white"
                    : "hover:bg-[#3B82F6] hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
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

        <div className="mb-4 text-sm text-gray-500">
          Dashboard / <span className="font-medium text-gray-800">{getPageName()}</span>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
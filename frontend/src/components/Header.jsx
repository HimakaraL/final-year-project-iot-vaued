import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdNotifications } from "react-icons/md";
import { generateNotifications } from "../utils/generateNotifications";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/backend/floors");
        const floors = await res.json();

        const enriched = await Promise.all(
          (Array.isArray(floors) ? floors : []).map(async (floor) => {
            try {
              const sensorRes = await fetch(
                `/backend/sensor/floor/${floor._id}`
              );
              const data = await sensorRes.json();

              return {
                ...floor,
                latest: Array.isArray(data)
                  ? data[data.length - 1]
                  : null,
              };
            } catch {
              return { ...floor, latest: null };
            }
          })
        );

        setNotifications(generateNotifications(enriched));
      } catch (err) {
        console.error("Header notifications error:", err);
        setNotifications([]);
      }
    };

    if (currentUser) {
      load();
    }
  }, [currentUser]);

  // close click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

        <Link to="/">
          <h1 className="text-xl font-bold text-[#1E3A8A]">
            MediCare<span className="text-[#3B82F6]">+</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6 text-gray-600 font-medium">

          <Link to="/" className="hover:text-[#1E3A8A] transition">
            Home
          </Link>

          {currentUser && (
            <Link to="/dashboard" className="hover:text-[#1E3A8A] transition">
              Dashboard
            </Link>
          )}

          {currentUser && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:text-[#1E3A8A]"
              >
                <MdNotifications className="text-2xl" />

                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl z-50 p-4 border">

                  <h3 className="font-semibold text-[#1E3A8A] mb-3">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No alerts at the moment
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {notifications.slice(0, 5).map((n, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg text-sm ${
                            n.type === "danger"
                              ? "bg-red-50 text-red-600"
                              : n.type === "warning"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <p className="font-medium">{n.title}</p>
                          <p className="text-xs">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>
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
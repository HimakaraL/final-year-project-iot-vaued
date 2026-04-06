import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between flex-row p-3">
        <div>
          <Link to="/">
            <h1 className="font-extrabold">MERN CRUD</h1>
          </Link>
        </div>
        <div className="flex justify-between gap-3">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.userDetails.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <p>Login</p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

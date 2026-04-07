import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formdata, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Clear error on page load
  useEffect(() => {
    dispatch(loginFailure(null));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });

    // ✅ Clear error when typing
    if (error) {
      dispatch(loginFailure(null));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(loginStart());

    try {
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        dispatch(loginFailure("Invalid server response"));
        return;
      }

      if (!res.ok) {
        dispatch(loginFailure(data.message || "Login failed"));
        return;
      }

      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.message || "Network error"));
      console.error(err);
    }
  };

  // return (
  //   <div className="flex justify-center items-center flex-col gap-12 p-6">
  //     <div>
  //       <h1 className="text-xl font-extrabold">Log In</h1>
  //     </div>

  //     <div className="flex flex-col justify-center items-center">
  //       <input
  //         id="email"
  //         type="email"
  //         placeholder="Email"
  //         className="rounded-lg bg-slate-300 p-2 m-1 w-60"
  //         onChange={handleChange}
  //       />

  //       <input
  //         id="password"
  //         type="password"
  //         placeholder="Password"
  //         className="rounded-lg bg-slate-300 p-2 m-1 w-60"
  //         onChange={handleChange}
  //       />

  //       <button
  //         disabled={loading}
  //         className="bg-green-400 m-3 p-2 rounded-md w-60 hover:opacity-70"
  //         onClick={handleSubmit}
  //       >
  //         {loading ? "Loading..." : "Log In"}
  //       </button>

  //       {/* <OAuth /> */}

  //       {/* <p className="text-xs">
  //         <Link to="/signup">
  //           Don&apos;t have an account?{" "}
  //           <span className="text-blue-500">Sign up</span>
  //         </Link>
  //       </p> */}
  //     </div>

  //     {/* ✅ Show error ONLY after submit */}
  //     {submitted && error && (
  //       <p className="text-red-600">
  //         {typeof error === "string"
  //           ? error
  //           : error?.message || "Something went wrong"}
  //       </p>
  //     )}
  //   </div>
  // );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center text-[#1E3A8A] mb-6">
          Welcome Back
        </h1>

        <div className="flex flex-col gap-4">

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#3B82F6]"
            onChange={handleChange}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#3B82F6]"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-[#1E3A8A] text-white p-3 rounded-lg font-semibold hover:bg-[#3B82F6] transition"
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </div>

        {submitted && error && (
          <p className="text-red-500 text-center mt-4">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </p>
        )}
      </div>
    </div>
  );
}
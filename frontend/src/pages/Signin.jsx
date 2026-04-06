import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formdata, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data));
        navigate("/");
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
      }
    } catch (error) {
      dispatch(loginFailure(error));
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-12 p-6">
      <div>
        <h1 className="text-xl font-extrabold">Log In</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          id="email"
          placeholder="Email"
          className="rounded-lg  bg-slate-300 p-1 m-1"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          placeholder="Password"
          className="rounded-lg  bg-slate-300 p-1 m-1"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-green-400 m-3 p-2 rounded-md w-60 hover:opacity-70"
          onClick={handleSubmit}
        >
          {loading ? "Loading.." : "Log In"}
        </button>
        <OAuth />
        <p className="text-xs">
          <Link to="/signup">
            Don&apos;t have an account?{" "}
            <span className="text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
      <p className="text-red-600">{error ? error.message || "Something went wrong" : ""}</p>
    </div>
  );
}

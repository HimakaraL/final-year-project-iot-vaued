import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formdata, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      setLoading(false);
      const data = res.json();
      if (data.success) {
        setError(true);
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-12 p-6">
      <div>
        <h1 className="text-xl font-extrabold">Sign Up</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          id="username"
          placeholder="Username"
          className="rounded-lg bg-slate-300 p-1 m-1"
          onChange={handleChange}
        ></input>
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
          {loading ? "Loading.." : "Sign Up"}
        </button>
        <OAuth />
        <p className="text-xs">
          <Link to="/signin">
            Already have an account?{" "}
            <span className="text-blue-500">Sign in</span>
          </Link>
        </p>
      </div>
      <p className="text-red-600">{error && "Something went wrong"}</p>
    </div>
  );
}

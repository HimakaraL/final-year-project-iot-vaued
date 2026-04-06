import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("/backend/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });

      const data = await response.json();
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Error occured while login with Google", error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-red-700 p-2 mb-2 text-white rounded-lg hover:opacity-80"
      >
        Continue with Google
      </button>
    </div>
  );
}

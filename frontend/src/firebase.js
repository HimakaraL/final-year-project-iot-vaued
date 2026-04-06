// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-18a5e.firebaseapp.com",
  projectId: "mern-auth-18a5e",
  storageBucket: "mern-auth-18a5e.firebasestorage.app",
  messagingSenderId: "625056635498",
  appId: "1:625056635498:web:90520ee072109cbd3d0813"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
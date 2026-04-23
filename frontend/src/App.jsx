import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import FloorInfo from "./pages/FloorInfo";
const Overview = lazy(() => import("./pages/Overview"));
const AddFloor = lazy(() => import("./pages/Floor"));

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* Suspense wrapper */}
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="add-floor" element={<AddFloor />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/floor/:id" element={<FloorInfo />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

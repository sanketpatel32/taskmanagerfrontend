import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [backendUp, setBackendUp] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  // Ping backend on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_BASE}/health`);
        setBackendUp(true);
      } catch {
        setBackendUp(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000); // recheck every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow px-6 py-4 flex justify-between items-center z-50">

      <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <Link to="/">Task Manager</Link>
        {/* Backend status dot */}
        <span
          className={`w-3 h-3 rounded-full ${
            backendUp ? "bg-green-500" : "bg-red-500"
          }`}
          title={backendUp ? "Backend online" : "Backend offline"}
        />
      </h1>
      <nav className="space-x-4">
        {token ? (
          <>
            <Link to="/tasks" className="text-gray-700 hover:text-blue-600">
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-gray-700 hover:text-blue-600">
              Sign In
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

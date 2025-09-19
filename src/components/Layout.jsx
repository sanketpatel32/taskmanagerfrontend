// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-16 px-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

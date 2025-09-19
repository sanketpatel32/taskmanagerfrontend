
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">
      {/* Emoji + Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600">
        🚀 Welcome to <span className="text-gray-800">Task Manager</span>
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
        Stay organized and boost productivity.  
        Create, track, and manage your tasks in one sleek interface.
      </p>

      {/* Call to action */}
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/signin"
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Sign In
        </Link>
      </div>

      {/* Fancy footer note */}
      <p className="text-sm text-gray-400 mt-8">
        Built with ❤️ using React, Tailwind, and Node.js
      </p>
    </section>
  );
}

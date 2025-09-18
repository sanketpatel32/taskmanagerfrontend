import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TaskList from "./pages/TaskList";
import TaskEditor from "./pages/TaskEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar (fixed at top) */}
      <Navbar />

      {/* Main content (scrollable, with padding to avoid overlap) */}
      <main className="flex-1 pt-16 px-6 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={<p className="text-lg">Welcome to your Task Manager 🚀</p>}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <TaskEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id/edit"
            element={
              <ProtectedRoute>
                <TaskEditor />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<h3 className="text-red-600">404 – Page not found</h3>}
          />
        </Routes>
      </main>
    </div>
  );
}

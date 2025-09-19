import React, { useRef, useState } from "react";
import { signin, saveToken } from "../api";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import AuthLayout from "../components/AuthLayout";

export default function SignIn() {
  const navigate = useNavigate();

  // --- useRef for form fields ---
  // Instead of keeping input values in state, we just read them on submit
  const emailRef = useRef();
  const passwordRef = useRef();

  // --- State for UI feedback ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Grab current values directly from refs
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Call backend API to sign in
      const res = await signin(email, password);

      // Save JWT token to localStorage
      await saveToken(res.token);

      // Redirect to task list
      navigate("/tasks", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Invalid login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign In">
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input (using ref) */}
        <FormInput
          label="Email"
          type="email"
          name="email"
          inputRef={emailRef} // ✅ pass ref to custom FormInput
          placeholder="you@example.com"
          required
        />

        {/* Password input (using ref) */}
        <FormInput
          label="Password"
          type="password"
          name="password"
          inputRef={passwordRef} // ✅ pass ref to custom FormInput
          placeholder="Your password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthLayout>
  );
}

import React, { useRef, useState } from "react";
import { signup, saveToken } from "../api";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import AuthLayout from "../components/AuthLayout";

export default function SignUp() {
  const navigate = useNavigate();

  // --- useRef for inputs ---
  const emailRef = useRef();
  const passwordRef = useRef();

  // --- UI states ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Read values from refs
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Call backend API to create new user
      const res = await signup(email, password);

      // Save token in localStorage
      await saveToken(res.token);

      // Redirect to tasks page after success
      navigate("/tasks", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input with ref */}
        <FormInput
          label="Email"
          type="email"
          name="email"
          inputRef={emailRef}
          placeholder="you@example.com"
          required
        />

        {/* Password input with ref */}
        <FormInput
          label="Password"
          type="password"
          name="password"
          inputRef={passwordRef}
          placeholder="At least 6 characters"
          required
          minLength={6}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </AuthLayout>
  );
}

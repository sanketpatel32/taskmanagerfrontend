import React, { useState } from "react";
import { signin, saveToken } from "../api";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import AuthLayout from "../components/AuthLayout";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signin(form.email, form.password);
      await saveToken(res.token);
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
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
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

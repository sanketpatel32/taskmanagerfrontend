import React from "react";

export default function AuthLayout({ title, children }) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
}

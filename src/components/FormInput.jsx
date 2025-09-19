// src/components/FormInput.jsx
import React, { forwardRef } from "react";

const FormInput = forwardRef(({ label, type, name, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        ref={ref} // ✅ forward the ref correctly
        type={type}
        name={name}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        {...props}
      />
    </div>
  );
});

export default FormInput;

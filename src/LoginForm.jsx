import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from "axios";
;

export function LoginForm({ onLoginSuccess }) {
  // ⛔ removed TypeScript type annotation
  const [role, setRole] = useState('END_USER');

  // ⛔ fixed incorrect TS event typing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      const role = response.data.user.role;

      console.log("set ", role);
      onLoginSuccess(role);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-80">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />

      {/* Role Selection */}
      <select
        className="w-full p-2 border rounded"
        value={role}
        // ⛔ removed "as any"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="END_USER">End User</option>
        <option value="VENDOR">Vendor</option>
        <option value="PICKUP_ASSISTANT">Pickup Assistant</option>
      </select>

      <button
        type="submit"
        // ⛔ fixed hover class syntax
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Login / Register
      </button>
    </form>
  );
}

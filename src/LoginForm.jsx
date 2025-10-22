import PropTypes from 'prop-types';
import { useState } from 'react';

;

export function LoginForm({ onLoginSuccess }) {
  const [role, setRole] = useState<'user' | 'vendor' | 'assistant'>('user');

  const handleSubmit = (e.FormEvent) => {
    e.preventDefault();
    // ✅ Here you would call your backend login API
    onLoginSuccess(role);
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
        onChange={(e) => setRole(e.target.value as any)}
      >
        <option value="user">End User</option>
        <option value="vendor">Vendor</option>
        <option value="assistant">Pickup Assistant</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover-green-700"
      >
        Login / Register
      </button>
    </form>
  );
}

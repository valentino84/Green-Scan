import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import axios from "axios";

export function RegisterForm({ onRegisterSuccess, onGoToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "END_USER",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ API request using axios
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        formData
      );

      console.log("✅ Registration success:", response.data);

      // ✅ Store userId in localStorage
      const userId = response.data.user.id; // Make sure your API returns userId
      console.log("✅ Storing userId in localStorage:", userId);
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", response.data.accessToken);

      // Trigger success callback (e.g. navigate to next step)
      onRegisterSuccess(formData.role, formData.email, userId);
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-80">
      <div className="text-center mb-6">
        <h2 className="text-green-800 dark:text-green-200 mb-2">
          Create Account
        </h2>
        <p className="text-green-600 dark:text-green-400 text-sm">
          Join the green revolution today
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Name */}
        <motion.input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        {/* Email */}
        <motion.input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        {/* Password */}
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          required
          minLength={6}
        />

        {/* Confirm Password */}
        <motion.input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          required
          minLength={6}
        />

        {/* Mobile */}
        <motion.input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          required
          pattern="[0-9]{10}"
        />

        {/* Role Selection */}
        <motion.select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option value="END_USER">End User - Recycle & Earn</option>
          <option value="VENDOR">Vendor - Pickup Service</option>
          <option value="ADMIN">Admin - Platform Management</option>
          <option value="PICKUP_ASSISTANT">Pickup Assistant</option>
          <option value="ADS_COMPANY">
            Advertisement Company - Campaign Management
          </option>
        </motion.select>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? "Creating Account..." : "Create Account & Start Recycling"}
        </motion.button>
      </motion.form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onGoToLogin}
            className="text-green-600 hover:text-green-700 underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  onRegisterSuccess: PropTypes.func,
  onGoToLogin: PropTypes.func,
};

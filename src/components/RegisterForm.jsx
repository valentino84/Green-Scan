import { useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

export function RegisterForm({ onRegisterSuccess, onGoToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically make an API call to register the user
    // For now, we'll simulate a successful registration
    console.log('Registering user:', formData);

    // Automatically login after successful registration
    onRegisterSuccess(formData.role);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-80">
      <div className="text-center mb-6">
        <h2 className="text-green-800 dark:text-green-200 mb-2">Create Account</h2>
        <p className="text-green-600 dark:text-green-400 text-sm">Join the green revolution today</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        />

        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileFocus={{ scale: 1.05 }}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        />

        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileFocus={{ scale: 1.05 }}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
          minLength={6}
        />

        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileFocus={{ scale: 1.05 }}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
          minLength={6}
        />

        {/* Role Selection */}
        <motion.select
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileFocus={{ scale: 1.05 }}
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="user">End User - Recycle & Earn</option>
          <option value="vendor">Vendor - Pickup Service</option>
          <option value="admin">Admin - Platform Management</option>
          <option value="assistant">Assistant - Pickup Helper</option>
          <option value="advertisement">Advertisement Company - Campaign Management</option>
        </motion.select>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full bg-green-600 dark:bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Creating Account...
            </motion.span>
          ) : (
            'Create Account & Start Recycling'
          )}
        </motion.button>
      </motion.form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onGoToLogin}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

RegisterForm.propTypes = { onGoToLogin: PropTypes.any, onRegisterSuccess: PropTypes.any };

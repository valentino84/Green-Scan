import { useState } from 'react';
import { motion } from 'motion/react';
import axios from "axios";
import { useContext } from "react";
import { useTheme } from './ThemeProvider';


export function LoginForm({ onLoginSuccess, onGoToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useTheme();


  // Email to role mapping
  // const emailRoleMapping = {
  //   'enduser@123': 'user',
  //   'admin@123': 'admin',
  //   'vendor@123': 'vendor',
  //   'assistant@123': 'assistant',
  //   'advertisement@123': 'advertisement'
  // };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call for login validation
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // if (formData.email && formData.password) {
    //   // Check if email exists in our mapping
    //   const userRole = emailRoleMapping[formData.email];

    //   if (userRole) {
    //     console.log('Logging in user:', { ...formData, role: userRole });
    //     onLoginSuccess(userRole);
    //   } else {
    //     setError('Invalid email address. Please use one of the registered emails.');
    //   }
    // } else {
    //   setError('Please enter both email and password');
    // }

    // setIsLoading(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login success:", response.data);

      // Use AuthContext to save user globally
      const userId = response.data.user.id;
      const accessToken = response.data.accessToken;
      const role = response.data.user.role;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", accessToken);

      login({ userId, accessToken, role }); // <-- here

      // Optional: navigate or trigger callback
      onLoginSuccess(role);

    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }


  };

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="mx-auto w-80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6"
      >
        <h2 className="text-green-800 dark:text-green-200 mb-2">Sign In</h2>
        <p className="text-green-600 dark:text-green-400 text-sm">Welcome back, eco-warrior!</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.input
          variants={inputVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
          whileFocus={{ scale: 1.02 }}
        />

        <motion.input
          variants={inputVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
          whileFocus={{ scale: 1.02 }}
        />

        {/* Demo Account Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <p className="text-xs text-green-700 dark:text-green-300 mb-2">Demo Accounts:</p>
          <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
            <div>• <span className="font-mono">enduser@123</span> - End User Dashboard</div>
            <div>• <span className="font-mono">vendor@123</span> - Vendor Dashboard</div>
            <div>• <span className="font-mono">admin@123</span> - Admin Dashboard</div>
            <div>• <span className="font-mono">assistant@123</span> - Assistant Dashboard</div>
            <div>• <span className="font-mono">advertisement@123</span> - Advertisement Dashboard</div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="w-full bg-green-600 dark:bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-center"
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
              Signing In...
            </motion.span>
          ) : (
            'Sign In to Dashboard'
          )}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <motion.button
            onClick={onGoToRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors underline"
          >
            Create Account
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
}

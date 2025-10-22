import { motion } from 'motion/react';
import logoImage from '../assets/logo.png';

export function Logo({ size = 'medium', showText = true, animated = true, className = '' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={logoImage}
        alt="GreenScan Logo"
        className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-semibold text-green-800 dark:text-green-200`}>
            GreenScan
          </span>
          {size !== 'small' && (
            <span className="text-xs text-green-600 dark:text-green-400">
              AI-Powered Recycling
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {logoContent}
      </motion.div>
    );
  }

  return logoContent;
}

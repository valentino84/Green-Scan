import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ThemeToggle } from "./ThemeToggle";
import {
  ChevronLeft,
  ChevronRight,
  Coins,
  MapPin,
  Leaf,
  User,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import PropTypes from 'prop-types';

const onboardingSlides = [
  {
    id: 1,
    title: "Recycle & Earn Coins",
    description:
      "Turn your recyclables into valuable GreenCoins. Every item you recycle helps you earn rewards while saving the planet.",
    image:
      "https://images.unsplash.com/photo-1678699255640-a1b75cec7718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    icon: <Coins className="w-12 h-12 text-green-600" />,
  },
  {
    id: 2,
    title: "Track Vendors Easily",
    description:
      "Find and track pickup vendors in real-time. Schedule convenient pickups and monitor your recycling journey.",
    image:
      "https://images.unsplash.com/photo-1625217527288-93919c99650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    icon: <MapPin className="w-12 h-12 text-green-600" />,
  },
  {
    id: 3,
    title: "Save the Planet with GreenCoins",
    description:
      "Use your GreenCoins for donations, rewards, or eco-friendly purchases. Make a positive impact with every transaction.",
    image:
      "https://images.unsplash.com/photo-1647272637101-246cbcea1919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    icon: <Leaf className="w-12 h-12 text-green-600" />,
  },
];

export function OnboardingCarousel({ onComplete, role }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = onboardingSlides[currentSlide];

  return (
    <div className="w-full max-w-md mx-auto h-full flex flex-col relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 dark:border-green-700 shadow-lg">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6"
                >
                  {/* Image */}
                  <motion.div
                    className="relative h-48 w-full rounded-lg overflow-hidden bg-green-50 dark:bg-green-900"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <ImageWithFallback
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-900/20"></div>
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                    >
                      {currentSlideData.icon}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-green-800 dark:text-green-200">
                      {currentSlideData.title}
                    </h2>
                    <p className="text-green-600 dark:text-green-400 text-sm leading-relaxed">
                      {currentSlideData.description}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="p-6 space-y-4">
        {/* Dots indicator */}
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {onboardingSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentSlide
                  ? "bg-green-600 dark:bg-green-500"
                  : "bg-green-200 dark:bg-green-800"
                }`}
            />
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="ghost"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 disabled:opacity-50 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={nextSlide}
              className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 flex items-center transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {currentSlide === onboardingSlides.length - 1 ? (
                <>
                  {role ? (
                    <>
                      {role === "user" && "Go to Dashboard"}
                      {role === "vendor" && "Vendor Panel"}
                      {role === "admin" && "Admin Panel"}
                      {role === "assistant" && "Assistant Panel"}
                    </>
                  ) : (
                    "Get Started"
                  )}
                </>
              ) : (
                <>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Skip button */}
        {currentSlide < onboardingSlides.length - 1 && (
          <div className="text-center">
            <button
              onClick={onComplete}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline"
            >
              Skip onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

OnboardingCarousel.propTypes = { onComplete: PropTypes.any, role: PropTypes.any };

import { motion } from "framer-motion";
import { useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete && onComplete();
    }, 1000); // ✅ 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">

      {/* Logo Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "0.1em" }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-bold mb-10"
      >
        kavanal
      </motion.h1>

      {/* Loading Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-light-primary dark:bg-dark-primary"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
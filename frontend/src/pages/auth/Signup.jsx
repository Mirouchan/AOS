import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../../assets/img/login/img1.jpg";
import img2 from "../../assets/img/login/img2.jpg";
import img3 from "../../assets/img/login/img3.jpg";
import img4 from "../../assets/img/login/img4.jpg";
import img5 from "../../assets/img/login/img5.jpg";

const images = [img1, img2, img3, img4, img5];

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0); // ✅ FIX: missing state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await API.post("/auth/register/", formData);

    // Get current user after registration
    await API.post("/auth/register/", formData);
    navigate("/user");

    if (user.is_admin) {
      navigate("/admin");
    } else {
      navigate("/user");
    }

  } catch (err) {
    console.error(err);
    setError("Signup failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // ✅ Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#1e293b] to-[#0f172a] px-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl flex bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >

        {/* FORM (LEFT) */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
              />
              <input
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
              />
            </div>

            <input
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-light-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-light-primary text-black font-semibold hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
            {error && (
  <div className="text-red-400 text-sm text-center mt-3">
    {error}
  </div>
)}
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-light-primary hover:underline">
              Login
            </Link>
          </p>
        </motion.div>

        {/* IMAGE PANEL (RIGHT) */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex w-1/2 relative overflow-hidden"
        >
          {/* Image slider */}
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]} // ✅ FIX
              src={images[index]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

          {/* Overlay */}
         <div className="absolute inset-0 bg-yellow-300/15 backdrop-blur-[2px] rounded-3xl overflow-hidden">
  
  {/* Decorative gradient glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-black opacity-60 blur-2xl"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-center p-10 text-black">
    
    {/* Title */}
    <h2 className="text-4xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
      Join KAVANAL
    </h2>

    {/* Subtitle */}
    <p className="text-sm md:text-base opacity-90 max-w-xs leading-relaxed border-l-4 border-yellow-500 pl-4">
      Start your adventure and explore the world with a seamless experience.
    </p>

    {/* Badge */}
    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 backdrop-blur-md border border-black/20 w-fit">
      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
      <span className="text-xs uppercase tracking-widest">Get Started</span>
    </div>

  </div>
</div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Signup;
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

// ✅ same images as Signup
import img1 from "../../assets/img/login/img1.jpg";
import img2 from "../../assets/img/login/img2.jpg";
import img3 from "../../assets/img/login/img3.jpg";
import img4 from "../../assets/img/login/img4.jpg";
import img5 from "../../assets/img/login/img5.jpg";

const images = [img1, img2, img3, img4, img5];

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

 const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0); // ✅ slider index

  const { login } = useContext(AuthContext);
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
  await login(formData);
  const res = await API.get("/auth/me/");
  const user = res.data;

  if (user.is_admin) navigate("/admin");
  else navigate("/user");

} catch (err) {
  setError("Invalid username or password");
} finally {
      setLoading(false);
    }
  };

  // ✅ image slider effect (same as Signup)
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

        {/* IMAGE PANEL (LEFT) */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex w-1/2 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]} // ✅ dynamic slider
              src={images[index]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

          {/* Overlay (same style as Signup) */}
          <div className="absolute inset-0 bg-yellow-300/15 backdrop-blur-[2px]" />

          <div className="relative z-10 flex flex-col justify-center p-10 text-white">
  
  {/* Decorative background glow */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-400/20 via-transparent to-black rounded-3xl blur-2xl"></div>

  {/* Title */}
  <h2 className="text-4xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
    KAVANAL
  </h2>

  {/* Subtitle */}
  <p className="text-sm md:text-base opacity-90 max-w-xs leading-relaxed border-l-4 border-yellow-400 pl-4">
    Explore adventures and manage your journey with a smooth, modern experience.
  </p>

  {/* Decorative badge */}
  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
    <span className="text-xs uppercase tracking-widest">Adventure Mode</span>
  </div>
</div>
        </motion.div>

        {/* FORM (RIGHT) */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-light-primary transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-light-primary transition"
            />

            <button
  type="submit"
  disabled={loading}
  className="w-full py-3 rounded-lg bg-light-primary text-black font-semibold hover:opacity-90 transition"
>
  {loading ? "Logging in..." : "Login"}
</button>

{/* ✅ ERROR MESSAGE HERE */}
{error && (
  <div className="text-red-400 text-sm text-center mt-3">
    {error}
  </div>
)}
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-light-primary hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Login;
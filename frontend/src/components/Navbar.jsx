import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/img/logo/img.png";
import API from "../services/api";
import UserProfileCard from "../components/user/UserProfileCard";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me/");
        setUser(res.data);
      } catch (err) {
        console.log("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-md bg-light-background/80 dark:bg-dark-background/80 shadow-md text-light-text dark:text-dark-text">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center text-2xl font-bold">
            <span className="text-light-primary dark:text-dark-primary">Kav</span>
            <img src={logo} alt="logo" className="h-6 mx-1" />
            <span>nal</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            <a className="hover:text-light-primary dark:hover:text-dark-primary transition">Home</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary transition">Features</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary transition">Pricing</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary transition">Contact</a>

            <ThemeToggle />

            {/* PROFILE BUTTON */}
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg
              hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 transition"
            >
              <FiUser />
              Profile
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4
          bg-light-background dark:bg-dark-background shadow-lg">

            <a className="hover:text-light-primary dark:hover:text-dark-primary">Home</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary">Features</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary">Pricing</a>
            <a className="hover:text-light-primary dark:hover:text-dark-primary">Contact</a>

            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2"
            >
              <FiUser />
              Profile
            </button>
          </div>
        )}
      </nav>

      {/* PROFILE MODAL */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          {/* BACKDROP */}
          <div
            className="absolute inset-0"
            onClick={() => setProfileOpen(false)}
          />

          {/* CARD */}
          <div className="relative z-10">
            <UserProfileCard user={user} setUser={setUser} />

            {/* CLOSE */}
            <button
              onClick={() => setProfileOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full
              bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
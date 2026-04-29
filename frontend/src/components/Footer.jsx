import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-auto relative bg-light-background dark:bg-dark-background border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">

      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-light-primary dark:bg-dark-primary blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-wider text-light-text dark:text-dark-text">
              Kavanal
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              A modern platform designed with simplicity, performance, and clean UI in mind.
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 text-sm font-medium">
            <a href="#" className="relative group text-gray-500 dark:text-gray-400">
              Privacy
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-light-primary dark:bg-dark-primary group-hover:w-full transition-all"></span>
            </a>

            <a href="#" className="relative group text-gray-500 dark:text-gray-400">
              Terms
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-light-primary dark:bg-dark-primary group-hover:w-full transition-all"></span>
            </a>

            <a href="#" className="relative group text-gray-500 dark:text-gray-400">
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-light-primary dark:bg-dark-primary group-hover:w-full transition-all"></span>
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-4">

            <a
              href="https://www.facebook.com/share/1Dg2sYTGiv/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:scale-110 hover:border-blue-500 transition"
            >
              <FaFacebookF className="text-blue-500" />
            </a>

            <a
              href="https://www.instagram.com/_kavanal?igsh=MWZ2YWprNWl5N3JjMw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:scale-110 hover:border-pink-500 transition"
            >
              <FaInstagram className="text-pink-500" />
            </a>

            <a
              href="https://www.tiktok.com/@_kavanal?_r=1&_t=ZS-95LFyVkrYBA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:scale-110 hover:border-white transition"
            >
              <FaTiktok className="text-black dark:text-white" />
            </a>

          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
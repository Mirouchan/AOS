import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"; // ✅ import Footer
import Button from "../../components/Button";
import img2 from "../../assets/img/background/img2.jpg";

const Dashboard = () => {
  const texts = [
    "Manage your projects",
    "Organize your workflow",
    "Collaborate with your team",
    "Build something amazing",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img2})` }}
    >
      {/* Dark + Yellow Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-yellow-400/5" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        {/* Center Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest mb-6">
            KAVANAL
          </h1>

          {/* Animated Subtitle */}
          <p className="text-lg md:text-2xl opacity-90 transition-all duration-500">
            {texts[index]}
          </p>

          {/* Button */}
          <div className="mt-8">
            <Button onClick={() => alert("Button clicked!")}>
              Get Started
            </Button>
          </div>
        </div>

        {/* Footer at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
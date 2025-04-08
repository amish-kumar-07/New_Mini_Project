import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 relative">
        <section className="relative flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 h-[80vh] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
            >
              Explore Spiritual Teachings
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg md:text-xl"
            >
              Discover mindfulness, meditation, and spiritual growth through curated teachings.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={() => navigate("/teachings")}
              className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold text-base md:text-lg rounded-lg shadow-lg hover:bg-indigo-100 transition"
            >
              Start Learning
            </motion.button>
          </div>
        </section>

        <HeroSection />
        <Footer />

        {/* Button to open Bhagavad Gita Bot */}
        <button 
          onClick={() => navigate("/gita-bot")} 
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Open Bhagavad Gita Bot
        </button>
      </div>
    </>
  );
}

import { motion } from "framer-motion";
import { Button } from "../Part/Button.jsx";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaUsers, FaYinYang, FaScroll } from "react-icons/fa";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[url('/images/bg-pattern.png')] bg-cover bg-center p-6">
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full max-w-6xl text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold text-gray-800"
            >
              Stretch Your Body, Calm Your Mind
            </motion.h1>
            <p className="text-gray-700 mt-4 text-base md:text-lg">
              Discover the path to inner peace through mindful practices and teachings.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaLeaf size={20} /> <span>Healing Practices</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUsers size={20} /> <span>Community Support</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaYinYang size={20} /> <span>Spiritual Growth</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaScroll size={20} /> <span>Guided Learnings</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              type="button"
              onClick={() => navigate("/contact")}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Book Appointment
            </Button>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center">
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-03.jpg"
              alt="Woman meditating outdoors"
              className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full shadow-lg border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-01.jpg"
              alt="Yoga group practicing in a hall"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-lg absolute bottom-0 left-0 border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-02.jpg"
              alt="Rolled-up yoga mat on wooden floor"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-lg absolute top-0 right-0 border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

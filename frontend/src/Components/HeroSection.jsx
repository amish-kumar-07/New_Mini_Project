import { motion } from "framer-motion";
import { Button } from "../Part/Button.jsx";
 // Use named import
import { FaLeaf, FaUsers, FaYinYang, FaScroll } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[url('/images/bg-pattern.png')] bg-cover bg-center p-6">
      <div className="max-w-6xl text-center">
        <div className="grid grid-cols-2 gap-6 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gray-800"
            >
              Stretch Your Body, Calm Your Mind
            </motion.h1>
            <p className="text-gray-600 mt-4">
              Discover the path to inner peace through mindful practices and teachings.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
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
            <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
              Book Appointment
            </Button>
          </div>
          <div className="relative">
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-03.jpg"
              alt="Meditation"
              className="w-96 h-96 object-cover rounded-full shadow-lg border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-01.jpg"
              alt="Yoga Group"
              className="w-32 h-32 object-cover rounded-full shadow-lg absolute bottom-0 left-0 border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-02.jpg"
              alt="Yoga Mat"
              className="w-32 h-32 object-cover rounded-full shadow-lg absolute top-0 right-0 border-4 border-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function QuizPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        {/* Hero Section */}
        <section className="flex items-center justify-center text-center bg-gradient-to-r from-green-500 to-blue-600 h-[80vh] text-white px-4 sm:px-6">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-bold"
            >
              Test Your Spiritual Knowledge
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg"
            >
              Take a short quiz to reflect on what you've learned and grow further.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                href="https://forms.gle/LwiNkNsimADbzYyEA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-green-700 font-semibold text-lg rounded-lg shadow-lg hover:bg-green-100 transition"
              >
                Bhagavad Gita Quiz - 1
              </motion.a>

              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                href="https://forms.gle/vq9euxyAFnGkupnFA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-700 font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-100 transition"
              >
                Bhagavad Gita Quiz - 2
              </motion.a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Floating Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Back to Dashboard"
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
}

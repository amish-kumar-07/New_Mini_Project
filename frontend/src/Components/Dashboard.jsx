import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Stopwatch from "./Stopwatch";

const teachings = [
  {
    category: "Mindfulness",
    items: [
      { 
        title: "Guided Meditation", 
        video: "https://www.youtube.com/embed/inpok4MKVLM", 
        description: "A short guided meditation session for relaxation.",
        link: "https://www.youtube.com/watch?v=inpok4MKVLM"
      },
      { 
        title: "Breathing Techniques", 
        video: "https://www.youtube.com/embed/wim-hG-7G60", 
        description: "Learn breathing exercises to calm your mind.",
        link: "https://www.youtube.com/watch?v=wim-hG-7G60"
      }
    ]
  },
  {
    category: "Spiritual Growth",
    items: [
      { 
        title: "Self-Realization", 
        video: "https://www.youtube.com/embed/OuJ_KU47ylM", 
        description: "Discover the journey of self-awareness and enlightenment.",
        link: "https://www.youtube.com/watch?v=OuJ_KU47ylM"
      },
      { 
        title: "Gratitude Practice", 
        video: "https://www.youtube.com/embed/T5Umo80x9og", 
        description: "Learn how gratitude can change your life.",
        link: "https://www.youtube.com/watch?v=T5Umo80x9og"
      }
    ]
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const handleTitleClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
    <Navbar/>
    <Stopwatch />
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 h-[80vh] text-white px-6">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold"
          >
            Explore Spiritual Teachings
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-lg"
          >
            Discover mindfulness, meditation, and spiritual growth through curated teachings.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => navigate("/teachings")}
            className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-indigo-100 transition"
          >
            Start Learning
          </motion.button>
        </div>
      </section>

      {/* Teachings Section */}
      <div className="mt-10">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 p-6">
              <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">Teachings with Videos</h2>
              {teachings.map((section, index) => (
                <div key={index} className="w-full max-w-5xl mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.items.map((teaching, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
                      >
                        {/* Embedded Video */}
                        <iframe 
                          width="100%" 
                          height="250" 
                          src={teaching.video} 
                          title={teaching.title} 
                          allowFullScreen
                          className="rounded-lg mb-4"
                        ></iframe>
                        
                        {/* Clickable Title */}
                        <h4 
                          className="text-xl font-semibold text-indigo-600 cursor-pointer hover:underline"
                          onClick={() => handleTitleClick(teaching.link)}
                        >
                          {teaching.title}
                        </h4>
                        
                        <p className="text-gray-600 mt-2">{teaching.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        <HeroSection/>
        <Footer/>
      </div>
    </div>
    </>
  );
}

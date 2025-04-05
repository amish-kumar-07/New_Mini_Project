import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";

const teachings = [
  {
    category: "Bhagavad Gita Chapters",
    items: [
      { 
        title: "Chapter 1", 
        video: "https://youtu.be/2prTVKO5XF8?si=DJgE4nmfD1MRd4mx", 
        description: "Bhagavad Gita Chapter 1: Observing the Armies on the Battlefield of Kurukshetra",
        link: "https://youtu.be/2prTVKO5XF8?si=DJgE4nmfD1MRd4mx"
      },
      { 
        title: "Chapter 2", 
        video: "https://youtu.be/ApxWEH9SumE?si=MAk11IfsTrpXJeES", 
        description: "Bhagavad Gita Chapter 2: Contents of the Gita Summarized",
        link: "https://youtu.be/ApxWEH9SumE?si=MAk11IfsTrpXJeES"
      },
      { 
        title: "Chapter 3", 
        video: "https://youtu.be/ju8C9zvEZok?si=INQyMhkLnYSTNLP6", 
        description: "Karma-Yoga: The Path of Selfless Action",
        link: "https://youtu.be/ju8C9zvEZok?si=INQyMhkLnYSTNLP6"
      },
      { 
        title: "Chapter 4", 
        video: "https://youtu.be/MtXQrRzMH-w?si=r-so2Sn0iDJa0DJk", 
        description: "Bhagavad Gita Chapter 4: Transcendental Knowledge",
        link: "https://youtu.be/MtXQrRzMH-w?si=r-so2Sn0iDJa0DJk"
      },      
      { 
        title: "Chapter 5", 
        video: "https://youtu.be/KEu7Qkna9Hs?si=M3orOSL7TPAUb0s5", 
        description: "Bhagavad Gita Chapter 5: Karma-Yoga – Action in Kṛṣṇa Consciousness",
        link: "https://youtu.be/KEu7Qkna9Hs?si=M3orOSL7TPAUb0s5"
      },
      { 
        title: "Chapter 6", 
        video: "https://youtu.be/zifJAQhpPfc?si=0OEI-LVxL2gneXAh", 
        description: "Bhagavad Gita Chapter 6: Dhyāna-Yoga – The Path of Meditation(Part-1)",
        link: "https://youtu.be/zifJAQhpPfc?si=0OEI-LVxL2gneXAh"
      },
      { 
        title: "Chapter 7", 
        video: "https://youtu.be/Std8nlCzoYg?si=3rGjHdkZ4JXzaAv4", 
        description: "Bhagavad Gita Chapter 6: Dhyāna-Yoga – The Path of Meditation(Part-2)",
        link: "https://youtu.be/Std8nlCzoYg?si=3rGjHdkZ4JXzaAv4"
      },
      { 
        title: "Chapter 8", 
        video: "https://youtu.be/p8NwWQmKzTg?si=WvVbXgceGPFSsAR4", 
        description: "Bhagavad Gita Chapter 7: Knowledge of the Absolute",
        link: "https://youtu.be/p8NwWQmKzTg?si=WvVbXgceGPFSsAR4"
      },
    ]
  },
  {
    category: "Bhagavad Gita Chapters Audio Books",
    items: [
      {
        title: "Chapter 1 - Audio",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        description: "Audio narration of Bhagavad Gita Chapter 1",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        title: "Chapter 2 - Audio",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        description: "Audio narration of Bhagavad Gita Chapter 2",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      }
      // Add more audio entries here...
    ]
  }
];

export default function Video() {
  const handleTitleClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 p-6">
        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">Teachings with Videos & Audio</h2>
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
                  {/* Video or Audio */}
                  {teaching.video ? (
                    <iframe
                      width="100%"
                      height="250"
                      src={teaching.video}
                      title={teaching.title}
                      allowFullScreen
                      className="rounded-lg mb-4"
                    ></iframe>
                  ) : teaching.audio ? (
                    <audio controls className="w-full mb-4">
                      <source src={teaching.audio} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}

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
      <Footer />
    </>
  );
}

import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";


// Helper to convert youtu.be or watch?v= links to embed format
const getEmbedUrl = (url) => {
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

const teachings = [
  {
    category: "Bhagavad Gita Chapters",
    items: [
      {
        title: "Chapter 1",
        video: "https://youtu.be/2prTVKO5XF8",
        description: "Bhagavad Gita Chapter 1: Observing the Armies on the Battlefield of Kurukshetra",
        link: "https://youtu.be/2prTVKO5XF8"
      },
      {
        title: "Chapter 2",
        video: "https://youtu.be/ApxWEH9SumE",
        description: "Bhagavad Gita Chapter 2: Contents of the Gita Summarized",
        link: "https://youtu.be/ApxWEH9SumE"
      },
      {
        title: "Chapter 3",
        video: "https://youtu.be/ju8C9zvEZok",
        description: "Karma-Yoga: The Path of Selfless Action",
        link: "https://youtu.be/ju8C9zvEZok"
      },
      {
        title: "Chapter 4",
        video: "https://youtu.be/MtXQrRzMH-w",
        description: "Bhagavad Gita Chapter 4: Transcendental Knowledge",
        link: "https://youtu.be/MtXQrRzMH-w"
      },
      {
        title: "Chapter 5",
        video: "https://youtu.be/KEu7Qkna9Hs",
        description: "Bhagavad Gita Chapter 5: Karma-Yoga – Action in Kṛṣṇa Consciousness",
        link: "https://youtu.be/KEu7Qkna9Hs"
      },
      {
        title: "Chapter 6",
        video: "https://youtu.be/zifJAQhpPfc",
        description: "Bhagavad Gita Chapter 6: Dhyāna-Yoga – The Path of Meditation (Part-1)",
        link: "https://youtu.be/zifJAQhpPfc"
      },
      {
        title: "Chapter 7",
        video: "https://youtu.be/Std8nlCzoYg",
        description: "Bhagavad Gita Chapter 6: Dhyāna-Yoga – The Path of Meditation (Part-2)",
        link: "https://youtu.be/Std8nlCzoYg"
      },
      {
        title: "Chapter 8",
        video: "https://youtu.be/p8NwWQmKzTg",
        description: "Bhagavad Gita Chapter 7: Knowledge of the Absolute",
        link: "https://youtu.be/p8NwWQmKzTg"
      }
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
          <section key={index} className="w-full max-w-5xl mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((teaching, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
                >
                  {/* Embedded Video or Audio */}
                  {teaching.video ? (
                    <div className="relative w-full pb-[56.25%] mb-4">
                      <iframe
                        src={getEmbedUrl(teaching.video)}
                        title={teaching.title}
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : teaching.audio ? (
                    <audio controls className="w-full mb-4" aria-label={`${teaching.title} Audio`}>
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
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}

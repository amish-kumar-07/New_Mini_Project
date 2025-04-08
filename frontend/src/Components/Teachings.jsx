import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";

const teachings = [
  {
    category: "Smoking",
    items: [
      {
        title: "Quit Smoking",
        image:
          "https://www.verywellmind.com/thmb/aL3INLfR35li7v7Z-IYbx6HEo9M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1141358432-088ec597f8be4f3db1b0a966e346b840.jpg",
        description: "11 Ways to Relieve Insomnia When You Quit Smoking.",
        link: "https://www.verywellmind.com/ways-relieve-insomnia-when-quit-smoking-2824683",
      },
      {
        title: "7 Common Nicotine Withdrawal Symptoms",
        image:
          "https://www.verywellmind.com/thmb/FNpFf-JxD7h1-GFO9Fz7TtJaG6Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/common-signs-of-nicotine-withdrawal-2824763_final1-c2763ac2d7434c99ab8d1671c2b4bc48.png",
        description:
          "What happens in the body when someone stops or reduces their intake.",
        link: "https://www.verywellmind.com/common-signs-of-nicotine-withdrawal-2824763",
      },
    ],
  },
  {
    category: "Alcohol",
    items: [
      {
        title: "What “Hangxiety” Is and How to Avoid It",
        image:
          "https://www.verywellmind.com/thmb/u9Yn8HRSzgljCC4p1jBUaj0l5eo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1176414662-79c55597db7547bda00a51945672f36b.jpg",
        description:
          "Hangxiety is post-drinking anxiety caused by alcohol's chemical disruption of the brain. Avoid it by moderating intake, hydrating, and prioritizing sleep.",
        link: "https://www.verywellmind.com/what-is-hangxiety-and-how-to-avoid-it-7096207",
      },
      {
        title: "The Benefits of Quitting Alcohol",
        image:
          "https://www.verywellmind.com/thmb/ppMoPiutsFctV2CqGMQfNif0utI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1162831445-cb9b2e3fac2d40cfba9e52a2090b87be.jpg",
        description:
          "Quitting alcohol improves physical health, boosting energy and sleep, while also enhancing mental clarity and reducing anxiety.",
        link: "https://www.verywellmind.com/what-are-the-benefits-of-alcohol-recovery-67761",
      },
    ],
  },
];

export default function Teachings() {
  const handleTitleClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 p-6">
        <h2 className="text-3xl font-semibold text-indigo-700 text-center mb-10">Teachings</h2>

        {teachings.map((section, index) => (
          <div key={index} className="w-full max-w-6xl mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">{section.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {section.items.map((teaching, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl transition"
                >
                  <img
                    src={teaching.image}
                    alt={teaching.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h4
                    onClick={() => handleTitleClick(teaching.link)}
                    className="text-lg font-bold text-indigo-600 cursor-pointer hover:underline"
                  >
                    {teaching.title}
                  </h4>
                  <p className="text-gray-600 mt-2 text-sm">{teaching.description}</p>
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

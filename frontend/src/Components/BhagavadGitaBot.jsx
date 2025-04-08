import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";

export default function GitaBotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const extractChapterNumber = (text) => {
    const match = text.match(/chapter\s*(\d+)/i);
    return match ? match[1] : null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const chapterNumber = extractChapterNumber(input);

    if (!chapterNumber) {
      setMessages((prev) => [
        ...prev,
        { text: "Please specify a chapter number (e.g., 'Tell me about Chapter 2').", type: "bot" },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { text: `📖 Fetching summary for Chapter ${chapterNumber}...`, type: "bot" },
    ]);

    try {
      const response = await fetch(`http://localhost:3000/chapter/${chapterNumber}`);
      const data = await response.json();

      if (!data || data.error) {
        setMessages((prev) => [
          ...prev,
          { text: `❌ Sorry, I couldn't find a summary for Chapter ${chapterNumber}.`, type: "bot" },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { text: `📖 **${data.name} (${data.meaning})**\n\n${data.summary}`, type: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ There was an error fetching the data. Please try again later.", type: "bot" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 bg-gray-800 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        ⬅ Back to Dashboard
      </button>

      {/* Chatbot Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white shadow-lg rounded-lg flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-indigo-600 text-white px-4 py-3">
          <h2 className="text-base sm:text-lg font-semibold">Bhagavad Gita Bot</h2>
          <IoClose
            className="text-xl sm:text-2xl cursor-pointer hover:text-red-400 transition"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 h-[60vh] sm:h-[65vh] md:h-[70vh]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 text-sm sm:text-base max-w-[75%] rounded-lg shadow-sm break-words ${
                msg.type === "user"
                  ? "bg-blue-500 text-white self-end text-right ml-auto"
                  : "bg-gray-200 text-gray-800 self-start text-left mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="border-t flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-gray-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder='Ask about a chapter (e.g., "Tell me about Chapter 2")...'
          />
          <IoSend
            className="text-xl sm:text-2xl ml-2 sm:ml-3 text-indigo-500 cursor-pointer hover:text-indigo-700 transition"
            onClick={handleSend}
          />
        </div>
      </motion.div>
    </div>
  );
}

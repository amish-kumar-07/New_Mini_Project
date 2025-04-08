import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

export default function GitaBotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
        { text: "🙏 Please specify a chapter number (e.g., 'Tell me about Chapter 2').", type: "bot" },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { text: `📖 Fetching summary for Chapter ${chapterNumber}...`, type: "bot" },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch(`http://localhost:3000/chapter/${chapterNumber}`);
      const data = await response.json();
      setIsTyping(false);

      if (!data || data.error) {
        setMessages((prev) => [
          ...prev,
          { text: `❌ Sorry, I couldn't find a summary for Chapter ${chapterNumber}.`, type: "bot" },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          text: `### 📖 ${data.name} (${data.meaning})\n\n${data.summary}`,
          type: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ There was an error fetching the data. Please try again later.", type: "bot" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        ⬅ Back to Dashboard
      </button>

      {/* Chatbot Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-indigo-600 text-white px-4 py-3 rounded-lg">
          <h2 className="text-lg font-semibold">Bhagavad Gita Bot</h2>
          <IoClose
            className="text-2xl cursor-pointer hover:text-red-400 transition"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-[75%] rounded-lg shadow-sm whitespace-pre-wrap ${
                msg.type === "user"
                  ? "bg-blue-500 text-white self-end text-right"
                  : "bg-gray-200 text-gray-800 self-start text-left"
              }`}
            >
              {msg.type === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="text-sm text-gray-500 italic">Bot is typing...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="border-t flex items-center p-3 bg-gray-50 rounded-b-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder='Ask about a chapter (e.g., "Tell me about Chapter 2")...'
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            aria-label="Send"
            onClick={handleSend}
            className="ml-3 text-indigo-500 hover:text-indigo-700 transition"
          >
            <IoSend className="text-2xl" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

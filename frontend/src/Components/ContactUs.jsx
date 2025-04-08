import { useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: formData.name,
      title: "New Contact Form Submission",
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSuccess("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setSuccess(`❌ Something went wrong. ${error?.text || error?.message || 'Please try again later.'}`);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-xl md:max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600">Contact Us</h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mt-2">We’d love to hear from you!</p>
          {success && <p className="text-green-600 text-center mt-4">{success}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

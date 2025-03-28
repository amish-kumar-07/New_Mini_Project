import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Brand */}
        <div>
          <h2 className="text-2xl font-bold">Yoga Harmony</h2>
          <p className="text-gray-400 mt-2">
            Find your inner peace and balance through our guided yoga sessions.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/services" className="hover:text-white">Our Services</a></li>
            <li><a href="/classes" className="hover:text-white">Yoga Classes</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section - Socials & Contact */}
        <div>
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaYoutube size={20} /></a>
          </div>
          <p className="text-gray-400 mt-4">📞 +123 456 7890</p>
          <p className="text-gray-400">📧 info@yogaharmony.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Yoga Harmony. All rights reserved.
      </div>
    </footer>
  );
}

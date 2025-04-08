import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section - Brand */}
        <div>
          <h2 className="text-2xl font-bold">Sacramental Learning</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Dive into ancient wisdom and spiritual teachings to enlighten your soul and enrich your journey.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400 text-sm sm:text-base">
            <li><a href="/teachings" className="hover:text-white transition">Teachings</a></li>
            <li><a href="/quiz" className="hover:text-white transition">Quiz</a></li>
            <li><a href="/video" className="hover:text-white transition">Video</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section - Socials & Contact */}
        <div>
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="https://www.youtube.com/@SPIRITUALITY-minorProject" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaYoutube size={20} />
            </a>
          </div>
          <p className="text-gray-400 mt-4 text-sm">📞 +91 9945516838</p>
          <p className="text-gray-400 text-sm">📧 nbiraja.isacfcs@kiit.ac.in</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4">
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} Sacramental Learning. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

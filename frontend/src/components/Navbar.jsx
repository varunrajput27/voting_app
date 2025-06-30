import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsRobot } from 'react-icons/bs';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ChatWindow from '../bot/ChatWindow';

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const chatRef = useRef(null);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'How it Works', to: '/votinginfo' },
    { name: 'Live Polls', to: '/livepolls' },
    { name: 'Notification', to: '/notification' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md h-16 flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-black text-blue-900 tracking-tight hover:text-blue-800 transition-colors duration-300"
          >
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              🗳️ VoteNow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 relative">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-700 hover:text-blue-900 font-medium transition-all duration-300 hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105"
            >
              Admin
            </Link>

            {/* Bot Button Desktop */}
            <button
              onClick={() => setIsChatOpen((prev) => !prev)}
              className="text-blue-700 cursor-pointer hover:text-blue-900 ml-3 animate-bounce relative"
              aria-label="Toggle AI Chat"
              title="Toggle AI Chat"
            >
              <BsRobot size={28} />
            </button>

            {/* Chat Popup Desktop */}
            {isChatOpen && !isMobile && (
              <div
                ref={chatRef}
                className="absolute top-14 right-0 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-2xl z-[1000] flex flex-col"
              >
                <ChatWindow />
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsChatOpen((prev) => !prev)}
              className="text-blue-700 hover:text-blue-900 animate-bounce"
              aria-label="Toggle AI Chat"
              title="Toggle AI Chat"
            >
              <BsRobot size={24} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-blue-900"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md z-40 flex flex-col items-start px-6 py-4 space-y-4">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-blue-900"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700"
          >
            Admin
          </Link>
        </div>
      )}

      {/* Chat Window Mobile (Updated bottom spacing) */}
      {isChatOpen && isMobile && (
        <div
          ref={chatRef}
          className="fixed bottom-10 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-2xl z-[1000] flex flex-col"
        >
          <ChatWindow />
        </div>
      )}

      <div className="pt-16">{/* Page content */}</div>
    </>
  );
};

export default Navbar;

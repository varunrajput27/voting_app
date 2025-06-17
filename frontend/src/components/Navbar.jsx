import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsRobot } from 'react-icons/bs';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Hamburger and close icons
import ChatWindow from '../bot/ChatWindow';

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const chatRef = useRef(null);
  const botButtonRef = useRef(null);

  // Close chat on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        botButtonRef.current &&
        !botButtonRef.current.contains(event.target)
      ) {
        setIsChatOpen(false);
      }
    }

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-700 hover:text-blue-900 font-medium transition-all duration-300 ease-in-out hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Button */}
            <Link
              to="/admin"
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 active:scale-95"
            >
              Admin
            </Link>

            {/* Bot Button */}
            <button
              ref={botButtonRef}
              onClick={() => setIsChatOpen((prev) => !prev)}
              className="text-blue-700 hover:text-blue-900 ml-3"
              aria-label="Toggle AI Chat"
              title="Toggle AI Chat"
            >
              <BsRobot size={28} />
            </button>

            {/* Chat Popup */}
            {isChatOpen && (
              <div
                ref={chatRef}
                className="absolute right-6 top-20 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col z-[1000]"
              >
                <ChatWindow />
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-blue-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
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
          <button
            ref={botButtonRef}
            onClick={() => {
              setIsChatOpen((prev) => !prev);
              setIsMobileMenuOpen(false);
            }}
            className="text-blue-700 hover:text-blue-900"
            aria-label="Toggle AI Chat"
            title="Toggle AI Chat"
          >
            <BsRobot size={24} />
          </button>
        </div>
      )}

      {/* Page padding below navbar */}
      <div className="pt-16">
        {/* Content goes here */}
      </div>
    </>
  );
};

export default Navbar;

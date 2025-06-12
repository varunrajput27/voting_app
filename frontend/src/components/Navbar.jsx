import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsRobot } from 'react-icons/bs'; // Bot icon
import ChatWindow from '../bot/ChatWindow';

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef(null);
  const botButtonRef = useRef(null);

  // Close chat if clicking outside the chat window
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
            className="text-3xl font-extrabold text-blue-900 tracking-tight hover:text-blue-800 transition-colors duration-300"
          >
            Online Voting
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-700 hover:text-blue-900 font-semibold transition-all duration-300 ease-in-out hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Button */}
            <Link
              to="/admin"
              className="ml-6 px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 active:scale-95"
              aria-label="Admin Panel"
              title="Go to Admin Panel"
            >
              Admin
            </Link>

            {/* Bot Icon Button with hover wiggle animation */}
            <button
              ref={botButtonRef}
              onClick={() => setIsChatOpen((prev) => !prev)}
              className="ml-6 text-blue-700 hover:text-blue-900 focus:outline-none cursor-pointer transition-colors duration-300"
              aria-label="Toggle AI Chat"
              title="Toggle AI Chat"
            >
              <BsRobot size={28} className="robot-subtle-look" />
            </button>




            {/* Chat Popup */}
            {isChatOpen && (
              <div
                ref={chatRef}
                className="absolute right-0 top-16 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col z-[1000]"
              >
                <ChatWindow />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Padding so content is not hidden behind fixed navbar */}
      <div className="pt-16">
        {/* Page content goes here */}
      </div>
    </>
  );
};

export default Navbar;

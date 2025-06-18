import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { BellIcon } from '@heroicons/react/24/solid';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top with a tiny delay to ensure page loads fully
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    axios
      .get(`${import.meta.env.VITE_BACKEND_LINK}/api/election/details`)
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <motion.div
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-24"
      >
        <div className="container mx-auto px-6 pt-12">
          <div className="flex items-center justify-center mb-12 space-x-3">
            <BellIcon className="w-14 h-14 text-blue-600 opacity-80 animate-bounce" />
            <h2 className="text-4xl font-extrabold text-blue-900 tracking-wide">
              Latest Election Notifications
            </h2>
          </div>

          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading notifications...</p>
          ) : notifications.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {notifications.map((notification, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 flex space-x-5 hover:shadow-2xl transition-shadow duration-300 cursor-default"
                >
                  <BellIcon className="w-14 h-14 text-blue-600 opacity-80" />
                  <div className="flex flex-col justify-between">
                    <div className="mb-3 text-sm text-gray-500 uppercase font-semibold tracking-widest">
                      Posted on: {new Date(notification.createdAt).toLocaleString()}
                    </div>

                    <div className="space-y-2 text-gray-900 text-base font-medium leading-relaxed">
                      <p>
                        <span className="font-semibold text-blue-700">Election Post:</span>{" "}
                        {notification.electionPost}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-700">Location:</span>{" "}
                        {notification.location}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-700">Message:</span>{" "}
                        {notification.message || "No additional message."}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-700">Admin:</span>{" "}
                        {notification.author || "Varun Rajput"}
                      </p>
                    </div>

                    {notification.linkName && (
                      <a
                        href={`/candidateregistration?electionPost=${encodeURIComponent(
                          notification.electionPost
                        )}`}
                        className="mt-4 inline-block w-max px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer select-none font-semibold"
                      >
                        Register Candidate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No notifications available.</p>
          )}
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Notification;

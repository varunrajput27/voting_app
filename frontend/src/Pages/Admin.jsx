import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("sendElection");
  const [formData, setFormData] = useState({
    electionPost: "",
    location: "",
    message: "",
  });

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Disabled buttons state with localStorage sync
  const [disabledEndButtons, setDisabledEndButtons] = useState({});

  // Load disabled buttons state from localStorage on mount
  useEffect(() => {
    const savedDisabledButtons = localStorage.getItem("disabledEndButtons");
    if (savedDisabledButtons) {
      setDisabledEndButtons(JSON.parse(savedDisabledButtons));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeTab === "removeElection") {
      fetchNotifications();
    }
  }, [activeTab]);

  async function fetchNotifications() {
    setLoadingNotifications(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/election/fetchdetails"
      );
      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      toast.error("Failed to load notifications");
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/election/send-details",
        formData
      );
      toast.success(response.data.message || "Notification sent successfully!");
      setFormData({
        electionPost: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error sending notification");
    }
  }

  async function handleEndElection(id) {
    if (
      !window.confirm(
        "Are you sure you want to end this election and declare a winner?"
      )
    )
      return;

    // Disable button immediately & save in localStorage
    setDisabledEndButtons((prev) => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem("disabledEndButtons", JSON.stringify(updated));
      return updated;
    });

    try {
      const response = await axios.post(`http://localhost:3000/end-election/${id}`);
      if (response.status === 200) {
        toast.success("Election ended successfully.");
        // Optionally refresh notifications list after ending election:
        fetchNotifications();
      } else {
        toast.error("Failed to end election.");
        setDisabledEndButtons((prev) => {
          const updated = { ...prev, [id]: false };
          localStorage.setItem("disabledEndButtons", JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error ending election.");
      setDisabledEndButtons((prev) => {
        const updated = { ...prev, [id]: false };
        localStorage.setItem("disabledEndButtons", JSON.stringify(updated));
        return updated;
      });
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this election?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/election/delete-details/${id}`
      );
      if (response.status === 200) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));

        // Remove disabled state from localStorage for deleted id
        setDisabledEndButtons((prev) => {
          const updated = { ...prev };
          delete updated[id];
          localStorage.setItem("disabledEndButtons", JSON.stringify(updated));
          return updated;
        });

        toast.success("Election deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete election");
    }
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10  mb-16">
          <h1 className="text-5xl font-bold mb-16 text-center text-blue-700">
            Admin Control Panel
          </h1>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-100 rounded-full p-1 space-x-2 shadow-inner">
              <button
                onClick={() => setActiveTab("sendElection")}
                className={`px-6 py-2 rounded-full font-medium transition cursor-pointer ${
                  activeTab === "sendElection"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Send Election Details
              </button>
              <button
                onClick={() => setActiveTab("removeElection")}
                className={`px-6 py-2 rounded-full font-medium transition  cursor-pointer ${
                  activeTab === "removeElection"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                View & Manage Elections
              </button>
            </div>
          </div>

          {activeTab === "sendElection" && (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto space-y-6 text-gray-800"
              noValidate
            >
              <div>
                <label
                  htmlFor="electionPost"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Election Post
                </label>
                <input
                  type="text"
                  id="electionPost"
                  name="electionPost"
                  value={formData.electionPost}
                  onChange={handleChange}
                  required
                  placeholder="e.g. CM, MLA, MP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  State, Country
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Maharashtra, India"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Type your notification message here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                Send Notification
              </button>
            </form>
          )}

          {activeTab === "removeElection" && (
            <div className="max-w-xl mx-auto">
              {loadingNotifications ? (
                <div className="flex justify-center my-6">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-center text-gray-500">
                  No notifications found.
                </p>
              ) : (
                <ul className="space-y-6">
                  {notifications.map((notification) => (
                    <motion.li
                      key={notification._id}
                      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {notification.electionPost}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {notification.location}
                          </p>
                        </div>
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="flex space-x-3 mt-2">
                        <button
                          onClick={() => handleEndElection(notification._id)}
                          disabled={disabledEndButtons[notification._id]}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white text-sm font-semibold transition  cursor-pointer ${
                            disabledEndButtons[notification._id]
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          End Election
                        </button>
                        <button
                          onClick={() => handleDelete(notification._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md cursor-pointer "
                        >
                          <TrashIcon className="w-4 h-4" /> Delete Election
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <Footer />
      </motion.div>
    </>
  );
}

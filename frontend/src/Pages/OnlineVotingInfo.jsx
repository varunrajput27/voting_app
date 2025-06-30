import React, { useState, useEffect } from "react";
import fingerImg from "../assets/finger.jfif";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import securevoting from "../assets/securevoting.webp";
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const steps = [
  {
    title: "1. Register Yourself",
    desc: "Voters register on the official online voting platform using their ID and personal details to verify eligibility.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.833 0 5.422.863 7.579 2.336M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "2. Login Securely",
    desc: "Use multi-factor authentication to securely login to your voting account ensuring your vote remains confidential.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.38 1.12-2.5 2.5-2.5S17 9.62 17 11m-5 0v5m0-5H7m5 0h5" />
      </svg>
    ),
  },
  {
    title: "3. Cast Your Vote",
    desc: "Select your preferred candidate or option on the digital ballot, review your choice carefully before submitting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "4. Vote Encryption & Storage",
    desc: "Your vote is encrypted end-to-end and securely stored in the blockchain or secured servers, protecting integrity and privacy.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.38-1.12-2.5-2.5-2.5S7 9.62 7 11m5 0v5m0-5h5m-5 0H7" />
      </svg>
    ),
  },
  {
    title: "5. Transparent Counting",
    desc: "Votes are counted transparently using verifiable algorithms, providing trust and instant results to voters.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M3 6h11M3 14h7m4 4h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-4 6h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2" />
      </svg>
    ),
  },
];

const turnoutData = [
  { year: "2020", turnout: 65 },
  { year: "2021", turnout: 72 },
  { year: "2022", turnout: 78 },
  { year: "2023", turnout: 81 },
  { year: "2024", turnout: 88 },
];

const OnlineVotingInfo = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterClick = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate("/login"), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 font-sans">
      <Navbar />

      <motion.div
        variants={pageTransition}
        initial="initial"
        animate={exiting ? "exit" : "animate"}
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <section className="text-center mt-8 max-w-4xl mx-auto mb-16 p-6 sm:p-10 md:p-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 drop-shadow-lg">
            How Online Voting Works
          </h1>
          <p className="text-indigo-700 text-base sm:text-lg md:text-xl italic tracking-wide">
            Secure, transparent, and easy-to-use online voting system designed to empower every voter.
          </p>
          <img
            src={fingerImg}
            alt="Finger pointing at voting"
            className="w-48 sm:w-56 md:w-64 mx-auto mt-6 rounded-lg shadow-lg"
            loading="lazy"
          />
        </section>

        {/* Steps */}
        <section id="steps" className="max-w-6xl mx-auto mb-20 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-10 text-center">
            Step-by-Step Voting Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {steps.map(({ title, desc, icon }, idx) => (
              <div
                key={idx}
                className="flex gap-4 sm:gap-6 items-start bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-indigo-200 hover:shadow-indigo-400 transition transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                tabIndex={0}
              >
                <div className="flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-900 mb-2">{title}</h3>
                  <p className="text-indigo-700 text-sm sm:text-base md:text-lg leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Turnout Chart */}
        <section className="max-w-4xl mx-auto mb-20 bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-indigo-300 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center">
            Voter Turnout Over The Years
          </h2>
          <div className="flex items-end gap-4 sm:gap-6 justify-center h-52 sm:h-60">
            {turnoutData.map(({ year, turnout }) => (
              <div key={year} className="flex flex-col items-center">
                <div
                  className="bg-indigo-600 rounded-t-lg w-6 sm:w-9 transition-all duration-700 ease-in-out"
                  style={{ height: `${turnout * 1.5}px` }}
                  title={`${turnout}% turnout`}
                />
                <span className="mt-2 text-indigo-800 text-sm font-semibold">{year}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-indigo-700 italic text-base">
            Increasing voter participation year after year thanks to easy online access.
          </p>
        </section>

        {/* Security */}
        <section className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 sm:px-6">
          <img
            src={securevoting}
            alt="Secure online voting"
            className="rounded-xl shadow-lg object-cover w-full h-64 sm:h-80"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 sm:mb-6">
              Voting is Safe and Confidential
            </h2>
            <p className="text-indigo-700 text-base sm:text-lg mb-4 leading-relaxed">
              Every vote is encrypted and stored securely. Only you can access your voting session,
              and advanced blockchain technology ensures votes cannot be altered or deleted.
            </p>
            <p className="text-indigo-700 text-base sm:text-lg leading-relaxed">
              The system uses multi-factor authentication and biometric verification to prevent fraud
              and maintain voter privacy.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center max-w-3xl mx-auto py-12 sm:py-16 bg-indigo-700 rounded-3xl shadow-xl text-white mb-32 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6">
            Ready to Vote Online? Join The Movement Today!
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Experience the convenience and security of online voting in the upcoming elections.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRegisterClick}
            disabled={exiting}
            className={`bg-yellow-400 hover:bg-yellow-300 text-indigo-900 cursor-pointer  font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg sm:text-xl shadow-lg transition focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
              exiting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Support Your Candidate
          </motion.button>
        </section>

        <Footer />
      </motion.div>
    </div>
  );
};

export default OnlineVotingInfo;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { ease: 'easeIn', duration: 0.3 } },
};

const slideUpFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } },
  exit: { opacity: 0, y: 15, transition: { ease: 'easeIn', duration: 0.3 } },
};

const Livepolls = () => {
  const [posts, setPosts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [endedElections, setEndedElections] = useState([]);
  const [openResultSection, setOpenResultSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notifRes, candRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/election/details`),
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/candidates`),
        ]);

        const uniquePosts = [...new Set(notifRes.data.map((n) => n.electionPost))];
        setPosts(uniquePosts);

        const ended = notifRes.data.filter((e) => e.isEnded).map((e) => e.electionPost);
        setEndedElections(ended);

        if (candRes.data && Array.isArray(candRes.data.candidates)) {
          setCandidates(candRes.data.candidates);
        } else {
          setCandidates([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setPosts([]);
        setCandidates([]);
        setEndedElections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (post) => {
    setOpenResultSection(null);
    setOpenSection((prev) => (prev === post ? null : post));
  };

  const toggleResultSection = (post) => {
    setOpenSection(null);
    setOpenResultSection((prev) => (prev === post ? null : post));
  };

  const candidatesForPost = (post) =>
    candidates
      .filter(
        (c) =>
          c.electionPost &&
          post &&
          c.electionPost.trim().toLowerCase() === post.trim().toLowerCase()
      )
      .sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <>
      <Navbar />

      <motion.main
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white text-gray-900 pt-12 pb-16 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-12 tracking-tight drop-shadow-lg select-none">
          Election Leaderboard
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600 select-none">Loading elections...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg text-gray-600 select-none">No election posts found.</p>
        ) : (
          posts.map((post) => {
            const isOpen = openSection === post;
            const isResultOpen = openResultSection === post;
            const postCandidates = candidatesForPost(post);
            const isEnded = endedElections.includes(post);

            return (
              <section
                key={post}
                className={`mb-10 rounded-2xl shadow-lg border-l-8 p-6 flex flex-col bg-white transition-colors duration-300 ${
                  isEnded
                    ? 'border-green-700 bg-green-50 hover:shadow-xl'
                    : 'border-blue-700 hover:shadow-xl'
                }`}
                aria-labelledby={`${post}-title`}
              >
                <div className="flex justify-between items-center mb-5">
                  <h2
                    id={`${post}-title`}
                    className="text-2xl md:text-3xl font-semibold text-blue-900 select-none tracking-tight"
                  >
                    {post} Election
                  </h2>

                  <div className="flex items-center space-x-4">
                    {isEnded && (
                      <span className="inline-block bg-green-800 text-white font-semibold px-5 py-2 rounded-full shadow select-none uppercase tracking-wide whitespace-nowrap">
                        Result Declared
                      </span>
                    )}

                    {isEnded ? (
                      <motion.button
                        onClick={() => toggleResultSection(post)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition cursor-pointer uppercase tracking-wide whitespace-nowrap"
                        aria-expanded={isResultOpen}
                        aria-controls={`result-section-${post}`}
                      >
                        {isResultOpen ? 'Hide Result' : 'See Result'}
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => toggleSection(post)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition cursor-pointer uppercase tracking-wide whitespace-nowrap"
                        aria-expanded={isOpen}
                        aria-controls={`section-${post}`}
                      >
                        {isOpen ? 'Close Live Polls' : 'Open Live Polls'}
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Live Poll Section */}
                <AnimatePresence initial={false}>
                  {!isEnded && isOpen && (
                    <motion.div
                      id={`section-${post}`}
                      variants={slideUpFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      {postCandidates.length === 0 ? (
                        <p className="text-gray-600 text-lg select-none">No candidates available.</p>
                      ) : (
                        <div className="space-y-4">
                          {postCandidates.map((candidate, i) => (
                            <div
                              key={candidate._id || i}
                              className={`flex items-center justify-between p-4 rounded-xl border transition-shadow duration-300 ${
                                i === 0 && (candidate.votes || 0) > 0
                                  ? 'bg-yellow-100 border-yellow-500 shadow-lg'
                                  : 'bg-white border-gray-300 hover:shadow-md'
                              }`}
                            >
                              {/* Left side: Profile pic */}
                              <div className="flex-shrink-0">
                                <img
                                  src={
                                    candidate.profilepic
                                      ? `data:image/jpeg;base64,${candidate.profilepic}`
                                      : '/default-profile.png'
                                  }
                                  alt={`${candidate.name || 'Candidate'} Profile`}
                                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-400"
                                  loading="lazy"
                                />
                              </div>

                              {/* Middle: Name and slogan vertically stacked */}
                              <div className="flex flex-col justify-center ml-4 flex-grow min-w-0">
                                <p className="font-semibold text-gray-900 truncate">{candidate.name || 'Unnamed'}</p>
                                <p className="text-sm text-gray-600 truncate">{candidate.partyslogan || 'No Slogan'}</p>
                              </div>

                              {/* Party logo before votes */}
                              <div className="flex-shrink-0 ml-4 mr-4">
                                <img
                                  src={
                                    candidate.partysign
                                      ? `data:image/jpeg;base64,${candidate.partysign}`
                                      : '/default-sign.png'
                                  }
                                  alt={`${candidate.party || 'Party'} Sign`}
                                  className="w-12 h-12 object-contain"
                                  loading="lazy"
                                />
                              </div>

                              {/* Right side: votes + leading badge */}
                              <div className="flex flex-col items-end min-w-[60px]">
                                <p className="text-2xl font-bold text-blue-900">{candidate.votes || 0}</p>
                                <p className="text-xs font-medium text-gray-500 select-none">votes</p>
                                {i === 0 && (candidate.votes || 0) > 0 && (
                                  <div className="mt-1 text-green-700 font-semibold text-xs flex items-center space-x-1 select-none">
                                    <span>🏆</span>
                                    <span>Leading</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result Section */}
                <AnimatePresence initial={false}>
                  {isEnded && isResultOpen && (
                    <motion.div
                      id={`result-section-${post}`}
                      variants={slideUpFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      {(() => {
                        const topVotes = postCandidates[0]?.votes || 0;
                        const topCandidates = postCandidates.filter((c) => (c.votes || 0) === topVotes);

                        if (topCandidates.length > 1) {
                          return (
                            <div>
                              <p className="text-red-700 font-bold text-lg mb-6 select-none flex items-center space-x-3">
                                <span className="text-2xl">⚠️</span>
                                <span>Draw - No winner declared</span>
                              </p>
                              <div className="space-y-5">
                                {postCandidates.map((candidate, i) => (
                                  <div
                                    key={candidate._id || i}
                                    className="flex items-center space-x-6 p-5 rounded-xl bg-yellow-100 border-l-8 border-yellow-500 shadow-lg"
                                  >
                                    <img
                                      src={
                                        candidate.profilepic
                                          ? `data:image/jpeg;base64,${candidate.profilepic}`
                                          : '/default-profile.png'
                                      }
                                      alt={`${candidate.name || 'Candidate'} Profile`}
                                      className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-400 flex-shrink-0"
                                      loading="lazy"
                                    />
                                    <div className="flex-grow min-w-0">
                                      <img
                                        src={
                                          candidate.partysign
                                            ? `data:image/jpeg;base64,${candidate.partysign}`
                                            : '/default-sign.png'
                                        }
                                        alt={`${candidate.party || 'Party'} Sign`}
                                        className="w-14 h-14 object-contain mt-1 mb-2"
                                        loading="lazy"
                                      />
                                      <p className="text-sm italic text-gray-700 truncate max-w-xs">
                                        {candidate.partyslogan || 'No slogan available'}
                                      </p>
                                    </div>
                                    <div className="text-right min-w-[90px]">
                                      <p className="text-2xl font-bold text-blue-900">{candidate.votes || 0}</p>
                                      <p className="text-xs font-medium text-gray-500 select-none">votes</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        const winner = topCandidates[0];
                        return (
                          <div className="flex items-center space-x-8 p-7 rounded-xl bg-green-100 border-l-8 border-green-700 shadow-lg">
                            <img
                              src={
                                winner.profilepic
                                  ? `data:image/jpeg;base64,${winner.profilepic}`
                                  : '/default-profile.png'
                              }
                              alt={`${winner.name || 'Winner'} Profile`}
                              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-500 flex-shrink-0"
                              loading="lazy"
                            />
                            <div className="flex-grow min-w-0">
                              <img
                                src={
                                  winner.partysign
                                    ? `data:image/jpeg;base64,${winner.partysign}`
                                    : '/default-sign.png'
                                }
                                alt={`${winner.party || 'Party'} Sign`}
                                className="w-16 h-16 object-contain mt-1 mb-2"
                                loading="lazy"
                              />
                              <p className="text-base italic text-gray-800 truncate">{winner.partyslogan || 'No slogan available'}</p>
                            </div>
                            <div className="text-right min-w-[100px]">
                              <p className="text-3xl font-extrabold text-blue-900">{winner.votes || 0}</p>
                              <div className="mt-2 text-green-800 font-semibold text-lg flex items-center justify-center space-x-2 select-none">
                                <span>🏆</span>
                                <span>Winner</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })
        )}
      </motion.main>

      <Footer />
    </>
  );
};

export default Livepolls;

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
    window.scrollTo(0, 0); // Scroll to top
    const fetchData = async () => {
      try {
        const [notifRes, candRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/election/details`),
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
        className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-12 pb-16 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-900 mb-10">
          Election Leaderboard
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading elections...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No election posts found.</p>
        ) : (
          posts.map((post) => {
            const isOpen = openSection === post;
            const isResultOpen = openResultSection === post;
            const postCandidates = candidatesForPost(post);
            const isEnded = endedElections.includes(post);

            return (
              <section
                key={post}
                className={`mb-10 p-6 rounded-xl shadow-lg bg-white border-l-8 ${isEnded ? 'border-green-700' : 'border-blue-700'}`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-semibold text-blue-900">{post} Election</h2>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {isEnded && (
                      <span className="bg-green-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Result Declared
                      </span>
                    )}
                    <motion.button
                      onClick={() => isEnded ? toggleResultSection(post) : toggleSection(post)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md font-semibold cursor-pointer"
                    >
                      {isEnded
                        ? isResultOpen ? 'Hide Result' : 'See Result'
                        : isOpen ? 'Close Live Polls' : 'Open Live Polls'}
                    </motion.button>

                  </div>
                </div>

                {/* LIVE POLLS */}
                <AnimatePresence>
                  {!isEnded && isOpen && (
                    <motion.div
                      variants={slideUpFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="mt-5 space-y-4"
                    >
                      {postCandidates.map((candidate, idx) => (
                        <div
                          key={candidate._id || idx}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border transition-shadow ${idx === 0 && (candidate.votes || 0) > 0 ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-300 hover:shadow-md'}`}
                        >
                          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3 sm:gap-5 w-full sm:w-auto">
                            <div className="flex flex-col items-center">
                              <img
                                src={candidate.profilepic ? `data:image/jpeg;base64,${candidate.profilepic}` : '/default-profile.png'}
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-400"
                                alt="Candidate"
                              />
                              <img
                                src={candidate.partysign ? `data:image/png;base64,${candidate.partysign}` : '/default-sign.png'}
                                className="w-10 h-10 object-contain mt-2"
                                alt="Party Sign"
                              />
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="font-bold text-gray-800">{candidate.name}</p>
                              <p className="text-sm text-gray-600">{candidate.partyslogan || 'No slogan'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-900">{candidate.votes || 0}</p>
                            <p className="text-sm text-gray-500">Votes</p>
                            {idx === 0 && (candidate.votes || 0) > 0 && (
                              <p className="text-green-600 text-sm font-semibold flex items-center justify-end gap-1 mt-1">
                                🏆 Leading
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* RESULT SECTION */}
                <AnimatePresence>
                  {isEnded && isResultOpen && (
                    <motion.div
                      variants={slideUpFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="mt-5"
                    >
                      {(() => {
                        const topVotes = postCandidates[0]?.votes || 0;
                        const topCandidates = postCandidates.filter((c) => (c.votes || 0) === topVotes);
                        if (topCandidates.length > 1) {
                          return (
                            <div className="text-center text-red-700 font-semibold">
                              ⚠️ It's a draw! No winner declared.
                            </div>
                          );
                        }
                        const winner = topCandidates[0];
                        return (
                          <div className="bg-green-100 border-l-8 border-green-700 p-5 rounded-lg flex flex-col sm:flex-row items-center gap-6">
                            <img
                              src={winner.profilepic ? `data:image/jpeg;base64,${winner.profilepic}` : '/default-profile.png'}
                              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-400"
                              alt="Winner"
                            />
                            <div className="flex flex-col items-center sm:items-start">
                              <h3 className="text-xl font-bold text-green-800">{winner.name}</h3>
                              <p className="text-sm text-gray-700 italic">{winner.partyslogan || 'No slogan available'}</p>
                              <img
                                src={winner.partysign ? `data:image/png;base64,${winner.partysign}` : '/default-sign.png'}
                                className="w-12 h-12 object-contain mt-2"
                                alt="Party Sign"
                              />
                            </div>
                            <div className="text-center sm:text-right ml-auto">
                              <p className="text-2xl font-extrabold text-blue-900">{winner.votes || 0}</p>
                              <p className="text-green-700 font-semibold flex items-center gap-1 mt-1">
                                🏆 Winner
                              </p>
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

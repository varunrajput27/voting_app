import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ElectionPage = () => {
  const [elections, setElections] = useState([]);
  const [activeElection, setActiveElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [hasVotedAnyElection, setHasVotedAnyElection] = useState(false); // Global vote flag
  const [showExitModal, setShowExitModal] = useState(false);

  const aadhar = localStorage.getItem('aadhar') || 'sample-aadhar-123';
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch elections on mount
    const fetchElections = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/elections`);
        const activeElections = res.data.filter((election) => election.status !== 'ended');
        setElections(activeElections);
      } catch (err) {
        console.error('Error fetching elections:', err);
      }
    };

    fetchElections();
  }, []);

  // Check if user has voted in any election on page load
  useEffect(() => {
    const checkGlobalVoteStatus = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/vote/status/global`, { aadhar });
        setHasVotedAnyElection(res.data.hasVoted);
      } catch (err) {
        console.error('Error checking global vote status:', err);
      }
    };

    checkGlobalVoteStatus();
  }, [aadhar]);

  const enterElection = async (electionPost) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/candidates/${electionPost}`);
      setCandidates(res.data);
      setActiveElection(electionPost);
    } catch (err) {
      console.error('Error entering election:', err);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/vote`, {
        aadhar,
        candidateId,
        electionPost: activeElection,
      });

      alert(res.data.message);
      setHasVotedAnyElection(true); // Disable voting everywhere after a successful vote
    } catch (err) {
      alert(err.response?.data?.message || 'Vote failed');
    }
  };

  const confirmExit = () => setShowExitModal(true);
  const cancelExit = () => setShowExitModal(false);
  const exitElection = () => {
    localStorage.removeItem('aadhar');
    navigate('/');
  };

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 sm:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-700 select-none">
          🗳️ Election Dashboard
        </h1>
        <button
          onClick={confirmExit}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className={`pt-28 px-4 sm:px-6 bg-gray-100 min-h-screen transition ${showExitModal ? 'blur-sm' : ''}`}>
        {elections.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No active elections available.</p>
        ) : (
          elections.map((election) => (
            <div key={election._id} className="bg-white rounded-xl shadow-md p-5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {election.electionPost} Election
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">📍 {election.location}</p>
                </div>
                <button
                  onClick={() =>
                    activeElection === election.electionPost
                      ? setActiveElection(null)
                      : enterElection(election.electionPost)
                  }
                  className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer"
                >
                  {activeElection === election.electionPost ? 'Close Election' : 'Enter Election'}
                </button>
              </div>

              {/* Candidates */}
              {activeElection === election.electionPost && (
                <div className="mt-4 space-y-4">
                  {candidates.length === 0 ? (
                    <p className="text-gray-500 italic">No candidates available for this election.</p>
                  ) : (
                    candidates.map((cand) => (
                      <div
                        key={cand._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 gap-4"
                      >
                        {/* Candidate Info */}
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              cand.profilepic
                                ? `data:image/jpeg;base64,${cand.profilepic}`
                                : 'https://via.placeholder.com/100?text=No+Image'
                            }
                            alt="Candidate"
                            className="w-16 h-16 rounded-full object-cover border-4 border-blue-200"
                          />
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{cand.name}</h3>
                            <p className="text-sm text-gray-600 italic">{cand.partyslogan}</p>
                          </div>
                        </div>

                        {/* Party and Vote */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 w-full sm:w-auto">
                          <img
                            src={
                              cand.partysign
                                ? `data:image/png;base64,${cand.partysign}`
                                : 'https://via.placeholder.com/50?text=No+Logo'
                            }
                            alt="Party Sign"
                            className="w-12 h-12 object-contain"
                          />

                          <button
                            onClick={() => handleVote(cand._id)}
                            disabled={hasVotedAnyElection}
                            className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold transition duration-200 cursor-pointer ${
                              hasVotedAnyElection
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {hasVotedAnyElection ? 'Voted' : 'Vote'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to Logout?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={cancelExit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={exitElection}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectionPage;

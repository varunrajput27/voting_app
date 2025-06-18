import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ElectionPage = () => {
  const [elections, setElections] = useState([]);
  const [activeElection, setActiveElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const aadhar = localStorage.getItem('aadhar') || 'sample-aadhar-123';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/elections`);
        setElections(res.data);
      } catch (err) {
        console.error('Error fetching elections:', err);
      }
    };
    fetchElections();
  }, []);

  const enterElection = async (electionPost) => {
    try {
      const [candidatesRes, voteStatusRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_LINK}/candidates/${electionPost}`),
        axios.post(`${import.meta.env.VITE_BACKEND_LINK}/vote/status`, {
          aadhar,
          electionPost,
        }),
      ]);

      setCandidates(candidatesRes.data);
      setActiveElection(electionPost);

      if (voteStatusRes.data.hasVoted) {
        setHasVoted(true);
      } else {
        setHasVoted(false);
      }
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
      setHasVoted(true);
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
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-700">🗳️ Election Dashboard</h1>
        <button
          onClick={confirmExit}
          className="mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
        >
          Exit Election
        </button>
      </div>

      <div className={`pt-28 px-4 bg-gray-100 min-h-screen ${showExitModal ? 'blur-sm' : ''}`}>
        {elections.map((election) => (
          <div key={election._id} className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {election.electionPost} Election
                </h2>
                <p className="text-sm text-gray-500">📍 {election.location}</p>
              </div>
              <button
                onClick={() =>
                  activeElection === election.electionPost
                    ? setActiveElection(null)
                    : enterElection(election.electionPost)
                }
                className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                {activeElection === election.electionPost ? 'Close Election' : 'Enter Election'}
              </button>
            </div>

            {activeElection === election.electionPost && (
              <div className="mt-4 space-y-4">
                {candidates.length === 0 ? (
                  <p className="text-gray-600 italic">No candidates available.</p>
                ) : (
                  candidates.map((cand) => (
                    <div
                      key={cand._id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border p-4 rounded-md"
                    >
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
                          <h3 className="text-lg font-semibold">{cand.name}</h3>
                          <p className="text-sm italic text-gray-600">{cand.partyslogan}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 sm:mt-0">
                        <img
                          src={
                            cand.partysign
                              ? `data:image/png;base64,${cand.partysign}`
                              : 'https://via.placeholder.com/50?text=No+Logo'
                          }
                          alt="Party Sign"
                          className="w-10 h-10 object-contain"
                        />
                        <button
                          onClick={() => handleVote(cand._id)}
                          disabled={hasVoted}
                          className={`px-4 py-2 rounded font-semibold ${
                            hasVoted
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {hasVoted ? 'You already voted' : 'Vote'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Exit</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to exit the election page?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={cancelExit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={exitElection}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectionPage;

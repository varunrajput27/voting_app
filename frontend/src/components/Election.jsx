import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ElectionPage = () => {
  const [elections, setElections] = useState([]);
  const [activeElection, setActiveElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [votedElectionIds, setVotedElectionIds] = useState([]);

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
        setVotedElectionIds((prev) =>
          prev.includes(electionPost) ? prev : [...prev, electionPost]
        );
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
      setVotedElectionIds((prev) => [...prev, activeElection]);

      const candidatesRes = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/candidates/${activeElection}`);
      setCandidates(candidatesRes.data);
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
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-blue-700">🗳️ Election Dashboard</h1>
        <button
          onClick={confirmExit}
          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold cursor-pointer transition"
        >
          Exit Election
        </button>
      </div>

      <div className={`pt-24 px-6 bg-gray-100 min-h-screen transition duration-300 ${showExitModal ? 'blur-sm' : ''}`}>
        {elections.map((election) => (
          <div key={election._id} className="bg-white rounded-xl shadow-lg p-6 mb-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {election.electionPost} Election
                </h2>
                <p className="text-sm text-gray-500 mb-2">📍 {election.location}</p>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer"
                onClick={() =>
                  activeElection === election.electionPost
                    ? setActiveElection(null)
                    : enterElection(election.electionPost)
                }
              >
                {activeElection === election.electionPost ? 'Close Election' : 'Enter in Election'}
              </button>
            </div>

            {activeElection === election.electionPost && (
              <div className="mt-6 space-y-6">
                {candidates.map((cand) => (
                  <div
                    key={cand._id}
                    className="flex items-center bg-gray-50 border p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={
                        cand.profilepic
                          ? `data:image/jpeg;base64,${cand.profilepic}`
                          : 'https://via.placeholder.com/100?text=No+Image'
                      }
                      alt="Candidate"
                      className="w-24 h-24 rounded-full object-cover mr-6"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{cand.name}</h3>
                      <p className="italic text-gray-600">{cand.partyslogan}</p>
                    </div>

                    <img
                      src={
                        cand.partysign
                          ? `data:image/png;base64,${cand.partysign}`
                          : 'https://via.placeholder.com/50?text=No+Logo'
                      }
                      alt="Party Logo"
                      className="w-12 h-12 mr-4 object-contain"
                    />

                    <button
                      onClick={() => handleVote(cand._id)}
                      disabled={votedElectionIds.includes(activeElection)}
                      className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                        votedElectionIds.includes(activeElection)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {votedElectionIds.includes(activeElection) ? 'You already voted' : 'Vote'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-300 z-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Exit</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to exit the election page?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelExit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={exitElection}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
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

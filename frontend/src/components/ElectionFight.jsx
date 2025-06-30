import React from 'react';
import bjp from '../assets/bjp.jpg';
import congress from '../assets/congress.png';
import aap from '../assets/aap.jfif';
import swp from '../assets/swp.jpg';

const ElectionResults = () => {
  const candidates = [
    {
      name: 'Arjun Verma',
      party: 'BJP',
      votes: 18560,
      photo: 'https://randomuser.me/api/portraits/men/47.jpg',
      logo: bjp,
      color: 'bg-blue-50 border-blue-400',
      winner: true,
    },
    {
      name: 'Ravi Deshmukh',
      party: 'Congress',
      votes: 15820,
      photo: 'https://randomuser.me/api/portraits/men/48.jpg',
      logo: congress,
      color: 'bg-red-50 border-red-400',
    },
    {
      name: 'Anita Sharma',
      party: 'AAP',
      votes: 10230,
      photo: 'https://randomuser.me/api/portraits/women/47.jpg',
      logo: aap,
      color: 'bg-gray-50 border-gray-400',
    },
    {
      name: 'Manoj Yadav',
      party: 'SP',
      votes: 9420,
      photo: 'https://randomuser.me/api/portraits/men/44.jpg',
      logo: swp,
      color: 'bg-yellow-50 border-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white py-16 px-6">
      {/* 2024 Result Banner - Reduced Size */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-extrabold text-3xl text-center rounded-full py-3 px-6 shadow-lg select-none tracking-wider">
          🏆 2024 Election Results 🏆
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative">
        {/* subtle pattern or decorative element behind */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#bfdbfe,_transparent)] pointer-events-none -z-10 rounded-3xl"></div>

        {candidates.map((candidate, idx) => (
          <div
            key={idx}
            className={`
              rounded-2xl shadow-lg p-4 border-l-8
              ${candidate.color}
              hover:scale-105 transform transition
              relative bg-white
              ${candidate.winner ? 'ring-4 ring-blue-400 ring-opacity-40 shadow-blue-300' : ''}
              `}
          >
            {candidate.winner && (
              <span className="absolute top-3 right-3 text-xs bg-blue-400 text-blue-900 font-bold px-2 py-0.5 rounded-full shadow-lg select-none flex items-center gap-1">
                🏆 Winner
              </span>
            )}

            <div className="flex items-center gap-4 mb-4">
              <img
                src={candidate.photo}
                alt={`${candidate.name} photo`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{candidate.name}</h2>
                <p className="text-xs font-semibold text-gray-600 tracking-wide">{candidate.party} Party</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-700 font-semibold text-lg tracking-wide">
                Votes: <span className="text-indigo-600">{candidate.votes.toLocaleString()}</span>
              </div>
              <img
                src={candidate.logo}
                alt={`${candidate.party} logo`}
                className="w-12 h-12 bg-white p-1 rounded-lg shadow-md"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-16 italic select-none tracking-wide">
        *This data represents the official results of the previous election.
      </p>
    </div>
  );
};

export default ElectionResults;

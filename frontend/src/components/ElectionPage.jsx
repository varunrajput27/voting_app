import React from 'react';
import mainlogo from '../assets/main_logo_3.jpg';
import two from '../assets/two.jpg';

const ElectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-indigo-50 text-gray-800 pb-16 px-4">
      
      {/* Constitution Banner */}
      <div className="text-center py-8 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-xl shadow-lg mt-6 mx-auto max-w-4xl text-white">
        <img
          src={mainlogo}
          alt="Indian Emblem"
          className="w-24 md:w-32 mx-auto drop-shadow-md mb-3"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-2">
          Indian Constitution & Elections
        </h1>
        <p className="text-lg font-semibold italic">"Satyamev Jayate" – Truth Alone Triumphs</p>
      </div>

      {/* Main Section */}
      <main className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
          🗳️ Elections in India
        </h2>

        <p className="mb-5 text-justify leading-relaxed text-gray-700 text-lg">
          Articles <strong>324 to 329</strong> of the Indian Constitution deal with the structure
          and powers of the Election Commission and the conduct of elections in India.
          India is a <strong>sovereign democratic republic</strong> where every citizen has the right
          to vote and choose their representative.
        </p>

        <p className="mb-5 text-justify leading-relaxed text-gray-700 text-lg">
          The <strong>Election Commission of India</strong> is an autonomous constitutional authority
          responsible for administering election processes in India at both national and state levels.
          Political parties contest elections and are identified by unique symbols to help voters recognize them.
        </p>

        <img
          src={two}
          alt="Political Parties Symbols"
          className="w-full rounded-xl shadow-lg my-6"
        />

        <p className="text-justify leading-relaxed text-gray-700 text-lg">
          Elections are the <strong>heartbeat of democracy</strong>. Voting is both a right and a
          responsibility. A strong, transparent, and inclusive democratic system is only possible
          through <span className="text-indigo-700 font-semibold">active voter participation</span>.
        </p>
      </main>
    </div>
  );
};

export default ElectionPage;

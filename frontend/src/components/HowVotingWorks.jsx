import React from 'react';
import { FaVoteYea, FaPoll, FaSignOutAlt, FaSignInAlt, FaRegEye, FaCheckCircle } from 'react-icons/fa';

const HowVotingWorks = () => {
  const steps = [
    {
      title: ' Log In',
      description: ' use  Aadharcard number for  Log in to securely access the voting system.',
      icon: <FaSignInAlt className="text-white text-2xl" />,
    },
    {
      title: 'Browse Available elections',
      description: 'Explore all current elections  available for voting.',
      icon: <FaPoll className="text-white text-2xl" />,
    },
    {
      title: 'Select a elections',
      description: 'Choose the elections, review , and prepare to vote.',
      icon: <FaVoteYea className="text-white text-2xl" />,
    },
    {
      title: 'Cast Your Vote',
      description: 'Submit your vote securely and confidently.',
      icon: <FaCheckCircle className="text-white text-2xl" />,
    },
    {
      title: 'View Results',
      description: 'View live or final results depending on the election rules.',
      icon: <FaRegEye className="text-white text-2xl" />,
    },
    {
      title: 'Logout Securely',
      description: 'Log out safely to protect your account.',
      icon: <FaSignOutAlt className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6 sm:px-10 lg:px-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 mb-8">
        How Our Voting System Works 🗳️
      </h1>
      <p className="max-w-3xl mx-auto text-center text-gray-600 text-lg mb-14">
        Our secure online voting system empowers every citizen to participate easily in the democratic process—anytime, anywhere.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-5 hover:shadow-blue-200 border-l-4 border-indigo-500 transition-transform hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
              {step.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-indigo-800 mb-1">{step.title}</h2>
              <p className="text-gray-700 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <a
          href="/login"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-full shadow-md text-lg font-semibold hover:bg-green-700 transition-all duration-300"
        >
          Go to Voting Portal →
        </a>
      </div>
    </div>
  );
};

export default HowVotingWorks;

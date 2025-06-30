import React from 'react';
import {
  FaShieldAlt,
  FaLock,
  FaWifi,
  FaCheckCircle,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaThumbsUp,
  FaUserCheck,
} from 'react-icons/fa';

const benefits = [
  {
    icon: <FaUserCheck className="text-white text-3xl" />,
    title: 'Authenticated',
    description: 'Minimises fraud and builds trust.',
  },
  {
    icon: <FaLock className="text-white text-3xl" />,
    title: 'Secret',
    description: 'Votes remain anonymous.',
  },
  {
    icon: <FaWifi className="text-white text-3xl" />,
    title: 'Flexible',
    description: 'Vote from any device, anywhere.',
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: 'Secure',
    description: 'SSL encryption like online banking.',
  },
  {
    icon: <FaCheckCircle className="text-white text-3xl" />,
    title: 'Accurate',
    description: 'Real-time counting with no duplication.',
  },
  {
    icon: <FaMoneyBillWave className="text-white text-3xl" />,
    title: 'Cost Effective',
    description: 'No postage or printing expenses.',
  },
  {
    icon: <FaQuestionCircle className="text-white text-3xl" />,
    title: 'Help Included',
    description: 'Guided instructions and support.',
  },
  {
    icon: <FaThumbsUp className="text-white text-3xl" />,
    title: 'Easy to Use',
    description: 'Takes only minutes to vote.',
  },
];

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="bg-gradient-to-b from-blue-900 via-blue-950 to-black py-16 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-10 tracking-wide drop-shadow-lg">
          Why Choose VoteNow?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md hover:shadow-blue-400 transition hover:-translate-y-1 duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-indigo-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm text-gray-200">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
